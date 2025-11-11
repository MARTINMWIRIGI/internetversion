import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Header } from "@/components/header"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Soul Internet - Preserve Vernacular Languages with Web3 Rewards",
  description:
    "Soul Internet Vault Guardian: A Web3 platform preserving African vernacular languages through blockchain, NFT minting, and MILSA token rewards. Contribute Kenyan, East African, and indigenous languages.",
  keywords:
    "Soul Internet, linguistic preservation, vernacular languages, Kenya, Web3, blockchain, NFT, Polygon, MetaMask, cultural heritage, MILSA tokens, indigenous languages, Swahili, Kikuyu",
  authors: [{ name: "Imperial Enterprise" }],
  creator: "Imperial Enterprise",
  publisher: "Soul Internet",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://soul-internet-vault-guardian.vercel.app",
    siteName: "Soul Internet",
    title: "Soul Internet - Preserve Vernacular Languages with Web3",
    description:
      "Contribute your vernacular language recordings, mint them as NFTs, and earn MILSA rewards while preserving cultural heritage.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Soul Internet - Preserve Languages with Web3",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Soul Internet - Preserve Vernacular Languages",
    description: "Contribute linguistic and cultural data, mint NFTs, earn Web3 rewards",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  generator: "v0.app",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    telephone: false,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <link rel="canonical" href="https://soul-internet-vault-guardian.vercel.app" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Soul Internet",
              description: "A Web3 platform for preserving vernacular languages through blockchain technology",
              url: "https://soul-internet-vault-guardian.vercel.app",
              applicationCategory: "SocialNetworking",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              creator: {
                "@type": "Organization",
                name: "Imperial Enterprise",
              },
              datePublished: "2024-01-01",
              inLanguage: "en-US",
              isAccessibleForFree: true,
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "5",
                ratingCount: "100",
              },
            }),
          }}
        />
      </head>
      <body className={`font-sans antialiased bg-background text-foreground`}>
        <Header />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
