"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { WizardData } from "./types"
interface ResultStepProps {
  data: Partial<WizardData> & {
    nftMetadataUrl?: string
    txHash?: string
    status?: string
  }
}

export function ResultStep({ data }: ResultStepProps) {
  return (
    <Card className="bg-card/50 border-green-400/30">
      <CardHeader>
        <CardTitle className="text-green-400">Vault Entry Created</CardTitle>
        <CardDescription>Your language contribution has been minted as an NFT!</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {data.status === "success" ? (
          <>
            {data.nftMetadataUrl && (
              <div className="text-xs text-green-400">
                🎉 View your NFT:
                <a
                  href={data.nftMetadataUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline ml-1"
                >
                  Open NFT
                </a>
              </div>
            )}

            {data.txHash && (
              <div className="text-xs text-green-400">
                🔗 Polygon TX Hash:{" "}
                <a
                  href={`https://polygonscan.com/tx/${data.txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline ml-1"
                >
                  View on Polygonscan
                </a>
              </div>
            )}

            <div className="text-sm text-green-300">
              ✅ Your contribution is safely stored in the SoulInternet Vault.
            </div>
          </>
        ) : (
          <div className="text-sm text-red-400">
            ❌ Something went wrong during minting. Please try again.
          </div>
        )}

        <div className="flex justify-start mt-4 gap-4">
          <Link href="/">
            <Button variant="outline" className="text-green-400 border-green-400/30 hover:bg-green-500/10">
              ← Back to Home
            </Button>
          </Link>
          <Link href="/wizard">
            <Button className="bg-gradient-to-r from-green-500 to-cyan-400 hover:from-green-600 hover:to-cyan-500 text-black font-semibold">
              Create Another NFT
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}