"use client"

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

export function useWalletAuth() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [userId, setUserId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  // Check if user has connected wallet
  useEffect(() => {
    const checkWalletConnection = async () => {
      if (typeof window !== 'undefined' && window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ 
            method: 'eth_accounts' 
          })
          if (accounts.length > 0) {
            const address = accounts[0]
            setWalletAddress(address)
            await syncUserWithSupabase(address)
          }
        } catch (error) {
          console.error('Error checking wallet:', error)
        }
      }
      setLoading(false)
    }

    checkWalletConnection()

    // Listen for account changes
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0])
          syncUserWithSupabase(accounts[0])
        } else {
          setWalletAddress(null)
          setUserId(null)
        }
      })
    }
  }, [])

  const syncUserWithSupabase = async (walletAddr: string) => {
    try {
      const supabase = createClient()
      
      // Check if user exists
      const { data: existingUser, error: fetchError } = await supabase
        .from('users')
        .select('id')
        .eq('wallet_address', walletAddr)
        .single()

      if (fetchError && fetchError.code !== 'PGRST116') {
        throw fetchError
      }

      let userUuid: string

      if (existingUser) {
        // User exists
        userUuid = existingUser.id
      } else {
        // Create new user
        const { data: newUser, error: insertError } = await supabase
          .from('users')
          .insert({
            wallet_address: walletAddr,
            username: `user_${walletAddr.slice(2, 10)}`,
            total_xp: 0,
            current_level: 1,
            current_streak: 0
          })
          .select('id')
          .single()

        if (insertError) throw insertError
        userUuid = newUser.id
      }

      setUserId(userUuid)
    } catch (error) {
      console.error('Error syncing user with Supabase:', error)
    }
  }

  const connectWallet = async () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ 
          method: 'eth_requestAccounts' 
        })
        if (accounts.length > 0) {
          const address = accounts[0]
          setWalletAddress(address)
          await syncUserWithSupabase(address)
          return address
        }
      } catch (error) {
        console.error('Error connecting wallet:', error)
        throw error
      }
    } else {
      throw new Error('MetaMask not installed')
    }
  }

  const disconnectWallet = () => {
    setWalletAddress(null)
    setUserId(null)
  }

  return {
    walletAddress,
    userId,
    loading,
    connectWallet,
    disconnectWallet,
    isConnected: !!walletAddress
  }
}