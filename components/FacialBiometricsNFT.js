import React, { useState, useRef } from 'react';
import { Camera, Hash, Save } from 'lucide-react';
import Webcam from 'react-webcam';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const FacialBiometricsNFT = ({ userId, onComplete }) => {
  const [isCapturing, setIsCapturing] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const webcamRef = useRef(null);

  // Capture selfie
  const captureSelfie = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    setIsCapturing(false);
  };

  // Generate biometric hash (simplified)
  const generateBiometricHash = async () => {
    // Create a unique hash based on timestamp + userId + random
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 15);
    const data = `${userId}-${timestamp}-${random}`;
    
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  // Save to Supabase
  const saveToSupabase = async () => {
    if (!capturedImage) return;
    
    setLoading(true);
    
    try {
      // Generate hashes like your NFT card
      const biometricHash = await generateBiometricHash();
      const faceHash = await generateBiometricHash();
      const poseHash = await generateBiometricHash();
      const compositeHash = await generateBiometricHash();
      
      // Prepare data in your NFT card format
      const nftData = {
        // Hashed details (like your image)
        composite_biometric_hash: compositeHash,
        face_embedding_hash: faceHash,
        body_pose_hash: poseHash,
        
        // Metadata fields like your NFT card
        coordinates: "-1,2921,36,8219",
        weather: "Sunny 30C",
        humidity: "Moderate 50%",
        location: "Nairobi, Kenya",
        season: "Late Autumn",
        air_quality: "Good",
        geology: "Swahili",
        
        // Store the selfie
        captured_image: capturedImage,
        
        // NFT metadata
        nft_name: "MULTISOULTOKEN #01",
        nft_number: "01",
        user_id: userId,
        created_at: new Date().toISOString()
      };
      
      // Save to Supabase
      const { data, error } = await supabase
        .from('biometric_nfts')
        .insert([nftData])
        .select()
        .single();
      
      if (error) throw error;
      
      setSaved(true);
      if (onComplete) onComplete(data);
      
    } catch (error) {
      console.error('Save error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Reset
  const resetCapture = () => {
    setCapturedImage(null);
    setSaved(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Camera className="h-8 w-8 text-blue-600" />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Facial Biometric NFT</h2>
            <p className="text-gray-600">Capture selfie for NFT minting</p>
          </div>
        </div>
        
        {saved && (
          <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            Saved to Database
          </div>
        )}
      </div>

      {/* Capture Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Step 1: Take Selfie</h3>
          {capturedImage && (
            <button
              onClick={resetCapture}
              className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition"
            >
              Retake
            </button>
          )}
        </div>
        
        {!capturedImage ? (
          <div className="relative rounded-lg overflow-hidden border-2 border-dashed border-gray-300">
            {isCapturing ? (
              <Webcam
                ref={webcamRef}
                audio={false}
                screenshotFormat="image/jpeg"
                className="w-full h-64 object-cover"
                videoConstraints={{
                  facingMode: 'user',
                  width: 640,
                  height: 480
                }}
              />
            ) : (
              <div 
                className="h-64 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition"
                onClick={() => setIsCapturing(true)}
              >
                <Camera className="h-12 w-12 text-gray-400 mb-3" />
                <p className="text-gray-600">Click to take selfie</p>
                <p className="text-sm text-gray-500 mt-1">Face the camera</p>
              </div>
            )}
            
            {isCapturing && (
              <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                <button
                  onClick={captureSelfie}
                  className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition flex items-center space-x-2"
                >
                  <Camera className="h-5 w-5" />
                  <span>Capture</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="rounded-lg overflow-hidden">
            <img 
              src={capturedImage} 
              alt="Captured selfie" 
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
        )}
      </div>

      {/* Save Section */}
      {capturedImage && !saved && (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Hash className="h-5 w-5 text-gray-600" />
              <div>
                <p className="font-medium text-gray-800">Biometric Hash Ready</p>
                <p className="text-sm text-gray-600">Will generate unique NFT identifier</p>
              </div>
            </div>
          </div>
          
          <button
            onClick={saveToSupabase}
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:opacity-90 transition flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Saving to Database...</span>
              </>
            ) : (
              <>
                <Save className="h-5 w-5" />
                <span>Save Biometric NFT Data</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Success Message */}
      {saved && (
        <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Save className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">NFT Data Saved!</h3>
            <p className="text-gray-600 mb-4">Your biometric NFT data has been stored in Supabase</p>
            
            <div className="bg-white rounded-lg p-4 mb-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="text-left">
                  <p className="text-gray-500">MULTISOULTOKEN</p>
                  <p className="font-medium">#01</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-500">Location</p>
                  <p className="font-medium">Nairobi, Kenya</p>
                </div>
              </div>
            </div>
            
            <button
              onClick={resetCapture}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              Create Another NFT
            </button>
          </div>
        </div>
      )}

      {/* Simple Instructions */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          <span className="font-medium">How it works:</span> Take a selfie → Generate biometric hash → Save to Supabase → Ready for NFT minting
        </p>
      </div>
    </div>
  );
};

export default FacialBiometricsNFT;