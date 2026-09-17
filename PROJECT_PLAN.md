🚀 SOUL INTERNET VAULT — SIMPLIFICATION & MVP INSTRUCTIONS

I want to simplify the existing Soul Internet Vault Guardian project drastically.

The goal is to remove all nonessential code, dependencies, pages, database logic and features while keeping ONLY the core functionality required to make the MVP work reliably and deploy successfully on Vercel.

🎯 CORE MVP FLOW — DO NOT REMOVE

The application should have one simple user journey:

Connect Wallet → Enter Cultural Word/Data → Record Audio → Upload to IPFS → Mint NFT on Polygon → View OpenSea/PolygonScan

1️⃣ WALLET CONNECTION

Retain wallet connection functionality using:

- Wagmi
- Viem
- RainbowKit
- Polygon Mainnet
- MetaMask
- WalletConnect
- Coinbase Wallet

Users must be able to connect their wallet before minting.

2️⃣ CULTURAL DATA INPUT

Keep a simple contribution form containing:

- Vernacular word/phrase
- Meaning
- Language
- Proverb or cultural context
- Optional contributor name
- Audio recording

Keep the UI simple and mobile-friendly.

3️⃣ AUDIO RECORDING

Retain browser-based microphone recording.

Users should be able to:

- Start recording
- Stop recording
- Listen to/preview recording
- Delete/re-record
- Submit the final recording

Do not add complicated biometric processing.

4️⃣ IPFS STORAGE

The submitted data should be converted into NFT metadata and uploaded to IPFS.

Keep only the necessary IPFS integration, preferably Pinata.

The NFT metadata should contain things such as:

- Word/phrase
- Meaning
- Language
- Cultural context
- Audio IPFS URI
- Contributor/wallet
- Timestamp

The resulting metadata URI should be:

"ipfs://..."

5️⃣ POLYGON NFT MINTING

Retain the existing Polygon contract:

"0x202934e4dF29E57Ab7498bB31946174d7C95eDc7"

The application must allow the connected wallet to execute the required mint function.

Use the simplest reliable implementation possible.

The mint should attach the IPFS metadata URI to the NFT.

6️⃣ OPENSEA + POLYGONSCAN

After a successful transaction, display:

✅ Transaction hash
✅ PolygonScan link
✅ NFT/token information
✅ OpenSea link

The OpenSea link should follow the correct Polygon asset format and use the actual contract address + token ID.

Example:

"https://opensea.io/assets/matic/CONTRACT_ADDRESS/TOKEN_ID"

Do not claim an NFT was successfully minted until the blockchain transaction has actually succeeded.

---

🧹 REMOVE EVERYTHING NONESSENTIAL

Remove or completely disable:
  
❌ Six Soul Layer system  
❌ Biometric/SRFS functionality  
❌ Environmental layer  
❌ Economic layer  
❌ Experiential layer  
❌ Experimental linguistic layer  
❌ Complex leaderboard  
❌ Token reward calculations  
❌ MILSA conversion system  
❌ DAO/governance functionality  
❌ Complex user profiles  
❌ Legacy authentication  
❌ Unnecessary Supabase tables  
❌ Deprecated API routes  
❌ Duplicate backend/functions folders  
❌ Unused components  
❌ Unused UI libraries  
❌ Unused animations  
❌ Redundant Web3 libraries  
❌ Any code that isn't required for the MVP

The Vault should essentially become a simple cultural NFT minting application.

---

📦 DEPENDENCY CLEANUP

Audit "package.json".

Remove every dependency that isn't required.

Avoid conflicts between:

- ethers
- viem
- wagmi
- RainbowKit
- old Supabase packages
- deprecated authentication packages

Use the simplest modern Web3 stack possible.

The final project should have a clean installation with:

"npm install"

and a clean production build with:

"npm run build"

No unnecessary warnings or dependency conflicts.

---

🗂️ SIMPLIFY THE PROJECT STRUCTURE

The final application should be very small and understandable.

Keep only the necessary:

- Next.js App Router
- Wallet connection
- Contribution form
- Audio recorder
- IPFS upload
- NFT minting
- Success/verification page

Remove obsolete routes, components and folders.

---

🔐 ENVIRONMENT VARIABLES

Keep only the environment variables genuinely required for:

- WalletConnect/RainbowKit
- Pinata/IPFS
- Polygon RPC if required
- Any contract confirmation