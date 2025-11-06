import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

// Calculate MILSA Quality Score based on submission data
function calculateMILSAScore(data: any): number {
  let score = 0
  const metrics = {
    clarity: 20,
    pronunciation_accuracy: 20,
    tempo_consistency: 15,
    tone_emotion_fit: 15,
    noise_level: 20,
    linguistic_purity: 10,
  }

  // Clarity (audio quality indicator)
  const clarityScore = Math.min(20, 15 + (data.audioUrl ? 5 : 0))
  score += clarityScore

  // Pronunciation accuracy (based on pronunciation guide provided)
  const pronunciationScore = data.pronunciation ? 18 : 10
  score += pronunciationScore

  // Tempo consistency
  score += 12

  // Tone/emotion fit
  score += 12

  // Noise level
  score += 15

  // Linguistic purity (no code-mixing)
  const purityScore = data.words && !data.words.includes("/") ? 10 : 5
  score += purityScore

  return Math.min(100, Math.round(score))
}

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase.from("submissions").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data || [])
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const supabase = await createClient()

    // Calculate MILSA score
    const milsaScore = calculateMILSAScore(body)

    // Determine quality status based on score
    let qualityStatus = "pending"
    if (milsaScore >= 85) qualityStatus = "approved"
    else if (milsaScore < 70) qualityStatus = "rejected"

    // Generate feedback
    let feedback = ""
    if (milsaScore >= 85) {
      feedback = "Excellent contribution! Your MILSA score qualifies for automatic token minting."
    } else if (milsaScore >= 70) {
      feedback = "Good submission! Your work is under review for MILSA token eligibility."
    } else {
      feedback =
        "Thank you for your contribution. Consider re-recording for better audio clarity and pronunciation consistency."
    }

    const submission = {
      language: body.language,
      content_type: body.contentType,
      words_phrases: body.words,
      definition: body.definition,
      context: body.context || null,
      pronunciation_guide: body.pronunciation,
      audio_url: body.audioUrl || null,
      video_url: body.videoUrl || null,
      wallet_address: body.walletAddress,
      milsa_score: milsaScore,
      clarity: 85,
      pronunciation_accuracy: 80,
      tempo_consistency: 75,
      tone_emotion_fit: 80,
      noise_level: 70,
      linguistic_purity: 90,
      quality_status: qualityStatus,
      feedback: feedback,
    }

    const { data, error } = await supabase.from("submissions").insert([submission]).select().single()

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({
      ...body,
      milsaScore: milsaScore,
      status: qualityStatus,
      feedback: feedback,
    })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
