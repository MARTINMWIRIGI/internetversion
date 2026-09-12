"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { 
  Brain, Globe, Network, Users, Sparkles, Rocket, 
  Infinity as InfinityIcon, Cpu, Shield, Code,
  GitBranch, Cloud, Satellite, CircuitBoard, BrainCircuit,
  Zap, Lock, Heart, Eye, Fingerprint, Terminal,
  ChevronRight, ExternalLink, ArrowRight,
  Star, Target, Layers
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// Interactive particle background component
const NeuralParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number; y: number; size: number; speedX: number; speedY: number;
      color: string; connections: Array<{x: number; y: number}>;
    }> = [];

    const colors = [
      'rgba(147, 51, 234, 0.6)', // Purple
      'rgba(6, 182, 212, 0.6)',  // Cyan
      'rgba(236, 72, 153, 0.6)', // Pink
      'rgba(34, 197, 94, 0.6)',  // Green
    ];

    // Create particles
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        connections: []
      });
    }

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach(particle => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Bounce off edges
        if (particle.x <= 0 || particle.x >= canvas.width) particle.speedX *= -1;
        if (particle.y <= 0 || particle.y >= canvas.height) particle.speedY *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        // Draw connections
        particles.forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(147, 51, 234, ${0.2 * (1 - distance/100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      className="fixed inset-0 -z-10 opacity-30"
    />
  );
};
// Timeline Component
const TimelineItem = ({ year, title, description, icon: Icon, isFirst = false, isLast = false }) => (
  <div className="relative flex items-start group">
    {/* Timeline line */}
    {!isFirst && (
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500/30 to-cyan-500/30" />
    )}

    <div className="relative z-10">
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-purple-600/20 to-cyan-600/20 border border-purple-500/30 group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-6 h-6 text-cyan-400" />
      </div>
    </div>

    <div className="ml-8 flex-1">
      <div className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20 mb-2">
        <span className="text-sm font-mono text-cyan-300">{year}</span>
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  </div>
);

// Core Principle Card
const PrincipleCard = ({ icon: Icon, title, description, color }) => (
  <motion.div
    whileHover={{ y: -10, scale: 1.02 }}
    className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900/50 to-black/50 border border-gray-800 backdrop-blur-sm p-6"
  >
    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/5 to-cyan-500/5 rounded-full -translate-y-16 translate-x-16" />

    <div className={`w-14 h-14 rounded-xl ${color} flex items-center justify-center mb-4`}>
      <Icon className="w-7 h-7 text-white" />
    </div>

    <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </motion.div>
);
// Main About Page Component
export default function AboutPage() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("mission");
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.8, 1]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-cyan-500 rounded-full animate-spin animation-delay-500"></div>
          <p className="mt-4 text-purple-400 font-mono animate-pulse">Loading Consciousness...</p>
        </div>
      </div>
    );
  }
