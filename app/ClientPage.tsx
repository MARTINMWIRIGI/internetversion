"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Heart, Users, Brain, Globe, Cpu, Shield, 
  Sparkles, Zap, Lock, Cloud, Satellite,
  Wallet, Coins, Upload, Database, Network,
  Cpu as CpuIcon, Scan, Radio, Orbit,
  Server, Binary, Matrix, CircuitBoard, BrainCircuit,
  Terminal, Fingerprint, Eye, Ear, Mic,
  BarChart3, CreditCard, Key,
  ChevronRight, ExternalLink,
  ShieldCheck, Rocket, Infinity as InfinityIcon,
  Wifi, WifiOff,
  Globe as Earth, Smartphone, Laptop,
  Monitor, Router, Satellite as SatelliteIcon,
  Cloud as CloudIcon, Server as ServerIcon,
  Code, GitBranch,
  Smartphone as Mobile,
  RadioTower
} from "lucide-react";
import { motion } from "framer-motion";

export default function SoulInternetHome() {
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState("evolution");
  const [hologramActive, setHologramActive] = useState(false);
  const [neonGlow, setNeonGlow] = useState(false);
  const [connectedWallet, setConnectedWallet] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [minting, setMinting] = useState(false);
  const [internetEra, setInternetEra] = useState(0);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    setMounted(true);
    
    const intervals = [
      setInterval(() => setNeonGlow(v => !v), 3000),
      setInterval(() => setHologramActive(v => !v), 5000),
      setInterval(() => {
        setInternetEra(prev => prev < 3 ? prev + 1 : 0);
      }, 8000)
    ];
    
    return () => intervals.forEach(clearInterval);
  }, []);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleConnectWallet = async () => {
    try {
      const mockAddress = "0x742d35Cc6634C0532925a3b8B9C4b1f0";
      setConnectedWallet(true);
      setWalletAddress(`${mockAddress.slice(0, 6)}...${mockAddress.slice(-4)}`);
      showToast("Neural interface established", 'success');
    } catch (error) {
      showToast("Quantum handshake failed", 'error');
    }
  };

  const handleDisconnectWallet = () => {
    setConnectedWallet(false);
    setWalletAddress("");
    showToast("Neural interface disconnected", 'success');
  };

  const handleMintSoulToken = async () => {
    setMinting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      showToast("MultiSoul Token minted successfully", 'success');
    } catch (error) {
      showToast("Tokenization failed", 'error');
    }
    setMinting(false);
  };

if (!mounted) return (
  <div className="min-h-screen bg-black flex items-center justify-center">
    <div className="relative">
      <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
      <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-cyan-500 rounded-full animate-spin animation-delay-500"></div>
      <p className="mt-4 text-purple-400 font-mono animate-pulse">Initializing SoulMatrix...</p>
    </div>
  </div>
);

const ToastNotification = () => {
  if (!toastMessage) return null;
  
  const isSuccess = toastMessage.includes("established") || 
                   toastMessage.includes("success") || 
                   toastMessage.includes("disconnected");
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed bottom-4 right-4 z-50"
    >
      <div className={`px-4 py-3 rounded-lg shadow-lg ${
        isSuccess 
          ? 'bg-gradient-to-r from-green-500/90 to-emerald-500/90 backdrop-blur-sm' 
          : 'bg-gradient-to-r from-red-500/90 to-pink-500/90 backdrop-blur-sm'
      }`}>
        <p className="text-white font-mono text-sm">{toastMessage}</p>
      </div>
    </motion.div>
  );
};

