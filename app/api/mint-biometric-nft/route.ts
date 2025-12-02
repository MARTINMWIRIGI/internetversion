// app/api/mint-biometric-nft/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const { sessionId, userId } = await request.json()
    
    if (!sessionId || !userId) {
      return NextResponse.json(
        { error: 'Missing sessionId or userId' },
        { status: 400 }
      )
    }
    
    // Create Supabase client
    const supabase = await createServerSupabaseClient()
    
    // Verify session exists
    const { data: session, error: sessionError } = await supabase
      .from('biometric_sessions')
      .select('*')
      .eq('id', sessionId)
      .eq('user_id', userId)
      .single()
    
    if (sessionError || !session) {
      console.log('Session error:', sessionError)
      // For demo, create a mock session if it doesn't exist
      const mockSession = {
        id: sessionId,
        user_id: userId,
        minting_status: 'pending'
      }
      
      // Update with processing status
      await supabase
        .from('biometric_sessions')
        .upsert({
          id: sessionId,
          user_id: userId,
          completion_percentage: 100,
          encrypted_data_url: `mock-data-${sessionId}`,
          minting_status: 'processing',
          updated_at: new Date().toISOString()
        })
      
    } else {
      // Update existing session
      await supabase
        .from('biometric_sessions')
        .update({ 
          minting_status: 'processing',
          updated_at: new Date().toISOString()
        })
        .eq('id', sessionId)
    }
    
    // Simulate blockchain processing delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Generate mock transaction hash for demo
    const mockTransactionHash = `0x${Array.from({length: 64}, () => 
      Math.floor(Math.random() * 16).toString(16)
    ).join('')}`
    
    const nftTokenId = `soul-bio-${Date.now()}`
    
    // Update session as minted
    await supabase
      .from('biometric_sessions')
      .update({ 
        minting_status: 'minted',
        nft_token_id: nftTokenId,
        transaction_hash: mockTransactionHash,
        updated_at: new Date().toISOString()
      })
      .eq('id', sessionId)
    
    return NextResponse.json({
      success: true,
      sessionId,
      txHash: mockTransactionHash,
      nftTokenId,
      nftUrl: `https://opensea.io/assets/matic/${nftTokenId}`,
      message: 'Biometric NFT minted successfully!',
      note: 'Demo: Connected to Supabase successfully'
    })
    
  } catch (error) {
    console.error('Minting error:', error)
    
    try {
      const { sessionId } = await request.json()
      const supabase = await createServerSupabaseClient()
      
      await supabase
        .from('biometric_sessions')
        .update({ 
          minting_status: 'failed',
          updated_at: new Date().toISOString()
        })
        .eq('id', sessionId)
    } catch (updateError) {
      console.error('Failed to update session status:', updateError)
    }
    
    return NextResponse.json(
      { 
        error: 'Failed to mint NFT',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}