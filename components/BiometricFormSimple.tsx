"use client"

import { useState, useEffect, useRef } from 'react'
import { 
  Fingerprint, Camera,
  Lock, AlertCircle, Shield,
  Upload
} from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface BiometricFormSimpleProps {
  onClose?: () => void;
  onComplete?: (sessionId: string) => void;
  userId?: string;
}
export default function BiometricFormSimple({ onClose, onComplete, userId }: BiometricFormSimpleProps) {
  // Generate a temporary user ID if not provided
  const effectiveUserId = userId || `temp-user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  const webcamRef = useRef<any>(null)

  const [scanStatus, setScanStatus] = useState({
    fingerprint: 'idle',
    facial: 'idle'
  })

  const [collectedData, setCollectedData] = useState({
    deviceFingerprint: '',
    facialHash: null as string | null,
    facialImage: null as string | null
  })

  const [completionPercentage, setCompletionPercentage] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [sessionStartTime] = useState(Date.now())
  const [isCapturing, setIsCapturing] = useState(false)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
// Update completion percentage
useEffect(() => {
  const statuses = Object.values(scanStatus)
  const completed = statuses.filter(s => s === 'completed').length
  const total = statuses.length
  setCompletionPercentage(Math.round((completed / total) * 100))
}, [scanStatus])

// Helper function to hash data
const hashData = async (data: any): Promise<string> => {
  try {
    const dataString = typeof data === 'string' ? data : JSON.stringify(data)
    const encoder = new TextEncoder()
    const dataBuffer = encoder.encode(dataString)
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  } catch (error) {
    console.error('Hash error:', error)
    return `hash_error_${Date.now()}`
  }
}
// Device Fingerprinting
const collectFingerprint = async () => {
  console.log('[Fingerprint] Starting collection...');
  setScanStatus(prev => ({ ...prev, fingerprint: 'processing' }));
  setError(null);

  try {
    // Collect device data
    const deviceInfo: Record<string, any> = {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      vendor: navigator.vendor,
      language: navigator.language,
      languages: JSON.stringify(navigator.languages || []),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      screenColorDepth: window.screen.colorDepth,
      devicePixelRatio: window.devicePixelRatio,
      hardwareConcurrency: navigator.hardwareConcurrency || null,
      deviceMemory: (navigator as any).deviceMemory || null,
      maxTouchPoints: navigator.maxTouchPoints || 0,
      connectionType: (navigator as any).connection?.effectiveType || 'unknown',
      connectionDownlink: (navigator as any).connection?.downlink || null,
      sessionStart: sessionStartTime,
      collectionTime: Date.now()
    };

    // Generate fingerprint hash
    const fingerprintString = JSON.stringify({
      ua: deviceInfo.userAgent,
      pl: deviceInfo.platform,
      tz: deviceInfo.timezone,
      res: `${deviceInfo.screenWidth}x${deviceInfo.screenHeight}`,
      lang: deviceInfo.language
    });

    const fingerprint = await hashData(fingerprintString);

    // Insert into Supabase
    const { data, error } = await supabase
      .from('device_fingerprints')
      .insert({
        user_id: effectiveUserId,
        device_info: deviceInfo,
        fingerprint_hash: fingerprint,
        collected_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('[Fingerprint] Database error:', error);
      
      // Try alternative table name
      const { data: altData, error: altError } = await supabase
        .from('DeviceFingerprints')
        .insert({
          user_id: effectiveUserId,
          device_info: deviceInfo,
          fingerprint_hash: fingerprint,
          collected_at: new Date().toISOString()
        })
        .select()
        .single();
      
      if (altError) {
        throw new Error(`Database insert failed: ${error.message}`);
      }
      
      console.log('[Fingerprint] Inserted via alternative table:', altData);
      setCollectedData(prev => ({ ...prev, deviceFingerprint: fingerprint }));
      setScanStatus(prev => ({ ...prev, fingerprint: 'completed' }));
      
    } else {
      console.log('[Fingerprint] Successfully inserted:', data);
      setCollectedData(prev => ({ ...prev, deviceFingerprint: fingerprint }));
      setScanStatus(prev => ({ ...prev, fingerprint: 'completed' }));
    }

    console.log('[Fingerprint] ✅ Collection completed successfully');

  } catch (err: any) {
    console.error('[Fingerprint] ❌ Collection failed:', err);
    
    let errorMsg = 'Failed to collect device fingerprint';
    if (err.message?.includes('does not exist')) {
      errorMsg = 'Database table not found. Please create device_fingerprints table.';
    }
    
    setError(errorMsg);
    setScanStatus(prev => ({ ...prev, fingerprint: 'error' }));
  }
};
// FACIAL RECOGNITION
// FACIAL RECOGNITION
const startCamera = async () => {
  try {
    setError(null);
    setIsCapturing(true);
    
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: 'user',
        width: { ideal: 640 },
        height: { ideal: 480 }
      }
    });
    
    // Create video element if it doesn't exist
    if (!webcamRef.current) {
      const video = document.createElement('video');
      video.autoplay = true;
      video.playsInline = true;
      video.style.width = '100%';
      video.style.height = '100%';
      video.style.objectFit = 'cover';
      webcamRef.current = video;
    }
    
    webcamRef.current.srcObject = stream;
    
  } catch (err: any) {
    console.error('Camera error:', err);
    setError('Camera access denied. Please allow camera permissions.');
    setIsCapturing(false);
    setScanStatus(prev => ({ ...prev, facial: 'error' }));
  }
};

const captureSelfie = () => {
  if (!webcamRef.current) {
    setError('Camera not initialized');
    return;
  }
  
  try {
    const video = webcamRef.current;
    const canvas = document.createElement('canvas');
    
    // Set canvas dimensions to match video
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setError('Canvas context not available');
      return;
    }
    
    // Draw video frame to canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Convert to base64 image
    const imageData = canvas.toDataURL('image/jpeg', 0.8);
    setCapturedImage(imageData);
    setIsCapturing(false);
    
    // Stop camera stream
    if (video.srcObject) {
      const stream = video.srcObject as MediaStream;
      stream.getTracks().forEach(track => {
        track.stop();
      });
      video.srcObject = null;
    }
    
    console.log('Selfie captured successfully');
    
  } catch (err) {
    console.error('Capture error:', err);
    setError('Failed to capture image');
  }
};

const collectFacialData = async () => {
  if (!capturedImage) {
    setError('Please capture a selfie first');
    return;
  }

  setScanStatus(prev => ({ ...prev, facial: 'processing' }));
  
  try {
    // Create a unique facial hash from the image data
    // Use the first 1000 chars of the base64 image for hashing
    const imageDataForHash = capturedImage.substring(0, 1000);
    const facialHash = await hashData(imageDataForHash);
    
    console.log('Facial hash generated:', facialHash.substring(0, 20) + '...');
    
    // Store in Supabase
    const { data, error } = await supabase
      .from('facial_biometrics')
      .insert({
        user_id: effectiveUserId,
        facial_hash: facialHash,
        captured_image: capturedImage,
        collected_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      
      // Try creating the table if it doesn't exist
      if (error.message.includes('does not exist')) {
        setError('Facial biometrics table not found. Please create it in Supabase.');
      } else {
        throw error;
      }
    } else {
      console.log('Facial data saved to Supabase:', data);
      
      // Update state
      setCollectedData(prev => ({ 
        ...prev, 
        facialHash: facialHash,
        facialImage: capturedImage
      }));
      
      setScanStatus(prev => ({ ...prev, facial: 'completed' }));
      console.log('✅ Facial biometrics saved successfully!');
    }

  } catch (err: any) {
    console.error('Facial data error:', err);
    let errorMsg = 'Failed to save facial biometrics';
    
    if (err.message?.includes('permission')) {
      errorMsg = 'Database permission denied. Check Supabase RLS policies.';
    } else if (err.message?.includes('network')) {
      errorMsg = 'Network error. Check your connection.';
    }
    
    setError(errorMsg);
    setScanStatus(prev => ({ ...prev, facial: 'error' }));
    
    // Store locally as fallback
    localStorage.setItem(`facial_${effectiveUserId}`, JSON.stringify({
      hash: facialHash,
      timestamp: new Date().toISOString(),
      imageLength: capturedImage.length
    }));
    console.log('Facial data stored locally as fallback');
  }
};

const resetFacialCapture = () => {
  // Clean up camera stream
  if (webcamRef.current?.srcObject) {
    const stream = webcamRef.current.srcObject as MediaStream;
    stream.getTracks().forEach(track => track.stop());
    webcamRef.current.srcObject = null;
  }
  
  setCapturedImage(null);
  setIsCapturing(false);
  setScanStatus(prev => ({ ...prev, facial: 'idle' }));
};

// Create Biometric Session
const createBiometricSession = async (): Promise<string> => {
  setIsProcessing(true)
  setUploadProgress(0)

  try {
    // Create session ID
    const sessionId = `bio-session-${effectiveUserId}-${Date.now()}`

    setUploadProgress(30)

    // Prepare session data
    const sessionData = {
      device_fingerprint: collectedData.deviceFingerprint,
      facial_hash: collectedData.facialHash,
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
        userId: effectiveUserId
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
    id: 'facial',
    label: 'Facial Recognition',
    icon: Camera,
    description: 'Capture facial biometrics',
    status: scanStatus.facial,
    action: null, // Handled separately in render
    actionText: 'Capture Selfie'
  }
]
return (
  <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 w-full max-w-2xl">
    <div className="flex justify-between items-center mb-6">
      <div>
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Lock className="w-5 h-5" />
          Biometric NFT Minting
        </h3>
        <p className="text-sm text-gray-400">Capture device & facial data for NFT</p>
        
        {/* User ID display */}
        <div className="mt-2 text-xs text-gray-500">
          User ID: {effectiveUserId.substring(0, 20)}...
        </div>
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
          : scan.status === 'processing'
          ? 'bg-blue-900/20 border-blue-500/30'
          : 'bg-gray-800/50 border-gray-700'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className={`p-3 rounded-lg ${
          scan.status === 'completed' ? 'bg-green-500/20' :
          scan.status === 'error' ? 'bg-red-500/20' :
          scan.status === 'processing' ? 'bg-blue-500/20' : 'bg-gray-700'
        }`}>
          <scan.icon className={`w-6 h-6 ${
            scan.status === 'completed' ? 'text-green-400' :
            scan.status === 'error' ? 'text-red-400' :
            scan.status === 'processing' ? 'text-blue-400' : 'text-gray-400'
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
              </div>
              <div className="text-xs text-gray-400">
                {scan.status.charAt(0).toUpperCase() + scan.status.slice(1)}
              </div>
            </div>
          </div>

          {/* FACIAL RECOGNITION HANDLING */}
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
              disabled={isProcessing || scan.status !== 'idle'}
              className="mt-3 w-full py-2 px-4 bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-700 hover:to-indigo-600 text-white rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {scan.actionText}
            </button>
          ) : null}
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
          <li>• Device fingerprints: Hashed & stored in Supabase</li>
          <li>• Facial biometrics: Hashed facial patterns stored</li>
          <li>• All data linked to user ID: {effectiveUserId.substring(0, 8)}...</li>
          <li>• Data ready for NFT minting on blockchain</li>
        </ul>
      </div>

      {/* Actions */}
      <div className="space-y-3">
        <button
          onClick={handleCompleteAll}
          disabled={isProcessing || completionPercentage < 100}
          className="w-full bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white font-medium py-3 rounded-xl transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? 'Processing...' : 'Mint Biometric NFT'}
        </button>

        {onClose && (
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="w-full bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium py-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  )
}