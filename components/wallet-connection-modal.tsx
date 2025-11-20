"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react"
import { useMetamask, useAddress, useDisconnect } from "@thirdweb-dev/react"

interface WalletConnectionModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function WalletConnectionModal({ open, onOpenChange }: WalletConnectionModalProps) {
  const connectWithMetamask = useMetamask()
  const disconnect = useDisconnect()
  const address = useAddress()

  const [step, setStep] = useState<"info" | "connecting" | "success" | "error">("info")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // If address becomes available, show success
    if (address) setStep("success")
  }, [address])

  const handleConnect = async () => {
    setStep("connecting")
    setError(null)

    try {
      await connectWithMetamask() // triggers MetaMask popup
      // Success will be detected by useEffect
    } catch (err: any) {
      setError(err.message || "Connection failed. Please try again.")
      setStep("error")
    }
  }

  const handleClose = () => {
    setStep("info")
    setError(null)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-gradient-to-b from-purple-900/80 to-purple-950/80 border border-purple-500/30 backdrop-blur-xl">
        {step === "info" && (
          <>
            <DialogHeader>
              <DialogTitle className="text-cyan-300">Connect Your Wallet</DialogTitle>
              <DialogDescription className="text-gray-300 mt-2">
                Click continue to open MetaMask and connect your wallet.
              </DialogDescription>
            </DialogHeader>
            <div className="flex gap-3 mt-4">
              <Button variant="outline" onClick={handleClose} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleConnect} className="flex-1 gradient-accent">
                Continue to MetaMask
              </Button>
            </div>
          </>
        )}

        {step === "connecting" && (
          <div className="flex flex-col items-center justify-center py-8 gap-4">
            <Loader2 className="w-12 h-12 text-cyan-400 animate-spin" />
            <p className="font-semibold text-gray-200">Check your MetaMask</p>
            <p className="text-sm text-gray-400 mt-1">Look for the popup in your browser</p>
          </div>
        )}

        {step === "success" && (
          <div className="flex flex-col items-center justify-center py-8 gap-4">
            <CheckCircle2 className="w-16 h-16 text-green-400" />
            <p className="font-semibold text-gray-200">Wallet Connected Successfully!</p>
            <p className="text-sm text-gray-400 mt-1">{address?.slice(0, 6)}...{address?.slice(-4)}</p>
            <Button onClick={handleClose} className="mt-4 gradient-accent">
              Close
            </Button>
          </div>
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