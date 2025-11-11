import type { Metadata } from "next"
import WizardPageClient from "./wizard-client"

export const metadata: Metadata = {
  title: "Contribution Wizard - Soul Internet | Record & Mint Language NFTs",
  description:
    "Step-by-step wizard to record vernacular languages, create waveform NFTs, and earn MILSA rewards on Polygon blockchain.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function WizardPage() {
  return <WizardPageClient />
}
