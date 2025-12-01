'use client';

export default function CulturalLayer() {
  return (
    <div className="glow-card p-6 rounded-2xl">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-10 w-10 rounded-full bg-purple-500/20 flex items-center justify-center">
          <span className="text-2xl">🌍</span>
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Cultural Heritage</h3>
          <p className="text-sm text-gray-300">Language & Stories</p>
        </div>
        <div className="ml-auto px-3 py-1 rounded-full bg-green-900/50 text-sm text-green-300 pulse-glow">
          Active
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-cyan-400"></span>
            <span className="text-gray-300">Languages Recorded</span>
          </div>
          <div className="text-cyan-300 font-medium">2</div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-purple-400"></span>
            <span className="text-gray-300">Stories Preserved</span>
          </div>
          <div className="text-purple-300 font-medium">5</div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-900/30 to-cyan-900/30 p-4 rounded-xl">
          <div className="text-sm text-gray-300">Cultural Value</div>
          <div className="text-2xl font-bold text-white">1,200 SOUL</div>
          <div className="text-xs mt-1 text-gray-400">AI Training Rights: $25/month</div>
        </div>
        
        <button className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white font-medium py-3 rounded-xl transition-all duration-200 active:scale-95">
          Add More Culture
        </button>
      </div>
    </div>
  );
}