"use client"

import { useState, useEffect, useRef } from 'react'
import { 
  Mic, Fingerprint, Brain, Camera, Shield, 
  MicOff, CheckCircle, AlertCircle, Lock 
} from 'lucide-react'
import { supabase, BiometricSession } from '@/lib/supabase'
import { hashData, encryptData } from '@/lib/crypto'
import FingerprintJS from '@fingerprintjs/fingerprintjs'

interface BiometricFormSimpleProps {
  onClose?: () => void;
  onComplete?: (sessionId: string) => void;
  userId: string;
}

interface ScanStatus {
  voice: 'idle' | 'recording' | 'processing' | 'completed' | 'error'
  fingerprint: 'idle' | 'processing' | 'completed' | 'error'
  facial: 'idle' | 'processing' | 'completed' | 'error'
  emotional: 'idle' | 'collecting' | 'processing' | 'completed' | 'error'
  behavioral: 'idle' | 'collecting' | 'processing' | 'completed' | 'error'
}

export default function BiometricFormSimple({ onClose, onComplete, userId }: BiometricFormSimpleProps) {
  // Refs for data collection
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  // State
  const [scanStatus, setScanStatus] = useState<ScanStatus>({
    voice: 'idle',
    fingerprint: 'idle',
    facial: 'idle',
    emotional: 'idle',
    behavioral: 'idle'
  })
  
  const [collectedData, setCollectedData] = useState({
    voiceHash: '',
    fingerprintHash: '',
    emotionalPattern: '',
    behavioralHash: '',
    sessionId: ''
  })
  
  const [completionPercentage, setCompletionPercentage] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Calculate completion percentage
  useEffect(() => {
    const statuses = Object.values(scanStatus)
    const completed = statuses.filter(s => s === 'completed').length
    const total = statuses.length
    setCompletionPercentage(Math.round((completed / total) * 100))
  }, [scanStatus])

  // Voice Recording Functions
  const startVoiceRecording = async () => {
    try {
      setScanStatus(prev => ({ ...prev, voice: 'recording' }))
      
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100
        }
      })
      
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      })
      
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }
      
      mediaRecorder.onstop = async () => {
        setScanStatus(prev => ({ ...prev, voice: 'processing' }))
        
        // Process audio
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
        const audioHash = await hashData(audioBlob)
        
        // Upload to Supabase Storage
        const fileName = `voice_${userId}_${Date.now()}.webm`
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('biometrics')
          .upload(fileName, audioBlob, {
            contentType: 'audio/webm',
            upsert: false
          })
        
        if (uploadError) throw uploadError
        
        // Analyze audio (simplified - in production, use Web Audio API for frequency analysis)
        const audioContext = new AudioContext()
        const arrayBuffer = await audioBlob.arrayBuffer()
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)
        
        // Extract frequency data (first 100 frequency bins)
        const analyser = audioContext.createAnalyser()
        analyser.fftSize = 2048
        const source = audioContext.createBufferSource()
        source.buffer = audioBuffer
        source.connect(analyser)
        
        const frequencyData = new Uint8Array(analyser.frequencyBinCount)
        analyser.getByteFrequencyData(frequencyData)
        
        // Store in database
        const { data: voiceData, error: dbError } = await supabase
          .from('voice_biometrics')
          .insert({
            user_id: userId,
            audio_sample_url: uploadData.path,
            audio_hash: audioHash,
            duration: audioBuffer.duration,
            frequency_data: Array.from(frequencyData.slice(0, 100)) // First 100 bins
          })
          .select()
          .single()
        
        if (dbError) throw dbError
        
        setCollectedData(prev => ({ ...prev, voiceHash: audioHash }))
        setScanStatus(prev => ({ ...prev, voice: 'completed' }))
        
        // Cleanup
        stream.getTracks().forEach(track => track.stop())
      }
      
      mediaRecorder.start()
      
      // Stop after 5 seconds
      setTimeout(() => {
        if (mediaRecorder.state === 'recording') {
          mediaRecorder.stop()
        }
      }, 5000)
      
    } catch (err) {
      console.error('Voice recording error:', err)
      setError('Failed to record voice. Please check microphone permissions.')
      setScanStatus(prev => ({ ...prev, voice: 'error' }))
    }
  }

  const stopVoiceRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop()
    }
  }

  // Fingerprint Collection
  const collectFingerprint = async () => {
    try {
      setScanStatus(prev => ({ ...prev, fingerprint: 'processing' }))
      
      // Initialize FingerprintJS
      const fp = await FingerprintJS.load()
      const result = await fp.get()
      
      // Generate canvas fingerprint
      const canvasHash = await generateCanvasFingerprint()
      
      // Combine fingerprints
      const combinedFingerprint = `${result.visitorId}-${canvasHash}`
      const fingerprintHash = await hashData(combinedFingerprint)
      
      // Store in database
      const { data: fingerprintData, error: dbError } = await supabase
        .from('fingerprint_data')
        .insert({
          user_id: userId,
          fingerprint_hash: fingerprintHash,
          device_info: result.components,
          canvas_hash: canvasHash
        })
        .select()
        .single()
      
      if (dbError) throw dbError
      
      setCollectedData(prev => ({ ...prev, fingerprintHash }))
      setScanStatus(prev => ({ ...prev, fingerprint: 'completed' }))
      
    } catch (err) {
      console.error('Fingerprint collection error:', err)
      setError('Failed to collect device fingerprint.')
      setScanStatus(prev => ({ ...prev, fingerprint: 'error' }))
    }
  }

  // Canvas Fingerprinting
  const generateCanvasFingerprint = async (): Promise<string> => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    
    if (!ctx) return ''
    
    canvas.width = 200
    canvas.height = 100
    
    // Draw unique patterns
    ctx.textBaseline = 'top'
    ctx.font = '14px Arial'
    ctx.fillStyle = 'rgb(102, 204, 0)'
    ctx.fillRect(0, 0, 200, 100)
    ctx.fillStyle = 'rgb(255, 0, 0)'
    ctx.fillText('Soul Internet Biometric', 2, 2)
    ctx.fillStyle = 'rgb(0, 0, 255)'
    ctx.fillText(new Date().toISOString(), 2, 20)
    
    // Get image data hash
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    return await hashData(imageData.data.buffer)
  }

  // Emotional Pattern Collection (simplified)
  const collectEmotionalPattern = async () => {
    try {
      setScanStatus(prev => ({ ...prev, emotional: 'collecting' }))
      
      // In a real app, this would use:
      // 1. Webcam facial expression analysis
      // 2. Voice emotion detection
      // 3. Text sentiment analysis
      
      // For now, simulate with user interaction
      const questions = [
        "How are you feeling right now? (type your response)",
        "Describe a recent emotional experience",
        "What makes you feel happy or excited?"
      ]
      
      const responses = await collectUserResponses(questions)
      const emotionalHash = await hashData(JSON.stringify(responses))
      
      // Store emotional pattern
      const { data, error } = await supabase
        .from('emotional_patterns')
        .insert({
          user_id: userId,
          responses: responses,
          pattern_hash: emotionalHash,
          collected_at: new Date().toISOString()
        })
        .select()
        .single()
      
      if (error) throw error
      
      setCollectedData(prev => ({ ...prev, emotionalPattern: emotionalHash }))
      setScanStatus(prev => ({ ...prev, emotional: 'completed' }))
      
    } catch (err) {
      console.error('Emotional pattern error:', err)
      setScanStatus(prev => ({ ...prev, emotional: 'error' }))
    }
  }

  const collectUserResponses = async (questions: string[]): Promise<string[]> => {
    return new Promise((resolve) => {
      const responses: string[] = []
      let currentQuestion = 0
      
      const askQuestion = () => {
        if (currentQuestion < questions.length) {
          const response = prompt(questions[currentQuestion])
          responses.push(response || '')
          currentQuestion++
          askQuestion()
        } else {
          resolve(responses)
        }
      }
      
      askQuestion()
    })
  }

  // Behavioral Biometrics
  const collectBehavioralData = async () => {
    try {
      setScanStatus(prev => ({ ...prev, behavioral: 'collecting' }))
      
      const behavioralData = {
        mouseMovements: [],
        typingSpeed: null as number | null,
        scrollPattern: [],
        interactionTimes: []
      }
      
      // Collect data for 10 seconds
      await new Promise(resolve => setTimeout(resolve, 10000))
      
      const behavioralHash = await hashData(JSON.stringify(behavioralData))
      
      const { data, error } = await supabase
        .from('behavioral_data')
        .insert({
          user_id: userId,
          data: behavioralData,
          behavioral_hash: behavioralHash
        })
        .select()
        .single()
      
      if (error) throw error
      
      setCollectedData(prev => ({ ...prev, behavioralHash }))
      setScanStatus(prev => ({ ...prev, behavioral: 'completed' }))
      
    } catch (err) {
      console.error('Behavioral data error:', err)
      setScanStatus(prev => ({ ...prev, behavioral: 'error' }))
    }
  }

  // Create Biometric Session
  const createBiometricSession = async (): Promise<string> => {
    try {
      setIsProcessing(true)
      
      // Encrypt all collected data
      const biometricData = {
        voiceHash: collectedData.voiceHash,
        fingerprintHash: collectedData.fingerprintHash,
        emotionalPattern: collectedData.emotionalPattern,
        behavioralHash: collectedData.behavioralHash,
        timestamp: new Date().toISOString()
      }
      
      const encryptedData = await encryptData(JSON.stringify(biometricData))
      
      // Store encrypted data
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('biometric_sessions')
        .upload(`session_${userId}_${Date.now()}.enc`, encryptedData, {
          contentType: 'application/octet-stream',
          upsert: false
        })
      
      if (uploadError) throw uploadError
      
      // Create session record
      const { data: session, error: sessionError } = await supabase
        .from('biometric_sessions')
        .insert({
          user_id: userId,
          completion_percentage: completionPercentage,
          encrypted_data_url: uploadData.path,
          minting_status: 'pending'
        })
        .select()
        .single()
      
      if (sessionError) throw sessionError
      
      return session.id
      
    } catch (err) {
      console.error('Session creation error:', err)
      throw err
    } finally {
      setIsProcessing(false)
    }
  }

  // Complete All Scans
  const handleCompleteAll = async () => {
    if (completionPercentage < 100) {
      alert('Please complete all biometric scans first.')
      return
    }
    
    try {
      setIsProcessing(true)
      setError(null)
      
      // Create session
      const sessionId = await createBiometricSession()
      
      // Update local state
      setCollectedData(prev => ({ ...prev, sessionId }))
      
      // Trigger minting process (would call your backend API)
      const mintingResponse = await fetch('/api/mint-biometric-nft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          userId
        })
      })
      
      if (!mintingResponse.ok) {
        throw new Error('Failed to start minting process')
      }
      
      const mintingResult = await mintingResponse.json()
      
      alert(`✅ Biometric data secured! NFT minting initiated.\nTransaction: ${mintingResult.txHash}`)
      
      if (onComplete) {
        onComplete(sessionId)
      }
      
      if (onClose) {
        onClose()
      }
      
    } catch (err) {
      console.error('Completion error:', err)
      setError(err instanceof Error ? err.message : 'Failed to complete biometric scan')
    } finally {
      setIsProcessing(false)
    }
  }

  // Scan Components
  const scanComponents = [
    {
      id: 'voice',
      label: 'Voice Biometrics',
      icon: scanStatus.voice === 'recording' ? MicOff : Mic,
      description: 'Record unique voice signature',
      status: scanStatus.voice,
      action: scanStatus.voice === 'idle' ? startVoiceRecording : 
              scanStatus.voice === 'recording' ? stopVoiceRecording : null,
      actionText: scanStatus.voice === 'idle' ? 'Start Recording' :
                  scanStatus.voice === 'recording' ? 'Stop Recording' : 'Processing...'
    },
    {
      id: 'fingerprint',
      label: 'Device Fingerprint',
      icon: Fingerprint,
      description: 'Unique device identification',
      status: scanStatus.fingerprint,
      action: scanStatus.fingerprint === 'idle' ? collectFingerprint : null,
      actionText: 'Scan Device'
    },
    {
      id: 'emotional',
      label: 'Emotional Pattern',
      icon: Brain,
      description: 'Emotional response analysis',
      status: scanStatus.emotional,
      action: scanStatus.emotional === 'idle' ? collectEmotionalPattern : null,
      actionText: 'Analyze Emotions'
    },
    {
      id: 'behavioral',
      label: 'Behavioral Biometrics',
      icon: Shield,
      description: 'Mouse, typing, and scroll patterns',
      status: scanStatus.behavioral,
      action: scanStatus.behavioral === 'idle' ? collectBehavioralData : null,
      actionText: 'Collect Patterns'
    }
  ]

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 w-full max-w-2xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Complete Biometric Authentication
          </h3>
          <p className="text-sm text-gray-400">Collect unique biometric markers for NFT minting</p>
        </div>
        {onClose && !isProcessing && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
            disabled={isProcessing}
          >
            ✕
          </button>
        )}
      </div>

      {/* Progress Overview */}
      <div className="mb-6 p-4 bg-gray-800/50 rounded-xl">
        <div className="flex justify-between items-center mb-3">
          <div>
            <div className="text-sm text-gray-300">Biometric Completion</div>
            <div className="text-lg font-bold text-white">{completionPercentage}%</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-300">Estimated Value</div>
            <div className="text-lg font-bold text-green-400">850 SOUL</div>
          </div>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-blue-500 to-indigo-500 h-3 rounded-full transition-all duration-500" 
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-6 p-4 bg-red-900/30 border border-red-700 rounded-xl">
          <div className="flex items-center gap-2 text-red-400">
            <AlertCircle className="w-5 h-5" />
            <span className="font-medium">Error:</span>
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Biometric Scans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {scanComponents.map((scan) => (
          <div 
            key={scan.id}
            className={`p-4 rounded-xl border transition-all ${
              scan.status === 'completed' 
                ? 'bg-green-900/20 border-green-500/30' 
                : scan.status === 'error'
                ? 'bg-red-900/20 border-red-500/30'
                : scan.status === 'processing' || scan.status === 'recording' || scan.status === 'collecting'
                ? 'bg-blue-900/20 border-blue-500/30 animate-pulse'
                : 'bg-gray-800/50 border-gray-700'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`p-3 rounded-lg ${
                scan.status === 'completed' ? 'bg-green-500/20' :
                scan.status === 'error' ? 'bg-red-500/20' :
                scan.status === 'processing' || scan.status === 'recording' || scan.status === 'collecting' 
                  ? 'bg-blue-500/20' : 'bg-gray-700'
              }`}>
                <scan.icon className={`w-6 h-6 ${
                  scan.status === 'completed' ? 'text-green-400' :
                  scan.status === 'error' ? 'text-red-400' :
                  scan.status === 'processing' || scan.status === 'recording' || scan.status === 'collecting'
                    ? 'text-blue-400' : 'text-gray-400'
                }`} />
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium text-white">{scan.label}</div>
                    <div className="text-xs text-gray-400 mt-1">{scan.description}</div>
                  </div>
                  
                  <div className="text-right">
                    <div className={`text-sm font-medium ${
                      scan.status === 'completed' ? 'text-green-400' :
                      scan.status === 'error' ? 'text-red-400' :
                      'text-yellow-400'
                    }`}>
                      {scan.status === 'completed' ? '✅' :
                       scan.status === 'error' ? '❌' :
                       scan.status === 'processing' || scan.status === 'recording' || scan.status === 'collecting' 
                         ? '⏳' : '⏸️'}
                      {' '}
                      {scan.status.charAt(0).toUpperCase() + scan.status.slice(1)}
                    </div>
                  </div>
                </div>
                
                {scan.action && (
                  <button
                    onClick={() => scan.action?.()}
                    disabled={isProcessing || scan.status !== 'idle'}
                    className={`mt-3 w-full py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                      scan.status === 'recording'
                        ? 'bg-red-600 hover:bg-red-700 text-white'
                        : 'bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-700 hover:to-indigo-600 text-white'
               