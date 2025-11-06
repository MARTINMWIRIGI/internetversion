"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { WizardData } from "@/app/wizard/page"

interface AudioStepProps {
  onNext: (data: Partial<WizardData>) => void
  onBack: () => void
  data: Partial<WizardData>
}

function AudioWaveform({ isRecording, audioContext }: { isRecording: boolean; audioContext: AudioContext | null }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const animationIdRef = useRef<number | null>(null)

  useEffect(() => {
    if (!isRecording || !audioContext) return

    analyserRef.current = audioContext.createAnalyser()
    analyserRef.current.fftSize = 256

    const draw = () => {
      if (!canvasRef.current || !analyserRef.current) return

      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      const bufferLength = analyserRef.current.frequencyBinCount
      const dataArray = new Uint8Array(bufferLength)
      analyserRef.current.getByteFrequencyData(dataArray)

      ctx.fillStyle = "rgba(6, 20, 30, 0.2)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const barWidth = (canvas.width / bufferLength) * 2.5
      let barHeight
      let x = 0

      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0)
      gradient.addColorStop(0, "#00D9FF")
      gradient.addColorStop(0.5, "#A855F7")
      gradient.addColorStop(1, "#00D9FF")

      for (let i = 0; i < bufferLength; i++) {
        barHeight = (dataArray[i] / 255) * canvas.height

        ctx.fillStyle = gradient
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight)
        x += barWidth + 1
      }

      animationIdRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
    }
  }, [isRecording, audioContext])

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={100}
      className="w-full border border-cyan-400/30 rounded-lg bg-gradient-to-b from-slate-950 to-purple-950/20"
    />
  )
}

export function AudioStep({ onNext, onBack, data }: AudioStepProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [audioUrl, setAudioUrl] = useState<string>("")
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null)
  const mediaRecorder = useRef<MediaRecorder | null>(null)
  const audioChunks = useRef<Blob[]>([])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })

      const context = new (window.AudioContext || (window as any).webkitAudioContext)()
      setAudioContext(context)

      mediaRecorder.current = new MediaRecorder(stream)
      audioChunks.current = []

      mediaRecorder.current.ondataavailable = (e) => {
        audioChunks.current.push(e.data)
      }

      mediaRecorder.current.onstop = () => {
        const blob = new Blob(audioChunks.current, { type: "audio/webm" })
        setAudioBlob(blob)
        setAudioUrl(URL.createObjectURL(blob))
        if (audioContext) {
          audioContext.close()
          setAudioContext(null)
        }
      }

      mediaRecorder.current.start()
      setIsRecording(true)
    } catch (error) {
      console.error("Error accessing microphone:", error)
      alert("Unable to access microphone. Please check permissions.")
    }
  }

  const stopRecording = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.stop()
      mediaRecorder.current.stream.getTracks().forEach((track) => track.stop())
      setIsRecording(false)
    }
  }

  const handleNext = () => {
    if (audioUrl && audioBlob) {
      onNext({ audioUrl, audioBlob: audioBlob as any })
    }
  }

  useEffect(() => {
    return () => {
      if (audioUrl) URL.revokeObjectURL(audioUrl)
    }
  }, [audioUrl])

  return (
    <Card className="bg-card/50 border-green-400/30">
      <CardHeader>
        <CardTitle className="text-green-400">Audio Recording</CardTitle>
        <CardDescription>Record a clear pronunciation of your contribution</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Waveform Visualization */}
        {isRecording && audioContext && (
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-cyan-400">Live Waveform</label>
            <AudioWaveform isRecording={isRecording} audioContext={audioContext} />
          </div>
        )}

        {/* Recording Area */}
        <div className="border-2 border-dashed border-green-400/40 rounded-lg p-8 text-center space-y-4">
          <div className="flex justify-center">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center ${
                isRecording ? "bg-red-500/20 animate-pulse" : "bg-green-400/20"
              }`}
            >
              <div className={`w-10 h-10 rounded-full ${isRecording ? "bg-red-500 animate-pulse" : "bg-green-400"}`} />
            </div>
          </div>

          <div>
            <p className="text-foreground font-semibold mb-1">
              {isRecording ? "Recording..." : audioUrl ? "Recording saved" : "Ready to record"}
            </p>
            <p className="text-sm text-muted-foreground">
              {isRecording ? "Speak clearly and naturally" : "Click record to begin"}
            </p>
          </div>

          <div className="flex gap-4 justify-center flex-wrap">
            {!isRecording && !audioUrl && (
              <Button
                onClick={startRecording}
                className="bg-gradient-to-r from-green-500 to-cyan-400 hover:from-green-600 hover:to-cyan-500 text-black font-semibold"
              >
                Record Audio
              </Button>
            )}
            {isRecording && (
              <Button onClick={stopRecording} className="bg-red-500 hover:bg-red-600 text-white font-semibold">
                Stop Recording
              </Button>
            )}
            {audioUrl && (
              <>
                <Button
                  onClick={() => {
                    setAudioUrl("")
                    setAudioBlob(null)
                  }}
                  variant="outline"
                  className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10"
                >
                  Re-record
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Audio Playback */}
        {audioUrl && (
          <div className="space-y-3">
            <label className="block text-sm font-medium text-cyan-400">Playback</label>
            <audio src={audioUrl} controls className="w-full h-10 rounded-lg bg-card border border-cyan-400/30" />
            <p className="text-xs text-muted-foreground">
              Review your recording and re-record if needed for better quality. This will be minted as an NFT.
            </p>
          </div>
        )}

        {/* Pronunciation Guide */}
        <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 space-y-2">
          <p className="text-sm font-medium text-purple-400">Pronunciation Tips:</p>
          <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
            <li>Speak clearly and at a natural pace</li>
            <li>Minimize background noise</li>
            <li>Pronounce words as they would naturally be spoken</li>
            <li>Record in a quiet environment for best quality</li>
          </ul>
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
            disabled={!audioUrl}
            className="bg-gradient-to-r from-purple-500 to-cyan-400 hover:from-purple-600 hover:to-cyan-500 text-black font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue →
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
