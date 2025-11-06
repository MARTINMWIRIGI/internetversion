"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Home() {
  const [isHovering, setIsHovering] = useState(false)

  return (
    <main className="min-h-screen bg-background overflow-hidden">
      {/* Grid background */}
      <div className="fixed inset-0 grid-pattern opacity-20 pointer-events-none" />

      {/* Animated scan line */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 scan-line bg-gradient-to-b from-transparent via-purple-500 to-transparent opacity-5" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-border/40 backdrop-blur-sm bg-background/80">
          <div className="container mx-auto px-4 py-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 via-cyan-400 to-purple-500 neon-glow flex items-center justify-center">
                <span className="text-xs font-bold text-white">AIVG</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-300 to-purple-400">
                  Soul Internet Vault Guardian
                </h1>
                <p className="text-xs text-muted-foreground">Preserve Humanity's Voice</p>
              </div>
            </div>
            <Link href="/vault">
              <Button
                variant="outline"
                className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10 bg-transparent"
              >
                My Vault
              </Button>
            </Link>
          </div>
        </header>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            {/* Main Title */}
            <div className="space-y-4">
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-300 to-green-400">
                  Preserve
                </span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-300">
                  Cultural Heritage
                </span>
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Welcome to the Soul Internet Vault Guardian. Help us preserve linguistic, cultural, and environmental
                data for future generations through the SoulInternet vaults.
              </p>
            </div>

            {/* CTA Button */}
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/wizard">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-500 to-cyan-400 hover:from-purple-600 hover:to-cyan-500 text-black font-semibold neon-glow"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  Begin Contribution Wizard
                </Button>
              </Link>
              <Link href="/vault">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-cyan-400/50 text-cyan-400 hover:bg-cyan-500/10 bg-transparent"
                >
                  View Submissions
                </Button>
              </Link>
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-20">
            <Card className="bg-card/50 border-purple-500/30 hover:border-purple-500/60 transition-colors">
              <CardHeader>
                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center mb-2">
                  <span className="text-purple-400">◆</span>
                </div>
                <CardTitle className="text-cyan-400">Multi-Language Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Contribute in any language. Our system preserves linguistic purity and context.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-cyan-400/30 hover:border-cyan-400/60 transition-colors">
              <CardHeader>
                <div className="w-8 h-8 rounded-full bg-cyan-400/20 flex items-center justify-center mb-2">
                  <span className="text-cyan-400">◇</span>
                </div>
                <CardTitle className="text-purple-400">AI Quality Scoring</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Get MILSA quality scores based on clarity, pronunciation, and authenticity.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-green-400/30 hover:border-green-400/60 transition-colors">
              <CardHeader>
                <div className="w-8 h-8 rounded-full bg-green-400/20 flex items-center justify-center mb-2">
                  <span className="text-green-400">◈</span>
                </div>
                <CardTitle className="text-green-400">Rewards & Recognition</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Earn MILSA tokens for high-quality contributions to the vault.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border/40 backdrop-blur-sm bg-background/80 mt-20">
          <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
            <p>Soul Internet Vault Guardian · Preserving humanity's voice across time and space</p>
          </div>
        </footer>
      </div>
    </main>
  )
}
