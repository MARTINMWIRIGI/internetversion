"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Heart, Users, Brain, Shield, 
  Fingerprint, Zap, BrainCircuit,
  Database, Monitor, Laptop,
  Server, Globe, Cpu, Sparkles,
  Lock, Cloud, Satellite, Wallet,
  Coins, Upload, Network, Scan,
  Radio, Orbit, Binary,
  CircuitBoard, Terminal, Eye,
  Ear, Mic, BarChart3, CreditCard,
  Key, ChevronRight, ExternalLink,
  ShieldCheck, Rocket, Infinity as InfinityIcon,
  Wifi, WifiOff, Earth,
  Smartphone, Router, Code, GitBranch,
  RadioTower,
  ArrowRight, ShieldAlert, Layers
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

  // Color mapping for consistent usage
  const colorClasses: Record<string, string> = {
    cyan: {
      text: "text-cyan-400",
      bgLight: "bg-cyan-500/20",
      bg: "bg-cyan-500",
      border: "border-cyan-500",
      gradientFrom: "from-cyan-600",
      gradientTo: "to-cyan-400"
    },
    purple: {
      text: "text-purple-400",
      bgLight: "bg-purple-500/20",
      bg: "bg-purple-500",
      border: "border-purple-500",
      gradientFrom: "from-purple-600",
      gradientTo: "to-purple-400"
    },
    pink: {
      text: "text-pink-400",
      bgLight: "bg-pink-500/20",
      bg: "bg-pink-500",
      border: "border-pink-500",
      gradientFrom: "from-pink-600",
      gradientTo: "to-pink-400"
    },
    blue: {
      text: "text-blue-400",
      bgLight: "bg-blue-500/20",
      bg: "bg-blue-500",
      border: "border-blue-500",
      gradientFrom: "from-blue-600",
      gradientTo: "to-blue-400"
    },
    green: {
      text: "text-green-400",
      bgLight: "bg-green-500/20",
      bg: "bg-green-500",
      border: "border-green-500",
      gradientFrom: "from-green-600",
      gradientTo: "to-green-400"
    },
    orange: {
      text: "text-orange-400",
      bgLight: "bg-orange-500/20",
      bg: "bg-orange-500",
      border: "border-orange-500",
      gradientFrom: "from-orange-600",
      gradientTo: "to-orange-400"
    }
  };

  const stats = [
    { label: "SOULS PRESERVED", value: "847K+", icon: <Heart className="w-4 h-4 md:w-5 md:h-5" />, color: "pink" },
    { label: "CULTURES SAVED", value: "142+", icon: <Users className="w-4 h-4 md:w-5 md:h-5" />, color: "purple" },
    { label: "LANGUAGES STORED", value: "58+", icon: <Brain className="w-4 h-4 md:w-5 md:h-5" />, color: "cyan" },
    { label: "BLOCKS SECURED", value: "18.4K", icon: <Shield className="w-4 h-4 md:w-5 md:h-5" />, color: "green" }
  ];

  const internetEras = [
    { era: 0, year: "1990s", name: "WEB 1.0", desc: "Read-only static pages", icon: <Monitor className="w-8 h-8" />, color: "purple", pos: "top-4" },
    { era: 1, year: "2000s", name: "WEB 2.0", desc: "Social interactive platforms", icon: <Laptop className="w-8 h-8" />, color: "blue", pos: "top-1/3" },
    { era: 2, year: "2010s", name: "WEB 3.0", desc: "Decentralized blockchain", icon: <Server className="w-8 h-8" />, color: "cyan", pos: "top-2/3" },
    { era: 3, year: "2020s", name: "SOUL INTERNET", desc: "Human data consciousness", icon: <Brain className="w-8 h-8" />, color: "pink", pos: "bottom-4" },
  ];

  const technologyStack = [
    { title: "Quantum Encryption", icon: Lock, color: "cyan", desc: "Unbreakable quantum key distribution" },
    { title: "Neural Networks", icon: Brain, color: "purple", desc: "AI-powered consciousness mapping" },
    { title: "Blockchain Core", icon: Cpu, color: "pink", desc: "Decentralized immutable ledger" },
    { title: "Edge Computing", icon: Cloud, color: "blue", desc: "Distributed processing nodes" },
    { title: "Quantum Storage", icon: Database, color: "green", desc: "Multi-dimensional data storage" },
    { title: "API Mesh", icon: Network, color: "orange", desc: "Interconnected layer communication" },
  ];

  const layers = [
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
  ];

  const securityFeatures = [
    { icon: ShieldAlert, title: "Zero-Knowledge Proofs", desc: "Verify without revealing data", color: "green" },
    { icon: Key, title: "Quantum Key Distribution", desc: "Unhackable quantum encryption", color: "cyan" },
    { icon: Fingerprint, title: "Multi-Modal Biometrics", desc: "DNA, neural, and behavioral auth", color: "purple" },
    { icon: Satellite, title: "Distributed Validation", desc: "Global node verification network", color: "pink" }
  ];

  const useCases = [
    { icon: Users, title: "Cultural Preservation", desc: "Save endangered cultures and languages for future generations", color: "purple" },
    { icon: Brain, title: "Medical Research", desc: "Anonymous consciousness data for neurological studies", color: "cyan" },
    { icon: Heart, title: "Legacy Creation", desc: "Create digital immortality for loved ones", color: "pink" },
    { icon: Globe, title: "Global Heritage", desc: "Preserve humanity's collective consciousness", color: "green" },
    { icon: Code, title: "AI Training", desc: "Ethical AI training with human consciousness data", color: "blue" },
    { icon: BarChart3, title: "Market Research", desc: "Anonymized emotional and behavioral insights", color: "orange" }
  ];

  const eraColors = ["purple", "blue", "cyan", "pink"];

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* BACKGROUND ELEMENTS SECTION */}
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

      {/* SECTION 1: HERO */}
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
            {stats.map((stat, i) => {
              const colorClass = colorClasses[stat.color as keyof typeof colorClasses];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-4"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-8 h-8 rounded-lg ${colorClass.bgLight} flex items-center justify-center`}>
                      <div className={colorClass.text}>{stat.icon}</div>
                    </div>
                    <span className="text-xs text-gray-500 font-mono">{stat.label}</span>
                  </div>
                  <p className={`${colorClass.text.replace('400', '300')} text-xl md:text-2xl font-bold`}>{stat.value}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 2: EVOLUTION TIMELINE */}
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
              
              {internetEras.map((era) => {
                const colorClass = colorClasses[era.color as keyof typeof colorClasses];
                return (
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
                      <div className={`w-20 h-20 rounded-full border-2 ${colorClass.border} flex items-center justify-center ${internetEra === era.era ? colorClass.bgLight : 'bg-black/50'}`}>
                        <div className={colorClass.text}>{era.icon}</div>
                      </div>
                      
                      <div className={`absolute ${era.era % 2 === 0 ? 'right-8' : 'left-8'} top-1/2 transform -translate-y-1/2 w-64`}>
                        <div className={`bg-black/80 backdrop-blur-sm border ${colorClass.border}/30 rounded-xl p-4 ${era.era % 2 === 0 ? 'text-right' : 'text-left'}`}>
                          <p className={`${colorClass.text} font-mono text-sm`}>{era.year}</p>
                          <h3 className="text-xl font-bold mt-1">{era.name}</h3>
                          <p className="text-gray-400 text-sm mt-1">{era.desc}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <motion.div
            key={internetEra}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mt-8 md:mt-12"
          >
            <div className="inline-flex items-center gap-3 mb-4">
              <div className={`w-3 h-3 rounded-full bg-${eraColors[internetEra]}-500 animate-pulse`} />
              <span className="text-cyan-400 font-mono">
                CURRENT ERA: {['WEB 1.0', 'WEB 2.0', 'WEB 3.0', 'SOUL INTERNET'][internetEra]}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

     