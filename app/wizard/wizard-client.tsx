"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ProgressSteps } from "@/components/progress-steps"

// Simple wizard steps
const steps = ["Language", "Content", "Audio", "Review", "Mint"]

export default function WizardClient() {
  const [currentStep, setCurrentStep] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-purple-950 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Steps */}
        <Card className="bg-card/50 border-purple-500/30 mb-8">
          <CardContent className="pt-6">
            <ProgressSteps steps={steps} currentStep={currentStep} />
          </CardContent>
        </Card>

        {/* Step Content */}
        <Card className="bg-card/50 border-cyan-500/30">
          <CardHeader>
            <CardTitle className="text-cyan-400 text-center">
              {steps[currentStep]} Step
            </CardTitle>
            <CardDescription className="text-center">
              Contribute to preserving African vernacular languages
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Language Selection */}
            {currentStep === 0 && (
              <div className="text-center space-y-4">
                <p className="text-gray-300">Select the language you want to contribute to</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {["Swahili", "Kikuyu", "Luhya", "Kalenjin", "Kamba", "Somali", "Maasai", "Other"].map((lang) => (
                    <Button key={lang} variant="outline" className="border-purple-500/30 hover:bg-purple-500/10">
                      {lang}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Content Type */}
            {currentStep === 1 && (
              <div className="text-center space-y-4">
                <p className="text-gray-300">What type of content are you contributing?</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {["Word", "Phrase", "Proverb", "Song", "Story", "Pronunciation"].map((type) => (
                    <Button key={type} variant="outline" className="border-cyan-500/30 hover:bg-cyan-500/10">
                      {type}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between pt-6">
              <Button
                onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                disabled={currentStep === 0}
                variant="outline"
                className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10"
              >
                ← Back
              </Button>
              
              <Button
                onClick={() => setCurrentStep(prev => Math.min(steps.length - 1, prev + 1))}
                className="bg-gradient-to-r from-purple-500 to-cyan-400 hover:from-purple-600 hover:to-cyan-500 text-black font-semibold"
              >
                {currentStep === steps.length - 1 ? "Mint NFT" : "Continue →"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}