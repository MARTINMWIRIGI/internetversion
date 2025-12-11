'use client'

import { ThirdwebProvider } from '@thirdweb-dev/react'
import { Polygon } from '@thirdweb-dev/chains'

export default function ThirdwebProviderWrapper({ children }) {
  return (
    <ThirdwebProvider
      activeChain={Polygon}
      clientId="your-thirdweb-client-id" // Get from thirdweb dashboard
      authConfig={{
        domain: "your-app.com",
        authUrl: "/api/auth"
      }}
    >
      {children}
    </ThirdwebProvider>
  )
}