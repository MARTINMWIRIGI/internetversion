"use client"

import { useState } from 'react'

export default function CulturalFormSimple() {
  const [language, setLanguage] = useState('')
  const [story, setStory] = useState('')
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    
    try {
      // TODO: Connect to Supabase here!
      console.log('Saving:', { language, story })
      
      alert('Story saved! (Not really yet, but soon!)')
      setLanguage('')
      setStory('')
    } catch (error) {
      alert('Oops! Something went wrong.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="p-6 bg-gradient-to-br from-purple-900/30 to-cyan-900/30 rounded-2xl border border-purple-500/30">
      <h3 className="text-xl font-bold text-white mb-4">📚 Save Your Story</h3>
      
      <div className="space-y-4">
        <input
          placeholder="Language (e.g., Kikuyu, Swahili)"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
        />
        
        <textarea
          placeholder="Tell your story, proverb, or wisdom..."
          value={story}
          onChange={(e) => setStory(e.target.value)}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white min-h-[150px]"
          rows={4}
        />
        
        <button
          onClick={handleSave}
          disabled={saving || !language || !story}
          className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white py-3 rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
        >
          {saving ? 'Saving...' : '✨ Save My Story'}
        </button>
        
        <p className="text-sm text-gray-400 text-center">
          Your story will be saved forever on blockchain!
        </p>
      </div>
    </div>
  )
}