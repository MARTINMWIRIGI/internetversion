"use client"

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client';

interface LeaderboardUser {
  rank: number
  wallet_address: string
  total_xp: number
  total_words_completed: number
  username: string
}

export default function Leaderboard() {
  const [users, setUsers] = useState<LeaderboardUser[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLeaderboard()
  }, [])

  const fetchLeaderboard = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('wallet_address, total_xp, total_words_completed, username')
        .order('total_xp', { ascending: false })
        .limit(20)

      if (error) throw error

      const rankedUsers = data.map((user, index) => ({
        rank: index + 1,
        ...user
      }))

      setUsers(rankedUsers)
    } catch (error) {
      console.error('Error fetching leaderboard:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
      </div>
    )
  }

  return (
    <div className="bg-gray-800/50 rounded-2xl p-6">
      <h3 className="text-xl font-bold text-white mb-4">🏆 Community Leaderboard</h3>
      
      <div className="space-y-3">
        {users.map((user) => (
          <div
            key={user.wallet_address}
            className="flex items-center justify-between p-4 bg-gray-900/50 rounded-xl hover:bg-gray-900/70 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className={`
                w-8 h-8 flex items-center justify-center rounded-full text-white font-bold
                ${user.rank === 1 ? 'bg-yellow-500' : 
                  user.rank === 2 ? 'bg-gray-400' : 
                  user.rank === 3 ? 'bg-amber-700' : 'bg-gray-800'}
              `}>
                {user.rank}
              </div>
              
              <div>
                <div className="text-white font-medium">
                  {user.username || `${user.wallet_address.slice(0, 6)}...${user.wallet_address.slice(-4)}`}
                </div>
                <div className="text-gray-400 text-sm">
                  {user.total_words_completed} words
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-white font-bold">{user.total_xp.toLocaleString()} XP</div>
              <div className="text-cyan-400 text-sm">Level {Math.floor(user.total_xp / 100) + 1}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}