import React, { useState, useEffect, useMemo, useRef, memo, useCallback } from 'react'
import {
  Trophy, Rocket, Zap, Globe, Shield, Cpu,
  Instagram, Linkedin, Clock, MoveRight,
  Menu, X as XIcon, ChevronDown, Fingerprint, Layers, Terminal, Mail, User, Users, Phone,
  Building2, UserPlus, Twitter, Info, MapPin, Calendar, CreditCard, ExternalLink, AlertTriangle,
  Lightbulb, Code, Target, MessageSquare, Monitor, FastForward, Award, CheckCircle2,
  Cpu as CpuIcon, Sparkles, Coins
} from 'lucide-react'
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useInView } from 'framer-motion'

// --- Data Constants ---
const EVENT_PHASES = {
  phase1: {
    id: 'PHASE_01',
    title: 'Digital Architecture',
    subtitle: 'ONLINE SCREENING',
    description: 'Units must submit a comprehensive Agentic AI proposal. We are looking for architects who can define clear autonomous logic and feasible innovation.',
    evaluation: ['Innovation', 'Technical Depth', 'Feasibility', 'Potential Impact'],
    steps: [
      { time: 'Entry', label: 'Proposal Upload', desc: 'Portal open for technical submissions.' },
      { time: 'Sync', label: 'Manifest Reveal', desc: 'Top 40 units cleared for onsite synchronization.' }
    ]
  },
  phase2: {
    id: 'PHASE_02',
    title: 'The Singularity Sprint',
    subtitle: 'ONSITE SYNCHRONIZATION',
    description: 'A 10-hour high-pressure sprint at SIESGST. Convert your architecture into a functional autonomous MVP to solve the revealed paradox.',
    features: ['10-Hour "Zero-Hour" Sprint', 'Direct Expert Debugging/Mentorship', 'High Council Demonstration'],
    schedule: [
      { time: '09:00 AM', label: 'Unit Arrival', desc: 'Hardware sync & verification.' },
      { time: '10:00 AM', label: 'Zero-Hour', desc: 'Challenge Unveiled. Coding starts.' },
      { time: '05:00 PM', label: 'Demo Sequence', desc: 'Final demonstration to judges.' }
    ]
  }
}

const JUDGING_CRITERIA = [
  { title: 'Innovation & Creativity', desc: 'Novelty of the concept and use of Agentic AI.' },
  { title: 'Technical Implementation', desc: 'Complexity, code quality, and logic of the solution.' },
  { title: 'Problem-Solving Approach', desc: 'Effectiveness of the solution to the problem statement.' },
  { title: 'Presentation & Demonstration', desc: 'Clarity of thought and professionalism in pitching.' }
]

const CODE_OF_CONDUCT = [
  'No pre-built projects allowed. All code must be written during the event.',
  'Plagiarism or misrepresentation leads to immediate disqualification.',
  'Unethical behavior or misconduct will not be tolerated.',
  'Any damage to venue property will lead to direct disqualification.',
  'GenAI tools and APIs are permitted for development support.'
]

const COORDINATORS = [
  {
    name: 'Coordinator One',
    role: 'EVENT COMMANDER',
    linkedin: '#',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'
  },
  {
    name: 'Coordinator Two',
    role: 'TECHNICAL ARCHITECT',
    linkedin: '#',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka'
  }
]

// --- UI Components ---

const ScatteredStars = memo(() => {
  const stars = useMemo(() => {
    return Array.from({ length: 150 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.7 + 0.3,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 5
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          initial={{ opacity: star.opacity }}
          animate={{ opacity: [star.opacity, 0.2, star.opacity] }}
          transition={{ duration: star.duration, repeat: Infinity, delay: star.delay, ease: "easeInOut" }}
          className="absolute bg-white rounded-full"
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
            boxShadow: `0 0 ${star.size * 2}px white`
          }}
        />
      ))}
    </div>
  );
});

