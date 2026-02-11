import React, { useState, useEffect, useMemo, useRef, memo, useCallback } from 'react'
import {
  Trophy, Rocket, Zap, Globe, Shield, Cpu,
  Instagram, Linkedin, Clock, MoveRight,
  Menu, X as XIcon, ChevronDown, Fingerprint, Layers, Terminal, Mail, User, Users, Phone,
  Briefcase, Facebook, Building2, UserPlus
} from 'lucide-react'
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useInView, animate } from 'framer-motion'

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
    name: 'Rog',
    role: 'EVENT COMMANDER',
    linkedin: 'https://linkedin.com',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rog'
  },
  {
    name: 'Mog',
    role: 'TECHNICAL ARCHITECT',
    linkedin: 'https://linkedin.com',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mog'
  },
  {
    name: 'Fog',
    role: 'UPLINK SPECIALIST',
    linkedin: 'https://linkedin.com',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fog'
  }
]

const PRIZES = [
  { rank: 'Titan Winner', amount: '₹500', icon: <Trophy className="text-blue-400 w-8 h-8 sm:w-12 sm:h-12" />, perks: ['Paid Internship', 'Cyber Kit V1', 'Artifact #001'] },
  { rank: 'Nova Runner Up', amount: '₹300', icon: <Trophy className="text-indigo-400 w-7 h-7 sm:w-10 sm:h-10" />, perks: ['Internship Access', 'Tech Goodies', 'Artifact #002'] },
  { rank: 'Pulsar Third', amount: '₹150', icon: <Trophy className="text-slate-400 w-6 h-6 sm:w-8 sm:h-8" />, perks: ['Network Pass', 'Swag Box', 'Artifact #003'] },
]

const EVENTS = [
  { title: 'Quantum Code', desc: 'Solve algorithmic paradoxes that defy classical logic.', icon: <Cpu size={28} /> },
  { title: 'Nexus UX', desc: 'Craft interfaces for high-gravity environments.', icon: <Globe size={28} /> },
  { title: 'Gravity Hack', desc: 'A 24-hour construction sprint to build the frameworks of the void.', icon: <Shield size={28} /> }
]

// --- Performance Components ---

const Noise = memo(() => (
  <div className="fixed inset-0 z-[100] pointer-events-none opacity-[0.015] grain-texture will-change-transform transform-gpu" />
))

const SingularityCore = memo(({ scrollYProgress }) => {
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 20, damping: 40, mass: 1.5 })
  
  const scale = useTransform(smoothProgress, [0, 0.45, 1], [0.5, 0.85, 3.5])
  const rotateSlow = useTransform(smoothProgress, [0, 1], [0, -30])
  const gridOpacity = useTransform(smoothProgress, [0, 0.3, 0.8], [0.04, 0.12, 0.03])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#010101] [perspective:1200px] transform-gpu">
      <motion.div 
        style={{ opacity: gridOpacity }}
        className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] sm:bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_20%,transparent_100%)] transform-gpu z-0"
      />

      <motion.div 
        style={{ scale: useTransform(smoothProgress, [0, 1], [1, 2]) }}
        className="absolute inset-0 flex items-center justify-center opacity-25 transform-gpu z-1"
      >
        <div className="w-[90vw] h-[90vw] max-w-[1200px] max-h-[1200px] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.25)_0%,transparent_70%)]" />
      </motion.div>

      <motion.div 
        style={{ scale, rotateZ: rotateSlow }} 
        className="absolute inset-0 flex items-center justify-center will-change-transform origin-center transform-gpu z-10"
      >
        <div className="relative flex items-center justify-center">
            <div className="absolute rounded-full border-[1px] border-blue-500/30 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] animate-spin-slow-3d [backface-visibility:hidden]">
               <div className="absolute inset-4 rounded-full border-[0.5px] border-blue-400/10" />
            </div>
            
            <div className="w-[180px] h-[180px] sm:w-[320px] sm:h-[320px] rounded-full bg-black z-50 relative overflow-hidden shadow-[0_0_100px_rgba(0,0,0,1)] border border-white/5 [backface-visibility:hidden]">
                <div className="absolute inset-0 rounded-full border-[0.5px] border-blue-500/20" />
                <div className="absolute inset-0 rounded-full shadow-[inset_0_0_50px_rgba(59,130,246,0.2)] animate-pulse-slow" />
            </div>
        </div>
      </motion.div>
    </div>
  )
})

