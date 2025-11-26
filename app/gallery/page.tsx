// app/gallery/page.tsx
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

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

// Force static rendering for Cloudflare Pages
export const dynamic = "force-static"

// Fetch submissions at build time
async function getSubmissions(): Promise<NFTSubmission[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/submissions`, {
    next: { revalidate: 60 }, // optional ISR
  })
  return res.json()
}

export default async function GalleryPage() {
  const submissions = await getSubmissions()

  const languages = [...new Set(submissions.map((s) => s.language))]

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-green-600"
    if (score >= 70) return "text-amber-600"
    return "text-muted-foreground"
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-12">
        <header className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <h1 className="text-2xl font-bold gradient-text">Gallery of Language NFTs</h1>
        </header>

        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {/* Filters could be static here or handled with client JS if you want */}
          <p className="text-sm text-muted-foreground">Filters will work client-side if needed</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {submissions.map((sub) => (
            <Card key={sub.id} className="bg-white/80 border-blue-200 soft-shadow hover:shadow-lg transition">
              <CardContent>
                <p className="font-mono font-semibold text-blue-600 text-lg">{sub.words_phrases}</p>
                <div className="flex flex-wrap gap-2 my-1">
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">{sub.language}</span>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">{sub.content_type}</span>
                </div>
                <div className="flex items-center gap-4 my-2">
                  <p className={`text-2xl font-bold ${getScoreColor(sub.milsa_score)}`}>{sub.milsa_score}/100</p>
                </div>
                {sub.nftMetadataUrl && (
                  <Link
                    href={sub.nftMetadataUrl}
                    target="_blank"
                    className="text-cyan-400 underline mt-2 block"
                  >
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
      </div>
    </main>
  )
}