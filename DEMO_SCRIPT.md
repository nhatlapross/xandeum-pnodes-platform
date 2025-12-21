# Xnode - Demo Script

> **For AI Voice (ElevenLabs)** | Estimated Duration: 3-4 minutes
>
> **Instructions:** Pause 1-2 seconds between sections. Speak clearly and at moderate pace.

---

## INTRO (15 seconds)

Welcome to Xnode — a comprehensive analytics platform for the Xandeum storage network.

This platform provides real-time insights into pNode performance, network health, and token activity — all in one intuitive dashboard.

Let me walk you through its features.

---

## DASHBOARD - Network Overview (45 seconds)

*[Show Dashboard page]*

Starting with the Dashboard. Here you see real-time network statistics at a glance.

The top section displays key metrics: online and offline node counts, total storage capacity across the network, and average CPU and RAM utilization.

Below that is the Node Explorer. You can switch between Card View for a visual overview, or Table View for detailed data with sortable columns.

*[Click Table View]*

The table shows each node's location with country flags, status, version, resource usage, uptime, active streams, and credits earned.

*[Use filters]*

Advanced filters let you search by address, filter by status, or select specific versions.

*[Switch network]*

The network selector supports all four Xandeum networks — two devnets and two mainnets — with instant switching and cached data for fast loading.

---

## LEADERBOARD - Reputation Rankings (30 seconds)

*[Navigate to Leaderboard page]*

The Leaderboard ranks all nodes by their reputation credits.

At the top, you see the current leader, total node count, and total credits across the network.

*[Click star on a node]*

You can star your favorite nodes to track them easily.

*[Enable compare mode, select 2-3 nodes]*

And with Compare Mode, you can select up to three nodes for a side-by-side comparison of their performance metrics.

The table displays rank, credits, status, version, CPU usage, and uptime — all sortable and searchable.

---

## ANALYTICS - Historical Data (35 seconds)

*[Navigate to Analytics page]*

The Analytics page provides historical trends over multiple time ranges — from one hour to thirty days.

*[Show Network Health tab]*

The Network Health chart tracks online versus offline nodes over time, helping identify stability patterns.

*[Switch to Resources tab]*

The Resources tab shows CPU and RAM utilization trends across the network.

*[Switch to Storage tab]*

Storage trends display total capacity and active data streams.

*[Switch to Network Comparison tab]*

And uniquely, the Network Comparison view lets you compare metrics across all four networks simultaneously.

---

## ACTIVITY - Token Analytics (35 seconds)

*[Navigate to Activity page]*

The Activity page integrates XAND token analytics.

At the top, you see live price, market cap, 24-hour volume, and total holder count.

*[Show Transfers tab]*

The Transfers tab displays recent token movements with addresses, amounts, and USD values.

*[Show Top Holders tab]*

Top Holders shows the distribution of XAND across major wallets.

*[Show DeFi Activity tab]*

DeFi Activity tracks swaps, liquidity provisions, and staking operations across protocols like Jupiter, Raydium, and Meteora.

*[Show Analytics tab]*

The Analytics tab provides price charts and holder distribution breakdowns.

---

## TOPOLOGY - 3D Globe Visualization (40 seconds)

*[Navigate to Topology page]*

Finally, the Topology view — my favorite feature.

An interactive 3D globe displays the geographic distribution of all pNodes worldwide.

*[Rotate globe slowly]*

Each point represents a node. Green indicates online nodes running the latest version. Yellow means the version is outdated. Red shows offline nodes.

*[Hover over connections]*

The cyan lines represent active peer connections between nodes, showing how the network is interconnected in real-time.

*[Click on a node]*

Clicking any node reveals its details — address, location, version, and live statistics.

This visualization makes it easy to understand network distribution and connectivity at a glance.

---

## TECHNICAL HIGHLIGHTS (25 seconds)

*[Can show code or architecture diagram if available]*

Under the hood, the platform uses a multi-layer caching architecture.

IndexedDB provides instant client-side caching, while MongoDB stores historical data on the backend.

Data is fetched directly from pNodes using pRPC calls — get-pods for node discovery, and get-stats for real-time metrics.

The system handles over 200 nodes across four networks with batch fetching and background refresh — ensuring a smooth, responsive experience.

---

## CLOSING (15 seconds)

*[Return to Dashboard]*

Xnode delivers everything you need to monitor network health, explore node performance, and track token activity.

Built with Next.js, React, and modern visualization libraries — it's fast, intuitive, and ready for production.

Thank you for watching.

---

## QUICK REFERENCE - Screen Actions

| Timestamp | Action |
|-----------|--------|
| 0:00-0:15 | Show landing/dashboard |
| 0:15-1:00 | Dashboard tour: stats → card view → table view → filters → network switch |
| 1:00-1:30 | Leaderboard: star favorites → compare mode → select nodes |
| 1:30-2:05 | Analytics: cycle through all 4 tabs with different time ranges |
| 2:05-2:40 | Activity: show each tab briefly |
| 2:40-3:20 | Topology: rotate globe → hover connections → click node |
| 3:20-3:45 | Optional: show code or terminal briefly |
| 3:45-4:00 | Return to dashboard, end |

---

## ALTERNATIVE SHORT VERSION (90 seconds)

> Use this if you need a shorter demo

Welcome to Xnode — the analytics platform for Xandeum pNodes.

The Dashboard shows real-time network statistics — node counts, storage capacity, and resource utilization. The Node Explorer supports both card and table views with advanced filtering.

*[Quick switch to Leaderboard]*

The Leaderboard ranks nodes by reputation credits, with favorites and compare mode for tracking performance.

*[Quick switch to Analytics]*

Analytics provides historical trends — network health, resource usage, and storage over time. You can compare metrics across all four networks.

*[Quick switch to Activity]*

The Activity page integrates XAND token analytics including price, transfers, top holders, and DeFi activity.

*[Quick switch to Topology]*

Finally, the Topology page features an interactive 3D globe showing global node distribution and peer connections in real-time.

The platform fetches data directly from pNodes using pRPC calls, with multi-layer caching for instant response times.

Thank you for watching.

---

## NOTES FOR RECORDING

1. **Resolution:** Record at 1920x1080 or higher
2. **Browser:** Use Chrome/Edge with dark mode enabled
3. **Prep:** Clear browser cache, ensure all data is loaded before recording
4. **Pace:** Let each screen fully load before moving on
5. **Mouse:** Move cursor smoothly, avoid rapid clicking
6. **Focus:** Zoom browser to 110-125% for better visibility
