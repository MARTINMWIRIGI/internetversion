// Wallet connection utility for MetaMask and Polygon Mainnet

const POLYGON_MAINNET = {
  chainId: "0x89",
  chainName: "Polygon Mainnet",
  nativeCurrency: {
    name: "MATIC",
    symbol: "MATIC",
    decimals: 18,
  },
  rpcUrls: ["https://polygon-rpc.com"],
  blockExplorerUrls: ["https://polygonscan.com"],
}

export async function connectWallet() {
  if (!window.ethereum) {
    throw new Error("MetaMask is not installed")
  }

  try {
    // Request account access
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    })

    // Switch to Polygon Mainnet
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: POLYGON_MAINNET.chainId }],
      })
    } catch (switchError: any) {
      // If chain doesn't exist, add it
      if (switchError.code === 4902) {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [POLYGON_MAINNET],
        })
      } else {
        throw switchError
      }
    }

    return accounts[0]
  } catch (error) {
    console.error("Wallet connection error:", error)
    throw error
  }
}

export function formatAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}
