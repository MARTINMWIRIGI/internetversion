"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import type { WizardData } from "./types"

interface MetadataStepProps {
  onNext: (data: Partial<WizardData>) => void
  onBack: () => void
  data: Partial<WizardData>
}

export function MetadataStep({ onNext, onBack, data }: MetadataStepProps) {
  const [pronunciation, setPronunciation] = useState(data.pronunciation || "")
  const [walletAddress, setWalletAddress] = useState(data.walletAddress || "")
  const [videoUrl, setVideoUrl] = useState(data.videoUrl || "")
  const [walletConnected, setWalletConnected] = useState(false)

  const connectMetaMask = async () => {
    try {
      if (!(window as any).ethereum) {
        alert("MetaMask is not installed. Please install it first.")
        return
      }

      const accounts = await (window as any).ethereum.request({
        method: "eth_requestAccounts",
      })

      if (accounts && accounts.length > 0) {
        setWalletAddress(accounts[0])
        setWalletConnected(true)
      }
    } catch (error) {
      console.error("Error connecting MetaMask:", error)
      alert("Failed to connect MetaMask. Please try again.")
    }
  }

  const handleNext = () => {
    if (pronunciation.trim() && walletAddress.trim()) {
      onNext({
        pronunciation: pronunciation.trim(),
        walletAddress: walletAddress.trim(),
        videoUrl: videoUrl.trim() || undefined,
      })
    }
  }

  const isValid = pronunciation.trim() && walletAddress.trim()

  return (
    <Card className="bg-card/50 border-cyan-400/30">
      <CardHeader>
        <CardTitle className="text-cyan-400">Additional Information</CardTitle>
        <CardDescription>Complete your submission details and connect wallet for NFT minting</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Pronunciation Guide */}
        <div>
          <label className="block text-sm font-medium text-purple-400 mb-2">Pronunciation Guide</label>
          <Textarea
            placeholder="e.g., [pro-nun-see-AY-shun] or describe how to pronounce it..."
            value={pronunciation}
            onChange={(e) => setPronunciation(e.target.value)}
            rows={2}
            className="border-purple-500/30 bg-input text-foreground placeholder:text-muted-foreground focus:border-purple-400 resize-none font-mono"
          />
          <p className="text-xs text-muted-foreground mt-1">Help others understand how to pronounce this</p>
        </div>

        {/* Wallet Connection */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-purple-400 mb-2">
            Wallet Address for NFT Minting & MILSA Rewards
          </label>
          <div className="space-y-2">
            {!walletConnected ? (
              <Button
                onClick={connectMetaMask}
                className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-black font-semibold"
              >
                Connect MetaMask Wallet
              </Button>
            ) : (
              <div className="text-xs text-green-400 flex items-center gap-2">✓ Wallet connected successfully</div>
            )}
            <Input
              placeholder="Your wallet address (auto-filled from MetaMask or enter manually)"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              className="border-purple-500/30 bg-input text-foreground placeholder:text-muted-foreground focus:border-purple-400 font-mono text-sm"
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Your recording will be minted as an NFT and MILSA rewards will be sent to this address
          </p>
        </div>

        {/* Video URL (Optional) */}
        <div>
          <label className="block text-sm font-medium text-purple-400 mb-2">Environment Video (Optional)</label>
          <Input
            placeholder="https://example.com/video.mp4"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            className="border-purple-500/30 bg-input text-foreground placeholder:text-muted-foreground focus:border-purple-400 font-mono text-sm"
            type="url"
          />
          <p className="text-xs text-muted-foreground mt-1">Optional: Include context video of where this is spoken</p>
        </div>

        {/* Info Box */}
        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
          <p className="text-sm font-medium text-green-400 mb-2">Your submission will be:</p>
          <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
            <li>Minted as an NFT with waveform artwork</li>
            <li>Listed on OpenSea for viewing</li>
            <li>Analyzed for quality metrics</li>
            <li>Assigned a MILSA Quality Score</li>
            <li>Preserved in the SoulInternet vault</li>
            <li>Eligible for MILSA token rewards if score ≥ 70</li>
          </ul>
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            onClick={onBack}
            variant="outline"
            className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10 bg-transparent"
          >
            ← Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={!isValid}
            className="bg-gradient-to-r from-purple-500 to-cyan-400 hover:from-purple-600 hover:to-cyan-500 text-black font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue →
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
