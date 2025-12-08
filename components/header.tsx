"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, ExternalLink, Smartphone, Globe } from "lucide-react"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [address, setAddress] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [hasMetaMask, setHasMetaMask] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if mobile
    if (typeof window !== 'undefined') {
      setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent))
      
      // Check for MetaMask
      const hasMM = !!(window.ethereum && window.ethereum.isMetaMask)
      setHasMetaMask(hasMM)
      
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
    }
  }, [])

  // Function to switch or add Polygon network
  const switchToPolygon = async () => {
    try {
      await window.ethereum!.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x89" }] // Polygon Mainnet
      })
      return true
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        try {
          await window.ethereum!.request({
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
          return true
        } catch (addError) {
          console.error("Failed to add Polygon network:", addError)
          return false
        }
      } else {
        console.error("Failed to switch to Polygon:", switchError)
        return false
      }
    }
  }

  // MOBILE: Deep link to MetaMask app
  const connectMobileMetaMask = () => {
    // MetaMask mobile deep link
    const dappUrl = window.location.href
    const metamaskAppDeepLink = `https://metamask.app.link/dapp/${encodeURIComponent(dappUrl)}`
    
    // Open MetaMask app
    window.open(metamaskAppDeepLink, '_blank')
    
    // Also try universal link
    window.location.href = `https://metamask.app.link/dapp/${dappUrl.replace('https://', '')}`
  }

  // DESKTOP: Normal MetaMask connection
  const connectDesktopMetaMask = async () => {
    setIsConnecting(true)
    
    try {
      if (!window.ethereum) {
        window.open("https://metamask.io/download/", "_blank")
        return
      }

      // Request account access (POPUP APPEARS HERE)
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts"
      })

      if (accounts && accounts.length > 0) {
        setAddress(accounts[0])
        
        // Auto switch to Polygon
        const switched = await switchToPolygon()
        if (!switched) {
          alert("Connected! Please switch to Polygon Mainnet in MetaMask.")
        }
      }
    } catch (error: any) {
      if (error.code === 4001) {
        alert("Connection rejected. Please approve in MetaMask.")
      } else {
        alert("Failed to connect. Please try again.")
      }
    } finally {
      setIsConnecting(false)
    }
  }

  // Unified connect function
  const handleConnectWallet = () => {
    if (address) {
      setAddress(null) // Disconnect
      return
    }

    // Check if MetaMask is available
    if (hasMetaMask) {
      // MetaMask is installed - use appropriate method
      if (isMobile) {
        // On mobile with MetaMask installed
        if (window.ethereum && window.ethereum.isMetaMask) {
          // In MetaMask browser - use normal connection
          connectDesktopMetaMask()
        } else {
          // Regular mobile browser - deep link to app
          connectMobileMetaMask()
        }
      } else {
        // Desktop - normal connection
        connectDesktopMetaMask()
      }
    } else {
      // No MetaMask installed
      if (isMobile) {
        // Mobile without MetaMask
        const confirmInstall = confirm("MetaMask is not installed. Would you like to install it?")
        if (confirmInstall) {
          if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
            window.open("https://apps.apple.com/us/app/metamask-blockchain-wallet/id1438144202", "_blank")
          } else {
            window.open("https://play.google.com/store/apps/details?id=io.metamask", "_blank")
          }
        }
      } else {
        // Desktop without MetaMask
        alert("Please install MetaMask to continue.")
        window.open("https://metamask.io/download/", "_blank")
      }
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
        <nav className="hidden md:flex gap-6 items-center flex-1 justify-center text-sm">

 <Link href="/about" className="text-gray-300 hover:text-cyan-400 transition-colors py-2 px-3 rounded-lg hover:bg-purple-500/10">
  About Us
</Link>


          <Link href="/wizard" className="text-gray-300 hover:text-cyan-400 transition-colors py-2 px-3 rounded-lg hover:bg-purple-500/10">
            Contribute
          </Link>
          {/* VAULT LINK */}
          <Link href="/vault" className="bg-gradient-to-r from-purple-600/20 to-cyan-500/20 text-white border border-purple-500/30 hover:border-cyan-500/60 transition-colors py-2 px-4 rounded-lg flex items-center gap-2">
            <span>🏦</span>
            <span>Explore Vault</span>
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
          
          {/* Desktop Connect Button */}
          <Button
            onClick={handleConnectWallet}
            disabled={isConnecting}
            className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white hover:shadow-lg hover:shadow-orange-500/50 disabled:opacity-50 flex items-center gap-2"
          >
            {isConnecting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Connecting...
              </>
            ) : address ? (
              <>
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                {`${address.slice(0, 6)}...${address.slice(-4)}`}
              </>
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 40 37" fill="none">
                  {/* MetaMask SVG - same as before */}
                  <path d="M36.011 1.32408L22.1887 12.1118L24.7553 6.09119L36.011 1.32408Z" fill="#E2761B"/>
                  {/* ... rest of MetaMask logo */}
                </svg>
                Connect MetaMask
              </>
            )}
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
          
 <Link href="/about" className="text-gray-300 hover:text-cyan-400 transition-colors py-2 px-3 rounded-lg hover:bg-purple-500/10">
  About Us
