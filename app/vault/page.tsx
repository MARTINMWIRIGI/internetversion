'use client';

import CulturalLayer from '@/components/layers/CulturalLayer';

export default function VaultPage() {
  return (
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-b from-[#0a0e27] to-[#1a1f3a]">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
            My Human Vault
          </span>
        </h1>
        <p className="text-gray-300">
          Your multi-dimensional identity stored on blockchain
        </p>
      </div>
      
      {/* Soul Score Banner */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="glow-card rounded-2xl p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-sm text-gray-400">Total Soul Score</div>
              <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                2,450
              </div>
              <div className="text-sm text-gray-300 mt-1">Global Rank: #1,234</div>
            </div>
            
            <div className="relative">
              <div className="h-20 w-20 md:h-24 md:w-24 rounded-full border-4 border-purple-500/30 flex items-center justify-center">
                <div className="text-xl md:text-2xl font-bold text-white">87%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Layer Grid */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-white">Your Identity Layers</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Cultural Layer */}
          <CulturalLayer />
          
          {/* Biometric Placeholder */}
          <div className="glow-card p-6 rounded-2xl border-2 border-dashed border-purple-500/20 flex flex-col items-center justify-center min-h-[300px]">
            <div className="h-12 w-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
              <span className="text-2xl">👤</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Biometric Layer</h3>
            <p className="text-gray-400 text-center mb-6">Voice & fingerprint identity</p>
            <button className="px-4 py-2 bg-purple-500/20 text-purple-300 rounded-lg hover:bg-purple-500/30">
              Coming Soon
            </button>
          </div>
          
          {/* Environmental Placeholder */}
          <div className="glow-card p-6 rounded-2xl border-2 border-dashed border-cyan-500/20 flex flex-col items-center justify-center min-h-[300px]">
            <div className="h-12 w-12 rounded-full bg-cyan-500/20 flex items-center justify-center mb-4">
              <span className="text-2xl">🌱</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Environmental Layer</h3>
            <p className="text-gray-400 text-center mb-6">Carbon impact tracker</p>
            <button className="px-4 py-2 bg-cyan-500/20 text-cyan-300 rounded-lg hover:bg-cyan-500/30">
              Coming Soon
            </button>
          </div>
        </div>
        
        {/* Bottom Row Placeholders */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div className="glow-card p-6 rounded-2xl border-2 border-dashed border-green-500/20 flex flex-col items-center justify-center min-h-[250px]">
            <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
              <span className="text-2xl">💭</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Memory Layer</h3>
            <p className="text-gray-400 text-center mb-6">Experiences & emotions</p>
            <button className="px-4 py-2 bg-green-500/20 text-green-300 rounded-lg hover:bg-green-500/30">
              Coming Soon
            </button>
          </div>
          
          <div className="glow-card p-6 rounded-2xl border-2 border-dashed border-yellow-500/20 flex flex-col items-center justify-center min-h-[250px]">
            <div className="h-12 w-12 rounded-full bg-yellow-500/20 flex items-center justify-center mb-4">
              <span className="text-2xl">💰</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Economic Layer</h3>
            <p className="text-gray-400 text-center mb-6">AI rights & royalties</p>
            <button className="px-4 py-2 bg-yellow-500/20 text-yellow-300 rounded-lg hover:bg-yellow-500/30">
              Coming Soon
            </button>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="mt-10 text-center">
          <p className="text-gray-400 mb-4">Complete all layers to maximize your Soul Score!</p>
          <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition-all">
            Start Voice Recording →
          </button>
        </div>
      </div>
    </div>
  );
}