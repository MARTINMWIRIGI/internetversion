"use client"

import { useState } from "react"
import { WalletConnect } from "@/components/wallet-connect"
import { WizardForm } from "@/components/wizard-form"
import { MintSuccess } from "@/components/mint-success"
import { Sparkles } from "lucide-react"

export default function Home() {
  const [userAddress, setUserAddress] = useState("")
  const [successTxHash, setSuccessTxHash] = useState("")
  const [error, setError] = useState("")

  function handleMintSuccess(txHash: string) {
    setSuccessTxHash(txHash)
    setError("")
  }

  function handleMintError(errorMessage: string) {
    setError(errorMessage)
  }

  function handleReset() {
    setSuccessTxHash("")
    setError("")
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900/5 to-slate-950 p-4 md:p-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="w-8 h-8 text-purple-500" />
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-purple-100 to-purple-300">
            Vault Guardian
          </h1>
        </div>
        <p className="text-xl text-purple-300/80">Preserve and mint your cultural heritage as NFTs on OpenSea</p>

        {/* Wallet Connection */}
        <div className="mt-8 flex justify-end">
          <WalletConnect
            onConnect={setUserAddress}
            onDisconnect={() => {
              setUserAddress("")
              handleReset()
            }}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto">
        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-500/20 rounded-lg text-red-200">
            <p className="font-semibold">Error: {error}</p>
          </div>
        )}

        {successTxHash ? (
          <MintSuccess txHash={successTxHash} onReset={handleReset} />
        ) : userAddress ? (
          <WizardForm userAddress={userAddress} onMintSuccess={handleMintSuccess} onMintError={handleMintError} />
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-purple-300/60 mb-4">Connect your MetaMask wallet to begin</p>
            <div className="text-6xl opacity-20">✨</div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-20 text-center text-purple-300/50 text-sm">
        <p>Minting wizard NFTs to Polygon Mainnet • Soul Internet Protocol</p>
      </footer>
    </main>
  )
}
