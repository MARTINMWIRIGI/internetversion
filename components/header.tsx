"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import {
  ArrowUpRight,
  ChevronDown,
  ExternalLink,
  Menu,
  Smartphone,
  Wallet,
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
import { connectWallet, formatAddress } from "@/lib/wallet"

type MenuKey = "overview" | "documents" | "products"

type NavigationItem = {
  label: string
  href: string
  description?: string
  external?: boolean
}

const overviewItems: NavigationItem[] = [
  {
    label: "Our Mission",
    href: "/about#mission",
    description: "Build a permissionless network for human connection.",
  },
  {
    label: "Our Vision",
    href: "/about#vision",
    description: "Connect consciousness and preserve human understanding.",
  },
  {
    label: "Our Goal",
    href: "/#goal",
    description: "Make culture, identity, and memory last beyond one lifetime.",
  },
  {
    label: "Vaults",
    href: "/vault",
    description: "Explore the multi-layer identity preservation system.",
  },
  {
    label: "OpenSea",
    href: "https://opensea.io",
    description: "Browse Soul Internet NFTs on the open marketplace.",
    external: true,
  },
]

const documentItems: NavigationItem[] = [
  {
    label: "Whitepaper",
    href: "/whitepaper",
    description: "Read the technical protocol and cultural thesis.",
  },
  {
    label: "Tokenomics",
    href: "/whitepaper?section=tokenomics",
    description: "Review the MILSA token economy.",
  },
  {
    label: "Roadmap",
    href: "/whitepaper?section=roadmap",
    description: "Follow the protocol development timeline.",
  },
]

const productItems: NavigationItem[] = [
  {
    label: "OpenSea",
    href: "https://opensea.io",
    description: "View collectibles and marketplace activity.",
    external: true,
  },
  {
    label: "Minting",
    href: "/wizard",
    description: "Contribute language and create an NFT.",
  },
  {
    label: "NFTs",
    href: "/gallery",
    description: "Explore the community language NFT gallery.",
  },
]

const menuItems: Record<MenuKey, NavigationItem[]> = {
  overview: overviewItems,
  documents: documentItems,
  products: productItems,
}

const menuLabels: Record<MenuKey, string> = {
  overview: "Overview",
  documents: "Documents",
  products: "Products",
}

function isInternalItemActive(pathname: string, item: NavigationItem) {
  if (item.external) return false

  const itemPath = item.href.split(/[?#]/)[0]
  if (itemPath === "/") return pathname === "/"
  return pathname === itemPath || pathname.startsWith(`${itemPath}/`)
}

function isMenuActive(pathname: string, items: NavigationItem[]) {
  return items.some((item) => isInternalItemActive(pathname, item))
}

function MenuItemLink({
  item,
  onSelect,
  tabIndex,
}: {
  item: NavigationItem
  onSelect: () => void
  tabIndex?: number
}) {
  const className =
    "group flex min-w-0 items-start justify-between gap-4 rounded-xl px-3 py-3 text-left transition-colors hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/80"

  const content = (
    <>
      <span className="min-w-0">
        <span className="flex items-center gap-2 text-sm font-medium text-white">
          {item.label}
          {item.external && <ArrowUpRight className="h-3.5 w-3.5 text-cyan-300" aria-hidden="true" />}
        </span>
        {item.description && (
          <span className="mt-1 block text-xs leading-5 text-gray-400 transition-colors group-hover:text-gray-300">
            {item.description}
          </span>
        )}
      </span>
      {!item.external && (
        <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-purple-400/60 transition-colors group-hover:bg-cyan-300" />
      )}
    </>
  )

  if (item.external) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={onSelect}
        tabIndex={tabIndex}
      >
        {content}
      </a>
    )
  }

  return (
    <Link href={item.href} className={className} onClick={onSelect} tabIndex={tabIndex}>
      {content}
    </Link>
  )
}

