"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BrowserProvider, Contract } from "ethers"
import CONTRACT_ABI from "@/app/data/contractABI.json"
import type { WizardData } from "./types"

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "0x202934e4dF29E57Ab7498bB31946174d7C95eDc7"
const NFT_STORAGE_KEY = process.env.NEXT_PUBLIC_NFT_STORAGE_KEY

interface MintStepProps {
  wizardData: Partial<WizardData>
  onBack: () => void
}

export function MintStep({ wizardData, onBack }: MintStepProps) {
  const [isMinting, setIsMinting] = useState(false)
  const [txHash, setTxHash] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [nftUrl, setNftUrl] = useState<string | null>(null)

  // Connect to Polygon and prepare for minting
  const connectAndPrepare = async (): Promise<boolean> => {
    if (!window.ethereum) {
      setError("MetaMask not detected! Please install MetaMask.")
      return false
    }

    try {
      setError(null)

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts"
      })

      if (accounts.length === 0) {
        setError("Please connect your MetaMask wallet")
        return false
      }

      // Switch to Polygon Mainnet
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x89" }]
        })
      } catch (switchError: any) {
        if (switchError.code === 4902) {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0x89",
                chainName: "Polygon Mainnet",
                nativeCurrency: {
                  name: "MATIC",
                  symbol: "MATIC",
                  decimals: 18
                },
                rpcUrls: ["https://polygon-rpc.com/"],
                blockExplorerUrls: ["https://polygonscan.com/"]
              }
            ]
          })
        } else {
          throw switchError
        }
      }

      return true
    } catch (error: any) {
      setError(`Wallet connection failed: ${error.message}`)
      return false
    }
  }

  // Generate waveform image from audio
  const generateWaveformImage = async (audioBlob: Blob): Promise<string> => {
    return new Promise((resolve) => {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const fileReader = new FileReader()

      fileReader.onload = async (e) => {
        const arrayBuffer = e.target?.result as ArrayBuffer
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)
        const channelData = audioBuffer.getChannelData(0)

        // Create canvas for waveform
        const canvas = document.createElement('canvas')
        canvas.width = 800
        canvas.height = 400
        const ctx = canvas.getContext('2d')!

        // Draw gradient background
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
        gradient.addColorStop(0, '#8b5cf6')
        gradient.addColorStop(1, '#06b6d4')
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Draw waveform
        ctx.strokeStyle = '#ffffff'
        ctx.lineWidth = 3
        ctx.beginPath()

        const sliceWidth = canvas.width / channelData.length
        let x = 0

        for (let i = 0; i < channelData.length; i++) {
          const v = channelData[i] * (canvas.height / 2)
          const y = canvas.height / 2 + v

          if (i === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }

          x += sliceWidth
        }

        ctx.stroke()

        // Add text overlay
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
        ctx.font = 'bold 24px Arial'
        ctx.textAlign = 'center'
        ctx.fillText(`${wizardData.words}`, canvas.width / 2, 50)
        ctx.font = '18px Arial'
        ctx.fillText(`${wizardData.language} • ${wizardData.contentType}`, canvas.width / 2, 80)
        ctx.fillText('Soul Internet Vault Guardian', canvas.width / 2, canvas.height - 30)

        resolve(canvas.toDataURL('image/png'))
      }

      fileReader.readAsArrayBuffer(audioBlob)
    })
  }

  // Upload to IPFS via NFT.Storage
  const uploadToIPFS = async (imageDataUrl: string, metadata: any): Promise<string> => {
    try {
      // Convert data URL to blob
      const response = await fetch(imageDataUrl)
      const imageBlob = await response.blob()

      // Upload to NFT.Storage
      const formData = new FormData()
      formData.append('file', imageBlob, 'waveform.png')

      // First upload image
      const imageUpload = await fetch('https://api.nft.storage/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${NFT_STORAGE_KEY}`,
        },
        body: formData
      })

      const imageResult = await imageUpload.json()
      const imageCID = imageResult.value.cid

      // Then upload metadata
      const metadataWithImage = {
        ...metadata,
        image: `ipfs://${imageCID}`,
        properties: {
          ...metadata.attributes,
          audio_url: wizardData.audioUrl,
          recorded_at: new Date().toISOString()
        }
      }

      const metadataUpload = await fetch('https://api.nft.storage/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${NFT_STORAGE_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(metadataWithImage)
      })

      const metadataResult = await metadataUpload.json()
      return `ipfs://${metadataResult.value.cid}`

    } catch (error) {
      console.error('IPFS upload error:', error)
      throw new Error('Failed to upload to IPFS')
    }
  }

  const getWalletAddress = async (): Promise<string> => {
    if (!window.ethereum) throw new Error('MetaMask not connected')
    const accounts = await window.ethereum.request({ method: 'eth_accounts' })
    return accounts[0]
  }

  const calculateMILSAscore = (): number => {
    let score = 50
    if (wizardData.audioUrl) score += 20
    if (wizardData.definition) score += 15
    if (wizardData.context) score += 15
    return Math.min(score, 100)
  }

  const mintNFT = async () => {
    const isReady = await connectAndPrepare()
    if (!isReady) return

    setIsMinting(true)
    setError(null)

    try {
      const userAddress = await getWalletAddress()

      // 1. Generate waveform image from audio
      let imageDataUrl = ''
      if (wizardData.audioBlob) {
        imageDataUrl = await generateWaveformImage(wizardData.audioBlob)
      } else {
        // Fallback if no audio
        const canvas = document.createElement('canvas')
        canvas.width = 800
        canvas.height = 400
        const ctx = canvas.getContext('2d')!
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
        gradient.addColorStop(0, '#8b5cf6')
        gradient.addColorStop(1, '#06b6d4')
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = 'white'
        ctx.font = 'bold 24px Arial'
        ctx.textAlign = 'center'
        ctx.fillText(`${wizardData.words} - ${wizardData.language}`, canvas.width / 2, canvas.height / 2)
        imageDataUrl = canvas.toDataURL('image/png')
      }

      // 2. Prepare NFT metadata
      const metadata = {
        name: `${wizardData.words} - ${wizardData.language}`,
        description: `Linguistic contribution: ${wizardData.definition}`,
        attributes: [
          {
            trait_type: "Language",
            value: wizardData.language
          },
          {
            trait_type: "Content Type", 
            value: wizardData.contentType
          },
          {
            trait_type: "Word/Phrase",
            value: wizardData.words
          },
          {
            trait_type: "Definition",
            value: wizardData.definition
          },
          {
            trait_type: "Cultural Context",
            value: wizardData.context || "Not provided"
          },
          {
            trait_type: "MILSA Score",
            value: calculateMILSAscore().toString()
          },
          {
            trait_type: "Platform",
            value: "Soul Internet Vault Guardian"
          }
        ]
      }

      // 3. Upload to IPFS
      const ipfsUrl = await uploadToIPFS(imageDataUrl, metadata)

      // 4. Mint on blockchain using Thirdweb DropERC1155 contract
      // FIXED: Added proper null check for window.ethereum
      if (!window.ethereum) {
        throw new Error('Ethereum provider not found. Please install MetaMask.')
      }
      
      const provider = new BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)

      // IMPORTANT: Your contract is an ERC721, not ERC1155 - use safeMint instead of claim
      // The safeMint function in your contract takes (to, uri) parameters
      const tx = await contract.safeMint(
        userAddress,                    // to: address to mint to
        ipfsUrl                        // uri: token URI (IPFS URL)
      )

      const receipt = await tx.wait()

      setTxHash(receipt.hash)
      // For ERC721, OpenSea URL format is standard
      setNftUrl(`https://opensea.io/assets/matic/${CONTRACT_ADDRESS}/0`)

      // 5. Save to Supabase
      await saveToSupabase(metadata, ipfsUrl, receipt.hash)

    } catch (error: any) {
      console.error("Mint error:", error)
      setError(`Minting failed: ${error.message || "Unknown error"}`)
    } finally {
      setIsMinting(false)
    }
  }

  // Save to Supabase
  const saveToSupabase = async (metadata: any, ipfsUrl: string, txHash: string) => {
    try {
      const walletAddress = await getWalletAddress()
      const response = await fetch('/api/submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language: wizardData.language,
          content_type: wizardData.contentType,
          words_phrases: wizardData.words,
          definition: wizardData.definition,
          context: wizardData.context,
          audio_url: wizardData.audioUrl,
          wallet_address: walletAddress,
          nft_metadata_url: ipfsUrl,
          transaction_hash: txHash,
          milsa_score: calculateMILSAscore(),
          quality_status: 'approved'
        })
      })

      if (!response.ok) throw new Error('Failed to save to database')

    } catch (error) {
      console.error('Supabase save error:', error)
      // Continue even if Supabase save fails
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
        {/* Preview Section */}
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
              {wizardData.audioUrl && (
                <p className="text-green-400">✓ Audio recording included</p>
              )}
            </div>
          </div>
        </div>

        {/* Mint Button */}
        <div className="text-center">
          <Button
            onClick={mintNFT}
            disabled={isMinting}
            className="bg-gradient-to-r from-purple-500 to-cyan-400 hover:from-purple-600 hover:to-cyan-500 text-black font-semibold text-lg py-3 px-8 disabled:opacity-50"
          >
            {isMinting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2"></div>
                Creating NFT...
              </>
            ) : (
              "🎨 Create Language NFT"
            )}
          </Button>
        </div>

        {/* Status Messages */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {txHash && (
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 space-y-2">
            <p className="text-green-400 text-sm font-semibold">🎊 NFT Created Successfully!</p>
            <div className="flex flex-col gap-1 text-xs">
              <p className="text-green-400">
                <a 
                  href={`https://polygonscan.com/tx/${txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  View Transaction on PolygonScan
                </a>
              </p>
              {nftUrl && (
                <p className="text-green-400">
                  <a 
                    href={nftUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    View NFT on OpenSea
                  </a>
                </p>
              )}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between pt-4">
          <Button
            onClick={onBack}
            variant="outline"
            className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10"
          >
            ← Back to Review
          </Button>

          {txHash && (
            <Button
              onClick={() => window.location.href = '/vault'}
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