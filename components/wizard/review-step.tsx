"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { WizardData } from "./types"
import { useState } from "react"

interface ReviewStepProps {
  onSubmit: (data: Partial<WizardData>) => void
  onBack: () => void
  data: Partial<WizardData>
  isSubmitting: boolean
}

export function ReviewStep({ onSubmit, onBack, data, isSubmitting }: ReviewStepProps) {
  const [isMinting, setIsMinting] = useState(false)

  const handleSubmitClick = async () => {
    setIsMinting(true)
    try {
      await onSubmit(data)
    } finally {
      setIsMinting(false)
    }
  }

  return (
    <Card className="bg-card/50 border-purple-500/30">
      <CardHeader>
        <CardTitle className="text-purple-400">Review Your Submission</CardTitle>
        <CardDescription>Verify all information before final submission</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Summary Cards */}
        <div className="space-y-4">
          <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Language</p>
                <p className="font-semibold text-purple-300">{data.language}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Content Type</p>
                <p className="font-semibold text-purple-300">{data.contentType}</p>
              </div>
            </div>
          </div>

          <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4 space-y-2">
            <p className="text-xs text-muted-foreground">Contribution</p>
            <p className="font-semibold text-cyan-300 font-mono">{data.words}</p>
            <p className="text-xs text-muted-foreground mt-2">Definition</p>
            <p className="text-sm text-foreground">{data.definition}</p>
            {data.context && (
              <>
                <p className="text-xs text-muted-foreground mt-2">Context</p>
                <p className="text-sm text-foreground">{data.context}</p>
              </>
            )}
          </div>

          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Pronunciation</p>
                <p className="font-semibold text-green-300 font-mono text-sm">{data.pronunciation}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Audio</p>
                <p className="font-semibold text-green-300">✓ Recorded</p>
              </div>
            </div>
            {data.videoUrl && (
              <div>
                <p className="text-xs text-muted-foreground">Environment Video</p>
                <p className="text-xs text-green-300 truncate">{data.videoUrl}</p>
              </div>
            )}
          </div>

          <div className="bg-accent/10 border border-accent/30 rounded-lg p-4">
            <p className="text-xs text-muted-foreground">Wallet Address</p>
            <p className="font-mono text-xs text-accent truncate">{data.walletAddress}</p>
          </div>
        </div>

        {/* Confirmation */}
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
          <p className="text-sm font-medium text-blue-400 mb-2">Before submitting:</p>
          <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
            <li>All information is accurate and complete</li>
            <li>Audio quality is clear and audible</li>
            <li>Wallet address is correct for receiving MILSA tokens</li>
            <li>You agree to preserve cultural heritage standards</li>
          </ul>
        </div>

        {/* Minting Status */}
        {isMinting && (
          <div className="text-xs text-yellow-400 font-medium mt-2 animate-pulse">
            ⏳ Minting NFT... please wait
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-4">
          <Button
            onClick={onBack}
            disabled={isSubmitting || isMinting}
            variant="outline"
            className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10 disabled:opacity-50 bg-transparent"
          >
            ← Back
          </Button>
          <Button
            onClick={handleSubmitClick}
            disabled={isSubmitting || isMinting}
            className="bg-gradient-to-r from-green-500 to-cyan-400 hover:from-green-600 hover:to-cyan-500 text-black font-semibold disabled:opacity-50"
          >
            {isMinting ? "Minting NFT..." : isSubmitting ? "Submitting..." : "Submit to Vault"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}