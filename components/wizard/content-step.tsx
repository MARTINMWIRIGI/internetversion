"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import type { WizardData } from "./types"

const CONTENT_TYPES = ["Word", "Phrase", "Sound", "Expression", "Proverb"]

interface ContentStepProps {
  onNext: (data: Partial<WizardData>) => void
  onBack: () => void
  data: Partial<WizardData>
}

export function ContentStep({ onNext, onBack, data }: ContentStepProps) {
  const [contentType, setContentType] = useState(data.contentType || "")
  const [words, setWords] = useState(data.words || "")
  const [definition, setDefinition] = useState(data.definition || "")
  const [context, setContext] = useState(data.context || "")

  const handleNext = () => {
    if (contentType && words.trim() && definition.trim()) {
      onNext({ contentType, words: words.trim(), definition: definition.trim(), context: context.trim() })
    }
  }

  const isValid = contentType && words.trim() && definition.trim()

  return (
    <Card className="bg-card/50 border-cyan-400/30">
      <CardHeader>
        <CardTitle className="text-cyan-400">Words & Context</CardTitle>
        <CardDescription>What linguistic element are you preserving?</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Content Type Selection */}
        <div>
          <label className="block text-sm font-medium text-cyan-400 mb-3">Content Type</label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {CONTENT_TYPES.map((type) => (
              <button
                key={type}
                onClick={() => setContentType(type)}
                className={`px-3 py-2 rounded-lg border text-sm transition-all ${
                  contentType === type
                    ? "border-cyan-400 bg-cyan-400/20 text-cyan-300 neon-glow-accent"
                    : "border-border hover:border-cyan-400/50 text-muted-foreground hover:text-foreground"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Words/Phrases Input */}
        <div>
          <label className="block text-sm font-medium text-purple-400 mb-2">
            {contentType || "Element"} in {data.language || "your language"}
          </label>
          <Input
            placeholder="Enter the word, phrase, or sound..."
            value={words}
            onChange={(e) => setWords(e.target.value)}
            className="border-purple-500/30 bg-input text-foreground placeholder:text-muted-foreground focus:border-purple-400 font-mono"
          />
        </div>

        {/* Definition */}
        <div>
          <label className="block text-sm font-medium text-purple-400 mb-2">Definition</label>
          <Textarea
            placeholder="Provide a clear definition in English..."
            value={definition}
            onChange={(e) => setDefinition(e.target.value)}
            rows={3}
            className="border-purple-500/30 bg-input text-foreground placeholder:text-muted-foreground focus:border-purple-400 resize-none"
          />
        </div>

        {/* Context */}
        <div>
          <label className="block text-sm font-medium text-purple-400 mb-2">Cultural Context (Optional)</label>
          <Textarea
            placeholder="Describe the cultural significance, historical background, or usage context..."
            value={context}
            onChange={(e) => setContext(e.target.value)}
            rows={2}
            className="border-purple-500/30 bg-input text-foreground placeholder:text-muted-foreground focus:border-purple-400 resize-none"
          />
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            onClick={onBack}
            variant="outline"
            className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10 bg-transparent"
          >
            ← Back
          </Button>
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
