import { ethers } from "ethers"

const CONTRACT_ADDRESS = "0x202934e4dF29E57Ab7498bB31946174d7C95eDc7"
const NFT_STORAGE_KEY = "ae71f81f.4921244e2abc47df9a4f47ff37275c2e"
const POLYGON_CHAIN_ID = 137

// Basic ERC-721 mint function ABI
const CONTRACT_ABI = [
  {
    name: "mint",
    type: "function",
    inputs: [
      { name: "to", type: "address" },
      { name: "uri", type: "string" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
]

export async function ensurePolygonNetwork() {
  if (!window.ethereum) throw new Error("MetaMask not found")

  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x89" }], // 137 in hex
    })
  } catch (switchError: any) {
    if (switchError.code === 4902) {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x89",
            chainName: "Polygon Mainnet",
            rpcUrls: ["https://polygon-rpc.com"],
            nativeCurrency: {
              name: "MATIC",
              symbol: "MATIC",
              decimals: 18,
            },
            blockExplorerUrls: ["https://polygonscan.com"],
          },
        ],
      })
    }
  }
}

export async function uploadMetadataToNFTStorage(metadata: Record<string, any>) {
  const response = await fetch("https://api.nft.storage/upload", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${NFT_STORAGE_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(metadata),
  })

  if (!response.ok) throw new Error("Failed to upload to NFT.storage")
  const { value } = await response.json()
  return `ipfs://${value.cid}/metadata.json`
}

export async function mintNFT(metadataUri: string, userAddress: string) {
  if (!window.ethereum) throw new Error("MetaMask not found")

  const provider = new ethers.BrowserProvider(window.ethereum)
  const signer = await provider.getSigner()

  const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)

  const tx = await contract.mint(userAddress, metadataUri)
  const receipt = await tx.wait()

  return receipt?.transactionHash
}

export function getExplorerUrl(txHash: string, type: "tx" | "address" = "tx") {
  const base = "https://polygonscan.com"
  return type === "tx" ? `${base}/tx/${txHash}` : `${base}/address/${txHash}`
}

export function getOpenSeaUrl(contractAddress: string, tokenId?: string) {
  const base = "https://opensea.io/assets/matic"
  return tokenId ? `${base}/${contractAddress}/${tokenId}` : `${base}/${contractAddress}`
}
