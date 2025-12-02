// lib/supabase.ts - Updated to work with SSR
import { createClient } from '@supabase/supabase-js'

// Your Supabase credentials
const supabaseUrl = 'https://rnfyixypahzfxwvgryja.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJuZnlpeHlwYWh6Znh3dmdyeWphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0NTM3NTYsImV4cCI6MjA3ODAyOTc1Nn0.vDSK8eaXJltRxar0adZM8EoofhuolNQCHJDCrjOpaCI'

// Create and export the Supabase client
// Use createClient instead of createBrowserClient for SSR compatibility
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for biometric data (keep your existing types here)
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

// Helper functions for common operations
export const supabaseHelpers = {
  // Check if Supabase is properly initialized
  isInitialized: () => true, // Always true with hardcoded values
  
  // Get the current session
  getSession: async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      return session
    } catch (error) {
      console.error('Error getting session:', error)
      return null
    }
  },
  
  // Get current user
  getCurrentUser: async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      return user
    } catch (error) {
      console.error('Error getting user:', error)
      return null
    }
  }
}