import express from "express"
import { NFTStorage, File } from "nft.storage"
import { ethers } from "ethers"
import dotenv from "dotenv"

dotenv.config()
const router = express.Router()

const NFT_STORAGE_KEY = process.env.NFT_STORAGE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS

// POST /submissions
router.post("/", async (req, res) => {
  try {
    const {
      language,
      contentType,
      words,
      definition,
      context,
      pronunciation,
      audioUrl,
      videoUrl,
      walletAddress,
    } = req.body

    if (!walletAddress || !audioUrl) {
      return res.status(400).json({ status: "error", message: "Wallet and audio required" })
    }

    // Upload audio + metadata to NFT.Storage
    const nftStorage = new NFTStorage({ token: NFT_STORAGE_KEY })
    const audioBlob = await fetch(audioUrl).then(r => r.blob())

    const metadata = await nftStorage.store({
      name: words,
      description: `Language contribution in ${language}`,
      image: new File([audioBlob], "audio.webm", { type: "audio/webm" }),
      properties: { language, contentType, pronunciation, definition, context, videoUrl, walletAddress },
    })

    // Mint NFT (if you have a backend wallet)
    const privateKey = process.env.MINTER_PRIVATE_KEY
    if (privateKey) {
      const provider = new ethers.JsonRpcProvider("https://polygon-rpc.com")
      const wallet = new ethers.Wallet(privateKey, provider)
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, wallet)
      const tx = await contract.safeMint(walletAddress, metadata.url)
      const receipt = await tx.wait()

      return res.json({ nftMetadataUrl: metadata.url, txHash: receipt.hash, status: "success" })
    } else {
      return res.json({ nftMetadataUrl: metadata.url, status: "metadata_uploaded", message: "Manual minting required" })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ status: "error", message: error.message })
  }
})

// GET /submissions
router.get("/", (req, res) => {
  res.json([
    {
      id: "1",
      language: "Swahili",
      words_phrases: "Jambo",
      content_type: "Word",
      milsa_score: 85,
      quality_status: "approved",
      created_at: new Date().toISOString(),
      wallet_address: "0x0000000000000000000000000000000000000000",
    }
  ])
})

export default router