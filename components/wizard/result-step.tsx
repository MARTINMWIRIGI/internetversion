"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { WizardData } from "@/app/wizard/page"

interface ResultStepProps {
  data: Partial<WizardData>
}

export function ResultStep({ data }: ResultStepProps) {
  return (
    <Card className="bg-card/50 border-green-400/30">
      <CardHeader>
        <CardTitle className="text-green-400">Vault Entry Created</CardTitle>
        <CardDescription>Your contribution has been successfully preserved</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-sm text-muted-foreground">
          Congratulations! Your contribution is now part of the SoulInternet vault and is minted as an NFT.
        </p>

        {data.nftMetadataUrl && (
          <div className="text-xs text-green-400 mt-2">
            🎉 View your NFT on IPFS/OpenSea:{" "}
            <a href={data.nftMetadataUrl} target="_blank" rel="noopener noreferrer" className="underline ml-1">
              Open NFT
            </a>
          </div>
        )}
      </CardContent>
    </Card>
  )
}