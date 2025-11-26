// app/api/submissions/route.ts
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

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

// Dummy data fallback
const dummySubmissions: NFTSubmission[] = [
  {
    id: "1",
    language: "Kikuyu",
    words_phrases: "Habari",
    content_type: "word",
    milsa_score: 95,
    quality_status: "approved",
    created_at: new Date().toISOString(),
    wallet_address: "0x123",
    nftMetadataUrl: undefined,
  },
  {
    id: "2",
    language: "Swahili",
    words_phrases: "Jambo",
    content_type: "phrase",
    milsa_score: 88,
    quality_status: "approved",
    created_at: new Date().toISOString(),
    wallet_address: "0x456",
    nftMetadataUrl: undefined,
  },
]

export async function GET(req: NextRequest) {
  try {
    // If you want to fetch from Supabase, uncomment and configure below
    /*
    const supabase = createClient()
    const { data, error } = await supabase.from("nft_submissions").select("*")
    if (error) {
      console.error("Supabase fetch error:", error)
      return NextResponse.json(dummySubmissions)
    }
    return NextResponse.json(data || dummySubmissions)
    */

    // Currently returning dummy data
    return NextResponse.json(dummySubmissions)
  } catch (error) {
    console.error("API /submissions error:", error)
    return NextResponse.json(dummySubmissions)
  }
}