// lib/crypto.ts
import { sha256 } from 'js-sha256'

// Hash data (client-side)
export async function hashData(data: any): Promise<string> {
  const dataString = typeof data === 'string' ? data : JSON.stringify(data)
  return sha256(dataString)
}

// Simple encryption (in production, use Web Crypto API or similar)
export async function encryptData(data: string): Promise<string> {
  // For production, implement proper encryption using Web Crypto API
  // This is a simplified version
  const encoder = new TextEncoder()
  const dataBuffer = encoder.encode(data)
  const hash = await crypto.subtle.digest('SHA-256', dataBuffer)
  return btoa(String.fromCharCode(...new Uint8Array(hash)))
}

// Generate encryption key from user data
export async function generateUserKey(userId: string, secret: string): Promise<CryptoKey> {
  const encoder = new TextEncoder()
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(`${userId}:${secret}`),
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  )
  
  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: encoder.encode('soul-internet-biometric-salt'),
      iterations: 100000,
      hash: 'SHA-256'
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  )
}