# Soul Internet Vault Guardian

Soul Internet is a Web3 platform for preserving African and indigenous
vernacular languages. Contributors can submit cultural and linguistic data,
connect a wallet, preserve files on IPFS, mint layer-based NFTs on Polygon,
and track their contribution in the Soul Internet vault.

## What the project includes

- Next.js 16 application using React 19 and TypeScript
- Wallet connection through RainbowKit, Wagmi, Viem, and WalletConnect
- Supabase authentication, persistence, and submission tracking
- NFT minting through an on-chain contract and Polygon RPC
- IPFS uploads through NFT.Storage and Pinata-backed API routes
- Vault views for biometric, cultural, economic, environmental, experiential,
	and experimental contribution layers
- Guided contribution wizard with language, content, metadata, review, mint,
	and result steps
- Gallery, leaderboard, authentication, whitepaper, and about pages
- Optional Express backend for submission and minting workflows

## Main user flows

1. Open the contribution wizard and choose a language or contribution type.
2. Add text, audio, cultural context, or biometric information as appropriate.
3. Connect a compatible wallet and review the submission metadata.
4. Upload eligible assets to decentralized storage.
5. Mint the contribution as an NFT on Polygon.
6. View the resulting contribution in the vault or gallery.

## Tech stack

| Area | Technologies |
| --- | --- |
| Frontend | Next.js App Router, React, TypeScript, Tailwind CSS |
| Web3 | RainbowKit, Wagmi, Viem, Ethers, Polygon |
| Data and auth | Supabase SSR, Supabase Auth |
| Storage | NFT.Storage, Pinata API routes, IPFS |
| UI | Radix UI, Lucide React, Framer Motion |
| Deployment | Vercel and optional Node.js/Express backend |

## Getting started

### Requirements

- Node.js 18 or newer
- npm
- A Supabase project for authentication and data persistence
- A WalletConnect project ID for wallet connections
- Polygon contract and RPC configuration for minting

### Install and run the Next.js app

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in a browser.

For a production build:

```bash
npm run build
npm run start
```

### Optional backend

The Express server is located in `backend/server.js` and listens on port 4000
by default:

```bash
cd backend
npm install
node server.js
```

The backend manifest currently references `index.js` in its npm scripts; use
`node server.js` unless those scripts are updated to match the checked-in entry
point.

## Environment variables

Create `.env.local` in the project root. Use real values from your own services
and never commit this file.

### Next.js application

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
NEXT_PUBLIC_WALLETCONNECT_ID=your-walletconnect-project-id
NEXT_PUBLIC_CONTRACT_ADDRESS=0xYourContractAddress
NEXT_PUBLIC_POLYGON_RPC_URL=https://polygon-rpc.com
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000

# Server-side storage integrations
NFT_STORAGE_API_KEY=your-nft-storage-key
NFT_STORAGE_KEY=your-nft-storage-key
PINATA_JWT=your-pinata-jwt
```

### Optional Express backend

Add the following variables to `backend/.env` or the backend process
environment when using the optional server:

```env
PORT=4000
NFT_STORAGE_KEY=your-nft-storage-key
CONTRACT_ADDRESS=0xYourContractAddress
MINTER_PRIVATE_KEY=your-server-only-private-key
```

Never expose `MINTER_PRIVATE_KEY`, storage secret keys, or Pinata credentials
with a `NEXT_PUBLIC_` prefix.

## Project structure

```text
app/             Next.js pages, layouts, and API routes
components/      Reusable UI, forms, vault layers, and minting components
backend/         Optional Express API server
lib/             Supabase, wallet, crypto, theme, and utility modules
providers/       Web3 provider setup
public/          Static assets, robots.txt, and sitemap.xml
scripts/         Database initialization scripts
types/           Shared TypeScript declarations
```

Important routes include:

- `/` - Soul Internet landing and contribution experience
- `/wizard` - Guided contribution and minting flow
- `/vault` - Contribution vault and layer views
- `/gallery` - Minted contribution gallery
- `/auth` - Wallet and Supabase authentication
- `/about` and `/whitepaper` - Project context and documentation

## Database setup

The SQL initialization scripts are in `scripts/`:

```text
scripts/init-db.sql
scripts/init-auth-db.sql
```

Run the appropriate scripts in the Supabase SQL editor before testing flows
that persist submissions, authentication data, or minting records.

## Deployment

The primary deployment target is Vercel:

1. Import the repository into Vercel.
2. Configure the required environment variables for the target environment.
3. Deploy with the standard Next.js build command, `npm run build`.
4. Verify wallet connection, Supabase persistence, IPFS upload, and Polygon
	 minting on a test network before using mainnet.

See [README_DEPLOYMENT.md](README_DEPLOYMENT.md) for the detailed deployment
checklist and troubleshooting notes.

## Validation

Run the production build locally before deployment:

```bash
npm run build
```

The repository does not currently define dedicated lint or test scripts in the
root `package.json`. Validate wallet, authentication, upload, and minting flows
manually against test services before production use.

## Security notes

- Do not commit `.env.local`, backend environment files, private keys, or API
	secrets.
- Treat server-side storage credentials and `MINTER_PRIVATE_KEY` as secrets.
- Use a test Polygon network and a restricted test wallet during development.
- Configure Supabase row-level security and authentication policies before
	accepting production submissions.

