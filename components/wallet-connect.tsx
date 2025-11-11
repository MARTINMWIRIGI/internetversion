"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Wallet } from "lucide-react"

interface WalletConnectProps {
  onConnect: (address: string) => void
  onDisconnect: () => void
}

export function WalletConnect({ onConnect, onDisconnect }: WalletConnectProps) {
  const [address, setAddress] = useState<string>("")
  const [isConnecting, setIsConnecting] = useState(false)

  useEffect(() => {
    checkConnectedWallet()
    window.ethereum?.on("accountsChanged", handleAccountChange)
    return () => window.ethereum?.removeListener("accountsChanged", handleAccountChange)
  }, [])

  async function checkConnectedWallet() {
    if (!window.ethereum) return
    try {
      const accounts = await window.ethereum.request({ method: "eth_accounts" })
      if (accounts.length > 0) {
        setAddress(accounts[0])
        onConnect(accounts[0])
      }
    } catch (error) {
      console.error("Error checking wallet:", error)
    }
  }

  function handleAccountChange(accounts: string[]) {
    if (accounts.length === 0) {
      setAddress("")
      onDisconnect()
    } else if (accounts[0] !== address) {
      setAddress(accounts[0])
      onConnect(accounts[0])
    }
  }

  async function connectWallet() {
    if (!window.ethereum) {
      alert("Please install MetaMask")
      return
    }

    setIsConnecting(true)
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
      setAddress(accounts[0])
      onConnect(accounts[0])
    } catch (error) {
      console.error("Error connecting wallet:", error)
    } finally {
      setIsConnecting(false)
    }
  }

  function disconnectWallet() {
    setAddress("")
    onDisconnect()
  }

  if (address) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">
          {address.slice(0, 6)}...{address.slice(-4)}
        </span>
        <Button variant="ghost" size="sm" onClick={disconnectWallet}>
          Disconnect
        </Button>
      </div>
    )
  }

  return (
    <Button onClick={connectWallet} disabled={isConnecting} className="gap-2">
      <Wallet className="w-4 h-4" />
      {isConnecting ? "Connecting..." : "Connect Wallet"}
    </Button>
  )
}
