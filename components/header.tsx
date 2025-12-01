"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, ExternalLink } from "lucide-react"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [address, setAddress] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)

  // Check if MetaMask is installed
  const [hasMetaMask, setHasMetaMask] = useState(false)

  useEffect(() => {
    // Check for MetaMask
    if (typeof window !== 'undefined') {
      setHasMetaMask(!!window.ethereum && window.ethereum.isMetaMask)
      
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
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x89" }] // Polygon Mainnet
      })
      return true
    } catch (switchError: any) {
      // This error code indicates that the chain has not been added to MetaMask
      if (switchError.code === 4902) {
        try {
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

  const handleConnectWallet = async () => {
    if (!address) {
      setIsConnecting(true)
      
      try {
        // Check if MetaMask is installed
        if (typeof window === 'undefined' || !window.ethereum) {
          alert("MetaMask is not installed. Please install MetaMask to continue.")
          window.open("https://metamask.io/download/", "_blank")
          setIsConnecting(false)
          return
        }

        // 1. Request account access (popup appears here)
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts"
        })

        if (accounts && accounts.length > 0) {
          setAddress(accounts[0])
          
          // 2. AUTO switch to Polygon Mainnet
          const switched = await switchToPolygon()
          if (!switched) {
            alert("Connected! Please manually switch to Polygon Mainnet in MetaMask.")
          }
        }
      } catch (error: any) {
        console.error("Wallet connection failed:", error)
        
        // User rejected the request
        if (error.code === 4001) {
          alert("Connection rejected. Please approve the connection request in MetaMask.")
        } else {
          alert("Failed to connect wallet. Please try again.")
        }
      } finally {
        setIsConnecting(false)
      }
    } else {
      // Disconnect
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
        <nav className="hidden md:flex gap-6 items-center flex-1 justify-center text-sm">
          <Link href="/gallery" className="text-gray-300 hover:text-cyan-400 transition-colors py-2 px-3 rounded-lg hover:bg-purple-500/10">
            Gallery
          </Link>
          <Link href="/wizard" className="text-gray-300 hover:text-cyan-400 transition-colors py-2 px-3 rounded-lg hover:bg-purple-500/10">
            Contribute
          </Link>
          {/* VAULT LINK - FOR ALL USERS */}
          <Link href="/vault" className="bg-gradient-to-r from-purple-600/20 to-cyan-500/20 text-white border border-purple-500/30 hover:border-cyan-500/60 transition-colors py-2 px-4 rounded-lg flex items-center gap-2">
            <span>🏦</span>
            <span>Vault</span>
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
          
          {/* MetaMask Connect Button */}
          <Button
            onClick={handleConnectWallet}
            disabled={isConnecting || !hasMetaMask}
            className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white hover:shadow-lg hover:shadow-orange-500/50 disabled:opacity-50 flex items-center gap-2"
          >
            {!hasMetaMask ? (
              <>
                <ExternalLink className="w-4 h-4" />
                Install MetaMask
              </>
            ) : isConnecting ? (
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
                  <path d="M36.011 1.32408L22.1887 12.1118L24.7553 6.09119L36.011 1.32408Z" fill="#E2761B" stroke="#E2761B" strokeWidth="0.0882382"/>
                  <path d="M4.00024 1.32408L17.699 12.1854L15.2449 6.09119L4.00024 1.32408Z" fill="#E4761B" stroke="#E4761B" strokeWidth="0.0882382"/>
                  <path d="M31.2632 26.2844L27.1843 32.3472L34.9626 34.9585L37.5187 26.3872L31.2632 26.2844Z" fill="#E4761B" stroke="#E4761B" strokeWidth="0.0882382"/>
                  <path d="M2.49243 26.3872L5.03735 34.9585L12.8157 32.3472L8.74802 26.2844L2.49243 26.3872Z" fill="#E4761B" stroke="#E4761B" strokeWidth="0.0882382"/>
                  <path d="M12.4025 16.5737L10.4282 19.9693L17.8572 20.3068L17.5665 12.0938L12.4025 16.5737Z" fill="#E4761B" stroke="#E4761B" strokeWidth="0.0882382"/>
                  <path d="M27.6087 16.5737L22.3331 12.0166L22.1887 20.3068L29.583 19.9693L27.6087 16.5737Z" fill="#E4761B" stroke="#E4761B" strokeWidth="0.0882382"/>
                  <path d="M12.8157 32.3472L17.4384 30.1747L13.4281 26.4941L12.8157 32.3472Z" fill="#E4761B" stroke="#E4761B" strokeWidth="0.0882382"/>
                  <path d="M22.5728 30.1747L27.1843 32.3472L26.5831 26.4941L22.5728 30.1747Z" fill="#E4761B" stroke="#E4761B" strokeWidth="0.0882382"/>
                  <path d="M27.1843 32.3472L22.5728 30.1747L22.9666 33.2516L22.9443 34.8522L27.1843 32.3472Z" fill="#D7C1B3" stroke="#D7C1B3" strokeWidth="0.0882382"/>
                  <path d="M12.8157 32.3472L17.067 34.8522L17.0558 33.2516L17.4384 30.1747L12.8157 32.3472Z" fill="#D7C1B3" stroke="#D7C1B3" strokeWidth="0.0882382"/>
                  <path d="M17.125 24.7061L13.2539 23.542L16.0807 22.0879L17.125 24.7061Z" fill="#233447" stroke="#233447" strokeWidth="0.0882382"/>
                  <path d="M22.8862 24.7061L23.9305 22.0879L26.7685 23.542L22.8862 24.7061Z" fill="#233447" stroke="#233447" strokeWidth="0.0882382"/>
                  <path d="M12.8157 32.3472L13.4502 26.2844L8.74802 26.3872L12.8157 32.3472Z" fill="#CD6116" stroke="#CD6116" strokeWidth="0.0882382"/>
                  <path d="M26.5611 26.2844L27.1843 32.3472L31.2632 26.3872L26.5611 26.2844Z" fill="#CD6116" stroke="#CD6116" strokeWidth="0.0882382"/>
                  <path d="M29.583 19.9693L22.1887 20.3068L22.8863 24.7061L23.9306 22.0879L26.7686 23.542L29.583 19.9693Z" fill="#CD6116" stroke="#CD6116" strokeWidth="0.0882382"/>
                  <path d="M13.2539 23.542L16.0807 22.0879L17.1251 24.7061L17.8572 20.3068L10.4282 19.9693L13.2539 23.542Z" fill="#CD6116" stroke="#CD6116" strokeWidth="0.0882382"/>
                  <path d="M10.4282 19.9693L13.4281 26.4941L13.2539 23.542L10.4282 19.9693Z" fill="#E4751F" stroke="#E4751F" strokeWidth="0.0882382"/>
                  <path d="M26.7686 23.542L26.5831 26.4941L29.583 19.9693L26.7686 23.542Z" fill="#E4751F" stroke="#E4751F" strokeWidth="0.0882382"/>
                  <path d="M17.8572 20.3068L17.1251 24.7061L18.0506 29.1343L18.2737 22.8632L17.8572 20.3068Z" fill="#E4751F" stroke="#E4751F" strokeWidth="0.0882382"/>
                  <path d="M22.1887 20.3068L21.7833 22.8523L21.9606 29.1343L22.8863 24.7061L22.1887 20.3068Z" fill="#E4751F" stroke="#E4751F" strokeWidth="0.0882382"/>
                  <path d="M22.8863 24.7061L21.9606 29.1343L22.5728 30.1747L26.5831 26.4941L26.7686 23.542L22.8863 24.7061Z" fill="#F6851B" stroke="#F6851B" strokeWidth="0.0882382"/>
                  <path d="M13.2539 23.542L13.4281 26.4941L17.4384 30.1747L18.0506 29.1343L17.1251 24.7061L13.2539 23.542Z" fill="#F6851B" stroke="#F6851B" strokeWidth="0.0882382"/>
                  <path d="M22.9443 34.8522L22.9666 33.2516L22.5941 32.9585H17.4171L17.0558 33.2516L17.067 34.8522L12.8157 32.3472L14.5958 33.8425L17.3848 36H22.6264L25.4266 33.8425L27.1843 32.3472L22.9443 34.8522Z" fill="#C0AD9E" stroke="#C0AD9E" strokeWidth="0.0882382"/>
                  <path d="M22.5728 30.1747L21.9606 29.1343H18.0506L17.4384 30.1747L17.0558 33.2516L17.4171 32.9585H22.5941L22.9666 33.2516L22.5728 30.1747Z" fill="#161616" stroke="#161616" strokeWidth="0.0882382"/>
                  <path d="M36.5896 12.5737L37.9999 6.09119L36.011 1.32408L22.5728 11.6836L27.6087 16.5737L34.4089 18.8847L36.6555 16.7516L35.8393 16.1295L37.0445 15.0841L36.0807 14.3519L37.2859 13.4844L36.5896 12.5737Z" fill="#763D16" stroke="#763D16" strokeWidth="0.0882382"/>
                  <path d="M2.00001 6.09119L3.42249 12.5737L2.71502 13.4844L3.92021 14.3519L2.96757 15.0841L4.17276 16.1295L3.35657 16.7516L5.592 18.8847L12.4025 16.5737L17.4384 11.6836L4.00021 1.32408L2.00001 6.09119Z" fill="#763D16" stroke="#763D16" strokeWidth="0.0882382"/>
                  <path d="M34.4089 18.8847L27.6087 16.5737L29.583 19.9693L26.5831 26.4941L31.2632 26.3872H37.5187L34.4089 18.8847Z" fill="#F6851B" stroke="#F6851B" strokeWidth="0.0882382"/>
                  <path d="M12.4025 16.5737L5.592 18.8847L2.49243 26.3872H8.74802L13.4281 26.4941L10.4282 19.9693L12.4025 16.5737Z" fill="#F6851B" stroke="#F6851B" strokeWidth="0.0882382"/>
                  <path d="M22.1887 20.3068L22.5728 11.6836L24.7553 6.09119H15.2449L17.4384 11.6836L17.8572 20.3068L18.0394 22.8745L18.0506 29.1343H21.9606L21.983 22.8745L22.1887 20.3068Z" fill="#F6851B" stroke="#F6851B" strokeWidth="0.0882382"/>
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
                <Link href="/gallery" className="block text-gray-300 hover:text-cyan-400 py-4 px-4 rounded-lg" onClick={() => setIsOpen(false)}>Gallery</Link>
                <Link href="/wizard" className="block text-gray-300 hover:text-cyan-400 py-4 px-4 rounded-lg" onClick={() => setIsOpen(false)}>Contribute</Link>
                {/* VAULT LINK - FOR ALL USERS */}
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
                <p className="text-xs text-purple-400 font-semibold px-4">MY ACCOUNT</p>
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
                      Disconnect
                    </Button>
                  </>
                )}
                
                {/* Mobile MetaMask Button */}
                <Button
                  onClick={() => {
                    handleConnectWallet()
                    setIsOpen(false)
                  }}
                  disabled={isConnecting || !hasMetaMask}
                  className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white hover:shadow-lg hover:shadow-orange-500/50 disabled:opacity-50"
                >
                  {!hasMetaMask ? (
                    "Install MetaMask"
                  ) : isConnecting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Connecting...
                    </>
                  ) : address ? (
                    `${address.slice(0, 4)}...${address.slice(-4)}`
                  ) : (
                    "Connect MetaMask"
                  )}
                </Button>
                
                {!hasMetaMask && (
                  <Button
                    onClick={() => window.open("https://metamask.io/download/", "_blank")}
                    variant="outline"
                    className="w-full border-orange-500/50 text-orange-400 hover:bg-orange-500/10"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Download MetaMask
                  </Button>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}