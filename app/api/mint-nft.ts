// app/api/mint-nft/route.ts
import { NextRequest, NextResponse } from "next/server"
import { NFTStorage, File } from "nft.storage"

const NFT_STORAGE_KEY = process.env.NFT_STORAGE_KEY!

export async function POST(req: NextRequest) {
  try {
    const { metadata, walletAddress } = await req.json()

    if (!metadata || !walletAddress) {
      return NextResponse.json({ error: "Missing metadata or walletAddress" }, { status: 400 })
    }

    const client = new NFTStorage({ token: NFT_STORAGE_KEY })

    // Convert audio URL to File if needed
    // Here we assume metadata.image is a URL; you can also fetch and store it as File
    // For now, NFT.Storage can store JSON metadata with image URL

    const cid = await client.store(metadata)
    const nftMetadataUrl = `https://ipfs.io/ipfs/${cid.url.split("ipfs://")[1]}`

    return NextResponse.json({ nftMetadataUrl })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to store NFT metadata" }, { status: 500 })
  }
}