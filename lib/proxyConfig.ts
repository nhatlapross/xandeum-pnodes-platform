// Proxy server configuration
// Update PROXY_URL after deploying the proxy server

// For local development:
// export const PROXY_URL = 'http://localhost:3001';

// For production (update with your deployed proxy URL):
export const PROXY_URL = process.env.NEXT_PUBLIC_PROXY_URL || '';

// Whether to use the proxy server
export const USE_PROXY = !!PROXY_URL;

// API endpoints
export const proxyEndpoints = {
  // Get pods from a specific network
  getPods: (network: string) => `${PROXY_URL}/api/pods/${network}`,

  // Get pods from all networks
  getAllPods: () => `${PROXY_URL}/api/pods`,

  // Generic RPC proxy
  rpc: () => `${PROXY_URL}/api/rpc`,

  // Get single node data
  getNode: (ip: string, port = '6000') => `${PROXY_URL}/api/node/${ip}?port=${port}`,

  // Batch get multiple nodes
  batchNodes: () => `${PROXY_URL}/api/nodes/batch`,
};
