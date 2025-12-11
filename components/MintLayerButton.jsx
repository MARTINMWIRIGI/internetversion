// components/MintLayerButton.jsx
'use client'

import { useState } from 'react'
import { useWallet } from '@thirdweb-dev/react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default function MintLayerButton({ layer, userId }) {
  const { address, connect } = useWallet()
  const [isMinting, setIsMinting] = useState(false)
  const [mintedData, setMintedData] = useState(null)

  const mintLayer = async () => {
    if (!address) {
      await connect()
      return
    }

    setIsMinting(true)
    try {
      const response = await fetch('/api/mint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          walletAddress: address,
          layerType: layer.type,
          dataId: layer.id
        })
      })

      const result = await response.json()

      if (result.alreadyMinted) {
        setMintedData({
          tokenId: result.tokenId,
          openseaUrl: result.openseaUrl,
          alreadyMinted: true
        })
      } else if (result.success) {
        setMintedData({
          tokenId: result.tokenId,
          openseaUrl: result.openseaUrl,
          ipfsUrl: result.ipfsUrl,
          txHash: result.transactionHash
        })
        
        // Show success notification
        alert(`🎉 NFT Minted Successfully!\nToken ID: ${result.tokenId}\nView on OpenSea: ${result.openseaUrl}`)
      } else {
        throw new Error(result.error || 'Minting failed')
      }
    } catch (error) {
      console.error('Minting error:', error)
      alert(`❌ Error minting NFT: ${error.message}`)
    } finally {
      setIsMinting(false)
    }
  }

  return (
    <div className="mint-layer-container">
      <button
        onClick={mintLayer}
        disabled={isMinting}
        className={`mint-button ${isMinting ? 'minting' : ''}`}
      >
        {isMinting ? (
          <>
            <span className="spinner"></span>
            Minting...
          </>
        ) : mintedData?.alreadyMinted ? (
          '✅ Already Minted'
        ) : (
          '✨ Mint as NFT'
        )}
      </button>

      {mintedData && !mintedData.alreadyMinted && (
        <div className="mint-success">
          <p>🎉 NFT Minted Successfully!</p>
          <div className="mint-links">
            <a 
              href={mintedData.openseaUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="opensea-link"
            >
              View on OpenSea
            </a>
            <a 
              href={`https://polygonscan.com/tx/${mintedData.txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="polygonscan-link"
            >
              View on Polygonscan
            </a>
            <a 
              href={mintedData.ipfsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ipfs-link"
            >
              View IPFS Metadata
            </a>
          </div>
        </div>
      )}

      {mintedData?.alreadyMinted && (
        <div className="already-minted">
          <p>✅ NFT already minted</p>
          <a 
            href={mintedData.openseaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="view-nft-link"
          >
            View Existing NFT
          </a>
        </div>
      )}
    </div>
  )
}