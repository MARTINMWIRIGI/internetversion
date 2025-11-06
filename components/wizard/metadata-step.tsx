"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import type { WizardData } from "@/app/wizard/page"

interface MetadataStepProps {
  onNext: (data: Partial<WizardData>) => void
  onBack: () => void
  data: Partial<WizardData>
}

export function MetadataStep({ onNext, onBack, data }: MetadataStepProps) {
  const [pronunciation, setPronunciation] = useState(data.pronunciation || "")
  const [walletAddress, setWalletAddress] = useState(data.walletAddress || "")
  const [videoUrl, setVideoUrl] = useState(data.videoUrl || "")

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
        <CardDescription>Complete your submission details</CardDescription>
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

        {/* Wallet Address */}
        <div>
          <label className="block text-sm font-medium text-purple-400 mb-2">Wallet Address</label>
          <Input
            placeholder="Your wallet address for MILSA rewards"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            className="border-purple-500/30 bg-input text-foreground placeholder:text-muted-foreground focus:border-purple-400 font-mono text-sm"
          />
          <p className="text-xs text-muted-foreground mt-1">For receiving MILSA token rewards</p>
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
