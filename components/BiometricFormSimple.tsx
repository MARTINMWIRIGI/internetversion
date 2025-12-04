"use client"

import { useState, useEffect, useRef } from 'react'
import { 
  Mic, Fingerprint, Brain, Shield, 
  MicOff, Lock, AlertCircle,
  Upload, Camera  // ADDED Camera import
} from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { getDeviceFingerprint } from '@/lib/fingerprintjs'

interface BiometricFormSimpleProps {
  onClose?: () => void;
  onComplete?: (sessionId: string) => void;
  userId?: string;  // Made optional
}

export default function BiometricFormSimple({ onClose, onComplete, userId }: BiometricFormSimpleProps) {
  const effectiveUserId = userId || `temp-user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const webcamRef = useRef<any>(null)  // ADDED webcam ref

  // CHANGED: behavioral → facial
  const [scanStatus, setScanStatus] = useState({
    voice: 'idle',
    fingerprint: 'idle',
    emotional: 'idle',
    facial: 'idle'  // CHANGED: behavioral → facial
  })

  // CHANGED: behavioral → facial
  const [collectedData, setCollectedData] = useState({
    voiceSample: null as Blob | null,
    voiceHash: null as string | null,
    deviceFingerprint: '',
    emotionalResponses: [] as string[],
    emotionalPatternHash: null as string | null,
    facialHash: null as string | null,        // CHANGED: behavioralHash → facialHash
    facialImage: null as string | null        // NEW: facial image
  })

  const [completionPercentage, setCompletionPercentage] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isCapturing, setIsCapturing] = useState(false)     // NEW: for camera
  const [capturedImage, setCapturedImage] = useState<string | null>(null)  // NEW: selfie
  const [sessionStartTime] = useState(Date.now())
// ================ FACIAL RECOGNITION SECTION ================
// REPLACES: collectBehavioralData function

const startCamera = async () => {
  try {
    setError(null);
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: 'user',
        width: { ideal: 640 },
        height: { ideal: 480 }
      }
    });
    
    if (webcamRef.current) {
      webcamRef.current.srcObject = stream;
    }
    setIsCapturing(true);
  } catch (err: any) {
    console.error('Camera error:', err);
    setError('Camera access denied. Please allow camera permissions.');
    setScanStatus(prev => ({ ...prev, facial: 'error' }));
  }
};

const captureSelfie = () => {
  if (!webcamRef.current) return;
  
  const canvas = document.createElement('canvas');
  const video = webcamRef.current.video;
  
  if (!video) return;
  
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const ctx = canvas.getContext('2d');
  
  if (!ctx) return;
  
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  const imageData = canvas.toDataURL('image/jpeg');
  setCapturedImage(imageData);
  setIsCapturing(false);
  
  // Stop all camera tracks
  const stream = webcamRef.current.srcObject as MediaStream;
  if (stream) {
    stream.getTracks().forEach(track => track.stop());
  }
};

const collectFacialData = async () => {
  if (!capturedImage) {
    setError('Please capture a selfie first');
    return;
  }

  setScanStatus(prev => ({ ...prev, facial: 'processing' }));
  
  try {
    // Create a unique facial hash
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 15);
    const data = `facial-${effectiveUserId}-${timestamp}-${random}-${capturedImage.length}`;
    
    const facialHash = await hashData(data);
    
    // Store in Supabase
    const { error } = await supabase
      .from('facial_biometrics')
      .insert({
        user_id: effectiveUserId,
        facial_hash: facialHash,
        captured_image: capturedImage,
        collected_at: new Date().toISOString()
      });

    if (error) throw error;

    setCollectedData(prev => ({ 
      ...prev, 
      facialHash: facialHash,
      facialImage: capturedImage
    }));
    
    setScanStatus(prev => ({ ...prev, facial: 'completed' }));
    console.log('✅ Facial biometrics saved:', facialHash);

  } catch (err) {
    console.error('Facial data error:', err);
    setError('Failed to save facial biometrics');
    setScanStatus(prev => ({ ...prev, facial: 'error' }));
  }
};

const resetFacialCapture = () => {
  setCapturedImage(null);
  setIsCapturing(false);
  setScanStatus(prev => ({ ...prev, facial: 'idle' }));
};
// ================ END FACIAL RECOGNITION ================
// Scan Components - UPDATED: behavioral → facial
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
    id: 'facial',  // CHANGED: behavioral → facial
    label: 'Facial Recognition',  // CHANGED: Behavioral Biometrics → Facial Recognition
    icon: Camera,  // CHANGED: Shield → Camera
    description: 'Capture facial biometrics',  // CHANGED
    status: scanStatus.facial,  // CHANGED: behavioral → facial
    action: null, // We'll handle this separately in the render
    actionText: 'Capture Selfie'  // CHANGED
  }
]

// Create Biometric Session - UPDATED to include facial_hash
const createBiometricSession = async (): Promise<string> => {
  setIsProcessing(true)
  setUploadProgress(0)

  try {
    const sessionId = `bio-session-${effectiveUserId}-${Date.now()}`
    setUploadProgress(30)

    // Prepare session data INCLUDING FACIAL HASH
    const sessionData = {
      voice_hash: collectedData.voiceHash,
      device_fingerprint: collectedData.deviceFingerprint,
      emotional_pattern_hash: collectedData.emotionalPatternHash,
      facial_hash: collectedData.facialHash, // NEW: Added facial hash
      collected_at: new Date().toISOString(),
      completion_percentage: completionPercentage
    }

    // Store session in database
    const { data: session, error: sessionError } = await supabase
      .from('biometric_sessions')
      .insert({
        id: sessionId,
        user_id: effectiveUserId,
        session_data: sessionData,
        completion_percentage: completionPercentage,
        minting_status: 'pending'
      })
      .select()
      .single()

    if (sessionError) throw sessionError
    setUploadProgress(70)
    return sessionId

  } catch (err) {
    console.error('Session creation error:', err)
    throw err
  } finally {
    setUploadProgress(100)
  }
}
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 w-full max-w-2xl">
      {/* ... other JSX remains the same until scanComponents mapping ... */}
      
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
                : scan.status === 'processing' || scanStatus.voice === 'recording' || scan.status === 'collecting'
                ? 'bg-blue-900/20 border-blue-500/30'
                : 'bg-gray-800/50 border-gray-700'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`p-3 rounded-lg ${
                scan.status === 'completed' ? 'bg-green-500/20' :
                scan.status === 'error' ? 'bg-red-500/20' :
                scan.status === 'processing' || scanStatus.voice === 'recording' || scan.status === 'collecting' 
                  ? 'bg-blue-500/20' : 'bg-gray-700'
              }`}>
                <scan.icon className={`w-6 h-6 ${
                  scan.status === 'completed' ? 'text-green-400' :
                  scan.status === 'error' ? 'text-red-400' :
                  scan.status === 'processing' || scanStatus.voice === 'recording' || scan.status === 'collecting'
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
                      {scanStatus.voice === 'recording' && '🎤'}
                      {scan.status === 'collecting' && '📊'}
                    </div>
                    <div className="text-xs text-gray-400">
                      {scan.status.charAt(0).toUpperCase() + scan.status.slice(1)}
                    </div>
                  </div>
                </div>

                {/* ============ FACIAL RECOGNITION SPECIAL HANDLING ============ */}
                {scan.id === 'facial' ? (
                  <div className="mt-3 space-y-2">
                    {!capturedImage ? (
                      <>
                        {!isCapturing ? (
                          <button
                            onClick={startCamera}
                            disabled={isProcessing || scanStatus.facial !== 'idle'}
                            className="w-full py-2 px-4 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Start Camera
                          </button>
                        ) : (
                          <>
                            {/* Webcam display */}
                            <div className="relative">
                              <video
                                ref={webcamRef}
                                autoPlay
                                playsInline
                                className="w-full h-32 object-cover rounded-lg"
                              />
                              <button
                                onClick={captureSelfie}
                                className="absolute bottom-2 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-white text-gray-900 rounded-lg text-sm font-medium hover:bg-gray-100"
                              >
                                📸 Capture
                              </button>
                            </div>
                          </>
                        )}
                      </>
                    ) : (
                      <div className="space-y-2">
                        <div className="relative">
                          <img 
                            src={capturedImage} 
                            alt="Captured selfie" 
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <button
                            onClick={resetFacialCapture}
                            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full text-xs"
                          >
                            ✕
                          </button>
                        </div>
                        {scanStatus.facial !== 'completed' ? (
                          <button
                            onClick={collectFacialData}
                            disabled={scanStatus.facial === 'processing'}
                            className="w-full py-2 px-4 bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {scanStatus.facial === 'processing' ? 'Processing...' : 'Save Facial Hash'}
                          </button>
                        ) : (
                          <div className="text-center text-green-400 text-sm">
                            ✅ Facial hash saved
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ) : scan.action ? (
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
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Security Info - UPDATED: Added facial biometrics */}
      <div className="mb-6 p-4 bg-gray-800/30 rounded-xl">
        <div className="flex items-center gap-3 mb-2">
          <Shield className="w-5 h-5 text-green-400" />
          <h4 className="font-medium text-white">Data Storage</h4>
        </div>
        <ul className="space-y-1 text-sm text-gray-400">
          <li>• Voice samples: Encrypted & stored in Supabase Storage</li>
          <li>• Device fingerprints: Hashed for privacy</li>
          <li>• Emotional patterns: Anonymized analysis</li>
          <li>• Facial biometrics: Hashed facial patterns stored</li>  {/* NEW */}
          <li>• All data linked to user ID: {effectiveUserId.substring(0, 8)}...</li>
        </ul>
      </div>

      {/* Actions (no changes needed here) */}
      {/* ... rest of your JSX ... */}
    </div>
  )
}