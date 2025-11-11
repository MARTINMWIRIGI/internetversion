import type { Metadata } from "next"
import VaultClientPage from "./vault-client"

export const metadata: Metadata = {
  title: "My Vault - Soul Internet | Your Language NFTs & Contributions",
  description:
    "View your minted language NFTs, track MILSA quality scores, and manage your linguistic and cultural contributions on Soul Internet.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function VaultPage() {
  return <VaultClientPage />
}
