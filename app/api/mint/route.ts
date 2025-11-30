import { NextResponse } from "next/server"

const NFT_STORAGE_KEY = process.env.NFT_STORAGE_KEY!

export async function POST(req: Request) {
  try {
    const { name, description, imageBase64 } = await req.json()

    if (!name || !description || !imageBase64) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Dynamic import
    const { NFTStorage, File } = await import('nft.storage')
    const nftStorage = new NFTStorage({ token: NFT_STORAGE_KEY })

    // Convert base64 image to a File object
    const imageBuffer = Buffer.from(imageBase64.split(",")[1], "base64")
    const file = new File([imageBuffer], "nft.png", { type: "image/png" })

    const metadata = await nftStorage.store({
      name,
      description,
      image: file,
    })

    return NextResponse.json({ metadataUrl: metadata.url })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Minting failed" }, { status: 500 })
  }
}