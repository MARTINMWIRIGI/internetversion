"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Mic, Radio, Shield, Globe, Sparkles, ArrowRight
} from "lucide-react";

export default function ClientPage() {
  return (
    <div className="min-h-screen bg-[#0a0e27] text-white selection:bg-cyan-500/30">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Cultural Preservation Protocol</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
              Preserve Your <span className="gradient-text">Voice</span> <br />
              on the Blockchain
            </h1>
            
            <p className="text-xl text-gray-400 mb-10 leading-relaxed max-w-2xl mx-auto">
              Soul Internet Vault Guardian: Record your vernacular language, 
              mint it as a unique NFT, and preserve your cultural heritage forever on Polygon.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="/wizard" 
                className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-xl font-bold text-white shadow-lg shadow-cyan-500/25 transition-all hover:scale-105 active:scale-95"
              >
                <span className="flex items-center gap-2">
                  Start Minting <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/20 rounded-full blur-[120px] opacity-50" />
          <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-cyan-500/20 rounded-full blur-[100px] opacity-30" />
        </div>
      </section>

      {/* Core Flow Section */}
      <section className="py-24 bg-[#0d1230]/50 border-y border-white/5">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">The MVP Flow</h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: Shield, title: "Connect Wallet", desc: "Link your MetaMask or Coinbase wallet." },
              { icon: Globe, title: "Enter Word", desc: "Input vernacular word and its meaning." },
              { icon: Mic, title: "Record Audio", desc: "Speak the word clearly for the record." },
              { icon: Radio, title: "Mint NFT", desc: "Save to IPFS and mint on Polygon." }
            ].map((step, idx) => (
              <div key={idx} className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:border-cyan-500/50 transition-colors">
                <step.icon className="w-10 h-10 text-cyan-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 border-t border-white/10 text-center text-gray-500 text-sm">
        <p>© 2026 Soul Internet Protocol. Preserving human consciousness.</p>
      </footer>
    </div>
  );
}
