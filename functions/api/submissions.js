// /functions/submissions.ts
import type { RequestHandler } from '@cloudflare/pages-types'

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

// Example static data (replace this with your real DB/IPFS fetch)
const submissions: NFTSubmission[] = [
  {
    id: '1',
    language: 'English',
    words_phrases: 'Hello World',
    content_type: 'text',
    milsa_score: 95,
    quality_status: 'approved',
    created_at: new Date().toISOString(),
    wallet_address: '0x123',
    nftMetadataUrl: 'https://example.com/nft/1',
  },
  {
    id: '2',
    language: 'Swahili',
    words_phrases: 'Habari Dunia',
    content_type: 'text',
    milsa_score: 80,
    quality_status: 'approved',
    created_at: new Date().toISOString(),
    wallet_address: '0x456',
  },
]

export const onRequest: RequestHandler = async () => {
  return new Response(JSON.stringify(submissions), {
    headers: { 'Content-Type': 'application/json' },
  })
}