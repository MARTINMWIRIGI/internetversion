
"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Heart, Users, Brain, Shield, Coins, Wallet as WalletIcon, BrainCircuit
} from "lucide-react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

/**
 * Enhanced ClientPage.tsx
 *
 * Features added:
 * - MetaMask + WalletConnect integration using ethers + web3modal
 * - TypeScript types for wallet and handlers
 * - Reintroduced interactive sections and animations
 * - Purge-safe Tailwind dynamic classes helper
 *
 * IMPORTANT: You must install the following packages in your project:
 * npm install ethers web3modal @walletconnect/web3-provider framer-motion lucide-react
 *
 * Notes on Next.js / Vercel:
 * - This file runs only on the client ("use client") so it must not be imported server-side.
 * - Ensure environment variables for RPC endpoints (if you want WalletConnect to use a specific RPC) are set.
 * - Keep this file inside a client component folder (e.g., components/ or app/... with "use client").
 */

/* -----------------------
   Types
   ----------------------- */
type ProviderType = ethers.providers.Web3Provider | null;

interface WalletState {
  connected: boolean;
  address: string;
  chainId: number | null;
  provider: ProviderType;
}

/* -----------------------
   Tailwind purge-safe classes helper
   Some classes are generated dynamically in JSX in many projects.
   Add them here as a single string so Tailwind's JIT/purge picks them up.
   ----------------------- */
const tailwindPurgeSafe = `
  bg-gradient-to-r from-cyan-500 to-purple-500
  from-cyan-600 to-purple-600
  from-green-500 to-emerald-500
  bg-black/30 border-white/10
  text-cyan-300 text-gray-400 text-gray-500
  hover:shadow-lg hover:shadow-cyan-500/30
  rounded-xl rounded-2xl rounded-lg
`;

/* -----------------------
   Small UI helpers/components
   ----------------------- */
const StatCard = ({ stat }: { stat: { label: string; value: string; icon: React.ReactNode } }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
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

function Toast({ message }: { message: string }) {
  if (!message) return null;
  const isSuccess = message.toLowerCase().includes("success") || message.toLowerCase().includes("established");
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="fixed bottom-6 right-6 z-50">
      <div className={`px-4 py-3 rounded-lg shadow-lg ${isSuccess ? 'bg-green-500/90' : 'bg-red-500/90'}`}>
        <p className="text-white font-mono text-sm">{message}</p>
      </div>
    </motion.div>
  );
}

/* -----------------------
   Wallet / Web3 setup
   ----------------------- */

// Create a Web3Modal instance with WalletConnect provider options
const createWeb3Modal = () =>
  new Web3Modal({
    cacheProvider: true,
    providerOptions: {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          // You should provide your own Infura or Alchemy RPC map here for reliability.
          // Example:
          // rpc: { 1: process.env.NEXT_PUBLIC_MAINNET_RPC, 137: process.env.NEXT_PUBLIC_POLYGON_RPC },
          // infuraId: process.env.NEXT_PUBLIC_INFURA_ID
        },
      },
    },
  });

/* -----------------------
   Main Component
   ----------------------- */
