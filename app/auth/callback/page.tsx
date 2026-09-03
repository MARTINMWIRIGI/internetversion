"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from '@/lib/supabase/client';

export default function CallbackPage() {
  const router = useRouter()

  useEffect(() => {
    const handleCallback = async () => {

      const { data } = await supabase.auth.getSession()

      if (data.session) {
        localStorage.setItem("userEmail", data.session.user.email || "")
        router.push("/wizard")
      } else {
        router.push("/auth")
      }
    }

    handleCallback()
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-950 flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="animate-spin">
          <div className="w-8 h-8 border-4 border-purple-500/30 border-t-cyan-400 rounded-full"></div>
        </div>
        <p className="text-purple-300">Authenticating...</p>
      </div>
    </div>
  )
}
