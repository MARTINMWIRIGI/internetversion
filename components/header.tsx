"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, ChevronDown } from "lucide-react"
import { useMetamask, useDisconnect, useAddress } from "@thirdweb-dev/react"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  // Thirdweb wallet hooks
  const connectWithMetamask = useMetamask()
  const disconnect = useDisconnect()
  const address = useAddress()

  // Automatically connect wallet on mount if already authorized
  useEffect(() => {
    if (!address) connectWithMetamask().catch(() => {})
  }, [])

  const handleConnectWallet = async () => {
    if (!address) {
      try {
        await connectWithMetamask()
      } catch (error) {
        console.error("Wallet connection failed:", error)
        alert("Failed to connect MetaMask.")
      }
    } else {
      disconnect()
    }
  }

  // OpenSea link for the connected wallet or general collection
  const getOpenSeaLink = () => {
    const collectionSlug = "soul-internet"
    if (address) {
      return `https://opensea.io/${address}?search[collections][0]=${collectionSlug}`
    }
    return `https://opensea.io/collection/${collectionSlug}`
  }

  return (
    <>
      <header className="border-b border-purple-500/20 bg-gradient-to-b from-purple-900/30 to-transparent backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 md:py-5 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="hover:opacity-80 transition-opacity flex-shrink-0">
            <div>
              <h1 className="text-xl md:text-2xl font-bold gradient-text">Soul Internet</h1>
              <p className="text-xs text-cyan-400/70">Unlock Your MultiSoul</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8 items-center flex-1 justify-center text-sm">
            <Link
              href="/gallery"
              className="text-gray-300 hover:text-cyan-400 transition-colors py-2 px-3 rounded-lg hover:bg-purple-500/10"
            >
              Gallery
            </Link>

            <Link
              href="/wizard"
              className="text-gray-300 hover:text-cyan-400 transition-colors py-2 px-3 rounded-lg hover:bg-purple-500/10"
            >
              Contribute
            </Link>

            <Link
              href="/docs"
              className="text-gray-300 hover:text-cyan-400 transition-colors py-2 px-3 rounded-lg hover:bg-purple-500/10"
            >
              Learn
            </Link>

            <a
              href={getOpenSeaLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-cyan-400 transition-colors py-2 px-3 rounded-lg hover:bg-purple-500/10"
            >
              View NFTs on OpenSea
            </a>
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link href={address ? `/vault?wallet=${address}` : "/vault"}>
              <Button variant="ghost" className="text-cyan-400 hover:bg-cyan-500/10">
                My Vault
              </Button>
            </Link>

            <Button
              onClick={handleConnectWallet}
              className="gradient-accent text-white hover:shadow-lg hover:shadow-purple-500/50 pulse-glow"
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
            <SheetContent
              side="right"
              className="bg-gradient-to-b from-purple-900/40 to-purple-950/40 border-purple-500/20 backdrop-blur-xl w-80"
            >
              <div className="space-y-6 mt-8 px-2">
                <nav className="space-y-2">
                  <p className="text-xs text-purple-400 font-semibold px-4 mb-3">EXPLORE</p>
                  <Link href="/gallery" className="block text-gray-300 hover:text-cyan-400 py-4 px-4 rounded-lg hover:bg-purple-500/10" onClick={() => setIsOpen(false)}>Gallery</Link>
                  <Link href="/wizard" className="block text-gray-300 hover:text-cyan-400 py-4 px-4 rounded-lg hover:bg-purple-500/10" onClick={() => setIsOpen(false)}>Contribute</Link>
                  <Link href="/docs" className="block text-gray-300 hover:text-cyan-400 py-4 px-4 rounded-lg hover:bg-purple-500/10" onClick={() => setIsOpen(false)}>Learn</Link>
                  <a href={getOpenSeaLink()} target="_blank" rel="noopener noreferrer" className="block text-gray-300 hover:text-cyan-400 py-4 px-4 rounded-lg hover:bg-purple-500/10" onClick={() => setIsOpen(false)}>View NFTs on OpenSea</a>
                </nav>

                <div className="pt-6 border-t border-purple-500/20 space-y-3">
                  <p className="text-xs text-purple-400 font-semibold px-4">MY ACCOUNT</p>
                  <Link href={address ? `/vault?wallet=${address}` : "/vault"} onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 bg-transparent mb-2">My Vault</Button>
                  </Link>
                  <div className="px-3 w-full">
                    <Button
                      onClick={() => { handleConnectWallet(); setIsOpen(false) }}
                      className="w-full gradient-accent text-white hover:shadow-lg hover:shadow-purple-500/50"
                    >
                      {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "Connect Wallet"}
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </>
  )
}