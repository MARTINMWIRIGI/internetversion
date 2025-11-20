"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function WizardClient() {
  const [nftName, setNftName] = useState("")
  const [nftDescription, setNftDescription] = useState("")
  const [imageData, setImageData] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [metadataUrl, setMetadataUrl] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => setImageData(reader.result as string)
    reader.readAsDataURL(file)
  }

  const handleMint = async () => {
    if (!imageData || !nftName || !nftDescription) return alert("All fields are required!")

    setLoading(true)

    try {
      const res = await fetch("/api/mint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: nftName, description: nftDescription, imageBase64: imageData }),
      })

      const data = await res.json()

      if (data.metadataUrl) {
        setMetadataUrl(data.metadataUrl)
        alert("NFT minted successfully!")
      } else {
        console.error("Mint failed:", data.error)
        alert("Minting failed!")
      }
    } catch (err) {
      console.error(err)
      alert("An error occurred while minting.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 max-w-md mx-auto space-y-4">
      <input
        type="text"
        placeholder="NFT Name"
        value={nftName}
        onChange={(e) => setNftName(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <textarea
        placeholder="NFT Description"
        value={nftDescription}
        onChange={(e) => setNftDescription(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input type="file" accept="image/*" onChange={handleFileChange} className="w-full" />
      <Button onClick={handleMint} disabled={loading} className="w-full">
        {loading ? "Minting..." : "Mint NFT"}
      </Button>
      {metadataUrl && (
        <p className="text-sm text-green-500">
          Metadata URL: <a href={metadataUrl} target="_blank" rel="noopener noreferrer">{metadataUrl}</a>
        </p>
      )}
    </div>
  )
}