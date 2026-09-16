import { NextResponse } from 'next/server'

export const maxDuration = 60

const JWT = process.env.PINATA_JWT!

async function pinFile(file: File, name: string): Promise<string> {
  const form = new FormData()
  form.append('file', file, name)
  form.append('pinataMetadata', JSON.stringify({ name }))
  const res = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
    method: 'POST',
    headers: { Authorization: `Bearer ${JWT}` },
    body: form,
  })
  if (!res.ok) throw new Error(`Pinata file upload failed: ${await res.text()}`)
  const { IpfsHash } = await res.json()
  return IpfsHash
}

async function pinJSON(obj: object, name: string): Promise<string> {
  const res = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
    method: 'POST',
    headers: { Authorization: `Bearer ${JWT}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ pinataMetadata: { name }, pinataContent: obj }),
  })
  if (!res.ok) throw new Error(`Pinata JSON upload failed: ${await res.text()}`)
  const { IpfsHash } = await res.json()
  return IpfsHash
}

export async function POST(request: Request) {
  try {
    const data = await request.formData()
    const file = data.get('file') as File | null
    const name = (data.get('name') as string) || 'Untitled Audio NFT'
    const metadataJson = data.get('metadata') as string | null

    if (!file) return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })

    const audioHash = await pinFile(file, `${name}.webm`)
    const audioURI = `ipfs://${audioHash}`

    const extraMeta = metadataJson ? JSON.parse(metadataJson) : {}
    const metadata = {
      name,
      description: extraMeta.description || `Audio NFT: ${name}`,
      image: extraMeta.image || 'ipfs://QmStaticPlaceholderImageHash',
      animation_url: audioURI,
      attributes: extraMeta.attributes || [],
    }

    const metaHash = await pinJSON(metadata, `${name}-metadata.json`)
    return NextResponse.json({ tokenURI: `ipfs://${metaHash}`, audioURI })

  } catch (error: any) {
    console.error('Mint API error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}