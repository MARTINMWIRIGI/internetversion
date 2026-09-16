"use client"

import { useState } from "react"
import { ProgressSteps } from "@/components/progress-steps"
import { LanguageStep } from "@/components/wizard/language-step"
import { ContentStep } from "@/components/wizard/content-step"
import { AudioStep } from "@/components/wizard/audio-step"
import { MetadataStep } from "@/components/wizard/metadata-step"
import { ReviewStep } from "@/components/wizard/review-step"
import { MintStep } from "@/components/wizard/mint-step"
import type { WizardData } from "@/components/wizard/types"

const steps = ["Language", "Content", "Audio", "Details", "Review", "Mint"]

export default function WizardClient() {
  const [currentStep, setCurrentStep] = useState(0)
  const [wizardData, setWizardData] = useState<Partial<WizardData>>({})

  const updateAndNext = (data: Partial<WizardData>) => {
    setWizardData(prev => ({ ...prev, ...data }))
    setCurrentStep(prev => Math.min(steps.length - 1, prev + 1))
  }

  const prevStep = () => setCurrentStep(prev => Math.max(0, prev - 1))

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-purple-950 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <ProgressSteps steps={steps} currentStep={currentStep} />
        </div>

        {currentStep === 0 && (
          <LanguageStep onNext={updateAndNext} data={wizardData} />
        )}
        {currentStep === 1 && (
          <ContentStep onNext={updateAndNext} onBack={prevStep} data={wizardData} />
        )}
        {currentStep === 2 && (
          <AudioStep onNext={updateAndNext} onBack={prevStep} data={wizardData} />
        )}
        {currentStep === 3 && (
          <MetadataStep onNext={updateAndNext} onBack={prevStep} data={wizardData} />
        )}
        {currentStep === 4 && (
          <ReviewStep
            onSubmit={updateAndNext}
            onBack={prevStep}
            data={wizardData}
            isSubmitting={false}
          />
        )}
        {currentStep === 5 && (
          <MintStep wizardData={wizardData} onBack={prevStep} />
        )}
      </div>
    </div>
  )
}
