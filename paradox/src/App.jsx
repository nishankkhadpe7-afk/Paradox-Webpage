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
    name: 'Rog',
    role: 'EVENT COMMANDER',
    linkedin: 'https://linkedin.com',
    image: 'https://tse1.mm.bing.net/th/id/OIP.DAkYlN_P3OHqm5OuYwyM4gHaJQ?pid=Api&P=0&h=180'
  },
  {
    name: 'Mog',
    role: 'TECHNICAL ARCHITECT',
    linkedin: 'https://linkedin.com',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&h=256&auto=format&fit=crop'
  },
  {
    name: 'Fog',
    role: 'UPLINK SPECIALIST',
    linkedin: 'https://linkedin.com',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&h=256&auto=format&fit=crop'
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

// --- Performance Engineered Background Components ---

const Noise = memo(() => (
  <div className="fixed inset-0 z-[100] pointer-events-none opacity-[0.012] grain-texture will-change-transform transform-gpu" />
))

const SingularityCore = memo(({ scrollYProgress }) => {
  // Balanced spring mass for liquid-smooth transitions
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 18, damping: 42, mass: 1.6 })
  
  // Safe bounds scaling to prevent mobile GPU culling (stays under 2048px)
  const scale = useTransform(smoothProgress, [0, 0.45, 1], [0.4, 0.8, 3.8])
  const rotateSlow = useTransform(smoothProgress, [0, 1], [0, -40])
  const gridOpacity = useTransform(smoothProgress, [0, 0.3, 0.8], [0.03, 0.1, 0.02])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#010101] [perspective:1200px] transform-gpu">
      {/* Compositied Grid */}
      <motion.div 
        style={{ opacity: gridOpacity }}
        className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:50px_50px] sm:bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_15%,transparent_100%)] transform-gpu z-0"
      />

      {/* Depth Glow - Optimized Radial Gradient */}
      <motion.div 
        style={{ scale: useTransform(smoothProgress, [0, 1], [1, 2.2]) }}
        className="absolute inset-0 flex items-center justify-center opacity-30 transform-gpu z-1"
      >
        <div className="w-[85vw] h-[85vw] max-w-[1100px] max-h-[1100px] rounded-full bg-[radial-gradient(circle,rgba(30,58,138,0.2)_0%,transparent_70%)]" />
      </motion.div>

      <motion.div 
        style={{ scale, rotateZ: rotateSlow }} 
        className="absolute inset-0 flex items-center justify-center will-change-transform origin-center transform-gpu z-10"
      >
        <div className="relative flex items-center justify-center">
            {/* Impactful Technical Ring */}
            <div className="absolute rounded-full border-[1.2px] border-blue-500/40 w-[450px] h-[450px] sm:w-[500px] sm:h-[500px] animate-spin-slow-3d shadow-[0_0_15px_rgba(59,130,246,0.05)] [backface-visibility:hidden]">
               <div className="absolute inset-4 rounded-full border-[0.5px] border-blue-400/5" />
            </div>
            
            {/* The Void Core */}
            <div className="w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] rounded-full bg-black z-50 relative overflow-hidden shadow-[0_0_150px_rgba(0,0,0,1)] border border-white/10 [backface-visibility:hidden]">
                <div className="absolute inset-0 rounded-full border-[0.5px] border-blue-500/20" />
                <div className="absolute inset-0 rounded-full shadow-[inset_0_0_60px_rgba(59,130,246,0.3)] animate-pulse-slow" />
            </div>
        </div>
      </motion.div>
    </div>
  )
})

