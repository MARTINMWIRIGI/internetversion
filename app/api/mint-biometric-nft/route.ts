// app/api/mint-biometric-nft/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { sessionId, userId } = await request.json()
    
    // Verify user and session
    const { data: session, error: sessionError } = await supabase
      .from('biometric_sessions')
      .select('*')
      .eq('id', sessionId)
      .eq('user_id', userId)
      .single()
    
    if (sessionError || !session) {
      return NextResponse.json(
        { error: 'Invalid session' },
        { status: 404 }
      )
    }
    
    // Update session status
    const { error: updateError } = await supabase
      .from('biometric_sessions')
      .update({ minting_status: 'processing' })
      .eq('id', sessionId)
    
    if (updateError) throw updateError
    
    // Here you would:
    // 1. Call your blockchain service (Ethereum, Solana, etc.)
    // 2. Mint the NFT with biometric metadata
    // 3. Store the transaction hash
    
    // For now, simulate minting
    const mockTransactionHash = `0x${Array.from({length: 64}, () => 
      Math.floor(Math.random() * 16).toString(16)
    ).join('')}`
    
    // Update with minting result
    const { error: finalizeError } = await supabase
      .from('biometric_sessions')
      .update({ 
        minting_status: 'minted',
        nft_token_id: `soul-bio-${Date.now()}`,
        transaction_hash: mockTransactionHash
      })
      .eq('id', sessionId)
    
    if (finalizeError) throw finalizeError
    
    return NextResponse.json({
      success: true,
      sessionId,
      txHash: mockTransactionHash,
      nftUrl: `https://opensea.io/assets/ethereum/0x.../${sessionId}`,
      message: 'Biometric NFT minted successfully!'
    })
    
  } catch (error) {
    console.error('Minting error:', error)
    
    // Update session as failed
    const { sessionId } = await request.json()
    await supabase
      .from('biometric_sessions')
      .update({ minting_status: 'failed' })
      .eq('id', sessionId)
    
    return NextResponse.json(
      { error: 'Failed to mint NFT' },
      { status: 500 }
    )
  }
}