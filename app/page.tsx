"use client"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { WalletConnectButton } from "@/components/wallet-connect-button"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-purple-50/50">
      <header className="border-b border-purple-200/40 bg-white/80 backdrop-blur-md sticky top-0 z-50 soft-shadow">
        <div className="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 md:w-12 md:h-12 relative flex-shrink-0">
              <Image src="/logo.png" alt="Soul Internet Logo" width={48} height={48} className="rounded-lg" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-base md:text-lg font-bold gradient-text">Soul Internet</h1>
              <p className="text-xs text-purple-600">Unlock Your MultiSoul</p>
            </div>
          </Link>

          <div className="flex items-center gap-2 md:gap-3 ml-auto">
            <Link href="/vault" className="hidden sm:block">
              <Button variant="ghost" className="text-purple-700 hover:bg-purple-100">
                My Vault
              </Button>
            </Link>
            <WalletConnectButton />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-6 text-center">
            <div>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
                <span className="gradient-text">Preserve Humanity's Voice</span>
              </h2>
              <p className="text-base md:text-lg text-purple-700 max-w-2xl mx-auto leading-relaxed">
                Record languages, share culture, earn rewards. Every linguistic gem you preserve helps build a permanent
                global archive—and you get compensated through blockchain technology.
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/wizard">
              <Button
                size="lg"
                className="gradient-accent text-white font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                Start Contributing
              </Button>
            </Link>
            <Link href="/vault">
              <Button
                size="lg"
                variant="outline"
                className="border-purple-300 text-purple-700 hover:bg-purple-50 bg-transparent"
              >
                View My Vault
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-4 md:gap-6 mt-12">
            <Card className="glow-border bg-gradient-to-br from-white to-purple-50 card-hover">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600/20 to-purple-400/20 flex items-center justify-center mb-3">
                  <span className="text-2xl">🎙️</span>
                </div>
                <CardTitle className="text-purple-900">Record & Share</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p className="text-purple-700 font-semibold">What you do:</p>
                <p className="text-gray-700">
                  Submit audio recordings of words, phrases, and cultural sounds in your language with context and
                  definitions.
                </p>
              </CardContent>
            </Card>

            <Card className="glow-border bg-gradient-to-br from-white to-cyan-50 card-hover">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500/20 to-cyan-400/20 flex items-center justify-center mb-3">
                  <span className="text-2xl">✨</span>
                </div>
                <CardTitle className="text-cyan-900">Get Verified</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p className="text-cyan-700 font-semibold">How it works:</p>
                <p className="text-gray-700">
                  Our AI system (MILSA) scores audio quality, pronunciation accuracy, and cultural authenticity
                  automatically.
                </p>
              </CardContent>
            </Card>

            <Card className="glow-border bg-gradient-to-br from-white to-purple-50 card-hover">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600/20 to-cyan-400/20 flex items-center justify-center mb-3">
                  <span className="text-2xl">💎</span>
                </div>
                <CardTitle className="text-purple-900">Earn Rewards</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p className="text-purple-700 font-semibold">The benefit:</p>
                <p className="text-gray-700">
                  High-quality submissions (score ≥85) earn MILSA tokens directly to your connected Web3 wallet.
                </p>
              </CardContent>
            </Card>
          </div>

          <section className="mt-16 space-y-8">
            <div className="text-center space-y-2 mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-purple-900">
                New to Web3? Here's What You Need to Know
              </h3>
              <p className="text-gray-600">We make blockchain rewards simple and accessible</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* What is Web3? */}
              <Card className="glow-border bg-white card-hover">
                <CardHeader>
                  <CardTitle className="text-purple-900 text-lg">What is Web3 & Blockchain?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div>
                    <p className="font-semibold text-purple-700 mb-2">Think of it like this:</p>
                    <p className="text-gray-700">
                      Web3 is the internet's new way of handling money and ownership. Instead of a bank holding your
                      money, <strong>you control it</strong> with a digital wallet.
                    </p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                    <p className="text-purple-900">
                      <strong>Blockchain</strong> = A shared record book that nobody can cheat or change. Like a
                      permanent, transparent ledger everyone can see.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* What is a Wallet? */}
              <Card className="glow-border bg-white card-hover">
                <CardHeader>
                  <CardTitle className="text-purple-900 text-lg">What is MetaMask & Wallets?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div>
                    <p className="font-semibold text-purple-700 mb-2">MetaMask = Your Digital Wallet</p>
                    <p className="text-gray-700">
                      It's like a secure digital purse for your blockchain-based rewards. You'll connect it above, and
                      your earnings go straight there.
                    </p>
                  </div>
                  <div className="bg-cyan-50 p-3 rounded-lg border border-cyan-200">
                    <p className="text-cyan-900">
                      <strong>Safe?</strong> Yes! Your wallet stays private—only you can access it with your secret
                      recovery phrase.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Polygon Network */}
              <Card className="glow-border bg-white card-hover">
                <CardHeader>
                  <CardTitle className="text-purple-900 text-lg">What is Polygon?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div>
                    <p className="font-semibold text-purple-700 mb-2">Polygon = Fast & Cheap</p>
                    <p className="text-gray-700">
                      Polygon is a blockchain network that's faster and costs way less than others. Your MILSA tokens
                      move quickly and cheaply on Polygon Mainnet.
                    </p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                    <p className="text-purple-900">
                      <strong>Mainnet?</strong> That's the "real" network where real money moves. Not a test network.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* MILSA Tokens */}
              <Card className="glow-border bg-white card-hover">
                <CardHeader>
                  <CardTitle className="text-purple-900 text-lg">What are MILSA Tokens?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div>
                    <p className="font-semibold text-purple-700 mb-2">MILSA = Your Reward Token</p>
                    <p className="text-gray-700">
                      MILSA tokens are digital rewards you earn for high-quality contributions. They're yours to keep,
                      trade, or use—they have real value.
                    </p>
                  </div>
                  <div className="bg-cyan-50 p-3 rounded-lg border border-cyan-200">
                    <p className="text-cyan-900">
                      <strong>Score ≥85?</strong> Your submission auto-mints MILSA tokens to your wallet instantly.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <Card className="glow-border bg-gradient-to-br from-purple-50/50 to-cyan-50/50 mt-12">
            <CardHeader>
              <CardTitle className="gradient-text text-2xl md:text-3xl">Why This Project Matters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm md:text-base">
              <div className="space-y-3">
                <div className="flex gap-4">
                  <span className="text-2xl flex-shrink-0">🌍</span>
                  <div>
                    <p className="font-semibold text-purple-900 mb-1">Language Preservation</p>
                    <p className="text-gray-700">
                      One language dies every 2 weeks. Your recordings create a permanent archive that can never be
                      lost.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="text-2xl flex-shrink-0">👥</span>
                  <div>
                    <p className="font-semibold text-purple-900 mb-1">Cultural Heritage</p>
                    <p className="text-gray-700">
                      Every word carries centuries of stories, wisdom, and traditions. You're preserving human
                      diversity.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="text-2xl flex-shrink-0">🎯</span>
                  <div>
                    <p className="font-semibold text-purple-900 mb-1">Get Compensated</p>
                    <p className="text-gray-700">
                      You don't work for free. Soul Internet rewards contributors fairly with MILSA tokens for their
                      effort and authenticity.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="text-2xl flex-shrink-0">🔒</span>
                  <div>
                    <p className="font-semibold text-purple-900 mb-1">Transparent & Secure</p>
                    <p className="text-gray-700">
                      Blockchain technology means no middleman, no hidden fees, and complete transparency. You control
                      your rewards.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glow-border bg-white card-hover mt-12">
            <CardHeader>
              <CardTitle className="text-purple-900 text-2xl">Getting Started in 3 Steps</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-full gradient-accent flex items-center justify-center text-white font-bold text-lg">
                    1
                  </div>
                  <div>
                    <p className="font-semibold text-purple-900 mb-2">Connect Your Wallet</p>
                    <p className="text-gray-700 text-sm">
                      Click the "Connect Wallet" button above. MetaMask will open—if you don't have it, you'll be
                      prompted to install it first.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-full gradient-accent flex items-center justify-center text-white font-bold text-lg">
                    2
                  </div>
                  <div>
                    <p className="font-semibold text-purple-900 mb-2">Start Contributing</p>
                    <p className="text-gray-700 text-sm">
                      Click "Start Contributing" to begin the wizard. Select a language, record audio, and add cultural
                      context.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-full gradient-accent flex items-center justify-center text-white font-bold text-lg">
                    3
                  </div>
                  <div>
                    <p className="font-semibold text-purple-900 mb-2">Earn Rewards</p>
                    <p className="text-gray-700 text-sm">
                      Your submission gets scored automatically. If it's high quality (85+), MILSA tokens mint directly
                      to your wallet!
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Final CTA */}
      <section className="gradient-accent text-white py-12 md:py-16 mt-16">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">Ready to Preserve History & Earn?</h3>
          <p className="text-lg mb-8 text-white/90">
            Join a global community preserving humanity's linguistic and cultural heritage while earning real Web3
            rewards.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/wizard">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 font-semibold shadow-lg">
                Start Contributing
              </Button>
            </Link>
            <Link href="/vault">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-transparent">
                View My Vault
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-purple-200/40 bg-white/50 backdrop-blur-sm py-8">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600 space-y-3">
          <p className="font-semibold text-purple-900">Soul Internet Vault Guardian</p>
          <p>Preserving humanity's linguistic and cultural heritage through Web3 technology</p>
          <p className="text-xs">Powered by AIVG • MILSA Quality Scoring • Polygon Blockchain • MetaMask Verified</p>
          <p className="text-xs text-purple-600">
            Not financial advice. Crypto and blockchain involve risk. Learn before you contribute.
          </p>
        </div>
      </footer>
    </main>
  )
}
