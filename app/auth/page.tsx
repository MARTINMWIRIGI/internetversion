"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export default function AuthPage() {
  const [mounted, setMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(true)
  const [error, setError] = useState("")
  const [walletConnected, setWalletConnected] = useState(false)

  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    setMounted(true) // now safe to access window/localStorage
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession()
      if (data.session) router.push("/wizard")
    }
    checkSession()
  }, [supabase, router])

  if (!mounted) return null // don't render anything until mounted

  const handleMetaMaskConnect = async () => {
    setIsLoading(true)
    setError("")
    try {
      if (!window.ethereum) {
        alert("Please install MetaMask")
        window.open("https://metamask.io/download/", "_blank")
        return
      }
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
      if (rememberMe) localStorage.setItem("walletAddress", accounts[0])
      sessionStorage.setItem("walletAddress", accounts[0])
      setWalletConnected(true)
      router.push("/wizard")
    } catch (err) {
      console.error(err)
      setError("MetaMask connection failed")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    setError("")
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${window.location.origin}/auth/callback` },
      })
      if (error) setError(error.message)
    } catch (err) {
      console.error(err)
      setError("Google sign-in failed")
    } finally {
      setIsLoading(false)
    }
  }

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
        })
        if (error) setError(error.message)
        else {
          if (rememberMe) localStorage.setItem("userEmail", email)
          sessionStorage.setItem("userEmail", email)
          setError("Check your email to confirm your account")
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) setError(error.message)
        else {
          if (rememberMe) localStorage.setItem("userEmail", email)
          sessionStorage.setItem("userEmail", email)
          router.push("/wizard")
        }
      }
    } catch (err) {
      console.error(err)
      setError("Auth error")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-950 overflow-hidden">
      {/* Your full UI here */}
      {/* ... include your Card, forms, MetaMask/Google buttons as before ... */}
      <div className="relative min-h-screen flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full space-y-8">
          <Link href="/" className="inline-flex items-center gap-2 text-purple-400 hover:text-cyan-400 transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <Card className="border-purple-500/30 overflow-hidden bg-purple-900/20 backdrop-blur-xl">
            <CardHeader className="bg-gradient-to-r from-purple-900/40 to-cyan-900/40 py-12 px-6 text-center space-y-4 border-b border-purple-500/20">
              <div className="flex justify-center">
                <Image src="/logo.png" alt="Soul Internet" width={64} height={64} className="rounded-lg" />
              </div>
              <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400">
                {isSignUp ? "Join the Vault" : "Welcome Back"}
              </h1>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {error && <p className="text-red-400 text-sm">{error}</p>}
              <form onSubmit={handleEmailAuth} className="space-y-4">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                <button type="submit" disabled={isLoading}>{isSignUp ? "Sign Up" : "Sign In"}</button>
              </form>
              <button onClick={handleMetaMaskConnect}>Connect MetaMask</button>
              <button onClick={handleGoogleSignIn}>Sign in with Google</button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}