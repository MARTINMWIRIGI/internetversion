"use client"

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

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
      // Create Supabase client
      const supabase = createClient();
      
      // For testing - get user's wallet address from somewhere
      // For now, use a test address
      const testWalletAddress = '0x1234567890123456789012345678901234567890';
      
      // Save to Supabase
      const { data, error } = await supabase
        .from('cultural_data')
        .insert({
          wallet_address: testWalletAddress,
          language_name: language,
          story: story,
          tribe: tribe || 'Not specified',
          ipfs_cid: null,
          created_at: new Date().toISOString()
        })
        .select();
      
      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      console.log('✅ Saved to Supabase:', data);
      
      alert(`✅ "${language}" story saved to database!`);
      
      // Clear form
      setLanguage('');
      setStory('');
      setTribe('');

    } catch (error) {
      console.error('Error saving:', error);
      alert('❌ Failed to save. Please check: 1) Supabase URL 2) Table exists 3) Network');
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
              Saving to Database...
            </span>
          ) : (
            '✨ Save to Mint'
          )}
        </button>
        
        <div className="text-center">
          <p className="text-sm text-gray-400">
            Your story will be saved: <span className="text-cyan-300">as a time capsule and minted as an NFT on the Blockchain</span>
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Check your OpenSea Dashboard to see your saved stories
          </p>
        </div>
      </div>
    </div>
  );
}