const TelegramBot = require('node-telegram-bot-api');
const { getLatestSnapshots, getNodeHistory, getHistoricalData } = require('./mongodb');
const { getLatestData, fetchPods } = require('./dataCollector');

// Bot instance
let bot = null;

// Subscriber storage (in production, use MongoDB)
const subscribers = new Map(); // chatId -> Set of pubkeys
const nodeAlertHistory = new Map(); // pubkey -> last status

// Format bytes to human readable
function formatBytes(bytes) {
  if (!bytes || bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Format uptime to human readable
function formatUptime(seconds) {
  if (!seconds) return 'N/A';
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

// Format number with commas
function formatNumber(num) {
  if (!num) return '0';
  return num.toLocaleString();
}

/**
 * Initialize the Telegram bot
 */
function initBot(token) {
  if (!token) {
    console.log('[Telegram] No bot token provided, skipping initialization');
    return null;
  }

  bot = new TelegramBot(token, { polling: true });
  console.log('[Telegram] Bot initialized');

  // Register command handlers
  registerCommands();

  return bot;
}

/**
 * Register all command handlers
 */
function registerCommands() {
  // /start - Welcome message
  bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;
    const welcomeMessage = `
🌐 *Xandeum pNodes Monitor Bot*

Welcome! I can help you monitor Xandeum network nodes.

*Available Commands:*
/stats - Network overview (all networks)
/stats <network> - Specific network stats
/node <pubkey> - Check specific node
/versions - Version distribution
/compare - Compare all networks
/subscribe <pubkey> - Get alerts for a node
/unsubscribe <pubkey> - Stop alerts
/mysubs - List your subscriptions
/help - Show this help

*Networks:* devnet1, devnet2, mainnet1, mainnet2
    `;
    await bot.sendMessage(chatId, welcomeMessage, { parse_mode: 'Markdown' });
  });

  // /help - Same as start
  bot.onText(/\/help/, async (msg) => {
    const chatId = msg.chat.id;
    const helpMessage = `
📖 *Commands Guide*

*Network Stats:*
/stats - All networks overview
/stats devnet1 - Specific network

*Node Monitoring:*
/node <pubkey> - Node details
/subscribe <pubkey> - Alert when node goes down/up
/unsubscribe <pubkey> - Remove alert
/mysubs - Your subscriptions

*Analysis:*
/versions - Software version distribution
/compare - Side-by-side network comparison
/top - Top nodes by uptime

*Examples:*
\`/stats mainnet1\`
\`/node abc123...\`
\`/subscribe abc123...\`
    `;
    await bot.sendMessage(chatId, helpMessage, { parse_mode: 'Markdown' });
  });

  // /stats [network] - Network statistics
  bot.onText(/\/stats(?:\s+(\w+))?/, async (msg, match) => {
    const chatId = msg.chat.id;
    const network = match[1]?.toLowerCase();

    try {
      await bot.sendMessage(chatId, '⏳ Fetching stats...');

      const snapshots = await getLatestSnapshots();

      if (!snapshots || snapshots.length === 0) {
        await bot.sendMessage(chatId, '❌ No data available. Please try again later.');
        return;
      }

      if (network) {
        // Specific network
        const data = snapshots.find(s => s.network === network);
        if (!data) {
          await bot.sendMessage(chatId, `❌ Network "${network}" not found.\nAvailable: devnet1, devnet2, mainnet1, mainnet2`);
          return;
        }

        const message = formatNetworkStats(data);
        await bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
      } else {
        // All networks summary
        let message = '📊 *Network Overview*\n\n';

        let totalNodes = 0;
        let totalOnline = 0;

        for (const data of snapshots) {
          const online = data.estimatedOnline || data.onlineNodes || 0;
          const total = data.totalPods || 0;
          const ratio = data.onlineRatio || 0;

          totalNodes += total;
          totalOnline += online;

          const statusEmoji = ratio >= 80 ? '🟢' : ratio >= 50 ? '🟡' : '🔴';
          message += `${statusEmoji} *${data.network}*: ${online}/${total} online (${ratio}%)\n`;
        }

        message += `\n📈 *Total:* ${totalOnline}/${totalNodes} nodes online`;
        message += `\n\n_Use /stats <network> for details_`;

        await bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
      }
    } catch (error) {
      console.error('[Telegram] Stats error:', error);
      await bot.sendMessage(chatId, '❌ Error fetching stats. Please try again.');
    }
  });

  // /node <pubkey> - Node details
  bot.onText(/\/node\s+(\S+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const pubkey = match[1];

    if (!pubkey || pubkey.length < 10) {
      await bot.sendMessage(chatId, '❌ Please provide a valid pubkey.\nUsage: `/node <pubkey>`', { parse_mode: 'Markdown' });
      return;
    }

    try {
      await bot.sendMessage(chatId, '🔍 Searching for node...');

      // Search in all networks
      const networks = ['devnet1', 'devnet2', 'mainnet1', 'mainnet2'];
      let foundNode = null;
      let foundNetwork = null;

      for (const network of networks) {
        const podsData = await fetchPods(network);
        if (podsData && podsData.pods) {
          const node = podsData.pods.find(p =>
            p.pubkey === pubkey ||
            p.pubkey?.startsWith(pubkey) ||
            p.address?.includes(pubkey)
          );
          if (node) {
            foundNode = node;
            foundNetwork = network;
            break;
          }
        }
      }

      if (!foundNode) {
        await bot.sendMessage(chatId, `❌ Node not found with pubkey: \`${pubkey.substring(0, 20)}...\``, { parse_mode: 'Markdown' });
        return;
      }

      // Get node history for more details
      const history = await getNodeHistory(foundNode.pubkey, 1);
      const latestStats = history?.[0];

      const statusEmoji = latestStats?.status === 'online' ? '🟢' : '🔴';
      const message = `
${statusEmoji} *Node Details*

*Network:* ${foundNetwork}
*Pubkey:* \`${foundNode.pubkey?.substring(0, 20)}...\`
*Address:* ${foundNode.address}
*Version:* ${latestStats?.version || foundNode.version || 'N/A'}

📊 *Stats:*
• Status: ${latestStats?.status || 'Unknown'}
• CPU: ${latestStats?.cpu?.toFixed(1) || 'N/A'}%
• RAM: ${latestStats?.ram?.toFixed(1) || 'N/A'}%
• Storage: ${formatBytes(latestStats?.storage)}
• Uptime: ${formatUptime(latestStats?.uptime)}

📡 *Activity:*
• Active Streams: ${formatNumber(latestStats?.activeStreams)}
• Packets Recv: ${formatNumber(latestStats?.packetsReceived)}
• Packets Sent: ${formatNumber(latestStats?.packetsSent)}
• Peers: ${formatNumber(latestStats?.peersCount)}

_Last seen: ${foundNode.last_seen_timestamp ? new Date(foundNode.last_seen_timestamp * 1000).toISOString() : 'N/A'}_
      `;

      await bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
    } catch (error) {
      console.error('[Telegram] Node error:', error);
      await bot.sendMessage(chatId, '❌ Error fetching node data. Please try again.');
    }
  });

  // /versions - Version distribution
  bot.onText(/\/versions(?:\s+(\w+))?/, async (msg, match) => {
    const chatId = msg.chat.id;
    const network = match[1]?.toLowerCase();

    try {
      const snapshots = await getLatestSnapshots();

      if (!snapshots || snapshots.length === 0) {
        await bot.sendMessage(chatId, '❌ No data available.');
        return;
      }

      let message = '📦 *Version Distribution*\n\n';

      const networksToShow = network
        ? snapshots.filter(s => s.network === network)
        : snapshots;

      for (const data of networksToShow) {
        if (data.versionDistribution && Object.keys(data.versionDistribution).length > 0) {
          message += `*${data.network}:*\n`;

          const versions = Object.entries(data.versionDistribution)
            .sort((a, b) => b[1] - a[1]);

          const total = versions.reduce((sum, [, count]) => sum + count, 0);

          for (const [version, count] of versions.slice(0, 5)) {
            const percent = ((count / total) * 100).toFixed(1);
            const bar = '█'.repeat(Math.round(percent / 10));
            message += `  ${version}: ${count} (${percent}%) ${bar}\n`;
          }
          message += '\n';
        }
      }

      await bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
    } catch (error) {
      console.error('[Telegram] Versions error:', error);
      await bot.sendMessage(chatId, '❌ Error fetching version data.');
    }
  });

  // /compare - Compare all networks
  bot.onText(/\/compare/, async (msg) => {
    const chatId = msg.chat.id;

    try {
      const snapshots = await getLatestSnapshots();

      if (!snapshots || snapshots.length === 0) {
        await bot.sendMessage(chatId, '❌ No data available.');
        return;
      }

      let message = '📊 *Network Comparison*\n\n';
      message += '```\n';
      message += 'Network   | Online | Total | Ratio | Storage\n';
      message += '----------|--------|-------|-------|--------\n';

      for (const data of snapshots) {
        const online = String(data.estimatedOnline || 0).padStart(6);
        const total = String(data.totalPods || 0).padStart(5);
        const ratio = String((data.onlineRatio || 0) + '%').padStart(5);
        const storage = formatBytes(data.totalStorage).padStart(8);
        message += `${data.network.padEnd(9)} | ${online} | ${total} | ${ratio} | ${storage}\n`;
      }

      message += '```';

      await bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
    } catch (error) {
      console.error('[Telegram] Compare error:', error);
      await bot.sendMessage(chatId, '❌ Error comparing networks.');
    }
  });

  // /subscribe <pubkey> - Subscribe to node alerts
  bot.onText(/\/subscribe\s+(\S+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const pubkey = match[1];

    if (!pubkey || pubkey.length < 10) {
      await bot.sendMessage(chatId, '❌ Please provide a valid pubkey.\nUsage: `/subscribe <pubkey>`', { parse_mode: 'Markdown' });
      return;
    }

    // Add to subscribers
    if (!subscribers.has(chatId)) {
      subscribers.set(chatId, new Set());
    }
    subscribers.get(chatId).add(pubkey);

    await bot.sendMessage(chatId, `✅ Subscribed to alerts for node:\n\`${pubkey.substring(0, 30)}...\`\n\nYou'll be notified when this node goes online/offline.`, { parse_mode: 'Markdown' });
  });

  // /unsubscribe <pubkey> - Unsubscribe from node alerts
  bot.onText(/\/unsubscribe\s+(\S+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const pubkey = match[1];

    if (subscribers.has(chatId)) {
      subscribers.get(chatId).delete(pubkey);
      await bot.sendMessage(chatId, `✅ Unsubscribed from node:\n\`${pubkey.substring(0, 30)}...\``, { parse_mode: 'Markdown' });
    } else {
      await bot.sendMessage(chatId, '❌ No subscriptions found.');
    }
  });

  // /mysubs - List subscriptions
  bot.onText(/\/mysubs/, async (msg) => {
    const chatId = msg.chat.id;

    const subs = subscribers.get(chatId);
    if (!subs || subs.size === 0) {
      await bot.sendMessage(chatId, '📭 You have no subscriptions.\n\nUse `/subscribe <pubkey>` to add one.', { parse_mode: 'Markdown' });
      return;
    }

    let message = '📋 *Your Subscriptions*\n\n';
    let i = 1;
    for (const pubkey of subs) {
      message += `${i}. \`${pubkey.substring(0, 30)}...\`\n`;
      i++;
    }
    message += `\n_Total: ${subs.size} subscription(s)_`;

    await bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
  });

  // /top - Top nodes by uptime
  bot.onText(/\/top(?:\s+(\w+))?/, async (msg, match) => {
    const chatId = msg.chat.id;
    const network = match[1]?.toLowerCase() || 'devnet1';

    try {
      await bot.sendMessage(chatId, '⏳ Fetching top nodes...');

      const latestData = getLatestData(network);
      if (!latestData || !latestData.nodeStats) {
        await bot.sendMessage(chatId, `❌ No data for ${network}.`);
        return;
      }

      const onlineNodes = latestData.nodeStats
        .filter(n => n.status === 'online' && n.uptime)
        .sort((a, b) => (b.uptime || 0) - (a.uptime || 0))
        .slice(0, 10);

      if (onlineNodes.length === 0) {
        await bot.sendMessage(chatId, '❌ No online nodes found.');
        return;
      }

      let message = `🏆 *Top 10 Nodes by Uptime (${network})*\n\n`;

      onlineNodes.forEach((node, index) => {
        const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}.`;
        message += `${medal} ${formatUptime(node.uptime)} - \`${node.pubkey?.substring(0, 12)}...\`\n`;
      });

      await bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
    } catch (error) {
      console.error('[Telegram] Top error:', error);
      await bot.sendMessage(chatId, '❌ Error fetching top nodes.');
    }
  });

  console.log('[Telegram] Commands registered');
}