export function Header() {
  const pathname = usePathname()
  const navigationRef = useRef<HTMLElement>(null)
  const [openMenu, setOpenMenu] = useState<MenuKey | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileOpenMenu, setMobileOpenMenu] = useState<MenuKey | null>(null)
  const [address, setAddress] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [hasMetaMask, setHasMetaMask] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return

    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent))
    setHasMetaMask(Boolean(window.ethereum?.isMetaMask))

    const ethereum = window.ethereum
    if (!ethereum) return

    const syncWallet = async () => {
      try {
        const accounts = await ethereum.request({ method: "eth_accounts" })
        setAddress(accounts?.[0] ?? null)
      } catch (error) {
        console.error("Error checking wallet connection:", error)
      }
    }

    const handleAccountsChanged = (accounts: string[]) => {
      setAddress(accounts?.[0] ?? null)
    }

    syncWallet()
    ethereum.on?.("accountsChanged", handleAccountsChanged)

    return () => {
      ethereum.removeListener?.("accountsChanged", handleAccountsChanged)
    }
  }, [])

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!navigationRef.current?.contains(event.target as Node)) {
        setOpenMenu(null)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenMenu(null)
        setMobileMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleOutsideClick)
    document.addEventListener("keydown", handleEscape)
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
      document.removeEventListener("keydown", handleEscape)
    }
  }, [])

  const closeMenus = () => {
    setOpenMenu(null)
    setMobileMenuOpen(false)
    setMobileOpenMenu(null)
  }

  const switchMenu = (menu: MenuKey) => {
    setOpenMenu((current) => (current === menu ? null : menu))
  }

  const connectMobileMetaMask = () => {
    const dappUrl = window.location.href
    const encodedDappUrl = encodeURIComponent(dappUrl)

    window.open(`https://metamask.app.link/dapp/${encodedDappUrl}`, "_blank")
    window.location.href = `https://metamask.app.link/dapp/${dappUrl.replace("https://", "")}`
  }

  const handleConnectWallet = async () => {
    if (address) {
      setAddress(null)
      return
    }

    if (!window.ethereum) {
      if (isMobile) {
        connectMobileMetaMask()
      } else {
        window.open("https://metamask.io/download/", "_blank")
      }
      return
    }

    setIsConnecting(true)
    try {
      const connectedAddress = await connectWallet()
      setAddress(connectedAddress)
    } catch (error: any) {
      if (error?.code === 4001) {
        alert("Connection rejected. Please approve in MetaMask.")
      } else {
        alert("Failed to connect. Please try again.")
      }
    } finally {
      setIsConnecting(false)
    }
  }

  const openSeaUrl = address ? `https://opensea.io/${address}` : "https://opensea.io"
  const connectedLabel = address ? formatAddress(address) : "Connect Wallet"

  const resolveNavigationItem = (item: NavigationItem) =>
    item.label === "OpenSea" && item.external ? { ...item, href: openSeaUrl } : item

  const renderDesktopMenu = (menu: MenuKey) => {
    const items = menuItems[menu]
    const isOpen = openMenu === menu

    return (
      <div
        className={`absolute left-1/2 top-full z-50 mt-3 w-[min(92vw,34rem)] -translate-x-1/2 origin-top rounded-2xl border border-purple-400/20 bg-[#0d1230]/95 p-3 shadow-2xl shadow-purple-950/50 backdrop-blur-xl transition-all duration-200 ${
          isOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-2 opacity-0"
        }`}
        aria-hidden={!isOpen}
      >
        <div className="grid gap-1 sm:grid-cols-2">
          {items.map((item) => (
            <MenuItemLink
              key={item.label}
              item={resolveNavigationItem(item)}
              onSelect={closeMenus}
              tabIndex={isOpen ? 0 : -1}
            />
          ))}
        </div>
        <div className="mt-2 flex items-center justify-between border-t border-white/10 px-3 pt-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-purple-300/70">
          <span>{menuLabels[menu]}</span>
          <span className="text-cyan-300/70">Soul Internet</span>
        </div>
      </div>
    )
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
          ref={navigationRef}
          aria-label="Primary navigation"
          className="hidden flex-1 items-center justify-center gap-1 lg:flex"
        >
          <Link
            href="/"
            className={`rounded-lg px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/80 ${
              pathname === "/"
                ? "bg-white/[0.06] text-white"
                : "text-gray-300 hover:bg-white/[0.04] hover:text-cyan-300"
            }`}
            aria-current={pathname === "/" ? "page" : undefined}
            onClick={closeMenus}
          >
            Welcome to Soul Internet
          </Link>

          {(Object.keys(menuItems) as MenuKey[]).map((menu) => {
            const active = isMenuActive(pathname, menuItems[menu])
            const isOpen = openMenu === menu

            return (
              <div
                key={menu}
                className="relative"
                onMouseEnter={() => setOpenMenu(menu)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <button
                  type="button"
                  className={`flex items-center gap-1 rounded-lg px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/80 ${
                    active || isOpen
                      ? "bg-white/[0.06] text-white"
                      : "text-gray-300 hover:bg-white/[0.04] hover:text-cyan-300"
                  }`}
                  aria-expanded={isOpen}
                  aria-haspopup="true"
                  aria-controls={`${menu}-menu`}
                  onClick={() => switchMenu(menu)}
                  onKeyDown={(event) => {
                    if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
                      event.preventDefault()
                      setOpenMenu(menu)
                    }
                  }}
                >
                  {menuLabels[menu]}
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform ${isOpen ? "rotate-180 text-cyan-300" : ""}`}
                    aria-hidden="true"
                  />
                </button>
                <div id={`${menu}-menu`}>{renderDesktopMenu(menu)}</div>
              </div>
            )
          })}
        </nav>

        <div className="ml-auto hidden items-center lg:flex">
          <Button
            onClick={handleConnectWallet}
            disabled={isConnecting}
            aria-label={address ? "Disconnect wallet" : "Connect wallet"}
            className="min-w-[9.75rem] rounded-xl border border-cyan-300/30 bg-gradient-to-r from-purple-600 to-cyan-500 px-4 text-sm font-semibold text-white shadow-lg shadow-cyan-500/10 transition-all hover:-translate-y-0.5 hover:from-purple-500 hover:to-cyan-400 hover:shadow-cyan-500/25 disabled:opacity-60"
          >
            {isConnecting ? (
              <>
                <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                Connecting...
              </>
            ) : (
              <>
                <Wallet className="mr-2 h-4 w-4" aria-hidden="true" />
                {connectedLabel}
              </>
            )}
          </Button>
        </div>

        <div className="lg:hidden">
          <Sheet
            open={mobileMenuOpen}
            onOpenChange={(open) => {
              setMobileMenuOpen(open)
              if (!open) setMobileOpenMenu(null)
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

                <nav aria-label="Mobile navigation" className="space-y-2">
                  <Link
                    href="/"
                    onClick={closeMenus}
                    className="block rounded-xl px-4 py-3 text-base font-medium text-white transition-colors hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/80"
                  >
                    Welcome
                  </Link>

                  {(Object.keys(menuItems) as MenuKey[]).map((menu) => {
                    const isOpen = mobileOpenMenu === menu
                    return (
                      <div key={menu} className="rounded-xl border border-white/[0.06] bg-white/[0.02]">
                        <button
                          type="button"
                          onClick={() => setMobileOpenMenu(isOpen ? null : menu)}
                          className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-base font-medium text-white transition-colors hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/80"
                          aria-expanded={isOpen}
                        >
                          {menuLabels[menu]}
                          <ChevronDown
                            className={`h-4 w-4 text-cyan-300 transition-transform ${isOpen ? "rotate-180" : ""}`}
                            aria-hidden="true"
                          />
                        </button>
                        <div
                          className={`grid transition-[grid-template-rows,opacity] duration-200 ${
                            isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                          }`}
                        >
                          <div className="min-h-0 overflow-hidden">
                            <div className="space-y-1 px-2 pb-2">
                              {menuItems[menu].map((item) => (
                                <MenuItemLink
                                  key={item.label}
                                  item={resolveNavigationItem(item)}
                                  onSelect={closeMenus}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </nav>

                <div className="mt-auto border-t border-white/10 pt-6">
                  <Button
                    onClick={() => {
                      void handleConnectWallet()
                      setMobileMenuOpen(false)
                    }}
                    disabled={isConnecting}
                    className="w-full rounded-xl border border-cyan-300/30 bg-gradient-to-r from-purple-600 to-cyan-500 py-6 font-semibold text-white shadow-lg shadow-cyan-500/10"
                  >
                    {isConnecting ? (
                      <>
                        <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                        Connecting...
                      </>
                    ) : (
                      <>
                        <Wallet className="mr-2 h-4 w-4" aria-hidden="true" />
                        {connectedLabel}
                      </>
                    )}
                  </Button>

                  {!address && !hasMetaMask && (
                    <button
                      type="button"
                      onClick={() => window.open("https://metamask.io/download/", "_blank")}
                      className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-orange-400/30 px-4 py-3 text-sm text-orange-300 transition-colors hover:bg-orange-400/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/80"
                    >
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                      Install MetaMask
                    </button>
                  )}

                  {isMobile && !address && hasMetaMask && (
                    <button
                      type="button"
                      onClick={() => {
                        connectMobileMetaMask()
                        setMobileMenuOpen(false)
                      }}
                      className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-purple-400/30 px-4 py-3 text-sm text-purple-200 transition-colors hover:bg-purple-400/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-300/80"
                    >
                      <Smartphone className="h-4 w-4" aria-hidden="true" />
                      Open in MetaMask
                    </button>
                  )}

                  {address && (
                    <Link
                      href="/vault"
                      onClick={closeMenus}
                      className="mt-3 flex items-center justify-center gap-2 rounded-xl border border-cyan-400/25 px-4 py-3 text-sm text-cyan-200 transition-colors hover:bg-cyan-400/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/80"
                    >
                      Open My Vault
                    </Link>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}