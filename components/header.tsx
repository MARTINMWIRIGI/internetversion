"use client"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="border-b border-purple-500/20 bg-gradient-to-b from-purple-900/30 to-transparent backdrop-blur-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 md:py-5 flex items-center justify-between gap-4">
        {/* Logo and Title */}
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity group flex-shrink-0">
          <div className="w-10 h-10 md:w-12 md:h-12 relative group-hover:scale-105 transition-transform">
            <Image src="/logo.png" alt="Soul Internet Logo" width={48} height={48} className="rounded-lg" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-base md:text-lg font-bold gradient-text">Soul Internet</h1>
            <p className="text-xs text-cyan-400/70">Unlock Your MultiSoul</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 items-center flex-1 justify-center text-sm">
          <Link href="/gallery" className="text-gray-300 hover:text-cyan-400 transition-colors">
            Gallery
          </Link>
          <Link href="/contribute" className="text-gray-300 hover:text-cyan-400 transition-colors">
            Contribute
          </Link>
          <Link href="/docs" className="text-gray-300 hover:text-cyan-400 transition-colors">
            Learn
          </Link>
        </nav>

        {/* Desktop Right Actions */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/vault">
            <Button variant="ghost" className="text-cyan-400 hover:bg-cyan-500/10">
              My Vault
            </Button>
          </Link>
          <Link href="/auth">
            <Button className="gradient-accent text-white hover:shadow-lg hover:shadow-purple-500/50">
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
                <Link
                  href="/gallery"
                  className="block text-gray-300 hover:text-cyan-400 transition-colors py-4 px-4 rounded-lg hover:bg-purple-500/10"
                  onClick={() => setIsOpen(false)}
                >
                  Gallery
                </Link>
                <Link
                  href="/contribute"
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
                <Link
                  href="/vault"
                  className="block text-gray-300 hover:text-cyan-400 transition-colors py-4 px-4 rounded-lg hover:bg-purple-500/10"
                  onClick={() => setIsOpen(false)}
                >
                  My Vault
                </Link>
              </nav>

              <div className="pt-6 border-t border-purple-500/20 space-y-3">
                <p className="text-xs text-purple-400 font-semibold px-4">CONNECT & AUTHENTICATE</p>
                <Link href="/auth" onClick={() => setIsOpen(false)} className="block w-full px-3">
                  <Button className="w-full gradient-accent text-white mb-2 hover:shadow-lg hover:shadow-purple-500/50">
                    Connect Wallet
                  </Button>
                </Link>
                <Link href="/auth" onClick={() => setIsOpen(false)} className="block w-full px-3">
                  <Button
                    variant="outline"
                    className="w-full border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 bg-transparent"
                  >
                    Sign In
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
