"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { connectWallet, formatAddress } from "@/lib/wallet"

export function WalletConnectButton() {
  const [address, setAddress] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleConnect = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const connectedAddress = await connectWallet()
      setAddress(connectedAddress)
    } catch (err: any) {
      setError(err.message || "Failed to connect wallet")
      console.error("Wallet connection failed:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDisconnect = () => {
    setAddress(null)
    setError(null)
  }

  if (address) {
    return (
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-50 border border-green-200">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm font-medium text-green-700">{formatAddress(address)}</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDisconnect}
          className="text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          Disconnect
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      <Button
        onClick={handleConnect}
        disabled={isLoading}
        className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold shadow-md"
        size="sm"
      >
        {isLoading ? "Connecting..." : "Connect Wallet"}
      </Button>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  )
}
