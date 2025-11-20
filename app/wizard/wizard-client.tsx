"use client"

import { useState } from "react"
import { LanguageStep } from "@/components/wizard/language-step"
import { ContentStep } from "@/components/wizard/content-step"
import { AudioStep } from "@/components/wizard/audio-step"
import { MetadataStep } from "@/components/wizard/metadata-step"
import { ReviewStep } from "@/components/wizard/review-step"
import { ResultStep } from "@/components/wizard/result-step"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export type WizardData = {
  language: string
  contentType: string
  words: string
  definition: string
  context: string
  pronunciation: string
  audioUrl?: string
  videoUrl?: string
  walletAddress: string
  milsaScore?: number
  feedback?: string
  status?: string
  nftMetadataUrl?: string
}

const STEPS = [
  { id: 1, name: "Language", title: "Select Language" },
  { id: 2, name: "Content", title: "Words & Context" },
  { id: 3, name: "Audio", title: "Audio Recording" },
  { id: 4, name: "Metadata", title: "Additional Info" },
  { id: 5, name: "Review", title: "Review & Submit" },
  { id: 6, name: "Result", title: "Vault Entry Created" },
]

export default function WizardPageClient() {
  const [currentStep, setCurrentStep] = useState(1)
  const [data, setData] = useState<Partial<WizardData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleNext = (stepData: Partial<WizardData>) => {
    setData((prev) => ({ ...prev, ...stepData }))
    setCurrentStep((prev) => prev + 1)
  }

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1))
  }

  // -----------------------------
  // NFT Minting Helper
  // -----------------------------
  async function mintNFT(data: Partial<WizardData>): Promise<string> {
    try {
      const metadata = {
        name: data.words,
        description: data.definition,
        attributes: [
          { trait_type: "Language", value: data.language },
          { trait_type: "Content Type", value: data.contentType },
          { trait_type: "Pronunciation", value: data.pronunciation },
        ],
        image: data.audioUrl, // storing audio URL for simplicity
      }

      const response = await fetch("/api/mint-nft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ metadata, walletAddress: data.walletAddress }),
      })

      if (!response.ok) throw new Error("NFT minting failed")
      const result = await response.json()
      return result.nftMetadataUrl
    } catch (err) {
      console.error("Mint NFT error:", err)
      throw err
    }
  }

  // -----------------------------
  // Submit Wizard Data
  // -----------------------------
  const handleSubmit = async (finalData: Partial<WizardData>) => {
    setIsSubmitting(true)
    try {
      const submission = { ...data, ...finalData }

      // 1️⃣ Mint NFT
      const nftMetadataUrl = await mintNFT(submission)

      // 2️⃣ Send submission to backend
      const response = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...submission, nftMetadataUrl }),
      })

      if (!response.ok) throw new Error("Submission failed")
      const result = await response.json()

      setData((prev) => ({ ...prev, ...result, nftMetadataUrl }))
      setCurrentStep(6)
    } catch (error) {
      console.error("Submission error:", error)
      alert("Error submitting to vault. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // -----------------------------
  // Render Wizard Steps
  // -----------------------------
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-950 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/30 rounded-full animate-pulse"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 2}s` }}
          ></div>
        ))}
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-purple-500/20 bg-gradient-to-b from-purple-900/20 to-transparent backdrop-blur-md sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between flex-col md:flex-row gap-4">
            <Link href="/">
              <Button variant="ghost" className="text-cyan-400 hover:text-cyan-300 hover:bg-purple-500/20">
                ← Back to Home
              </Button>
            </Link>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Contribution Wizard
            </h1>
            <div className="w-24" />
          </div>
        </header>

        {/* Progress Bar */}
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-8 overflow-x-auto pb-2">
              {STEPS.map((step, idx) => (
                <div key={step.id} className="flex items-center flex-1 min-w-max">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                      currentStep >= step.id
                        ? "bg-gradient-to-r from-purple-500 to-cyan-400 text-black shadow-lg shadow-purple-500/50"
                        : "bg-purple-900/30 border border-purple-500/30 text-purple-400"
                    }`}
                  >
                    {step.id}
                  </div>
                  {idx < STEPS.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-2 transition-all ${
                        currentStep > step.id ? "bg-gradient-to-r from-purple-500 to-cyan-400" : "bg-purple-900/30"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Step Title */}
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
                {STEPS[currentStep - 1].title}
              </h2>
              <p className="text-purple-400/70">
                Step {currentStep} of {STEPS.length}
              </p>
            </div>
          </div>
        </div>

        {/* Wizard Content */}
        <div className="container mx-auto px-4 pb-12">
          <div className="max-w-2xl mx-auto">
            {currentStep === 1 && <LanguageStep onNext={handleNext} data={data} />}
            {currentStep === 2 && <ContentStep onNext={handleNext} onBack={handleBack} data={data} />}
            {currentStep === 3 && <AudioStep onNext={handleNext} onBack={handleBack} data={data} />}
            {currentStep === 4 && <MetadataStep onNext={handleNext} onBack={handleBack} data={data} />}
            {currentStep === 5 && (
              <ReviewStep onSubmit={handleSubmit} onBack={handleBack} data={data} isSubmitting={isSubmitting} />
            )}
            {currentStep === 6 && <ResultStep data={data} />}
          </div>
        </div>
      </div>
    </main>
  )
}