const StarField = memo(() => {
  const stars = useMemo(() => [...Array(10)].map((_, i) => ({
    id: i,
    size: Math.random() * 1.5 + 0.5,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    duration: 5 + Math.random() * 5
  })), [])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20 transform-gpu">
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

// --- Registration Components ---

const ManifestInput = ({ icon: Icon, label, placeholder, type = "text" }) => (
  <div className="space-y-3 sm:space-y-4 group/field font-display">
    <div className="flex items-center gap-3 px-1 sm:px-2 opacity-70 group-focus-within/field:opacity-100 transition-opacity duration-300">
      <Icon size={14} className="text-blue-400" />
      <label className="text-[9px] sm:text-[11px] font-black text-blue-400 uppercase tracking-[0.3em]">{label}</label>
    </div>
    <input 
      type={type}
      className="w-full bg-black/40 border border-white/10 rounded-xl sm:rounded-[1.2rem] px-4 sm:px-6 py-3 sm:py-4 text-white focus:border-blue-500/50 outline-none transition-all text-xs sm:text-sm tracking-widest placeholder:text-zinc-800 uppercase shadow-inner font-mono" 
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
    <div className="space-y-3 sm:space-y-4 group/field font-display" ref={containerRef}>
      <div className={`flex items-center gap-3 px-1 sm:px-2 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-70'}`}>
        <Icon size={14} className="text-blue-400" />
        <label className="text-[9px] sm:text-[11px] font-black text-blue-400 uppercase tracking-[0.25em]">{label}</label>
      </div>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full bg-black/50 border transition-all rounded-xl sm:rounded-[1.2rem] px-4 sm:px-6 py-3 sm:py-4 text-white text-xs sm:text-sm tracking-[0.2em] flex items-center justify-between uppercase ${isOpen ? 'border-blue-500 ring-1 ring-blue-500/20' : 'border-white/10 shadow-inner'}`}
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
              className="absolute z-[100] w-full bg-[#0d0d0d] border border-white/10 rounded-xl sm:rounded-[1.2rem] shadow-2xl backdrop-blur-md overflow-hidden"
            >
              <div className="p-1 sm:p-2 space-y-1">
                {options.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => { onChange(opt); setIsOpen(false); }}
                    className={`w-full text-left px-4 sm:px-5 py-2 sm:py-3 rounded-lg sm:rounded-[0.8rem] text-[10px] sm:text-xs tracking-widest transition-all uppercase ${value === opt ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]' : 'text-zinc-400 hover:bg-white/5 hover:text-white'}`}
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

// --- UI Components ---

const SmoothReveal = memo(({ children, delay = 0, className = '' }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })
  
  // SANITIZATION: Ensure delay is strictly a finite numeric value
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

  return (
    <div className="relative py-8 sm:py-12 px-4 sm:px-6 rounded-[1.5rem] sm:rounded-[2rem] bg-zinc-900/10 border border-white/5 backdrop-blur-md overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-10 group-hover:opacity-20 transition-opacity duration-700" />
      <div className="relative flex items-center justify-center flex-wrap gap-y-4 sm:gap-y-6 font-hero tracking-widest">
        {[
          { v: timeLeft.days, l: "Days" },
          { v: timeLeft.hours, l: "Hours" },
          { v: timeLeft.minutes, l: "Mins" },
          { v: timeLeft.seconds, l: "Secs" }
        ].map((item, idx) => (
          <div key={idx} className="flex flex-col items-center mx-2 sm:mx-8 uppercase">
            <div className="text-3xl sm:text-7xl md:text-8xl font-black text-white tracking-tighter">
              {item.v.toString().padStart(2, '0')}
            </div>
            <span className="text-[7px] sm:text-[9px] text-blue-500 tracking-[0.3em] sm:tracking-[0.4em] mt-1 sm:mt-2 opacity-60 font-normal font-display uppercase">{item.l}</span>
          </div>
        ))}
      </div>
    </div>
  )
})

const SectionHeading = memo(({ children, subtitle }) => (
  <div className="mb-12 sm:mb-24 text-center px-4 overflow-visible font-display">
    <SmoothReveal className="overflow-visible">
      <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3 sm:mb-4 opacity-50">
        <div className="h-px w-6 sm:w-10 bg-blue-500" />
        <span className="text-blue-500 tracking-[0.4em] sm:tracking-[0.6em] text-[8px] sm:text-[10px] uppercase font-bold">{subtitle}</span>
        <div className="h-px w-6 sm:w-10 bg-blue-500" />
      </div>
      <h2 className="text-3xl sm:text-7xl md:text-8xl font-black tracking-tight text-white uppercase leading-tight sm:leading-none px-4 overflow-visible">
        {children}
      </h2>
    </SmoothReveal>
  </div>
))

const PrizeCard = memo(({ prize, index }) => {
  const [isFlipped, setIsFlipped] = useState(false)
  
  return (
    <SmoothReveal delay={index * 0.1} className="w-full h-[400px] sm:h-[450px] font-display">
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
          <div className={`absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-2xl sm:rounded-[2.5rem] border border-white/10 bg-zinc-900/30 p-6 sm:p-8 flex flex-col items-center justify-center text-center overflow-hidden shadow-inner`}>
            <div className={`absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-indigo-600/5 opacity-50`} />
            <div className="relative z-10 mb-4 sm:mb-8 p-4 sm:p-6 rounded-2xl bg-black/40 border border-white/5 shadow-2xl">{prize.icon}</div>
            <span className="relative z-10 text-[10px] sm:text-xs text-blue-400 font-bold uppercase tracking-[0.3em] mb-2 sm:mb-4">{prize.rank}</span>
            <h3 className="relative z-10 text-4xl sm:text-5xl font-black text-white tracking-tighter uppercase">{prize.amount}</h3>
            <div className="absolute bottom-6 sm:bottom-8 left-0 right-0 flex justify-center items-center gap-2 opacity-30 group-hover:opacity-100 transition-opacity text-[8px] sm:text-[10px] uppercase tracking-widest text-white">
              Access Metadata <MoveRight size={12} className="text-blue-400" />
            </div>
          </div>
          <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-2xl sm:rounded-[2.5rem] border border-blue-500/20 bg-zinc-950 p-6 sm:p-10 flex flex-col shadow-2xl">
            <div className="flex items-center gap-3 mb-4 sm:mb-8 pb-3 sm:pb-4 border-b border-white/10">
              <Terminal size={16} className="text-blue-500" />
              <span className="text-[9px] sm:text-[10px] text-white/50 uppercase tracking-widest font-black">LOG_PRIZE_V4.0</span>
            </div>
            <div className="space-y-3 sm:space-y-4 flex-grow overflow-y-auto no-scrollbar">
              {prize.perks.map((perk, i) => (
                <div key={i} className="flex items-start gap-3 sm:gap-4 text-[10px] sm:text-xs group/item">
                  <div className="mt-1.5 h-1 w-1 sm:h-1.5 sm:w-1.5 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6]" />
                  <span className="text-zinc-400 group-hover/item:text-white transition-colors tracking-tight font-medium uppercase leading-relaxed">{perk}</span>
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

  // Interruptible snapy navigation
  const scrollTo = useCallback((id) => {
    const element = document.getElementById(id)
    if (element) {
      setActiveSection(id)
      setIsScrolling(true)
      setIsMobileMenuOpen(false)
      const offset = window.innerWidth < 768 ? 60 : 100
      const targetY = element.getBoundingClientRect().top + window.pageYOffset - offset;
      
      animate(window.scrollY, targetY, {
        type: "spring",
        stiffness: 110,
        damping: 30,
        onUpdate: (v) => window.scrollTo(0, v),
        onComplete: () => {
          setIsScrolling(false)
        }
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
        const threshold = window.innerWidth < 768 ? 200 : 400
        return rect.top >= -threshold && rect.top <= threshold
      })
      if (current && current.id !== activeSection) {
        setActiveSection(current.id)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [navItems, isScrolling, activeSection])

  const socialLinks = useMemo(() => [
    { Icon: Instagram, href: "#", label: "Instagram" },
    { Icon: Linkedin, href: "#", label: "LinkedIn" },
    { Icon: XIcon, href: "#", label: "X" }
  ], []);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#000000] text-zinc-300 selection:bg-blue-600/30 overflow-x-hidden font-display">
      <Noise />
      <SingularityCore scrollYProgress={scrollYProgress} />
      <StarField />

      {/* NAVIGATION */}
      <nav className="fixed top-0 left-0 right-0 z-[110] p-4 sm:p-6 lg:p-8 flex justify-center pointer-events-auto">
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="relative hidden md:flex items-center gap-1.5 p-1.5 bg-black/40 border border-white/5 backdrop-blur-md rounded-full shadow-2xl"
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
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    className="absolute inset-0 rounded-full bg-white/10 -z-20"
                  />
                )}
              </AnimatePresence>
              <span className="relative">{id === 'home' ? 'Home' : id.charAt(0).toUpperCase() + id.slice(1)}</span>
            </button>
          ))}
        </motion.div>

        <div className="md:hidden flex items-center justify-between w-full max-w-sm px-5 py-3.5 bg-black/70 border border-white/10 rounded-full backdrop-blur-xl shadow-3xl">
          <span className="text-[10px] font-black tracking-[0.4em] text-blue-500 uppercase ml-2 font-display">Paradox '26</span>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-1 text-white">
            {isMobileMenuOpen ? <XIcon size={22} /> : <Menu size={22} />}
          </button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="md:hidden absolute top-20 left-4 right-4 bg-black/95 border border-white/10 rounded-3xl backdrop-blur-3xl p-6 shadow-3xl z-[120]"
            >
              <div className="flex flex-col gap-3">
                {navItems.map((id) => (
                  <button 
                    key={id} 
                    onClick={() => scrollTo(id)}
                    className={`text-left px-5 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors ${activeSection === id ? 'bg-blue-600 text-white' : 'text-zinc-500 hover:text-zinc-200'}`}
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
        <section id="home" className="min-h-[100dvh] flex flex-col items-center justify-center px-4 sm:px-6 text-center pt-24 sm:pt-32 pb-24 sm:pb-40">
          <SmoothReveal className="flex flex-col items-center w-full">
            <div className="flex items-center justify-center gap-4 mb-10 sm:mb-14">
              <span className="text-blue-500 font-display tracking-[0.8em] sm:tracking-[1.2em] text-xs sm:text-base font-black uppercase leading-none">SIESGST ACM CHAPTER</span>
            </div>
            <div className="relative overflow-visible px-2 sm:px-12 py-4 sm:py-6 group w-full max-w-full font-hero">
              <h1 className="fluid-hero-text font-black text-white tracking-tighter leading-none uppercase mb-6 sm:mb-10 drop-shadow-[0_0_40px_rgba(59,130,246,0.15)] whitespace-nowrap overflow-visible flex items-center justify-center">
                PARA<span className="text-transparent bg-clip-text bg-gradient-to-b from-blue-300 via-blue-500 to-blue-800 animate-pulse-slow pr-[0.05em] ml-[-0.01em]">DOX</span>
              </h1>
            </div>
            <div className="max-w-4xl mx-auto mb-14 sm:mb-20 w-full px-2 sm:px-0">
              <CountdownTimer targetDate="2026-03-25T09:00:00" />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollTo('events')}
              className="px-10 sm:px-14 py-5 sm:py-7 bg-blue-600 text-white font-hero font-black uppercase tracking-[0.4em] rounded-xl sm:rounded-2xl shadow-3xl group mx-auto flex items-center gap-4 text-[10px] sm:text-sm"
            >
              Access Event Horizon <Rocket size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500" />
            </motion.button>
          </SmoothReveal>
        </section>

        {/* EVENTS */}
        <section id="events" className="max-w-7xl mx-auto px-4 sm:px-6 py-24 sm:py-48 [content-visibility:auto]">
          <SectionHeading subtitle="Neural_Layers">EVENTS DESCRIPTION</SectionHeading>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
            {EVENTS.map((event, i) => (
              <SmoothReveal key={i} delay={i * 0.1}>
                <div className="p-8 sm:p-12 rounded-3xl sm:rounded-[3rem] bg-zinc-900/10 border border-white/5 hover:border-blue-500/20 transition-all duration-700 group h-full shadow-2xl backdrop-blur-sm">
                  <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl bg-blue-600/10 flex items-center justify-center text-blue-500 mb-8 sm:mb-12 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-inner">{event.icon}</div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tighter mb-4 sm:mb-8 leading-tight">{event.title}</h3>
                  <p className="text-zinc-500 text-sm sm:text-base leading-relaxed mb-6 sm:mb-10 font-medium uppercase tracking-widest">{event.desc}</p>
                </div>
              </SmoothReveal>
            ))}
          </div>
        </section>

        {/* TIMELINE */}
        <section id="timeline" className="max-w-5xl mx-auto px-4 sm:px-6 py-24 sm:py-48 [content-visibility:auto]">
          <SectionHeading subtitle="Chronological_Log">TIMELINE PAGE</SectionHeading>
          <div className="space-y-16 sm:space-y-20 relative">
            <div className="absolute left-7 sm:left-10 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-500/10 to-transparent" />
            {TIMELINE.map((item, i) => (
              <SmoothReveal key={i} delay={i * 0.1}>
                <div className="flex flex-col sm:flex-row gap-8 sm:gap-14 group font-display">
                  <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl bg-black border border-white/10 flex items-center justify-center text-blue-500 group-hover:border-blue-500/50 transition-colors duration-500 shrink-0 shadow-2xl relative z-10">
                    <Clock size={24} />
                  </div>
                  <div className="pt-0 sm:pt-4 pb-10 sm:pb-14 border-b border-white/5 flex-grow">
                    <span className="text-blue-500 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.6em] mb-3 sm:mb-6 block opacity-50">{item.time}</span>
                    <h4 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tighter group-hover:text-blue-400 transition-colors duration-500 mb-2 sm:mb-4">{item.title}</h4>
                    <p className="text-zinc-500 text-base sm:text-lg max-w-2xl font-medium leading-relaxed uppercase tracking-wider">{item.description}</p>
                  </div>
                </div>
              </SmoothReveal>
            ))}
          </div>
        </section>

        {/* PRIZE POOL */}
        <section id="prizes" className="max-w-7xl mx-auto px-4 sm:px-6 py-24 sm:py-48 [content-visibility:auto]">
          <SectionHeading subtitle="Asset_Registry">PRIZE POOL</SectionHeading>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
            {PRIZES.map((prize, i) => (
              <PrizeCard key={i} prize={prize} index={i} />
            ))}
          </div>
        </section>

        {/* REGISTRATION */}
        <section id="register" className="max-w-6xl mx-auto px-4 sm:px-6 py-24 sm:py-48 [content-visibility:auto]">
          <SectionHeading subtitle="Secure_Manifest">REGISTRATION PROCESS</SectionHeading>
          <SmoothReveal>
            <div className="p-8 sm:p-20 rounded-3xl sm:rounded-[3.5rem] bg-zinc-950/80 border border-white/5 shadow-3xl backdrop-blur-3xl relative overflow-hidden">
                <form className="space-y-12 sm:space-y-16 relative z-10" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 sm:gap-x-20 gap-y-12">
                      <div className="space-y-8 sm:space-y-12">
                          <div className="flex items-center gap-4 border-l-2 border-blue-500 pl-5 mb-8 sm:mb-12">
                              <h5 className="text-[10px] sm:text-[11px] font-black text-white/80 uppercase tracking-[0.5em]">UNIT_IDENTIFICATION</h5>
                          </div>
                          <ManifestInput icon={Users} label="Team Name" placeholder="VOID_WALKERS" />
                          <ManifestInput icon={User} label="Leader Name" placeholder="FULL NAME" />
                          <ManifestDropdown icon={UserPlus} label="Team Size" value={teamSize} options={['02 UNITS', '03 UNITS', '04 UNITS']} onChange={setTeamSize} />
                      </div>
                      <div className="space-y-8 sm:space-y-12">
                          <div className="flex items-center gap-4 border-l-2 border-blue-500 pl-5 mb-8 sm:mb-12">
                              <h5 className="text-[10px] sm:text-[11px] font-black text-white/80 uppercase tracking-[0.5em]">CONTACT_UPLINK</h5>
                          </div>
                          <ManifestInput icon={Building2} label="Institution" placeholder="COLLEGE / UNIVERSITY" />
                          <ManifestInput icon={Mail} label="Email ID" placeholder="USER@DOMAIN.COM" type="email" />
                          <ManifestInput icon={Phone} label="Contact No" placeholder="+91 XXXXX XXXXX" type="tel" />
                      </div>
                    </div>
                    <div className="space-y-6 pt-6 sm:pt-8 font-display"><ManifestDropdown icon={Terminal} label="Strategic Domain Preference" value={domain} options={['QUANTUM CODE', 'NEXUS UX', 'GRAVITY HACK']} onChange={setDomain} /></div>
                    <div className="pt-8 sm:pt-10 font-mono text-center">
                        <motion.button whileHover={{ scale: 1.01, backgroundColor: '#2563eb' }} whileTap={{ scale: 0.99 }} className="w-full py-8 sm:py-10 bg-blue-600 text-white font-hero font-black uppercase tracking-[0.6em] sm:tracking-[0.7em] rounded-2xl sm:rounded-[2rem] shadow-2xl transition-all duration-700 text-xs sm:text-sm flex items-center justify-center gap-5">
                            <Fingerprint size={24} /><span className="tracking-[0.6em]">CONFIRM_REGISTRATION</span>
                        </motion.button>
                    </div>
                </form>
            </div>
          </SmoothReveal>
        </section>

        {/* RULES */}
        <section id="rules" className="max-w-7xl mx-auto px-4 sm:px-6 py-24 sm:py-48 [content-visibility:auto]">
          <SectionHeading subtitle="Operation_Protocols">RULES</SectionHeading>
          <div className="space-y-10 sm:space-y-16">
            {RULES_LIST.map((rule, i) => (
              <SmoothReveal key={rule.id} delay={i * 0.1}>
                <div className="group flex items-start gap-8 sm:gap-12 font-display">
                  <span className="font-mono text-blue-500 text-base sm:text-lg font-bold opacity-30 group-hover:opacity-100 transition-opacity duration-500">[{rule.id}]</span>
                  <p className="text-zinc-400 text-base sm:text-2xl font-medium leading-relaxed group-hover:text-white transition-colors duration-500 uppercase tracking-widest leading-loose">{rule.text}</p>
                </div>
              </SmoothReveal>
            ))}
          </div>
        </section>

        {/* COORDINATORS */}
        <section id="coordinators" className="max-w-7xl mx-auto px-4 sm:px-6 py-24 sm:py-48 [content-visibility:auto]">
            <SectionHeading subtitle="Command_Center">COORDINATORS</SectionHeading>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 font-display">
              {COORDINATORS.map((person, i) => (
                <SmoothReveal key={i} delay={i * 0.1}>
                  <motion.div whileHover={{ y: -10 }} className="flex items-center gap-6 sm:gap-8 p-6 sm:p-10 rounded-3xl sm:rounded-[3.5rem] border border-white/5 bg-zinc-900/10 group transition-all duration-700 backdrop-blur-sm shadow-2xl">
                    <div className="relative shrink-0"><img src={person.image} alt={person.name} className="w-16 h-16 sm:w-28 sm:h-28 rounded-2xl sm:rounded-[2.5rem] object-cover grayscale group-hover:grayscale-0 transition-all duration-700 border border-white/10" /></div>
                    <div className="flex-grow min-w-0 text-left">
                      <h4 className="text-lg sm:text-xl font-black text-white uppercase tracking-tight mb-1 truncate">{person.name}</h4>
                      <p className="text-[9px] sm:text-[10px] text-blue-500 font-bold uppercase tracking-widest mb-3 font-mono font-normal truncate">{person.role}</p>
                      <a href={person.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex p-2 rounded-lg bg-blue-600/10 text-blue-500 hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-xl">
                        <Linkedin size={16} />
                      </a>
                    </div>
                  </motion.div>
                </SmoothReveal>
              ))}
            </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="py-24 sm:py-48 text-center border-t border-white/5 bg-zinc-950/50 relative z-10 font-display">
        <SmoothReveal>
          <h2 className="font-black tracking-[1.5em] text-2xl sm:text-4xl text-white uppercase mb-10 opacity-30 font-hero">PARADOX</h2>
          
          <div className="flex justify-center items-center gap-10 mb-14">
            {socialLinks.map(({ Icon, href, label }, i) => (
              <a key={i} href={href} aria-label={label} className="text-zinc-600 hover:text-blue-500 transition-all duration-500 hover:scale-125 drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                <Icon size={28} />
              </a>
            ))}
          </div>

          <p className="text-zinc-800 font-mono text-[9px] sm:text-[11px] uppercase font-bold tracking-[0.5em] sm:tracking-[0.8em] font-display font-normal opacity-50 px-4">SIESGST ACM // HACK_2026 // SYSTEM_SYNC</p>
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
        @keyframes pulse { 0%, 100% { opacity: 0.8; } 50% { opacity: 1; } }
        @keyframes star-pulse { 0%, 100% { opacity: 0.05; } 50% { opacity: 0.25; } }
        .animate-star-pulse { animation: star-pulse infinite ease-in-out; }
        @keyframes spin-slow-3d { 0% { transform: rotateX(45deg) rotateY(0deg) rotateZ(0deg); } 100% { transform: rotateX(45deg) rotateY(360deg) rotateZ(360deg); } }
        .animate-spin-slow-3d { animation: spin-slow-3d 40s linear infinite; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #000; }
        ::-webkit-scrollbar-thumb { background: #1e3a8a; border-radius: 10px; }
        .grain-texture { background-image: url('https://grainy-gradients.vercel.app/noise.svg'); filter: contrast(180%) brightness(120%); pointer-events: none; }
        h1, h2, h3, h4 { letter-spacing: -0.04em; overflow: visible !important; }
        section { contain: content; }
        .fluid-hero-text { font-size: clamp(2.5rem, 15vw, 12rem); }
        @media (max-width: 640px) { .fluid-hero-text { font-size: 14vw; } }
        .transform-gpu { transform: translateZ(0); }
        .backdrop-blur-md { backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); }
        .backdrop-blur-xl { backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); }
        .backdrop-blur-3xl { backdrop-filter: blur(32px); -webkit-backdrop-filter: blur(32px); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  )
}

export default App