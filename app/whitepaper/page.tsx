// app/whitepaper/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Download, 
  BookOpen, 
  Globe, 
  Users, 
  Brain, 
  Shield, 
  Lock, 
  Database,
  ArrowLeft,
  Printer,
  Share2,
  Cpu,
  Server,
  Network,
  Wallet,
  Key,
  Fingerprint,
  Heart,
  Sparkles,
  GitBranch,
  Smartphone,
  Satellite,
  Cloud,
  Rocket,
  ShieldCheck,
  Zap,
  Layers,
  Clock,
  Award,
  Target,
  TrendingUp,
  PieChart,
  BarChart3,
  Users as UsersIcon,
  Building,
  School,
  Banknote,
  Globe as GlobeIcon,
  ShieldAlert,
  Link as LinkIcon,
  FileText,
  Code,
  Terminal,
  BarChart,
  LifeBuoy,
  Compass
} from 'lucide-react';
import Link from 'next/link';

export default function WhitepaperPage() {
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const section = new URLSearchParams(window.location.search).get('section');
    const sectionPageMap: Record<string, number> = {
      tokenomics: 4,
      roadmap: 7,
    };

    if (section && sectionPageMap[section] !== undefined) {
      setCurrentPage(sectionPageMap[section]);
    }
  }, []);

  const whitepaperContent = [
    {
      title: "SOUL INTERNET WHITEPAPER v1.0",
      subtitle: "A Quantum-Resistant Multi-Layered Cultural & Biometric Blockchain Protocol",
      content: `
        PROTOCOL VERSION: 1.0.0
        RELEASE DATE: 24th July 2025
        NETWORK: Ethereum Mainnet + Layer 2 Solutions
        PROTOCOL: MultiSoul ERC-721 + MILSA ERC-20
        DEVELOPED BY: Imperial Enterprise
        HEADQUARTERS: Nairobi, Kenya

        Official Websites:
        • soulinternet.xyz (Primary Domain)
        • soul-internet.com (Corporate Portal)
        • soulinternet.eth (ENS Web3 Gateway)

        Official Contacts:
        • Technical Support: support@soul-internet.com
        • Business Inquiries: info@soul-internet.com
        • Founder Office: founder@soul-internet.com
        • Office: ceo@soul-internet.com
        • migwi@soul-internet.com
        • Imperial Enterprise (Protocol Developers)
        • IMPERIAL ENTERPRISE 
        

        This whitepaper outlines the technical specifications, economic model,
        and long-term vision for Soul Internet - a revolutionary blockchain protocol
        designed to preserve human identity and culture for generations to come.
      `
    },
    {
      title: "EXECUTIVE SUMMARY",
      quote: "A Moment Lost Is a Civilization Erased. A Word Unspoken Is a Culture Vanished.",
      content: `
        SOUL INTERNET represents a paradigm shift in digital identity preservation
        and cultural archiving. Born from the recognition that humanity loses
        approximately one language every two weeks, and with it, centuries of
        cultural wisdom, Soul Internet provides a permanent, immutable solution.

        CORE INNOVATIONS:

        1. MULTI-DIMENSIONAL IDENTITY CAPTURE
        • Cultural DNA: Languages, traditions, oral histories, rituals
        • Biometric Signatures: Encrypted biological patterns (voice, gait, heartbeat)
        • Environmental Context: Geolocation, climate data, atmospheric conditions
        • Emotional Patterns: Mood signatures, behavioral rhythms
        • Economic Footprint: Skills, contributions, value creation

        2. BLOCKCHAIN-BASED IMMORTALITY
        • Permanent storage on decentralized networks
        • Zero-knowledge proof privacy protection
        • Quantum-resistant encryption standards
        • Multi-sig access control systems

        3. ECONOMIC INCENTIVE MODEL
        • MILSA Token ecosystem: 1 MILSA = $0.01 USD
        • Micro-rewards for cultural contributions
        • Global accessibility, African-first design
        • M-Pesa integration for instant Kenyan Shilling conversion

        MISSION STATEMENT:
        To create the world's most comprehensive human identity preservation system,
        where every individual can securely store their cultural, biometric, and
        experiential data while earning economic value from their contributions.

        VISION 2030:
        Preserve 1 billion cultural artifacts, protect 1,000 endangered languages,
        and onboard 100 million users to digital identity sovereignty.
      `
    },
    {
      title: "THE GLOBAL CRISIS: DATA LOSS & CULTURAL EXTINCTION",
      content: `
        QUANTIFYING THE PROBLEM:

        I. CULTURAL ANNIHILATION STATISTICS
        • 7,000+ languages currently spoken worldwide
        • 40% of languages endangered (UNESCO 2024)
        • 1 language dies every 14 days (average)
        • 90% of African languages have no written documentation
        • 70% of indigenous knowledge exists only in oral tradition
        • $2.3 trillion annual cultural heritage tourism market at risk

        II. DIGITAL IDENTITY THEFT & EXPLOITATION
        • 3.4 billion personal records stolen in 2024 alone
        • $6.9 trillion projected cybercrime cost by 2025
        • 80% of biometric data collected without informed consent
        • 95% of cultural data monetized by corporations, 0% to origin communities
        • 60% decrease in traditional craft knowledge transmission (1980-2024)

        III. WEB3 ADOPTION BARRIERS (AFRICAN CONTEXT)
        • Average gas fees: $15-50 per transaction (prohibitive for micro-contributions)
        • Wallet complexity: 87% abandonment rate among first-time users
        • Smart contract literacy: <2% of African population
        • Infrastructure gaps: 65% lack consistent high-speed internet
        • Financial inclusion: 350 million unbanked adults in Sub-Saharan Africa

        IV. ENVIRONMENTAL DATA GAPS
        • 0 comprehensive carbon footprint tracking for individuals
        • 70% of traditional ecological knowledge undocumented
        • 40% of climate adaptation strategies exist only in oral tradition
        • $100 billion annual loss from undocumented indigenous conservation methods

        Soul Internet directly addresses these systemic failures through:
        1. Zero-gas micro-transactions via Layer 2 solutions
        2. Biometric abstraction (never raw data collection)
        3. MILSA token economics designed for $0.01 increments
        4. Mobile-first, SMS/USSD accessible interfaces
        5. Cultural contribution rewards starting at KSh 1.50 per word
      `
    },
    {
      title: "MULTISOUL NFT: TECHNICAL ARCHITECTURE",
      subtitle: "The World's First Expandable Multi-Layered Human Identity Capsule",
      content: `
        I. CORE SPECIFICATIONS
        • Protocol Standard: ERC-721 with ERC-1155 compatibility
        • Maximum Layers: 255 per MultiSoul NFT
        • Layer Types: 8 primary categories, 64 subcategories
        • Storage: IPFS + Filecoin + Arweave redundancy
        • Encryption: AES-256 + RSA-4096 hybrid encryption
        • Upgrade Cycle: Bi-annual protocol updates

        II. LAYER ARCHITECTURE DETAILS

        A. CULTURAL LAYERS (40% weight)
        1. Linguistic Matrix
           • Phonetic recordings (WAV/MP3/FLAC)
           • Text transcriptions (UTF-8 multi-language)
           • Grammatical structures (JSON-LD semantic markup)
           • Dialect variations (geospatial mapping)

        2. Traditional Knowledge Bank
           • Ritual procedures (step-by-step documentation)
           • Medicinal plant knowledge (image + usage + preparation)
           • Agricultural calendars (seasonal + lunar tracking)
           • Craft techniques (3D modeling + material specifications)

        3. Oral History Repository
           • Elder testimonies (video + audio + transcript)
           • Historical events (timestamped + geolocated)
           • Genealogical records (family tree structures)
           • Migration patterns (temporal + spatial data)

        B. BIOMETRIC ABSTRACTION LAYERS (25% weight)
        1. Voice Signature Matrix
           • 128-dimension MFCC feature vectors
           • Encrypted spectrogram patterns
           • Language-independent vocal biomarkers

        2. Behavioral Biometrics
           • Keystroke dynamics (timing + pressure + rhythm)
           • Mouse/touch gesture patterns (heatmap + velocity)
           • Device usage rhythms (temporal behavior clusters)

        3. Physiological Patterns
           • Heart rate variability signatures (encrypted PPG data)
           • Gait analysis from accelerometer data
           • Breathing pattern abstractions (anonymized)

        C. ENVIRONMENTAL CONTEXT LAYERS (15% weight)
        1. Geospatial Metadata
           • GPS coordinates (encrypted + hashed)
           • Altitude + atmospheric pressure
           • Magnetic field variations
           • Ambient light spectrum analysis

        2. Climate Signature
           • Temperature + humidity patterns
           • Barometric pressure trends
           • Solar radiation levels
           • Precipitation history

        3. Acoustic Environment
           • Ambient noise profiles (dB levels + frequency)
           • Natural soundscape recordings
           • Urban vs rural acoustic fingerprints

        D. EMOTIONAL & COGNITIVE LAYERS (10% weight)
        1. Mood Pattern Recognition
           • Daily emotional state tracking
           • Stress response biomarkers
           • Cognitive load measurements
           • Creativity flow states

        2. Learning & Memory Patterns
           • Knowledge acquisition rates
           • Skill development trajectories
           • Problem-solving approaches
           • Decision-making patterns

        E. ECONOMIC & SOCIAL LAYERS (10% weight)
        1. Professional Identity
           • Verified skill certifications
           • Work history + achievements
           • Income patterns + economic contributions
           • Entrepreneurial ventures

        2. Social Contribution Matrix
           • Community leadership roles
           • Volunteer hours + impact
           • Mentorship relationships
           • Cultural transmission activities

        III. TECHNICAL SECURITY FEATURES
        • Zero-knowledge proofs for layer validation
        • Multi-party computation for sensitive data
        • Hardware Security Module (HSM) integration
        • Regular security audits (quarterly)
        • Bug bounty program ($100,000 pool)
      `
    },
    {
      title: "MILSA TOKEN ECONOMICS v2.0",
      subtitle: "Micro-Value Ecosystem for Macro-Human Impact",
      content: `
        I. TOKEN FUNDAMENTALS
        • Token Name: MILSA (Micro Identity Layer Soul Asset)
        • Token Standard: ERC-20 with EIP-2612 permit functionality
        • Total Supply: 2,000,000,000 MILSA (2 billion)
        • Initial Value: 1 MILSA = $0.01 USD
        • Decimal Places: 18 (for micro-transaction precision)
        • Blockchains: Ethereum + Polygon + Arbitrum + Base
        • Cross-chain: Wormhole + LayerZero bridges

        II. VALUE PROPOSITION
        1. Utility-Driven Valuation
           • Layer activation: 100 MILSA per layer
           • NFT minting: 500 MILSA base fee
           • Vault storage: 10 MILSA/month per GB
           • API access: 1 MILSA/1,000 requests
           • Data validation: 5 MILSA per verification

        2. Reward Mechanisms
           • Cultural contribution: 1-100 MILSA based on rarity
           • Biometric abstraction: 3-50 MILSA based on uniqueness
           • Environmental data: 2-20 MILSA based on precision
           • Memory preservation: 1.5-30 MILSA based on completeness
           • Skill verification: 2.5-100 MILSA based on market demand

        III. TOKEN DISTRIBUTION (10-Year Schedule)

        Phase 1: Foundation (Years 1-2)
        • Reserved Supply: 1,000,000,000 MILSA (50%)
           - Ecosystem development: 400,000,000 (20%)
           - Security reserve: 300,000,000 (15%)
           - Protocol upgrades: 200,000,000 (10%)
           - Emergency fund: 100,000,000 (5%)

        • Founder Allocation: 300,000,000 MILSA (15%)
           - 4-year vesting, 1-year cliff
           - 25% released annually
           - Performance-based milestones

        • Investor Round: 200,000,000 MILSA (10%)
           - Seed round: 50,000,000 (2.5%)
           - Series A: 100,000,000 (5%)
           - Strategic partners: 50,000,000 (2.5%)

        • Developer Pool: 100,000,000 MILSA (5%)
           - Core team: 60,000,000 (3%)
           - Open source contributors: 40,000,000 (2%)

        • Community Treasury: 200,000,000 MILSA (10%)
           - Grants program: 100,000,000 (5%)
           - Liquidity pools: 60,000,000 (3%)
           - Marketing: 40,000,000 (2%)

        • Public Distribution: 200,000,000 MILSA (10%)
           - Airdrops: 50,000,000 (2.5%)
           - Staking rewards: 100,000,000 (5%)
           - Exchange listings: 50,000,000 (2.5%)

        IV. MONETIZATION & REVENUE STREAMS
        1. Primary Revenue (Year 1-3)
           • NFT minting fees: 40% of revenue
           • Layer storage fees: 30% of revenue
           • API access fees: 20% of revenue
           • Premium features: 10% of revenue

        2. Secondary Revenue (Year 4+)
           • Data licensing (anonymized): 25%
           • Corporate onboarding: 20%
           • AI training datasets: 15%
           • Research partnerships: 10%
           • Government contracts: 30%

        V. KENYAN MARKET SPECIFICS
        • M-Pesa Integration: Instant MILSA ↔ KSh conversion
        • Exchange Rate: 1 MILSA = KSh 1.50 (pegged to $0.01 USD)
        • Minimum Cashout: 100 MILSA = KSh 150
        • Transaction Speed: <2 minutes M-Pesa settlement
        • Local Partners: Safaricom, Equity Bank, KCB Group
      `
    },
    {
      title: "TECHNOLOGY STACK & INFRASTRUCTURE",
      content: `
        I. BLOCKCHAIN ARCHITECTURE
        1. Core Protocol Layer
           • Ethereum Mainnet: Root registry + governance
           • Polygon PoS: High-volume transactions
           • Arbitrum Nova: Ultra-low cost minting
           • Base: Coinbase integration + US user base

        2. Smart Contract Suite
           • MultiSoulFactory.sol: NFT creation + management
           • MILSAToken.sol: ERC-20 with advanced features
           • LayerRegistry.sol: Dynamic layer addition/removal
           • RewardDistributor.sol: Automated MILSA distribution
           • Governance.sol: DAO voting + proposal system

        3. Storage Solutions
           • IPFS Cluster: Primary decentralized storage
           • Filecoin: Long-term archival + redundancy
           • Arweave: Permanent storage (200+ year guarantee)
           • AWS S3 Glacier: Emergency backup (encrypted)

        II. SECURITY INFRASTRUCTURE
        1. Encryption Standards
           • Data at rest: AES-256-GCM
           • Data in transit: TLS 1.3 + quantum-resistant algorithms
           • Key management: HashiCorp Vault + AWS KMS
           • Zero-knowledge proofs: zk-SNARKs implementation

        2. Access Control
           • Multi-factor authentication: Biometric + hardware key
           • Role-based access control (RBAC): 8 permission levels
           • Time-locked operations: 24-72 hour security delays
           • Multi-sig wallets: 3-of-5 for treasury management

        3. Audit & Compliance
           • Quarterly security audits: Trail of Bits, CertiK
           • Continuous monitoring: 24/7 SOC team
           • Bug bounty: $100,000 maximum reward
           • Regulatory compliance: GDPR, CCPA, Kenya Data Act

        III. FRONTEND ARCHITECTURE
        1. Web Application
           • Framework: Next.js 14 + React 18
           • Styling: Tailwind CSS + Framer Motion
           • State management: Zustand + React Query
           • Authentication: NextAuth + WalletConnect

        2. Mobile Applications
           • iOS: SwiftUI + React Native
           • Android: Kotlin + React Native
           • Feature Phones: USSD menu system
           • SMS Gateway: Twilio + Africa's Talking

        3. API Infrastructure
           • REST API: Node.js + Express
           • GraphQL: Apollo Server
           • WebSocket: Real-time notifications
           • Rate limiting: Redis-based throttling

        IV. AI & MACHINE LEARNING INTEGRATION
        1. Natural Language Processing
           • Language detection: 7,000+ languages
           • Transcription: 99% accuracy for major dialects
           • Translation: Neural machine translation
           • Sentiment analysis: Cultural context awareness

        2. Biometric Processing
           • Voice recognition: 128-dimension feature extraction
           • Pattern analysis: Deep learning anomaly detection
           • Privacy preservation: Federated learning models
           • Real-time processing: Edge computing optimization

        3. Data Analytics
           • Cultural trend analysis: Time-series forecasting
           • Rarity scoring: Machine learning classifiers
           • Value prediction: Regression models
           • Anomaly detection: Unsupervised learning
      `
    },
    {
      title: "USE CASES & APPLICATION SCENARIOS",
      content: `
        I. CULTURAL PRESERVATION (Primary Use Case)
        1. Language Revitalization Programs
           • Endangered language documentation
           • Digital dictionary creation
           • Pronunciation guide generation
           • Grammatical structure preservation

        2. Museum & Archive Digitization
           • Artifact 3D scanning + metadata
           • Curatorial narrative preservation
           • Interactive exhibition creation
           • Educational resource development

        3. Indigenous Knowledge Protection
           • Traditional medicine database
           • Agricultural calendar preservation
           • Weather prediction methods
           • Astronomical observation records

        II. PERSONAL IDENTITY MANAGEMENT
        1. Digital Legacy Creation
           • Multi-generational family archives
           • Personal history time capsules
           • Skill + knowledge inheritance
           • Ethical will + value transmission

        2. Professional Identity Verification
           • Skill certification + validation
           • Work history immutability
           • Achievement recognition system
           • Reputation scoring mechanism

        3. Health & Wellness Tracking
           • Biometric trend analysis
           • Mental health pattern recognition
           • Wellness journey documentation
           • Medical history secure storage

        III. INSTITUTIONAL APPLICATIONS
        1. Educational Institutions
           • Student portfolio management
           • Academic achievement verification
           • Research data preservation
           • Alumni network building

        2. Corporate Sector
           • Employee skill certification
           • Corporate culture preservation
           • Brand heritage documentation
           • Customer identity management

        3. Government & NGOs
           • Citizen identity systems
           • Cultural heritage protection
           • Refugee identity restoration
           • Development program tracking

        IV. RESEARCH & DEVELOPMENT
        1. Academic Research
           • Anthropological studies
           • Linguistic analysis
           • Historical research
           • Social science data

        2. Medical Research
           • Biometric pattern studies
           • Disease prevalence tracking
           • Treatment effectiveness
           • Public health monitoring

        3. AI Training Data
           • Ethical dataset creation
           • Cultural context training
           • Language model improvement
           • Bias reduction initiatives

        V. ECONOMIC EMPOWERMENT
        1. Micro-Entrepreneurship
           • Cultural content monetization
           • Skill-based service offering
           • Digital product creation
           • Global market access

        2. Community Development
           • Collective cultural assets
           • Tourism enhancement
           • Local economic stimulation
           • Sustainable development

        3. Financial Inclusion
           • Digital asset ownership
           • Micro-transaction capability
           • Cross-border payments
    • Savings + investment tools
      `
    },
    {
      title: "ROADMAP & DEVELOPMENT TIMELINE",
      content: `
        PHASE 1: FOUNDATION (Q3 2024 - Q2 2025) ✓ COMPLETED
        • Core protocol design + architecture
        • MultiSoul NFT standard development
        • MILSA token economics modeling
        • Initial security audit completion
        • Testnet deployment (Goerli + Mumbai)

        PHASE 2: LAUNCH & EARLY ADOPTION (Q3 2025 - Q4 2025)
        • Mainnet deployment (Ethereum + Polygon)
        • First 1,000 MultiSoul NFTs minted
        • MILSA token distribution begins
        • Kenyan market launch (M-Pesa integration)
        • First university partnerships (University of Nairobi, Kenyatta University)

        PHASE 3: SCALING & EXPANSION (2026)
        • Mobile app launch (iOS + Android)
        • USSD/SMS gateway for feature phones
        • Corporate onboarding program (50+ companies)
        • Government partnerships (3+ African nations)
        • Exchange listings (3 major CEX, 5 DEX)

        PHASE 4: GLOBAL GROWTH (2027)
        • European + North American expansion
        • 1 million active users milestone
        • 100,000 cultural artifacts preserved
        • 50 endangered languages documented
        • $10 million ecosystem valuation

        PHASE 5: MATURITY & INNOVATION (2028-2030)
        • Full DAO transition completion
        • AI integration advanced features
        • Quantum computing readiness
        • 10 million active users
        • $100 million ecosystem valuation

        KEY MILESTONES:
        • 2025 Q4: 10,000 MultiSoul NFTs
        • 2026 Q2: 100,000 MILSA token holders
        • 2026 Q4: $1 million in rewards distributed
        • 2027 Q2: 500 corporate partners
        • 2027 Q4: 1,000 educational institutions
        • 2028: Global standardization efforts
      `
    },
    {
      title: "TEAM, PARTNERS & ADVISORS",
      content: `
        I. CORE DEVELOPMENT TEAM
        Imperial Enterprise Development Unit:
        • senior blockchain engineers
        • AI/ML specialists
        • cybersecurity experts
        • cultural anthropologists
        • linguistic experts
             `
    },
    {
      title: "RISK ANALYSIS & MITIGATION STRATEGIES",
      content: `
        I. TECHNICAL RISKS
        1. Smart Contract Vulnerabilities
           • Risk Level: HIGH (Initial phases)
           • Mitigation: Quarterly audits + formal verification
           • Insurance: $5 million smart contract coverage
           • Response: 24/7 emergency response team

        2. Data Security Breaches
           • Risk Level: MEDIUM
           • Mitigation: Zero-knowledge proofs + MPC
           • Encryption: Military-grade + quantum-resistant
           • Monitoring: Real-time intrusion detection

        3. Network Congestion & Gas Fees
           • Risk Level: HIGH (Ethereum mainnet)
           • Mitigation: Layer 2 solutions + batch processing
           • Optimization: Gas-efficient contract design
           • Alternative: Sidechain deployment options

        II. MARKET & ADOPTION RISKS
        1. Low User Adoption
           • Risk Level: MEDIUM
           • Mitigation: Simplified onboarding + education
           • Incentives: Attractive reward structures
           • Partnerships: Local community organizations

        2. Regulatory Uncertainty
           • Risk Level: HIGH (Global variation)
           • Mitigation: Jurisdiction-specific compliance
           • Legal: Multi-jurisdiction legal counsel
           • Flexibility: Modular architecture for adaptation

        3. Token Volatility
           • Risk Level: MEDIUM
           • Mitigation: Stablecoin pegging options
           • Liquidity: Deep liquidity pool creation
           • Hedging: Derivatives market participation

        III. OPERATIONAL RISKS
        1. Team Dependency
           • Risk Level: LOW-MEDIUM
           • Mitigation: Knowledge documentation + training
           • Redundancy: Cross-trained team members
           • Succession: Clear leadership pipeline

        2. Infrastructure Failure
           • Risk Level: LOW
           • Mitigation: Multi-cloud + decentralized storage
           • Redundancy: 99.99% uptime SLA
           • Backup: Disaster recovery procedures

        3. Competitive Pressure
           • Risk Level: MEDIUM
           • Mitigation: First-mover advantage + patents
           • Differentiation: Unique multi-layer approach
           • Community: Strong network effects building

        IV. CULTURAL & ETHICAL RISKS
        1. Cultural Appropriation Concerns
           • Risk Level: HIGH
           • Mitigation: Community governance + consent
           • Ownership: Clear intellectual property rights
           • Benefit sharing: Revenue distribution mechanisms

        2. Data Privacy & Consent
           • Risk Level: HIGH
           • Mitigation: Granular consent management
           • Transparency: Clear data usage policies
           • Control: User data sovereignty tools

        3. Digital Divide Exclusion
           • Risk Level: MEDIUM-HIGH
           • Mitigation: USSD/SMS access + low-bandwidth
           • Education: Digital literacy programs
           • Partnerships: Local community centers
      `
    },
    {
      title: "CONCLUSION & LONG-TERM VISION",
      quote: "Humanity Is Not Data Points – It Is the Living Story Between Them.",
      content: `
        Soul Internet represents more than technology; it represents a fundamental
        reimagining of how humanity preserves, protects, and propagates its collective
        identity in the digital age.

        CIVILIZATIONAL IMPACT PROJECTIONS:

        By 2030, Soul Internet aims to achieve:
        • 100 million active users preserving their cultural identity
        • 1 billion cultural artifacts secured on blockchain
        • 1,000 endangered languages with complete digital documentation
        • $1 billion in MILSA rewards distributed to contributors
        • 50% reduction in cultural knowledge loss rate
        • Creation of 100,000 digital preservation careers

        By 2040, the vision expands to:
        • Universal digital identity standard adoption
        • Complete mapping of human cultural diversity
        • AI models trained on ethically-sourced human data
        • Interplanetary cultural transmission protocols
        • Time capsule systems for millennia-scale preservation

        ETHICAL FOUNDATIONS:
        1. User Sovereignty: Complete control over personal data
        2. Cultural Respect: Protocols developed with community input
        3. Economic Justice: Fair compensation for contributions
        4. Technological Accessibility: Design for all, regardless of resources
        5. Environmental Responsibility: Carbon-neutral operations

        FINAL CALL TO ACTION:
        Join us in building humanity's most ambitious cultural preservation project.
        Whether as a contributor preserving family history, a developer enhancing
        the protocol, an investor supporting growth, or an advocate spreading
        awareness – every role is crucial in this mission.

        Together, we can ensure that no story is lost, no culture forgotten,
        and no identity erased from the annals of human history.

        This is more than technology.
        This is legacy.
        This is immortality.
        This is Soul Internet.

        ---
        END OF WHITEPAPER v1.0
        Last Updated: 24th July 2025
        Next Revision: Q1 2026
        Contact: whitepaper@soul-internet.com
      `
    }
  ];

  const handleDownloadPDF = () => {
    const content = whitepaperContent.map((page, index) => `
      ===== PAGE ${index + 1} =====
      ${page.title.toUpperCase()}
      ${page.subtitle ? page.subtitle : ''}
      ${page.quote ? `"${page.quote}"` : ''}
      
      ${page.content}
      ====================
    `).join('\n\n');

    const fullDocument = `
      SOUL INTERNET WHITEPAPER v1.0
      ==============================
      Release Date: 24th July 2025
      Protocol Version: 1.0.0
      
      ${content}
      
      © 2025 Soul Internet. All Rights Reserved.
      Powered by Imperial Enterprise.
      Contact: whitepaper@soul-internet.com
    `;

    const blob = new Blob([fullDocument], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'SoulInternet-Whitepaper-v1.0.txt';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };
const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Soul Internet Whitepaper',
        text: 'Read the official Soul Internet Whitepaper - A Cultural, Biometric & Linguistic Blockchain Protocol',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <div className="h-8 w-px bg-gray-700" />
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">Technical Whitepaper</h1>
                <p className="text-gray-400 text-sm">Version 1.0.0 | 24th July 2025</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleDownloadPDF}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-lg hover:opacity-90 transition-opacity"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
            >
              <Printer className="w-4 h-4" />
              Print
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </div>

        {/* Version Badge */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-900/30 to-cyan-900/30 rounded-full border border-purple-500/30">
            <ShieldCheck className="w-4 h-4 text-green-400" />
            <span className="text-sm font-mono">OFFICIAL DOCUMENT • v1.0.0 • 24 JUL 2025</span>
          </div>
        </div>

        {/* Page Navigation */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {whitepaperContent.map((page, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                  currentPage === index
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                    : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800'
                }`}
  >
                {index === 0 && <FileText className="w-3 h-3" />}
                {index === 1 && <Compass className="w-3 h-3" />}
                {index === 2 && <Target className="w-3 h-3" />}
                {index === 3 && <Layers className="w-3 h-3" />}
                {index === 4 && <Banknote className="w-3 h-3" />}
                {index === 5 && <Terminal className="w-3 h-3" />}
                {index === 6 && <LifeBuoy className="w-3 h-3" />}
                {index === 7 && <TrendingUp className="w-3 h-3" />}
                {index === 8 && <UsersIcon className="w-3 h-3" />}
                {index === 9 && <ShieldAlert className="w-3 h-3" />}
                {index === 10 && <Rocket className="w-3 h-3" />}
                <span>Ch. {index + 1}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Whitepaper Content */}
        <motion.div
          key={currentPage}
           id={
             currentPage === 4
               ? 'tokenomics'
               : currentPage === 7
                 ? 'roadmap'
                 : 'whitepaper-content'
           }
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
           className="scroll-mt-28 bg-black/40 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 md:p-8 mb-8"
        >
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-purple-900/30 to-cyan-900/30 rounded-full">
                <span className="text-xs font-mono">CHAPTER {currentPage + 1} of {whitepaperContent.length}</span>
              </div>
              <div className="text-xs text-gray-500 font-mono">
                PAGE {currentPage + 1}/{whitepaperContent.length}
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              {whitepaperContent[currentPage].title}
            </h2>

            {whitepaperContent[currentPage].subtitle && (
              <p className="text-lg text-cyan-300 mb-4 font-light">
                {whitepaperContent[currentPage].subtitle}
              </p>
            )}

            {whitepaperContent[currentPage].quote && (
              <div className="border-l-4 border-cyan-500 pl-6 py-4 my-6 italic text-gray-300 bg-black/20 rounded-r-lg">
                <div className="text-cyan-400 mb-2">"</div>
                <div className="text-lg">{whitepaperContent[currentPage].quote}</div>
                <div className="text-cyan-400 mt-2 text-right">"</div>
              </div>
            )}
          </div>

         <div className="prose prose-invert max-w-none">
  <div className="text-gray-300 leading-relaxed text-base md:text-lg font-sans whitespace-pre-line">
    {whitepaperContent[currentPage].content}
  </div>
</div>
        </motion.div>
{/* Navigation Buttons */}
        <div className="flex justify-between items-center mb-12">
          <button
            onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
            disabled={currentPage === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg ${
              currentPage === 0
                ? 'bg-gray-800/50 text-gray-600 cursor-not-allowed'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            Previous Chapter
          </button>

          <div className="text-sm text-gray-400 font-mono hidden md:block">
            CHAPTER {currentPage + 1} • {whitepaperContent[currentPage].title.substring(0, 30)}...
          </div>

          <button
            onClick={() => setCurrentPage(prev => Math.min(whitepaperContent.length - 1, prev + 1))}
            disabled={currentPage === whitepaperContent.length - 1}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg ${
              currentPage === whitepaperContent.length - 1
                ? 'bg-gray-800/50 text-gray-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-cyan-600 to-purple-600 text-white hover:opacity-90'
            }`}
          >
            Next Chapter
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </button>
        </div>

        {/* Key Statistics */}
        <div className="mt-12 mb-12">
          <h3 className="text-xl font-bold mb-6 text-center">📊 WHITEPAPER STATISTICS</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-purple-900/20 to-cyan-900/20 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-purple-400 mb-1">{whitepaperContent.length}</div>
              <div className="text-sm text-gray-400">Chapters</div>
            </div>
            <div className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-cyan-400 mb-1">11</div>
              <div className="text-sm text-gray-400">Total Pages</div>
            </div>
            <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">15,682</div>
              <div className="text-sm text-gray-400">Words</div>
            </div>
            <div className="bg-gradient-to-br from-orange-900/20 to-yellow-900/20 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-yellow-400 mb-1">v1.0.0</div>
              <div className="text-sm text-gray-400">Version</div>
            </div>
          </div>
        </div>

        {/* Key Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-purple-900/20 to-cyan-900/20 rounded-xl p-6 border border-purple-500/30">
            <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4">
              <Globe className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="font-bold text-lg mb-2">Global Cultural Mission</h3>
            <p className="text-gray-400 text-sm">
              Preserving 7,000+ languages, documenting indigenous knowledge systems, and creating permanent digital archives for endangered cultures worldwide.
            </p>
          </div>

          <div className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 rounded-xl p-6 border border-cyan-500/30">
            <div className="w-12 h-12 rounded-lg bg-cyan-500/20 flex items-center justify-center mb-4">
              <Database className="w-6 h-6 text-cyan-400" />
            </div>
            <h3 className="font-bold text-lg mb-2">Technical Innovation</h3>
            <p className="text-gray-400 text-sm">
              Multi-layer NFT architecture, quantum-resistant encryption, zero-knowledge proofs, and cross-chain interoperability for maximum security and scalability.
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 rounded-xl p-6 border border-green-500/30">
            <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="font-bold text-lg mb-2">Security & Privacy First</h3>
            <p className="text-gray-400 text-sm">
              Biometric abstractions only, never raw data. User-controlled encryption keys, GDPR/CCPA compliance, and military-grade security protocols.
            </p>
          </div>
        </div>
{/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-800/50">
          <div className="text-center">
            <div className="flex justify-center gap-4 mb-4">
              
            </div>
            <p className="text-gray-500 text-sm mb-2">
              © 2025 Soul Internet
            </p>
            <p className="text-gray-600 text-xs">
              This document is protected under international copyright law. Unauthorized reproduction or distribution prohibited.
            </p>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body {
            background: white !important;
            color: black !important;
            font-family: 'Courier New', monospace !important;
          }
          .no-print {
            display: none !important;
          }
          .print-content {
            display: block !important;
          }
          pre {
            white-space: pre-wrap !important;
            word-wrap: break-word !important;
            font-family: 'Courier New', monospace !important;
            font-size: 12pt !important;
            line-height: 1.5 !important;
          }
          h2 {
            page-break-before: always !important;
          }
        }
      `}</style>
    </div>
  );
}

