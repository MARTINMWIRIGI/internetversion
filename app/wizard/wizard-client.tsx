"use client"

import { useState } from "react"
import { ProgressSteps } from "@/components/progress-steps"
import { LanguageStep } from "@/components/wizard/language-step"
import { ContentStep } from "@/components/wizard/content-step"
import { AudioStep } from "@/components/wizard/audio-step"
import type { WizardData } from "@/components/wizard/types"

const steps = ["Language", "Content", "Audio", "Review", "Mint"]

export default function WizardClient() {
  const [currentStep, setCurrentStep] = useState(0)
  const [wizardData, setWizardData] = useState<Partial<WizardData>>({})

  const updateWizardData = (newData: Partial<WizardData>) => {
    setWizardData(prev => ({ ...prev, ...newData }))
  }

  const nextStep = () => setCurrentStep(prev => Math.min(steps.length - 1, prev + 1))
  const prevStep = () => setCurrentStep(prev => Math.max(0, prev - 1))

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-purple-950 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Steps */}
        <div className="mb-8">
          <ProgressSteps steps={steps} currentStep={currentStep} />
        </div>

        {/* Step Content */}
        {currentStep === 0 && (
          <LanguageStep 
            onNext={(data) => {
              updateWizardData(data)
              nextStep()
            }}
            data={wizardData}
          />
        )}
        {currentStep === 1 && (
          <ContentStep 
            onNext={(data) => {
              updateWizardData(data)
              nextStep()
            }}
            onBack={prevStep}
            data={wizardData}
          />
        )}
        {currentStep === 2 && (
          <AudioStep 
            onNext={(data) => {
              updateWizardData(data)
              nextStep()
            }}
            onBack={prevStep}
            data={wizardData}
          />
        )}
        {currentStep === 3 && (
          <div className="text-center space-y-6">
            <h2 className="text-2xl font-bold text-green-400">Review Your Contribution</h2>
            <div className="bg-card/50 border-green-500/30 rounded-lg p-6 space-y-4">
              <p><strong>Language:</strong> {wizardData.language}</p>
              <p><strong>Content Type:</strong> {wizardData.contentType}</p>
              <p><strong>Words/Phrases:</strong> {wizardData.words}</p>
              {wizardData.audioUrl && (
                <audio src={wizardData.audioUrl} controls className="w-full" />
              )}
            </div>
            <div className="flex justify-between">
              <button onClick={prevStep} className="btn-secondary">← Back</button>
              <button onClick={nextStep} className="btn-primary">Mint NFT →</button>
            </div>
          </div>
        )}
        {currentStep === 4 && (
          <div className="text-center space-y-6">
            <h2 className="text-2xl font-bold text-purple-400">Mint Your Language NFT</h2>
            <div className="bg-card/50 border-purple-500/30 rounded-lg p-6">
              <p className="text-gray-300 mb-4">Ready to mint your linguistic contribution as an NFT on Polygon!</p>
              <button className="btn-primary">Mint Now</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}