const StarField = memo(() => {
  const stars = useMemo(() => [...Array(15)].map((_, i) => ({
    id: i,
    size: Math.random() * 2 + 0.5,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    duration: 4 + Math.random() * 6
  })), [])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30 transform-gpu">
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

// --- Form Elements ---

const ManifestInput = ({ icon: Icon, label, placeholder, type = "text" }) => (
  <div className="space-y-2 sm:space-y-4 group/field font-display">
    <div className="flex items-center gap-2 sm:gap-3 px-1 opacity-70 group-focus-within/field:opacity-100 transition-opacity duration-300">
      <Icon size={12} className="text-blue-400 sm:w-4 sm:h-4" />
      <label className="text-[8px] sm:text-[11px] font-black text-blue-400 uppercase tracking-[0.2em] sm:tracking-[0.3em]">{label}</label>
    </div>
    <input 
      type={type}
      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 sm:py-4 text-white focus:border-blue-500/50 outline-none transition-all text-xs sm:text-sm tracking-widest placeholder:text-zinc-800 uppercase font-mono" 
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
    <div className="space-y-2 sm:space-y-4 group/field font-display" ref={containerRef}>
      <div className={`flex items-center gap-2 sm:gap-3 px-1 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-70'}`}>
        <Icon size={12} className="text-blue-400 sm:w-4 sm:h-4" />
        <label className="text-[8px] sm:text-[11px] font-black text-blue-400 uppercase tracking-[0.2em] sm:tracking-[0.25em]">{label}</label>
      </div>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full bg-black/50 border transition-all rounded-xl px-4 py-3 sm:py-4 text-white text-xs sm:text-sm tracking-[0.1em] sm:tracking-[0.2em] flex items-center justify-between uppercase ${isOpen ? 'border-blue-500 ring-1 ring-blue-500/20' : 'border-white/10 shadow-inner'}`}
        >
          <span className="truncate mr-2">{value}</span>
          <ChevronDown size={16} className={`text-blue-500 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 5 }}
              exit={{ opacity: 0, y: -5 }}
              className="absolute z-[100] w-full bg-[#0d0d0d] border border-white/10 rounded-xl shadow-2xl backdrop-blur-md overflow-hidden"
            >
              <div className="p-1 sm:p-2 space-y-1">
                {options.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => { onChange(opt); setIsOpen(false); }}
                    className={`w-full text-left px-4 py-2.5 sm:py-3 rounded-lg text-[10px] sm:text-xs tracking-widest transition-all uppercase ${value === opt ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]' : 'text-zinc-400 hover:bg-white/5 hover:text-white'}`}
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

// --- Reusable Sections ---

const SmoothReveal = memo(({ children, delay = 0, className = '' }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-5%' })
  const numericDelay = Number(delay) || 0

  return (
    <motion.div
      ref={ref}
      initial={{ y: 20, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.8, delay: numericDelay, ease: [0.22, 1, 0.36, 1] }}
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

  const items = [
    { v: timeLeft.days, l: "Days" },
    { v: timeLeft.hours, l: "Hours" },
    { v: timeLeft.minutes, l: "Mins" },
    { v: timeLeft.seconds, l: "Secs" }
  ];

  return (
    <div className="relative py-6 sm:py-12 px-4 rounded-[1.5rem] sm:rounded-[2rem] bg-zinc-900/10 border border-white/5 backdrop-blur-md overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-10 group-hover:opacity-20 transition-opacity duration-700" />
      <div className="relative flex items-center justify-center flex-wrap gap-y-4 sm:gap-x-2 font-hero tracking-widest">
        {items.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center mx-3 sm:mx-8 uppercase">
            <div className="text-3xl sm:text-6xl md:text-8xl font-black text-white tracking-tighter">
              {item.v.toString().padStart(2, '0')}
            </div>
            <span className="text-[7px] sm:text-[9px] text-blue-500 tracking-[0.2em] sm:tracking-[0.4em] mt-1 sm:mt-2 opacity-60 font-display uppercase">{item.l}</span>
          </div>
        ))}
      </div>
    </div>
  )
})

