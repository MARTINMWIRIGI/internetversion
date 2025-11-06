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
    if (score >= 85) return "text-green-600"
    if (score >= 70) return "text-amber-600"
    return "text-slate-600"
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

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between flex-col md:flex-row gap-4">
          <Link href="/">
            <Button variant="ghost" className="text-slate-700 hover:text-slate-900 hover:bg-slate-100">
              ← Back to Home
            </Button>
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">My Vault</h1>
          <Link href="/wizard">
            <Button className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold shadow-md">
              New Contribution
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-amber-50 to-white border-amber-200 shadow-sm">
            <CardContent className="pt-6">
              <p className="text-sm text-slate-600 mb-1">Total Contributions</p>
              <p className="text-3xl font-bold text-amber-600">{submissions.length}</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-orange-50 to-white border-orange-200 shadow-sm">
            <CardContent className="pt-6">
              <p className="text-sm text-slate-600 mb-1">Languages Preserved</p>
              <p className="text-3xl font-bold text-orange-600">{languages.length}</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-50 to-white border-green-200 shadow-sm">
            <CardContent className="pt-6">
              <p className="text-sm text-slate-600 mb-1">Avg. Score</p>
              <p className="text-3xl font-bold text-green-600">
                {submissions.length > 0
                  ? Math.round(submissions.reduce((sum, s) => sum + s.milsa_score, 0) / submissions.length)
                  : 0}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-slate-50 to-white border-slate-200 shadow-sm">
            <CardContent className="pt-6">
              <p className="text-sm text-slate-600 mb-1">Reward Eligible</p>
              <p className="text-3xl font-bold text-slate-900">
                {submissions.filter((s) => s.milsa_score >= 70).length}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="space-y-4 mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-2">Search</label>
              <Input
                placeholder="Search by word or definition..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-slate-300 bg-white text-slate-900 placeholder:text-slate-500 focus:border-amber-500 focus:ring-amber-500/20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-2">Filter by Language</label>
              <select
                value={filterLanguage}
                onChange={(e) => setFilterLanguage(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
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
            <p className="text-slate-600">Loading vault...</p>
          </div>
        ) : filteredSubmissions.length === 0 ? (
          <Card className="bg-slate-50 border-slate-200 shadow-sm">
            <CardContent className="pt-12 pb-12 text-center space-y-4">
              <p className="text-slate-600 text-lg">No submissions yet</p>
              <Link href="/wizard">
                <Button className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold">
                  Make Your First Contribution
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {filteredSubmissions.map((sub) => (
              <Card key={sub.id} className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between gap-4 flex-col md:flex-row">
                    <div className="flex-1 space-y-2 w-full">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-mono font-semibold text-slate-900 text-lg">{sub.words_phrases}</p>
                        <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded font-medium">
                          {sub.content_type}
                        </span>
                        <span className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded font-medium">
                          {sub.language}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 flex-wrap">
                        <div>
                          <p className="text-xs text-slate-600">MILSA Score</p>
                          <p className={`text-2xl font-bold ${getScoreColor(sub.milsa_score)}`}>
                            {sub.milsa_score}/100
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-600">Status</p>
                          {getStatusBadge(sub.quality_status)}
                        </div>
                      </div>
                      <p className="text-xs text-slate-500">
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
    </main>
  )
}
