// /functions/submissions.ts
import type { RequestHandler } from '@cloudflare/pages-types'
import { NFTStorage, File as NFTFile } from 'nft.storage'

interface NFTSubmission {
  id: string
  language: string
  words_phrases: string
  content_type: string
  milsa_score: number
  quality_status: string
  created_at: string
  wallet_address: string
  nftMetadataUrl?: string
}

// Initialize NFT.storage client
const NFT_STORAGE_KEY = process.env.NFT_STORAGE_KEY || ''
const client = new NFTStorage({ token: NFT_STORAGE_KEY })

export const onRequest: RequestHandler = async () => {
  try {
    // Example: fetch all stored NFTs from NFT.storage (replace with real source)
    // Here we simulate fetching the metadata URLs
    const storedNFTs = [
      'ipfs://bafybeifakedata1',
      'ipfs://bafybeifakedata2'
    ]

    // Fetch metadata from IPFS
    const submissions: NFTSubmission[] = await Promise.all(
      storedNFTs.map(async (url, index) => {
        const ipfsUrl = url.replace('ipfs://', 'https://ipfs.io/ipfs/')
        const res = await fetch(ipfsUrl)
        const metadata = await res.json()

        return {
          id: (index + 1).toString(),
          language: metadata.language || 'Unknown',
          words_phrases: metadata.words_phrases || 'Unknown',
          content_type: metadata.content_type || 'text',
          milsa_score: metadata.milsa_score || 0,
          quality_status: metadata.quality_status || 'pending',
          created_at: metadata.created_at || new Date().toISOString(),
          wallet_address: metadata.wallet_address || '0x0',
          nftMetadataUrl: ipfsUrl,
        }
      })
    )

    return new Response(JSON.stringify(submissions), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error('Error fetching NFT submissions:', err)
    return new Response(JSON.stringify([]), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    })
  }
}