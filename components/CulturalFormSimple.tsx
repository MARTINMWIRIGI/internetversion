"use client"

import { useState } from 'react'
import { supabase } from '@/lib/supabase/client'

export default function CulturalFormReal() {
  const [language, setLanguage] = useState('')
  const [story, setStory] = useState('')
  const [tribe, setTribe] = useState('')
  const [saving, setSaving] = useState(false)
  const [savedStories, setSavedStories] = useState<any[]>([])

  // For testing - use a fake wallet address
  const testWalletAddress = '0x1234567890123456789012345678901234567890'

  const handleSave = async () => {
    if (!language.trim() || !story.trim()) {
      alert('Please fill in both language and story!')
      return
    }

    setSaving(true)
    
    try {
      // 1. Save to Supabase
      const { data, error } = await supabase
        .from('cultural_data')
        .insert({
          wallet_address: testWalletAddress,
          language_name: language,
          story: story,
          tribe: tribe || 'Not specified',
          ipfs_cid: null, // We'll add IPFS later
          created_at: new Date().toISOString()
        })
        .select() // This returns the saved data

      if (error) {
        console.error('Supabase error:', error)
        throw error
      }

      console.log('✅ Saved to Supabase:', data)
      
      // 2. Add to local list
      if (data && data[0]) {
        setSavedStories(prev => [data[0], ...prev])
      }
      
      // 3. Show success
      alert(`✅ "${language}" story saved to database!`)
      
      // 4. Clear form
      setLanguage('')
      setStory('')
      setTribe('')

    } catch (error) {
      console.error('Error saving:', error)
      alert('❌ Failed to save. Check console for details.')
    } finally {
      setSaving(false)
    }
  }

  // Load saved stories on mount
  const loadStories = async () => {
    try {
      const { data, error } = await supabase
        .from('cultural_data')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5)

      if (!error && data) {
        setSavedStories(data)
      }
    } catch (error) {
      console.error('Error loading stories:', error)
    }
  }

  return (
    <div className="p-6 bg-gradient-to-br from-purple-900/30 to-cyan-900/30 rounded-2xl border border-purple-500/30">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-white">📚 Save Cultural Heritage</h3>
        <button
          onClick={loadStories}
          className="px-3 py-1 bg-purple-700/50 text-sm rounded-lg hover:bg-purple-600"
        >
          Load Saved
        </button>
      </div>
      
      <div className="space-y-4 mb-6">
        <input
          placeholder="🌍 Language (e.g., Kikuyu, Swahili)"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400"
        />
        
        <input
          placeholder="👨‍👩‍👧‍👦 Tribe/Community (optional)"
          value={tribe}
          onChange={(e) => setTribe(e.target.value)}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400"
        />
        
        <textarea
          placeholder="📖 Tell your story, proverb, or wisdom..."
          value={story}
          onChange={(e) => setStory(e.target.value)}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 min-h-[150px]"
          rows={4}
        />
        
        <button
          onClick={handleSave}
          disabled={saving || !language || !story}
          className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white py-3 rounded-lg hover:shadow-lg hover:shadow-purple-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? (
            <span className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Saving to Database...
            </span>
          ) : (
            '✨ Save Story to Supabase'
          )}
        </button>
        
        <div className="text-center">
          <p className="text-sm text-gray-400">
            Stories saved: <span className="text-cyan-300 font-bold">{savedStories.length}</span>
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Your story will be saved forever in Supabase database!
          </p>
        </div>
      </div>

      {/* Display saved stories */}
      {savedStories.length > 0 && (
        <div className="mt-6 pt-6 border-t border-purple-500/20">
          <h4 className="text-lg font-bold text-white mb-3">📜 Recently Saved Stories</h4>
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {savedStories.map((story) => (
              <div 
                key={story.id}
                className="p-3 bg-gray-800/50 rounded-lg border border-gray-700"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-bold text-purple-300">{story.language_name}</span>
                    {story.tribe && (
                      <span className="ml-2 text-sm text-gray-400">({story.tribe})</span>
                    )}
                  </div>
                  <span className="text-xs text-gray-500">
                    {new Date(story.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-300 mt-2 text-sm line-clamp-2">
                  {story.story}
                </p>
                <div className="mt-2 text-xs text-gray-500">
                  ID: {story.id.substring(0, 8)}...
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}