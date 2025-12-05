'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CulturalLayer from '@/components/layers/CulturalLayer';
import BiometricLayer from '@/components/layers/BiometricLayer';
import EnvironmentalLayer from '@/components/layers/EnvironmentalLayer';
import ExperientialLayer from '@/components/layers/ExperientialLayer';
import EconomicLayer from '@/components/layers/EconomicLayer';

export default function VaultPage() {
  const router = useRouter();
  const [activeLayer, setActiveLayer] = useState<string | null>(null);
  const [mintingLayer, setMintingLayer] = useState<string | null>(null);
  const [showAllLayers, setShowAllLayers] = useState(true);

  const layers = [
    { 
      id: 'cultural', 
      title: '🏛️ Cultural Heritage', 
      component: CulturalLayer, 
      color: 'from-purple-900/30 to-cyan-900/30',
      description: 'Preserve stories, traditions, and cultural artifacts',
      progress: 85,
      mintable: true,
      addButtonText: 'Add More Culture',
      addPage: '/vault/culture/add' // Opens CulturalFormReal
    },
    { 
      id: 'biometric', 
      title: '🔐 Biometric Authentication', 
      component: BiometricLayer, 
      color: 'from-gray-900/30 to-blue-900/30',
      description: 'Secure authentication with unique biological traits',
      progress: 65,
      mintable: true,
      addButtonText: 'Complete Biometric Scan',
      addPage: '/vault/biometrics/scan' // Opens BiometricFormSimple
    },
    { 
      id: 'environmental', 
      title: '🌱 Environmental Layer', 
      component: EnvironmentalLayer, 
      color: 'from-green-900/30 to-emerald-900/30',
      description: 'Carbon footprint and environmental impact data',
      progress: 45,
      mintable: true,
      addButtonText: 'Add Environmental Data',
      addPage: '/vault/environment/add'
    },
    { 
      id: 'experiential', 
      title: '🎭 Experiential Layer', 
      component: ExperientialLayer, 
      color: 'from-yellow-900/30 to-orange-900/30',
      description: 'Personal experiences, memories, and life events',
      progress: 72,
      mintable: true,
      addButtonText: 'Add Experience',
      addPage: '/vault/experience/add'
    },
    { 
      id: 'economic', 
      title: '💰 Economic Layer', 
      component: EconomicLayer, 
      color: 'from-blue-900/30 to-indigo-900/30',
      description: 'Financial data, skills, and economic value',
      progress: 88,
      mintable: true,
      addButtonText: 'Add Economic Data',
      addPage: '/vault/economic/add'
    },
  ];

  const handleLayerClick = (layerId: string) => {
    setActiveLayer(layerId);
    setShowAllLayers(false);
  };

  const handleBackToLayers = () => {
    setActiveLayer(null);
    setShowAllLayers(true);
    setMintingLayer(null);
  };

  const handleMintLayer = async (layerId: string) => {
    setMintingLayer(layerId);
    
    // Simulate minting process
    try {
      console.log(`Minting ${layerId} layer...`);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert(`✅ ${layers.find(l => l.id === layerId)?.title} successfully minted as NFT!`);
      setMintingLayer(null);
      
    } catch (error) {
      console.error('Minting failed:', error);
      alert('❌ Minting failed. Please try again.');
      setMintingLayer(null);
    }
  };

  const handleAddToLayer = (layerId: string) => {
    const layer = layers.find(l => l.id === layerId);
    if (layer?.addPage) {
      router.push(layer.addPage);
    }
  };

  // If a specific layer is active, show only that layer
  if (activeLayer && !showAllLayers) {
    const layer = layers.find(l => l.id === activeLayer);
    if (!layer) return null;
    
    const LayerComponent = layer.component;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
        {/* Back button header */}
        <div className="sticky top-0 z-50 bg-gray-900/90 backdrop-blur-lg border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={handleBackToLayers}
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to All Layers
              </button>
              
              <div className="flex gap-3">
                <button
                  onClick={() => handleAddToLayer(layer.id)}
                  className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white rounded-lg font-semibold"
                >
                  {layer.addButtonText}
                </button>
                
                {layer.mintable && (
                  <button
                    onClick={() => handleMintLayer(layer.id)}
                    disabled={mintingLayer === layer.id}
                    className={`px-6 py-2 rounded-lg font-semibold ${
                      mintingLayer === layer.id
                        ? 'bg-gray-700 text-gray-400'
                        : 'bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white'
                    }`}
                  >
                    {mintingLayer === layer.id ? (
                      <span className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Minting...
                      </span>
                    ) : (
                      'Mint NFT'
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Active Layer - Full Width */}
        <div className="max-w-full">
          <LayerComponent />
        </div>
      </div>
    );
  }

  // Show all layers in vertical layout
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4 md:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
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
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-gradient-to-br from-purple-900/20 to-cyan-900/20 rounded-2xl p-6 border border-purple-500/20">
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
                <div className="text-2xl font-bold text-white">{layers.length}</div>
                <div className="text-sm text-gray-400">Layers</div>
              </div>
              <div className="relative">
                <div className="h-20 w-20 md:h-24 md:w-24 rounded-full border-4 border-purple-500/30 flex items-center justify-center">
                  <div className="text-xl md:text-2xl font-bold text-white">92%</div>
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">$85</div>
                <div className="text-sm text-gray-400">Monthly Value</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Layer Grid - VERTICAL */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-white">Your Identity Layers</h2>

        <div className="space-y-6">
          {layers.map((layer) => (
            <div
              key={layer.id}
              className={`bg-gradient-to-br ${layer.color} rounded-2xl border border-gray-800/50 overflow-hidden`}
            >
              {/* Layer Header */}
              <div className="p-6 border-b border-gray-800/50">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-white">{layer.title}</h3>
                      <span className="px-2 py-1 bg-white/10 rounded text-xs">
                        {layer.progress}% Complete
                      </span>
                    </div>
                    <p className="text-gray-300">{layer.description}</p>
                  </div>
                  
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleLayerClick(layer.id)}
                      className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                    >
                      View Layer
                    </button>
                    
                    <button
                      onClick={() => handleAddToLayer(layer.id)}
                      className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white rounded-lg font-semibold"
                    >
                      {layer.addButtonText}
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Layer Preview */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-full bg-gray-800/50 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-400 to-cyan-400 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${layer.progress}%` }}
                    ></div>
                  </div>
                  <span className="ml-4 text-sm text-gray-400">{layer.progress}%</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Layer-specific stats */}
                  {layer.id === 'cultural' && (
                    <>
                      <div className="bg-gray-900/50 rounded-xl p-4">
                        <div className="text-cyan-400 text-lg mb-2">📖</div>
                        <h4 className="text-white font-semibold mb-1">Stories</h4>
                        <p className="text-gray-400 text-sm">5 saved</p>
                      </div>
                      <div className="bg-gray-900/50 rounded-xl p-4">
                        <div className="text-purple-400 text-lg mb-2">🎭</div>
                        <h4 className="text-white font-semibold mb-1">Traditions</h4>
                        <p className="text-gray-400 text-sm">3 recorded</p>
                      </div>
                      <div className="bg-gray-900/50 rounded-xl p-4">
                        <div className="text-green-400 text-lg mb-2">🏺</div>
                        <h4 className="text-white font-semibold mb-1">Artifacts</h4>
                        <p className="text-gray-400 text-sm">2 digitized</p>
                      </div>
                    </>
                  )}
                  
                  {layer.id === 'biometric' && (
                    <>
                      <div className="bg-gray-900/50 rounded-xl p-4">
                        <div className="text-blue-400 text-lg mb-2">🎤</div>
                        <h4 className="text-white font-semibold mb-1">Voice Print</h4>
                        <p className="text-gray-400 text-sm">Registered</p>
                      </div>
                      <div className="bg-gray-900/50 rounded-xl p-4">
                        <div className="text-pink-400 text-lg mb-2">👁️</div>
                        <h4 className="text-white font-semibold mb-1">Face ID</h4>
                        <p className="text-gray-400 text-sm">Pending</p>
                      </div>
                      <div className="bg-gray-900/50 rounded-xl p-4">
                        <div className="text-yellow-400 text-lg mb-2">⌨️</div>
                        <h4 className="text-white font-semibold mb-1">Behavior</h4>
                        <p className="text-gray-400 text-sm">Analyzing</p>
                      </div>
                    </>
                  )}
                  
                  {layer.id === 'environmental' && (
                    <>
                      <div className="bg-gray-900/50 rounded-xl p-4">
                        <div className="text-green-400 text-lg mb-2">🌍</div>
                        <h4 className="text-white font-semibold mb-1">Carbon</h4>
                        <p className="text-gray-400 text-sm">12.2 tons</p>
                      </div>
                      <div className="bg-gray-900/50 rounded-xl p-4">
                        <div className="text-emerald-400 text-lg mb-2">💧</div>
                        <h4 className="text-white font-semibold mb-1">Water</h4>
                        <p className="text-gray-400 text-sm">45,000L</p>
                      </div>
                      <div className="bg-gray-900/50 rounded-xl p-4">
                        <div className="text-lime-400 text-lg mb-2">🌳</div>
                        <h4 className="text-white font-semibold mb-1">Trees</h4>
                        <p className="text-gray-400 text-sm">8 planted</p>
                      </div>
                    </>
                  )}
                  
                  {layer.id === 'experiential' && (
                    <>
                      <div className="bg-gray-900/50 rounded-xl p-4">
                        <div className="text-orange-400 text-lg mb-2">🎓</div>
                        <h4 className="text-white font-semibold mb-1">Education</h4>
                        <p className="text-gray-400 text-sm">3 degrees</p>
                      </div>
                      <div className="bg-gray-900/50 rounded-xl p-4">
                        <div className="text-amber-400 text-lg mb-2">✈️</div>
                        <h4 className="text-white font-semibold mb-1">Travel</h4>
                        <p className="text-gray-400 text-sm">15 countries</p>
                      </div>
                      <div className="bg-gray-900/50 rounded-xl p-4">
                        <div className="text-yellow-400 text-lg mb-2">🎭</div>
                        <h4 className="text-white font-semibold mb-1">Events</h4>
                        <p className="text-gray-400 text-sm">24 memories</p>
                      </div>
                    </>
                  )}
                  
                  {layer.id === 'economic' && (
                    <>
                      <div className="bg-gray-900/50 rounded-xl p-4">
                        <div className="text-blue-400 text-lg mb-2">💰</div>
                        <h4 className="text-white font-semibold mb-1">Income</h4>
                        <p className="text-gray-400 text-sm">$85/month</p>
                      </div>
                      <div className="bg-gray-900/50 rounded-xl p-4">
                        <div className="text-indigo-400 text-lg mb-2">💼</div>
                        <h4 className="text-white font-semibold mb-1">Skills</h4>
                        <p className="text-gray-400 text-sm">12 verified</p>
                      </div>
                      <div className="bg-gray-900/50 rounded-xl p-4">
                        <div className="text-violet-400 text-lg mb-2">📈</div>
                        <h4 className="text-white font-semibold mb-1">Assets</h4>
                        <p className="text-gray-400 text-sm">5 digital</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
              
              {/* Layer Footer with Mint Button */}
              {layer.mintable && (
                <div className="px-6 py-4 bg-black/20 border-t border-gray-800/50">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-400">
                      Ready to mint as NFT on blockchain
                    </div>
                    <button
                      onClick={() => handleMintLayer(layer.id)}
                      disabled={mintingLayer === layer.id}
                      className={`px-6 py-2 rounded-lg font-semibold ${
                        mintingLayer === layer.id
                          ? 'bg-gray-700 text-gray-400'
                          : 'bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white'
                      }`}
                    >
                      {mintingLayer === layer.id ? (
                        <span className="flex items-center gap-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          Minting...
                        </span>
                      ) : (
                        'Mint as NFT'
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Statistics Bar */}
        <div className="mt-10 bg-gradient-to-br from-gray-900/30 to-black/30 rounded-2xl p-6 border border-gray-800/50">
          <h3 className="text-xl font-bold text-white mb-4">Vault Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{layers.length}</div>
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
          <p className="text-gray-400 mb-6">Complete all layers to maximize your soul score value</p>
          <button 
            onClick={() => handleAddToLayer('biometric')}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-purple-500/30 transition-all transform hover:-translate-y-1">
Complete Your Contributions
</button>
</div>
</div>
</div>
);
}