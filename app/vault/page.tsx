"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Submission {
  id: string
  language: string
  words_phrases: string
  content_type: string
  milsa_score: number
  quality_status: string
  created_at: string
}

export default function VaultPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterLanguage, setFilterLanguage] = useState("")

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await fetch("/api/submissions")
        const data = await response.json()
        setSubmissions(data)
      } catch (error) {
        console.error("Error fetching submissions:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchSubmissions()
  }, [])

  const filteredSubmissions = submissions.filter((sub) => {
    const matchesSearch =
      sub.words_phrases.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.definition?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLanguage = !filterLanguage || sub.language === filterLanguage
    return matchesSearch && matchesLanguage
  })

  const languages = [...new Set(submissions.map((s) => s.language))]

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-green-400"
    if (score >= 70) return "text-yellow-400"
    return "text-muted-foreground"
  }

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { color: string; label: string }> = {
      pending: { color: "bg-purple-500/20 text-purple-400", label: "Pending" },
      approved: { color: "bg-green-500/20 text-green-400", label: "Approved" },
      rejected: { color: "bg-red-500/20 text-red-400", label: "Review Needed" },
    }
    const config = statusConfig[status] || statusConfig["pending"]
    return <span className={`px-2 py-1 rounded text-xs font-semibold ${config.color}`}>{config.label}</span>
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Grid background */}
      <div className="fixed inset-0 grid-pattern opacity-20 pointer-events-none" />

      {/* Scan line */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 scan-line bg-gradient-to-b from-transparent via-purple-500 to-transparent opacity-5" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-border/40 backdrop-blur-sm bg-background/80">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/">
              <Button variant="ghost" className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10">
                ← Back to Home
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-300">
              My Vault
            </h1>
            <Link href="/wizard">
              <Button className="bg-gradient-to-r from-purple-500 to-cyan-400 hover:from-purple-600 hover:to-cyan-500 text-black font-semibold">
                New Contribution
              </Button>
            </Link>
          </div>
        </header>

        <div className="container mx-auto px-4 py-12">
          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-card/50 border-purple-500/30">
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground mb-1">Total Contributions</p>
                <p className="text-3xl font-bold text-purple-400">{submissions.length}</p>
              </CardContent>
            </Card>
            <Card className="bg-card/50 border-cyan-500/30">
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground mb-1">Languages Preserved</p>
                <p className="text-3xl font-bold text-cyan-400">{languages.length}</p>
              </CardContent>
            </Card>
            <Card className="bg-card/50 border-green-500/30">
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground mb-1">Avg. Score</p>
                <p className="text-3xl font-bold text-green-400">
                  {submissions.length > 0
                    ? Math.round(submissions.reduce((sum, s) => sum + s.milsa_score, 0) / submissions.length)
                    : 0}
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card/50 border-accent/30">
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground mb-1">Eligible for Rewards</p>
                <p className="text-3xl font-bold text-accent">
                  {submissions.filter((s) => s.milsa_score >= 70).length}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="space-y-4 mb-8">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-purple-400 mb-2">Search</label>
                <Input
                  placeholder="Search by word or definition..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border-purple-500/30 bg-input text-foreground placeholder:text-muted-foreground focus:border-purple-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-purple-400 mb-2">Filter by Language</label>
                <select
                  value={filterLanguage}
                  onChange={(e) => setFilterLanguage(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-purple-500/30 bg-input text-foreground focus:border-purple-400 focus:outline-none"
                >
                  <option value="">All Languages</option>
                  {languages.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Submissions Grid */}
          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading vault...</p>
            </div>
          ) : filteredSubmissions.length === 0 ? (
            <Card className="bg-card/50 border-border/40">
              <CardContent className="pt-12 pb-12 text-center space-y-4">
                <p className="text-muted-foreground text-lg">No submissions yet</p>
                <Link href="/wizard">
                  <Button className="bg-gradient-to-r from-purple-500 to-cyan-400 hover:from-purple-600 hover:to-cyan-500 text-black font-semibold">
                    Make Your First Contribution
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {filteredSubmissions.map((sub) => (
                <Card key={sub.id} className="bg-card/50 border-cyan-400/30 hover:border-cyan-400/60 transition-colors">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-mono font-semibold text-cyan-300 text-lg">{sub.words_phrases}</p>
                          <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded">
                            {sub.content_type}
                          </span>
                          <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">{sub.language}</span>
                        </div>
                        <div className="flex items-center gap-4 flex-wrap">
                          <div>
                            <p className="text-xs text-muted-foreground">MILSA Score</p>
                            <p className={`text-2xl font-bold ${getScoreColor(sub.milsa_score)}`}>
                              {sub.milsa_score}/100
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Status</p>
                            {getStatusBadge(sub.quality_status)}
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Submitted {new Date(sub.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
