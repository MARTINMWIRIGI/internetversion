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
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between flex-col md:flex-row gap-4">
          <Link href="/">
            <Button variant="ghost" className="text-slate-700 hover:text-slate-900 hover:bg-slate-100">
              ← Back to Home
            </Button>
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Contribution Wizard</h1>
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
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all shadow-sm ${
                    currentStep >= step.id
                      ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white"
                      : "bg-slate-100 border border-slate-300 text-slate-600"
                  }`}
                >
                  {step.id}
                </div>
                {idx < STEPS.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-2 transition-all ${
                      currentStep > step.id ? "bg-gradient-to-r from-amber-500 to-orange-600" : "bg-slate-300"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step Title */}
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">{STEPS[currentStep - 1].title}</h2>
            <p className="text-slate-600">
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
    </main>
  )
}
