import { NextRequest, NextResponse } from "next/server"
import { NFTStorage, File } from "nft.storage"
import { ethers } from "ethers"
import CONTRACT_ABI from "@/app/data/contractABI.json"

const NFT_STORAGE_KEY = process.env.NEXT_PUBLIC_NFT_STORAGE_KEY!
const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()

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
    } = data

    if (!walletAddress || !audioUrl) {
      return NextResponse.json(
        { status: "error", message: "Wallet address and audio required" },
        { status: 400 }
      )
    }

    // 1️⃣ Upload audio + metadata to NFT.Storage
    const nftStorage = new NFTStorage({ token: NFT_STORAGE_KEY })
    const audioBlob = await fetch(audioUrl).then(res => res.blob())

    const metadata = await nftStorage.store({
      name: words,
      description: `Language contribution in ${language}`,
      image: new File([audioBlob], "audio.webm", { type: "audio/webm" }),
      properties: {
        language,
        contentType,
        pronunciation,
        definition,
        context,
        videoUrl: videoUrl || null,
        walletAddress,
      },
    })

    // 2️⃣ Mint NFT on Polygon using ethers.js
    // Note: This requires a backend wallet with MATIC for gas
    // For production, use a backend service or let users mint directly
    
    const provider = new ethers.JsonRpcProvider("https://polygon-rpc.com")
    
    // WARNING: Never store private keys in code
    // This is just a placeholder - implement proper key management
    const privateKey = process.env.MINTER_PRIVATE_KEY
    if (!privateKey) {
      return NextResponse.json({
        nftMetadataUrl: metadata.url,
        status: "metadata_uploaded",
        message: "NFT metadata uploaded. Manual minting required."
      })
    }

    const wallet = new ethers.Wallet(privateKey, provider)
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, wallet)

    const tx = await contract.safeMint(walletAddress, metadata.url)
    const receipt = await tx.wait()

    // 3️⃣ Return NFT info to client
    return NextResponse.json({
      nftMetadataUrl: metadata.url,
      txHash: receipt.hash,
      status: "success",
    })
  } catch (error: any) {
    console.error("Submission / Minting error:", error)
    return NextResponse.json(
      { status: "error", message: error.message },
      { status: 500 }
    )
  }
}

export async function GET() {
  // Mock data for now - replace with actual Supabase query
  return NextResponse.json([
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
}
