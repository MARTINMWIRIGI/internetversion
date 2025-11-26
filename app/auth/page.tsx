"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(true)
  const [error, setError] = useState("")
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const supabase = createClient()
  const router = useRouter()

  // Check if already logged in
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession()
      if (data.session) {
        router.push("/vault")
      }
    }
    checkSession()
  }, [supabase, router])

  // META MASK LOGIN
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
      const account = accounts[0]

      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x89" }],
        })
      } catch (switchError: any) {
        if (switchError.code === 4902) {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0x89",
                chainName: "Polygon Mainnet",
                rpcUrls: ["https://polygon-rpc.com/"],
                nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
                blockExplorerUrls: ["https://polygonscan.com"],
              },
            ],
          })
        }
      }

      // Store wallet/email
      setWalletAddress(account)
      if (rememberMe) localStorage.setItem("walletAddress", account)
      sessionStorage.setItem("walletAddress", account)

      router.push("/vault")
    } catch (err) {
      console.error("[v0] MetaMask error:", err)
      setError("Failed to connect MetaMask")
    } finally {
      setIsLoading(false)
    }
  }

  // EMAIL LOGIN
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
        if (error) return setError(error.message)
        if (data.user) {
          if (rememberMe) localStorage.setItem("userEmail", email)
          sessionStorage.setItem("userEmail", email)
          setError("Check your email to confirm your account")
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) return setError(error.message)
        if (data.user) {
          if (rememberMe) localStorage.setItem("userEmail", email)
          sessionStorage.setItem("userEmail", email)
          router.push("/vault")
        }
      }
    } catch (err) {
      console.error("[v0] Auth error:", err)
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // GOOGLE LOGIN
  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    setError("")
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${window.location.origin}/auth/callback` },
      })
      if (error) setError("Failed to connect Google account")
    } catch (err) {
      console.error("[v0] Google sign-in error:", err)
      setError("An error occurred during Google sign-in")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-950 flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full space-y-8">
        <Link href="/" className="inline-flex items-center gap-2 text-purple-400 hover:text-cyan-400 transition text-sm">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <Card className="border-purple-500/30 overflow-hidden bg-purple-900/20 backdrop-blur-xl">
          <CardHeader className="bg-gradient-to-r from-purple-900/40 to-cyan-900/40 py-12 px-6 text-center space-y-4 border-b border-purple-500/20">
            <div className="flex justify-center">
              <Image src="/logo.png" alt="Soul Internet" width={64} height={64} className="rounded-lg" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              {isSignUp ? "Join the Vault" : "Welcome Back"}
            </h1>
            <p className="text-sm text-purple-300/70">
              {isSignUp ? "Create your account to start preserving culture" : "Unlock your vault and preserve heritage"}
            </p>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            {error && <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-xs text-red-300">{error}</div>}

            {/* Email Form */}
            <form onSubmit={handleEmailAuth} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
              <div className="flex items-center gap-2">
                <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
                <label>Remember me</label>
              </div>
              <button type="submit">{isLoading ? "Processing..." : isSignUp ? "Create Account" : "Sign In"}</button>
            </form>

            <button onClick={() => setIsSignUp(!isSignUp)} className="text-xs text-cyan-400 hover:text-purple-400">
              {isSignUp ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
            </button>

            {/* MetaMask */}
            <button onClick={handleMetaMaskConnect}>
              {isLoading ? "Connecting..." : "Connect MetaMask"}
            </button>

            {/* Google */}
            <button onClick={handleGoogleSignIn}>
              {isLoading ? "Signing in..." : "Sign in with Google"}
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}