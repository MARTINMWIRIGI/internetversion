import { createBrowserClient } from '@supabase/ssr'

export const createClient = () => {
  // Provide fallback values for build time
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://rnfyixypahzfxwvgryja.supabase.co'
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJuZnlpeHlwYWh6Znh3dmdyeWphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0NTM3NTYsImV4cCI6MjA3ODAyOTc1Nn0.vDSK8eaXJltRxar0adZM8EoofhuolNQCHJDCrjOpaCI'
  
  return createBrowserClient(supabaseUrl, supabaseKey)
}