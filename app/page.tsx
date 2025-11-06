"use client"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 md:py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-md">
              <span className="text-lg font-bold text-white">SI</span>
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold text-slate-900">SOUL INTERNET</h1>
              <p className="text-xs text-slate-500">Vault Guardian</p>
            </div>
          </div>
          <Link href="/vault">
            <Button variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50 bg-transparent">
              My Vault
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Main Title */}
          <div className="space-y-6 text-center">
            <div>
              <p className="text-sm font-semibold text-amber-600 uppercase tracking-wide mb-2">Welcome to</p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-4">
                SOUL INTERNET
              </h2>
              <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Redefining the digital experience through decentralized vaults, cultural preservation, and
                blockchain-verified data. Own, control, and expand your digital presence.
              </p>
            </div>
          </div>

          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/wizard">
              <Button
                size="lg"
                className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                Start Contributing
              </Button>
            </Link>
            <Link href="/vault">
              <Button
                size="lg"
                variant="outline"
                className="border-slate-300 text-slate-700 hover:bg-slate-50 bg-transparent"
              >
                View My Vault
              </Button>
            </Link>
          </div>

          {/* Info Sections */}
          <div className="grid md:grid-cols-2 gap-8 mt-16">
            {/* What is SOUL INTERNET */}
            <Card className="bg-gradient-to-br from-slate-50 to-white border-slate-200 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-slate-900">What is SOUL INTERNET?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm leading-relaxed text-slate-700">
                <p>
                  SOUL INTERNET is a decentralized ecosystem that merges cutting-edge blockchain technology, intelligent
                  AI, and immersive web tools to create a seamless digital experience.
                </p>
                <p>
                  At its core are <strong>Vaults</strong> - secure, blockchain-powered containers that hold personal,
                  cultural, or community-driven digital assets. Each vault combines NFTs, multi-layer data (voice,
                  biometrics, movement, etc.), and decentralized identity tools to create a living record of human
                  experience.
                </p>
                <p className="font-semibold text-amber-600">
                  Through the Vault Guardian, you preserve humanity's cultural and linguistic heritage for generations
                  to come.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-slate-50 to-white border-slate-200 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-slate-900">The SOUL INTERNET Vaults</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="space-y-2">
                  <p className="font-semibold text-slate-900">Cultural & Linguistic Vault</p>
                  <p className="text-slate-600">
                    Preserve languages, traditions, stories, and cultural heritage immutably.
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="font-semibold text-slate-900">Carbon Credits Vault</p>
                  <p className="text-slate-600">
                    Track and tokenize measurable climate impact into tradable digital assets.
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="font-semibold text-slate-900">Refugee Identity Vault</p>
                  <p className="text-slate-600">Secure, portable digital IDs for displaced persons.</p>
                </div>
                <div className="space-y-2">
                  <p className="font-semibold text-slate-900">Plus: Time Capsules, Donor Funds & More</p>
                  <p className="text-slate-600">Legacy preservation and transparent philanthropy.</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* How It Works */}
          <Card className="bg-white border-slate-200 shadow-md mt-12">
            <CardHeader>
              <CardTitle className="text-slate-900">How the Vault Guardian Works</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                    <span className="text-xl font-bold text-amber-600">1</span>
                  </div>
                  <p className="font-semibold text-slate-900">Select Language</p>
                  <p className="text-sm text-slate-600">Choose the language or dialect you want to preserve.</p>
                </div>
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                    <span className="text-xl font-bold text-orange-600">2</span>
                  </div>
                  <p className="font-semibold text-slate-900">Submit Content</p>
                  <p className="text-sm text-slate-600">Provide words, phrases, definitions, and cultural context.</p>
                </div>
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                    <span className="text-xl font-bold text-amber-600">3</span>
                  </div>
                  <p className="font-semibold text-slate-900">Record Audio</p>
                  <p className="text-sm text-slate-600">Submit high-quality audio recordings of pronunciation.</p>
                </div>
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                    <span className="text-xl font-bold text-orange-600">4</span>
                  </div>
                  <p className="font-semibold text-slate-900">Earn Rewards</p>
                  <p className="text-sm text-slate-600">High-quality submissions get MILSA tokens and NFT mints.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Why This Matters */}
          <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200 mt-12 shadow-md">
            <CardHeader>
              <CardTitle className="text-slate-900">Why This Matters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-relaxed text-slate-700">
              <div>
                <p className="font-semibold text-slate-900 mb-1">Language Preservation:</p>
                <p>
                  Thousands of languages disappear each year, taking with them unique worldviews, cultural knowledge,
                  and centuries of human wisdom. We're building a permanent, immutable archive.
                </p>
              </div>
              <div>
                <p className="font-semibold text-slate-900 mb-1">Cultural Heritage:</p>
                <p>
                  Every word carries tradition, stories, and identity. The Vault Guardian ensures future generations can
                  connect with their roots and understand their heritage.
                </p>
              </div>
              <div>
                <p className="font-semibold text-slate-900 mb-1">Environmental Knowledge:</p>
                <p>
                  Indigenous and local communities possess invaluable ecological knowledge. We're documenting it before
                  it's lost, preserving both culture and sustainability practices.
                </p>
              </div>
              <div>
                <p className="font-semibold text-slate-900 mb-1">Your Legacy:</p>
                <p>
                  When you contribute, you become part of a global effort to preserve what makes humanity unique. Your
                  voice becomes part of eternal history, tokenized and verified on blockchain.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200 shadow-md">
            <CardHeader>
              <CardTitle className="text-slate-900">MILSA Quality Scoring</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-slate-700">
              <p>
                Every submission is evaluated using MILSA (Multilingual Immersive Linguistic Soul Assessment) - an
                AI-powered quality scoring system that ensures authenticity and clarity.
              </p>
              <div className="bg-slate-50 p-4 rounded-lg space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Score ≥ 85:</span>
                  <span className="text-green-600 font-bold">Auto-Minted NFT + MILSA Tokens</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Score 70-84:</span>
                  <span className="text-amber-600 font-bold">Under Review • Eligible for Rewards</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Score &lt; 70:</span>
                  <span className="text-slate-600 font-bold">Re-record Suggested</span>
                </div>
              </div>
              <p className="text-xs text-slate-500">
                MILSA evaluates: clarity, pronunciation accuracy, tempo consistency, tone/emotion fit, noise level, and
                linguistic purity.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-amber-500 to-orange-600 text-white py-12 md:py-16 mt-12">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">Ready to Preserve Humanity's Soul?</h3>
          <p className="text-lg mb-6 text-amber-50">
            Join thousands of contributors preserving the world's linguistic and cultural heritage for future
            generations.
          </p>
          <Link href="/wizard">
            <Button size="lg" className="bg-white text-amber-600 hover:bg-amber-50 font-semibold shadow-lg">
              Start Your Contribution
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8">
        <div className="container mx-auto px-4 text-center text-sm text-slate-600 space-y-2">
          <p>SOUL INTERNET • Vault Guardian | Preserving humanity's linguistic and cultural heritage</p>
          <p className="text-xs">Powered by MILSA Quality Scoring • Blockchain Verified • Decentralized & Immutable</p>
        </div>
      </footer>
    </main>
  )
}
