"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { WalletConnectButton } from "@/components/wallet-connect-button"

export default function Home() {
  const [isHovering, setIsHovering] = useState(false)

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50">
      {/* Header */}
      <header className="border-b border-blue-100 bg-white/80 backdrop-blur-md sticky top-0 z-50 soft-shadow">
        <div className="container mx-auto px-4 py-4 md:py-6 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-md">
              <span className="text-xs font-bold text-white">AIVG</span>
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold gradient-text">Soul Internet Vault</h1>
              <p className="text-xs text-muted-foreground">Preserving humanity's linguistic heritage</p>
            </div>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <WalletConnectButton />
            <Link href="/vault">
              <Button variant="outline" className="border-blue-300 text-blue-600 hover:bg-blue-50 bg-transparent">
                My Vault
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Main Title */}
          <div className="space-y-6 text-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 gradient-text">
                Preserve Cultural Heritage
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Welcome to the Soul Internet Vault Guardian. Help us preserve linguistic, cultural, and environmental
                data for future generations through the SoulInternet vaults.
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/wizard">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-md hover:shadow-lg transition-all"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                Start Contributing
              </Button>
            </Link>
            <Link href="/vault">
              <Button
                size="lg"
                variant="outline"
                className="border-blue-300 text-blue-600 hover:bg-blue-50 bg-transparent"
              >
                View Vault
              </Button>
            </Link>
          </div>

          {/* Info Sections */}
          <div className="grid md:grid-cols-2 gap-8 mt-16">
            {/* What is This */}
            <Card className="bg-white/80 border-blue-100 card-hover">
              <CardHeader>
                <CardTitle className="text-blue-900">What is this?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm leading-relaxed">
                <p>
                  The Soul Internet Vault Guardian is a global preservation initiative dedicated to documenting
                  linguistic, cultural, and environmental data before it's lost to time.
                </p>
                <p>
                  We believe that every language carries unique wisdom, cultural heritage, and human knowledge that
                  deserves to be preserved for future generations.
                </p>
                <p className="font-semibold text-blue-700">
                  By contributing, you're not just recording data—you're preserving humanity's soul.
                </p>
              </CardContent>
            </Card>

            {/* How It Works */}
            <Card className="bg-white/80 border-purple-100 card-hover">
              <CardHeader>
                <CardTitle className="text-purple-900">How It Works</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="space-y-2">
                  <p className="font-semibold text-purple-700">1. Select Your Language</p>
                  <p className="text-muted-foreground">Choose the language or dialect you want to preserve.</p>
                </div>
                <div className="space-y-2">
                  <p className="font-semibold text-purple-700">2. Record Audio</p>
                  <p className="text-muted-foreground">
                    Submit words, phrases, or cultural sounds with clear audio recordings.
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="font-semibold text-purple-700">3. Get Verified</p>
                  <p className="text-muted-foreground">
                    Our AI assigns a MILSA quality score and validates authenticity.
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="font-semibold text-purple-700">4. Earn Rewards</p>
                  <p className="text-muted-foreground">High-quality contributions earn MILSA tokens.</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200 card-hover">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-blue-600/10 flex items-center justify-center mb-3">
                  <span className="text-2xl">🌍</span>
                </div>
                <CardTitle className="text-blue-900 text-lg">Global Reach</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Support for all languages and dialects, creating a truly global linguistic archive.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100/50 border-purple-200 card-hover">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-purple-600/10 flex items-center justify-center mb-3">
                  <span className="text-2xl">✨</span>
                </div>
                <CardTitle className="text-purple-900 text-lg">AI Quality Scoring</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  MILSA scores evaluate clarity, pronunciation, and authenticity automatically.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100/50 border-indigo-200 card-hover">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-indigo-600/10 flex items-center justify-center mb-3">
                  <span className="text-2xl">💎</span>
                </div>
                <CardTitle className="text-indigo-900 text-lg">Earn Rewards</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Contributors are rewarded with MILSA tokens for verified high-quality submissions.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Why This Matters */}
          <Card className="bg-white/80 border-blue-100 mt-12">
            <CardHeader>
              <CardTitle className="gradient-text">Why This Matters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-relaxed">
              <p>
                <strong>Language Preservation:</strong> Thousands of languages disappear each year, taking with them
                unique worldviews and cultural knowledge. We're building a permanent archive.
              </p>
              <p>
                <strong>Cultural Heritage:</strong> Every word carries centuries of tradition, stories, and wisdom. This
                vault ensures future generations can connect with their roots.
              </p>
              <p>
                <strong>Environmental Data:</strong> Indigenous and local communities possess invaluable ecological
                knowledge. We're documenting it before it's lost.
              </p>
              <p>
                <strong>Your Legacy:</strong> When you contribute, you become part of a global effort to preserve what
                makes humanity unique.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12 md:py-16 mt-12">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">Ready to Preserve History?</h3>
          <p className="text-lg mb-6 text-blue-100">
            Join thousands of contributors documenting the world's linguistic and cultural heritage.
          </p>
          <Link href="/wizard">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 font-semibold shadow-lg">
              Start Your Contribution
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-blue-100 bg-white/50 backdrop-blur-sm py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground space-y-2">
          <p>Soul Internet Vault Guardian · Preserving humanity's linguistic and cultural heritage</p>
          <p className="text-xs">Powered by AIVG • MILSA Quality Scoring • Blockchain Verified</p>
        </div>
      </footer>
    </main>
  )
}
