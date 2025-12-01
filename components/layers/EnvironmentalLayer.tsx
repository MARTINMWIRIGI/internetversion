'use client';

export default function EnvironmentalLayer() {
  return (
    <div className="glow-card p-6 rounded-2xl layer-hover">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center">
          <span className="text-2xl">🌱</span>
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Environmental Impact</h3>
          <p className="text-sm text-gray-300">Carbon & Sustainability</p>
        </div>
        <div className="ml-auto px-3 py-1 rounded-full bg-green-900/50 text-sm text-green-300">
          Eco Active
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-green-400"></span>
            <span className="text-gray-300">Carbon Credits</span>
          </div>
          <div className="text-green-300 font-medium">5.2 tons</div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-teal-400"></span>
            <span className="text-gray-300">Trees Planted</span>
          </div>
          <div className="text-teal-300 font-medium">12</div>
        </div>
        
        <div className="bg-gradient-to-r from-green-900/30 to-teal-900/30 p-4 rounded-xl">
          <div className="text-sm text-gray-300">Environmental Value</div>
          <div className="text-2xl font-bold text-white">950 SOUL</div>
          <div className="text-xs mt-1 text-gray-400">Monthly Impact: $18</div>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span>🌍</span>
          <span>Connected to 3 African reforestation projects</span>
        </div>
        
        <button className="w-full bg-gradient-to-r from-green-600 to-teal-500 hover:from-green-700 hover:to-teal-600 text-white font-medium py-3 rounded-xl transition-all duration-200 active:scale-95">
          View Environmental Dashboard
        </button>
      </div>
    </div>
  );
}