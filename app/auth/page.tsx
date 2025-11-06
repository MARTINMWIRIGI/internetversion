"use client"
import Link from "next/link"
import type React from "react"

import Image from "next/image"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(true)
  const [error, setError] = useState("")
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession()
      if (data.session) {
        router.push("/wizard")
      }
    }
    checkSession()
  }, [supabase, router])

  const handleMetaMaskConnect = async () => {
    setIsLoading(true)
    setError("")
    try {
      if (typeof window === "undefined" || !window.ethereum) {
        alert("Please install MetaMask to continue")
        window.open("https://metamask.io/download/", "_blank")
        return
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      })

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
                nativeCurrency: {
                  name: "MATIC",
                  symbol: "MATIC",
                  decimals: 18,
                },
                blockExplorerUrls: ["https://polygonscan.com"],
              },
            ],
          })
        }
      }

      // Store wallet in session storage
      if (rememberMe) {
        localStorage.setItem("walletAddress", accounts[0])
      }
      sessionStorage.setItem("walletAddress", accounts[0])
      router.push("/wizard")
    } catch (error) {
      console.error("[v0] MetaMask error:", error)
      setError("Failed to connect MetaMask. Please try again.")
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
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        console.error("[v0] Google auth error:", error)
        setError("Failed to connect Google account")
      }
    } catch (error) {
      console.error("[v0] Google sign-in error:", error)
      setError("An error occurred during Google sign-in")
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
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        })

        if (error) {
          setError(error.message)
          return
        }

        if (data.user) {
          if (rememberMe) {
            localStorage.setItem("userEmail", email)
          }
          sessionStorage.setItem("userEmail", email)
          setError("Check your email to confirm your account")
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (error) {
          setError(error.message)
          return
        }

        if (data.user) {
          if (rememberMe) {
            localStorage.setItem("userEmail", email)
          }
          sessionStorage.setItem("userEmail", email)
          router.push("/wizard")
        }
      }
    } catch (error) {
      console.error("[v0] Auth error:", error)
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-950 overflow-hidden">
      {/* ... existing background elements ... */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `pulse ${2 + Math.random() * 2}s infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="relative min-h-screen flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full space-y-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-purple-400 hover:text-cyan-400 transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <Card className="border-purple-500/30 overflow-hidden bg-purple-900/20 backdrop-blur-xl">
            <CardHeader className="bg-gradient-to-r from-purple-900/40 to-cyan-900/40 py-12 px-6 text-center space-y-4 border-b border-purple-500/20">
              <div className="flex justify-center">
                <div className="w-16 h-16 relative">
                  <Image src="/logo.png" alt="Soul Internet" width={64} height={64} className="rounded-lg" />
                </div>
              </div>
              <div className="space-y-2">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  {isSignUp ? "Join the Vault" : "Welcome Back"}
                </h1>
                <p className="text-sm text-purple-300/70">
                  {isSignUp
                    ? "Create your account to start preserving culture"
                    : "Unlock your cultural vault and start preserving linguistic heritage"}
                </p>
              </div>
            </CardHeader>

            <CardContent className="p-6 space-y-6">
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                  <p className="text-xs text-red-300">{error}</p>
                </div>
              )}

              {/* Email/Password Form */}
              <form onSubmit={handleEmailAuth} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-purple-400 mb-2">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2 rounded-lg bg-purple-900/20 border border-purple-500/30 text-white placeholder-purple-400/50 focus:outline-none focus:border-cyan-500/60 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-purple-400 mb-2">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-2 rounded-lg bg-purple-900/20 border border-purple-500/30 text-white placeholder-purple-400/50 focus:outline-none focus:border-cyan-500/60 transition-colors"
                    placeholder="••••••••"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded cursor-pointer"
                  />
                  <label htmlFor="remember" className="text-xs text-purple-300/70 cursor-pointer">
                    Remember me on this device
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full group relative overflow-hidden rounded-xl border border-cyan-500/30 hover:border-purple-500/60 bg-gradient-to-br from-purple-900/20 to-cyan-900/20 hover:from-purple-900/40 hover:to-cyan-900/40 p-4 transition-all duration-300 disabled:opacity-50 font-semibold text-white"
                >
                  {isLoading ? "Processing..." : isSignUp ? "Create Account" : "Sign In"}
                </button>
              </form>

              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp)
                  setError("")
                }}
                className="w-full text-xs text-cyan-400 hover:text-purple-400 transition-colors"
              >
                {isSignUp ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
              </button>

              {/* Divider */}
              <div className="relative flex items-center gap-3">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
                <span className="text-xs text-purple-400/50">or</span>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
              </div>

              {/* MetaMask Option */}
              <div className="space-y-3">
                <p className="text-xs font-semibold text-purple-400 uppercase tracking-wider">Web3 Authentication</p>
                <button
                  onClick={handleMetaMaskConnect}
                  disabled={isLoading}
                  className="w-full group relative overflow-hidden rounded-xl border border-purple-500/30 hover:border-cyan-500/60 bg-gradient-to-br from-purple-900/20 to-cyan-900/20 hover:from-purple-900/40 hover:to-cyan-900/40 p-4 transition-all duration-300 disabled:opacity-50"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-cyan-500/0 to-purple-500/0 group-hover:from-purple-500/10 group-hover:via-cyan-500/10 group-hover:to-purple-500/10 transition-all duration-300" />
                  <div className="relative flex items-center gap-3 justify-center">
                    <Image
                      src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg"
                      alt="MetaMask"
                      width={24}
                      height={24}
                    />
                    <div className="text-left">
                      <p className="font-semibold text-white text-sm">
                        {isLoading ? "Connecting..." : "Connect MetaMask"}
                      </p>
                      <p className="text-xs text-cyan-400">Polygon Mainnet</p>
                    </div>
                  </div>
                </button>
              </div>

              {/* Google Option */}
              <div className="space-y-3">
                <p className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">Social Authentication</p>
                <button
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                  className="w-full group relative overflow-hidden rounded-xl border border-cyan-500/30 hover:border-purple-500/60 bg-gradient-to-br from-cyan-900/20 to-purple-900/20 hover:from-cyan-900/40 hover:to-purple-900/40 p-4 transition-all duration-300 disabled:opacity-50"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-purple-500/0 to-cyan-500/0 group-hover:from-cyan-500/10 group-hover:via-purple-500/10 group-hover:to-cyan-500/10 transition-all duration-300" />
                  <div className="relative flex items-center gap-3 justify-center">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    <div className="text-left">
                      <p className="font-semibold text-white text-sm">
                        {isLoading ? "Signing in..." : "Sign in with Google"}
                      </p>
                      <p className="text-xs text-purple-400">OAuth authentication</p>
                    </div>
                  </div>
                </button>
              </div>

              {/* Info Box */}
              <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4 space-y-2">
                <p className="text-xs font-semibold text-purple-300">Why authentication?</p>
                <p className="text-xs text-purple-300/70 leading-relaxed">
                  Your data is securely stored in your personal vault. MetaMask connects you to Web3 rewards on Polygon.
                  Email provides traditional sign-in.
                </p>
              </div>

              <p className="text-xs text-center text-purple-400/50">
                By signing in, you agree to our{" "}
                <Link href="/terms" className="text-cyan-400 hover:underline">
                  Terms
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-cyan-400 hover:underline">
                  Privacy Policy
                </Link>
              </p>
            </CardContent>
          </Card>

          {/* ... existing feature benefits ... */}
          <div className="grid grid-cols-2 gap-3">
            <Card className="border-purple-500/30 bg-purple-900/20 backdrop-blur-xl p-4">
              <div className="space-y-2">
                <p className="text-2xl">🔐</p>
                <p className="text-xs font-semibold text-cyan-300">Secure</p>
                <p className="text-xs text-purple-300/70">Your data, encrypted & private</p>
              </div>
            </Card>
            <Card className="border-purple-500/30 bg-purple-900/20 backdrop-blur-xl p-4">
              <div className="space-y-2">
                <p className="text-2xl">💰</p>
                <p className="text-xs font-semibold text-purple-300">Earn</p>
                <p className="text-xs text-purple-300/70">Web3 rewards & NFTs</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