/**
 * Format network stats for display
 */
function formatNetworkStats(data) {
  const statusEmoji = data.onlineRatio >= 80 ? '🟢' : data.onlineRatio >= 50 ? '🟡' : '🔴';

  return `
${statusEmoji} *${data.network} Statistics*

📈 *Node Status:*
• Total Nodes: ${formatNumber(data.totalPods)}
• Online: ${formatNumber(data.estimatedOnline || data.onlineNodes)}
• Offline: ${formatNumber(data.estimatedOffline || data.offlineNodes)}
• Online Ratio: ${data.onlineRatio}%

💻 *Resources:*
• Avg CPU: ${data.avgCpu?.toFixed(1) || 'N/A'}%
• Avg RAM: ${data.avgRam?.toFixed(1) || 'N/A'}%
• Total Storage: ${formatBytes(data.totalStorage)}
• Avg Uptime: ${formatUptime(data.avgUptime)}

📡 *Activity:*
• Total Streams: ${formatNumber(data.totalStreams)}
• Bytes Transferred: ${formatBytes(data.totalBytesTransferred)}

_Last updated: ${data.timestamp ? new Date(data.timestamp).toISOString() : 'N/A'}_
  `;
}

/**
 * Send alert to all subscribers of a node
 */
async function sendNodeAlert(pubkey, status, nodeInfo) {
  if (!bot) return;

  const emoji = status === 'online' ? '🟢' : '🔴';
  const message = `
${emoji} *Node Status Alert*

Node \`${pubkey.substring(0, 30)}...\` is now *${status.toUpperCase()}*

${nodeInfo ? `Network: ${nodeInfo.network}\nAddress: ${nodeInfo.address}` : ''}

_${new Date().toISOString()}_
  `;

  for (const [chatId, subs] of subscribers) {
    if (subs.has(pubkey)) {
      try {
        await bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
      } catch (error) {
        console.error(`[Telegram] Failed to send alert to ${chatId}:`, error.message);
      }
    }
  }
}

