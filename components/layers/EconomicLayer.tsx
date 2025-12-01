'use client';

export default function EconomicLayer() {
  return (
    <div className="glow-card p-6 rounded-2xl layer-hover">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-10 w-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
          <span className="text-2xl">💰</span>
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Economic Rights</h3>
          <p className="text-sm text-gray-300">AI Licensing & Royalties</p>
        </div>
        <div className="ml-auto px-3 py-1 rounded-full bg-yellow-900/50 text-sm text-yellow-300">
          Active Licenses
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-yellow-400"></span>
            <span className="text-gray-300">AI Companies Licensed</span>
          </div>
          <div className="text-yellow-300 font-medium">2</div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-amber-400"></span>
            <span className="text-gray-300">Monthly Royalties</span>
          </div>
          <div className="text-amber-300 font-medium">$45.50</div>
        </div>
        
        <div className="bg-gradient-to-r from-yellow-900/30 to-amber-900/30 p-4 rounded-xl">
          <div className="text-sm text-gray-300">Economic Value</div>
          <div className="text-2xl font-bold text-white">1,850 SOUL</div>
          <div className="text-xs mt-1 text-gray-400">Projected Annual: $550</div>
        </div>
        
        <div className="p-3 bg-yellow-900/20 rounded-lg">
          <div className="text-sm text-gray-300">
            <span className="text-green-400">✓</span> Google AI - Voice Dataset
            <br />
            <span className="text-xs text-gray-400">Earning: $25/month</span>
          </div>
        </div>
        
        <button className="w-full bg-gradient-to-r from-yellow-600 to-amber-500 hover:from-yellow-700 hover:to-amber-600 text-white font-medium py-3 rounded-xl transition-all duration-200 active:scale-95">
          Manage AI Rights
        </button>
      </div>
    </div>
  );
}