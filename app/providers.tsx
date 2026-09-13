'use client'

import '@rainbow-me/rainbowkit/styles.css'
import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit'
import { WagmiProvider } from 'wagmi'
import {
  polygon,
  polygonMumbai,
} from 'wagmi/chains'
import {
  QueryClientProvider,
  QueryClient,
} from '@tanstack/react-query'

const config = getDefaultConfig({
  appName: 'Vault Guardian',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_ID || 'YOUR_WALLETCONNECT_PROJECT_ID',
  chains: [polygon, polygonMumbai],
  ssr: true,
})

const queryClient = new QueryClient()

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
