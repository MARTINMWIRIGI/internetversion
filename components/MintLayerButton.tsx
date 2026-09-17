'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { createWalletClient } from 'viem'
import CONTRACT_ABI from '@/app/data/contractABI.json'

// Your deployed contract address
const CONTRACT_ADDRESS = '0x202934e4dF29E57Ab7498bB31946174d7C95eDc7'

interface MintLayerButtonProps {
  layerType?: string;
  userId?: string;
  layer?: {
    id: string;
    type?: string;
    data?: any;
    name?: string;
    description?: string;
  };
}

export default function MintLayerButton(props: MintLayerButtonProps) {
  const layerType = props.layerType || props.layer?.type || props.layer?.id || "cultural";
  const userId = props.userId || "";
  const { address, isConnected } = useAccount()
  const [availableItems, setAvailableItems] = useState<any[]>([])
  const [selectedItemId, setSelectedItemId] = useState('')
  const [loading, setLoading] = useState(true)
  const [metadata, setMetadata] = useState<any>(null)

  // Wagmi write contract hook
  const { 
    data: hash,
    writeContract,
    isPending,
    error: writeError
  } = useWriteContract()

  // Wait for transaction
  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ hash })

  // Map layer types to tables
  const tableMap = {
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
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(5)

      if (error) throw error
      
      setAvailableItems(data || [])
      if (data && data.length > 0) {
        setSelectedItemId(data[0].id)
        await prepareMetadata(data[0])
      }
    } catch (error) {
      console.error('Error fetching items:', error)
    } finally {
      setLoading(false)
    }
  }

  const prepareMetadata = async (item: any) => {
    // Generate NFT metadata from your data
    const nftMetadata = {
      name: `${layerType} Artifact #${item.id.slice(0, 8)}`,
      description: `Unique ${layerType} data from Vault Guardian`,
      image: `https://api.dicebear.com/7.x/shapes/svg?seed=${item.id}`,
      attributes: [
        {
          trait_type: "Layer Type",
          value: layerType
        },
        {
          trait_type: "Created",
          value: new Date(item.created_at).toISOString()
        },
        {
          trait_type: "Data Points",
          value: Object.keys(item).length.toString()
        }
      ],
      properties: {
        raw_data: item,
        user_id: userId,
        source: `vault_guardian_${layerType}`
      }
    }
    
    setMetadata(nftMetadata)
    return nftMetadata
  }

  const uploadToIPFS = async (metadata: any) => {
    try {
      const response = await fetch('/api/ipfs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(metadata)
      })
      
      const result = await response.json()
      return result.cid
    } catch (error) {
      console.error('IPFS upload error:', error)
      // Fallback to a test IPFS hash
      return 'bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi'
    }
  }

  const mintNFT = async () => {
    if (!address || !selectedItemId || !metadata) return

    try {
      // 1. Upload metadata to IPFS
      const cid = await uploadToIPFS(metadata)
      const tokenURI = `ipfs://${cid}`

      // 2. Mint on Polygon
      writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'safeMint',
        args: [
          address,   // to
          tokenURI   // uri
        ]
      })

    } catch (error: any) {
      console.error('Minting error:', error)
      alert(`Error: ${error.message}`)
    }
  }

  // Save minted NFT to Supabase
  const saveMintRecord = async (tokenId: string, txHash: string, ipfsHash: string) => {
    try {
      await supabase.from('nft_minting_tracker').insert({
        user_id: userId,
        wallet_address: address,
        token_id: parseInt(tokenId),
        contract_address: CONTRACT_ADDRESS,
        layer_type: layerType,
        source_table: tableMap[layerType],
        source_id: selectedItemId,
        metadata_ipfs_cid: ipfsHash,
        transaction_hash: txHash,
        status: 'minted',
        opensea_url: `https://opensea.io/assets/matic/${CONTRACT_ADDRESS}/${tokenId}`
      })
      
      alert(`✅ NFT Minted Successfully!\nToken ID: ${tokenId}\nView on OpenSea: https://opensea.io/assets/matic/${CONTRACT_ADDRESS}/${tokenId}`)
      
      // Refresh available items
      fetchAvailableItems()
    } catch (error) {
      console.error('Error saving mint record:', error)
    }
  }

  // Watch for successful mint
  useEffect(() => {
    if (isConfirmed && hash) {
      // Extract token ID from transaction (you might need to parse logs)
      const tokenId = Math.floor(Math.random() * 10000).toString() // Temporary
      saveMintRecord(tokenId, hash, metadata?.cid || '')
    }
  }, [isConfirmed, hash])

  if (loading) {
    return (
      <div className="text-center py-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-cyan-500 mx-auto"></div>
        <p className="text-sm text-gray-400 mt-2">Loading data...</p>
      </div>
    )
  }

  if (availableItems.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-gray-400 text-sm">No items available to mint</p>
        <p className="text-gray-500 text-xs mt-1">Add data to this layer first</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Item Selector */}
      <div>
        <label className="block text-sm text-gray-400 mb-2">Select item to mint:</label>
        <select
          value={selectedItemId}
          onChange={async (e) => {
            const itemId = e.target.value
            setSelectedItemId(itemId)
            const item = availableItems.find(i => i.id === itemId)
            if (item) await prepareMetadata(item)
          }}
          className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm"
        >
          {availableItems.map((item) => (
            <option key={item.id} value={item.id}>
              {item.title || `${layerType} - ${new Date(item.created_at).toLocaleDateString()}`}
            </option>
          ))}
        </select>
      </div>

      {/* Wallet Connection */}
      {!isConnected ? (
        <div className="text-center">
          <ConnectButton 
            label="Connect Wallet to Mint"
            showBalance={false}
          />
          <p className="text-xs text-gray-500 mt-2">
            Connect your wallet to mint NFTs on Polygon
          </p>
        </div>
      ) : (
        /* Mint Button */
        <div className="space-y-3">
          <button
            onClick={mintNFT}
            disabled={isPending || isConfirming || !selectedItemId}
            className={`w-full py-3 rounded-lg font-semibold ${
              isPending || isConfirming
                ? 'bg-gray-700 text-gray-400'
                : 'bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white'
            }`}
          >
            {isPending ? (
              <span className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Preparing Transaction...
              </span>
            ) : isConfirming ? (
              <span className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Confirming Transaction...
              </span>
            ) : (
              'Mint as NFT on Polygon'
            )}
          </button>

          {/* Transaction Status */}
          {hash && (
            <div className="text-center">
              <a
                href={`https://polygonscan.com/tx/${hash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 text-sm hover:text-cyan-300"
              >
                View on Polygonscan
              </a>
            </div>
          )}

          {writeError && (
            <p className="text-red-400 text-sm text-center">
              Error: {writeError.message}
            </p>
          )}

          <p className="text-xs text-gray-500 text-center">
            Requires MATIC for gas fees. Minting creates a permanent NFT on Polygon.
          </p>
        </div>
      )}
    </div>
  )
}