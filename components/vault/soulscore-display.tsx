"use client"

export function SoulScoreDisplay({ score }: { score: number }) {
  const getColor = (score: number) => {
    if (score >= 80) return "text-green-400"
    if (score >= 60) return "text-yellow-400"
    if (score >= 40) return "text-orange-400"
    return "text-red-400"
  }

  const getLabel = (score: number) => {
    if (score >= 80) return "Ancient Wisdom"
    if (score >= 60) return "Cultural Guardian"
    if (score >= 40) return "Story Keeper"
    if (score >= 20) return "Beginner Soul"
    return "New Voice"
  }

  return (
    <div className="bg-gradient-to-br from-purple-900/30 to-cyan-900/30 border border-purple-500/30 rounded-2xl p-6 text-center">
      <h3 className="text-lg font-bold text-white mb-2">Your Soul Score</h3>
      <div className="relative inline-block">
        <div className="w-32 h-32 rounded-full border-4 border-purple-500/50 flex items-center justify-center">
          <div className="text-center">
            <div className={`text-4xl font-bold ${getColor(score)}`}>{score}</div>
            <div className="text-sm text-gray-400 mt-1">/100</div>
          </div>
        </div>
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-500 animate-spin-slow"></div>
      </div>
      <div className="mt-4">
        <div className="text-lg font-semibold text-cyan-400">{getLabel(score)}</div>
        <div className="text-sm text-gray-400 mt-1">
          {score >= 80 ? "Your vault preserves ancient wisdom for generations" :
           score >= 60 ? "You're guarding precious cultural heritage" :
           score >= 40 ? "Your stories are being preserved digitally" :
           "Start adding more layers to increase your score"}
        </div>
      </div>
    </div>
  )
}