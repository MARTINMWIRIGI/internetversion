'use client';
import BiometricFormSimplefrom '@/components/BiometricFormSimple';

export default function BiometricLayer() {
  return (
    <div className="glow-card p-6 rounded-2xl layer-hover">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-10 w-10 rounded-full bg-pink-500/20 flex items-center justify-center">
          <span className="text-2xl">👤</span>
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Biometric Identity</h3>
          <p className="text-sm text-gray-300">Voice & Fingerprint</p>
        </div>
        <div className="ml-auto px-3 py-1 rounded-full bg-pink-900/50 text-sm text-pink-300">
          65% Complete
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-pink-400"></span>
            <span className="text-gray-300">Voice Fingerprint</span>
          </div>
          <div className="text-pink-300 font-medium">Recorded</div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-purple-400"></span>
            <span className="text-gray-300">Emotional Pattern</span>
          </div>
          <div className="text-purple-300 font-medium">Analyzing</div>
        </div>
        
        <div className="bg-gradient-to-r from-pink-900/30 to-purple-900/30 p-4 rounded-xl">
          <div className="text-sm text-gray-300">Biometric Value</div>
          <div className="text-2xl font-bold text-white">850 SOUL</div>
          <div className="text-xs mt-1 text-gray-400">AI Voice Training: $15/month</div>
        </div>
        
        <div className="w-full bg-gray-800 rounded-full h-2">
          <div className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full" style={{ width: '65%' }}></div>
        </div>
        
        <button className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-medium py-3 rounded-xl transition-all duration-200 active:scale-95">
          Complete Biometric Scan
        </button>
      </div>
    </div>
  );
}