# Vault Guardian - NFT Minting Setup Guide

## Quick Start

This is a Polygon-based NFT minting application that allows users to mint cultural heritage data as NFTs on OpenSea.

### Prerequisites

1. **MetaMask Wallet** - Install MetaMask browser extension
2. **MATIC Tokens** - Have some MATIC on Polygon Mainnet for gas fees
3. **NFT Storage API Key** - Get from https://nft.storage

### Environment Setup

1. Copy `.env.local.example` to `.env.local`:
\`\`\`bash
cp .env.local.example .env.local
\`\`\`

2. Update the values in `.env.local` with your own (optional - defaults are provided):
\`\`\`
NEXT_PUBLIC_NFT_STORAGE_KEY=your_nft_storage_key
NEXT_PUBLIC_CONTRACT_ADDRESS=0x202934e4dF29E57Ab7498bB31946174d7C95eDc7
\`\`\`

### Installation

\`\`\`bash
npm install
\`\`\`

### Running Locally

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

### How It Works

1. **Connect Wallet** - Click "Connect Wallet" to connect MetaMask
2. **Fill Wizard Form** - Enter cultural heritage data:
   - Wizard Name
   - Description
   - Cultural Context
   - Special Attributes
   - Image URL (optional)
3. **Mint NFT** - Click "Mint Wizard NFT"
   - Metadata is uploaded to IPFS via NFT.storage
   - NFT is minted to your contract on Polygon
4. **Verify** - View transaction on Polygonscan and OpenSea

### Contract Details

- **Network:** Polygon Mainnet (Chain ID: 137)
- **Contract Address:** `0x202934e4dF29E57Ab7498bB31946174d7C95eDc7`
- **Storage:** NFT.storage (IPFS)

### Troubleshooting

**MetaMask Not Found:**
- Install MetaMask from https://metamask.io

**Wrong Network:**
- The app will automatically prompt you to switch to Polygon Mainnet

**Insufficient Gas:**
- Ensure you have enough MATIC tokens on Polygon Mainnet
- Get testnet MATIC from faucets if needed

**Upload Failed:**
- Check your NFT Storage API key in `.env.local`
- Verify the key is valid at https://nft.storage

### Deployment

To deploy to production:

\`\`\`bash
npm run build
\`\`\`

Deploy to Vercel or your hosting platform.

### Technologies Used

- **Next.js 16** - React framework
- **Ethers.js** - Web3 library
- **NFT.storage** - IPFS storage
- **Polygon** - Blockchain network
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
