// app/api/mint-nft/route.ts
import { NextRequest, NextResponse } from "next/server"
import { NFTStorage } from "nft.storage"

const NFT_STORAGE_KEY = process.env.NFT_STORAGE_KEY!

export async function POST(req: NextRequest) {
  try {
    const { metadata, walletAddress } = await req.json()

    if (!metadata || !walletAddress) {
      return NextResponse.json({ error: "Missing metadata or walletAddress" }, { status: 400 })
    }

    const client = new NFTStorage({ token: NFT_STORAGE_KEY })

    const cid = await client.store(metadata)
    const nftMetadataUrl = `https://ipfs.io/ipfs/${cid.url.split("ipfs://")[1]}`

    return NextResponse.json({ nftMetadataUrl })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to store NFT metadata" }, { status: 500 })
  }
}