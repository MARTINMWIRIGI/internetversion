"use client"

import { Button } from "@/components/ui/button"
import { useMetamask, useDisconnect, useAddress } from "@thirdweb-dev/react"

export function WalletConnectButton() {
  const connectWithMetamask = useMetamask()
  const disconnect = useDisconnect()
  const address = useAddress()

  return (
    <div className="flex flex-col gap-2">
      {address ? (
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-50 border border-green-200">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-green-700">{address.slice(0, 6)}...{address.slice(-4)}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={disconnect}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            Disconnect
          </Button>
        </div>
      ) : (
        <Button
          onClick={connectWithMetamask}
          className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold shadow-md"
          size="sm"
        >
          Connect Wallet
        </Button>
      )}
    </div>
  )
}