export default function ClientPage(): JSX.Element {
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("evolution");
  const [neonGlow, setNeonGlow] = useState(false);
  const [internetEra, setInternetEra] = useState<number>(0);
  const [toast, setToast] = useState<string>("");

  const [wallet, setWallet] = useState<WalletState>({
    connected: false,
    address: "",
    chainId: null,
    provider: null,
  });

  const [minting, setMinting] = useState(false);

  // Keep an instance of web3modal to reuse across handlers
  const [web3Modal, setWeb3Modal] = useState<Web3Modal | null>(null);

  useEffect(() => {
    setMounted(true);
    setWeb3Modal(createWeb3Modal());

    const g1 = setInterval(() => setNeonGlow((v) => !v), 3000);
    const g2 = setInterval(() => setInternetEra((s) => (s < 3 ? s + 1 : 0)), 7000);

    return () => {
      clearInterval(g1);
      clearInterval(g2);
    };
  }, []);

  // Format address short
  const shortAddress = (addr: string) => {
    if (!addr) return "";
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  // Connect to wallet using Web3Modal (supports MetaMask and WalletConnect)
  const connectWallet = useCallback(async () => {
    if (!web3Modal) {
      setToast("Web3Modal not ready.");
      setTimeout(() => setToast(""), 2000);
      return;
    }
    try {
      const provider = await web3Modal.connect();
      const web3Provider = new ethers.providers.Web3Provider(provider);
      const signer = web3Provider.getSigner();
      const address = await signer.getAddress();
      const network = await web3Provider.getNetwork();

      setWallet({
        connected: true,
        address,
        chainId: network.chainId,
        provider: web3Provider,
      });

      setToast("Wallet connection established.");
      setTimeout(() => setToast(""), 2200);

      // Listen for accounts / chain changes and handle gracefully
      if ((provider as any).on) {
        (provider as any).on("accountsChanged", (accounts: string[]) => {
          if (accounts.length === 0) {
            // disconnected
            resetWalletState();
          } else {
            setWallet((w) => ({ ...w, address: accounts[0] }));
          }
        });

        (provider as any).on("chainChanged", async (chainIdHex: string) => {
          const chainId = Number(chainIdHex);
          setWallet((w) => ({ ...w, chainId }));
        });

        (provider as any).on("disconnect", (code: number, reason: string) => {
          resetWalletState();
        });
      }
    } catch (err: any) {
      console.error("connectWallet error", err);
      setToast("Wallet connection failed.");
      setTimeout(() => setToast(""), 2200);
    }
  }, [web3Modal]);

  // Reset wallet state and clear cached provider
  const resetWalletState = useCallback(async () => {
    try {
      web3Modal?.clearCachedProvider();
    } catch (e) {
      // ignore
    }
    setWallet({
      connected: false,
      address: "",
      chainId: null,
      provider: null,
    });
    setToast("Wallet disconnected.");
    setTimeout(() => setToast(""), 1800);
  }, [web3Modal]);

  // Minting example (uses signer to send a dummy transaction)
  const handleMint = useCallback(async () => {
    if (!wallet.connected || !wallet.provider) {
      setToast("Connect a wallet first.");
      setTimeout(() => setToast(""), 1600);
      return;
    }
    try {
      setMinting(true);
      const signer = wallet.provider.getSigner();

      // Example: send a tiny tx to yourself — replace with contract call to your mint function.
      // DO NOT send real funds in testing; you may switch to send a zero-value transaction or call a contract.
      const tx = await signer.sendTransaction({
        to: wallet.address,
        value: ethers.utils.parseEther("0.000001"), // VERY small amount; replace with contract call
      });

      setToast("Minting transaction submitted. Waiting for confirmation...");
      await tx.wait();
      setToast("Minted successfully (on-chain tx confirmed).");
    } catch (err: any) {
      console.error("mint error", err);
      setToast("Mint failed. See console for details.");
    } finally {
      setMinting(false);
      setTimeout(() => setToast(""), 2600);
    }
  }, [wallet]);

  // If web3modal cached provider existed, auto-connect
  useEffect(() => {
    if (!web3Modal) return;
    if ((web3Modal as any).cachedProvider) {
      connectWallet().catch(() => {
        // ignore
      });
    }
  }, [web3Modal, connectWallet]);

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

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      {toast && <Toast message={toast} />}

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
              onClick={wallet.connected ? resetWalletState : connectWallet}
              className={`px-3 py-2 rounded-full text-xs md:text-sm font-mono flex items-center gap-1 md:gap-2 transition-all ${wallet.connected
                ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                : "bg-gradient-to-r from-cyan-500 to-purple-500 hover:shadow-lg hover:shadow-cyan-500/30"}`}
            >
              <WalletIcon className="w-3 h-3 md:w-4 md:h-4" />
              {wallet.connected ? shortAddress(wallet.address) : "CONNECT"}
            </button>
          </div>
        </nav>

        {/* Header/hero */}
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
                  onClick={handleMint}
                  disabled={!wallet.connected || minting}
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

                {!wallet.connected && (
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
        /* Purge-safe helper - keep here so tailwind finds them in build */
        .tailwind-purge-safe { display: none; }
      `}</style>

      {/* Hidden element to keep dynamic tailwind classes in the compiled HTML for purge */}
      <div className="tailwind-purge-safe" aria-hidden>
        {tailwindPurgeSafe}
      </div>
    </main>
  );
}
