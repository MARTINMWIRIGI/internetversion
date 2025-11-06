// Type declarations for MetaMask provider
interface EthereumProvider {
  request: (args: { method: string; params?: any[] }) => Promise<any>
}

declare global {
  interface Window {
    ethereum?: EthereumProvider
  }
}

export {}
