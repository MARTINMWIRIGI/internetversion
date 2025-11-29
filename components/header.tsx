"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

// Add Ethereum type definitions
declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: any[] }) => Promise<any>
      on: (event: string, callback: (...args: any[]) => void) => void
      removeListener: (event: string, callback: (...args: any[]) => void) => void
    }
  }
}

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [address, setAddress] = useState<string | null>(null)

  useEffect(() => {
    // Check if wallet was previously connected
    const checkConnection = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({
            method: "eth_accounts"
          })
          if (accounts && accounts.length > 0) {
            setAddress(accounts[0])
          }
        } catch (error) {
          console.error("Error checking wallet connection:", error)
        }
      }
    }
    checkConnection()
  }, [])

  const handleConnectWallet = async () => {
    if (!address) {
      try {
        if (!window.ethereum) {
          alert("Please install MetaMask to continue")
          window.open("https://metamask.io/download/", "_blank")
          return
        }

        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts"
        })

        if (accounts && accounts.length > 0) {
          setAddress(accounts[0])
          
          // Switch to Polygon
          try {
            await window.ethereum.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: "0x89" }]
            })
          } catch (switchError: any) {
            if (switchError.code === 4902) {
              await window.ethereum.request({
                method: "wallet_addEthereumChain",
                params: [{
                  chainId: "0x89",
                  chainName: "Polygon Mainnet",
                  nativeCurrency: {
                    name: "MATIC",
                    symbol: "MATIC",
                    decimals: 18
                  },
                  rpcUrls: ["https://polygon-rpc.com/"],
                  blockExplorerUrls: ["https://polygonscan.com"]
                }]
              })
            }
          }
        }
      } catch (error) {
        console.error("Wallet connection failed:", error)
        alert("Failed to connect wallet")
      }
    } else {
      setAddress(null)
    }
  }

  const openSeaUrl = address ? `https://opensea.io/${address}` : "#"

  return (
    <header className="border-b border-purple-500/20 bg-gradient-to-b from-purple-900/30 to-transparent backdrop-blur-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 md:py-5 flex items-center justify-between gap-4">
        <Link href="/" className="hover:opacity-80 transition-opacity flex-shrink-0">
          <h1 className="text-xl md:text-2xl font-bold gradient-text">Soul Internet</h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 items-center flex-1 justify-center text-sm">
          <Link href="/gallery" className="text-gray-300 hover:text-cyan-400 transition-colors py-2 px-3 rounded-lg hover:bg-purple-500/10">
            Gallery
          </Link>
          <Link href="/wizard" className="text-gray-300 hover:text-cyan-400 transition-colors py-2 px-3 rounded-lg hover:bg-purple-500/10">
            Contribute
          </Link>
          {address && (
            <Link href={openSeaUrl} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-cyan-400 transition-colors py-2 px-3 rounded-lg hover:bg-purple-500/10">
              View NFTs on OpenSea
            </Link>
          )}
        </nav>

        {/* Desktop Right Actions */}
        <div className="hidden md:flex items-center gap-3">
          {address && (
            <Link href="/vault">
              <Button variant="ghost" className="text-cyan-400 hover:bg-cyan-500/10">
                My Vault
              </Button>
            </Link>
          )}
          <Button
            onClick={handleConnectWallet}
            className="gradient-accent text-white hover:shadow-lg hover:shadow-purple-500/50"
          >
            {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "Connect Wallet"}
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="text-cyan-400">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-gradient-to-b from-purple-900/40 to-purple-950/40 border-purple-500/20 backdrop-blur-xl w-80">
            <div className="space-y-6 mt-8 px-2">
              <nav className="space-y-2">
                <p className="text-xs text-purple-400 font-semibold px-4 mb-3">EXPLORE</p>
                <Link href="/gallery" className="block text-gray-300 hover:text-cyan-400 py-4 px-4 rounded-lg" onClick={() => setIsOpen(false)}>Gallery</Link>
                <Link href="/wizard" className="block text-gray-300 hover:text-cyan-400 py-4 px-4 rounded-lg" onClick={() => setIsOpen(false)}>Contribute</Link>
                {address && (
                  <Link href={openSeaUrl} target="_blank" rel="noopener noreferrer" className="block text-gray-300 hover:text-cyan-400 py-4 px-4 rounded-lg" onClick={() => setIsOpen(false)}>
                    View NFTs on OpenSea
                  </Link>
                )}
              </nav>

              <div className="pt-6 border-t border-purple-500/20 space-y-3">
                <p className="text-xs text-purple-400 font-semibold px-4">MY ACCOUNT</p>
                {address && (
                  <Link href="/vault" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 mb-2">My Vault</Button>
                  </Link>
                )}
                <Button
                  onClick={() => {
                    handleConnectWallet()
                    setIsOpen(false)
                  }}
                  className="w-full gradient-accent text-white hover:shadow-lg hover:shadow-purple-500/50"
                >
                  {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "Connect Wallet"}
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}