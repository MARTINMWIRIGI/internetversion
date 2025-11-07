"use client"
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, ChevronDown } from "lucide-react"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isExploreOpen, setIsExploreOpen] = useState(false)

  return (
    <header className="border-b border-purple-500/20 bg-gradient-to-b from-purple-900/30 to-transparent backdrop-blur-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 md:py-5 flex items-center justify-between gap-4">
        {/* Logo and Title */}
        <Link href="/" className="hover:opacity-80 transition-opacity flex-shrink-0">
          <div>
            <h1 className="text-xl md:text-2xl font-bold gradient-text">Soul Internet</h1>
            <p className="text-xs text-cyan-400/70">Unlock Your MultiSoul</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 items-center flex-1 justify-center text-sm">
          {/* Explore Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 text-gray-300 hover:text-cyan-400 transition-colors py-2 px-3 rounded-lg hover:bg-purple-500/10">
              Explore
              <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform" />
            </button>
            <div className="absolute left-0 mt-0 w-48 bg-gradient-to-br from-purple-900/90 to-purple-950/90 border border-purple-500/30 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 backdrop-blur-xl py-2">
              <Link
                href="/gallery"
                className="block px-4 py-2 text-gray-300 hover:text-cyan-400 hover:bg-purple-500/20 transition-colors"
              >
                Gallery
              </Link>
              <Link
                href="/wizard"
                className="block px-4 py-2 text-gray-300 hover:text-cyan-400 hover:bg-purple-500/20 transition-colors"
              >
                Contribute
              </Link>
              <Link
                href="/docs"
                className="block px-4 py-2 text-gray-300 hover:text-cyan-400 hover:bg-purple-500/20 transition-colors"
              >
                Learn
              </Link>
              <a
                href="https://opensea.io"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 text-gray-300 hover:text-cyan-400 hover:bg-purple-500/20 transition-colors"
              >
                View NFTs on OpenSea
              </a>
            </div>
          </div>
        </nav>

        {/* Desktop Right Actions */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/vault">
            <Button variant="ghost" className="text-cyan-400 hover:bg-cyan-500/10">
              My Vault
            </Button>
          </Link>
          <Link href="/auth">
            <Button className="gradient-accent text-white hover:shadow-lg hover:shadow-purple-500/50 pulse-glow">
              Connect Wallet
            </Button>
          </Link>
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
                <Link
                  href="/gallery"
                  className="block text-gray-300 hover:text-cyan-400 transition-colors py-4 px-4 rounded-lg hover:bg-purple-500/10"
                  onClick={() => setIsOpen(false)}
                >
                  Gallery
                </Link>
                <Link
                  href="/wizard"
                  className="block text-gray-300 hover:text-cyan-400 transition-colors py-4 px-4 rounded-lg hover:bg-purple-500/10"
                  onClick={() => setIsOpen(false)}
                >
                  Contribute
                </Link>
                <Link
                  href="/docs"
                  className="block text-gray-300 hover:text-cyan-400 transition-colors py-4 px-4 rounded-lg hover:bg-purple-500/10"
                  onClick={() => setIsOpen(false)}
                >
                  Learn
                </Link>
                <a
                  href="https://opensea.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-gray-300 hover:text-cyan-400 transition-colors py-4 px-4 rounded-lg hover:bg-purple-500/10"
                  onClick={() => setIsOpen(false)}
                >
                  View NFTs on OpenSea
                </a>
              </nav>

              <div className="pt-6 border-t border-purple-500/20 space-y-3">
                <p className="text-xs text-purple-400 font-semibold px-4">MY ACCOUNT</p>
                <Link href="/vault" onClick={() => setIsOpen(false)} className="block w-full px-3">
                  <Button
                    variant="outline"
                    className="w-full border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 bg-transparent mb-2"
                  >
                    My Vault
                  </Button>
                </Link>
                <Link href="/auth" onClick={() => setIsOpen(false)} className="block w-full px-3">
                  <Button className="w-full gradient-accent text-white hover:shadow-lg hover:shadow-purple-500/50">
                    Connect Wallet
                  </Button>
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
