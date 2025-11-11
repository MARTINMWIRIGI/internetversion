"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Spinner } from "@/components/ui/spinner"
import { uploadMetadataToNFTStorage, mintNFT, ensurePolygonNetwork } from "@/lib/web3-utils"

interface WizardFormProps {
  userAddress: string
  onMintSuccess: (txHash: string) => void
  onMintError: (error: string) => void
}

export function WizardForm({ userAddress, onMintSuccess, onMintError }: WizardFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    culturalContext: "",
    attributes: "" as string,
    imageUrl: "",
  })
  const [isMinting, setIsMinting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsMinting(true)

    try {
      await ensurePolygonNetwork()

      // Prepare metadata for IPFS
      const metadata = {
        name: formData.name,
        description: formData.description,
        attributes: [
          {
            trait_type: "Cultural Context",
            value: formData.culturalContext,
          },
          {
            trait_type: "Attributes",
            value: formData.attributes,
          },
        ],
        image: formData.imageUrl || "/wizard-cultural-nft.jpg",
      }

      console.log("[v0] Uploading metadata to NFT.storage...")
      const metadataUri = await uploadMetadataToNFTStorage(metadata)
      console.log("[v0] Metadata URI:", metadataUri)

      console.log("[v0] Minting NFT to contract...")
      const txHash = await mintNFT(metadataUri, userAddress)
      console.log("[v0] Transaction hash:", txHash)

      onMintSuccess(txHash || "")
      setFormData({ name: "", description: "", culturalContext: "", attributes: "", imageUrl: "" })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
      console.error("[v0] Mint error:", errorMessage)
      onMintError(errorMessage)
    } finally {
      setIsMinting(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto border-purple-500/20 bg-gradient-to-br from-slate-900 via-purple-900/10 to-slate-900">
      <CardHeader>
        <CardTitle className="text-2xl text-purple-100">Vault Guardian - Wizard NFT</CardTitle>
        <CardDescription className="text-purple-300/70">
          Mint your cultural heritage as an NFT on Polygon Mainnet
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-purple-200">
              Wizard Name
            </Label>
            <Input
              id="name"
              placeholder="Enter your wizard name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="bg-slate-800/50 border-purple-500/30 text-purple-50 placeholder:text-purple-400/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-purple-200">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Describe your wizard's essence and powers"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              className="bg-slate-800/50 border-purple-500/30 text-purple-50 placeholder:text-purple-400/50 min-h-24"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="culturalContext" className="text-purple-200">
              Cultural Context
            </Label>
            <Input
              id="culturalContext"
              placeholder="e.g., Ancient Celtic, African Diaspora, etc."
              value={formData.culturalContext}
              onChange={(e) => setFormData({ ...formData, culturalContext: e.target.value })}
              required
              className="bg-slate-800/50 border-purple-500/30 text-purple-50 placeholder:text-purple-400/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="attributes" className="text-purple-200">
              Special Attributes
            </Label>
            <Textarea
              id="attributes"
              placeholder="List special abilities, traits, or characteristics"
              value={formData.attributes}
              onChange={(e) => setFormData({ ...formData, attributes: e.target.value })}
              className="bg-slate-800/50 border-purple-500/30 text-purple-50 placeholder:text-purple-400/50 min-h-20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageUrl" className="text-purple-200">
              Image URL (Optional)
            </Label>
            <Input
              id="imageUrl"
              placeholder="IPFS or HTTPS URL for wizard image"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              type="url"
              className="bg-slate-800/50 border-purple-500/30 text-purple-50 placeholder:text-purple-400/50"
            />
          </div>

          <Button
            type="submit"
            disabled={isMinting || !userAddress}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white"
          >
            {isMinting ? (
              <>
                <Spinner className="mr-2 h-4 w-4" />
                Minting to OpenSea...
              </>
            ) : (
              "Mint Wizard NFT"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
