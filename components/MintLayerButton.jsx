'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'

interface MintLayerButtonProps {
  layerType: string
  userId: string
}

export default function MintLayerButton({ layerType, userId }: MintLayerButtonProps) {
  const [isMinting, setIsMinting] = useState(false)
  const [availableItems, setAvailableItems] = useState<any[]>([])
  const [selectedItemId, setSelectedItemId] = useState<string>('')
  const [loading, setLoading] = useState(true)

  // Map layer types to tables
  const tableMap: Record<string, string> = {
    cultural: 'cultural_data',
    biometric: 'biometric_srfs',
    voice: 'voice_samples',
    emotional: 'emotional_patterns',
    language: 'language_progress',
    behavioral: 'behavioral_data'
  }

  // Fetch available items
  useEffect(() => {
    fetchAvailableItems()
  }, [layerType, userId])

  const fetchAvailableItems = async () => {
    const tableName = tableMap[layerType]
    if (!tableName || !userId) return

    try {
      const { data, error } = await supabase
        .from(tableName)
        .select('id, created_at')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(3)

      if (error) throw error
      
      setAvailableItems(data || [])
      if (data && data.length > 0) {
        setSelectedItemId(data[0].id)
      }
    } catch (error) {
      console.error('Error fetching items:', error)
    } finally {
      setLoading(false)
    }
  }

  const mintLayer = async () => {
    if (!selectedItemId) return

    setIsMinting(true)
    try {
      // Call mint API
      const response = await fetch('/api/mint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          layerType,
          dataId: selectedItemId
        })
      })

      const result = await response.json()

      if (result.success) {
        alert(`✅ Success! NFT minted.\nToken ID: ${result.tokenId}`)
        fetchAvailableItems() // Refresh
      } else {
        throw new Error(result.error || 'Minting failed')
      }
    } catch (error: any) {
      console.error('Minting error:', error)
      alert(`Error: ${error.message}`)
    } finally {
      setIsMinting(false)
    }
  }

  if (loading) {
    return (
      <div className="py-4">
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-cyan-500 mx-auto"></div>
      </div>
    )
  }

  if (availableItems.length === 0) {
    return (
      <div className="py-4 text-center">
        <p className="text-gray-400 text-sm">Add data first to mint</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div>
        <select
          value={selectedItemId}
          onChange={(e) => setSelectedItemId(e.target.value)}
          className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm"
        >
          {availableItems.map((item) => (
            <option key={item.id} value={item.id}>
              Item from {new Date(item.created_at).toLocaleDateString()}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={mintLayer}
        disabled={isMinting}
        className={`w-full py-2 rounded-lg font-semibold text-sm ${
          isMinting
            ? 'bg-gray-700 text-gray-400'
            : 'bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white'
        }`}
      >
        {isMinting ? 'Minting...' : 'Mint as NFT'}
      </button>
    </div>
  )
}