// lib/supabase.ts
import { createClient } from './client'

// Re-export the client
export const supabase = createClient()

// Types for biometric data
export interface VoiceBiometric {
  id?: string
  user_id: string
  audio_sample_url: string
  audio_hash: string
  duration: number
  frequency_data: number[]
  created_at?: string
}

export interface FingerprintData {
  id?: string
  user_id: string
  fingerprint_hash: string
  device_info: Record<string, any>
  canvas_hash: string
  created_at?: string
}

export interface BehavioralData {
  id?: string
  user_id: string
  typing_pattern: Record<string, any>
  mouse_movements: any[]
  scroll_pattern: any[]
  created_at?: string
}

export interface BiometricSession {
  id?: string
  user_id: string
  voice_data_id?: string
  fingerprint_data_id?: string
  behavioral_data_id?: string
  completion_percentage: number
  encrypted_data_url: string
  minting_status: 'pending' | 'processing' | 'minted' | 'failed'
  nft_token_id?: string
  transaction_hash?: string
  created_at?: string
}