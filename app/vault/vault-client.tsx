"use client"

import { useState, useEffect } from "react"
import { LayerCard } from "@/components/vault/layer-card"
import { SoulScoreDisplay } from "@/components/vault/soulscore-display"
import { CompositeView } from "@/components/vault/composite-view"
import { InheritanceBadge } from "@/components/vault/inheritance-badge"
// Add this import at the top
import { MobileVaultNav } from "@/components/vault/mobile-nav"

// Add this component before the closing </main> tag
<MobileVaultNav />

// Sample data - will be replaced with real data later
const initialLayers = [
  {
    id: 1,
    title: "Biometric Layer",
    description: "Your unique voice fingerprint & pronunciation",
    icon: "🎤",
    color: "bg-purple-500/20",
    dataCount: 2,
    isActive: true
  },
  {
    id: 2,
    title: "Cultural Layer",
    description: "Languages, stories, proverbs & traditions",
    icon: "🌍",
    color: "bg-green-500/20",
    dataCount: 3,
    isActive: true
  },
  {
    id: 3,
    title: "Environmental Layer",
    description: "Carbon credits & ecological impact",
    icon: "🌱",
    color: "bg-blue-500/20",
    dataCount: 1,
    isActive: false
  },
  {
    id: 4,
    title: "Experiential Layer",
    description: "Memories, emotions & life moments",
    icon: "💭",
    color: "bg-yellow-500/20",
    dataCount: 0,
    isActive: false
  },
  {
    id: 5,
    title: "Economic Layer",
    description: "AI training rights & revenue streams",
    icon: "💰",
    color: "bg-cyan-500/20",
    dataCount: 1,
    isActive: true
  }
]

export default function VaultClientPage() {
  const [layers, setLayers] = useState(initialLayers)
  const [soulScore, setSoulScore] = useState(65) // Will calculate dynamically

  // Calculate soul score based on active layers
  useEffect(() => {
    const activeLayers = layers.filter(layer => layer.isActive)
    const dataCount = layers.reduce((sum, layer) => sum + layer.dataCount, 0)
    
    // Simple calculation: 20 points per active layer + 5 points per data item
    const newScore = Math.min(100, (activeLayers.length * 20) + (dataCount * 5))
    setSoulScore(newScore)
  }, [layers])

  const handleAddLayer = (layerId: number) => {
    setLayers(layers.map(layer => 
      layer.id === layerId ? { ...layer, isActive: true, dataCount: layer.dataCount + 1 } : layer
    ))
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 to-purple-950">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            My Human Vault
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Your multi-dimensional identity preserved across 5 layers for eternity
          </p>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Left Column: Soul Score */}
          <div className="lg:col-span-1">
            <SoulScoreDisplay score={soulScore} />
          </div>

          {/* Middle Column: Composite View */}
          <div className="lg:col-span-1">
            <CompositeView />
          </div>

          {/* Right Column: Inheritance */}
          <div className="lg:col-span-1">
            <InheritanceBadge />
          </div>
        </div>

        {/* Layers Grid */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-6">Vault Layers</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {layers.map((layer) => (
              <div key={layer.id}>
                <LayerCard
                  title={layer.title}
                  description={layer.description}
                  icon={layer.icon}
                  color={layer.color}
                  dataCount={layer.dataCount}
                  isActive={layer.isActive}
                />
                {!layer.isActive && (
                  <button
                    onClick={() => handleAddLayer(layer.id)}
                    className="mt-2 w-full py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition text-sm"
                  >
                    + Activate Layer
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-gray-900/50 border border-gray-700 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">Vault Statistics</h3>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-purple-500/10 rounded-xl">
              <div className="text-2xl font-bold text-white">{layers.filter(l => l.isActive).length}</div>
              <div className="text-sm text-purple-400">Active Layers</div>
            </div>
            <div className="text-center p-4 bg-green-500/10 rounded-xl">
              <div className="text-2xl font-bold text-white">{layers.reduce((sum, l) => sum + l.dataCount, 0)}</div>
              <div className="text-sm text-green-400">Data Items</div>
            </div>
            <div className="text-center p-4 bg-blue-500/10 rounded-xl">
              <div className="text-2xl font-bold text-white">3</div>
              <div className="text-sm text-blue-400">Generations</div>
            </div>
            <div className="text-center p-4 bg-cyan-500/10 rounded-xl">
              <div className="text-2xl font-bold text-white">$48.50</div>
              <div className="text-sm text-cyan-400">Potential Value</div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 text-center">
          <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition">
            🚀 Complete Your Vault Journey
          </button>
          <p className="text-gray-500 text-sm mt-3">
            Complete all 5 layers to unlock your full Soul Score potential
          </p>
        </div>
      </div>
    </main>
  )
}