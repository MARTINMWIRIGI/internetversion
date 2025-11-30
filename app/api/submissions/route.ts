import { NextResponse } from "next/server"
import { createClient } from '@/lib/supabase/client'

export async function POST(req: Request) {
  try {
    const {
      language,
      content_type,
      words_phrases,
      definition,
      context,
      audio_url,
      wallet_address,
      nft_metadata_url,
      transaction_hash,
      milsa_score,
      quality_status
    } = await req.json()

    const supabase = createClient()

    const { data, error } = await supabase
      .from('nft_submissions')
      .insert([
        {
          language,
          content_type,
          words_phrases,
          definition,
          context,
          audio_url,
          wallet_address,
          nft_metadata_url,
          transaction_hash,
          milsa_score,
          quality_status,
          created_at: new Date().toISOString()
        }
      ])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}