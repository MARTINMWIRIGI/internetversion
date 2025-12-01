'use client';

import CulturalLayer from '@/components/layers/CulturalLayer';
import BiometricLayer from '@/components/layers/BiometricLayer';
import EnvironmentalLayer from '@/components/layers/EnvironmentalLayer';
import ExperientialLayer from '@/components/layers/ExperientialLayer';
import EconomicLayer from '@/components/layers/EconomicLayer';
import CulturalFormReal from '@/components/CulturalFormReal'
// Inside your return statement, add:


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
                6,450
              </div>
              <div className="text-sm text-gray-300 mt-1">Global Rank: #892</div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">5</div>
                <div className="text-sm text-gray-400">Layers</div>
              </div>
              <div className="relative">
                <div className="h-20 w-20 md:h-24 md:w-24 rounded-full border-4 border-purple-500/30 flex items-center justify-center">
                  <div className="text-xl md:text-2xl font-bold text-white">92%</div>
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">$85</div>
                <div className="text-sm text-gray-400">Monthly</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Layer Grid */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-white">Your Identity Layers</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Row 1: First three layers */}
          <CulturalLayer />
          <BiometricLayer />
          <EnvironmentalLayer />
<CulturalFormSimple />
        </div>
        
        {/* Row 2: Last two layers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <ExperientialLayer />
          <EconomicLayer />
        </div>
        
        {/* Statistics Bar */}
        <div className="mt-10 glow-card rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">Vault Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">5</div>
              <div className="text-sm text-gray-400">Active Layers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400">$85.50</div>
              <div className="text-sm text-gray-400">Monthly Value</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">12.2</div>
              <div className="text-sm text-gray-400">Carbon Tons</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">24</div>
              <div className="text-sm text-gray-400">Memories</div>
            </div>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="mt-10 text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-900/30 to-cyan-900/30 px-6 py-3 rounded-full mb-4">
            <span className="text-green-400">✓</span>
            <span className="text-gray-300">Your vault is 92% complete</span>
          </div>
          <p className="text-gray-400 mb-6">Complete your biometric scan to maximize value</p>
          <button className="px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-purple-500/30 transition-all transform hover:-translate-y-1">
            Complete Your Biometric Scan →
          </button>
        </div>
      </div>
    </div>
  );
}