"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { WizardData } from "@/app/wizard/page"
import Link from "next/link"

interface ResultStepProps {
  data: Partial<WizardData>
}

export function ResultStep({ data }: ResultStepProps) {
  return (
    <Card className="bg-card/50 border-purple-500/30">
      <CardHeader>
        <CardTitle className="text-purple-400">Vault Entry Created 🎉</CardTitle>
        <CardDescription>Your contribution has been successfully minted and preserved</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* NFT Link */}
        {data.nftMetadataUrl && (
          <div className="text-xs text-green-400">
            🎉 View your NFT on IPFS/OpenSea:{" "}
            <a href={data.nftMetadataUrl} target="_blank" className="underline ml-1">
              Open NFT
            </a>
          </div>
        )}

        {/* Transaction Hash */}
        {data.txHash && (
          <div className="text-xs text-cyan-400">
            🔗 Polygon Transaction:{" "}
            <a
              href={`https://polygonscan.com/tx/${data.txHash}`}
              target="_blank"
              className="underline ml-1"
            >
              {data.txHash.slice(0, 10)}…{data.txHash.slice(-8)}
            </a>
          </div>
        )}

        {/* MILSA Score */}
        {data.milsaScore !== undefined && (
          <div className="text-xs text-yellow-400">
            🌟 Your MILSA Quality Score: <span className="font-semibold">{data.milsaScore}</span>
          </div>
        )}

        {/* Feedback */}
        {data.feedback && (
          <div className="text-xs text-muted-foreground">
            📝 Feedback: <span className="font-semibold">{data.feedback}</span>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-end mt-4">
          <Link href="/">
            <Button className="bg-gradient-to-r from-purple-500 to-cyan-400 hover:from-purple-600 hover:to-cyan-500 text-black font-semibold">
              Back to Home
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}