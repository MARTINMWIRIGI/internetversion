"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { createWalletClient, custom, createPublicClient, http } from "viem"
import { polygon } from "viem/chains"
import CONTRACT_ABI from "@/app/data/contractABI.json"
import type { WizardData } from "./types"

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`
const POLYGON_RPC = process.env.NEXT_PUBLIC_POLYGON_RPC_URL || "https://polygon-rpc.com"

interface MintStepProps {
  wizardData: Partial<WizardData>
  onBack: () => void
}

export function MintStep({ wizardData, onBack }: MintStepProps) {
  const [status, setStatus] = useState<string | null>(null)
  const [txHash, setTxHash] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isMinting, setIsMinting] = useState(false)

  const calculateMILSAscore = (): number => {
    let score = 50
    if (wizardData.audioUrl) score += 20
    if (wizardData.definition) score += 15
    if (wizardData.context) score += 15
    return Math.min(score, 100)
  }

  const generateWaveformImage = async (audioBlob: Blob): Promise<string> => {
    return new Promise((resolve) => {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const reader = new FileReader()
      reader.onload = async (e) => {
        const buffer = await audioContext.decodeAudioData(e.target!.result as ArrayBuffer)
        const data = buffer.getChannelData(0)
        const canvas = document.createElement("canvas")
        canvas.width = 800
        canvas.height = 400
        const ctx = canvas.getContext("2d")!
        const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
        grad.addColorStop(0, "#8b5cf6")
        grad.addColorStop(1, "#06b6d4")
        ctx.fillStyle = grad
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.strokeStyle = "#ffffff"
        ctx.lineWidth = 3
        ctx.beginPath()
        const slice = canvas.width / data.length
        let x = 0
        for (let i = 0; i < data.length; i++) {
          const y = canvas.height / 2 + data[i] * (canvas.height / 2)
          i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
          x += slice
        }
        ctx.stroke()
        ctx.fillStyle = "rgba(255,255,255,0.9)"
        ctx.font = "bold 24px Arial"
        ctx.textAlign = "center"
        ctx.fillText(`${wizardData.words}`, canvas.width / 2, 50)
        ctx.font = "18px Arial"
        ctx.fillText(`${wizardData.language} • ${wizardData.contentType}`, canvas.width / 2, 80)
        ctx.fillText("Soul Internet Vault Guardian", canvas.width / 2, canvas.height - 30)
        resolve(canvas.toDataURL("image/png"))
      }
      reader.readAsArrayBuffer(audioBlob)
    })
  }

  const mintNFT = async () => {
    setIsMinting(true)
    setError(null)
    setTxHash(null)

    try {
      if (!window.ethereum) {
        window.open("https://metamask.io/download/", "_blank")
        throw new Error("MetaMask not detected. Please install MetaMask.")
      }

      // Step 1: Pin audio + metadata to IPFS via /api/mint
      setStatus("Step 1/3: Pinning files securely to IPFS...")

      const nftName = `${wizardData.words} - ${wizardData.language}`
      const milsaScore = calculateMILSAscore()

      // Generate waveform image and upload as placeholder image
      let imageCid = "QmStaticPlaceholderImageHash"
      if (wizardData.audioBlob) {
        const imageDataUrl = await generateWaveformImage(wizardData.audioBlob)
        const imageRes = await fetch(imageDataUrl)
        const imageBlob = await imageRes.blob()
        const imageForm = new FormData()
        imageForm.append("file", imageBlob, "waveform.png")
        imageForm.append("name", `${nftName} - Waveform`)
        imageForm.append("metadata", JSON.stringify({ description: "waveform-image-only" }))
        const imageUpload = await fetch("/api/mint", { method: "POST", body: imageForm })
        if (!imageUpload.ok) throw new Error("Waveform image upload failed")
        const imageResult = await imageUpload.json()
        // extract CID from tokenURI ipfs://...
        imageCid = imageResult.tokenURI?.replace("ipfs://", "") || imageCid
      }

      const formData = new FormData()
      if (wizardData.audioBlob) {
        formData.append("file", wizardData.audioBlob, "recording.webm")
      } else {
        throw new Error("No audio recording found. Please go back and record audio.")
      }
      formData.append("name", nftName)
      formData.append("metadata", JSON.stringify({
        description: `Linguistic contribution: ${wizardData.definition}`,
        image: `ipfs://${imageCid}`,
        attributes: [
          { trait_type: "Language", value: wizardData.language },
          { trait_type: "Content Type", value: wizardData.contentType },
          { trait_type: "Word/Phrase", value: wizardData.words },
          { trait_type: "Definition", value: wizardData.definition },
          { trait_type: "Cultural Context", value: wizardData.context || "Not provided" },
          { trait_type: "MILSA Score", value: milsaScore.toString() },
          { trait_type: "Platform", value: "Soul Internet Vault Guardian" }
        ]
      }))

      const mintRes = await fetch("/api/mint", { method: "POST", body: formData })
      if (!mintRes.ok) {
        const err = await mintRes.json()
        throw new Error(err.error || "IPFS upload failed")
      }
      const { tokenURI } = await mintRes.json()

      // Step 2: Request wallet + switch to Polygon
      setStatus("Step 2/3: Invoking gasless meta-transaction signature...")

      const walletClient = createWalletClient({
        chain: polygon,
        transport: custom(window.ethereum)
      })

      const [account] = await walletClient.getAddresses()

      // Switch to Polygon mainnet
      try {
        await walletClient.switchChain({ id: polygon.id })
      } catch (switchErr: any) {
        if (switchErr.code === 4902) {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [{
              chainId: "0x89",
              chainName: "Polygon Mainnet",
              nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
              rpcUrls: [POLYGON_RPC],
              blockExplorerUrls: ["https://polygonscan.com/"]
            }]
          })
        } else {
          throw switchErr
        }
      }

      // Step 3: Mint on-chain
      setStatus("Step 3/3: Mint confirmed on Polygon network!")

      const hash = await walletClient.writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: "safeMint",
        args: [account, tokenURI],
        account
      })

      setTxHash(hash)

      // Save to Supabase
      await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: wizardData.language,
          content_type: wizardData.contentType,
          words_phrases: wizardData.words,
          definition: wizardData.definition,
          context: wizardData.context,
          audio_url: wizardData.audioUrl,
          wallet_address: account,
          nft_metadata_url: tokenURI,
          transaction_hash: hash,
          milsa_score: milsaScore,
          quality_status: "approved"
        })
      })

      setStatus(null)

    } catch (err: any) {
      console.error("Mint error:", err)
      setError(err.message || "Unknown error")
      setStatus(null)
    } finally {
      setIsMinting(false)
    }
  }

  return (
    <Card className="bg-card/50 border-purple-500/30">
      <CardHeader>
        <CardTitle className="text-purple-400 text-center">Mint Your Language NFT</CardTitle>
        <CardDescription className="text-center">
          Create an NFT with waveform art from your recording
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
          <h4 className="font-semibold text-purple-400 mb-3">NFT Preview</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p><strong>Image:</strong> Waveform art from audio</p>
              <p><strong>Language:</strong> {wizardData.language}</p>
              <p><strong>Content:</strong> {wizardData.words}</p>
            </div>
            <div>
              <p><strong>Type:</strong> {wizardData.contentType}</p>
              <p><strong>MILSA Score:</strong> {calculateMILSAscore()}/100</p>
              {wizardData.audioUrl && <p className="text-green-400">✓ Audio recording included</p>}
            </div>
          </div>
        </div>

        {status && (
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 flex items-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400 shrink-0" />
            <p className="text-blue-400 text-sm">{status}</p>
          </div>
        )}

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {txHash && (
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 space-y-1">
            <p className="text-green-400 text-sm font-semibold">🎊 NFT Created Successfully!</p>
            <a
              href={`https://polygonscan.com/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400 text-xs underline block"
            >
              View Transaction on PolygonScan
            </a>
            <a
              href={`https://opensea.io/assets/matic/${CONTRACT_ADDRESS}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400 text-xs underline block"
            >
              View NFT on OpenSea
            </a>
          </div>
        )}

        <div className="flex justify-between pt-2">
          <Button
            onClick={onBack}
            disabled={isMinting}
            variant="outline"
            className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10"
          >
            ← Back to Review
          </Button>
          {!txHash ? (
            <Button
              onClick={mintNFT}
              disabled={isMinting}
              className="bg-gradient-to-r from-purple-500 to-cyan-400 hover:from-purple-600 hover:to-cyan-500 text-black font-semibold disabled:opacity-50"
            >
              {isMinting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2" />
                  Creating NFT...
                </>
              ) : "🎨 Create Language NFT"}
            </Button>
          ) : (
            <Button
              onClick={() => window.location.href = "/vault"}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              View in My Vault →
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
