import React, { useState, useEffect, useMemo, useRef, memo, useCallback } from 'react'
import {
  Trophy, Rocket, Zap, Globe, Shield, Cpu,
  Instagram, Linkedin, Clock, MoveRight,
  Menu, X as XIcon, ChevronDown, Fingerprint, Layers, Terminal, Mail, User, Users, Phone,
  Briefcase, Facebook, Building2, UserPlus
} from 'lucide-react'
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useInView, useReducedMotion, animate } from 'framer-motion'

// --- Data Constants ---
const TIMELINE = [
  { time: '09:00 AM', title: 'Arrival & Sync', description: 'Collection of cosmic entry kits and hardware synchronization.' },
  { time: '10:30 AM', title: 'The Humble Beginning', description: 'Opening Ceremony: Revealing the Paradox of 2026.' },
  { time: '11:30 AM', title: 'Phase 1: Expansion', description: 'Engines ignited. Initial ideation and architecture design.' },
  { time: '01:30 PM', title: 'Fueling Window', description: 'High-energy refueling break for all neural units.' },
  { time: '02:30 PM', title: 'Phase 2: Event Horizon', description: 'Deep-void development. The intense coding sprint begins.' },
  { time: '05:00 PM', title: 'Survival Strategy', description: 'Final optimizations and strategic deployment preparations.' },
]

const RULES_LIST = [
  { id: '01', text: 'Units must consist of 2-4 synchronized members.' },
  { id: '02', text: 'All artifacts must be created within the event window.' },
  { id: '03', text: 'The High Council\'s logic is final.' }
]

const COORDINATORS = [
  {
    name: 'John Doe',
    role: 'EVENT COMMANDER',
    phone: '+91 98765 43210',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256&h=256&auto=format&fit=crop'
  },
  {
    name: 'Jane Smith',
    role: 'TECHNICAL ARCHITECT',
    phone: '+91 87654 32109',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&h=256&auto=format&fit=crop'
  },
  {
    name: 'Alex Vex',
    role: 'UPLINK SPECIALIST',
    phone: '+91 76543 21098',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&h=256&auto=format&fit=crop'
  }
]

const PRIZES = [
  { rank: 'Titan Winner', amount: '₹50,000', icon: <Trophy size={48} className="text-blue-400" />, perks: ['Paid Internship', 'Cyber Kit V1', 'Artifact #001'] },
  { rank: 'Nova Runner Up', amount: '₹30,000', icon: <Trophy size={40} className="text-indigo-400" />, perks: ['Internship Access', 'Tech Goodies', 'Artifact #002'] },
  { rank: 'Pulsar Third', amount: '₹15,000', icon: <Trophy size={32} className="text-slate-400" />, perks: ['Network Pass', 'Swag Box', 'Artifact #003'] },
]

const EVENTS = [
  { title: 'Quantum Code', desc: 'Solve algorithmic paradoxes that defy classical logic.', icon: <Cpu size={28} /> },
  { title: 'Nexus UX', desc: 'Craft interfaces for high-gravity environments.', icon: <Globe size={28} /> },
  { title: 'Gravity Hack', desc: 'A 24-hour construction sprint to build the frameworks of the void.', icon: <Shield size={28} /> }
]

// --- Performance Optimized Background ---

const Noise = memo(() => (
  <div className="fixed inset-0 z-[100] pointer-events-none opacity-[0.012] [transform:translateZ(0)] grain-texture" />
))

