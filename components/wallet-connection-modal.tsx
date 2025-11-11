"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react"

interface WalletConnectionModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConnect: () => Promise<void>
  isLoading?: boolean
}

export function WalletConnectionModal({
  open,
  onOpenChange,
  onConnect,
  isLoading = false,
}: WalletConnectionModalProps) {
  const [step, setStep] = useState<"info" | "connecting" | "success" | "error">("info")
  const [error, setError] = useState<string | null>(null)

  const handleConnect = async () => {
    setStep("connecting")
    try {
      await onConnect()
      setStep("success")
      setTimeout(() => {
        onOpenChange(false)
        setStep("info")
      }, 2000)
    } catch (err: any) {
      setError(err.message || "Connection failed. Please try again.")
      setStep("error")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-gradient-to-b from-purple-900/80 to-purple-950/80 border border-purple-500/30 backdrop-blur-xl">
        {step === "info" && (
          <>
            <DialogHeader>
              <DialogTitle className="text-cyan-300">Connect Your Wallet</DialogTitle>
              <DialogDescription className="text-gray-300 mt-2">Here's what happens next:</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-500/30 flex items-center justify-center text-sm font-semibold text-cyan-400 flex-shrink-0">
                    1
                  </div>
                  <div>
                    <p className="font-semibold text-gray-200">MetaMask Popup Appears</p>
                    <p className="text-sm text-gray-400">
                      A popup window will open asking you to approve the connection
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-500/30 flex items-center justify-center text-sm font-semibold text-cyan-400 flex-shrink-0">
                    2
                  </div>
                  <div>
                    <p className="font-semibold text-gray-200">Network Switch (Optional)</p>
                    <p className="text-sm text-gray-400">
                      We'll ask to switch to Polygon Mainnet if you're on a different network
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-500/30 flex items-center justify-center text-sm font-semibold text-cyan-400 flex-shrink-0">
                    3
                  </div>
                  <div>
                    <p className="font-semibold text-gray-200">Access Your Vault</p>
                    <p className="text-sm text-gray-400">
                      Your wallet address unlocks your personal contribution vault and earnings dashboard
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3">
                <p className="text-xs text-cyan-300">
                  <strong>Need MetaMask?</strong> Download it free at metamask.io
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleConnect} className="flex-1 gradient-accent">
                Continue to MetaMask
              </Button>
            </div>
          </>
        )}

        {step === "connecting" && (
          <>
            <DialogHeader>
              <DialogTitle className="text-cyan-300">Connecting Your Wallet</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col items-center justify-center py-8 gap-4">
              <Loader2 className="w-12 h-12 text-cyan-400 animate-spin" />
              <div className="text-center">
                <p className="font-semibold text-gray-200">Check your MetaMask</p>
                <p className="text-sm text-gray-400 mt-1">Look for the popup or check your browser extensions</p>
              </div>
            </div>
          </>
        )}

        {step === "success" && (
          <>
            <DialogHeader>
              <DialogTitle className="text-green-400">Wallet Connected Successfully!</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col items-center justify-center py-8 gap-4">
              <CheckCircle2 className="w-16 h-16 text-green-400" />
              <div className="text-center">
                <p className="font-semibold text-gray-200">You're all set!</p>
                <p className="text-sm text-gray-400 mt-1">Your wallet is connected. You can now start contributing.</p>
              </div>
            </div>
          </>
        )}

        {step === "error" && (
          <>
            <DialogHeader>
              <DialogTitle className="text-red-400">Connection Failed</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="flex gap-3 bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-red-300">
                  <p className="font-semibold">Connection Error</p>
                  <p className="mt-1 text-xs">{error}</p>
                </div>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 text-xs text-blue-300">
                <strong>Troubleshooting:</strong>
                <ul className="mt-2 space-y-1 list-disc list-inside">
                  <li>Make sure MetaMask is installed and unlocked</li>
                  <li>Try refreshing the page and connecting again</li>
                  <li>Check that you're on a supported network</li>
                </ul>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep("info")} className="flex-1">
                Back
              </Button>
              <Button onClick={handleConnect} className="flex-1 gradient-accent">
                Try Again
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