return (
  <main className="min-h-screen bg-black text-white overflow-x-hidden">
    {/* CYBER GRID BACKGROUND */}
    <div className="fixed inset-0 z-0 opacity-20">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_24px,transparent_24px),linear-gradient(transparent_24px,transparent_24px)] bg-[size:48px_48px] bg-repeat bg-[linear-gradient(135deg,#000_20%,transparent_20%,transparent_80%,#000_80%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,#000_70%)]" />
    </div>

    {/* ANIMATED NEON BORDERS */}
    <div className="fixed inset-0 z-0 pointer-events-none">
      <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent ${neonGlow ? 'opacity-100' : 'opacity-30'} transition-opacity duration-1000`} />
      <div className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent ${neonGlow ? 'opacity-100' : 'opacity-30'} transition-opacity duration-1000`} />
    </div>

    {/* NEURAL NETWORK PARTICLES */}
    <div className="fixed inset-0 z-0">
      {Array.from({ length: 30 }).map((_, i) => (
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

{/* MAIN NAVIGATION ORB */}
<nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-xl">
  <div className="flex flex-wrap justify-center gap-2 bg-black/80 backdrop-blur-xl border border-cyan-500/30 rounded-full px-4 py-2 mx-4">
    {["evolution", "capsule", "layers", "vault"].map((item) => (
      <button
        key={item}
        onClick={() => setActiveSection(item)}
        className={`px-3 py-2 rounded-full text-xs md:text-sm font-mono transition-all duration-300 ${activeSection === item 
          ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg shadow-cyan-500/30' 
          : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
      >
        {item.toUpperCase()}
      </button>
    ))}
    <div className="h-6 w-px bg-gradient-to-b from-transparent via-cyan-500 to-transparent mx-1 md:mx-2" />
    <button
      onClick={connectedWallet ? handleDisconnectWallet : handleConnectWallet}
      className={`px-3 py-2 rounded-full text-xs md:text-sm font-mono flex items-center gap-1 md:gap-2 transition-all ${connectedWallet 
        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' 
        : 'bg-gradient-to-r from-cyan-500 to-purple-500 hover:shadow-lg hover:shadow-cyan-500/30'}`}
    >
      <Wallet className="w-3 h-3 md:w-4 md:h-4" />
      {connectedWallet ? walletAddress : "CONNECT"}
    </button>
  </div>
</nav>

{/* INTERNET EVOLUTION - MAJESTIC TIMELINE */}
<section className="relative min-h-screen pt-24 pb-20 px-4 md:px-8 lg:px-16">
  <div className="max-w-7xl mx-auto">
    {/* EVOLUTION HEADER */}
    <div className="text-center mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-3 md:gap-6 mb-6"
      >
        <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center">
          <Globe className="w-4 h-4 md:w-6 md:h-6" />
        </div>
        <div className="h-px w-12 md:w-20 bg-gradient-to-r from-purple-500 to-transparent" />
        <p className="text-cyan-400 font-mono text-xs md:text-sm tracking-widest">THE EVOLUTION</p>
        <div className="h-px w-12 md:w-20 bg-gradient-to-r from-transparent to-cyan-500" />
        <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center">
          <Brain className="w-4 h-4 md:w-6 md:h-6" />
        </div>
      </motion.div>

      <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold mb-4 md:mb-6 tracking-tighter">
        <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent">
          SOULNET
        </span>
      </h1>
      
      <p className="text-xl md:text-3xl font-light text-gray-300 mb-6 md:mb-8 font-mono">
        <span className="text-cyan-300">#</span> FROM WEB1 TO SOULNET
      </p>
    </div>

    {/* EVOLUTION TIMELINE - VISUAL */}
    <div className="relative h-96 md:h-[500px] mb-16">
      {/* TIMELINE LINE */}
      <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 via-cyan-500 to-pink-500 transform -translate-x-1/2" />
      
      {/* EVOLUTION ERAS */}
      {[
        { era: 0, year: "1990s", name: "WEB 1.0", desc: "Read-Only Static Pages", icon: <Monitor className="w-6 h-6" />, color: "purple", pos: "top-4" },
        { era: 1, year: "2000s", name: "WEB 2.0", desc: "Social Interactive Web", icon: <Laptop className="w-6 h-6" />, color: "blue", pos: "top-1/4" },
        { era: 2, year: "2010s", name: "WEB 3.0", desc: "Decentralized Semantic Web", icon: <ServerIcon className="w-6 h-6" />, color: "cyan", pos: "top-1/2" },
        { era: 3, year: "2020s", name: "SOULNET", desc: "Human Data Consciousness", icon: <Brain className="w-6 h-6" />, color: "pink", pos: "top-3/4" },
      ].map((era) => (
        <motion.div
          key={era.era}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: internetEra >= era.era ? 1 : 0.3,
            scale: internetEra === era.era ? 1.1 : 1
          }}
          transition={{ duration: 1 }}
          className={`absolute ${era.pos} left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
        >
          {/* ERA NODE */}
          <div className={`relative group cursor-pointer ${internetEra === era.era ? 'z-10' : ''}`}>
            {/* GLOW EFFECT */}
            <div className={`absolute -inset-4 bg-gradient-to-r from-${era.color}-600/50 to-transparent rounded-full blur-lg ${internetEra === era.era ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`} />
            
            {/* MAIN NODE */}
            <div className={`relative w-20 h-20 md:w-28 md:h-28 rounded-full border-2 border-${era.color}-500 flex items-center justify-center ${internetEra === era.era ? `bg-${era.color}-500/20` : 'bg-black/50'}`}>
              <div className={`text-${era.color}-300`}>
                {era.icon}
              </div>
              
              {/* CONNECTING LINES */}
              <div className={`absolute -top-12 left-1/2 w-1 h-12 bg-gradient-to-b from-transparent to-${era.color}-500 transform -translate-x-1/2`} />
            </div>
            
            {/* ERA INFO */}
            <div className={`absolute ${era.era % 2 === 0 ? 'right-6' : 'left-6'} top-1/2 transform -translate-y-1/2 w-48 md:w-64`}>
              <motion.div
                initial={{ x: era.era % 2 === 0 ? 20 : -20 }}
                animate={{ x: 0 }}
                className={`bg-black/80 backdrop-blur-sm border border-${era.color}-500/30 rounded-xl p-4 ${era.era % 2 === 0 ? 'text-right' : 'text-left'}`}
              >
                <p className={`text-${era.color}-400 font-mono text-sm`}>{era.year}</p>
                <h3 className="text-lg md:text-xl font-bold mt-1">{era.name}</h3>
                <p className="text-gray-400 text-sm mt-1">{era.desc}</p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>

    {/* CURRENT ERA DISPLAY */}
    <motion.div
      key={internetEra}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto text-center mb-12"
    >
      <div className="inline-flex items-center gap-3 mb-4">
        <div className={`w-4 h-4 rounded-full bg-${['purple', 'blue', 'cyan', 'pink'][internetEra]}-500 animate-pulse`} />
        <span className="text-cyan-400 font-mono tracking-widest">
          CURRENT ERA: {['WEB 1.0', 'WEB 2.0', 'WEB 3.0', 'SOULNET'][internetEra]}
        </span>
      </div>
      <p className="text-xl md:text-2xl text-gray-300">
        {[
          "Static documents • Information consumption • Basic HTML",
          "Social networks • User-generated content • Centralized platforms",
          "Blockchain • Smart contracts • Decentralized autonomy",
          "Human consciousness • Biometric data • Eternal soul preservation"
        ][internetEra]}
      </p>
    </motion.div>
  </div>
</section>

{/* QUANTUM CAPSULE - SOUL INTERNET */}
<section className="py-20 md:py-32 px-4 md:px-8 lg:px-16 relative overflow-hidden">
  <div className="max-w-7xl mx-auto">
    {/* SECTION HEADER */}
    <div className="text-center mb-16">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="inline-flex items-center gap-4 mb-6"
      >
        <div className="h-px w-12 bg-gradient-to-r from-transparent to-cyan-500" />
        <span className="text-cyan-400 font-mono tracking-widest">QUANTUM LEAP</span>
        <div className="h-px w-12 bg-gradient-to-r from-cyan-500 to-transparent" />
      </motion.div>
      
      <h2 className="text-4xl md:text-6xl font-bold mb-6">
        Welcome to <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Soul Internet</span>
      </h2>
      <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
        Where every human experience becomes an eternal digital asset on the blockchain
      </p>
    </div>

    {/* CAPSULE VISUALIZATION */}
    <div className="relative h-[400px] md:h-[600px] mb-16">
      {/* CENTRAL CAPSULE */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="relative w-64 h-64 md:w-96 md:h-96"
        >
          {/* OUTER RING */}
          <div className="absolute inset-0 border-2 border-cyan-500/30 rounded-full animate-pulse" />
          
          {/* MIDDLE RING */}
          <div className="absolute inset-8 border-2 border-purple-500/30 rounded-full" />
          
          {/* INNER CORE */}
          <div className="absolute inset-16 bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-32 h-32 md:w-48 md:h-48 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-full flex items-center justify-center"
            >
              <BrainCircuit className="w-16 h-16 md:w-24 md:h-24" />
            </motion.div>
          </div>

          {/* ORBITING DATA NODES */}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              animate={{
                rotate: [0, 360],
                x: [0, Math.cos(i * 60) * 120],
                y: [0, Math.sin(i * 60) * 120]
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute w-12 h-12 bg-black border border-cyan-500/50 rounded-full flex items-center justify-center"
            >
              <Database className="w-5 h-5 text-cyan-400" />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* FLOATING PARTICLES */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-cyan-400/50 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 1, 0.3]
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        />
      ))}
    </div>

    {/* CAPSULE STATS */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
      {[
        { label: "SOULS PRESERVED", value: "847,291", icon: <Heart className="w-4 h-4" />, color: "pink" },
        { label: "CULTURES SAVED", value: "142", icon: <Users className="w-4 h-4" />, color: "purple" },
        { label: "LANGUAGES STORED", value: "58", icon: <Brain className="w-4 h-4" />, color: "cyan" },
        { label: "BLOCKS SECURED", value: "18.4K", icon: <Shield className="w-4 h-4" />, color: "green" }
      ].map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className={`bg-black/30 backdrop-blur-sm border border-${stat.color}-500/20 rounded-xl p-4`}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-8 h-8 rounded-lg bg-${stat.color}-500/20 flex items-center justify-center`}>
              <div className={`text-${stat.color}-400`}>{stat.icon}</div>
            </div>
            <span className="text-xs text-gray-500 font-mono">{stat.label}</span>
          </div>
          <p className={`text-2xl font-bold text-${stat.color}-300`}>{stat.value}</p>
        </motion.div>
      ))}
    </div>
  </div>
</section>

{/* MULTISOUL LAYERS */}
<section className="py-20 md:py-32 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-transparent to-black/50">
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-16">
      <span className="text-cyan-400 font-mono tracking-widest">ARCHITECTURE</span>
      <h2 className="text-4xl md:text-6xl font-bold mt-4 mb-6">
        <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">MultiSoul</span> Layers
      </h2>
      <p className="text-lg text-gray-400 max-w-3xl mx-auto">
        Human consciousness fragmented into quantum-resistant data streams
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
      {[
        {
          layer: "01",
          title: "BIOMETRIC CORE",
          icon: <Fingerprint className="w-8 h-8" />,
          color: "cyan",
          description: "Heartbeat, DNA, neural patterns encoded into quantum signatures",
          features: ["Neural Mapping", "DNA Sequencing", "Vocal Analysis", "Retinal Scan"]
        },
        {
          layer: "02",
          title: "CULTURAL MATRIX",
          icon: <Users className="w-8 h-8" />,
          color: "purple",
          description: "Ancestral wisdom, rituals, and traditions preserved forever",
          features: ["Oral History", "Ritual Patterns", "Cultural DNA", "Ancestral Data"]
        },
        {
          layer: "03",
          title: "LINGUISTIC GRID",
          icon: <Brain className="w-8 h-8" />,
          color: "pink",
          description: "Endangered languages and dialects stored in neural networks",
          features: ["Phoneme Banks", "Syntax Trees", "Dialect Maps", "Semantic Webs"]
        }
      ].map((layer, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ y: -5 }}
          viewport={{ once: true }}
          className="relative group"
        >
          {/* HOLOGRAM EFFECT */}
          <div className={`absolute -inset-0.5 bg-gradient-to-r from-${layer.color}-600/30 to-transparent rounded-2xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-500`} />
          
          <div className="relative bg-black/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 h-full">
            {/* LAYER HEADER */}
            <div className="flex items-start justify-between mb-6">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-${layer.color}-500/20 to-${layer.color}-300/20 flex items-center justify-center mb-4`}>
                {layer.icon}
              </div>
              <span className={`text-${layer.color}-400 font-mono text-sm`}>LAYER {layer.layer}</span>
            </div>

            {/* CONTENT */}
            <h3 className="text-xl md:text-2xl font-bold mb-4">{layer.title}</h3>
            <p className="text-gray-400 mb-6">{layer.description}</p>

            {/* FEATURES */}
            <div className="space-y-2">
              {layer.features.map((feature, j) => (
                <div key={j} className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full bg-${layer.color}-500`} />
                  <span className="text-sm text-gray-300">{feature}</span>
                </div>
              ))}
            </div>

            {/* INTERACT BUTTON */}
            <Button 
              className={`w-full mt-6 bg-gradient-to-r from-${layer.color}-600 to-${layer.color}-400 hover:from-${layer.color}-700 hover:to-${layer.color}-500`}
              onClick={() => setActiveSection("vault")}
            >
              <Zap className="w-4 h-4 mr-2" />
              ACCESS LAYER
            </Button>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>

{/* VAULT & MINTING INTERFACE */}
<section className="py-20 md:py-32 px-4 md:px-8 lg:px-16">
  <div className="max-w-7xl mx-auto">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      {/* LEFT - INTERACTIVE VAULT */}
      <div>
        <div className="mb-8">
          <span className="text-cyan-400 font-mono tracking-widest">QUANTUM VAULT</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Your <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Digital Soul</span> Awaits
          </h2>
          <p className="text-gray-400">
            Store, protect, and monetize your unique human data in our quantum-secure vault.
          </p>
        </div>

        {/* SECURITY STATUS */}
        <div className="space-y-4 mb-8">
          {[
            { icon: <ShieldCheck />, label: "QUANTUM ENCRYPTION", status: "ACTIVE", color: "green" },
            { icon: <Lock />, label: "BIOMETRIC LOCK", status: "ENABLED", color: "cyan" },
            { icon: <Satellite />, label: "NEURAL SYNC", status: "ONLINE", color: "purple" }
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between bg-black/30 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br from-${item.color}-500/20 to-${item.color}-300/20 flex items-center justify-center`}>
                  {item.icon}
                </div>
                <div>
                  <p className="font-bold text-sm md:text-base">{item.label}</p>
                  <p className="text-xs text-gray-400">Security Protocol</p>
                </div>
              </div>
              <div className={`text-${item.color}-400 font-mono text-xs md:text-sm flex items-center gap-2`}>
                <div className={`w-2 h-2 rounded-full bg-${item.color}-500 animate-pulse`} />
                {item.status}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT - MINTING PANEL */}
      <div className="bg-gradient-to-br from-black/50 to-cyan-500/10 border border-cyan-500/30 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold">MINT YOUR SOUL</h3>
            <p className="text-gray-400 text-sm">Convert data into eternal tokens</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-cyan-300">Δ 142.7</p>
            <p className="text-xs text-gray-400">Token Value</p>
          </div>
        </div>

        {/* DATA METRICS */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Biometric Data</span>
            <span className="font-mono text-cyan-300">47.2 MB</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Cultural Memory</span>
            <span className="font-mono text-purple-300">128.5 MB</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Linguistic Data</span>
            <span className="font-mono text-pink-300">89.3 MB</span>
          </div>
        </div>

        {/* MINT BUTTON */}
        <Button 
          className="w-full bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 py-6 text-base font-bold"
          onClick={handleMintSoulToken}
          disabled={!connectedWallet || minting}
        >
          {minting ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
              QUANTIZING...
            </>
          ) : (
            <>
              <Coins className="w-5 h-5 mr-2" />
              MINT SOUL TOKEN
            </>
          )}
        </Button>

        {!connectedWallet && (
          <p className="text-center text-sm text-gray-500 mt-4">
            Connect wallet to mint your soul data
          </p>
        )}
      </div>
    </div>
  </div>
</section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-black/50 backdrop-blur-xl py-12 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
                  <BrainCircuit className="w-5 h-5" />
                </div>
                <span className="text-xl font-bold">SOULNET</span>
              </div>
              <p className="text-sm text-gray-400">
                The next evolution of the internet — human consciousness on blockchain.
              </p>
            </div>

            {[
              { title: "NETWORK", links: ["Neural Nodes", "Data Streams", "Blockchain", "API"] },
              { title: "RESOURCES", links: ["Whitepaper", "Developers", "Research", "Community"] },
              { title: "ECOSYSTEM", links: ["Token", "Vault", "Layers", "Governance"] }
            ].map((column, i) => (
              <div key={i}>
                <h4 className="font-bold mb-4 text-cyan-300">{column.title}</h4>
                <ul className="space-y-2">
                  {column.links.map((link, j) => (
                    <li key={j}>
                      <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm font-mono text-gray-400">NETWORK: ONLINE</span>
                </div>
                <div className="h-4 w-px bg-gray-700" />
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                  <span className="text-sm font-mono text-gray-400">NODES: 2,417</span>
                </div>
              </div>
              
              <div className="text-center md:text-right">
                <p className="text-sm text-gray-500 font-mono">
                  © {new Date().getFullYear()} SOULNET | QUANTUM-ARCHITECTURE v2.3
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  Human data sovereignty • Eternal preservation • Decentralized future
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* TOAST NOTIFICATION */}
      <ToastNotification />

      {/* GLOBAL STYLES */}
      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        .animation-delay-500 {
          animation-delay: 500ms;
        }
      `}</style>
    </main>
  );
}