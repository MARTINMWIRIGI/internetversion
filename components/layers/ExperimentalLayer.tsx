'use client';

export default function ExperientialLayer() {
  return (
    <div className="glow-card p-6 rounded-2xl layer-hover">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center">
          <span className="text-2xl">💭</span>
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Memory Bank</h3>
          <p className="text-sm text-gray-300">Experiences & Emotions</p>
        </div>
        <div className="ml-auto px-3 py-1 rounded-full bg-blue-900/50 text-sm text-blue-300">
          3 Memories
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-blue-400"></span>
            <span className="text-gray-300">Life Moments</span>
          </div>
          <div className="text-blue-300 font-medium">24 recorded</div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-indigo-400"></span>
            <span className="text-gray-300">Emotional Patterns</span>
          </div>
          <div className="text-indigo-300 font-medium">Analyzed</div>
        </div>
        
        <div className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 p-4 rounded-xl">
          <div className="text-sm text-gray-300">Experiential Value</div>
          <div className="text-2xl font-bold text-white">1,100 SOUL</div>
          <div className="text-xs mt-1 text-gray-400">Emotional AI Training</div>
        </div>
        
        <div className="p-3 bg-blue-900/20 rounded-lg">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-yellow-400">⭐</span>
            <span className="text-gray-300">Latest: "Grandma's story by the fire"</span>
          </div>
        </div>
        
        <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-700 hover:to-indigo-600 text-white font-medium py-3 rounded-xl transition-all duration-200 active:scale-95">
          Add New Memory
        </button>
      </div>
    </div>
  );
}