/**
 * Check for node status changes and send alerts
 */
async function checkNodeAlerts(nodeStats) {
  if (!bot || subscribers.size === 0) return;

  for (const node of nodeStats) {
    const pubkey = node.pubkey;
    if (!pubkey) continue;

    const previousStatus = nodeAlertHistory.get(pubkey);
    const currentStatus = node.status;

    // Check if status changed
    if (previousStatus && previousStatus !== currentStatus) {
      // Check if anyone is subscribed to this node
      for (const [, subs] of subscribers) {
        if (subs.has(pubkey)) {
          await sendNodeAlert(pubkey, currentStatus, node);
          break;
        }
      }
    }

    // Update history
    nodeAlertHistory.set(pubkey, currentStatus);
  }
}

/**
 * Broadcast message to all users who have interacted with the bot
 */
async function broadcastAlert(message) {
  if (!bot) return;

  for (const chatId of subscribers.keys()) {
    try {
      await bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
    } catch (error) {
      console.error(`[Telegram] Broadcast failed for ${chatId}:`, error.message);
    }
  }
}

/**
 * Get bot instance
 */
function getBot() {
  return bot;
}

/**
 * Stop the bot
 */
function stopBot() {
  if (bot) {
    bot.stopPolling();
    console.log('[Telegram] Bot stopped');
  }
}

module.exports = {
  initBot,
  getBot,
  stopBot,
  sendNodeAlert,
  checkNodeAlerts,
  broadcastAlert,
};
