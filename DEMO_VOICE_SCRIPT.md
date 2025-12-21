# Demo Voice Script (ElevenLabs)

Copy the text below directly into ElevenLabs.

---

## Full Version (~3-4 minutes)

Welcome to Xnode — a comprehensive analytics platform for the Xandeum storage network.

This platform provides real-time insights into pNode performance, network health, and token activity — all in one intuitive dashboard.

Let me walk you through its features.

Starting with the Dashboard. Here you see real-time network statistics at a glance.

The top section displays key metrics: online and offline node counts, total storage capacity across the network, and average CPU and RAM utilization.

Below that is the Node Explorer. You can switch between Card View for a visual overview, or Table View for detailed data with sortable columns.

The table shows each node's location with country flags, status, version, resource usage, uptime, active streams, and credits earned.

Advanced filters let you search by address, filter by status, or select specific versions.

The network selector supports all four Xandeum networks — two devnets and two mainnets — with instant switching and cached data for fast loading.

The Leaderboard ranks all nodes by their reputation credits.

At the top, you see the current leader, total node count, and total credits across the network.

You can star your favorite nodes to track them easily. And with Compare Mode, you can select up to three nodes for a side-by-side comparison of their performance metrics.

The table displays rank, credits, status, version, CPU usage, and uptime — all sortable and searchable.

The Analytics page provides historical trends over multiple time ranges — from one hour to thirty days.

The Network Health chart tracks online versus offline nodes over time, helping identify stability patterns.

The Resources tab shows CPU and RAM utilization trends across the network.

Storage trends display total capacity and active data streams.

And uniquely, the Network Comparison view lets you compare metrics across all four networks simultaneously.

The Activity page integrates XAND token analytics.

At the top, you see live price, market cap, 24-hour volume, and total holder count.

The Transfers tab displays recent token movements with addresses, amounts, and USD values.

Top Holders shows the distribution of XAND across major wallets.

DeFi Activity tracks swaps, liquidity provisions, and staking operations across protocols like Jupiter, Raydium, and Meteora.

The Analytics tab provides price charts and holder distribution breakdowns.

Finally, the Topology view — my favorite feature.

An interactive 3D globe displays the geographic distribution of all pNodes worldwide.

Each point represents a node. Green indicates online nodes running the latest version. Yellow means the version is outdated. Red shows offline nodes.

The cyan lines represent active peer connections between nodes, showing how the network is interconnected in real-time.

Clicking any node reveals its details — address, location, version, and live statistics.

This visualization makes it easy to understand network distribution and connectivity at a glance.

Under the hood, the platform uses a multi-layer caching architecture.

IndexedDB provides instant client-side caching, while MongoDB stores historical data on the backend.

Data is fetched directly from pNodes using pRPC calls — get-pods for node discovery, and get-stats for real-time metrics.

The system handles over 200 nodes across four networks with batch fetching and background refresh — ensuring a smooth, responsive experience.

Xnode delivers everything you need to monitor network health, explore node performance, and track token activity.

Built with Next.js, React, and modern visualization libraries — it's fast, intuitive, and ready for production.

Thank you for watching.

---

## Short Version (~90 seconds)

Welcome to Xnode — the analytics platform for Xandeum pNodes.

The Dashboard shows real-time network statistics — node counts, storage capacity, and resource utilization. The Node Explorer supports both card and table views with advanced filtering.

The Leaderboard ranks nodes by reputation credits, with favorites and compare mode for tracking performance.

Analytics provides historical trends — network health, resource usage, and storage over time. You can compare metrics across all four networks.

The Activity page integrates XAND token analytics including price, transfers, top holders, and DeFi activity.

Finally, the Topology page features an interactive 3D globe showing global node distribution and peer connections in real-time.

The platform fetches data directly from pNodes using pRPC calls, with multi-layer caching for instant response times.

Thank you for watching.
