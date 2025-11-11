import type { Metadata } from "next"
import ClientPage from "./ClientPage"

export const metadata: Metadata = {
  title: "Soul Internet - Preserve Vernacular Languages with Web3 Rewards",
  description:
    "Join Soul Internet Vault Guardian to preserve African vernacular languages. Record linguistic data, mint NFTs, and earn MILSA rewards on Polygon blockchain.",
  alternates: {
    canonical: "https://soul-internet-vault-guardian.vercel.app",
  },
}

export default function Page() {
  return <ClientPage />
}
