"use client"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { TooltipHelp } from "@/components/tooltip-help"

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <main className="min-h-screen bg-background overflow-hidden">
      {/* Hero Section - Mobile First Responsive */}
      <section className="relative min-h-screen flex items-center justify-center py-20 md:py-24 lg:py-0 px-4 md:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 md:top-20 right-5 md:right-10 w-64 md:w-96 h-64 md:h-96 bg-purple-600/20 rounded-full blur-3xl float-animation"></div>
          <div
            className="absolute bottom-10 md:bottom-20 left-5 md:left-10 w-64 md:w-96 h-64 md:h-96 bg-cyan-600/20 rounded-full blur-3xl float-animation"
            style={{ animationDelay: "2s" }}
          ></div>

          {/* Network nodes pattern - responsive */}
          <div className="absolute inset-0 opacity-20 md:opacity-30">
            <svg className="w-full h-full" viewBox="0 0 1200 1200" preserveAspectRatio="xMidYMid slice">
              <defs>
                <pattern id="dots" x="100" y="100" width="100" height="100" patternUnits="userSpaceOnUse">
                  <circle cx="50" cy="50" r="2" fill="#06b6d4" opacity="0.3" />
                </pattern>
                <linearGradient id="fadeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              <rect width="1200" height="1200" fill="url(#dots)" />
              <rect width="1200" height="1200" fill="url(#fadeGradient)" />
            </svg>
          </div>
        </div>

        <div className="relative max-w-5xl mx-auto z-10 w-full">
          <div className="space-y-6 md:space-y-8 text-center">
            <div className="space-y-4 md:space-y-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
                <span className="gradient-text block">Control Your Digital Identity</span>
                <span className="text-foreground block">Across Every Platform</span>
              </h1>

              <div className="space-y-2 md:space-y-3">
                <p className="text-base md:text-lg text-purple-300 font-semibold">What is MultiSoul?</p>
                <p className="text-sm md:text-base text-gray-300 max-w-3xl mx-auto leading-relaxed px-4 md:px-0">
                  Your linguistic and cultural identity preserved on the blockchain. Every word you record, every phrase
                  you share becomes a permanent, authenticated record of your heritage—owned entirely by you, never
                  locked by any platform.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center flex-wrap pt-6 md:pt-8 px-4 md:px-0">
              <Link href="/wizard" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto h-12 md:h-14 gradient-accent text-white font-semibold px-6 md:px-8 text-base md:text-lg shadow-2xl hover:shadow-purple-500/50 transition-all hover:-translate-y-1 pulse-glow"
                >
                  Get Started Now
                </Button>
              </Link>
              <Link href="/gallery" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto h-12 md:h-14 border-2 border-cyan-500 text-cyan-300 hover:bg-cyan-500/10 hover:text-cyan-200 bg-transparent px-6 md:px-8 text-base md:text-lg transition-all"
                >
                  Explore Gallery
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mt-12 md:mt-16 pt-6 md:pt-8 px-4 md:px-0">
              <Card className="glow-card premium-hover">
                <CardHeader>
                  <div className="w-12 md:w-14 h-12 md:h-14 rounded-xl bg-gradient-to-br from-purple-500/30 to-cyan-500/30 flex items-center justify-center mb-3 md:mb-4 mx-auto">
                    <span className="text-2xl md:text-3xl">🎙️</span>
                  </div>
                  <CardTitle className="text-purple-300 text-base md:text-lg">Record & Share</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 md:space-y-3 text-xs md:text-sm">
                  <p className="text-cyan-400 font-semibold">What You Do</p>
                  <p className="text-gray-400 leading-relaxed">
                    Submit audio recordings of words, phrases, and cultural sounds with context and definitions.
                  </p>
                </CardContent>
              </Card>

              <Card className="glow-card premium-hover">
                <CardHeader>
                  <div className="w-12 md:w-14 h-12 md:h-14 rounded-xl bg-gradient-to-br from-cyan-500/30 to-purple-500/30 flex items-center justify-center mb-3 md:mb-4 mx-auto">
                    <span className="text-2xl md:text-3xl">✨</span>
                  </div>
                  <CardTitle className="text-cyan-300 text-base md:text-lg">Get Verified</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 md:space-y-3 text-xs md:text-sm">
                  <p className="text-purple-400 font-semibold">AI Scoring</p>
                  <p className="text-gray-400 leading-relaxed">
                    Our MILSA AI automatically scores quality, pronunciation, and cultural authenticity.
                  </p>
                </CardContent>
              </Card>

              <Card className="glow-card premium-hover">
                <CardHeader>
                  <div className="w-12 md:w-14 h-12 md:h-14 rounded-xl bg-gradient-to-br from-purple-500/30 to-cyan-500/30 flex items-center justify-center mb-3 md:mb-4 mx-auto">
                    <span className="text-2xl md:text-3xl">💎</span>
                  </div>
                  <CardTitle className="text-purple-300 text-base md:text-lg">Earn & Mint</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 md:space-y-3 text-xs md:text-sm">
                  <p className="text-cyan-400 font-semibold">Web3 Rewards</p>
                  <p className="text-gray-400 leading-relaxed">
                    High-quality submissions mint as NFTs on OpenSea. Earn MILSA tokens to your wallet.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Web3 Education Section - Mobile Responsive */}
      <section className="py-12 md:py-16 lg:py-24 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-transparent to-purple-900/10">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center space-y-2 md:space-y-3 mb-10 md:mb-16">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold gradient-text">New to Web3? We've Got You</h3>
            <p className="text-sm md:text-base text-gray-400">We make blockchain simple for linguistic preservers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {[
              {
                title: "What is Web3 & Blockchain?",
                desc: "Web3 is the internet where you own and control your rewards. Blockchain is a transparent, permanent record that nobody can cheat.",
                icon: "🔐",
              },
              {
                title: "MetaMask & Digital Wallets",
                desc: "Your secure digital wallet for blockchain rewards. Think of it as a safe purse for your earnings. Only you can access it.",
                icon: "👝",
              },
              {
                title: "Polygon Network",
                desc: "Polygon is fast and cheap. Your MILSA tokens move quickly across the Polygon Mainnet with minimal fees.",
                icon: "⚡",
              },
              {
                title: "NFTs & OpenSea",
                desc: "Your quality submissions become collectible NFTs. Mint them on OpenSea and own a piece of linguistic history.",
                icon: "🎨",
              },
            ].map((item, i) => (
              <Card key={i} className="glow-card premium-hover">
                <CardHeader>
                  <div className="flex items-start gap-3 md:gap-4">
                    <span className="text-2xl md:text-3xl flex-shrink-0">{item.icon}</span>
                    <CardTitle className="text-cyan-300 text-base md:text-lg">{item.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 text-xs md:text-sm leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Explanation Section with Tooltips */}
      <section className="py-12 md:py-16 lg:py-24 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-gradient-to-br from-purple-500/10 to-cyan-500/10 border border-purple-500/20 rounded-2xl p-6 md:p-8 space-y-4">
            <h3 className="text-xl md:text-2xl font-bold text-cyan-300">Key Terms Explained</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <p className="text-gray-300 text-sm md:text-base">
                  Your personal{" "}
                  <TooltipHelp
                    term="Vault"
                    description="Your secure storage space on Soul Internet where all your recorded contributions and earned NFTs are stored. Only you can access it with your wallet."
                  />{" "}
                  contains your contributions and minted NFTs.
                </p>
              </div>
              <div>
                <p className="text-gray-300 text-sm md:text-base">
                  <TooltipHelp
                    term="MultiSoul"
                    description="Your complete linguistic and cultural identity stored on blockchain. It includes all your language recordings, heritage data, and earned rewards across multiple platforms."
                  />{" "}
                  is your blockchain-verified linguistic identity.
                </p>
              </div>
              <div>
                <p className="text-gray-300 text-sm md:text-base">
                  <TooltipHelp
                    term="MILSA"
                    description="Multi-Linguistic Soul Authentication. Our AI-powered quality scoring system that evaluates audio clarity, pronunciation accuracy, cultural authenticity, and linguistic purity (0-100 scale)."
                  />{" "}
                  scores reward your contributions.
                </p>
              </div>
              <div>
                <p className="text-gray-300 text-sm md:text-base">
                  <TooltipHelp
                    term="NFT"
                    description="Non-Fungible Token. A unique digital certificate of ownership for your recorded words. Each NFT is one-of-a-kind and represents your authentic linguistic contribution."
                  />{" "}
                  tokens prove authenticity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="gradient-accent text-white py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto text-center max-w-2xl">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">Ready to Preserve & Earn?</h3>
          <p className="text-base md:text-lg mb-6 md:mb-8 text-white/90 px-4 md:px-0">
            Join a global community preserving humanity's linguistic heritage while earning real Web3 rewards.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center flex-wrap px-4 md:px-0">
            <Link href="/wizard" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto h-12 md:h-14 bg-white text-purple-600 hover:bg-gray-100 font-semibold shadow-lg"
              >
                Start Contributing
              </Button>
            </Link>
            <Link href="/gallery" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto h-12 md:h-14 border-white text-white hover:bg-white/10 bg-transparent"
              >
                View Gallery
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-purple-500/20 bg-black/30 backdrop-blur py-8 md:py-12 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto text-center text-xs md:text-sm text-gray-400 space-y-3 md:space-y-4">
          <p className="font-semibold text-purple-400 text-sm md:text-base">Soul Internet Vault Guardian</p>
          <p className="text-xs md:text-sm">
            Preserving humanity's linguistic and cultural heritage through Web3 technology
          </p>
          <p className="text-xs text-gray-500">MILSA Quality Scoring • Polygon • MetaMask • OpenSea</p>
          <p className="text-xs text-gray-600">
            Not financial advice. Crypto involves risk. Learn before you contribute.
          </p>
          <p className="text-xs text-gray-600 pt-3 md:pt-4 border-t border-gray-700">
            © Soul-Internet | Powered by IMPERIAL ENTERPRISE
          </p>
        </div>
      </footer>
    </main>
  )
}
