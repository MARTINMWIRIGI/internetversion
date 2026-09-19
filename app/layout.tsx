import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "../components/header";
import { Providers } from "./providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Soul Internet - Preserve Vernacular Languages with Web3",
  description: "Soul Internet Vault Guardian: A Web3 platform preserving African vernacular languages through blockchain and NFT minting.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-[#0a0e27] text-white`}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