</Link>

                <Link href="/wizard" className="block text-gray-300 hover:text-cyan-400 py-4 px-4 rounded-lg" onClick={() => setIsOpen(false)}>Contribute</Link>
                <Link href="/vault" className="block text-gray-300 hover:text-cyan-400 py-4 px-4 rounded-lg bg-gradient-to-r from-purple-600/10 to-cyan-500/10 border border-purple-500/20" onClick={() => setIsOpen(false)}>
                  <div className="flex items-center gap-2">
                    <span>🏦</span>
                    <span>Vault</span>
                  </div>
                </Link>
                {address && (
                  <Link href={openSeaUrl} target="_blank" rel="noopener noreferrer" className="block text-gray-300 hover:text-cyan-400 py-4 px-4 rounded-lg" onClick={() => setIsOpen(false)}>
                    View NFTs on OpenSea
                  </Link>
                )}
              </nav>

              <div className="pt-6 border-t border-purple-500/20 space-y-3">
                <p className="text-xs text-purple-400 font-semibold px-4">CONNECT WALLET</p>
                
                {address && (
                  <>
                    <Link href="/vault" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 mb-2">My Vault</Button>
                    </Link>
                    <Button
                      onClick={() => {
                        setAddress(null)
                        setIsOpen(false)
                      }}
                      className="w-full bg-gradient-to-r from-red-600/20 to-red-500/20 text-red-300 border border-red-500/30 hover:border-red-600"
                    >
                      Disconnect Wallet
                    </Button>
                  </>
                )}
                
                {/* MOBILE CONNECT OPTIONS */}
                {!address && (
                  <>
                    {/* Option 1: MetaMask Browser */}
                    <Button
                      onClick={() => {
                        handleConnectWallet()
                        setIsOpen(false)
                      }}
                      disabled={isConnecting}
                      className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white hover:shadow-lg hover:shadow-orange-500/50 disabled:opacity-50 mb-2"
                    >
                      {isConnecting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Connecting...
                        </>
                      ) : (
                        <>
                          <Globe className="w-4 h-4 mr-2" />
                          Connect in Browser
                        </>
                      )}
                    </Button>
                    
                    {/* Option 2: MetaMask App (Mobile only) */}
                    {isMobile && (
                      <Button
                        onClick={() => {
                          connectMobileMetaMask()
                          setIsOpen(false)
                        }}
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white border border-purple-500/30"
                      >
                        <Smartphone className="w-4 h-4 mr-2" />
                        Open in MetaMask App
                      </Button>
                    )}
                    
                    {/* Install MetaMask if not installed */}
                    {!hasMetaMask && (
                      <div className="space-y-2 mt-3">
                        <p className="text-xs text-gray-400 text-center">Don't have MetaMask?</p>
                        <Button
                          onClick={() => window.open("https://metamask.io/download/", "_blank")}
                          variant="outline"
                          className="w-full border-orange-500/50 text-orange-400 hover:bg-orange-500/10"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Install MetaMask
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}