const SectionHeading = memo(({ children, subtitle }) => (
  <div className="mb-12 sm:mb-24 text-center px-4 font-display">
    <SmoothReveal>
      <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3 sm:mb-4 opacity-50">
        <div className="h-px w-6 sm:w-12 bg-blue-500" />
        <span className="text-blue-500 tracking-[0.4em] sm:tracking-[0.6em] text-[8px] sm:text-[10px] uppercase font-bold">{subtitle}</span>
        <div className="h-px w-6 sm:w-12 bg-blue-500" />
      </div>
      <h2 className="text-3xl sm:text-6xl md:text-8xl font-black tracking-tight text-white uppercase leading-tight sm:leading-none">
        {children}
      </h2>
    </SmoothReveal>
  </div>
))

const PrizeCard = memo(({ prize, index }) => {
  const [isFlipped, setIsFlipped] = useState(false)
  
  return (
    <SmoothReveal delay={index * 0.1} className="w-full h-[380px] sm:h-[450px] font-display">
      <div 
        className="group relative w-full h-full [perspective:1500px] cursor-pointer"
        onMouseEnter={() => setIsFlipped(true)}
        onMouseLeave={() => setIsFlipped(false)}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <motion.div 
          className="relative w-full h-full [transform-style:preserve-3d]"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Front */}
          <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-2xl sm:rounded-[2.5rem] border border-white/10 bg-zinc-900/30 p-6 sm:p-8 flex flex-col items-center justify-center text-center overflow-hidden shadow-inner">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-indigo-600/5 opacity-50" />
            <div className="relative z-10 mb-6 sm:mb-8 p-4 sm:p-6 rounded-2xl bg-black/40 border border-white/5 shadow-2xl">{prize.icon}</div>
            <span className="relative z-10 text-[10px] sm:text-xs text-blue-400 font-bold uppercase tracking-[0.3em] mb-2 sm:mb-4">{prize.rank}</span>
            <h3 className="relative z-10 text-4xl sm:text-5xl font-black text-white tracking-tighter uppercase">{prize.amount}</h3>
            <div className="absolute bottom-6 sm:bottom-8 left-0 right-0 flex justify-center items-center gap-2 opacity-30 group-hover:opacity-100 transition-opacity text-[8px] sm:text-[10px] uppercase tracking-widest text-white">
              Metadata <MoveRight size={12} className="text-blue-400" />
            </div>
          </div>
          {/* Back */}
          <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-2xl sm:rounded-[2.5rem] border border-blue-500/20 bg-zinc-950 p-6 sm:p-10 flex flex-col shadow-2xl">
            <div className="flex items-center gap-3 mb-6 sm:mb-8 pb-3 border-b border-white/10">
              <Terminal size={14} className="text-blue-500" />
              <span className="text-[9px] text-white/50 uppercase tracking-widest font-black">LOG_PRIZE_V4.0</span>
            </div>
            <div className="space-y-4 flex-grow overflow-y-auto no-scrollbar">
              {prize.perks.map((perk, i) => (
                <div key={i} className="flex items-start gap-3 text-[10px] sm:text-xs group/item">
                  <div className="mt-1.5 h-1 w-1 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6]" />
                  <span className="text-zinc-400 group-hover/item:text-white transition-colors uppercase leading-relaxed">{perk}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </SmoothReveal>
  )
})

// --- Main App ---

const App = () => {
  const containerRef = useRef(null)
  const [activeSection, setActiveSection] = useState('home')
  const [hoveredNavItem, setHoveredNavItem] = useState(null)
  const [domain, setDomain] = useState('NEXUS UX')
  const [teamSize, setTeamSize] = useState('02 UNITS')
  const [isScrolling, setIsScrolling] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] })

  const scrollTo = useCallback((id) => {
    const element = document.getElementById(id)
    if (element) {
      setActiveSection(id)
      setIsScrolling(true)
      setIsMobileMenuOpen(false)
      const offset = window.innerWidth < 768 ? 80 : 100
      const targetY = element.getBoundingClientRect().top + window.pageYOffset - offset;
      
      animate(window.scrollY, targetY, {
        type: "spring",
        stiffness: 100,
        damping: 30,
        onUpdate: (v) => window.scrollTo(0, v),
        onComplete: () => setIsScrolling(false)
      });
    }
  }, [])

  const navItems = ['home', 'events', 'timeline', 'prizes', 'register', 'rules', 'coordinators']

  useEffect(() => {
    const handleScroll = () => {
      if (isScrolling) return; 
      const sections = navItems.map(id => document.getElementById(id))
      const current = sections.find(section => {
        if (!section) return false
        const rect = section.getBoundingClientRect()
        return rect.top >= -250 && rect.top <= 250
      })
      if (current && current.id !== activeSection) {
        setActiveSection(current.id)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [navItems, isScrolling, activeSection])

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#000000] text-zinc-300 selection:bg-blue-600/30 overflow-x-hidden font-display">
      <Noise />
      <SingularityCore scrollYProgress={scrollYProgress} />
      <StarField />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[110] p-4 sm:p-6 lg:p-8 flex justify-center pointer-events-auto">
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="relative hidden md:flex items-center gap-1 p-1 bg-black/40 border border-white/5 backdrop-blur-md rounded-full shadow-2xl"
        >
          {navItems.map((id) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              onMouseEnter={() => setHoveredNavItem(id)}
              onMouseLeave={() => setHoveredNavItem(null)}
              className={`relative px-5 py-2.5 rounded-full text-[11px] font-display font-black uppercase tracking-[0.1em] transition-colors duration-200 z-10 ${
                activeSection === id ? 'text-white' : 'text-zinc-500 hover:text-zinc-200'
              }`}
            >
              {activeSection === id && (
                <motion.div
                  layoutId="active-pill"
                  transition={{ type: 'spring', bounce: 0.1, duration: 0.5 }}
                  className="absolute inset-0 rounded-full bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.4)] -z-10"
                />
              )}
              <AnimatePresence>
                {hoveredNavItem === id && activeSection !== id && (
                  <motion.div
                    layoutId="ghost-hover-pill"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    className="absolute inset-0 rounded-full bg-white/5 -z-20"
                  />
                )}
              </AnimatePresence>
              <span className="relative">{id === 'home' ? 'Home' : id.charAt(0).toUpperCase() + id.slice(1)}</span>
            </button>
          ))}
        </motion.div>

        {/* Mobile Nav Toggle */}
        <div className="md:hidden flex items-center justify-between w-full max-w-sm px-6 py-4 bg-black/70 border border-white/10 rounded-full backdrop-blur-xl shadow-3xl">
          <span className="text-[10px] font-black tracking-[0.4em] text-blue-500 uppercase font-display">Paradox '26</span>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-1 text-white active:scale-90 transition-transform">
            {isMobileMenuOpen ? <XIcon size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="md:hidden absolute top-20 left-4 right-4 bg-black border border-white/10 rounded-3xl backdrop-blur-3xl p-4 shadow-3xl z-[120]"
            >
              <div className="flex flex-col gap-2">
                {navItems.map((id) => (
                  <button 
                    key={id} 
                    onClick={() => scrollTo(id)}
                    className={`text-left px-5 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors ${activeSection === id ? 'bg-blue-600 text-white' : 'text-zinc-500 hover:bg-white/5'}`}
                  >
                    {id === 'home' ? 'Home' : id.charAt(0).toUpperCase() + id.slice(1)}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="relative z-10 w-full overflow-hidden">
        {/* HERO */}
        <section id="home" className="min-h-[100dvh] flex flex-col items-center justify-center px-4 sm:px-6 text-center pt-24 pb-20 sm:pb-32">
          <SmoothReveal className="flex flex-col items-center w-full">
            <div className="flex items-center justify-center gap-4 mb-8 sm:mb-12">
              <span className="text-blue-500 font-display tracking-[0.6em] sm:tracking-[1em] text-[10px] sm:text-base font-black uppercase leading-none">SIESGST ACM CHAPTER</span>
            </div>
            <div className="relative px-2 sm:px-12 group w-full font-hero overflow-visible">
              <h1 className="fluid-hero-text font-black text-white tracking-tighter leading-none uppercase mb-8 sm:mb-12 drop-shadow-[0_0_40px_rgba(59,130,246,0.15)] flex items-center justify-center">
                PARA<span className="text-transparent bg-clip-text bg-gradient-to-b from-blue-300 via-blue-500 to-blue-800 animate-pulse-slow ml-1">DOX</span>
              </h1>
            </div>
            <div className="max-w-4xl mx-auto mb-12 sm:mb-16 w-full">
              <CountdownTimer targetDate="2026-03-25T09:00:00" />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollTo('events')}
              className="px-8 sm:px-12 py-5 sm:py-6 bg-blue-600 text-white font-hero font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] rounded-xl sm:rounded-2xl shadow-3xl group flex items-center gap-4 text-[10px] sm:text-sm"
            >
              Event Horizon <Rocket size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500" />
            </motion.button>
          </SmoothReveal>
        </section>

        {/* EVENTS */}
        <section id="events" className="max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-40">
          <SectionHeading subtitle="Neural_Layers">EVENTS DESCRIPTION</SectionHeading>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
            {EVENTS.map((event, i) => (
              <SmoothReveal key={i} delay={i * 0.1}>
                <div className="p-8 sm:p-10 rounded-[2.5rem] bg-zinc-900/10 border border-white/5 hover:border-blue-500/20 transition-all duration-700 group h-full shadow-2xl backdrop-blur-sm">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-500 mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-inner">{event.icon}</div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tighter mb-4">{event.title}</h3>
                  <p className="text-zinc-500 text-sm sm:text-base leading-relaxed uppercase tracking-wider font-medium">{event.desc}</p>
                </div>
              </SmoothReveal>
            ))}
          </div>
        </section>

        {/* TIMELINE */}
        <section id="timeline" className="max-w-5xl mx-auto px-4 sm:px-6 py-20 sm:py-40">
          <SectionHeading subtitle="Chronological_Log">TIMELINE PAGE</SectionHeading>
          <div className="space-y-12 sm:space-y-16 relative">
            <div className="absolute left-7 sm:left-10 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-500/10 to-transparent" />
            {TIMELINE.map((item, i) => (
              <SmoothReveal key={i} delay={i * 0.1}>
                <div className="flex flex-col sm:flex-row gap-6 sm:gap-14 group">
                  <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl bg-black border border-white/10 flex items-center justify-center text-blue-500 group-hover:border-blue-500/50 transition-colors duration-500 shrink-0 shadow-2xl relative z-10">
                    <Clock size={20} />
                  </div>
                  <div className="pt-0 sm:pt-4 pb-10 border-b border-white/5 flex-grow">
                    <span className="text-blue-500 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.4em] mb-2 block opacity-60">{item.time}</span>
                    <h4 className="text-xl sm:text-4xl font-black text-white uppercase tracking-tighter group-hover:text-blue-400 transition-colors duration-500 mb-2">{item.title}</h4>
                    <p className="text-zinc-500 text-sm sm:text-lg font-medium leading-relaxed uppercase tracking-wider">{item.description}</p>
                  </div>
                </div>
              </SmoothReveal>
            ))}
          </div>
        </section>

        {/* PRIZE POOL */}
        <section id="prizes" className="max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-40">
          <SectionHeading subtitle="Asset_Registry">PRIZE POOL</SectionHeading>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
            {PRIZES.map((prize, i) => (
              <PrizeCard key={i} prize={prize} index={i} />
            ))}
          </div>
        </section>

        {/* REGISTRATION */}
        <section id="register" className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-40">
          <SectionHeading subtitle="Secure_Manifest">REGISTRATION PROCESS</SectionHeading>
          <SmoothReveal>
            <div className="p-6 sm:p-12 lg:p-20 rounded-3xl sm:rounded-[3.5rem] bg-zinc-950/80 border border-white/5 shadow-3xl backdrop-blur-3xl relative overflow-hidden">
                <form className="space-y-8 sm:space-y-16 relative z-10" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-10">
                      <div className="space-y-6 sm:space-y-10">
                          <div className="flex items-center gap-4 border-l-2 border-blue-500 pl-4 mb-6 sm:mb-10">
                              <h5 className="text-[9px] sm:text-[11px] font-black text-white/80 uppercase tracking-[0.4em]">UNIT_IDENTIFICATION</h5>
                          </div>
                          <ManifestInput icon={Users} label="Team Name" placeholder="VOID_WALKERS" />
                          <ManifestInput icon={User} label="Leader Name" placeholder="FULL NAME" />
                          <ManifestDropdown icon={UserPlus} label="Team Size" value={teamSize} options={['02 UNITS', '03 UNITS', '04 UNITS']} onChange={setTeamSize} />
                      </div>
                      <div className="space-y-6 sm:space-y-10">
                          <div className="flex items-center gap-4 border-l-2 border-blue-500 pl-4 mb-6 sm:mb-10">
                              <h5 className="text-[9px] sm:text-[11px] font-black text-white/80 uppercase tracking-[0.4em]">CONTACT_UPLINK</h5>
                          </div>
                          <ManifestInput icon={Building2} label="Institution" placeholder="COLLEGE / UNIVERSITY" />
                          <ManifestInput icon={Mail} label="Email ID" placeholder="USER@DOMAIN.COM" type="email" />
                          <ManifestInput icon={Phone} label="Contact No" placeholder="+91 XXXXX XXXXX" type="tel" />
                      </div>
                    </div>
                    <div className="pt-4 font-display">
                      <ManifestDropdown icon={Terminal} label="Strategic Domain Preference" value={domain} options={['QUANTUM CODE', 'NEXUS UX', 'GRAVITY HACK']} onChange={setDomain} />
                    </div>
                    <div className="pt-6 font-mono">
                        <motion.button 
                          whileHover={{ scale: 1.02 }} 
                          whileTap={{ scale: 0.98 }} 
                          className="group w-full py-6 sm:py-8 lg:py-10 bg-blue-600 text-white font-hero font-black uppercase tracking-[0.2em] sm:tracking-[0.6em] rounded-2xl sm:rounded-[2rem] shadow-2xl transition-all duration-300 text-[10px] sm:text-xs md:text-sm flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 px-4"
                        >
                            <Fingerprint size={22} className="group-hover:rotate-12 transition-transform" />
                            <span className="text-center">CONFIRM_REGISTRATION_SEQUENCE</span>
                        </motion.button>
                    </div>
                </form>
            </div>
          </SmoothReveal>
        </section>

        {/* RULES */}
        <section id="rules" className="max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-40">
          <SectionHeading subtitle="Operation_Protocols">RULES</SectionHeading>
          <div className="space-y-8 sm:space-y-16">
            {RULES_LIST.map((rule, i) => (
              <SmoothReveal key={rule.id} delay={i * 0.1}>
                <div className="group flex items-start gap-6 sm:gap-12">
                  <span className="font-mono text-blue-500 text-sm sm:text-lg font-bold opacity-30 group-hover:opacity-100 transition-opacity">[{rule.id}]</span>
                  <p className="text-zinc-400 text-base sm:text-2xl font-medium leading-relaxed group-hover:text-white transition-colors uppercase tracking-widest leading-loose">{rule.text}</p>
                </div>
              </SmoothReveal>
            ))}
          </div>
        </section>

        {/* COORDINATORS */}
        <section id="coordinators" className="max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-40">
            <SectionHeading subtitle="Command_Center">COORDINATORS</SectionHeading>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
              {COORDINATORS.map((person, i) => (
                <SmoothReveal key={i} delay={i * 0.1}>
                  <motion.div whileHover={{ y: -8 }} className="flex items-center gap-5 sm:gap-8 p-6 sm:p-10 rounded-[2.5rem] border border-white/5 bg-zinc-900/10 group transition-all duration-500 backdrop-blur-sm shadow-2xl">
                    <div className="relative shrink-0">
                      <img src={person.image} alt={person.name} className="w-16 h-16 sm:w-24 sm:h-24 rounded-2xl object-cover grayscale group-hover:grayscale-0 transition-all duration-700 border border-white/10" />
                    </div>
                    <div className="flex-grow min-w-0">
                      <h4 className="text-lg sm:text-xl font-black text-white uppercase tracking-tight mb-1 truncate">{person.name}</h4>
                      <p className="text-[9px] text-blue-500 font-bold uppercase tracking-widest mb-3 font-mono truncate">{person.role}</p>
                      <a href={person.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex p-2 rounded-lg bg-blue-600/10 text-blue-500 hover:bg-blue-600 hover:text-white transition-all shadow-xl">
                        <Linkedin size={14} />
                      </a>
                    </div>
                  </motion.div>
                </SmoothReveal>
              ))}
            </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="py-20 sm:py-40 text-center border-t border-white/5 bg-zinc-950/50 relative z-10 font-display">
        <SmoothReveal>
          <h2 className="font-black tracking-[1em] sm:tracking-[1.5em] text-xl sm:text-4xl text-white uppercase mb-10 opacity-20 font-hero">PARADOX</h2>
          <div className="flex justify-center items-center gap-8 sm:gap-12 mb-12">
            {[Instagram, Linkedin, XIcon].map((Icon, i) => (
              <a key={i} href="#" className="text-zinc-600 hover:text-blue-500 transition-all hover:scale-125">
                <Icon size={24} />
              </a>
            ))}
          </div>
          <p className="text-zinc-800 font-mono text-[8px] sm:text-[10px] uppercase font-bold tracking-[0.4em] sm:tracking-[0.8em] opacity-60 px-6 leading-relaxed">
            SIESGST ACM // HACK_2026 // SYSTEM_SYNC_ESTABLISHED
          </p>
        </SmoothReveal>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Julius+Sans+One&family=JetBrains+Mono:wght@400;700&family=Kumbh+Sans:wght@300;400;600;700;800;900&family=Josefin+Sans:wght@300;400;600;700;800;900&display=swap');
        
        :root { 
          --font-display: 'Julius Sans One', sans-serif; 
          --font-hero: 'Josefin Sans', sans-serif;
          --font-mono: 'JetBrains Mono', monospace; 
          --font-prize: 'Kumbh Sans', sans-serif; 
        }

        body { font-family: var(--font-display); background-color: black; color: white; overflow-x: hidden; -webkit-font-smoothing: antialiased; scroll-behavior: smooth; }
        .font-mono { font-family: var(--font-mono); }
        .font-display { font-family: var(--font-display); }
        .font-hero { font-family: var(--font-hero); }
        .font-prize { font-family: var(--font-prize); }
        .animate-pulse-slow { animation: pulse 8s infinite ease-in-out; }
        @keyframes pulse { 0%, 100% { opacity: 0.7; } 50% { opacity: 1; } }
        @keyframes star-pulse { 0%, 100% { opacity: 0.05; } 50% { opacity: 0.4; } }
        .animate-star-pulse { animation: star-pulse infinite ease-in-out; }
        @keyframes spin-slow-3d { 0% { transform: rotateX(45deg) rotateY(0deg) rotateZ(0deg); } 100% { transform: rotateX(45deg) rotateY(360deg) rotateZ(360deg); } }
        .animate-spin-slow-3d { animation: spin-slow-3d 60s linear infinite; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #000; }
        ::-webkit-scrollbar-thumb { background: #1e3a8a; border-radius: 10px; }
        .grain-texture { background-image: url('https://grainy-gradients.vercel.app/noise.svg'); filter: contrast(180%) brightness(130%); pointer-events: none; }
        .fluid-hero-text { font-size: clamp(3rem, 18vw, 14rem); }
        .transform-gpu { transform: translateZ(0); }
        .backdrop-blur-xl { backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        /* Mobile Touch Optimizations */
        button, a { touch-action: manipulation; }
      `}</style>
    </div>
  )
}

export default App;