const SingularityCore = memo(({ scrollYProgress }) => {
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 45, damping: 25, mass: 0.8 })
  
  const scale = useTransform(smoothProgress, [0, 0.4, 1], [1, 2.8, 14])
  const rotateSlow = useTransform(smoothProgress, [0, 1], [0, -90])
  const gridOpacity = useTransform(smoothProgress, [0, 0.3, 0.8], [0.03, 0.08, 0.02])
  const accretionOpacity = useTransform(smoothProgress, [0, 0.5, 0.8], [0.15, 0.35, 0.05])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#010101]">
      <motion.div 
        style={{ opacity: gridOpacity }}
        className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)]"
      />

      {/* Ambient Depth Glow */}
      <motion.div 
        style={{ opacity: accretionOpacity, scale: useTransform(smoothProgress, [0, 1], [1, 2.8]) }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="w-[500px] h-[500px] rounded-full bg-blue-600/5 blur-[90px]" />
      </motion.div>

      <motion.div 
        style={{ scale, rotateZ: rotateSlow }} 
        className="absolute inset-0 flex items-center justify-center will-change-transform"
      >
        <div className="relative flex items-center justify-center">
            {/* Primary Technical Orbital Ring */}
            <div className="absolute rounded-full border-[1.2px] border-blue-500/40 w-[300px] h-[300px] animate-spin-slow-3d shadow-[0_0_10px_rgba(59,130,246,0.1)]" />
            
            {/* The Void - Sharpened Gravity Edge */}
            <div className="w-24 h-24 rounded-full bg-black z-50 relative overflow-hidden [transform:translateZ(0)] shadow-[0_0_120px_rgba(0,0,0,1)]">
                {/* Subtle Interior Rim Glow for definition */}
                <div className="absolute inset-0 rounded-full border-[0.5px] border-blue-500/10" />
                {/* Internal depth pulse */}
                <div className="absolute inset-0 rounded-full shadow-[inset_0_0_40px_rgba(59,130,246,0.3)] animate-pulse-slow" />
            </div>
        </div>
      </motion.div>
    </div>
  )
})

const StarField = memo(() => {
  const stars = useMemo(() => [...Array(20)].map((_, i) => ({
    id: i,
    size: Math.random() * 1.2 + 0.5,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    duration: 5 + Math.random() * 5
  })), [])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute bg-white rounded-full animate-star-pulse"
          style={{ 
            width: star.size, 
            height: star.size, 
            top: star.top, 
            left: star.left,
            animationDuration: `${star.duration}s`
          }}
        />
      ))}
    </div>
  )
})

// --- UI Components ---

const SmoothReveal = memo(({ children, delay = 0, className = '' }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <motion.div
      ref={ref}
      initial={{ y: 20, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  )
})

const CountdownTimer = memo(({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const timer = setInterval(() => {
      const distance = new Date(targetDate).getTime() - new Date().getTime()
      if (distance < 0) {
        clearInterval(timer)
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        })
      }
    }, 1000)
    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div className="relative py-12 px-6 rounded-[2rem] bg-zinc-900/10 border border-white/5 backdrop-blur-md overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-20 group-hover:opacity-40 transition-opacity" />
      <div className="relative flex items-center justify-center flex-wrap gap-y-6">
        {[
          { v: timeLeft.days, l: "Days" },
          { v: timeLeft.hours, l: "Hours" },
          { v: timeLeft.minutes, l: "Mins" },
          { v: timeLeft.seconds, l: "Secs" }
        ].map((item, idx) => (
          <div key={idx} className="flex flex-col items-center mx-2 sm:mx-6 font-display uppercase tracking-widest">
            <div className="text-4xl sm:text-7xl md:text-8xl font-black text-white tracking-tight">
              {item.v.toString().padStart(2, '0')}
            </div>
            <span className="text-[9px] text-blue-500 tracking-[0.4em] mt-2 opacity-60 font-normal">{item.l}</span>
          </div>
        ))}
      </div>
    </div>
  )
})

const SectionHeading = memo(({ children, subtitle }) => (
  <div className="mb-24 text-center px-4 overflow-visible font-display">
    <SmoothReveal className="overflow-visible">
      <div className="flex items-center justify-center gap-4 mb-4 opacity-50">
        <div className="h-px w-8 bg-blue-500" />
        <span className="text-blue-500 tracking-[0.5em] text-[10px] uppercase font-bold">{subtitle}</span>
        <div className="h-px w-8 bg-blue-500" />
      </div>
      <h2 className="text-4xl sm:text-7xl md:text-8xl font-black tracking-tight text-white uppercase leading-none px-4">
        {children}
      </h2>
    </SmoothReveal>
  </div>
))

