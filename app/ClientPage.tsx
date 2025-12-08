"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Heart, Users, Brain, Shield, 
  Fingerprint, Zap, BrainCircuit,
  Database, Monitor, Laptop,
  ServerIcon, Globe, Cpu, Sparkles,
  Lock, Cloud, Satellite, Wallet,
  Coins, Upload, Network, Scan,
  Radio, Orbit, Server, Binary,
  CircuitBoard, Terminal, Eye,
  Ear, Mic, BarChart3, CreditCard,
  Key, ChevronRight, ExternalLink,
  ShieldCheck, Rocket, Infinity as InfinityIcon,
  Wifi, WifiOff, Globe as Earth,
  Smartphone, Router, Code, GitBranch,
  Smartphone as Mobile, RadioTower,
  ArrowRight, ShieldAlert, Layers,
  Cpu as CpuIcon, Satellite as SatelliteIcon,
  Cloud as CloudIcon, Code as CodeIcon,
  Key as KeyIcon, Network as NetworkIcon
} from "lucide-react";

export default function ClientPage() {
  const [mounted, setMounted] = useState(false);
  const [hologramActive, setHologramActive] = useState(false);
  const [neonGlow, setNeonGlow] = useState(false);
  const [internetEra, setInternetEra] = useState(0);
  const [activeLayer, setActiveLayer] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);

    const interval1 = setInterval(() => setNeonGlow(v => !v), 3000);
    const interval2 = setInterval(() => setHologramActive(v => !v), 5000);
    const interval3 = setInterval(() => {
      setInternetEra(prev => prev < 3 ? prev + 1 : 0);
    }, 8000);

    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
      clearInterval(interval3);
    };
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-cyan-500 rounded-full animate-spin animation-delay-500"></div>
          <p className="mt-4 text-purple-400 font-mono animate-pulse">Initializing <br>Soul Internet...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* ============================================= */}
{/* BACKGROUND ELEMENTS SECTION */}
      {/* ============================================= */}
      <div className="fixed inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_24px,transparent_24px),linear-gradient(transparent_24px,transparent_24px)] bg-[size:48px_48px] bg-repeat bg-[linear-gradient(135deg,#000_20%,transparent_20%,transparent_80%,#000_80%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,#000_70%)]" />
      </div>

      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent ${neonGlow ? 'opacity-100' : 'opacity-30'} transition-opacity duration-1000`} />
        <div className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent ${neonGlow ? 'opacity-100' : 'opacity-30'} transition-opacity duration-1000`} />
      </div>

      <div className="fixed inset-0 z-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 bg-cyan-400/30 rounded-full"
            initial={{ x: Math.random() * 100 + 'vw', y: Math.random() * 100 + 'vh' }}
            animate={{
              x: [null, Math.random() * 100 + 'vw'],
              y: [null, Math.random() * 100 + 'vh']
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        ))}
      </div>

      {/* ============================================= */}
 {/* SECTION 1: HERO */}
      {/* ============================================= */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 md:mb-12"
          >
            <div className="inline-flex items-center gap-4 mb-6">
              <div className="h-px w-8 md:w-12 bg-gradient-to-r from-transparent to-cyan-500" />
              <span className="text-cyan-400 font-mono text-sm md:text-base tracking-widest">QUANTUM LEAP</span>
              <div className="h-px w-8 md:w-12 bg-gradient-to-r from-cyan-500 to-transparent" />
            </div>
            
            <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold mb-4 md:mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent">
                SOUL INTERNET
              </span>
            </h1>
            
            <p className="text-xl md:text-3xl font-light text-gray-300 mb-6 md:mb-8 font-mono">
              The <span className="text-cyan-300">Next Evolution</span> of Human Data
            </p>
            
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-8">
              Where every heartbeat, memory, and cultural expression becomes an eternal digital asset on the blockchain.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Link href="#layers">
                <button className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-full font-mono hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300">
                  Explore Layers <ArrowRight className="inline ml-2 w-4 h-4" />
                </button>
              </Link>
              <Link href="/vault">
                <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-mono hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300">
                  Access Vault <Key className="inline ml-2 w-4 h-4" />
                </button>
              </Link>
            </div>
          </motion.div>

          <div className="relative h-[300px] md:h-[500px] mb-12 md:mb-20">
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="relative w-48 h-48 md:w-80 md:h-80 lg:w-96 lg:h-96"
              >
                <div className="absolute inset-0 border-2 border-cyan-500/30 rounded-full" />
                <div className="absolute inset-6 md:inset-8 border-2 border-purple-500/20 rounded-full" />
                <div className="absolute inset-12 md:inset-16 border-2 border-pink-500/10 rounded-full" />
                
                <div className="absolute inset-20 md:inset-24 bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center">
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="w-24 h-24 md:w-40 md:h-40 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-full flex items-center justify-center"
                  >
                    <BrainCircuit className="w-12 h-12 md:w-20 md:h-20" />
                  </motion.div>
                </div>

                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <motion.div
                    key={i}
                    animate={{
                      rotate: [0, 360],
                      x: [0, Math.cos(i * 60) * 90],
                      y: [0, Math.sin(i * 60) * 90]
                    }}
                    transition={{
                      duration: 15,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="absolute w-8 h-8 md:w-12 md:h-12 bg-black border border-cyan-500/50 rounded-full flex items-center justify-center"
                  >
                    <Database className="w-4 h-4 md:w-5 md:h-5 text-cyan-400" />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
            {[
              { label: "SOULS PRESERVED", value: "847K+", icon: <Heart className="w-4 h-4 md:w-5 md:h-5" />, color: "pink" },
              { label: "CULTURES SAVED", value: "142+", icon: <Users className="w-4 h-4 md:w-5 md:h-5" />, color: "purple" },
              { label: "LANGUAGES STORED", value: "58+", icon: <Brain className="w-4 h-4 md:w-5 md:h-5" />, color: "cyan" },
              { label: "BLOCKS SECURED", value: "18.4K", icon: <Shield className="w-4 h-4 md:w-5 md:h-5" />, color: "green" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-4"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-8 h-8 rounded-lg bg-${stat.color}-500/20 flex items-center justify-center`}>
                    <div className={`text-${stat.color}-400`}>{stat.icon}</div>
                  </div>
                  <span className="text-xs text-gray-500 font-mono">{stat.label}</span>
                </div>
                <p className={`text-xl md:text-2xl font-bold text-${stat.color}-300`}>{stat.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
{/* SECTION 2: EVOLUTION TIMELINE */}
      {/* ============================================= */}
      <section id="evolution" className="py-16 md:py-24 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-transparent to-black/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              From <span className="text-cyan-400">Web 1.0</span> to{" "}
              <span className="text-purple-400">Soul Internet</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              The journey of internet evolution — from static pages to human consciousness preservation
            </p>
          </div>

          <div className="hidden md:block">
            <div className="relative h-[500px]">
              <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 via-cyan-500 to-pink-500 transform -translate-x-1/2" />
              
              {[
                { era: 0, year: "1990s", name: "WEB 1.0", desc: "Read-only static pages", icon: <Monitor className="w-8 h-8" />, color: "purple", pos: "top-4" },
                { era: 1, year: "2000s", name: "WEB 2.0", desc: "Social interactive platforms", icon: <Laptop className="w-8 h-8" />, color: "blue", pos: "top-1/3" },
                { era: 2, year: "2010s", name: "WEB 3.0", desc: "Decentralized blockchain", icon: <ServerIcon className="w-8 h-8" />, color: "cyan", pos: "top-2/3" },
                { era: 3, year: "2020s", name: "SOUL INTERNET", desc: "Human data consciousness", icon: <Brain className="w-8 h-8" />, color: "pink", pos: "bottom-4" },
              ].map((era) => (
                <motion.div
                  key={era.era}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: internetEra >= era.era ? 1 : 0.3,
                    scale: internetEra === era.era ? 1.1 : 1
                  }}
                  className={`absolute ${era.pos} left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
                >
                  <div className={`relative ${internetEra === era.era ? 'z-10' : ''}`}>
                    <div className={`w-20 h-20 rounded-full border-2 border-${era.color}-500 flex items-center justify-center ${internetEra === era.era ? `bg-${era.color}-500/20` : 'bg-black/50'}`}>
                      <div className={`text-${era.color}-300`}>{era.icon}</div>
                    </div>
                    
                    <div className={`absolute ${era.era % 2 === 0 ? 'right-8' : 'left-8'} top-1/2 transform -translate-y-1/2 w-64`}>
                      <div className={`bg-black/80 backdrop-blur-sm border border-${era.color}-500/30 rounded-xl p-4 ${era.era % 2 === 0 ? 'text-right' : 'text-left'}`}>
                        <p className={`text-${era.color}-400 font-mono text-sm`}>{era.year}</p>
                        <h3 className="text-xl font-bold mt-1">{era.name}</h3>
                        <p className="text-gray-400 text-sm mt-1">{era.desc}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            key={internetEra}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mt-8 md:mt-12"
          >
            <div className="inline-flex items-center gap-3 mb-4">
              <div className={`w-3 h-3 rounded-full bg-${['purple', 'blue', 'cyan', 'pink'][internetEra]}-500 animate-pulse`} />
              <span className="text-cyan-400 font-mono">
                CURRENT ERA: {['WEB 1.0', 'WEB 2.0', 'WEB 3.0', 'SOUL INTERNET'][internetEra]}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================= */}
{/* SECTION 3: TECHNOLOGY STACK */}
      {/* ============================================= */}
      <section id="technology" className="py-16 md:py-24 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="text-cyan-400">Quantum</span> Technology Stack
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Advanced technologies powering the Soul Internet infrastructure
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Quantum Encryption", icon: Lock, color: "cyan", desc: "Unbreakable quantum key distribution" },
              { title: "Neural Networks", icon: Brain, color: "purple", desc: "AI-powered consciousness mapping" },
              { title: "Blockchain Core", icon: CpuIcon, color: "pink", desc: "Decentralized immutable ledger" },
              { title: "Edge Computing", icon: CloudIcon, color: "blue", desc: "Distributed processing nodes" },
              { title: "Quantum Storage", icon: Database, color: "green", desc: "Multi-dimensional data storage" },
              { title: "API Mesh", icon: NetworkIcon, color: "orange", desc: "Interconnected layer communication" },
            ].map((tech, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-6"
              >
                <div className={`w-12 h-12 rounded-lg bg-${tech.color}-500/20 flex items-center justify-center mb-4`}>
                  <tech.icon className={`w-6 h-6 text-${tech.color}-400`} />
                </div>
                <h3 className="text-xl font-bold mb-2">{tech.title}</h3>
                <p className="text-gray-400">{tech.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================= */}
{/* SECTION 4: MULTISOUL LAYERS */}
      {/* ============================================= */}
      <section id="layers" className="py-16 md:py-24 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-transparent to-black/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="text-cyan-400">MultiSoul</span> Architecture Layers
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Human consciousness fragmented into quantum-resistant data streams
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                id: "biometric",
                title: "BIOMETRIC CORE",
                icon: Fingerprint,
                color: "cyan",
                description: "Heartbeat, DNA, and neural patterns encoded into quantum signatures",
                features: ["Neural Mapping", "DNA Sequencing", "Vocal Analysis", "Retinal Scan"]
              },
              {
                id: "cultural",
                title: "CULTURAL MATRIX",
                icon: Users,
                color: "purple",
                description: "Ancestral wisdom, rituals, and traditions preserved forever",
                features: ["Oral History", "Ritual Patterns", "Cultural DNA", "Ancestral Data"]
              },
              {
                id: "linguistic",
                title: "LINGUISTIC GRID",
                icon: Brain,
                color: "pink",
                description: "Endangered languages and dialects stored in neural networks",
                features: ["Phoneme Banks", "Syntax Trees", "Dialect Maps", "Semantic Webs"]
              },
              {
                id: "memory",
                title: "MEMORY VAULT",
                icon: Database,
                color: "blue",
                description: "Personal memories and experiences preserved digitally",
                features: ["Episodic Memory", "Procedural Memory", "Flashbulb Memory", "Childhood Recall"]
              },
              {
                id: "emotional",
                title: "EMOTIONAL SPHERE",
                icon: Heart,
                color: "green",
                description: "Emotional patterns and psychological profiles",
                features: ["Emotion Mapping", "Mood Patterns", "Personality Matrix", "Trauma Response"]
              },
              {
                id: "spiritual",
                title: "SPIRITUAL LAYER",
                icon: Sparkles,
                color: "orange",
                description: "Spiritual experiences and transcendental states",
                features: ["Meditation States", "Transcendental Data", "Spiritual Beliefs", "Higher Consciousness"]
              }
            ].map((layer, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onMouseEnter={() => setActiveLayer(layer.id)}
                onMouseLeave={() => setActiveLayer(null)}
                className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-12 h-12 rounded-xl bg-${layer.color}-500/20 flex items-center justify-center`}>
                    <layer.icon className={`w-6 h-6 text-${layer.color}-400`} />
                  </div>
                  <span className={`text-${layer.color}-400 font-mono text-sm`}>LAYER 0{i + 1}</span>
                </div>

                <h3 className="text-xl font-bold mb-4">{layer.title}</h3>
                <p className="text-gray-400 mb-6">{layer.description}</p>

                <div className="space-y-2 mb-6">
                  {layer.features.map((feature, j) => (
                    <div key={j} className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full bg-${layer.color}-500`} />
                      <span className="text-sm text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link href={`/vault?layer=${layer.id}`}>
                  <button 
                    className={`w-full py-3 px-4 rounded-xl font-mono text-sm font-bold transition-all duration-300 bg-gradient-to-r from-${layer.color}-600 to-${layer.color}-400 hover:from-${layer.color}-700 hover:to-${layer.color}-500 hover:shadow-lg hover:shadow-${layer.color}-500/30 flex items-center justify-center`}
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    ACCESS {layer.title.split(' ')[0]} VAULT
                  </button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================= */}
{/* SECTION 5: VAULT INTEGRATION */}
      {/* ============================================= */}
      <section id="vault-integration" className="py-16 md:py-24 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="text-purple-400">Vault</span> Integration System
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Secure storage and retrieval of multi-dimensional consciousness data
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="space-y-6">
                {[
                  { icon: ShieldCheck, title: "Quantum Security", desc: "Military-grade encryption for each layer", color: "green" },
                  { icon: Lock, title: "Multi-Factor Access", desc: "Biometric, neural, and quantum key access", color: "cyan" },
                  { icon: Database, title: "Distributed Storage", desc: "Data fragmented across quantum nodes", color: "purple" },
                  { icon: Key, title: "Sovereign Control", desc: "Complete ownership and access control", color: "pink" }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4"
                  >
                    <div className={`w-10 h-10 rounded-lg bg-${item.color}-500/20 flex items-center justify-center flex-shrink-0`}>
                      <item.icon className={`w-5 h-5 text-${item.color}-400`} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                      <p className="text-gray-400">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="bg-black/40 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-center">Direct Layer Access</h3>
              <div className="space-y-4">
                {[
                  { name: "Biometric Vault", color: "cyan", link: "/vault/biometric" },
                  { name: "Cultural Vault", color: "purple", link: "/vault/cultural" },
                  { name: "Linguistic Vault", color: "pink", link: "/vault/linguistic" },
                  { name: "Memory Vault", color: "blue", link: "/vault/memory" }
                ].map((vault, i) => (
                  <Link key={i} href={vault.link}>
                    <div className={`p-4 rounded-xl border border-${vault.color}-500/30 hover:border-${vault.color}-500 hover:bg-${vault.color}-500/10 transition-all duration-300 cursor-pointer`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full bg-${vault.color}-500 animate-pulse`} />
                          <span className="font-mono">{vault.name}</span>
                        </div>
                        <ChevronRight className={`text-${vault.color}-400`} />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              
              <div className="mt-8 pt-6 border-t border-white/10">
                <Link href="/vault">
                  <button className="w-full py-3 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-xl font-bold hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300">
                    ACCESS ALL VAULTS
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================= */}
{/* SECTION 6: SECURITY FEATURES */}
      {/* ============================================= */}
      <section id="security" className="py-16 md:py-24 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-transparent to-black/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="text-green-400">Quantum</span> Security Protocols
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Unbreakable protection for your most precious data
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: ShieldAlert, title: "Zero-Knowledge Proofs", desc: "Verify without revealing data", color: "green" },
              { icon: KeyIcon, title: "Quantum Key Distribution", desc: "Unhackable quantum encryption", color: "cyan" },
              { icon: Fingerprint, title: "Multi-Modal Biometrics", desc: "DNA, neural, and behavioral auth", color: "purple" },
              { icon: Satellite, title: "Distributed Validation", desc: "Global node verification network", color: "pink" }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center"
              >
                <div className={`w-16 h-16 rounded-full bg-${feature.color}-500/20 flex items-center justify-center mx-auto mb-4`}>
                  <feature.icon className={`w-8 h-8 text-${feature.color}-400`} />
                </div>
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================= */}
{/* SECTION 7: BLOCKCHAIN INTEGRATION */}
      {/* ============================================= */}
      <section id="blockchain" className="py-16 md:py-24 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="text-blue-400">Blockchain</span> Powered Sovereignty
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Immutable ownership and transparent verification of consciousness data
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-black/30 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-6"
            >
              <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center mb-4">
                <Wallet className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-4">Digital Ownership</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span>Unique Soul Token (UST) NFTs</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span>Immutable provenance tracking</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span>Royalty distribution system</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-black/30 backdrop-blur-sm border border-green-500/30 rounded-2xl p-6"
            >
              <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center mb-4">
                <Coins className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-xl font-bold mb-4">Token Economy</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span>Soul Data Tokens (SDT)</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span>Layer-specific utility tokens</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span>Staking and governance</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-black/30 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-6"
            >
              <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4">
                <Network className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-4">Decentralized Network</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-500" />
                  <span>Global node operators</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-500" />
                  <span>Consensus validation</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-500" />
                  <span>Data redundancy system</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================= */}
