'use client';

import { useState } from 'react';
import BiometricFormSimple from '@/components/BiometricFormSimple';

export default function BiometricLayer() {
  // Add state for showing the biometric form
  const [showBiometricFormSimple, setShowBiometricFormSimple] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-10">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Biometric Layer
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Secure your digital identity with multi-factor biometric verification. 
            Your unique biological traits create an unforgeable security layer.
          </p>
        </header>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left Column - Instructions */}
          <div className="space-y-8">
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700">
              <h2 className="text-2xl font-semibold mb-4 text-cyan-300">📋 How It Works</h2>
              <ol className="space-y-4 list-decimal pl-5">
                <li className="text-gray-300">
                  <span className="font-medium text-white">Voice Recording</span> - Speak the passphrase to capture unique vocal patterns
                </li>
                <li className="text-gray-300">
                  <span className="font-medium text-white">Device Fingerprinting</span> - Analyze browser and device characteristics
                </li>
                <li className="text-gray-300">
                  <span className="font-medium text-white">Behavioral Analysis</span> - Monitor typing rhythm and interaction patterns
                </li>
                <li className="text-gray-300">
                  <span className="font-medium text-white">NFT Minting</span> - Generate a unique digital certificate of your biometric identity
                </li>
              </ol>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700">
              <h2 className="text-2xl font-semibold mb-4 text-purple-300">🔒 Security Features</h2>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span>End-to-end encryption of biometric data</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span>Decentralized storage on IPFS</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span>Blockchain-verified identity proofs</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span>Zero-knowledge authentication</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column - Biometric Interface */}
          <div className="space-y-8">
            {showBiometricFormSimple ? (
              <BiometricFormSimple onClose={() => setShowBiometricFormSimple(false)} />
            ) : (
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700">
                <div className="text-center mb-8">
                  <div className="w-24 h-24 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Ready to Secure Your Identity?</h3>
                  <p className="text-gray-400">
                    Click below to begin the biometric enrollment process. This will take approximately 2-3 minutes.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-cyan-900/30 rounded-lg flex items-center justify-center mr-4">
                        <span className="text-cyan-400">1</span>
                      </div>
                      <span>Voice Recognition</span>
                    </div>
                    <span className="text-gray-400">~60 seconds</span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-purple-900/30 rounded-lg flex items-center justify-center mr-4">
                        <span className="text-purple-400">2</span>
                      </div>
                      <span>Device Fingerprint</span>
                    </div>
                    <span className="text-gray-400">~30 seconds</span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-green-900/30 rounded-lg flex items-center justify-center mr-4">
                        <span className="text-green-400">3</span>
                      </div>
                      <span>Behavioral Analysis</span>
                    </div>
                    <span className="text-gray-400">~45 seconds</span>
                  </div>
                </div>
              </div>
            )}

            {/* Button */}
            <button
              onClick={() => setShowBiometricFormSimple(!showBiometricFormSimple)}
              className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white font-medium py-3 rounded-xl transition-all duration-200 active:scale-95"
            >
              {showBiometricFormSimple ? 'Preserve Identity' : 'Complete Biometrics Scan'}
            </button>

            {/* Status Indicators */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-800/30 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-cyan-400">3</div>
                <div className="text-sm text-gray-400">Security Layers</div>
              </div>
              <div className="bg-gray-800/30 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-purple-400">99.9%</div>
                <div className="text-sm text-gray-400">Accuracy Rate</div>
              </div>
              <div className="bg-gray-800/30 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-green-400">256-bit</div>
                <div className="text-sm text-gray-400">Encryption</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center text-gray-500 text-sm border-t border-gray-800 pt-8">
          <p>Your biometric data is encrypted and stored securely. No raw data is ever exposed.</p>
          <p className="mt-1">This system complies with global privacy regulations including GDPR and CCPA.</p>
        </div>
      </div>
    </div>
  );
}