"use client"
import React, { useState, ChangeEvent } from "react"
import { ethers } from "ethers"
import { NFTStorage, File as NFTFile } from "nft.storage"
import CONTRACT_ABI from "../data/contractABI.json"

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "0x0000000000000000000000000000000000000000"
const NFT_STORAGE_KEY = process.env.NEXT_PUBLIC_NFT_STORAGE_KEY || ""

export default function WalletMintAdmin() {
  const [account, setAccount] = useState<string | null>(null)
  const [status, setStatus] = useState<string | null>(null)
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)
  const [minting, setMinting] = useState(false)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null)

  // Connect wallet (MetaMask / injected)
  async function connectWallet() {
    try {
      setStatus("Requesting wallet connection...")
      if (!(window as any).ethereum) {
        setStatus("No injected wallet found. Open MetaMask app browser or install MetaMask.")
        return
      }
      const provider = new ethers.providers.Web3Provider((window as any).ethereum)
      await provider.send("eth_requestAccounts", [])
      const signer = provider.getSigner()
      const addr = await signer.getAddress()
      setAccount(addr)
      setStatus(`Connected: ${addr}`)
      await ensurePolygonNetwork(provider)
      // Check admin role
      await checkAdminRole(provider, addr)
    } catch (err: any) {
      console.error(err)
      setStatus("Connect failed: " + (err?.message ?? err))
    }
  }

  // Ensure Polygon mainnet (chainId 0x89)
  async function ensurePolygonNetwork(provider: ethers.providers.Web3Provider) {
    try {
      const chainId = await provider.send("eth_chainId", [])
      if (chainId === "0x89") return
      try {
        await provider.send("wallet_switchEthereumChain", [{ chainId: "0x89" }])
        setStatus("Switched to Polygon mainnet.")
        return
      } catch (switchError: any) {
        if (switchError.code === 4902 || /Unrecognized chain/i.test(switchError?.message ?? "")) {
          await provider.send("wallet_addEthereumChain", [{
            chainId: "0x89",
            chainName: "Polygon Mainnet",
            nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
            rpcUrls: ["https://polygon-rpc.com/"],
            blockExplorerUrls: ["https://polygonscan.com/"]
          }])
          setStatus("Polygon network added. Please switch to it in your wallet.")
          return
        }
        throw switchError
      }
    } catch (err: any) {
      console.error("Network switch error:", err)
      setStatus("Could not switch to Polygon: " + (err?.message ?? err))
    }
  }

  // Check if connected address has the DEFAULT_ADMIN_ROLE on the contract
  async function checkAdminRole(provider: ethers.providers.Web3Provider, addr: string) {
    try {
      setStatus("Checking admin role on contract...")
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider)
      // Defensive: only call if functions exist
      if (contract.DEFAULT_ADMIN_ROLE && contract.hasRole) {
        const role = await contract.DEFAULT_ADMIN_ROLE()
        const isAdminNow = await contract.hasRole(role, addr)
        setIsAdmin(Boolean(isAdminNow))
        setStatus(isAdminNow ? "Address is admin for this contract." : "Address is NOT admin.")
      } else {
        // Fallback: if we can't check role, assume admin (you can change this)
        setIsAdmin(true)
        setStatus("Could not detect role-checking functions; continuing (be careful).")
      }
    } catch (err: any) {
      console.error(err)
      setIsAdmin(false)
      setStatus("Admin check failed: " + (err?.message ?? err))
    }
  }

  function onImageChange(e: ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
    if (files && files[0]) setImageFile(files[0])
  }

  // Upload metadata (and image if provided) to nft.storage, return metadata url (ipfs://...)
  async function uploadMetadataToIPFS(nameText: string, desc: string, image?: File | null) {
    if (!NFT_STORAGE_KEY) throw new Error("NFT_STORAGE_KEY not set in env")
    const client = new NFTStorage({ token: NFT_STORAGE_KEY })
    let imageBlob: NFTFile | undefined = undefined

    if (image) {
      const arrayBuffer = await image.arrayBuffer()
      imageBlob = new NFTFile([new Uint8Array(arrayBuffer)], image.name, { type: image.type })
    }

    const metadata = await client.store({
      name: nameText,
      description: desc,
      image: imageBlob ?? "",
      properties: { createdBy: "Soul-Internet Admin UI" }
    })
    // metadata.url is ipfs://...
    return metadata.url
  }

  // Admin mint handler: tries safeMint, then lazyMint if available
  async function handleAdminMint() {
    if (!account) { setStatus("Connect wallet first"); return }
    if (!isAdmin) { setStatus("Connected account is not an admin for this contract."); return }
    setMinting(true)
    setStatus("Uploading metadata to IPFS...")
    try {
      const metadataUri = await uploadMetadataToIPFS(name || "Soul-Internet NFT", description || "Minted via admin UI", imageFile)
      setStatus("Metadata uploaded: " + metadataUri)

      if (!(window as any).ethereum) throw new Error("No injected wallet")
      const provider = new ethers.providers.Web3Provider((window as any).ethereum)
      await ensurePolygonNetwork(provider)
      const signer = provider.getSigner()
      const contractWithSigner: any = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)

      // Choose mint method based on what contract exposes
      if (typeof contractWithSigner.safeMint === "function") {
        setStatus("Calling safeMint(to, tokenURI)...")
        const tx = await contractWithSigner.safeMint(account, metadataUri)
        setStatus("Transaction sent: " + tx.hash)
        await tx.wait()
        setStatus("Mint confirmed: " + tx.hash)
        setMinting(false)
        return
      }

      if (typeof contractWithSigner.lazyMint === "function") {
        setStatus("Contract supports lazyMint(amount, baseURI, data). Calling lazyMint(1, metadataUri, 0x)...")
        // Many lazyMint implementations expect a baseURI (ending with /{id}) but some accept a direct metadata URI. This is a best-effort call.
        const tx = await contractWithSigner.lazyMint(1, metadataUri, "0x")
        setStatus("lazyMint tx sent: " + tx.hash)
        await tx.wait()
        setStatus("lazyMint confirmed: " + tx.hash)
        setMinting(false)
        return
      }

      // If claim exists and contract implements a claim flow, instruct to use it
      if (typeof contractWithSigner.claim === "function") {
        setStatus("Contract exposes claim(...). Admin mint via claim may require conditions - check contract. Try calling claim via contract UI or configure claim conditions.")
        setMinting(false)
        return
      }

      setStatus("No compatible mint function detected (safeMint or lazyMint). Please confirm contract supports minting or share exact mint function signature.")
    } catch (err: any) {
      console.error(err)
      setStatus("Mint failed: " + (err?.message ?? err))
    } finally {
      setMinting(false)
    }
  }

  return (
    <div className="p-4 max-w-md">
      <div className="mb-3">
        <button onClick={connectWallet} className="px-4 py-2 rounded bg-blue-600 text-white">
          {account ? `Connected: ${account.slice(0,6)}...` : "Connect Admin Wallet"}
        </button>
      </div>

      <div className="mb-3">
        <label className="block text-sm">NFT Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border rounded" placeholder="Name" />
      </div>

      <div className="mb-3">
        <label className="block text-sm">Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 border rounded" placeholder="Description" />
      </div>

      <div className="mb-3">
        <label className="block text-sm">Image (optional)</label>
        <input type="file" accept="image/*" onChange={onImageChange} />
      </div>

      <div className="mb-4">
        <button
          onClick={handleAdminMint}
          disabled={!account || minting}
          className="px-4 py-2 rounded bg-green-600 text-white"
        >
          {minting ? "Minting..." : "Admin Mint (upload metadata -> mint)"}
        </button>
      </div>

      <div className="text-sm text-gray-700">
        <div><strong>Status:</strong> {status}</div>
        <div><strong>Admin check:</strong> {isAdmin === null ? "unknown" : isAdmin ? "yes" : "no"}</div>
      </div>
    </div>
  )
}
