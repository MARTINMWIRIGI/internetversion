'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CulturalLayer from '@/components/layers/CulturalLayer';
import BiometricLayer from '@/components/layers/BiometricLayer';
import EnvironmentalLayer from '@/components/layers/EnvironmentalLayer';
import ExperientialLayer from '@/components/layers/ExperientialLayer';
import EconomicLayer from '@/components/layers/EconomicLayer';
import { 
  Brain, 
  Heart, 
  Shield, 
  Lock, 
  Database, 
  Wallet, 
  Coins, 
  Gift,
  DollarSign,
  TrendingUp,
  Users,
  Globe,
  BookOpen,
  Mic,
  Camera,
  Calendar,
  Briefcase,
  Leaf
} from 'lucide-react';

// Define the type for layer stats
interface LayerStat {
  label: string;
  value: string;
  color: string;
  subValue?: string;
}

// Define the layer interface
interface VaultLayer {
  id: string;
  title: string;
  component: React.ComponentType;
  color: string;
  borderColor: string;
  description: string;
  longDescription: string;
  rewardRate: number;
  progress: number;
  mintable: boolean;
  addButtonText: string;
  addPage: string;
  icon: React.ReactNode;
  stats: LayerStat[]; // Make stats required
}

export default function VaultPage() {
  const router = useRouter();
  const [activeLayer, setActiveLayer] = useState<string | null>(null);
  const [mintingLayer, setMintingLayer] = useState<string | null>(null);
  const [showAllLayers, setShowAllLayers] = useState(true);
  const [userBalance, setUserBalance] = useState(1245.50); // Milsa Tokens
  const [showEarningsModal, setShowEarningsModal] = useState(false);

  // Milsa Token Conversion Rates
  const MILSA_TO_USD = 0.01;
  const USD_TO_KES = 150; // Approximate
  const milsaToKes = (tokens: number) => tokens * MILSA_TO_USD * USD_TO_KES;

  const layers: VaultLayer[] = [
    { 
      id: 'cultural', 
      title: '🏛️ Cultural Heritage', 
      component: CulturalLayer, 
      color: 'from-purple-900/30 to-cyan-900/30',
      borderColor: 'border-purple-500/30',
      description: 'Preserve stories, traditions, and cultural artifacts',
      longDescription: 'Save endangered cultures and earn money for every word. Your stories become permanent digital artifacts that can never be lost.',
      rewardRate: 1, // Tokens per word
      progress: 85,
      mintable: true,
      addButtonText: 'Add More Culture',
      addPage: '/vault/culture/add',
      icon: <BookOpen className="w-5 h-5" />,
      stats: [
        { label: 'Words Preserved', value: '847', color: 'text-cyan-400' },
        { label: 'Stories Saved', value: '23', color: 'text-purple-400' },
        { label: 'Earned This Month', value: '847 Tokens', color: 'text-green-400', subValue: '≈ KSh 1,270' }
      ]
    },
    { 
      id: 'biometric', 
      title: '🔐 Biometric Authentication', 
      component: BiometricLayer, 
      color: 'from-gray-900/30 to-blue-900/30',
      borderColor: 'border-blue-500/30',
      description: 'Your unique biological identity, secured forever',
      longDescription: 'Turn your voice, heartbeat, and typing patterns into unforgeable digital signatures. Earn rewards for each unique trait.',
      rewardRate: 3, // Tokens per trait
      progress: 65,
      mintable: true,
      addButtonText: 'Complete Biometric Scan',
      addPage: '/vault/biometrics/scan',
      icon: <Mic className="w-5 h-5" />,
      stats: [
        { label: 'Traits Recorded', value: '4', color: 'text-blue-400' },
        { label: 'Security Score', value: '92%', color: 'text-green-400' },
        { label: 'Earned This Month', value: '12 Tokens', color: 'text-green-400',subValue: '≈ KSh 18' }
      ]
    },
    { 
      id: 'environmental', 
      title: '🌱 Environmental Layer', 
      component: EnvironmentalLayer, 
      color: 'from-green-900/30 to-emerald-900/30',
      borderColor: 'border-green-500/30',
      description: 'Your environmental impact and sustainability data',
      longDescription: 'Track and offset your carbon footprint while earning rewards. Contribute to climate research and sustainable living.',
      rewardRate: 2, // Tokens per data point
      progress: 45,
      mintable: true,
      addButtonText: 'Add Environmental Data',
      addPage: '/vault/environment/add',
      icon: <Leaf className="w-5 h-5" />,
      stats: [
        { label: 'Carbon Offset', value: '12.2 tons', color: 'text-green-400' },
        { label: 'Trees Planted', value: '8', color: 'text-emerald-400' },
        { label: 'Earned This Month', value: '90 Tokens', color: 'text-green-400',subValue: '≈ KSh 135' }
      ]
    },
    { 
      id: 'experiential', 
      title: '🎭 Experiential Layer', 
      component: ExperientialLayer, 
      color: 'from-yellow-900/30 to-orange-900/30',
      borderColor: 'border-orange-500/30',
      description: 'Your life stories and memories, preserved forever',
      longDescription: 'Turn precious memories into permanent digital treasures. Each memory earns you tokens while creating a family legacy.',
      rewardRate: 1.5, // Tokens per memory
      progress: 72,
      mintable: true,
      addButtonText: 'Add Experience',
      addPage: '/vault/experience/add',
      icon: <Camera className="w-5 h-5" />,
      stats: [
        { label: 'Memories Saved', value: '24', color: 'text-orange-400' },
        { label: 'Family Members', value: '8', color: 'text-yellow-400' },
        { label: 'Earned This Month', value: '36 Tokens',color: 'text-green-400', subValue: '≈ KSh 54' }
      ]
    },
    { 
      id: 'economic', 
      title: '💰 Economic Layer', 
      component: EconomicLayer, 
      color: 'from-blue-900/30 to-indigo-900/30',
      borderColor: 'border-indigo-500/30',
      description: 'Your skills, income, and economic value',
      longDescription: 'Document your professional journey and economic contributions. Verified skills and income data earn you higher rewards.',
      rewardRate: 2.5, // Tokens per verified skill
      progress: 88,
      mintable: true,
      addButtonText: 'Add Economic Data',
      addPage: '/vault/economic/add',
      icon: <Briefcase className="w-5 h-5" />,
      stats: [
        { label: 'Verified Skills', value: '12', color: 'text-indigo-400' },
        { label: 'Monthly Income', value: '$85', color: 'text-blue-400' },
        { label: 'Earned This Month', value: '260 Tokens',color: 'text-green-400', subValue: '≈ KSh 390' }
      ]
    },
  ];

  // Calculate total earnings
  const totalEarnings = layers.reduce((sum, layer) => {
    // Simulated earnings based on progress
    const earnings = layer.progress * layer.rewardRate * 10;
    return sum + earnings;
  }, 0);

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

      // Add minting bonus to balance
      const mintBonus = 50; // Tokens for minting
      setUserBalance(prev => prev + mintBonus);
      
      alert(`✅ Successfully minted as NFT! You earned ${mintBonus} bonus tokens (≈ KSh ${mintBonus * MILSA_TO_USD * USD_TO_KES})`);
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

  const handleCashOut = () => {
    if (userBalance >= 100) { // Minimum cashout 100 tokens
      alert(`Cashing out ${userBalance} Milsa Tokens to M-Pesa...\n\nApprox: $${(userBalance * MILSA_TO_USD).toFixed(2)} USD\nApprox: KSh ${milsaToKes(userBalance).toFixed(0)}`);
      setUserBalance(0);
    } else {
      alert(`Minimum cashout is 100 Milsa Tokens (KSh ${milsaToKes(100).toFixed(0)}). You need ${100 - userBalance} more tokens.`);
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
      {/* Header with Balance */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                Your Human Vault
              </span>
            </h1>
            <p className="text-gray-300">
              Preserve your life story • Earn money • Create legacy
            </p>
          </div>

          {/* Balance Card */}
          <div className="bg-gradient-to-br from-purple-900/20 to-cyan-900/20 rounded-2xl p-6 border border-purple-500/20 min-w-[300px]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-sm text-gray-400">Your Balance</div>
                  <div className="text-2xl font-bold text-white">{userBalance.toFixed(2)} Milsa</div>
                </div>
              </div>
              <button
                onClick={() => setShowEarningsModal(true)}
                className="text-sm text-cyan-400 hover:text-cyan-300"
              >
                View Details
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center p-3 bg-black/30 rounded-lg">
                <div className="text-lg font-bold text-green-400">
                  ${(userBalance * MILSA_TO_USD).toFixed(2)}
                </div>
                <div className="text-xs text-gray-400">USD Value</div>
              </div>
              <div className="text-center p-3 bg-black/30 rounded-lg">
                <div className="text-lg font-bold text-yellow-400">
                  KSh {milsaToKes(userBalance).toFixed(0)}
                </div>
                <div className="text-xs text-gray-400">Kenyan Value</div>
              </div>
            </div>

            <button
              onClick={handleCashOut}
              disabled={userBalance < 100}
              className={`w-full py-3 rounded-lg font-semibold ${
                userBalance >= 100
                  ? 'bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white'
                  : 'bg-gray-700 text-gray-400 cursor-not-allowed'
              }`}
            >
              {userBalance >= 100 ? 'Cash Out to M-Pesa' : `Need ${(100 - userBalance).toFixed(0)} more tokens`}
            </button>
            <p className="text-xs text-gray-500 text-center mt-2">
              Minimum cashout: 100 Milsa (≈ KSh {milsaToKes(100).toFixed(0)})
            </p>
          </div>
        </div>

        {/* Welcome Message */}
        <div className="max-w-7xl mx-auto mb-8">
          <div className="bg-gradient-to-br from-gray-900/50 to-black/50 rounded-2xl p-6 border border-gray-800/50">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="flex-1">
                <h2 className="text-xl font-bold text-white mb-3">✨ How Your Vault Works</h2>
                <div className="space-y-3 text-gray-300">
                  <p className="flex items-start gap-2">
                    <span className="text-green-400">✓</span>
                    <span><strong>Record</strong> your stories, memories, and cultural knowledge</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-green-400">✓</span>
                    <span><strong>Earn Milsa Tokens</strong> for everything you preserve (1 word = 1 token = KSh 1.50)</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-green-400">✓</span>
                    <span><strong>Mint as NFT</strong> to create permanent ownership certificates</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-green-400">✓</span>
                    <span><strong>Cash out anytime</strong> to M-Pesa, bank, or keep growing your balance</span>
                  </p>
                </div>
              </div>
              <div className="bg-black/40 rounded-xl p-4 border border-cyan-500/20">
                <div className="text-center">
                  <div className="text-sm text-gray-400 mb-1">Example: Save 100 words of culture</div>
                  <div className="text-xl font-bold text-cyan-400">Earn KSh 150</div>
                  <div className="text-sm text-gray-500">+ Permanent digital legacy</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Soul Score Banner */}
        <div className="max-w-7xl mx-auto mb-8">
          <div className="bg-gradient-to-br from-purple-900/20 to-cyan-900/20 rounded-2xl p-6 border border-purple-500/20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <div className="text-sm text-gray-400">Your Soul Score</div>
                <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                  6,450
                </div>
                <div className="text-sm text-gray-300 mt-1">
                  Based on contributions across {layers.length} layers
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-xl font-bold text-white">{totalEarnings.toFixed(0)}</div>
                  <div className="text-sm text-gray-400">Tokens Earned</div>
                </div>
                <div className="relative">
                  <div className="h-20 w-20 md:h-24 md:w-24 rounded-full border-4 border-purple-500/30 flex items-center justify-center">
                    <div className="text-xl md:text-2xl font-bold text-white">92%</div>
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-gray-400">
                    Complete
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-white">5</div>
                  <div className="text-sm text-gray-400">Active Layers</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Layer Grid - VERTICAL */}
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-white">Your Identity Layers</h2>
          <p className="text-gray-400 mb-8">Click any layer to view details and continue earning</p>

          <div className="space-y-6">
            {layers.map((layer) => (
              <div
                key={layer.id}
                className={`bg-gradient-to-br ${layer.color} rounded-2xl border ${layer.borderColor} overflow-hidden hover:border-opacity-50 transition-all duration-300`}
              >
              {/* Layer Header */}
                <div className="p-6 border-b border-gray-800/50">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`p-2 rounded-lg bg-black/30 border ${layer.borderColor}`}>
                          {layer.icon}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">{layer.title}</h3>
                          <p className="text-gray-300 text-sm">{layer.description}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => handleLayerClick(layer.id)}
                        className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                      >
                        View Details
                      </button>

                      <button
                        onClick={() => handleAddToLayer(layer.id)}
                        className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white rounded-lg font-semibold flex items-center gap-2"
                      >
                        <Gift className="w-4 h-4" />
                        {layer.addButtonText}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Layer Content */}
                <div className="p-6">
                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">Completion</span>
                      <span className="text-sm font-semibold text-green-400">{layer.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-800/50 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-green-400 to-cyan-400 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${layer.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-6">
                    <p className="text-gray-300">{layer.longDescription}</p>
                  </div>

                  {/* Stats and Rewards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Layer Stats */}
                    <div className="space-y-4">
                      <h4 className="font-bold text-white flex items-center gap-2">
                        <Database className="w-4 h-4" />
                        Your Data
                      </h4>
                      <div className="space-y-3">
                        {layer.stats.map((stat, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <span className="text-sm text-gray-400">{stat.label}</span>
                            <div className="text-right">
                              <div className={`font-bold ${stat.color}`}>{stat.value}</div>
                              {stat.subValue && (
                                <div className="text-xs text-gray-500">{stat.subValue}</div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
{/* Earning Potential */}
                    <div className="bg-black/30 rounded-xl p-4 border border-gray-800/50">
                      <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" />
                        Earning Potential
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-400">Rate per contribution</span>
                          <span className="font-bold text-green-400">{layer.rewardRate} Milsa</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-400">KES value per token</span>
                          <span className="font-bold text-yellow-400">KSh {(layer.rewardRate * MILSA_TO_USD * USD_TO_KES).toFixed(2)}</span>
                        </div>
                        <div className="pt-3 border-t border-gray-800/50">
                          <div className="text-center">
                            <div className="text-sm text-gray-400 mb-1">Example: Add 10 items</div>
                            <div className="text-lg font-bold text-cyan-400">
                              Earn KSh {(10 * layer.rewardRate * MILSA_TO_USD * USD_TO_KES).toFixed(0)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Layer Footer with Mint Button */}
                {layer.mintable && (
                  <div className="px-6 py-4 bg-black/20 border-t border-gray-800/50">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                      <div>
                        <div className="text-sm text-gray-400">
                          Ready to mint as permanent NFT
                        </div>
                        <div className="text-xs text-gray-500">
                          Minting earns 50 bonus tokens (≈ KSh {milsaToKes(50).toFixed(0)})
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleAddToLayer(layer.id)}
                          className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                        >
                          Add More First
                        </button>
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
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Quick Earning Guide */}
          <div className="mt-10 bg-gradient-to-br from-gray-900/30 to-black/30 rounded-2xl p-6 border border-gray-800/50">
            <h3 className="text-xl font-bold text-white mb-4">🚀 Quick Start Guide</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-black/40 rounded-xl p-4">
                <div className="text-cyan-400 text-lg mb-2">1️⃣</div>
                <h4 className="font-bold text-white mb-2">Start with Culture</h4>
                <p className="text-gray-400 text-sm">Write 100 words about family traditions. Earn <strong>KSh 150</strong> instantly.</p>
              </div>
              <div className="bg-black/40 rounded-xl p-4">
                <div className="text-purple-400 text-lg mb-2">2️⃣</div>
                <h4 className="font-bold text-white mb-2">Add Memories</h4>
                <p className="text-gray-400 text-sm">Upload 10 family photos with stories. Earn <strong>KSh 22.50</strong> extra.</p>
              </div>
              <div className="bg-black/40 rounded-xl p-4">
                <div className="text-green-400 text-lg mb-2">3️⃣</div>
                <h4 className="font-bold text-white mb-2">Mint & Cash Out</h4>
                <p className="text-gray-400 text-sm">Mint your data as NFT, get bonus tokens, cash out to M-Pesa.</p>
              </div>
            </div>
          </div>

          {/* Statistics Bar */}
          <div className="mt-10 bg-gradient-to-br from-gray-900/30 to-black/30 rounded-2xl p-6 border border-gray-800/50">
            <h3 className="text-xl font-bold text-white mb-4">📊 Your Vault Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">{layers.length}</div>
                <div className="text-sm text-gray-400">Active Layers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-400">
                  ${(totalEarnings * MILSA_TO_USD).toFixed(2)}
                </div>
                <div className="text-sm text-gray-400">Total Earned (USD)</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">
                  KSh {milsaToKes(totalEarnings).toFixed(0)}
                </div>
                <div className="text-sm text-gray-400">Total Earned (KES)</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">92%</div>
                <div className="text-sm text-gray-400">Completion Rate</div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-10 text-center">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-900/30 to-cyan-900/30 px-6 py-3 rounded-full mb-4">
              <span className="text-green-400">✨</span>
              <span className="text-gray-300">Start earning in minutes</span>
            </div>
            <p className="text-gray-400 mb-6">Your first contribution starts earning tokens immediately</p>
            <div className="flex flex-wrap justify-center gap-4">
              <button 
                onClick={() => handleAddToLayer('cultural')}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-purple-500/30 transition-all transform hover:-translate-y-1">
                Start with Culture
              </button>
              <button 
                onClick={() => handleAddToLayer('experiential')}
                className="px-8 py-4 bg-gradient-to-r from-orange-600 to-yellow-500 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-orange-500/30 transition-all transform hover:-translate-y-1">
                Add Memories
              </button>
            </div>
          </div>
        </div>
{/* Earnings Modal */}
        {showEarningsModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 max-w-md w-full border border-purple-500/30">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">💰 Your Earnings Details</h3>
                <button
                  onClick={() => setShowEarningsModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Current Balance</span>
                  <span className="text-xl font-bold text-cyan-400">{userBalance.toFixed(2)} Milsa</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">USD Value</span>
                  <span className="text-lg text-green-400">${(userBalance * MILSA_TO_USD).toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Kenyan Shillings</span>
                  <span className="text-lg text-yellow-400">KSh {milsaToKes(userBalance).toFixed(0)}</span>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <h4 className="font-bold text-white">💡 Quick Earning Tips</h4>
                <div className="text-sm text-gray-300 space-y-2">
                  <p>• Add 50 cultural words daily = <strong>KSh 75/day</strong></p>
                  <p>• Record 2 memories weekly = <strong>KSh 9/week</strong></p>
                  <p>• Complete biometric scan = <strong>KSh 13.50 bonus</strong></p>
                  <p>• Mint a layer as NFT = <strong>KSh 75 bonus</strong></p>
                </div>
              </div>

              <button
                onClick={handleCashOut}
                disabled={userBalance < 100}
                className={`w-full py-3 rounded-lg font-semibold mb-3 ${
                  userBalance >= 100
                    ? 'bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white'
                    : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                }`}
              >
                {userBalance >= 100 
                  ? `Cash Out ${userBalance.toFixed(0)} Milsa` 
                  : `Need ${(100 - userBalance).toFixed(0)} more tokens`
                }
              </button>
              <p className="text-xs text-center text-gray-500">
                Transfers to M-Pesa arrive within 2 minutes
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}