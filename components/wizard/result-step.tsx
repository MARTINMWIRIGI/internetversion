"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { WizardData } from "@/app/wizard/page"

interface ResultStepProps {
  data: Partial<WizardData>
}

export function ResultStep({ data }: ResultStepProps) {
  return (
    <Card className="bg-card/50 border-green-500/30">
      <CardHeader>
        <CardTitle className="text-green-400">🎉 Submission Complete!</CardTitle>
        <CardDescription>Your contribution has been recorded and preserved in the vault.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">Language: <span className="font-semibold text-green-300">{data.language}</span></p>
          <p className="text-sm text-muted-foreground">Content Type: <span className="font-semibold text-green-300">{data.contentType}</span></p>
          <p className="text-sm text-muted-foreground">Contribution: <span className="font-mono font-semibold text-green-300">{data.words}</span></p>
          <p className="text-sm text-muted-foreground">Definition: <span className="text-foreground">{data.definition}</span></p>
          {data.context && <p className="text-sm text-muted-foreground">Context: <span className="text-foreground">{data.context}</span></p>}
          {data.pronunciation && <p className="text-sm text-muted-foreground">Pronunciation: <span className="font-mono text-green-300">{data.pronunciation}</span></p>}
          {data.audioUrl && <p className="text-sm text-muted-foreground">Audio: ✓ Recorded</p>}
        </div>

        {data.nftMetadataUrl && (
          <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
            <p className="text-sm text-green-400 mb-1">Your NFT is minted and available here:</p>
            <a
              href={data.nftMetadataUrl}
              target="_blank"
              className="text-xs text-green-300 underline break-all"
            >
              {data.nftMetadataUrl}
            </a>
          </div>
        )}

        <div className="flex justify-between mt-6">
          <Link href="/">
            <Button className="bg-gradient-to-r from-purple-500 to-cyan-400 hover:from-purple-600 hover:to-cyan-500 text-black font-semibold">
              Back to Home
            </Button>
          </Link>
          <Button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-green-500 to-cyan-400 hover:from-green-600 hover:to-cyan-500 text-black font-semibold"
          >
            Submit Another
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}