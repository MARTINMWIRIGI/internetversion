'use client'

import { useState, useEffect } from 'react'
import { ConnectWallet, useAddress, useConnectionStatus } from '@thirdweb-dev/react'
import { supabase } from '@/lib/supabase-client'

export default function MintLayerButton({ layerType, userId }) {
  const address = useAddress()
  const connectionStatus = useConnectionStatus()
  const [isMinting, setIsMinting] = useState(false)
  const [mintedInfo, setMintedInfo] = useState(null)
  const [isChecking, setIsChecking] = useState(true)
  const [availableItems, setAvailableItems] = useState([])
  const [selectedItemId, setSelectedItemId] = useState(null)

  // Map layer types to tables
  const tableMap = {
    cultural: 'cultural_data',
    biometric: 'biometric_srfs',
    voice: 'voice_samples',
    emotional: 'emotional_patterns',
    language: 'language_progress',
    behavioral: 'behavioral_data',
    environmental: 'environmental_data',
    experiential: 'experiential_data',
    economic: 'economic_data'
  }

  // Fetch available items for this layer
  useEffect(() => {
    fetchAvailableItems()
  }, [layerType, userId])

  const fetchAvailableItems = async () => {
    const tableName = tableMap[layerType]
    if (!tableName || !userId) return

    try {
      const { data, error } = await supabase
        .from(tableName)
        .select('id, created_at, title, description')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(10)

      if (error) throw error
      setAvailableItems(data || [])
      
      // Select first item by default
      if (data && data.length > 0) {
        setSelectedItemId(data[0].id)
      }
    } catch (error) {
      console.error('Error fetching items:', error)
    } finally {
      setIsChecking(false)
    }
  }

  const checkIfMinted = async (itemId) => {
    try {
      const { data } = await supabase
        .from('nft_minting_tracker')
        .select('token_id, transaction_hash, opensea_url')
        .eq('source_table', tableMap[layerType])
        .eq('source_id', itemId)
        .eq('status', 'minted')
        .single()

      if (data) {
        setMintedInfo({
          tokenId: data.token_id,
          txHash: data.transaction_hash,
          openseaUrl: data.opensea_url,
          alreadyMinted: true,
          itemId
        })
        return true
      }
    } catch (error) {
      // Not minted yet
    }
    return false
  }

  const mintLayer = async () => {
    if (!address || !selectedItemId) return

    setIsMinting(true)
    try {
      // Check if already minted
      const alreadyMinted = await checkIfMinted(selectedItemId)
      if (alreadyMinted) {
        alert('This item is already minted as NFT!')
        return
      }

      // Call your minting API
      const response = await fetch('/api/mint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          walletAddress: address,
          layerType,
          dataId: selectedItemId
        })
      })

      const result = await response.json()

      if (result.success) {
        setMintedInfo({
          tokenId: result.tokenId,
          openseaUrl: result.openseaUrl,
          ipfsUrl: result.ipfsUrl,
          txHash: result.transactionHash,
          alreadyMinted: false,
          itemId: selectedItemId
        })
        
        alert(`🎉 Successfully minted NFT!\nToken ID: ${result.tokenId}\nView on OpenSea: ${result.openseaUrl}`)
        
        // Refresh available items
        fetchAvailableItems()
      } else {
        throw new Error(result.error || 'Minting failed')
      }
    } catch (error) {
      console.error('Minting error:', error)
      alert(`❌ Error: ${error.message}`)
    } finally {
      setIsMinting(false)
    }
  }

  // Loading state
  if (isChecking) {
    return (
      <div className="text-center py-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-cyan-500 mx-auto"></div>
        <p className="text-sm text-gray-400 mt-2">Loading data...</p>
      </div>
    )
  }

  // No items available
  if (availableItems.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-gray-400 text-sm">No items available to mint</p>
        <p className="text-gray-500 text-xs mt-1">Add data to this layer first</p>
      </div>
    )
  }

  // Already minted state
  if (mintedInfo?.alreadyMinted && mintedInfo.itemId === selectedItemId) {
    return (
      <div className="minted-status p-4 bg-green-900/20 rounded-lg border border-green-500/20">
        <div className="flex items-center justify-between mb-2">
          <span className="text-green-400 text-sm font-semibold">✅ Already Minted</span>
          <a 
            href={mintedInfo.openseaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 text-sm hover:text-cyan-300"
          >
            View NFT
          </a>
        </div>
        <p className="text-gray-400 text-xs">Token ID: {mintedInfo.tokenId}</p>
      </div>
    )
  }

  // Item selector
  return (
    <div className="mint-container space-y-4">
      {/* Item Selector */}
      <div>
        <label className="block text-sm text-gray-400 mb-2">Select item to mint:</label>
        <select
          value={selectedItemId || ''}
          onChange={(e) => setSelectedItemId(e.target.value)}
          className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm"
        >
          {availableItems.map((item) => (
            <option key={item.id} value={item.id}>
              {item.title || `Item from ${new Date(item.created_at).toLocaleDateString()}`}
            </option>
          ))}
        </select>
      </div>

      {/* Not connected state */}
      {(!address || connectionStatus !== 'connected') ? (
        <div className="connect-wallet-wrapper">
          <ConnectWallet 
            theme="dark"
            btnTitle="Connect Wallet to Mint"
            modalTitle="Connect Wallet"
            modalSize="wide"
            welcomeScreen={{ title: "Connect to mint your data as NFTs" }}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px'
            }}
          />
        </div>
      ) : (
        /* Ready to mint state */
        <div className="space-y-3">
          <button
            onClick={mintLayer}
            disabled={isMinting || !selectedItemId}
            className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 ${
              isMinting
                ? 'bg-gray-700 text-gray-400'
                : 'bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white'
            }`}
          >
            {isMinting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Minting...
              </>
            ) : (
              <>
                <span className="text-lg">✨</span>
                Mint Selected Item as NFT
              </>
            )}
          </button>
          
          <p className="text-xs text-center text-gray-500">
            Minting creates a permanent NFT on Polygon blockchain
          </p>
        </div>
      )}
    </div>
  )
}