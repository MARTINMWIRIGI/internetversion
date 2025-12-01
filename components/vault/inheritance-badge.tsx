"use client"

export function InheritanceBadge() {
  return (
    <div className="bg-gradient-to-br from-amber-900/20 to-yellow-900/20 border border-amber-500/30 rounded-2xl p-5">
      <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
        <span className="text-amber-400">🏛️</span> Heritage Inheritance
      </h3>
      
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
            <span className="text-amber-400">👵</span>
          </div>
          <div>
            <div className="font-medium text-white">Grandmother's Voice</div>
            <div className="text-sm text-amber-300">Preserved for 2 generations</div>
          </div>
        </div>

        <div className="border-t border-amber-500/20 pt-3">
          <div className="text-sm text-gray-400 mb-2">Inheritance Status</div>
          <div className="flex items-center justify-between">
            <div className="text-amber-400 font-medium">Active</div>
            <button className="px-3 py-1 bg-amber-500/20 text-amber-400 rounded-lg text-sm hover:bg-amber-500/30">
              Setup Will
            </button>
          </div>
        </div>

        <p className="text-xs text-gray-400 mt-3">
          Your cultural vault can be passed to future generations
        </p>
      </div>
    </div>
  )
}