"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { ConnectButton } from '@rainbow-me/rainbowkit'
import {
  Menu,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const closeMenus = () => {
    setMobileMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-purple-400/15 bg-[#0a0e27]/80 backdrop-blur-xl">
      <div className="mx-auto flex min-h-[4.5rem] max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex flex-shrink-0 items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/80"
          aria-label="Soul Internet home"
          onClick={closeMenus}
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-cyan-400 text-[10px] font-bold text-[#0a0e27] shadow-lg shadow-cyan-500/20">
            SI
          </span>
          <span className="gradient-text text-lg font-bold tracking-tight sm:text-xl">Soul Internet</span>
        </Link>

        <nav
          aria-label="Primary navigation"
          className="hidden flex-1 items-center justify-center gap-4 lg:flex"
        >
          <Link
            href="/"
            className={`rounded-lg px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/80 ${
              pathname === "/"
                ? "bg-white/[0.06] text-white"
                : "text-gray-300 hover:bg-white/[0.04] hover:text-cyan-300"
            }`}
            onClick={closeMenus}
          >
            Home
          </Link>
          <Link
            href="/wizard"
            className={`rounded-lg px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/80 ${
              pathname === "/wizard"
                ? "bg-white/[0.06] text-white"
                : "text-gray-300 hover:bg-white/[0.04] hover:text-cyan-300"
            }`}
            onClick={closeMenus}
          >
            Mint NFT
          </Link>
        </nav>

        <div className="ml-auto hidden items-center lg:flex">
          <ConnectButton />
        </div>

        <div className="lg:hidden">
          <Sheet
            open={mobileMenuOpen}
            onOpenChange={(open) => {
              setMobileMenuOpen(open)
            }}
          >
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="gap-2 rounded-lg px-3 text-cyan-300 hover:bg-white/[0.06] hover:text-white"
                aria-label="Open navigation menu"
              >
                <Menu className="h-5 w-5" aria-hidden="true" />
                <span className="text-sm font-medium">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[min(88vw,24rem)] border-purple-400/20 bg-[#0b1030]/[.98] p-0 text-white backdrop-blur-2xl"
            >
              <SheetTitle className="sr-only">Soul Internet navigation</SheetTitle>
              <SheetDescription className="sr-only">
                Navigate Soul Internet and connect your wallet.
              </SheetDescription>

              <div className="flex h-full flex-col overflow-y-auto p-6">
                <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-5">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300/70">Menu</p>
                    <p className="mt-1 text-lg font-semibold text-white">Soul Internet</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/80"
                    aria-label="Close navigation menu"
                  >
                    <X className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>

                <nav aria-label="Mobile navigation" className="space-y-4">
                  <Link
                    href="/"
                    onClick={closeMenus}
                    className="block rounded-xl px-4 py-3 text-base font-medium text-white transition-colors hover:bg-white/[0.06]"
                  >
                    Home
                  </Link>
                  <Link
                    href="/wizard"
                    onClick={closeMenus}
                    className="block rounded-xl px-4 py-3 text-base font-medium text-white transition-colors hover:bg-white/[0.06]"
                  >
                    Mint NFT
                  </Link>
                  <div className="px-4 py-3">
                    <ConnectButton />
                  </div>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}