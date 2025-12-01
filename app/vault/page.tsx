import type { Metadata } from "next"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "My Human Vault - Soul Internet | Multi-Layer Identity",
  description:
    "Your multi-dimensional human vault with biometric, cultural, environmental, experiential, and economic layers. Preserve your identity across generations.",
  robots: {
    index: false,
    follow: false,
  },
}

// Loading component
function VaultLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-purple-950 flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-purple-500/30 rounded-full"></div>
          <div className="w-20 h-20 border-4 border-purple-500 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
        </div>
        <p className="mt-6 text-xl font-semibold text-white">Opening Your Human Vault</p>
        <p className="mt-2 text-purple-400">Loading multi-layer identity system...</p>
        <div className="mt-8 flex justify-center gap-2">
          <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-cyan-500 rounded-full animate-pulse delay-100"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse delay-200"></div>
        </div>
      </div>
    </div>
  )
}

// Dynamically import to avoid SSR issues
import dynamic from 'next/dynamic'

const VaultClient = dynamic(() => import('./vault-client'), {
  ssr: false,
  loading: () => <VaultLoading />,
})

export default function VaultPage() {
  return (
    <Suspense fallback={<VaultLoading />}>
      <VaultClient />
    </Suspense>
  )
}