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
}

const STEPS = [
  { id: 1, name: "Language", title: "Select Language" },
  { id: 2, name: "Content", title: "Words & Context" },
  { id: 3, name: "Audio", title: "Audio Recording" },
  { id: 4, name: "Metadata", title: "Additional Info" },
  { id: 5, name: "Review", title: "Review & Submit" },
  { id: 6, name: "Result", title: "Vault Entry Created" },
]

export default function WizardPage() {
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

  const handleSubmit = async (finalData: Partial<WizardData>) => {
    setIsSubmitting(true)
    try {
      const submission = { ...data, ...finalData }

      const response = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submission),
      })

      if (!response.ok) throw new Error("Submission failed")

      const result = await response.json()
      setData((prev) => ({ ...prev, ...result }))
      setCurrentStep(6)
    } catch (error) {
      console.error("Submission error:", error)
      alert("Error submitting to vault. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50">
      {/* Grid background */}
      <div className="fixed inset-0 grid-pattern opacity-20 pointer-events-none" />

      {/* Scan line */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 scan-line bg-gradient-to-b from-transparent via-purple-500 to-transparent opacity-5" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-blue-100 bg-white/80 backdrop-blur-md sticky top-0 z-50 soft-shadow">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between flex-col md:flex-row gap-4">
            <Link href="/">
              <Button variant="ghost" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                ← Back to Home
              </Button>
            </Link>
            <h1 className="text-2xl font-bold gradient-text">Contribution Wizard</h1>
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
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all soft-shadow ${
                      currentStep >= step.id
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                        : "bg-white border border-blue-200 text-muted-foreground"
                    }`}
                  >
                    {step.id}
                  </div>
                  {idx < STEPS.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-2 transition-all ${
                        currentStep > step.id ? "bg-gradient-to-r from-blue-600 to-purple-600" : "bg-blue-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Step Title */}
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold gradient-text mb-2">{STEPS[currentStep - 1].title}</h2>
              <p className="text-muted-foreground">
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
