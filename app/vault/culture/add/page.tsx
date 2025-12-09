"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import CulturalFormReal from '@/components/CulturalFormReal'
import SimpleCulturalForm from '@/components/SimpleCulturalForm'
import { BookOpen, FileText, ArrowLeft, Globe, Brain } from 'lucide-react'

export default function AddCulturePage() {
  const router = useRouter()
  const [activeForm, setActiveForm] = useState<'simple' | 'trainer'>('simple')

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-4">
            {/* Back Button */}
            <button
              onClick={() => router.push('/vault')}
              className="group flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="hidden sm:inline">Back to Vault</span>
              <span className="sm:hidden">Back</span>
            </button>

            {/* Title */}
            <div className="text-center">
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Cultural Preservation
              </h1>
              <p className="text-gray-400 text-sm mt-1">
                Choose your contribution method
              </p>
            </div>

            {/* Placeholder for alignment */}
            <div className="w-24"></div>
          </div>
        </div>
      </div>

      {/* Form Selector */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Simple Form Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`relative rounded-2xl p-6 cursor-pointer transition-all duration-300 
                       border-2 ${activeForm === 'simple' ? 'border-cyan-500/50 bg-cyan-500/10' : 'border-gray-700/50 bg-gray-900/30 hover:bg-gray-800/30'}`}
            onClick={() => setActiveForm('simple')}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center 
                             ${activeForm === 'simple' ? 'bg-cyan-500/20' : 'bg-gray-800'}`}>
                <FileText className={`w-6 h-6 ${activeForm === 'simple' ? 'text-cyan-400' : 'text-gray-400'}`} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Quick Record</h3>
                <p className="text-gray-400 text-sm">Simple form for cultural data</p>
              </div>
            </div>

            <p className="text-gray-300 mb-4">
              Quickly document languages and cultural practices. Perfect for recording existing knowledge.
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                <span className="text-sm text-gray-300">Record 4 languages at once</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                <span className="text-sm text-gray-300">Add cultural context</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                <span className="text-sm text-gray-300">No wallet required</span>
              </div>
            </div>

            <button
              className={`w-full py-3 rounded-xl font-semibold transition-all
                         ${activeForm === 'simple' 
                           ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white' 
                           : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
            >
              {activeForm === 'simple' ? '✓ Currently Selected' : 'Select This Form'}
            </button>

            {activeForm === 'simple' && (
              <div className="absolute -top-2 -right-2">
                <div className="w-6 h-6 rounded-full bg-cyan-500 flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              </div>
            )}
          </motion.div>

          {/* Trainer Form Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`relative rounded-2xl p-6 cursor-pointer transition-all duration-300 
                       border-2 ${activeForm === 'trainer' ? 'border-purple-500/50 bg-purple-500/10' : 'border-gray-700/50 bg-gray-900/30 hover:bg-gray-800/30'}`}
            onClick={() => setActiveForm('trainer')}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center 
                             ${activeForm === 'trainer' ? 'bg-purple-500/20' : 'bg-gray-800'}`}>
                <BookOpen className={`w-6 h-6 ${activeForm === 'trainer' ? 'text-purple-400' : 'text-gray-400'}`} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Language Trainer</h3>
                <p className="text-gray-400 text-sm">Interactive learning experience</p>
              </div>
            </div>

            <p className="text-gray-300 mb-4">
              Learn and preserve languages word by word. Earn XP and achievements while contributing.
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                <span className="text-sm text-gray-300">Gamified learning experience</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                <span className="text-sm text-gray-300">Record pronunciations</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                <span className="text-sm text-gray-300">Wallet connection required</span>
              </div>
            </div>

            <button
              className={`w-full py-3 rounded-xl font-semibold transition-all
                         ${activeForm === 'trainer' 
                           ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                           : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
            >
              {activeForm === 'trainer' ? '✓ Currently Selected' : 'Select This Form'}
            </button>

            {activeForm === 'trainer' && (
              <div className="absolute -top-2 -right-2">
                <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Form Content */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center">
              {activeForm === 'simple' ? <Globe className="w-5 h-5 text-white" /> : <Brain className="w-5 h-5 text-white" />}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">
                {activeForm === 'simple' ? 'Cultural Heritage Record' : 'Language Ontology Trainer'}
              </h2>
              <p className="text-gray-400">
                {activeForm === 'simple' 
                  ? 'Document cultural practices and languages' 
                  : 'Learn and preserve languages interactively'}
              </p>
            </div>
          </div>

          <div className="bg-black/30 backdrop-blur-sm rounded-2xl border border-gray-800/50 overflow-hidden">
            {activeForm === 'simple' ? <SimpleCulturalForm /> : <CulturalFormReal />}
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-r from-cyan-900/20 to-cyan-800/10 rounded-xl p-4 border border-cyan-800/30">
            <div className="text-2xl font-bold text-cyan-300 mb-1">4,820+</div>
            <div className="text-gray-400 text-sm">Cultural Records</div>
          </div>
          <div className="bg-gradient-to-r from-purple-900/20 to-purple-800/10 rounded-xl p-4 border border-purple-800/30">
            <div className="text-2xl font-bold text-purple-300 mb-1">142+</div>
            <div className="text-gray-400 text-sm">Languages Preserved</div>
          </div>
          <div className="bg-gradient-to-r from-blue-900/20 to-blue-800/10 rounded-xl p-4 border border-blue-800/30">
            <div className="text-2xl font-bold text-blue-300 mb-1">18.4K</div>
            <div className="text-gray-400 text-sm">Blocks Secured</div>
          </div>
        </div>

        {/* Help Text */}
        <div className="text-center text-gray-500 text-sm">
          <p>
            {activeForm === 'simple' 
              ? 'Your contributions are encrypted and stored on the blockchain for eternity' 
              : 'Connect your wallet to earn XP and contribute to language preservation'}
          </p>
          <p className="mt-2 text-xs text-gray-600">
            Powered by Soul Internet • Cultural Heritage Preservation System
          </p>
        </div>
      </div>
    </div>
  )
}