const SingularityCore = memo(({ scrollYProgress }) => {
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 40, damping: 25, mass: 0.5 })
  const scale = useTransform(smoothProgress, [0, 0.45, 1], [0.8, 1.1, 2.2])
  const opacity = useTransform(smoothProgress, [0, 0.5, 1], [1, 0.7, 0.3])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden transform-gpu">
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#08081a_0%,#020205_100%)]" />
      <ScatteredStars />
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_50%_50%,rgba(26,18,5,0.4)_0%,transparent_70%)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250vw] h-[1px] bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.1)_40%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.1)_60%,transparent_100%)] blur-[3px] opacity-15" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220vw] h-[120px] bg-[radial-gradient(ellipse_at_center,rgba(198,163,85,0.03)_0%,transparent_70%)] blur-[80px] opacity-10" />
      <motion.div style={{ scale, opacity }} className="absolute inset-0 flex items-center justify-center will-change-transform origin-center z-10">
        <div className="relative flex items-center justify-center">
            <div className="absolute w-[185px] h-[185px] sm:w-[355px] sm:h-[355px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_0%,rgba(198,163,85,0.05)_40%,transparent_75%)] blur-3xl animate-pulse" />
            <div className="absolute rounded-full border-[1px] border-white/20 w-[161px] h-[161px] sm:w-[322px] sm:h-[322px] z-[55] shadow-[0_0_10px_rgba(255,255,255,0.2)]" />
            <div className="absolute rounded-full border-[0.5px] border-amber-400/10 w-[162px] h-[162px] sm:w-[324px] sm:h-[324px] z-[56]" />
            <div className="w-[160px] h-[160px] sm:w-[320px] sm:h-[320px] rounded-full bg-black z-50 relative overflow-hidden shadow-[0_0_60px_#000]" />
        </div>
      </motion.div>
    </div>
  )
})

const ParadoxLogo = () => (
  <div className="font-outfit font-black tracking-[0.15em] text-white uppercase leading-none">
    PARA<span className="text-amber-600">DOX</span>
  </div>
)

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
    { v: timeLeft.hours, l: "Hrs" },
    { v: timeLeft.minutes, l: "Min" },
    { v: timeLeft.seconds, l: "Sec" }
  ];

  return (
    <div className="flex items-center justify-center flex-wrap gap-6 sm:gap-14 font-outfit text-4xl sm:text-7xl font-bold text-white tracking-tighter tabular-nums">
      {items.map((item, idx) => (
        <div key={idx} className="flex flex-col items-center">
          <div>{item.v.toString().padStart(2, '0')}</div>
          <span className="text-[12px] sm:text-sm text-zinc-500 font-century uppercase tracking-[0.3em] mt-2 font-bold">{item.l}</span>
        </div>
      ))}
    </div>
  )
})

const FancyPrizeBadge = () => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 }}
    className="relative group mt-12 mb-10 w-full max-w-sm sm:max-w-md mx-auto"
  >
    <div className="absolute -inset-2 bg-gradient-to-r from-amber-500/0 via-amber-500/20 to-amber-500/0 rounded-[2.5rem] blur-2xl group-hover:via-amber-500/40 transition-all duration-700" />
    
    <div className="relative overflow-hidden px-8 py-8 sm:px-12 sm:py-10 bg-black/60 border border-white/10 backdrop-blur-2xl rounded-[2rem] shadow-2xl flex flex-col items-center gap-4">
        <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" />
        </div>

        <div className="flex items-center gap-3 mb-1">
           <div className="h-px w-6 sm:w-10 bg-gradient-to-r from-transparent to-amber-500/50" />
           <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
              <Sparkles size={12} className="text-amber-500 animate-pulse" />
              <span className="text-[9px] sm:text-[11px] font-black font-century tracking-[0.4em] text-amber-500 uppercase leading-none">REWARD POOL</span>
           </div>
           <div className="h-px w-6 sm:w-10 bg-gradient-to-l from-transparent to-amber-500/50" />
        </div>

        <div className="relative">
            <div className="absolute -inset-4 bg-amber-500/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative text-6xl sm:text-8xl font-black font-outfit text-white tracking-tighter block drop-shadow-lg">
                ₹1,500<span className="text-amber-500 text-3xl sm:text-5xl ml-1">+</span>
            </span>
        </div>

        <div className="flex flex-col items-center gap-1 font-jetbrains opacity-80 group-hover:opacity-100 transition-opacity">
            <p className="text-[10px] sm:text-xs text-zinc-400 font-bold uppercase tracking-[0.2em] flex items-center gap-2">
                <Coins size={14} className="text-amber-500" /> STAKED FOR EXCELLENCE
            </p>
            <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-amber-500 to-transparent mt-2" />
        </div>
    </div>
  </motion.div>
)

