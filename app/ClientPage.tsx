
"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Heart, Users, Brain, Shield, Database, BrainCircuit,
  Wallet, Coins, Zap, ShieldCheck, Lock, Satellite, Fingerprint, Monitor, Laptop, Server as ServerIcon
} from "lucide-react";

/**
 * Cleaned ClientPage.tsx
 * - Replaces undefined handlers/variables with safe stubs.
 * - Keeps most of the original markup but ensures the file compiles.
 * - Adds a small ToastNotification component inline.
 *
 * Note: This file intentionally provides simple stub implementations for:
 * - connectedWallet, walletAddress, minting
 * - handleConnectWallet, handleDisconnectWallet, handleMintSoulToken
 *
 * You should replace the stubs with real logic (wallet provider, minting logic, etc.)
 * when integrating into your app.
 */

const StatCard = ({ stat }: { stat: any }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0 }}
      className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-4"
    >
      <div className="flex items-center gap-3 mb-2">
        <div className={`w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center`}>
          <div className="text-cyan-400">{stat.icon}</div>
        </div>
        <span className="text-xs text-gray-500 font-mono">{stat.label}</span>
      </div>
      <p className="text-xl md:text-2xl font-bold text-cyan-300">{stat.value}</p>
    </motion.div>
  );
};

function ToastNotification({ message, onClose }: { message: string; onClose?: () => void }) {
  if (!message) return null;
  const isSuccess = message.includes("established") || message.includes("success") || message.includes("disconnected");
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 right-4 z-50"
    >
      <div className={`px-4 py-3 rounded-lg shadow-lg ${isSuccess ? 'bg-green-500/90' : 'bg-red-500/90'}`}>
        <p className="text-white font-mono text-sm">{message}</p>
      </div>
    </motion.div>
  );
}

