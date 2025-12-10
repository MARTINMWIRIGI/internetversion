// app/whitepaper/page.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Download, 
  BookOpen, 
  Globe, 
  Users, 
  Brain, 
  Shield, 
  Lock, 
  Database,
  ArrowLeft,
  Printer,
  Share2
} from 'lucide-react';
import Link from 'next/link';

export default function WhitepaperPage() {
  const [currentPage, setCurrentPage] = useState(0);

  const whitepaperContent = [
    {
      title: "SOULINTERNET WHITEPAPER (2025)",
      subtitle: "A Cultural, Biometric & Linguistic Blockchain Layer from Africa to the World",
      content: `
        Websites: soulinternet.xyz | soul-internet.com | soulinternet.eth
        Emails: info@soul-internet.com | founder@soul-internet.com | ceo@soul-internet.com | migwi@soul-internet.com
        Founded: 24th July 2025
      `
    },
    {
      title: "EXECUTIVE SUMMARY",
      quote: "A Moment Lost Is a Civilization Erased.",
      content: `
        Every second, the universe records us — but humanity does not.
        A word spoken for the last time.
        A culture fading without an echo.
        A heartbeat syncing with dawn.
        Footsteps across unnamed soil.
        The wind rehearsing a language older than empires.

        For centuries, these human signatures vanished into silence.

        But now — from the East of Africa — emerges SoulInternet, a timeless cosmic human capsule anchored on blockchain and powered by AI.
        A system capable of capturing:
        • Identity • Culture • Language • Moods • Heartbeats
      `
    },
    {
      title: "THE GLOBAL PROBLEMS SOULINTERNET SOLVES",
      content: `
        ## The Rapid Disappearance of Culture
        Languages vanish every month.
        Songs disappear with their last singers.
        Youth lose dialects replaced by globalized fragments.
        SoulInternet preserves them permanently on-chain.

        ## The Exploitation of Human Data
        Corporations extract identity, emotion, biometrics, and behavior — yet individuals earn nothing.
        SoulInternet reverses this:
        Your cultural and biometric abstractions belong to YOU — not Silicon Valley.

        ## High Barriers to Web3 Adoption
        Wallets are confusing.
        Gas fees too high.
        NFT systems too complex.
        SoulInternet introduces guided onboarding, micro-pricing, and layered minting accessible to everyone.
      `
    },
    {
      title: "THE MULTISOUL NFT",
      subtitle: "The World's First Multi-Layered Human Capsule",
      content: `
        A MultiSoul NFT is not an artwork — it is a universe of identity. Each token can contain up to hundreds of layers, including:

        • Linguistic Layers
        Voices, dialects, poems, greetings, endangered languages.

        • Cultural Layers
        Songs, oral traditions, clan markers, rituals, stories, rare words.

        • Biometric Abstractions
        Hashed iris patterns, Encrypted fingerprint vectors, Gait models, Facial pattern abstractions

        • Environmental & Cosmic Metadata
        Weather, Temperature, Solar radiation, Geolocation context, Atmospheric noise, Environmental soundscapes
      `
    },
    {
      title: "MILSA TOKEN",
      subtitle: "Micro-value for macro-humanity.",
      content: `
        Token Name: MILSA
        Value: 1 MILSA = $0.01
        Supply: 2,000,000,000 MILSA

        Utility:
        • Rewards • Governance • NFT activation • Micro-donations
        • Cultural recordings • Staking • Vault unlocks • Corporate onboarding

        MILSA is optimized for high-volume, low-cost global usage.
      `
    },
    {
      title: "TECHNOLOGY ARCHITECTURE",
      content: `
        • ERC-721 MultiSoul
        • ERC-20 MILSA
        • Proxy upgradeable smart contracts
        • ENS integrations
        • IPFS | Filecoin | Pinata
        • Multi-sig treasury
        • Time-locked updates
        • Anti-abuse minting
        • Secure biometric hashing

        Built for resilience, scale, and cultural protection.
      `
    },
    {
      title: "USE CASES",
      content: `
        • Cultural and linguistic preservation
        • Identity ownership
        • Museum digitization
        • Youth grant systems
        • Philanthropy vaults
        • Corporate onboarding
        • Ethical AI dataset supply
        • National cultural passports
        • Refugee identity restoration
      `
    },
    {
      title: "CONCLUSION",
      quote: "Humanity is not data — it is identity.",
      content: `
        SoulInternet is the first system in human history built to preserve, protect, and reward culture, identity, and human expression at planetary scale.

        It is a timeless capsule.
        A digital museum.
        A cultural passport.
        A living archive of human existence.
        And a global ecosystem — born in Africa — designed for the world.
      `
    }
  ];

  const handleDownloadPDF = () => {
    // Create a blob with your whitepaper content
    const content = `
      SOULINTERNET WHITEPAPER (2025)
      A Cultural, Biometric & Linguistic Blockchain Layer from Africa to the World
      
      ${whitepaperContent.map(page => `
        ${page.title}
        ${page.subtitle || ''}
        ${page.content}
        ---
      `).join('\n')}
    `;
    
    const blob = new Blob([content], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'SoulInternet-Whitepaper-2025.pdf';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <div className="h-8 w-px bg-gray-700" />
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">Whitepaper</h1>
                <p className="text-gray-400 text-sm">Official SoulInternet Documentation</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleDownloadPDF}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-lg hover:opacity-90 transition-opacity"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
            >
              <Printer className="w-4 h-4" />
              Print
            </button>
          </div>
        </div>

        {/* Page Navigation */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {whitepaperContent.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentPage === index
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                    : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800'
                }`}
              >
                Page {index + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Whitepaper Content */}
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-black/40 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 md:p-8 mb-8"
        >
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-purple-900/30 to-cyan-900/30 rounded-full mb-4">
              <span className="text-xs text-gray-300">PAGE {currentPage + 1} of {whitepaperContent.length}</span>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              {whitepaperContent[currentPage].title}
            </h2>
            
            {whitepaperContent[currentPage].subtitle && (
              <p className="text-lg text-cyan-300 mb-4">
                {whitepaperContent[currentPage].subtitle}
              </p>
            )}
            
            {whitepaperContent[currentPage].quote && (
              <div className="border-l-4 border-cyan-500 pl-4 my-6 italic text-gray-300">
                "{whitepaperContent[currentPage].quote}"
              </div>
            )}
          </div>

          <div className="prose prose-invert max-w-none">
            <pre className="whitespace-pre-wrap font-sans text-gray-300 leading-relaxed">
              {whitepaperContent[currentPage].content}
            </pre>
          </div>
        </motion.div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
            disabled={currentPage === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg ${
              currentPage === 0
                ? 'bg-gray-800/50 text-gray-600 cursor-not-allowed'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </button>

          <div className="text-sm text-gray-400">
            {currentPage + 1} / {whitepaperContent.length}
          </div>

          <button
            onClick={() => setCurrentPage(prev => Math.min(whitepaperContent.length - 1, prev + 1))}
            disabled={currentPage === whitepaperContent.length - 1}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg ${
              currentPage === whitepaperContent.length - 1
                ? 'bg-gray-800/50 text-gray-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-cyan-600 to-purple-600 text-white hover:opacity-90'
            }`}
          >
            Next
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </button>
        </div>

        {/* Key Information */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-purple-900/20 to-cyan-900/20 rounded-xl p-6 border border-purple-500/30">
            <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4">
              <Globe className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="font-bold text-lg mb-2">Global Vision</h3>
            <p className="text-gray-400 text-sm">
              Born in Africa, designed for the world. Preserving cultural identity at planetary scale.
            </p>
          </div>

          <div className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 rounded-xl p-6 border border-cyan-500/30">
            <div className="w-12 h-12 rounded-lg bg-cyan-500/20 flex items-center justify-center mb-4">
              <Database className="w-6 h-6 text-cyan-400" />
            </div>
            <h3 className="font-bold text-lg mb-2">MultiSoul Technology</h3>
            <p className="text-gray-400 text-sm">
              World's first multi-layered human capsule NFT. Hundreds of identity layers in one token.
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 rounded-xl p-6 border border-green-500/30">
            <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="font-bold text-lg mb-2">Secure & Private</h3>
            <p className="text-gray-400 text-sm">
              Biometric abstractions, never raw data. User-owned identity with military-grade encryption.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-800/50">
          <div className="text-center">
            <p className="text-gray-500 text-sm mb-2">
              © 2025 SoulInternet | Powered by Imperial Enterprise
            </p>
            <div className="flex justify-center gap-6 text-sm text-gray-400">
              <span>soulinternet.xyz</span>
              <span>•</span>
              <span>soul-internet.com</span>
              <span>•</span>
              <span>soulinternet.eth</span>
            </div>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body {
            background: white !important;
            color: black !important;
          }
          .no-print {
            display: none !important;
          }
          .print-content {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
}