const App = () => {
  const containerRef = useRef(null)
  const [activeSection, setActiveSection] = useState('home')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] })

  const scrollTo = useCallback((id) => {
    const element = document.getElementById(id)
    if (element) {
      setIsMobileMenuOpen(false)
      const offset = 80
      const targetY = element.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  }, [])

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'Description', id: 'description' },
    { label: 'Judging', id: 'judging' },
    { label: 'Register', id: 'register' },
    { label: 'Team', id: 'coordinators' }
  ]

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id))
      const current = sections.find(section => {
        if (!section) return false
        const rect = section.getBoundingClientRect()
        return rect.top >= -200 && rect.top <= 200
      })
      if (current && current.id !== activeSection) setActiveSection(current.id)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [activeSection, navItems])

  return (
    <div ref={containerRef} className="relative min-h-screen bg-black text-zinc-300 selection:bg-amber-600/30 overflow-x-hidden font-jetbrains">
      <div className="fixed inset-0 z-[100] pointer-events-none opacity-[0.015] grain-texture transform-gpu" />
      <SingularityCore scrollYProgress={scrollYProgress} />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[110] p-4 sm:p-6 lg:p-8 flex justify-center pointer-events-auto">
        <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="relative hidden md:flex items-center gap-1 p-1 bg-black/40 border border-white/5 backdrop-blur-md rounded-full shadow-2xl">
          {navItems.map((item) => (
            <button key={item.id} onClick={() => scrollTo(item.id)} className={`relative px-6 py-3 rounded-full text-[13px] font-inter font-bold uppercase tracking-[0.2em] transition-colors duration-200 z-10 ${activeSection === item.id ? 'text-white' : 'text-zinc-500 hover:text-zinc-200'}`}>
              {activeSection === item.id && <motion.div layoutId="active-pill" transition={{ type: 'spring', bounce: 0.1, duration: 0.5 }} className="absolute inset-0 rounded-full bg-amber-600/80 shadow-[0_0_15px_rgba(198,163,85,0.3)] -z-10" />}
              <span className="relative">{item.label}</span>
            </button>
          ))}
        </motion.div>
        
        {/* Mobile Nav Toggle */}
        <div className="md:hidden flex items-center justify-between w-full max-w-sm px-6 py-4 bg-black/70 border border-white/10 rounded-full backdrop-blur-xl shadow-3xl font-century">
          <span className="text-sm font-bold tracking-[0.3em] text-amber-500 uppercase">Paradox '26</span>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-white active:scale-90 transition-transform"><XIcon size={24} /></button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="md:hidden absolute top-24 left-4 right-4 bg-black border border-white/10 rounded-3xl backdrop-blur-3xl p-6 shadow-3xl z-[120]">
              <div className="flex flex-col gap-3">
                {navItems.map((item) => (
                  <button key={item.id} onClick={() => scrollTo(item.id)} className={`text-left px-6 py-4 rounded-xl text-sm font-bold uppercase tracking-widest font-inter ${activeSection === item.id ? 'bg-amber-600/20 text-white' : 'text-zinc-500 hover:bg-white/5'}`}>{item.label}</button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="relative z-10 w-full transform-gpu">
        {/* HERO */}
        <section id="home" className="min-h-[100dvh] flex flex-col items-center justify-center px-4 sm:px-6 text-center pt-24 pb-16 relative">
          <div className="flex flex-col items-center max-w-full w-full">
            <span className="text-amber-500/80 tracking-[0.6em] text-sm sm:text-base font-bold uppercase mb-12 font-century">SIESGST ACM CHAPTER PRESENTS</span>
            <div className="relative mb-14 w-full">
              <h1 className="text-6xl sm:text-8xl md:text-[10rem] font-outfit font-black tracking-[0.15em] text-white uppercase leading-none">PARA<span className="text-amber-600">DOX</span></h1>
              <p className="mt-12 text-zinc-400 text-base sm:text-xl font-bold tracking-[0.4em] uppercase font-jetbrains max-w-[90vw] mx-auto leading-relaxed">AN AI HACKATHON WHERE THE KNOWN ENDS</p>
            </div>
            
            <div className="mb-8 px-10 py-16 rounded-[2.5rem] bg-white/5 backdrop-blur-md border border-white/10 w-full max-w-4xl shadow-3xl">
                <p className="text-zinc-500 text-sm sm:text-base font-bold tracking-[0.5em] uppercase mb-12 font-century opacity-60 italic">"CERTAIN ONLY IN UNCERTAINTY"</p>
                <CountdownTimer targetDate="2026-03-07T09:00:00" />
            </div>

            <FancyPrizeBadge />

            <div className="flex flex-col items-center">
                  <motion.button 
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }} 
                    onClick={() => scrollTo('register')} 
                    className="px-14 sm:px-24 py-6 bg-white text-black font-black uppercase tracking-[0.4em] rounded-full shadow-[0_20px_60px_rgba(255,255,255,0.15)] flex items-center gap-6 text-sm sm:text-base hover:bg-zinc-200 transition-all duration-500 font-inter"
                  >
                    REGISTRATION <Rocket size={20} />
                  </motion.button>
            </div>
          </div>
        </section>

        {/* EVENT DESCRIPTION */}
        <section id="description" className="max-w-7xl mx-auto px-6 sm:px-10 py-32 sm:py-56">
          <div className="mb-24 flex flex-col items-center text-center">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-[2px] bg-amber-500/50" />
                <span className="text-amber-500 font-bold tracking-[0.4em] text-sm sm:text-base uppercase font-century">Operational Intel</span>
                <div className="w-20 h-[2px] bg-amber-500/50" />
              </div>
              <h2 className="text-5xl sm:text-8xl font-black text-white uppercase font-outfit tracking-tight leading-none">EVENT DESCRIPTION</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative group bg-[#050505] border border-white/10 rounded-[3.5rem] p-10 sm:p-16 backdrop-blur-3xl shadow-3xl flex flex-col">
                  <div className="absolute top-0 right-0 p-10">
                      <div className="w-16 h-16 rounded-2xl bg-amber-600/10 flex items-center justify-center border border-amber-600/20 shadow-[0_0_20px_rgba(198,163,85,0.1)]">
                          <CpuIcon className="text-amber-500" size={28} />
                      </div>
                  </div>
                  <div className="mb-12">
                      <p className="text-sm sm:text-base text-amber-500/60 font-bold uppercase tracking-[0.3em] font-jetbrains mb-3">{EVENT_PHASES.phase1.id}</p>
                      <h3 className="text-3xl sm:text-4xl font-black text-white font-outfit mb-3">{EVENT_PHASES.phase1.title}</h3>
                      <p className="text-base text-zinc-500 font-bold uppercase tracking-widest font-jetbrains opacity-80">{EVENT_PHASES.phase1.subtitle}</p>
                  </div>
                  <p className="text-zinc-400 text-base sm:text-xl leading-relaxed font-jetbrains mb-16 flex-grow">{EVENT_PHASES.phase1.description}</p>
                  <div className="space-y-8">
                      <p className="text-white text-sm sm:text-base font-bold uppercase tracking-widest font-century opacity-50">Evaluation Metrics:</p>
                      <div className="grid grid-cols-2 gap-4">
                          {EVENT_PHASES.phase1.evaluation.map((tag) => (
                              <div key={tag} className="px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-sm sm:text-base text-zinc-300 flex items-center gap-4 transition-all duration-300 hover:border-amber-500/50">
                                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                  {tag}
                              </div>
                          ))}
                      </div>
                  </div>
                  <div className="mt-16 pt-10 border-t border-white/5 font-jetbrains">
                      <div className="space-y-6">
                        {EVENT_PHASES.phase1.steps.map((step, i) => (
                           <div key={i} className="flex items-center justify-between group">
                              <span className="text-xs sm:text-sm font-bold text-amber-500/60 uppercase tracking-widest">{step.time}</span>
                              <span className="text-sm sm:text-base font-bold text-white group-hover:text-amber-500 transition-colors">{step.label}</span>
                           </div>
                        ))}
                      </div>
                  </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative group bg-[#080808] border border-white/10 rounded-[3.5rem] p-10 sm:p-16 backdrop-blur-3xl shadow-3xl flex flex-col">
                  <div className="absolute top-0 right-0 p-10">
                      <div className="w-16 h-16 rounded-2xl bg-amber-600/10 flex items-center justify-center border border-amber-600/20 shadow-[0_0_20px_rgba(198,163,85,0.1)]">
                          <Terminal className="text-amber-500" size={28} />
                      </div>
                  </div>
                  <div className="mb-12">
                      <p className="text-sm sm:text-base text-amber-500/60 font-bold uppercase tracking-[0.3em] font-jetbrains mb-3">{EVENT_PHASES.phase2.id}</p>
                      <h3 className="text-3xl sm:text-4xl font-black text-white font-outfit mb-3">{EVENT_PHASES.phase2.title}</h3>
                      <p className="text-base text-zinc-500 font-bold uppercase tracking-widest font-jetbrains opacity-80">{EVENT_PHASES.phase2.subtitle}</p>
                  </div>
                  <p className="text-zinc-400 text-base sm:text-xl leading-relaxed font-jetbrains mb-16 flex-grow">{EVENT_PHASES.phase2.description}</p>
                  <ul className="space-y-8 mb-16 font-jetbrains">
                      {EVENT_PHASES.phase2.features.map((feat, i) => (
                        <li key={i} className="flex items-center gap-6 group">
                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-amber-500/20 transition-all duration-500">
                              <Zap className="text-amber-500" size={22} />
                            </div>
                            <span className="text-zinc-300 text-base sm:text-xl leading-relaxed">{feat}</span>
                        </li>
                      ))}
                  </ul>
                  <div className="bg-amber-600/5 rounded-[2.5rem] border border-amber-600/20 p-8 sm:p-12 font-jetbrains">
                      <p className="text-white text-sm sm:text-base font-bold uppercase tracking-widest font-century mb-10 opacity-50 flex items-center gap-4">
                         <Clock size={16} /> Sync Sequence (March 7th):
                      </p>
                      <div className="space-y-10 relative">
                          <div className="absolute left-[7px] top-2 bottom-2 w-[1px] bg-amber-500/20" />
                          {EVENT_PHASES.phase2.schedule.map((item, i) => (
                              <div key={i} className="flex gap-8 relative z-10">
                                  <div className="w-4 h-4 rounded-full bg-amber-600 mt-1.5 shadow-[0_0_15px_rgba(198,163,85,0.6)] flex-shrink-0" />
                                  <div className="space-y-2">
                                      <div className="flex items-center gap-4">
                                          <span className="text-[11px] font-bold text-amber-500 opacity-60">{item.time}</span>
                                          <span className="text-sm sm:text-base font-bold text-white uppercase tracking-wider font-century">{item.label}</span>
                                      </div>
                                      <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed">{item.desc}</p>
                                  </div>
                              </div>
                          ))}
                      </div>
                  </div>
              </motion.div>
          </div>
        </section>

        {/* JUDGING & CONDUCT */}
        <section id="judging" className="max-w-7xl mx-auto px-6 sm:px-10 py-32 sm:py-56">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 sm:gap-32 items-start">
              <div className="space-y-16">
                  <h2 className="text-5xl sm:text-7xl font-black text-white font-outfit tracking-tight leading-none">Judging Criteria</h2>
                  <div className="space-y-12 font-jetbrains">
                     {JUDGING_CRITERIA.map((item, i) => (
                        <div key={i} className="flex gap-8 group">
                           <div className="w-1.5 h-16 bg-amber-600/30 group-hover:bg-amber-500 transition-all rounded-full" />
                           <div className="space-y-2">
                              <h4 className="text-xl sm:text-2xl font-bold text-white tracking-wide font-century">{item.title}</h4>
                              <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">{item.desc}</p>
                           </div>
                        </div>
                     ))}
                  </div>
              </div>
              <div className="relative">
                 <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 to-amber-900/20 rounded-[4rem] blur-2xl" />
                 <div className="relative bg-[#050505] border border-white/10 rounded-[4rem] p-12 sm:p-20 backdrop-blur-3xl shadow-3xl font-jetbrains">
                    <div className="flex items-center gap-6 mb-12">
                       <AlertTriangle className="text-amber-500" size={36} />
                       <h3 className="text-4xl sm:text-5xl font-bold text-white font-outfit tracking-tight">Code of Conduct</h3>
                    </div>
                    <ul className="space-y-8">
                       {CODE_OF_CONDUCT.map((text, i) => (
                          <li key={i} className="flex gap-4 group">
                             <div className="w-2.5 h-2.5 rounded-full bg-amber-500 mt-2.5 shrink-0 group-hover:scale-150 transition-transform" />
                             <p className="text-zinc-400 text-base sm:text-lg leading-relaxed font-medium tracking-wide">{text}</p>
                          </li>
                       ))}
                    </ul>
                 </div>
              </div>
           </div>
        </section>

        {/* REGISTRATION */}
        <section id="register" className="max-w-7xl mx-auto px-6 sm:px-10 py-32 sm:py-60">
          <div className="relative group overflow-hidden rounded-[3rem] sm:rounded-[5rem] p-12 sm:p-24 md:p-32 border border-white/10 bg-[#020202] backdrop-blur-3xl text-center shadow-3xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(198,163,85,0.05),transparent_70%)] opacity-40 pointer-events-none" />
            <div className="relative z-10 flex flex-col items-center">
              <h2 className="text-5xl sm:text-7xl md:text-8xl font-black text-white tracking-tight font-outfit mb-10 leading-tight">Ready to Build the Future?</h2>
              <p className="text-zinc-400 max-w-4xl mx-auto text-base sm:text-xl font-medium leading-relaxed mb-20 font-jetbrains tracking-wide">Registration is exclusively via Unstop. Secure your spot today and stand a chance to win and showcase your talent at SIESGST.</p>
              <div className="flex flex-col md:flex-row items-center justify-center gap-10 w-full">
                <motion.a 
                  href="#" 
                  target="_blank" 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }} 
                  className="group flex items-center justify-center gap-4 px-12 py-6 sm:px-16 sm:py-7 bg-white text-black font-black uppercase tracking-[0.2em] rounded-full shadow-2xl hover:bg-amber-500 hover:text-white transition-all duration-300 text-sm sm:text-base font-bold font-inter"
                >
                  REGISTER ON UNSTOP <ExternalLink size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </motion.a>
                <div className="flex flex-col items-center md:items-start opacity-70">
                  <p className="text-zinc-300 text-base sm:text-lg font-bold tracking-[0.1em] font-century">Registration Fee: ₹350</p>
                  <p className="text-zinc-500 text-sm font-medium tracking-[0.05em] italic font-inter">(Full refund if not shortlisted)</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* COORDINATORS */}
        <section id="coordinators" className="max-w-7xl mx-auto px-6 sm:px-10 py-32 sm:py-56 text-center">
            <h2 className="text-4xl sm:text-7xl md:text-9xl font-bold tracking-tighter text-white uppercase mb-40 font-outfit">COORDINATORS</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 sm:gap-20 max-w-5xl mx-auto">
              {COORDINATORS.map((person, i) => (
                <motion.div key={i} whileHover={{ y: -15 }} className="relative flex flex-col items-center p-16 sm:p-24 rounded-[4rem] border border-white/10 bg-zinc-950/40 group transition-all duration-700 backdrop-blur-3xl shadow-3xl overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-3xl rounded-full translate-x-10 -translate-y-10 group-hover:opacity-100 opacity-30 transition-opacity" />
                  <div className="relative mb-14 flex justify-center">
                    <div className="absolute inset-0 bg-amber-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 scale-110" />
                    <div className="relative w-56 h-56 sm:w-72 sm:h-72 flex-shrink-0">
                      <img src={person.image} alt={person.name} className="w-full h-full rounded-full object-cover border border-white/10 group-hover:border-amber-500/30 transition-all duration-700 shadow-xl grayscale group-hover:grayscale-0 z-10" />
                    </div>
                  </div>
                  <div className="text-center z-10 font-jetbrains">
                    <h4 className="text-3xl sm:text-4xl font-bold text-white uppercase tracking-tighter mb-5 font-outfit">{person.name}</h4>
                    <p className="text-base text-amber-500 font-bold uppercase tracking-[0.4em] mb-14 font-century">{person.role}</p>
                    <a href={person.linkedin} target="_blank" className="flex items-center justify-center w-16 h-16 rounded-full bg-white/5 border border-white/10 transition-all duration-300 hover:bg-amber-600/20 group shadow-lg">
                      <Linkedin size={26} className="text-amber-500 transition-transform group-hover:scale-110" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
        </section>
      </main>

      <footer className="py-32 sm:py-56 text-center border-t border-white/5 bg-black relative z-10 font-jetbrains">
        <div className="flex flex-col items-center justify-center gap-16 mb-32">
          <h2 className="font-bold tracking-[1.8em] sm:tracking-[2.5em] text-3xl sm:text-6xl text-white uppercase ml-[1.5em] font-outfit opacity-15 leading-none">PARADOX</h2>
          <div className="flex justify-center items-center gap-14 sm:gap-24 opacity-30 hover:opacity-100 transition-opacity duration-700">
            {[Instagram, Twitter, Linkedin].map((Icon, i) => (
              <a key={i} href="#" className="text-white hover:text-amber-500 transition-all duration-500 hover:scale-125"><Icon size={36} /></a>
            ))}
          </div>
        </div>
        <p className="text-zinc-800 text-sm uppercase font-bold tracking-[1.2em] opacity-60 px-4 text-center leading-relaxed font-century">SIESGST ACM CHAPTER // 2026 // SYSTEM_SYNC</p>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Outfit:wght@700;800;900&family=Inter:wght@400;700;900&display=swap');
        :root { 
          --font-outfit: 'Outfit', sans-serif; 
          --font-jetbrains: 'JetBrains Mono', monospace; 
          --font-century: "Century Gothic", CenturyGothic, AppleGothic, sans-serif; 
          --font-inter: 'Inter', sans-serif; 
        }
        body { background-color: black; color: white; overflow-x: hidden; -webkit-font-smoothing: antialiased; margin: 0; font-family: var(--font-jetbrains); width: 100%; }
        .font-outfit { font-family: var(--font-outfit); }
        .font-jetbrains { font-family: var(--font-jetbrains); }
        .font-century { font-family: var(--font-century); }
        .font-inter { font-family: var(--font-inter); }
        .animate-pulse-viscous { animation: pulseViscous 8s infinite ease-in-out; }
        @keyframes pulseViscous { 0%, 100% { opacity: 0.35; } 50% { opacity: 0.85; } }
        @keyframes spin3D { 0% { transform: rotateX(72deg) rotateY(0deg); } 100% { transform: rotateX(72deg) rotateY(360deg); } }
        .animate-spin-3d-slow { animation: spin3D 100s linear infinite; }
        @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        .animate-shimmer { animation: shimmer 3s infinite linear; }
        .grain-texture { background-image: url('https://grainy-gradients.vercel.app/noise.svg'); filter: contrast(180%) brightness(120%); pointer-events: none; }
        .fluid-hero-text { font-size: clamp(2.5rem, 12vw, 10rem); white-space: nowrap; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #000; }
        ::-webkit-scrollbar-thumb { background: #222; }
        html { scroll-behavior: smooth; }
        .shadow-3xl { box-shadow: 0 40px 100px -30px rgba(0, 0, 0, 0.95); }
      `}</style>
    </div>
  )
}

export default App;