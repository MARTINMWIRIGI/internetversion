"use client"

import { Button } from "@/components/ui/button"

export function CompositeView() {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-black border border-cyan-500/30 rounded-2xl p-6">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <span className="text-cyan-400">✨</span> Composite Vault
      </h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
          <div>
            <div className="font-medium text-white">Current Layers</div>
            <div className="text-sm text-gray-400">3 of 5 layers active</div>
          </div>
          <div className="text-cyan-400 font-bold">60% Complete</div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3">
            <div className="text-xs text-purple-400 mb-1">Biometric</div>
            <div className="text-sm text-white">Voice Recorded</div>
          </div>
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
            <div className="text-xs text-green-400 mb-1">Cultural</div>
            <div className="text-sm text-white">2 Languages</div>
          </div>
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
            <div className="text-xs text-blue-400 mb-1">Environmental</div>
            <div className="text-sm text-white">0.5 Ton Carbon</div>
          </div>
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
            <div className="text-xs text-yellow-400 mb-1">Economic</div>
            <div className="text-sm text-white">AI Rights: On</div>
          </div>
        </div>

        <Button className="w-full bg-gradient-to-r from-purple-500 to-cyan-400 hover:from-purple-600 hover:to-cyan-500 text-white font-semibold mt-4">
          🔗 Create Composite NFT
        </Button>

        <p className="text-xs text-gray-500 text-center mt-2">
          Composite NFTs are 3x more valuable than single layers
        </p>
      </div>
    </div>
  )
}