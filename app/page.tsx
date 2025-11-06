"use client"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <main className="min-h-screen bg-background overflow-hidden">
      <section className="relative min-h-screen flex items-center justify-center py-16 md:py-0 px-4 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl float-animation"></div>
          <div
            className="absolute bottom-20 left-10 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl float-animation"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="relative max-w-5xl mx-auto z-10">
          <div className="space-y-8 text-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                <span className="gradient-text">Preserve Humanity's Voice</span>
              </h2>
              <p className="text-base md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Record languages, share culture, earn Web3 rewards. Every linguistic gem you preserve builds a permanent
                global archive—backed by blockchain security and fairness.
              </p>
            </div>

            <div className="flex gap-4 justify-center flex-wrap pt-4">
              <Link href="/wizard">
                <Button
                  size="lg"
                  className="gradient-accent text-white font-semibold shadow-2xl hover:shadow-purple-500/50 transition-all"
                >
                  Start Contributing
                </Button>
              </Link>
              <Link href="/gallery">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 bg-transparent"
                >
                  Browse Gallery
                </Button>
              </Link>
            </div>

            {/* Feature cards grid */}
            <div className="grid md:grid-cols-3 gap-6 mt-16 pt-8">
              <Card className="glow-card premium-hover">
                <CardHeader>
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/30 to-cyan-500/30 flex items-center justify-center mb-4">
                    <span className="text-3xl">🎙️</span>
                  </div>
                  <CardTitle className="text-purple-300">Record & Share</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <p className="text-cyan-400 font-semibold">What You Do</p>
                  <p className="text-gray-400">
                    Submit audio recordings of words, phrases, and cultural sounds with context and definitions.
                  </p>
                </CardContent>
              </Card>

              <Card className="glow-card premium-hover">
                <CardHeader>
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500/30 to-purple-500/30 flex items-center justify-center mb-4">
                    <span className="text-3xl">✨</span>
                  </div>
                  <CardTitle className="text-cyan-300">Get Verified</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <p className="text-purple-400 font-semibold">AI Scoring</p>
                  <p className="text-gray-400">
                    Our MILSA AI automatically scores quality, pronunciation, and cultural authenticity.
                  </p>
                </CardContent>
              </Card>

              <Card className="glow-card premium-hover">
                <CardHeader>
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/30 to-cyan-500/30 flex items-center justify-center mb-4">
                    <span className="text-3xl">💎</span>
                  </div>
                  <CardTitle className="text-purple-300">Earn & Mint</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <p className="text-cyan-400 font-semibold">Web3 Rewards</p>
                  <p className="text-gray-400">
                    High-quality submissions mint as NFTs on OpenSea. Earn MILSA tokens to your wallet.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Web3 Education Section */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-transparent to-purple-900/10">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center space-y-3 mb-16">
            <h3 className="text-3xl md:text-4xl font-bold gradient-text">New to Web3? We've Got You</h3>
            <p className="text-gray-400">We make blockchain simple for linguistic preservers</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
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
                  <div className="flex items-start gap-4">
                    <span className="text-3xl">{item.icon}</span>
                    <CardTitle className="text-cyan-300">{item.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="gradient-accent text-white py-16 md:py-20 px-4">
        <div className="container mx-auto text-center max-w-2xl">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">Ready to Preserve & Earn?</h3>
          <p className="text-lg mb-8 text-white/90">
            Join a global community preserving humanity's linguistic heritage while earning real Web3 rewards.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/wizard">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 font-semibold shadow-lg">
                Start Contributing
              </Button>
            </Link>
            <Link href="/gallery">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-transparent">
                View Gallery
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-purple-500/20 bg-black/30 backdrop-blur py-12">
        <div className="container mx-auto px-4 text-center text-sm text-gray-400 space-y-4">
          <p className="font-semibold text-purple-400">Soul Internet Vault Guardian</p>
          <p>Preserving humanity's linguistic and cultural heritage through Web3 technology</p>
          <p className="text-xs">MILSA Quality Scoring • Polygon • MetaMask • OpenSea</p>
          <p className="text-xs text-gray-500">
            Not financial advice. Crypto involves risk. Learn before you contribute.
          </p>
          <p className="text-xs text-gray-600 pt-4 border-t border-gray-700">
            © Soul-Internet | Powered by IMPERIAL ENTERPRISE
          </p>
        </div>
      </footer>
    </main>
  )
}
