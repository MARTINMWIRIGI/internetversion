import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Header } from "../components/header";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
  robots: { index: true, follow: true },
  icons: { icon: "/logo.png", shortcut: "/logo.png", apple: "/logo.png" },
  generator: "v0.app",
  referrer: "origin-when-cross-origin",
  formatDetection: { email: false, telephone: false },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <link
          rel="canonical"
          href="https://soul-internet.com"
        />
      </head>
      <body className={`${inter.className} antialiased bg-background text-foreground`}>
        <Header />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
