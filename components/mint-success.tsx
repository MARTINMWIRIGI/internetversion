"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getExplorerUrl, getOpenSeaUrl } from "@/lib/web3-utils"
import { CheckCircle, ExternalLink } from "lucide-react"

interface MintSuccessProps {
  txHash: string
  onReset: () => void
}

export function MintSuccess({ txHash, onReset }: MintSuccessProps) {
  const polygonscanUrl = getExplorerUrl(txHash)
  const openSeaUrl = getOpenSeaUrl("0x202934e4dF29E57Ab7498bB31946174d7C95eDc7")

  return (
    <Card className="w-full max-w-2xl mx-auto border-green-500/20 bg-gradient-to-br from-green-900/20 to-slate-900">
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <CheckCircle className="w-8 h-8 text-green-500" />
          <CardTitle className="text-2xl text-green-100">NFT Minted Successfully!</CardTitle>
        </div>
        <CardDescription className="text-green-300/70">
          Your wizard has been immortalized on Polygon Mainnet
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-slate-800/50 rounded-lg p-4 border border-purple-500/20">
          <p className="text-sm text-purple-300/70 mb-2">Transaction Hash:</p>
          <p className="font-mono text-purple-100 break-all">{txHash}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild className="flex-1 bg-blue-600 hover:bg-blue-700 gap-2">
            <a href={polygonscanUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4" />
              View on Polygonscan
            </a>
          </Button>

          <Button asChild className="flex-1 bg-purple-600 hover:bg-purple-700 gap-2">
            <a href={openSeaUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4" />
              View on OpenSea
            </a>
          </Button>
        </div>

        <Button
          onClick={onReset}
          variant="outline"
          className="w-full border-purple-500/30 text-purple-100 hover:bg-purple-900/20 bg-transparent"
        >
          Mint Another Wizard
        </Button>
      </CardContent>
    </Card>
  )
}
