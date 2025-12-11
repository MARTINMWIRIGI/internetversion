import { createClient } from '@supabase/supabase-js'
import { NFTStorage } from 'nft.storage'
import { ThirdwebSDK } from '@thirdweb-dev/sdk'
import { ethers } from 'ethers'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const nftstorage = new NFTStorage({ token: process.env.NFT_STORAGE_API_KEY })

export async function POST(request) {
  try {
    const { userId, walletAddress, layerType, dataId } = await request.json()

    // 1. Fetch user data from appropriate table
    const tableMap = {
      cultural: 'cultural_data',
      biometric: 'biometric_srfs',
      voice: 'voice_samples',
      emotional: 'emotional_patterns',
      language: 'language_progress',
      behavioral: 'behavioral_data'
    }

    const sourceTable = tableMap[layerType]
    if (!sourceTable) {
      return Response.json({ error: 'Invalid layer type' }, { status: 400 })
    }

    const { data: layerData, error } = await supabase
      .from(sourceTable)
      .select('*')
      .eq('id', dataId)
      .single()

    if (error) throw error

    // 2. Generate NFT metadata
    const metadata = generateMetadata(layerData, layerType, userId)

    // 3. Upload to IPFS
    const cid = await uploadToIPFS(metadata, layerData)

    // 4. Check if already minted
    const { data: existing } = await supabase
      .from('nft_minting_tracker')
      .select('token_id')
      .eq('source_table', sourceTable)
      .eq('source_id', dataId)
      .eq('status', 'minted')
      .single()

    if (existing) {
      return Response.json({
        alreadyMinted: true,
        tokenId: existing.token_id,
        openseaUrl: `https://opensea.io/assets/matic/${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}/${existing.token_id}`
      })
    }

    // 5. Mint NFT on Polygon
    const { tokenId, txHash } = await mintNFT(cid, walletAddress)

    // 6. Store in database
    await supabase.from('nft_minting_tracker').insert({
      user_id: userId,
      wallet_address: walletAddress,
      token_id: tokenId,
      layer_type: layerType,
      source_table: sourceTable,
      source_id: dataId,
      metadata_ipfs_cid: cid,
      metadata_json: metadata,
      transaction_hash: txHash,
      status: 'minted'
    })

    return Response.json({
      success: true,
      tokenId,
      transactionHash: txHash,
      ipfsUrl: `https://ipfs.io/ipfs/${cid}`,
      openseaUrl: `https://opensea.io/assets/matic/${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}/${tokenId}`,
      metadata
    })

  } catch (error) {
    console.error('Minting error:', error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}

function generateMetadata(layerData, layerType, userId) {
  const types = {
    cultural: {
      name: `Cultural Heritage #${userId.slice(0, 8)}`,
      description: "A unique cultural expression from my language learning journey",
      attributes: [
        { trait_type: "Type", value: "Cultural Artifact" },
        { trait_type: "Rarity", value: calculateRarity(layerData) },
        { trait_type: "Origin", value: layerData.origin || "Unknown" }
      ]
    },
    biometric: {
      name: `Biometric Pattern #${userId.slice(0, 8)}`,
      description: "Unique biometric signature captured during learning sessions",
      attributes: [
        { trait_type: "Type", value: "Biometric Signature" },
        { trait_type: "Session Count", value: layerData.session_count || 1 },
        { trait_type: "Pattern", value: layerData.pattern_type || "Unique" }
      ]
    },
    voice: {
      name: `Voice Identity #${userId.slice(0, 8)}`,
      description: "Voice biometric sample showing language pronunciation progress",
      attributes: [
        { trait_type: "Type", value: "Voice Sample" },
        { trait_type: "Duration", value: `${layerData.duration || 0}s` },
        { trait_type: "Language", value: layerData.language || "Multiple" }
      ]
    }
  }

  const template = types[layerType] || {
    name: `Learning Artifact #${userId.slice(0, 8)}`,
    description: "A milestone in my language learning journey",
    attributes: [
      { trait_type: "Layer Type", value: layerType },
      { trait_type: "Created", value: new Date().toISOString().split('T')[0] }
    ]
  }

  return {
    ...template,
    image: `ipfs://bafybeig4s2z6g47o5o2v3v6qo3vqo3vqo3vqo3vqo3vqo3vqo3vqo3vqo3vqo/${layerType}.png`,
    external_url: "https://your-app.com/vault",
    background_color: "000000"
  }
}

async function uploadToIPFS(metadata, layerData) {
  // Add image generation based on layer data
  const nft = {
    ...metadata,
    properties: {
      raw_data: layerData,
      timestamp: new Date().toISOString(),
      version: "1.0"
    }
  }

  const blob = new Blob([JSON.stringify(nft)], { type: 'application/json' })
  const cid = await nftstorage.storeBlob(blob)
  return cid
}

async function mintNFT(metadataCid, walletAddress) {
  // Connect to Polygon using Thirdweb
  const sdk = ThirdwebSDK.fromPrivateKey(
    process.env.PRIVATE_KEY,
    "polygon",
    {
      clientId: "your-thirdweb-client-id", // Optional
      secretKey: "your-thirdweb-secret-key" // Optional
    }
  )

  const contract = await sdk.getContract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS)
  
  // Lazy mint with metadata
  const metadataUri = `ipfs://${metadataCid}`
  
  // Since your contract is already deployed with thirdweb, use their methods
  const tx = await contract.erc1155.mintTo(walletAddress, {
    metadata: metadataUri,
    supply: 1
  })

  return {
    tokenId: tx.id,
    txHash: tx.receipt.transactionHash
  }
}