"use client"

import { useState } from 'react'

export default function CulturalFormReal() {
  const [language, setLanguage] = useState('');
  const [story, setStory] = useState('');
  const [tribe, setTribe] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!language.trim() || !story.trim()) {
      alert('Please fill in both language and story!');
      return;
    }

    setSaving(true);
    
    try {
      // For now, just simulate saving
      console.log('Would save to Supabase:', {
        wallet_address: '0x123...test',
        language_name: language,
        story: story,
        tribe: tribe || 'Not specified',
        created_at: new Date().toISOString()
      });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      alert(`✅ "${language}" story saved! (Demo mode)`);
      
      // Clear form
      setLanguage('');
      setStory('');
      setTribe('');

    } catch (error) {
      console.error('Error:', error);
      alert('❌ Demo error occurred.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-purple-900/30 to-cyan-900/30 rounded-2xl border border-purple-500/30">
      <h3 className="text-xl font-bold text-white mb-4">📚 Save Cultural Heritage</h3>
      
      <div className="space-y-4">
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
          className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white py-3 rounded-lg hover:shadow-lg hover:shadow-purple-500/30 transition-all disabled:opacity-50"
        >
          {saving ? (
            <span className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Saving (Demo)...
            </span>
          ) : (
            '✨ Save Story (Demo Mode)'
          )}
        </button>
        
        <div className="text-center">
          <p className="text-sm text-gray-400">
            ⚠️ Working in demo mode
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Check browser console (F12) to see what would be saved
          </p>
        </div>
      </div>
    </div>
  );
}