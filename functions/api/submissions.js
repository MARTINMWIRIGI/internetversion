// /functions/api/submissions.js

// Example: simulate fetching NFTs from IPFS or some storage
// Replace with your actual fetching logic

export async function onRequest() {
  try {
    // Example NFT metadata array
    const storedNFTs = [
      'ipfs://bafybeifakedata1',
      'ipfs://bafybeifakedata2',
    ]

    // Map IPFS URLs to metadata objects
    const submissions = await Promise.all(
      storedNFTs.map(async (url, index) => {
        // Convert IPFS URL to HTTP URL
        const ipfsUrl = url.replace('ipfs://', 'https://ipfs.io/ipfs/')

        // Fetch metadata from IPFS
        let metadata = {}
        try {
          const res = await fetch(ipfsUrl)
          metadata = await res.json()
        } catch (err) {
          console.warn(`Failed to fetch metadata for ${ipfsUrl}:`, err)
        }

        return {
          id: (index + 1).toString(),
          language: metadata.language || 'Unknown',
          words_phrases: metadata.words_phrases || 'Unknown',
          content_type: metadata.content_type || 'text',
          milsa_score: metadata.milsa_score || 0,
          quality_status: metadata.quality_status || 'pending',
          created_at: metadata.created_at || new Date().toISOString(),
          wallet_address: metadata.wallet_address || '0x0',
          nftMetadataUrl: ipfsUrl,
        }
      })
    )

    return new Response(JSON.stringify(submissions), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error('Error fetching NFT submissions:', err)
    return new Response(JSON.stringify([]), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    })
  }
}