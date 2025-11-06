"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { WizardData } from "@/app/wizard/page"

const LANGUAGES = [
  "English",
  "Swahili",
  "Kikuyu",
  "Luhya",
  "Kalenjin",
  "Kamba",
  "Somali",
  "Samburu",
  "Maasai",
  "Turkana",
  "Other",
]

interface LanguageStepProps {
  onNext: (data: Partial<WizardData>) => void
  data: Partial<WizardData>
}

export function LanguageStep({ onNext, data }: LanguageStepProps) {
  const [selected, setSelected] = useState(data.language || "")
  const [customLanguage, setCustomLanguage] = useState("")

  const handleNext = () => {
    if (selected === "Other" && customLanguage.trim()) {
      onNext({ language: customLanguage })
    } else if (selected && selected !== "Other") {
      onNext({ language: selected })
    }
  }

  const isValid = selected && (selected !== "Other" || customLanguage.trim())

  return (
    <Card className="bg-card/50 border-purple-500/30">
      <CardHeader>
        <CardTitle className="text-purple-400">Select Your Language</CardTitle>
        <CardDescription>Choose the Kenyan language you'll be contributing in</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {LANGUAGES.map((lang) => (
            <button
              key={lang}
              onClick={() => {
                setSelected(lang)
                if (lang !== "Other") setCustomLanguage("")
              }}
              className={`px-4 py-2 rounded-lg border transition-all ${
                selected === lang
                  ? "border-cyan-400 bg-cyan-400/20 text-cyan-300 neon-glow-accent"
                  : "border-border hover:border-cyan-400/50 text-muted-foreground hover:text-foreground"
              }`}
            >
              {lang}
            </button>
          ))}
        </div>

        {selected === "Other" && (
          <div>
            <label className="block text-sm font-medium text-purple-400 mb-2">Enter language name</label>
            <Input
              placeholder="e.g., Rendille, Borana, Somali..."
              value={customLanguage}
              onChange={(e) => setCustomLanguage(e.target.value)}
              className="border-purple-500/30 bg-input text-foreground placeholder:text-muted-foreground focus:border-purple-400"
            />
          </div>
        )}

        <div className="flex justify-end">
          <Button
            onClick={handleNext}
            disabled={!isValid}
            className="bg-gradient-to-r from-purple-500 to-cyan-400 hover:from-purple-600 hover:to-cyan-500 text-black font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue →
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
