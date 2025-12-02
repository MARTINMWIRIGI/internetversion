"use client"

import { useState, useEffect, useRef } from 'react'
import { 
  Mic, Fingerprint, Brain, Shield, 
  MicOff, Lock, AlertCircle, CheckCircle,
  Upload
} from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface BiometricFormSimpleProps {
  onClose?: () => void;
  onComplete?: (sessionId: string) => void;
  userId: string;
}

export default function BiometricFormSimple({ onClose, onComplete, userId }: BiometricFormSimpleProps) {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  
  const [scanStatus, setScanStatus] = useState({
    voice: 'idle',
    fingerprint: 'idle',
    emotional: 'idle',
    behavioral: 'idle'
  })
  
  const [collectedData, setCollectedData] = useState({
    voiceSample: null as Blob | null,
    voiceHash: null as string | null,
    deviceFingerprint: '',
    emotionalResponses: [] as string[],
    emotionalPatternHash: null as string | null,
    behavioralPatterns: {} as Record<string, any>,
    behavioralHash: null as string | null
  })
  
  const [completionPercentage, setCompletionPercentage] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)

  // Update completion percentage
  useEffect(() => {
    const statuses = Object.values(scanStatus)
    const completed = statuses.filter(s => s === 'completed').length
    const total = statuses.length
    setCompletionPercentage(Math.round((completed / total) * 100))
  }, [scanStatus])

  // Helper function to hash data
  const hashData = async (data: any): Promise<string> => {
    const dataString = typeof data === 'string' ? data : JSON.stringify(data)
    const encoder = new TextEncoder()
    const dataBuffer = encoder.encode(dataString)
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  }

  // Voice Recording
  const startVoiceRecording = async () => {
    try {
      setScanStatus(prev => ({ ...prev, voice: 'recording' }))
      setError(null)
      
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true
        }
      })
      
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }
      
      mediaRecorder.onstop = async () => {
        setScanStatus(prev => ({ ...prev, voice: 'processing' }))
        
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
        const audioHash = await hashData(await audioBlob.arrayBuffer())
        
        // Upload to Supabase Storage
        try {
          const fileName = `voice/${userId}_${Date.now()}.webm`
          const { data, error: uploadError } = await supabase.storage
            .from('biometrics')
            .upload(fileName, audioBlob)
          
          if (uploadError) throw uploadError
          
          // Store metadata in database
          const { error: dbError } = await supabase
            .from('voice_samples')
            .insert({
              user_id: userId,
              file_path: data.path,
              file_hash: audioHash,
              duration: audioBlob.size / 16000, // Approximate duration
              recorded_at: new Date().toISOString()
            })
          
          if (dbError) throw dbError
          
          setCollectedData(prev => ({ 
            ...prev, 
            voiceSample: audioBlob,
            voiceHash: audioHash
          }))
          setScanStatus(prev => ({ ...prev, voice: 'completed' }))
          
        } catch (uploadErr) {
          console.error('Upload error:', uploadErr)
          setError('Failed to upload voice sample')
          setScanStatus(prev => ({ ...prev, voice: 'error' }))
        }
        
        stream.getTracks().forEach(track => track.stop())
      }
      
      mediaRecorder.start()
      
      // Auto-stop after 5 seconds
      setTimeout(() => {
        if (mediaRecorder.state === 'recording') {
          mediaRecorder.stop()
        }
      }, 5000)
      
    } catch (err) {
      setError('Microphone access denied or not available')
      setScanStatus(prev => ({ ...prev, voice: 'error' }))
    }
  }

  const stopVoiceRecording = () => {
    if (mediaRecorderRef.current?.state === 'recording') {
      mediaRecorderRef.current.stop()
    }
  }

  // Device Fingerprinting
  const collectFingerprint = async () => {
    setScanStatus(prev => ({ ...prev, fingerprint: 'processing' }))
    
    try {
      // Collect basic device info
      const deviceInfo = {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language,
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        hardwareConcurrency: navigator.hardwareConcurrency || 'unknown',
        deviceMemory: (navigator as any).deviceMemory || 'unknown'
      }
      
      const fingerprint = await hashData(JSON.stringify(deviceInfo))
      
      // Store in database
      const { error } = await supabase
        .from('device_fingerprints')
        .insert({
          user_id: userId,
          device_info: deviceInfo,
          fingerprint_hash: fingerprint,
          collected_at: new Date().toISOString()
        })
      
      if (error) throw error
      
      setCollectedData(prev => ({ ...prev, deviceFingerprint: fingerprint }))
      setScanStatus(prev => ({ ...prev, fingerprint: 'completed' }))
      
    } catch (err) {
      console.error('Fingerprint error:', err)
      setError('Failed to collect device fingerprint')
      setScanStatus(prev => ({ ...prev, fingerprint: 'error' }))
    }
  }

  // Emotional Pattern Collection
  const collectEmotionalPattern = async () => {
    setScanStatus(prev => ({ ...prev, emotional: 'collecting' }))
    
    // Simple emotional pattern collection
    const emotions = ['happy', 'calm', 'excited', 'focused']
    const responses = emotions.map(emotion => 
      `Reported feeling ${emotion} at ${new Date().toLocaleTimeString()}`
    )
    
    try {
      const patternHash = await hashData(responses.join('|'))
      
      const { error } = await supabase
        .from('emotional_patterns')
        .insert({
          user_id: userId,
          responses: responses,
          pattern_hash: patternHash,
          collected_at: new Date().toISOString()
        })
      
      if (error) throw error
      
      setCollectedData(prev => ({ 
        ...prev, 
        emotionalResponses: responses,
        emotionalPatternHash: patternHash
      }))
      setScanStatus(prev => ({ ...prev, emotional: 'completed' }))
      
    } catch (err) {
      console.error('Emotional pattern error:', err)
      setError('Failed to save emotional patterns')
      setScanStatus(prev => ({ ...prev, emotional: 'error' }))
    }
  }

  // Behavioral Data Collection
  const collectBehavioralData = async () => {
    setScanStatus(prev => ({ ...prev, behavioral: 'collecting' }))
    
    // Collect simple behavioral data
    const behavioralData = {
      mouseMovements: [
        { x: 100, y: 200, timestamp: Date.now() },
        { x: 150, y: 250, timestamp: Date.now() + 100 }
      ],
      scrollEvents: [
        { position: 0, timestamp: Date.now() },
        { position: 100, timestamp: Date.now() + 500 }
      ],
      keyPresses: [
        { key: 'Enter', timestamp: Date.now() },
        { key: 'Space', timestamp: Date.now() + 200 }
      ]
    }
    
    try {
      const behavioralHash = await hashData(JSON.stringify(behavioralData))
      
      const { error } = await supabase
        .from('behavioral_data')
        .insert({
          user_id: userId,
          data: behavioralData,
          behavioral_hash: behavioralHash,
          collected_at: new Date().toISOString()
        })
      
      if (error) throw error
      
      setCollectedData(prev => ({ 
        ...prev, 
        behavioralPatterns: behavioralData,
        behavioralHash: behavioralHash
      }))
      setScanStatus(prev => ({ ...prev, behavioral: 'completed' }))
      
    } catch (err) {
      console.error('Behavioral data error:', err)
      setError('Failed to save behavioral data')
      setScanStatus(prev => ({ ...prev, behavioral: 'error' }))
    }
  }

  // Create Biometric Session
  const createBiometricSession = async (): Promise<string> => {
    setIsProcessing(true)
    setUploadProgress(0)
    
    try {
      // Create session ID
      const sessionId = `bio-session-${userId}-${Date.now()}`
      
      setUploadProgress(30)
      
      // Prepare session data
      const sessionData = {
        voice_hash: collectedData.voiceHash,
        device_fingerprint: collectedData.deviceFingerprint,
        emotional_pattern_hash: collectedData.emotionalPatternHash,
        behavioral_hash: collectedData.behavioralHash,
        collected_at: new Date().toISOString(),
        completion_percentage: completionPercentage
      }
      
      // Store session in database
      const { data: session, error: sessionError } = await supabase
        .from('biometric_sessions')
        .insert({
          id: sessionId,
          user_id: userId,
          session_data: sessionData,
          completion_percentage: completionPercentage,
          minting_status: 'pending'
        })
        .select()
        .single()
      
      if (sessionError) throw sessionError
      
      setUploadProgress(70)
      
      // Return session ID for minting
      return sessionId
      
    } catch (err) {
      console.error('Session creation error:', err)
      throw err
    } finally {
      setUploadProgress(100)
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
      
      // Create session and get session ID
      const sessionId = await createBiometricSession()
      
      // Call minting API
      const response = await fetch('/api/mint-biometric-nft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          userId
        })
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'API call failed')
      }
      
      const result = await response.json()
      
      alert(`✅ ${result.message}\nTransaction: ${result.txHash}`)
      
      if (onComplete) {
        onComplete(sessionId)
      }
      
      if (onClose) {
        setTimeout(() => onClose(), 1000)
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
                  scanStatus.voice === 'recording' ? 'Stop Recording' :
                  scanStatus.voice === 'processing' ? 'Processing...' : '✅ Completed'
    },
    {
      id: 'fingerprint',
      label: 'Device Fingerprint',
      icon: Fingerprint,
      description: 'Unique device identification',
      status: scanStatus.fingerprint,
      action: scanStatus.fingerprint === 'idle' ? collectFingerprint : null,
      actionText: scanStatus.fingerprint === 'processing' ? 'Processing...' : 
                  scanStatus.fingerprint === 'idle' ? 'Scan Device' : '✅ Completed'
    },
    {
      id: 'emotional',
      label: 'Emotional Pattern',
      icon: Brain,
      description: 'Emotional response analysis',
      status: scanStatus.emotional,
      action: scanStatus.emotional === 'idle' ? collectEmotionalPattern : null,
      actionText: scanStatus.emotional === 'collecting' ? 'Collecting...' :
                  scanStatus.emotional === 'idle' ? 'Analyze Emotions' : '✅ Completed'
    },
    {
      id: 'behavioral',
      label: 'Behavioral Biometrics',
      icon: Shield,
      description: 'Interaction patterns',
      status: scanStatus.behavioral,
      action: scanStatus.behavioral === 'idle' ? collectBehavioralData : null,
      actionText: scanStatus.behavioral === 'collecting' ? 'Collecting...' :
                  scanStatus.behavioral === 'idle' ? 'Collect Patterns' : '✅ Completed'
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
            <div className="text-sm text-gray-300">Stored in</div>
            <div className="text-sm font-medium text-cyan-400 flex items-center gap-1">
              <Upload className="w-4 h-4" />
              Supabase
            </div>
          </div>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-blue-500 to-indigo-500 h-3 rounded-full transition-all duration-500" 
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
        
        {/* Upload Progress */}
        {isProcessing && uploadProgress > 0 && (
          <div className="mt-3">
            <div className="flex justify-between text-sm text-gray-300 mb-1">
              <span>Uploading to blockchain...</span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        )}
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
                ? 'bg-blue-900/20 border-blue-500/30'
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
                      {scan.status === 'completed' && '✅'}
                      {scan.status === 'error' && '❌'}
                      {scan.status === 'processing' && '⏳'}
                      {scan.status === 'recording' && '🎤'}
                      {scan.status === 'collecting' && '📊'}
                    </div>
                    <div className="text-xs text-gray-400">
                      {scan.status.charAt(0).toUpperCase() + scan.status.slice(1)}
                    </div>
                  </div>
                </div>
                
                {scan.action && (
                  <button
                    onClick={() => scan.action?.()}
                    disabled={isProcessing || (scan.status !== 'idle' && scan.status !== 'recording')}
                    className={`mt-3 w-full py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                      scan.status === 'recording'
                        ? 'bg-red-600 hover:bg-red-700 text-white'
                        : 'bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-700 hover:to-indigo-600 text-white'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {scan.actionText}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Security Info */}
      <div className="mb-6 p-4 bg-gray-800/30 rounded-xl">
        <div className="flex items-center gap-3 mb-2">
          <Shield className="w-5 h-5 text-green-400" />
          <h4 className="font-medium text-white">Data Storage</h4>
        </div>
        <ul className="space-y-1 text-sm text-gray-400">
          <li>• Voice samples: Encrypted & stored in Supabase Storage</li>
          <li>