const PrizeCard = memo(({ prize, index }) => {
  const [isFlipped, setIsFlipped] = useState(false)
  
  return (
    <SmoothReveal delay={index * 0.1} className="w-full h-[450px] font-prize">
      <div 
        className="group relative w-full h-full [perspective:1500px] cursor-pointer"
        onMouseEnter={() => setIsFlipped(true)}
        onMouseLeave={() => setIsFlipped(false)}
      >
        <motion.div 
          className="relative w-full h-full [transform-style:preserve-3d]"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className={`absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-[2.5rem] border border-white/10 bg-zinc-900/30 backdrop-blur-md p-8 flex flex-col items-center justify-center text-center overflow-hidden`}>
            <div className={`absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-indigo-600/5 opacity-50`} />
            <div className="relative z-10 mb-8 p-6 rounded-2xl bg-black/40 border border-white/5">{prize.icon}</div>
            <span className="relative z-10 text-xs text-blue-400 font-bold uppercase tracking-[0.3em] mb-4">{prize.rank}</span>
            <h3 className="relative z-10 text-5xl font-black text-white tracking-tighter uppercase">{prize.amount}</h3>
            <div className="absolute bottom-8 left-0 right-0 flex justify-center items-center gap-2 opacity-30 group-hover:opacity-100 transition-opacity text-[10px] uppercase tracking-widest text-white">
              Access Metadata <MoveRight size={12} className="text-blue-400" />
            </div>
          </div>

          <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-[2.5rem] border border-blue-500/20 bg-zinc-950 p-10 flex flex-col shadow-2xl font-mono">
            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-white/10">
              <Terminal size={16} className="text-blue-500" />
              <span className="text-[10px] text-white/50 uppercase tracking-widest font-black">LOG_PRIZE_V4.0</span>
            </div>
            <div className="space-y-4 flex-grow">
              {prize.perks.map((perk, i) => (
                <div key={i} className="flex items-start gap-4 text-xs group/item">
                  <div className="mt-1.5 h-1.5 w-1.5 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6]" />
                  <span className="text-zinc-400 group-hover/item:text-white transition-colors tracking-tight font-medium uppercase">{perk}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </SmoothReveal>
  )
})

// --- Registration Manifest Components ---

const ManifestInput = ({ icon: Icon, label, placeholder, type = "text" }) => (
  <div className="space-y-4 group/field font-mono">
    <div className="flex items-center gap-3 px-2 opacity-70 group-focus-within/field:opacity-100 transition-opacity duration-300">
      <Icon size={14} className="text-blue-400" />
      <label className="text-[10px] font-black text-blue-400 uppercase tracking-[0.25em]">{label}</label>
    </div>
    <input 
      type={type}
      className="w-full bg-black/40 border border-white/10 rounded-[1.2rem] px-6 py-4 text-white focus:border-blue-500/50 outline-none transition-all text-sm tracking-widest placeholder:text-zinc-800 uppercase shadow-inner" 
      placeholder={placeholder} 
    />
  </div>
)

const ManifestDropdown = ({ icon: Icon, label, value, options, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="space-y-4 group/field font-mono" ref={containerRef}>
      <div className={`flex items-center gap-3 px-2 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-70'}`}>
        <Icon size={14} className="text-blue-400" />
        <label className="text-[10px] font-black text-blue-400 uppercase tracking-[0.25em]">{label}</label>
      </div>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full bg-black/50 border transition-all rounded-[1.2rem] px-6 py-4 text-white text-sm tracking-[0.2em] flex items-center justify-between uppercase ${isOpen ? 'border-blue-500 ring-1 ring-blue-500/20' : 'border-white/10 shadow-inner'}`}
        >
          <span>{value}</span>
          <ChevronDown size={18} className={`text-blue-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 5 }}
              exit={{ opacity: 0, y: -5 }}
              className="absolute z-[100] w-full bg-[#0d0d0d] border border-white/10 rounded-[1.2rem] shadow-2xl backdrop-blur-md overflow-hidden"
            >
              <div className="p-2 space-y-1">
                {options.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => { onChange(opt); setIsOpen(false); }}
                    className={`w-full text-left px-5 py-3 rounded-[0.8rem] text-xs tracking-widest transition-all uppercase font-mono ${value === opt ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]' : 'text-zinc-400 hover:bg-white/5 hover:text-white'}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// --- Main App ---

const App = () => {
  const containerRef = useRef(null)
  const [activeSection, setActiveSection] = useState('home')
  const [hoveredNavItem, setHoveredNavItem] = useState(null)
  const [domain, setDomain] = useState('NEXUS UX')
  const [teamSize, setTeamSize] = useState('02 UNITS')
  const [isScrolling, setIsScrolling] = useState(false)

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] })

  const scrollTo = useCallback((id) => {
    const element = document.getElementById(id)
    if (element && !isScrolling) {
      // Immediate Highlight Feedback
      setActiveSection(id)
      setIsScrolling(true)
      
      const targetY = element.getBoundingClientRect().top + window.pageYOffset - 100;
      animate(window.scrollY, targetY, {
        type: "spring",
        stiffness: 100,
        damping: 30,
        mass: 0.8,
        onUpdate: (v) => window.scrollTo(0, v),
        onComplete: () => {
          setIsScrolling(false)
        }
      });
    }
  }, [isScrolling])

  const navItems = ['home', 'events', 'timeline', 'prizes', 'register', 'rules', 'coordinators']

  useEffect(() => {
    const handleScroll = () => {
      if (isScrolling) return; 
      const sections = navItems.map(id => document.getElementById(id))
      const current = sections.find(section => {
        if (!section) return false
        const rect = section.getBoundingClientRect()
        return rect.top >= -350 && rect.top <= 350
      })
      if (current) setActiveSection(current.id)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [navItems, isScrolling])

  const socialLinks = useMemo(() => [
    { Icon: Instagram, href: "#" },
    { Icon: Facebook, href: "#" },
    { Icon: XIcon, href: "#" }
  ], []);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#000000] text-zinc-300 selection:bg-blue-600/30 overflow-x-hidden font-sans">
      <Noise />
      <SingularityCore scrollYProgress={scrollYProgress} />
      <StarField />

      {/* NAVIGATION */}
      <nav className="fixed top-0 left-0 right-0 z-[110] p-6 sm:p-8 hidden md:flex justify-center pointer-events-auto">
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="relative flex items-center gap-1 p-1.5 bg-black/40 border border-white/5 backdrop-blur-md rounded-full shadow-2xl"
        >
          {navItems.map((id) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              onMouseEnter={() => setHoveredNavItem(id)}
              onMouseLeave={() => setHoveredNavItem(null)}
              className={`relative px-4 py-2.5 rounded-full text-[11px] font-sans font-black uppercase tracking-[0.1em] transition-colors duration-200 z-10 ${
                activeSection === id ? 'text-white' : 'text-zinc-500 hover:text-zinc-200'
              }`}
            >
              {(activeSection === id || hoveredNavItem === id) && (
                <motion.div
                  layoutId="nav-pill"
                  transition={{ type: 'spring', bounce: 0.15, duration: 0.45 }}
                  className={`absolute inset-0 rounded-full -z-10 will-change-transform ${
                    activeSection === id 
                      ? 'bg-blue-600 shadow-lg shadow-blue-500/20' 
                      : 'bg-white/5'
                  }`}
                />
              )}
              <span className="relative">{id === 'home' ? 'Home' : id.charAt(0).toUpperCase() + id.slice(1)}</span>
            </button>
          ))}
        </motion.div>
      </nav>

      <main className="relative z-10">
        {/* HERO */}
        <section id="home" className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 text-center pt-32 pb-40 overflow-visible">
          <SmoothReveal className="flex flex-col items-center overflow-visible w-full">
            <div className="flex items-center justify-center gap-3 mb-12">
              <Layers size={14} className="text-blue-500" />
              <span className="text-blue-500 tracking-[0.5em] text-[10px] font-black uppercase font-prize">SIESGST ACM CHAPTER</span>
            </div>
            <div className="relative overflow-visible px-4 sm:px-12 py-6 group w-full max-w-full font-display">
              <h1 className="text-5xl sm:text-8xl md:text-[11rem] font-black text-white tracking-tighter leading-none uppercase mb-6 drop-shadow-[0_0_40px_rgba(59,130,246,0.15)] whitespace-nowrap overflow-visible flex items-center justify-center">
                PARA<span className="text-transparent bg-clip-text bg-gradient-to-b from-blue-300 via-blue-500 to-blue-800 animate-pulse-slow pr-[0.05em] ml-[-0.01em]">DOX</span>
              </h1>
            </div>
            <div className="max-w-4xl mx-auto mb-16 sm:mb-20 w-full px-2 sm:px-0 font-prize">
              <CountdownTimer targetDate="2026-03-25T09:00:00" />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollTo('events')}
              className="px-10 sm:px-12 py-5 sm:py-6 bg-blue-600 text-white font-black uppercase tracking-[0.4em] rounded-2xl flex items-center gap-3 sm:gap-4 text-[10px] sm:text-xs shadow-2xl group mx-auto font-prize"
            >
              Access Event Horizon <Rocket size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </motion.button>
          </SmoothReveal>
        </section>

        {/* EVENTS */}
        <section id="events" className="max-w-7xl mx-auto px-6 py-40 [content-visibility:auto]">
          <SectionHeading subtitle="Neural_Layers">EVENTS DESCRIPTION</SectionHeading>
          <div className="grid md:grid-cols-3 gap-8">
            {EVENTS.map((event, i) => (
              <SmoothReveal key={i} delay={i * 0.05}>
                <div className="p-10 rounded-[2.5rem] bg-zinc-900/20 border border-white/5 hover:border-blue-500/20 transition-all duration-300 group h-full shadow-xl backdrop-blur-sm font-prize">
                  <div className="w-16 h-16 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-500 mb-10 group-hover:bg-blue-600 group-hover:text-white transition-all">{event.icon}</div>
                  <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-6 leading-none font-display">{event.title}</h3>
                  <p className="text-zinc-500 text-base leading-relaxed mb-10 font-medium uppercase tracking-wide">{event.desc}</p>
                </div>
              </SmoothReveal>
            ))}
          </div>
        </section>

        {/* TIMELINE */}
        <section id="timeline" className="max-w-5xl mx-auto px-6 py-40 [content-visibility:auto]">
          <SectionHeading subtitle="Chronological_Log">TIMELINE PAGE</SectionHeading>
          <div className="space-y-16 relative">
            <div className="absolute left-10 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/0 via-blue-500/10 to-transparent" />
            {TIMELINE.map((item, i) => (
              <SmoothReveal key={i} delay={i * 0.03}>
                <div className="flex gap-12 group font-prize">
                  <div className="w-20 h-20 rounded-2xl bg-black border border-white/10 flex items-center justify-center text-blue-500 group-hover:border-blue-500 transition-colors duration-300 shrink-0 shadow-lg"><Clock size={24} /></div>
                  <div className="pt-4 pb-12 border-b border-white/5 flex-grow">
                    <span className="text-blue-500 font-mono text-xs font-bold uppercase tracking-[0.4em] mb-4 block opacity-60 font-bold">{item.time}</span>
                    <h4 className="text-4xl font-black text-white uppercase tracking-tighter group-hover:text-blue-400 transition-colors duration-300 font-display">{item.title}</h4>
                    <p className="text-zinc-500 text-lg mt-4 max-w-2xl font-medium leading-relaxed uppercase tracking-wide">{item.description}</p>
                  </div>
                </div>
              </SmoothReveal>
            ))}
          </div>
        </section>

        {/* PRIZE POOL */}
        <section id="prizes" className="max-w-7xl mx-auto px-6 py-40 [content-visibility:auto]">
          <SectionHeading subtitle="Asset_Registry">PRIZE POOL</SectionHeading>
          <div className="grid md:grid-cols-3 gap-10">
            {PRIZES.map((prize, i) => (
              <PrizeCard key={i} prize={prize} index={i} />
            ))}
          </div>
        </section>

        {/* REGISTRATION */}
        <section id="register" className="max-w-6xl mx-auto px-4 sm:px-6 py-24 sm:py-40 [content-visibility:auto]">
          <SectionHeading subtitle="Secure_Manifest">REGISTRATION PROCESS</SectionHeading>
          <SmoothReveal>
            <div className="p-8 sm:p-16 rounded-[2.5rem] bg-zinc-950/80 border border-white/5 shadow-2xl backdrop-blur-3xl relative overflow-hidden font-prize">
                <form className="space-y-12 relative z-10" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
                      <div className="space-y-10">
                          <div className="flex items-center gap-3 border-l-2 border-blue-500 pl-4 mb-8">
                              <h5 className="text-[11px] font-mono font-black text-white/80 uppercase tracking-[0.4em]">UNIT_IDENTIFICATION</h5>
                          </div>
                          <ManifestInput icon={Users} label="Team Name" placeholder="VOID_WALKERS" />
                          <ManifestInput icon={User} label="Leader Name" placeholder="FULL NAME" />
                          <ManifestDropdown icon={UserPlus} label="Team Size" value={teamSize} options={['02 UNITS', '03 UNITS', '04 UNITS']} onChange={setTeamSize} />
                      </div>
                      <div className="space-y-10">
                          <div className="flex items-center gap-3 border-l-2 border-blue-500 pl-4 mb-8">
                              <h5 className="text-[11px] font-mono font-black text-white/80 uppercase tracking-[0.4em]">CONTACT_UPLINK</h5>
                          </div>
                          <ManifestInput icon={Building2} label="Institution" placeholder="COLLEGE / UNIVERSITY" />
                          <ManifestInput icon={Mail} label="Email ID" placeholder="USER@DOMAIN.COM" type="email" />
                          <ManifestInput icon={Phone} label="Contact No" placeholder="+91 XXXXX XXXXX" type="tel" />
                      </div>
                    </div>
                    <div className="space-y-5 pt-6"><ManifestDropdown icon={Terminal} label="Strategic Domain Preference" value={domain} options={['QUANTUM CODE', 'NEXUS UX', 'GRAVITY HACK']} onChange={setDomain} /></div>
                    <div className="pt-4 font-mono text-center">
                        <motion.button whileHover={{ scale: 1.01, backgroundColor: '#2563eb' }} whileTap={{ scale: 0.99 }} className="w-full py-8 bg-blue-600 text-white font-mono font-black uppercase tracking-[0.6em] rounded-[1.5rem] shadow-xl transition-all text-sm flex items-center justify-center gap-4">
                            <Fingerprint size={20} /><span className="tracking-[0.4em]">CONFIRM_REGISTRATION</span>
                        </motion.button>
                    </div>
                </form>
            </div>
          </SmoothReveal>
        </section>

        {/* RULES */}
        <section id="rules" className="max-w-7xl mx-auto px-6 py-40 [content-visibility:auto]">
          <SectionHeading subtitle="Operation_Protocols">RULES</SectionHeading>
          <div className="space-y-12">
            {RULES_LIST.map((rule) => (
              <div key={rule.id} className="group flex items-start gap-8 font-prize">
                <span className="font-mono text-blue-500 text-lg font-bold opacity-40 group-hover:opacity-100 transition-opacity">[{rule.id}]</span>
                <p className="text-zinc-400 text-lg sm:text-xl font-medium leading-relaxed group-hover:text-white transition-colors duration-300 font-mono uppercase tracking-wider">{rule.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* COORDINATORS */}
        <section id="coordinators" className="max-w-7xl mx-auto px-6 py-40 [content-visibility:auto]">
            <SectionHeading subtitle="Command_Center">COORDINATORS</SectionHeading>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 font-prize">
              {COORDINATORS.map((person, i) => (
                <motion.div key={i} whileHover={{ y: -5 }} className="flex items-center gap-6 p-6 rounded-[2.5rem] border border-white/5 bg-zinc-900/10 group transition-all duration-300 backdrop-blur-sm shadow-xl">
                  <div className="relative shrink-0"><img src={person.image} alt={person.name} className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover grayscale group-hover:grayscale-0 transition-all duration-500 border border-white/10" /></div>
                  <div className="flex-grow">
                    <h4 className="text-xl font-black text-white uppercase tracking-tight mb-1 leading-none font-display">{person.name}</h4>
                    <p className="text-[10px] text-blue-500 font-bold uppercase tracking-widest mb-2">{person.role}</p>
                  </div>
                  <a href="#" className="p-3 rounded-xl bg-white/5 text-zinc-500 hover:text-blue-500 transition-colors duration-300 shadow-lg"><Linkedin size={18} /></a>
                </motion.div>
              ))}
            </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="py-40 text-center border-t border-white/5 bg-zinc-950/50 relative z-10 font-prize">
        <SmoothReveal>
          <h2 className="font-black tracking-[1.5em] text-4xl text-white uppercase mb-10 opacity-40 font-display">PARADOX</h2>
          <div className="flex justify-center gap-10 mb-20">
            {socialLinks.map(({ Icon, href }, i) => (
              <a key={i} href={href} className="text-zinc-600 hover:text-blue-500 transition-all duration-300 hover:scale-110 drop-shadow-[0_0_10px_rgba(59,130,246,0.3)]">
                <Icon size={26} />
              </a>
            ))}
          </div>
          <p className="text-zinc-800 font-mono text-[10px] uppercase font-bold tracking-[0.6em]">SIESGST ACM // HACK_2026 // SYSTEM_SYNC</p>
        </SmoothReveal>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Julius+Sans+One&family=JetBrains+Mono:wght@400;700&family=Kumbh+Sans:wght@300;400;600;700;800;900&display=swap');
        :root { --font-display: 'Julius Sans One', sans-serif; --font-mono: 'JetBrains Mono', monospace; --font-prize: 'Kumbh Sans', sans-serif; }
        body { font-family: var(--font-display); background-color: black; color: white; overflow-x: hidden; -webkit-font-smoothing: antialiased; }
        .font-mono { font-family: var(--font-mono); }
        .font-display { font-family: var(--font-display); }
        .font-prize { font-family: var(--font-prize); }
        .animate-pulse-slow { animation: pulse 6s infinite ease-in-out; }
        @keyframes pulse { 0%, 100% { opacity: 0.8; } 50% { opacity: 1; } }
        @keyframes star-pulse { 0%, 100% { opacity: 0.05; } 50% { opacity: 0.2; } }
        .animate-star-pulse { animation: star-pulse infinite ease-in-out; }
        @keyframes spin-slow-3d { 0% { transform: rotateX(45deg) rotateY(0deg) rotateZ(0deg); } 100% { transform: rotateX(45deg) rotateY(360deg) rotateZ(360deg); } }
        .animate-spin-slow-3d { animation: spin-slow-3d 35s linear infinite; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #000; }
        ::-webkit-scrollbar-thumb { background: #1e3a8a; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #3b82f6; }
        .grain-texture { background-image: url('https://grainy-gradients.vercel.app/noise.svg'); filter: contrast(180%) brightness(120%); pointer-events: none; }
        h1, h2, h3, h4 { letter-spacing: -0.04em; overflow: visible !important; }
        section { contain: content; }
        @media (max-width: 640px) { h1 { font-size: 14vw; } }
      `}</style>
    </div>
  )
}

export default App