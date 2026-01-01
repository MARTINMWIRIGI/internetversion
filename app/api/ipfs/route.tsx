import { NextResponse } from 'next/server'
import { NFTStorage } from 'nft.storage'

const NFT_STORAGE_KEY = process.env.NFT_STORAGE_API_KEY || 'ae71f81f.4921244e2abc47df9a4f47ff37275c2e'

export async function POST(request: Request) {
  try {
    const metadata = await request.json()
    
    // Upload to IPFS using NFT.Storage
    const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY })
    
    const result = await nftstorage.store(metadata);
    const cid = result.url.replace('ipfs://', '');
    
    return NextResponse.json({
      success: true,
      cid,
      url: `https://ipfs.io/ipfs/${cid}`,
      gatewayUrl: `https://${cid}.ipfs.nftstorage.link`
    })
    
  } catch (error: any) {
    console.error('IPFS upload error:', error)
    return NextResponse.json(
      { error: error.message || 'IPFS upload failed' },
      { status: 500 }
    )
  }
}