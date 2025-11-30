"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TooltipHelp } from "@/components/tooltip-help";
import WalletMintAdmin from "@/components/WalletMintAdmin";
import { Button } from "@/components/ui/button";

export default function ClientPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-background overflow-hidden">
      {/* ===== Hero Section ===== */}
      <section className="py-12 md:py-16 lg:py-24 px-4 md:px-6 lg:px-8 text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
          Soul Internet Vault Guardian
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-6">
          Preserve African vernacular languages with Web3 rewards. Record linguistic data, mint NFTs, and earn MILSA rewards on Polygon.
        </p>
        <Button className="bg-purple-500 hover:bg-purple-600 text-white">
          Get Started
        </Button>
      </section>

      {/* ===== Wallet Admin Section ===== */}
      <section className="py-12 md:py-16 lg:py-24 px-4 md:px-6 lg:px-8 bg-gray-900/10 rounded-2xl mx-4 md:mx-6 lg:mx-8 mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
          Admin Wallet Controls
        </h2>
        <WalletMintAdmin />
      </section>

      {/* ===== Example Cards Section ===== */}
      <section className="py-12 md:py-16 lg:py-24 px-4 md:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-gray-800 text-white">
          <CardHeader>
            <CardTitle>Feature One</CardTitle>
          </CardHeader>
          <CardContent>
            Record and preserve language submissions from users.
          </CardContent>
        </Card>
        <Card className="bg-gray-800 text-white">
          <CardHeader>
            <CardTitle>Feature Two</CardTitle>
          </CardHeader>
          <CardContent>
            Mint NFTs representing linguistic contributions.
          </CardContent>
        </Card>
        <Card className="bg-gray-800 text-white">
          <CardHeader>
            <CardTitle>Feature Three</CardTitle>
          </CardHeader>
          <CardContent>
            Earn MILSA rewards on Polygon blockchain.
          </CardContent>
        </Card>
      </section>

      {/* ===== Footer ===== */}
      <footer className="border-t border-purple-500/20 bg-black/30 backdrop-blur py-8 md:py-12 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto text-center text-xs md:text-sm text-gray-400 space-y-3 md:space-y-4">
          <p className="font-semibold text-purple-400 text-sm md:text-base">
            Soul Internet Vault Guardian
          </p>
          <p className="text-xs md:text-sm">
            Preserving humanity's linguistic and cultural heritage through Web3 technology
          </p>
          <p className="text-xs text-gray-500">
            MILSA Quality Scoring • Polygon • MetaMask • OpenSea
          </p>
          <p className="text-xs text-gray-600">
            Not financial advice. Crypto involves risk. Learn before you contribute.
          </p>
          <p className="text-xs text-gray-600 pt-3 md:pt-4 border-t border-gray-700">
            © Soul-Internet | Powered by IMPERIAL ENTERPRISE
          </p>
        </div>
      </footer>
    </main>
  );
}