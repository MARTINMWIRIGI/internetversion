"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { WizardData } from "@/app/wizard/page"

interface ResultStepProps {
  data: Partial<WizardData>
}

export function ResultStep({ data }: ResultStepProps) {
  const score = data.milsaScore || 0
  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-green-400"
    if (score >= 70) return "text-yellow-400"
    return "text-orange-400"
  }

  const getScoreStatus = (score: number) => {
    if (score >= 85) return "EXCELLENT - Auto-Mint Activated"
    if (score >= 70) return "GOOD - Eligible for Review"
    return "NEEDS IMPROVEMENT - Resubmit for Better Score"
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Success Card */}
      <Card className="bg-gradient-to-br from-green-500/20 to-cyan-500/20 border-green-400/50">
        <CardContent className="pt-8 text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-cyan-400 flex items-center justify-center neon-glow">
              <span className="text-3xl">✓</span>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-300">
              Vault Entry Created!
            </h3>
            <p className="text-muted-foreground">Your contribution has been successfully preserved</p>
          </div>

          {/* Score Section */}
          <div className="bg-card/50 border border-purple-500/30 rounded-lg p-6 space-y-3">
            <p className="text-sm text-muted-foreground">MILSA Quality Score</p>
            <p className={`text-5xl font-bold ${getScoreColor(score)}`}>{score}/100</p>
            <p className="text-sm font-semibold text-purple-400">{getScoreStatus(score)}</p>

            {score >= 85 && (
              <div className="bg-green-500/10 border border-green-500/30 rounded p-3 mt-4">
                <p className="text-xs text-green-400 font-semibold">
                  🎉 MILSA tokens will be automatically minted to your wallet
                </p>
              </div>
            )}

            {score >= 70 && score < 85 && (
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded p-3 mt-4">
                <p className="text-xs text-yellow-400 font-semibold">
                  ⏳ Your submission is under review for MILSA token eligibility
                </p>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="grid md:grid-cols-2 gap-4 text-left">
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
              <p className="text-xs text-muted-foreground mb-1">Contribution</p>
              <p className="font-mono text-sm text-purple-300">{data.words}</p>
            </div>
            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
              <p className="text-xs text-muted-foreground mb-1">Language</p>
              <p className="font-semibold text-cyan-300">{data.language}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 flex-wrap justify-center pt-6">
            <Link href="/wizard">
              <Button className="bg-gradient-to-r from-purple-500 to-cyan-400 hover:from-purple-600 hover:to-cyan-500 text-black font-semibold">
                Make Another Contribution
              </Button>
            </Link>
            <Link href="/vault">
              <Button
                variant="outline"
                className="border-cyan-400/50 text-cyan-400 hover:bg-cyan-500/10 bg-transparent"
              >
                View My Vault
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