return (
  <div ref={containerRef} className="min-h-screen bg-black text-white overflow-hidden">
    {/* Animated Background */}
    <NeuralParticles />

    {/* Floating Orbs */}
    <div className="fixed inset-0 pointer-events-none">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gradient-to-r from-purple-500/10 to-cyan-500/10"
          style={{
            width: Math.random() * 300 + 100,
            height: Math.random() * 300 + 100,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, Math.random() * 100 - 50, 0],
            x: [0, Math.random() * 50 - 25, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>

    {/* Hero Section */}
    <section className="relative min-h-screen flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/5 via-transparent to-black" />

      <motion.div 
        className="text-center max-w-6xl mx-auto relative z-10"
        style={{ opacity, scale }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20 mb-8">
          <Brain className="w-4 h-4 text-cyan-400" />
          <span className="text-sm font-mono text-cyan-300">The Future of Consciousness</span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
          <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
            About Soul Internet
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
          We are building the next evolution of human connection—a decentralized neural network 
          where consciousness transcends physical boundaries and individual souls converge into 
          a collective intelligence.
        </p>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-16"
        >
          <ChevronRight className="w-8 h-8 mx-auto text-cyan-400 rotate-90" />
        </motion.div>
      </motion.div>
    </section>
{/* Mission & Vision */}
<section className="py-20 px-4 relative">
  <div className="max-w-6xl mx-auto">
    <div className="flex flex-col md:flex-row gap-8 mb-16">
      <div id="mission" className="flex-1 scroll-mt-28">
        <Card className="bg-gradient-to-br from-purple-900/10 to-cyan-900/10 border border-purple-500/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Target className="text-purple-400" />
              <span className="text-2xl">Our Mission</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-gray-300 leading-relaxed">
              To create a permissionless, decentralized network where human consciousness 
              can interact, evolve, and transcend physical limitations through secure 
              neural interfaces and soul-bound digital identities.
            </p>
          </CardContent>
        </Card>
      </div>

      <div id="vision" className="flex-1 scroll-mt-28">
        <Card className="bg-gradient-to-br from-cyan-900/10 to-purple-900/10 border border-cyan-500/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Eye className="text-cyan-400" />
              <span className="text-2xl">Our Vision</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-gray-300 leading-relaxed">
              A world where every consciousness can connect directly, share experiences 
              telepathically, and contribute to a collective intelligence that accelerates 
              human evolution and understanding.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>

    {/* Tabs Navigation */}
    <div className="flex flex-wrap gap-4 mb-12">
      {["mission", "technology", "principles", "timeline"].map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
            activeTab === tab
              ? "bg-gradient-to-r from-purple-600 to-cyan-600 text-white"
              : "bg-gray-900/50 text-gray-400 hover:text-white hover:bg-gray-800/50"
          }`}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </button>
      ))}
    </div>
    {/* Tab Content */}
    <AnimatePresence mode="wait">
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {activeTab === "principles" && (
          <>
            <PrincipleCard
              icon={Shield}
              title="Conscious Sovereignty"
              description="Every soul maintains absolute control over its data, experiences, and connections within the network."
              color="bg-gradient-to-br from-purple-600 to-purple-700"
            />
            <PrincipleCard
              icon={Network}
              title="Decentralized Intelligence"
              description="No central authority. The network grows organically through peer-to-peer consciousness connections."
              color="bg-gradient-to-br from-cyan-600 to-blue-600"
            />
            <PrincipleCard
              icon={Heart}
              title="Ethical Evolution"
              description="All technological advancement must serve conscious well-being and preserve individual essence."
              color="bg-gradient-to-br from-pink-600 to-rose-600"
            />
          </>
        )}

        {activeTab === "technology" && (
          <>
            <PrincipleCard
              icon={BrainCircuit}
              title="Neural Interfaces"
              description="Bi-directional consciousness gateways that allow seamless interaction between mind and network."
              color="bg-gradient-to-br from-purple-600 to-indigo-600"
            />
            <PrincipleCard
              icon={CircuitBoard}
              title="Soul Protocols"
              description="Cryptographic frameworks that verify, secure, and authenticate consciousness data streams."
              color="bg-gradient-to-br from-cyan-600 to-teal-600"
            />
            <PrincipleCard
              icon={InfinityIcon}
              title="MultiSoul Tokens"
              description="Digital representations of consciousness facets that can evolve, merge, and create new intelligences."
              color="bg-gradient-to-br from-pink-600 to-purple-600"
            />
          </>
        )}
      </motion.div>
    </AnimatePresence>
  </div>
</section>
{/* Timeline Section */}
<section className="py-20 px-4 relative">
  <div className="max-w-4xl mx-auto">
    <h2 className="text-4xl font-bold text-center mb-16">
      <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
        Our Journey
      </span>
    </h2>

    <div className="space-y-12">
      <TimelineItem
        year="2023"
        title="Vision Conceived"
        description="The initial concept of a consciousness-first internet emerges from quantum consciousness theories."
        icon={Sparkles}
        isFirst
      />
      <TimelineItem
        year="2024"
        title="Protocol Development"
        description="Core neural protocols and the MultiSoul token standard are conceptualized and designed."
        icon={Code}
      />
      <TimelineItem
        year="2025"
        title="Alpha Network Launch"
        description="First decentralized nodes go live, allowing initial consciousness synchronization experiments."
        icon={Rocket}
      />
      <TimelineItem
        year="2026"
        title="Global Consciousness Grid"
        description="Network expands globally with thousands of synchronized consciousness nodes."
        icon={Globe}
        isLast
      />
    </div>
  </div>
</section>
{/* Team Call-to-Action */}
<section className="py-20 px-4 relative">
  <div className="max-w-4xl mx-auto text-center">
    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20 mb-8">
      <Users className="w-5 h-5 text-cyan-400" />
      <span className="font-mono text-cyan-300">Join the Consciousness Collective</span>
    </div>

    <h2 className="text-4xl md:text-5xl font-bold mb-6">
      Become Part of the Evolution
    </h2>

    <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
      We're seeking consciousness explorers, neural architects, and ethical futurists 
      to help build the next stage of human existence.
    </p>

    <div className="flex flex-wrap gap-4 justify-center">
      <Button className="px-8 py-6 text-lg bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700">
        <GitBranch className="mr-2 h-5 w-5" />
        Contribute to Protocol
      </Button>
      <Button variant="outline" className="px-8 py-6 text-lg border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10">
        <ExternalLink className="mr-2 h-5 w-5" />
        Join Consciousness Lab
      </Button>
    </div>
  </div>
</section>
      {/* Animated Footer */}
      <footer className="relative border-t border-gray-800/50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center gap-3 mb-4">
                <Brain className="w-8 h-8 text-cyan-400" />
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Soul Internet
                </span>
              </div>
              <p className="text-gray-400">Redefining consciousness connection</p>
            </div>

            <div className="flex gap-6">
              {["Whitepaper", "GitHub", "Discord", "Twitter"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-800/30 text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} Soul Internet. All consciousness preserved.</p>
          </div>
        </div>
      </footer>

      {/* CSS for gradient animation - UPDATED VERSION */}
      <style>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
}