export default function ClientPage(): JSX.Element {
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("evolution");
  const [hologramActive, setHologramActive] = useState(false);
  const [neonGlow, setNeonGlow] = useState(false);
  const [internetEra, setInternetEra] = useState<number>(0);
  const [toastMessage, setToastMessage] = useState<string>("");

  // Stubbed wallet + minting state (replace with real implementations)
  const [connectedWallet, setConnectedWallet] = useState<boolean>(false);
  const [walletAddress, setWalletAddress] = useState<string>("0x0...abcd");
  const [minting, setMinting] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);

    const interval1 = setInterval(() => setNeonGlow((v) => !v), 3000);
    const interval2 = setInterval(() => setHologramActive((v) => !v), 5000);
    const interval3 = setInterval(() => {
      setInternetEra((prev) => (prev < 3 ? prev + 1 : 0));
    }, 8000);

    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
      clearInterval(interval3);
    };
  }, []);

  // Safe stub handlers
  const handleConnectWallet = () => {
    setConnectedWallet(true);
    setWalletAddress("0x1234...FAKE");
    setToastMessage("Wallet connection established (stub).");
    setTimeout(() => setToastMessage(""), 2500);
  };

  const handleDisconnectWallet = () => {
    setConnectedWallet(false);
    setWalletAddress("");
    setToastMessage("Wallet disconnected (stub).");
    setTimeout(() => setToastMessage(""), 2500);
  };

  const handleMintSoulToken = async () => {
    if (!connectedWallet) {
      setToastMessage("Connect a wallet first.");
      setTimeout(() => setToastMessage(""), 2000);
      return;
    }
    try {
      setMinting(true);
      // Simulate minting delay
      await new Promise((r) => setTimeout(r, 1800));
      setToastMessage("Soul token minted (stub). Success.");
    } catch (err) {
      setToastMessage("Minting failed (stub).");
    } finally {
      setMinting(false);
      setTimeout(() => setToastMessage(""), 2800);
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="relative text-center">
          <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
          <p className="mt-4 text-purple-400 font-mono animate-pulse">Initializing Soul Internet...</p>
        </div>
      </div>
    );
  }

  const showToastNotification = toastMessage.length > 0;

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      {showToastNotification && <ToastNotification message={toastMessage} />}

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent">
          Soul Internet Interface
        </h1>

        {/* Navigation */}
        <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-xl">
          <div className="flex flex-wrap justify-center gap-2 bg-black/80 backdrop-blur-xl border border-cyan-500/30 rounded-full px-4 py-2 mx-4">
            {["quantum", "evolution", "layers", "vault"].map((item) => (
              <button
                key={item}
                onClick={() => setActiveSection(item)}
                className={`px-3 py-2 rounded-full text-xs md:text-sm font-mono transition-all duration-300 ${activeSection === item
                  ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg shadow-cyan-500/30"
                  : "text-gray-400 hover:text-white hover:bg-white/5"}`}
              >
                {item.toUpperCase()}
              </button>
            ))}
            <div className="h-6 w-px bg-gradient-to-b from-transparent via-cyan-500 to-transparent mx-1 md:mx-2" />
            <button
              onClick={connectedWallet ? handleDisconnectWallet : handleConnectWallet}
              className={`px-3 py-2 rounded-full text-xs md:text-sm font-mono flex items-center gap-1 md:gap-2 transition-all ${connectedWallet
                ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                : "bg-gradient-to-r from-cyan-500 to-purple-500 hover:shadow-lg hover:shadow-cyan-500/30"}`}
            >
              <Wallet className="w-3 h-3 md:w-4 md:h-4" />
              {connectedWallet ? walletAddress : "CONNECT"}
            </button>
          </div>
        </nav>

        {/* Quantum Leap header */}
        <section className="relative min-h-screen pt-32 pb-12 px-4 md:px-8 lg:px-16 flex items-center">
          <div className="max-w-7xl mx-auto w-full text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 md:mb-12">
              <div className="inline-flex items-center gap-4 mb-6">
                <div className="h-px w-8 md:w-12 bg-gradient-to-r from-transparent to-cyan-500" />
                <span className="text-cyan-400 font-mono text-sm md:text-base tracking-widest">QUANTUM LEAP</span>
                <div className="h-px w-8 md:w-12 bg-gradient-to-r from-cyan-500 to-transparent" />
              </div>

              <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold mb-4 md:mb-6 tracking-tight">
                <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent">
                  SOUL INTERNET
                </span>
              </h1>

              <p className="text-xl md:text-3xl font-light text-gray-300 mb-6 md:mb-8 font-mono">
                The <span className="text-cyan-300">Next Evolution</span> of Human Data
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
              {[
                { label: "SOULS PRESERVED", value: "847K+", icon: <Heart className="w-4 h-4 md:w-5 md:h-5" /> },
                { label: "CULTURES SAVED", value: "142+", icon: <Users className="w-4 h-4 md:w-5 md:h-5" /> },
                { label: "LANGUAGES STORED", value: "58+", icon: <Brain className="w-4 h-4 md:w-5 md:h-5" /> },
                { label: "BLOCKS SECURED", value: "18.4K", icon: <Shield className="w-4 h-4 md:w-5 md:h-5" /> }
              ].map((stat, i) => (
                <StatCard key={i} stat={stat} />
              ))}
            </div>
          </div>
        </section>

        {/* Minting section */}
        <section className="py-16 md:py-24 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-transparent to-black/30">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold mb-6">
                  Your <span className="text-cyan-400">Digital Soul</span> Vault
                </h2>
                <p className="text-gray-400 mb-8">
                  Store, protect, and monetize your unique human data in our quantum-secure vault.
                </p>
              </div>

              <div className="bg-black/30 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold">MINT YOUR SOUL</h3>
                    <p className="text-gray-400 text-sm">Convert data into eternal tokens</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-cyan-300">Δ 142.7</p>
                    <p className="text-sm text-gray-400">Token Value</p>
                  </div>
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 py-6 text-base font-bold"
                  onClick={handleMintSoulToken}
                  disabled={!connectedWallet || minting}
                >
                  {minting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      QUANTIZING...
                    </>
                  ) : (
                    <>
                      <Coins className="w-5 h-5 mr-2" />
                      MINT SOUL TOKEN
                    </>
                  )}
                </Button>

                {!connectedWallet && (
                  <p className="text-center text-sm text-gray-500 mt-4">Connect wallet to mint your soul data</p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 bg-black/50 backdrop-blur-xl py-12 px-4 md:px-8 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
                <BrainCircuit className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold">SOUL INTERNET</span>
            </div>

            <div className="border-t border-white/10 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-center md:text-right">
                  <p className="text-sm text-gray-500 font-mono">© {new Date().getFullYear()} SOUL INTERNET | Powered by IMPERIAL ENTERPRISE</p>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>

      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </main>
  );
}
