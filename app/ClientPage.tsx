"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TooltipHelp } from "@/components/tooltip-help";
import WalletMintAdmin from "@/components/WalletMintAdmin";
import { Button } from "@/components/ui/button";
import { 
  Globe, 
  Heart, 
  Users, 
  Lock, 
  Sparkles, 
  Mic, 
  Cpu, 
  Cloud,
  BookOpen,
  Coins,
  Shield,
  Brain
} from "lucide-react";

export default function ClientPage() {
  const [mounted, setMounted] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Simulate video loading
    setTimeout(() => setVideoLoaded(true), 500);
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      
      {/* ===== Hero Section with Cinematic Intro ===== */}
      <section className="relative h-screen overflow-hidden">
        {/* Background video/gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/10">
          {videoLoaded && (
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent"></div>
          )}
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center px-4 md:px-6 lg:px-8 text-center">
          <div className="max-w-6xl mx-auto">
            {/* Main Title - Following Stoodic layout */}
            <div className="mb-8">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 tracking-tight">
                <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400 bg-clip-text text-transparent">
                  SoulInternet
                </span>
              </h1>
              <p className="text-2xl md:text-3xl lg:text-4xl font-light text-gray-300 mb-6">
                The Future is Human Data
              </p>
            </div>

            {/* Subtitle */}
            <div className="mb-12 max-w-3xl mx-auto">
              <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
                Every heartbeat, every word, every cultural moment — preserved forever as 
                <span className="text-purple-400 font-semibold"> MultiSoul Tokens</span>. 
                Welcome to humanity's eternal digital capsule.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 text-lg rounded-full shadow-lg shadow-purple-500/20">
                <Sparkles className="mr-2 h-5 w-5" />
                Enter the Capsule
              </Button>
              <Button variant="outline" className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10 px-8 py-6 text-lg rounded-full">
                Watch 50s Cinematic
              </Button>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="text-center p-4 bg-white/5 rounded-xl backdrop-blur-sm">
                <p className="text-2xl md:text-3xl font-bold text-purple-400">50+</p>
                <p className="text-sm text-gray-400">Endangered Languages</p>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-xl backdrop-blur-sm">
                <p className="text-2xl md:text-3xl font-bold text-pink-400">1M+</p>
                <p className="text-sm text-gray-400">Human Moments Preserved</p>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-xl backdrop-blur-sm">
                <p className="text-2xl md:text-3xl font-bold text-blue-400">∞</p>
                <p className="text-sm text-gray-400">Timeless Value</p>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-xl backdrop-blur-sm">
                <p className="text-2xl md:text-3xl font-bold text-green-400">100%</p>
                <p className="text-sm text-gray-400">African Led</p>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-purple-500/20 animate-pulse"
              style={{
                width: Math.random() * 10 + 2 + 'px',
                height: Math.random() * 10 + 2 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                animationDelay: Math.random() * 5 + 's',
                animationDuration: Math.random() * 3 + 2 + 's'
              }}
            />
          ))}
        </div>
      </section>

      {/* ===== The Vision Section (Following Stoodic Layout) ===== */}
      <section className="py-20 md:py-32 px-4 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              <span className="text-white">MultiSoul</span>{' '}
              <span className="text-purple-400">Human Foundations</span>
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-8"></div>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Transforming fleeting human moments into eternal digital assets
            </p>
          </div>

          {/* Cards Grid - Following the Stoodic 3-column layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1: Biometric Layer */}
            <Card className="bg-gradient-to-br from-gray-900 to-black border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 group hover:scale-[1.02]">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <Heart className="h-8 w-8 text-red-400" />
                  <span className="text-xs font-mono text-purple-400">Layer 01</span>
                </div>
                <CardTitle className="text-xl flex items-center">
                  Biometric Soul
                  <Sparkles className="ml-2 h-4 w-4 text-yellow-400" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 mb-4">
                  Heartbeats, fingerprints, voice patterns — your unique biological signature preserved as glowing particles of life energy.
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <Lock className="h-3 w-3 mr-1" />
                  Secured with quantum encryption
                </div>
              </CardContent>
            </Card>

            {/* Card 2: Cultural Layer */}
            <Card className="bg-gradient-to-br from-gray-900 to-black border-pink-500/20 hover:border-pink-500/40 transition-all duration-300 group hover:scale-[1.02]">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <Users className="h-8 w-8 text-pink-400" />
                  <span className="text-xs font-mono text-pink-400">Layer 02</span>
                </div>
                <CardTitle className="text-xl flex items-center">
                  Cultural Essence
                  <BookOpen className="ml-2 h-4 w-4 text-blue-400" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 mb-4">
                  Rituals, dances, oral traditions — endangered cultural practices immortalized in holographic data fields.
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <Mic className="h-3 w-3 mr-1" />
                  Voice recordings preserved
                </div>
              </CardContent>
            </Card>

            {/* Card 3: Linguistic Layer */}
            <Card className="bg-gradient-to-br from-gray-900 to-black border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 group hover:scale-[1.02]">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <Brain className="h-8 w-8 text-blue-400" />
                  <span className="text-xs font-mono text-blue-400">Layer 03</span>
                </div>
                <CardTitle className="text-xl flex items-center">
                  Linguistic DNA
                  <Cloud className="ml-2 h-4 w-4 text-green-400" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 mb-4">
                  Endangered words, dialects, phrases — linguistic heritage transformed into glowing particles for eternity.
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <Cpu className="h-3 w-3 mr-1" />
                  AI-preserved pronunciation
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ===== How It Works Section ===== */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-transparent to-purple-900/5">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              From <span className="text-purple-400">Heartbeat</span> to{" "}
              <span className="text-pink-400">Blockchain</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              The journey of a human moment into eternal value
            </p>
          </div>

          {/* Timeline Steps */}
          <div className="space-y-12">
            {[
              { step: "01", title: "Capture Moment", desc: "Record biometric, cultural, or linguistic data", color: "purple" },
              { step: "02", title: "Create Token", desc: "Generate MultiSoul Token with holographic layers", color: "pink" },
              { step: "03", title: "Preserve Forever", desc: "Store in Timeless Human Capsule on blockchain", color: "blue" },
              { step: "04", title: "Generate Value", desc: "Earn royalties via MISLA coin ecosystem", color: "green" }
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-8">
                <div className={`flex-shrink-0 w-16 h-16 rounded-full bg-${item.color}-500/10 border-2 border-${item.color}-500/30 flex items-center justify-center`}>
                  <span className={`text-2xl font-bold text-${item.color}-400`}>{item.step}</span>
                </div>
                <div className="flex-grow">
                  <h3 className="text-2xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Wallet & Admin Section ===== */}
      <section className="py-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-gray-900 to-black border-purple-500/30">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl md:text-3xl flex items-center justify-center gap-2">
                <Coins className="h-8 w-8 text-yellow-400" />
                MISLA Coin Ecosystem
              </CardTitle>
              <p className="text-gray-400">
                Powering the SoulInternet with sustainable value generation
              </p>
            </CardHeader>
            <CardContent>
              <WalletMintAdmin />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ===== Call to Action ===== */}
      <section className="py-20 md:py-32 px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">
            Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Preserve Your Legacy</span>?
          </h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Join the movement to immortalize human culture while creating generational wealth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-10 py-6 text-lg rounded-full shadow-2xl shadow-purple-500/30">
              Start Preserving Now
            </Button>
            <Button variant="outline" className="border-white/20 hover:bg-white/10 px-10 py-6 text-lg rounded-full">
              Read Whitepaper
            </Button>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="border-t border-purple-500/10 bg-black/50 backdrop-blur-xl py-12 px-4 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Shield className="h-5 w-5 mr-2 text-purple-400" />
                SoulInternet
              </h3>
              <p className="text-sm text-gray-400">
                The Future Internet — where human data becomes eternal value.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Layers</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Biometric Soul</li>
                <li>Cultural Essence</li>
                <li>Linguistic DNA</li>
                <li>Cosmic Connection</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Technology</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>MISLA Coin</li>
                <li>Polygon Blockchain</li>
                <li>MultiSoul Tokens</li>
                <li>AI Preservation</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>African Elders</li>
                <li>Linguistic Keepers</li>
                <li>Cultural Guardians</li>
                <li>Global Supporters</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} SoulInternet | Powered byIMPERIAL ENTERPRISE 
            </p>
            <p className="text-xs text-gray-600 mt-2">
              Not financial advice. Preserve responsibly.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}