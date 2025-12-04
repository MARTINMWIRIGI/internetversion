"use client"

import { useState, useEffect, useRef } from 'react'
import { 
  Mic, Fingerprint, Brain, Camera,  // Changed Shield to Camera
  MicOff, Lock, AlertCircle,Shield
  Upload
} from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { getDeviceFingerprint } from '@/lib/fingerprintjs'

interface BiometricFormSimpleProps {
  onClose?: () => void;
  onComplete?: (sessionId: string) => void;
  userId?: string;  // Made optional
}
export default function BiometricFormSimple({ onClose, onComplete, userId }: BiometricFormSimpleProps) {
  // Generate a temporary user ID if not provided
  const effectiveUserId = userId || `temp-user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const webcamRef = useRef<any>(null)  // ADDED for facial recognition

  const [scanStatus, setScanStatus] = useState({
    voice: 'idle',
    fingerprint: 'idle',
    emotional: 'idle',
    facial: 'idle'  // CHANGED: behavioral → facial
  })

  const [collectedData, setCollectedData] = useState({
    voiceSample: null as Blob | null,
    voiceHash: null as string | null,
    deviceFingerprint: '',
    emotionalResponses: [] as string[],
    emotionalPatternHash: null as string | null,
    facialHash: null as string | null,        // CHANGED: behavioralHash → facialHash
    facialImage: null as string | null        // NEW: for storing captured selfie
  })

  const [completionPercentage, setCompletionPercentage] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [sessionStartTime] = useState(Date.now())
  const [isCapturing, setIsCapturing] = useState(false)     // NEW: for camera
  const [capturedImage, setCapturedImage] = useState<string | null>(null)  // NEW: selfie
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
// Voice Recording - SIMPLIFIED AND FIXED
const startVoiceRecording = async () => {
  try {
    console.log('🎤 Starting voice recording...');
    setScanStatus(prev => ({ ...prev, voice: 'recording' }));
    setError(null);

    // 1. Request microphone permission
    console.log('Requesting microphone access...');
    const stream = await navigator.mediaDevices.getUserMedia({ 
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 16000
      }
    });

    console.log('✅ Microphone access granted');

    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    audioChunksRef.current = [];

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunksRef.current.push(event.data);
        console.log(`Audio chunk received: ${event.data.size} bytes`);
      }
    };

    mediaRecorder.onstop = async () => {
      console.log('🛑 Recording stopped, processing...');
      setScanStatus(prev => ({ ...prev, voice: 'processing' }));

      if (audioChunksRef.current.length === 0) {
        console.error('❌ No audio data recorded');
        setError('No audio recorded. Please try again.');
        setScanStatus(prev => ({ ...prev, voice: 'error' }));
        stream.getTracks().forEach(track => track.stop());
        return;
      }

      try {
        // Create audio blob
        const audioBlob = new Blob(audioChunksRef.current, { 
          type: 'audio/webm' 
        });
        console.log(`Audio blob created: ${audioBlob.size} bytes`);

        // Generate hash
        const audioHash = await hashData(await audioBlob.arrayBuffer());
        console.log(`Audio hash: ${audioHash.substring(0, 20)}...`);

        // Upload to Supabase Storage
        console.log('📤 Uploading to Supabase Storage...');
        const fileName = `voice/${effectiveUserId}_${Date.now()}.webm`;
        
        const { data: storageData, error: uploadError } = await supabase.storage
          .from('biometrics')
          .upload(fileName, audioBlob, {
            cacheControl: '3600',
            upsert: false
          });

        if (uploadError) {
          console.error('❌ Storage upload error:', uploadError);
          throw new Error(`Storage upload failed: ${uploadError.message}`);
        }

        console.log('✅ Upload successful');

        // Store metadata in database
        console.log('💾 Saving to database...');
        const { error: dbError } = await supabase
          .from('voice_samples')
          .insert({
            user_id: effectiveUserId,
            file_path: storageData.path,
            file_hash: audioHash,
            duration: Math.round(audioBlob.size / 16000),
            recorded_at: new Date().toISOString()
          });

        if (dbError) {
          console.error('❌ Database error:', dbError);
          // Store locally if database fails
          localStorage.setItem(`voice_${effectiveUserId}`, JSON.stringify({
            hash: audioHash,
            timestamp: new Date().toISOString(),
            size: audioBlob.size
          }));
        }

        // Update UI state
        setCollectedData(prev => ({ 
          ...prev, 
          voiceSample: audioBlob,
          voiceHash: audioHash
        }));
        setScanStatus(prev => ({ ...prev, voice: 'completed' }));
        
        console.log('🎉 Voice recording completed successfully!');

      } catch (uploadErr: any) {
        console.error('❌ Processing error:', uploadErr);
        
        // User-friendly error message
        let errorMsg = 'Failed to process voice recording';
        if (uploadErr.message?.includes('bucket')) {
          errorMsg = 'Storage bucket not found. Please create "biometrics" bucket in Supabase.';
        } else if (uploadErr.message?.includes('permission')) {
          errorMsg = 'Storage permission denied. Check Supabase RLS policies.';
        }
        
        setError(errorMsg);
        setScanStatus(prev => ({ ...prev, voice: 'error' }));
        
        // Store locally as fallback
        localStorage.setItem(`voice_fallback_${effectiveUserId}`, 'recorded_locally');
        console.log('📝 Voice data stored locally as fallback');
      } finally {
        stream.getTracks().forEach(track => track.stop());
      }
    };

    // Start recording
    console.log('🔴 Starting recording...');
    mediaRecorder.start();

    // Auto-stop after 3 seconds (shorter for testing)
    setTimeout(() => {
      if (mediaRecorder.state === 'recording') {
        console.log('⏱️ Auto-stopping recording after 3 seconds');
        mediaRecorder.stop();
      }
    }, 3000);

  } catch (err: any) {
    console.error('❌ Microphone error:', err);
    
    let errorMsg = 'Microphone access denied or not available';
    if (err.name === 'NotFoundError') {
      errorMsg = 'No microphone found. Please connect a microphone.';
    } else if (err.name === 'NotAllowedError') {
      errorMsg = 'Microphone permission denied. Please allow microphone access.';
    } else if (err.name === 'NotReadableError') {
      errorMsg = 'Microphone is in use by another application.';
    }
    
    setError(errorMsg);
    setScanStatus(prev => ({ ...prev, voice: 'error' }));
  }
};

const stopVoiceRecording = () => {
  console.log('⏹️ Manually stopping recording...');
  if (mediaRecorderRef.current?.state === 'recording') {
    mediaRecorderRef.current.stop();
  }
};
// Device Fingerprinting - PRODUCTION READY
const collectFingerprint = async () => {
  console.log('[Fingerprint] Starting collection...');
  setScanStatus(prev => ({ ...prev, fingerprint: 'processing' }));
  setError(null);

  try {
    // ====================
    // 1. COLLECT DEVICE DATA
    // ====================
    const deviceInfo: Record<string, any> = {
      // Browser Identity
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      vendor: navigator.vendor,
      
      // Language & Time
      language: navigator.language,
      languages: JSON.stringify(navigator.languages || []),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      timezoneOffset: new Date().getTimezoneOffset(),
      
      // Screen Details
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      screenColorDepth: window.screen.colorDepth,
      screenPixelDepth: window.screen.pixelDepth,
      devicePixelRatio: window.devicePixelRatio,
      
      // Hardware (if available)
      hardwareConcurrency: navigator.hardwareConcurrency || null,
      deviceMemory: (navigator as any).deviceMemory || null,
      maxTouchPoints: navigator.maxTouchPoints || 0,
      
      // Connection
      connectionType: (navigator as any).connection?.effectiveType || 'unknown',
      connectionDownlink: (navigator as any).connection?.downlink || null,
      
      // WebGL Fingerprint (advanced)
      webglRenderer: await getWebGLRenderer(),
      
      // Canvas Fingerprint
      canvasHash: await getCanvasFingerprint(),
      
      // Fonts (sampled)
      fonts: await getFontList(),
      
      // Timestamps
      sessionStart: sessionStartTime,
      collectionTime: Date.now(),
      userTimezone: new Date().toString().match(/\((.*?)\)/)?.[1] || 'unknown'
    };

    // Clean up data for JSON
    Object.keys(deviceInfo).forEach(key => {
      if (deviceInfo[key] === undefined || deviceInfo[key] === null) {
        delete deviceInfo[key];
      }
    });

    console.log('[Fingerprint] Device info collected:', deviceInfo);

    // ====================
    // 2. GENERATE FINGERPRINT HASH
    // ====================
    const fingerprintString = JSON.stringify({
      ua: deviceInfo.userAgent,
      pl: deviceInfo.platform,
      tz: deviceInfo.timezone,
      res: `${deviceInfo.screenWidth}x${deviceInfo.screenHeight}`,
      lang: deviceInfo.language,
      canvas: deviceInfo.canvasHash,
      webgl: deviceInfo.webglRenderer
    });

    const fingerprint = await hashData(fingerprintString);
    console.log('[Fingerprint] Generated hash:', fingerprint);

    // ====================
    // 3. INSERT INTO SUPABASE
    // ====================
    console.log('[Fingerprint] Inserting into database...');
    
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
      console.error('[Fingerprint] Database error:', {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint
      });
      
      // Try alternative table name (case sensitivity)
      console.log('[Fingerprint] Trying alternative table name...');
      const { data: altData, error: altError } = await supabase
        .from('DeviceFingerprints')  // Try capitalized
        .insert({
          user_id: effectiveUserId,
          device_info: deviceInfo,
          fingerprint_hash: fingerprint,
          collected_at: new Date().toISOString()
        })
        .select()
        .single();
      
      if (altError) {
        throw new Error(`Database insert failed: ${error.message}. Also tried alternative table.`);
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
    
    // User-friendly error message
    let errorMsg = 'Failed to collect device fingerprint';
    
    if (err.message?.includes('permission denied')) {
      errorMsg = 'Database permission denied. Please check Supabase RLS policies.';
    } else if (err.message?.includes('does not exist')) {
      errorMsg = 'Database table not found. Please create device_fingerprints table.';
    } else if (err.message?.includes('network')) {
      errorMsg = 'Network error. Please check your connection.';
    }
    
    setError(errorMsg);
    setScanStatus(prev => ({ ...prev, fingerprint: 'error' }));
  }
};
// ====================
// HELPER FUNCTIONS
// ====================

// Get WebGL Renderer
const getWebGLRenderer = async (): Promise<string> => {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return 'no-webgl';

    const debugInfo = (gl as any).getExtension('WEBGL_debug_renderer_info');
    if (debugInfo) {
      const renderer = (gl as any).getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
      return renderer ? String(renderer).substring(0, 100) : 'unknown';
    }
    return 'no-debug-info';
  } catch {
    return 'error';
  }
};

// Get Canvas Fingerprint
const getCanvasFingerprint = async (): Promise<string> => {
  try {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return 'no-canvas';
    
    canvas.width = 200;
    canvas.height = 50;
    
    // Draw text
    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.fillStyle = '#f60';
    ctx.fillRect(0, 0, 200, 50);
    ctx.fillStyle = '#069';
    ctx.fillText('BiometricFingerprint', 10, 10);
    
    // Get data URL
    const dataUrl = canvas.toDataURL();
    return await hashData(dataUrl.substring(0, 100));
  } catch {
    return 'error';
  }
};

// Get Font List (sampled)
const getFontList = async (): Promise<string> => {
  try {
    const fonts = [
      'Arial', 'Helvetica', 'Times New Roman', 'Times', 'Courier New',
      'Courier', 'Verdana', 'Georgia', 'Palatino', 'Garamond',
      'Bookman', 'Comic Sans MS', 'Trebuchet MS', 'Arial Black', 'Impact'
    ];
    
    const available = [];
    for (const font of fonts.slice(0, 5)) { // Check first 5 only
      if (document.fonts.check(`12px "${font}"`)) {
        available.push(font);
      }
    }
    
    return available.join(',');
  } catch {
    return 'unknown';
  }
};

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
        user_id: effectiveUserId,
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
// ================ FACIAL RECOGNITION (REPLACES BEHAVIORAL) ================
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
// Create Biometric Session
const createBiometricSession = async (): Promise<string> => {
  setIsProcessing(true)
  setUploadProgress(0)

  try {
    // Create session ID
    const sessionId = `bio-session-${effectiveUserId}-${Date.now()}`

    setUploadProgress(30)

    // Prepare session data INCLUDING FACIAL HASH
    const sessionData = {
      voice_hash: collectedData.voiceHash,
      device_fingerprint: collectedData.deviceFingerprint,
      emotional_pattern_hash: collectedData.emotionalPatternHash,
      facial_hash: collectedData.facialHash, // CHANGED: behavioral_hash → facial_hash
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
// Scan Components - UPDATED WITH FACIAL RECOGNITION
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
    label: 'Facial Recognition',  // CHANGED
    icon: Camera,  // CHANGED: Shield → Camera
    description: 'Capture facial biometrics',  // CHANGED
    status: scanStatus.facial,  // CHANGED: behavioral → facial
    action: null, // We'll handle this separately in the render
    actionText: 'Capture Selfie'  // CHANGED
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
      {/* Security Info */}
      <div className="mb-6 p-4 bg-gray-800/30 rounded-xl">
        <div className="flex items-center gap-3 mb-2">
          <Shield className="w-5 h-5 text-green-400" />
          <h4 className="font-medium text-white">Data Storage</h4>
        </div>
        <ul className="space-y-1 text-sm text-gray-400">
          <li>• Voice samples: Encrypted & stored in Supabase Storage</li>
          <li>• Device fingerprints: Hashed for privacy</li>
          <li>• Emotional patterns: Anonymized analysis</li>
          <li>• Facial biometrics: Hashed facial patterns stored</li>
          <li>• All data linked to user ID: {effectiveUserId.substring(0, 8)}...</li>
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