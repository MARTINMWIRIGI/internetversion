"use client"

import { useRouter } from 'next/navigation'
import CulturalFormReal from '@/components/CulturalFormReal'

export default function AddCulturePage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-gray-900/90 backdrop-blur-lg border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push('/vault')}
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Vault
            </button>
            
            <h1 className="text-2xl font-bold text-white">Add Cultural Heritage</h1>
            
            <div className="w-24"></div>
          </div>
        </div>
      </div>

      {/* Cultural Form */}
      <div className="max-w-full">
        <CulturalFormReal />
      </div>
    </div>
  )
}