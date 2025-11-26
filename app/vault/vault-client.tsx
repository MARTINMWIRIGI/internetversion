"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface NFTSubmission {
  id: string
  language: string
  words_phrases: string
  content_type: string
  milsa_score: number
  quality_status: string
  created_at: string
  wallet_address: string
  nftMetadataUrl?: string
}

export default function VaultClientPage() {
  const [submissions, setSubmissions] = useState<NFTSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterLanguage, setFilterLanguage] = useState("")
  const [showOnlyMyVault, setShowOnlyMyVault] = useState(false)
  const [address, setAddress] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true) // client-only
  }, [])

  useEffect(() => {
    // Get connected wallet address safely
    if (typeof window === "undefined") return

    const getAddress = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: "eth_accounts" })
          if (accounts && accounts.length > 0) setAddress(accounts[0])
        } catch (error) {
          console.error("Error getting wallet address:", error)
        }
      }
    }
    getAddress()
  }, [])

  useEffect(() => {
    // Fetch submissions with fallback dummy data
    const fetchSubmissions = async () => {
      try {
        const response = await fetch("/api/submissions")
        if (!response.ok) throw new Error("API failed")
        const data = await response.json()
        setSubmissions(data)
      } catch (error) {
        console.warn("API failed, using dummy data", error)
        setSubmissions([
          {
            id: "1",
            language: "Kikuyu",
            words_phrases: "Habari",
            content_type: "word",
            milsa_score: 95,
            quality_status: "approved",
            created_at: new Date().toISOString(),
            wallet_address: "0x123",
            nftMetadataUrl: undefined,
          },
          {
            id: "2",
            language: "Swahili",
            words_phrases: "Jambo",
            content_type: "phrase",
            milsa_score: 88,
            quality_status: "approved",
            created_at: new Date().toISOString(),
            wallet_address: "0x456",
            nftMetadataUrl: undefined,
          },
        ])
      } finally {
        setLoading(false)
      }
    }
    fetchSubmissions()
  }, [])

  const filteredSubmissions = submissions.filter((sub) => {
    const matchesSearch =
      sub.words_phrases.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (sub.language?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false)
    const matchesLanguage = !filterLanguage || sub.language === filterLanguage
    const matchesVault = !showOnlyMyVault || (address && sub.wallet_address.toLowerCase() === address.toLowerCase())
    return matchesSearch && matchesLanguage && matchesVault
  })

  const languages = [...new Set(submissions.map((s) => s.language))]

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-green-600"
    if (score >= 70) return "text-amber-600"
    return "text-muted-foreground"
  }

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { color: string; label: string }> = {
      pending: { color: "bg-blue-100 text-blue-700", label: "Pending" },
      approved: { color: "bg-green-100 text-green-700", label: "Approved" },
      rejected: { color: "bg-amber-100 text-amber-700", label: "Review Needed" },
    }
    const config = statusConfig[status] || statusConfig["pending"]
    return <span className={`px-2 py-1 rounded text-xs font-semibold ${config.color}`}>{config.label}</span>
  }

  if (!mounted) return <div className="text-center py-12">Loading vault...</div>

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-12">
        <header className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <h1 className="text-2xl font-bold gradient-text">My Vault / Gallery</h1>
          <div className="flex gap-3 flex-wrap">
            <Button variant={showOnlyMyVault ? "default" : "outline"} onClick={() => setShowOnlyMyVault(true)}>
              My Vault
            </Button>
            <Button variant={!showOnlyMyVault ? "default" : "outline"} onClick={() => setShowOnlyMyVault(false)}>
              Gallery
            </Button>
          </div>
        </header>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Input
            placeholder="Search by word or language..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-blue-200 bg-white text-foreground placeholder:text-muted-foreground focus:border-blue-400 focus:ring-blue-500/20"
          />
          <select
            value={filterLanguage}
            onChange={(e) => setFilterLanguage(e.target.value)}
            className="px-4 py-2 rounded-lg border border-blue-200 bg-white text-foreground focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="">All Languages</option>
            {languages.map((lang) => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="text-center py-12">Loading NFTs...</div>
        ) : filteredSubmissions.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No NFTs found</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSubmissions.map((sub) => (
              <Card key={sub.id} className="bg-white/80 border-blue-200 soft-shadow hover:shadow-lg transition">
                <CardContent>
                  <p className="font-mono font-semibold text-blue-600 text-lg">{sub.words_phrases}</p>
                  <div className="flex flex-wrap gap-2 my-1">
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">{sub.language}</span>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">{sub.content_type}</span>
                  </div>
                  <div className="flex items-center gap-4 my-2">
                    <p className={`text-2xl font-bold ${getScoreColor(sub.milsa_score)}`}>{sub.milsa_score}/100</p>
                    {getStatusBadge(sub.quality_status)}
                  </div>
                  {sub.nftMetadataUrl && (
                    <Link href={sub.nftMetadataUrl} target="_blank" className="text-cyan-400 underline mt-2 block">
                      View on OpenSea/IPFS
                    </Link>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    Submitted {new Date(sub.created_at).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}