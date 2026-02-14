import React, { useState, useEffect, useMemo, useRef, memo, useCallback } from 'react'
import {
  Trophy, Rocket, Zap, Globe, Shield, Cpu,
  Instagram, Linkedin, Clock, MoveRight,
  Menu, X as XIcon, ChevronDown, Fingerprint, Layers, Terminal, Mail, User, Users, Phone,
  Building2, UserPlus, Twitter, Info, MapPin, Calendar, CreditCard, ExternalLink, AlertTriangle,
  Lightbulb, Code, Target, MessageSquare, Monitor, FastForward, Award, CheckCircle2,
  Cpu as CpuIcon, Sparkles, Coins, Users2, GraduationCap, Laptop, Utensils, Search, Boxes, ClipboardCheck
} from 'lucide-react'
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useInView, useMotionValue } from 'framer-motion'

// --- Data Constants ---
const EVENT_PHASES = {
  phase1: {
    id: 'ROUND_01',
    title: 'Idea Submission',
    subtitle: 'ONLINE SCREENING',
    description: 'Submit an original proposal detailing the problem statement, proposed solution, and Agentic AI implementation. ZERO RISK: Teams not cleared for Round 02 receive a guaranteed 100% registration fee refund.',
    evaluation: ['Innovation', 'Feasibility', 'Technical Depth', 'Relevance', 'Impact'],
    steps: [
      { label: 'Manifest Upload', desc: 'Submit via Unstop portal.' },
      { label: 'Evaluation', desc: 'Screening for technical merit.' }
    ]
  },
  phase2: {
    id: 'ROUND_02',
    title: 'Offline Hackathon',
    subtitle: 'ONSITE MVP DEVELOPMENT',
    description: 'Top 40 shortlisted teams participate onsite at SIESGST. Problem statement revealed on the spot. 6–7 hours of continuous coding to build and present a functional MVP.',
    features: ['10-Hour Total Duration', 'Live Evaluation', 'On-site Mentorship'],
    schedule: [
      { time: 'TBD', label: 'Check-in', desc: 'Verify identity & hardware.' },
      { time: 'TBD', label: 'Zero-Hour', desc: 'Problem reveal & sync start.' },
      { time: 'TBD', label: 'Final Demo', desc: 'Present MVP to judges.' }
    ]
  }
}

const ELIGIBILITY = [
  { icon: GraduationCap, title: 'UG Students', desc: 'B.Tech / B.E., B.Sc. (CS/IT/related), and BCA. Valid College ID is mandatory.' },
  { icon: Users2, title: 'Team Formation', desc: '3 to 4 members. Inter-college, inter-branch, and inter-specialization teams allowed.' },
  { icon: Laptop, title: 'Resources', desc: 'Bring your own laptops. GenAI, external APIs, and open-source libraries permitted.' }
]

const JUDGING_CRITERIA = [
  { title: 'Innovation & Creativity', desc: 'Novelty of the concept and use of Agentic AI.' },
  { title: 'Technical Implementation', desc: 'Complexity, code quality, and logic of the solution.' },
  { title: 'Problem-Solving Approach', desc: 'Effectiveness of the solution to the problem statement.' },
  { title: 'Statement Relevance', desc: 'How well the solution addresses the revealed paradox.' },
  { title: 'Presentation & Demo', desc: 'Clarity of thought and professionalism in pitching.' }
]

const HACKATHON_RULES = [
  'Only original ideas allowed. Pre-built projects are strictly prohibited.',
  'Plagiarism or misrepresentation leads to immediate disqualification.',
  'Teams must be present for the entire offline round; no-shows will be disqualified.',
  'Malpractice during evaluation or presentation will not be tolerated.',
  'Food will be provided during the offline hackathon.'
]

const COORDINATORS = [
  {
    name: 'Coordinator 1',
    role: 'Lead Architect',
    linkedin: '#',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'
  },
  {
    name: 'Coordinator 2',
    role: 'Operations Head',
    linkedin: '#',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop'
  }
]

// --- Interactive Components ---

const InteractiveFullViewportParticles = memo(() => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const particles = [];
    const particleCount = window.innerWidth < 768 ? 200 : 450; 

    class Particle {
      constructor(w, h) {
        this.init(w, h);
      }

      init(w, h) {
        this.baseX = Math.random() * w;
        this.baseY = Math.random() * h;
        this.x = this.baseX;
        this.y = this.baseY;
        this.size = Math.random() * 1.6 + 0.2;
        this.alpha = Math.random() * 0.7 + 0.2;
        this.angle = Math.random() * Math.PI * 2;
        this.depthScale = (this.size / 1.8) * 2.0; 
        this.ease = 0.04 + (Math.random() * 0.02);
      }

      update(mx, my, width, height) {
        if (!width || !height) return;
        this.angle += 0.004;
        const driftX = Math.cos(this.angle) * 0.8;
        const driftY = Math.sin(this.angle) * 0.8;
        const centerX = width / 2;
        const centerY = height / 2;
        
        const pushFactor = 150 * this.depthScale;
        const mouseOffsetX = (mx - centerX) / width;
        const mouseOffsetY = (my - centerY) / height;

        const targetX = this.baseX - (mouseOffsetX * pushFactor) + driftX;
        const targetY = this.baseY - (mouseOffsetY * pushFactor) + driftY;

        this.x += (targetX - this.x) * this.ease;
        this.y += (targetY - this.y) * this.ease;
      }

      draw(context) {
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
        if (this.depthScale > 1.4) {
          context.shadowBlur = 10 * this.depthScale;
          context.shadowColor = 'rgba(255, 255, 255, 0.3)';
        }
        context.fill();
        context.shadowBlur = 0;
      }
    }

    const init = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(window.innerWidth, window.innerHeight));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      particles.forEach(p => {
        p.update(mouseRef.current.x, mouseRef.current.y, window.innerWidth, window.innerHeight);
        p.draw(ctx);
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleInput = (e) => {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      mouseRef.current = { x: clientX, y: clientY, active: true };
    };

    window.addEventListener('resize', init);
    window.addEventListener('mousemove', handleInput);
    window.addEventListener('touchmove', handleInput, { passive: true });
    init();
    animate();
    return () => {
      window.removeEventListener('resize', init);
      window.removeEventListener('mousemove', handleInput);
      window.removeEventListener('touchmove', handleInput);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none w-full h-full" />;
});

const SingularityCore = memo(({ scrollYProgress }) => {
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 30, mass: 1 })
  const scale = useTransform(smoothProgress, [0, 0.45, 1], [0.8, 1.1, 2.8])
  const opacity = useTransform(smoothProgress, [0, 0.1, 0.9, 1], [1, 1, 1, 1])
  
  // SWIPE EFFECT: Horizontal movement tracked with scroll
  const x = useTransform(smoothProgress, [0, 0.5, 1], ["-10%", "0%", "10%"])
  const rotate = useTransform(smoothProgress, [0, 1], [0, 15])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden transform-gpu">
      <div className="absolute inset-0 bg-[#02040a]" />
      <InteractiveFullViewportParticles />
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_50%_50%,rgba(16,24,48,0.4)_0%,transparent_70%)]" />
      
      <motion.div 
        style={{ scale, opacity, x, rotate }} 
        className="absolute inset-0 flex items-center justify-center will-change-transform origin-center z-10"
      >
        <div className="relative flex items-center justify-center">
          <div className="absolute w-[45vw] h-[45vw] max-w-[450px] max-h-[450px] rounded-full bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.12)_0%,transparent_70%)] blur-3xl animate-pulse" />
          <div className="w-[30vw] h-[30vw] max-w-[320px] max-h-[320px] rounded-full bg-[radial-gradient(circle_at_30%_30%,#0a0d17_0%,#000000_100%)] z-50 relative border border-white/5 shadow-[0_0_100px_rgba(245,158,11,0.15)]" />
        </div>
      </motion.div>
    </div>
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
    { v: timeLeft.hours, l: "Hrs" },
    { v: timeLeft.minutes, l: "Min" },
    { v: timeLeft.seconds, l: "Sec" }
  ];

  return (
    <div className="flex items-center justify-center flex-wrap gap-4 sm:gap-8 md:gap-10 font-phonk text-2xl sm:text-5xl md:text-7xl text-white tracking-tighter tabular-nums">
      {items.map((item, idx) => (
        <div key={idx} className="flex flex-col items-center">
          <div className="leading-none">{item.v.toString().padStart(2, '0')}</div>
          <span className="font-sf text-[8px] sm:text-[10px] text-zinc-500 uppercase tracking-[0.2em] mt-2 sm:mt-3">{item.l}</span>
        </div>
      ))}
    </div>
  )
})

const PrizePoolCard = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-100, 100], [12, -12]);
  const rotateY = useTransform(mouseX, [-100, 100], [-12, 12]);
  
  const springConfig = { damping: 25, stiffness: 200 };
  const sprRotateX = useSpring(rotateX, springConfig);
  const sprRotateY = useSpring(rotateY, springConfig);

  const shineX = useTransform(mouseX, [-100, 100], ["0%", "100%"]);
  const shineY = useTransform(mouseY, [-100, 100], ["0%", "100%"]);

  function handleMouseMove(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    mouseX.set(((x / width) - 0.5) * 200);
    mouseY.set(((y / height) - 0.5) * 200);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      className="relative flex flex-col items-center my-12"
      style={{ perspective: 1000 }}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ 
          rotateX: sprRotateX, 
          rotateY: sprRotateY,
          transformStyle: "preserve-3d" 
        }}
        className="relative w-full max-w-[280px] sm:max-w-[340px] aspect-[4/5] bg-white/[0.03] backdrop-blur-2xl rounded-[2.5rem] border border-white/10 flex flex-col items-center justify-center p-10 overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] group transition-all duration-300 hover:border-amber-500/40"
      >
        <motion.div 
          style={{ left: shineX, top: shineY }}
          className="absolute w-64 h-64 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-x-1/2 -translate-y-1/2" 
        />
        <div style={{ transform: "translateZ(50px)" }} className="flex flex-col items-center">
          <h2 className="font-keania text-5xl sm:text-7xl text-white leading-[0.85] tracking-[0.05em] text-center uppercase">
            PRIZE<br/>POOL
          </h2>
          <div className="w-16 h-[2px] bg-amber-500/60 my-8 rounded-full" />
          <p className="font-keania text-3xl sm:text-5xl text-white tracking-tight leading-none group-hover:text-amber-500 transition-colors duration-500">
            15000/- Rs
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

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
      const targetY = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  }, [])

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'Event', id: 'description' },
    { label: 'Rules', id: 'judging' },
    { label: 'Registration', id: 'register' },
    { label: 'Coordinators', id: 'coordinators' }
  ]

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id))
      const current = sections.find(section => {
        if (!section) return false
        const rect = section.getBoundingClientRect()
        return rect.top >= -300 && rect.top <= 300
      })
      if (current && current.id !== activeSection) setActiveSection(current.id)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [activeSection, navItems])

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#02040a] text-zinc-300 selection:bg-amber-600/30 overflow-x-hidden">
      <div className="fixed inset-0 z-[100] pointer-events-none opacity-[0.015] grain-texture" />
      <SingularityCore scrollYProgress={scrollYProgress} />

      <nav className="fixed top-0 left-0 right-0 z-[110] p-4 sm:p-6 lg:p-10 flex justify-center pointer-events-auto">
        <motion.div 
          initial={{ y: -50, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          className="relative hidden md:flex items-center gap-1 p-1 bg-black/40 border border-white/5 backdrop-blur-md rounded-full shadow-2xl"
        >
          {navItems.map((item) => (
            <button key={item.id} onClick={() => scrollTo(item.id)} className={`relative px-6 lg:px-8 py-3 rounded-full text-[10px] lg:text-[11px] font-phonk uppercase tracking-widest transition-all duration-300 z-10 ${activeSection === item.id ? 'text-white' : 'text-zinc-500 hover:text-zinc-200'}`}>
              {activeSection === item.id && <motion.div layoutId="active-pill" className="absolute inset-0 rounded-full bg-amber-600/90 -z-10 shadow-[0_0_15px_rgba(217,119,6,0.5)]" />}
              {item.label}
            </button>
          ))}
        </motion.div>

        <div className="md:hidden flex items-center justify-between w-full max-w-sm px-5 py-4 bg-black/70 border border-white/10 rounded-full backdrop-blur-xl shadow-3xl">
          <span className="text-[10px] font-phonk tracking-widest text-amber-500 uppercase">PARADOX</span>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-white active:scale-90 transition-transform">
            {isMobileMenuOpen ? <XIcon size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="md:hidden absolute top-20 left-4 right-4 bg-black/95 border border-white/10 rounded-3xl backdrop-blur-3xl p-6 shadow-3xl z-[120]">
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <button key={item.id} onClick={() => scrollTo(item.id)} className={`text-left px-6 py-4 rounded-xl text-[10px] font-phonk uppercase tracking-widest transition-all ${activeSection === item.id ? 'bg-amber-600/20 text-amber-500 border border-amber-600/30' : 'text-zinc-500'}`}>{item.label}</button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="relative z-10 w-full transform-gpu">
        {/* HOME SECTION */}
        <section id="home" className="min-h-[100dvh] flex flex-col items-center justify-center px-6 text-center pt-20 pb-8 sm:pb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center w-full max-w-5xl">
            <span className="font-sf text-amber-500/80 tracking-[0.4em] text-[8px] sm:text-xs font-bold uppercase mb-4 sm:mb-8">SIESGST ACM CHAPTER PRESENTS</span>
            <div className="relative mb-8 sm:mb-10 w-full">
              <h1 className="text-[clamp(2.5rem,12vw,11rem)] font-phonk text-white uppercase leading-none tracking-tighter drop-shadow-2xl">
                PARA<span className="text-amber-600">DOX</span>
              </h1>
              <p className="mt-4 sm:mt-6 font-sf text-zinc-400 text-xs sm:text-lg font-bold tracking-[0.2em] uppercase max-w-2xl mx-auto px-4 leading-relaxed italic">CERTAIN ONLY IN UNCERTAINTY</p>
            </div>
            <div className="mb-2 px-4 sm:px-8 py-8 sm:py-10 rounded-[2rem] sm:rounded-[2.5rem] bg-white/5 backdrop-blur-md border border-white/10 w-full max-w-4xl">
              <CountdownTimer targetDate="2026-03-05T09:00:00" />
            </div>
            <PrizePoolCard />
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => scrollTo('register')} className="px-10 sm:px-20 py-5 bg-white text-black font-phonk uppercase tracking-[0.2em] rounded-full text-[10px] sm:text-sm hover:bg-amber-500 hover:text-white transition-all duration-300 shadow-[0_15px_40px_rgba(255,255,255,0.1)]">
              Registration Process
            </motion.button>
          </motion.div>
        </section>

        {/* EVENT DESCRIPTION MASTER CARD */}
        <section id="description" className="max-w-7xl mx-auto px-6 py-12 sm:py-24">
          <div className="mb-12 flex flex-col items-center text-center">
            <h2 className="text-3xl sm:text-7xl font-phonk text-white uppercase mb-4">Event Description</h2>
            <div className="w-16 sm:w-20 h-1 bg-amber-500 rounded-full" />
          </div>

          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[3rem] sm:rounded-[4rem] overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-white/10">
              
              {/* Sidebar: About & Logistics */}
              <div className="lg:col-span-4 bg-black/40 p-8 sm:p-12 flex flex-col">
                <div className="mb-12">
                  <h3 className="font-phonk text-lg text-amber-500 uppercase tracking-widest mb-6">Master Protocol</h3>
                  <p className="font-sf text-xs sm:text-sm text-zinc-300 leading-relaxed font-black tracking-wide">
                    Paradox is an inter-collegiate Agentic AI Hackathon bringing together innovative minds to build intelligent, autonomous solutions. Creativity, problem-solving, and implementation using Agentic AI concepts are the core focus.
                  </p>
                </div>
                
                <div className="mt-auto space-y-8">
                  <div>
                    <div className="flex items-center gap-3 mb-2 text-white">
                      <Calendar size={16} className="text-amber-500" />
                      <span className="font-phonk text-[10px] tracking-widest">Date</span>
                    </div>
                    <p className="font-sf text-sm font-black text-zinc-400 tracking-widest">5th March 2026</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2 text-white">
                      <MapPin size={16} className="text-amber-500" />
                      <span className="font-phonk text-[10px] tracking-widest">Venue</span>
                    </div>
                    <p className="font-sf text-sm font-black text-zinc-400 tracking-widest leading-relaxed">SIES Graduate School of Technology, Navi Mumbai</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2 text-white">
                      <Clock size={16} className="text-amber-500" />
                      <span className="font-phonk text-[10px] tracking-widest">Total Time</span>
                    </div>
                    <p className="font-sf text-sm font-black text-zinc-400 tracking-widest">10 Hours Intensive</p>
                  </div>
                  <div className="p-6 bg-amber-500/10 border border-amber-500/30 rounded-2xl">
                    <div className="flex items-center gap-3 mb-2 text-amber-500">
                      <CreditCard size={16} />
                      <span className="font-phonk text-[10px] tracking-widest">Fee: 350RS</span>
                    </div>
                    <p className="font-sf text-[10px] sm:text-[10px] font-black text-amber-500 tracking-widest bold">
                      100% CAPITAL RECOVERY: Guaranteed refund if not shortlisted for Round 2.
                    </p>
                  </div>
                </div>
              </div>

              {/* Main Content: Format & Protocols */}
              <div className="lg:col-span-8 bg-white/[0.01] p-8 sm:p-12 space-y-16">
                
                {/* Sync Format */}
                <div>
                  <h3 className="font-phonk text-xl text-white uppercase tracking-widest mb-10 border-l-4 border-amber-500 pl-6">Sync Stages</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center font-phonk text-xs text-amber-500">01</div>
                        <h4 className="font-sf font-black text-sm text-white uppercase tracking-widest">Round 1: Idea Submission</h4>
                      </div>
                      <p className="font-sf text-[13px] text-zinc-500 font-black tracking-wider leading-relaxed">
                        Teams submit an original proposal (Online). Ideas evaluated on Innovation, Feasibility, Depth, and Impact. Top 40 teams cleared for Round 2.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center font-phonk text-xs text-amber-500">02</div>
                        <h4 className="font-sf font-black text-sm text-white uppercase tracking-widest">Round 2: Offline Sprint</h4>
                      </div>
                      <p className="font-sf text-[11px] text-zinc-500 font-black tracking-wider leading-relaxed">
                        6–7 hours of continuous onsite coding. Build and present a functional MVP for the paradox revealed on the event day.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Requirements Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <h3 className="font-phonk text-[11px] text-white uppercase tracking-[0.3em] opacity-50 flex items-center gap-3">
                      <GraduationCap size={16} /> Unit Requirements
                    </h3>
                    <ul className="space-y-3">
                      {[
                        'Open to all UG students.',
                        'Eligible: B.Tech, B.E, B.Sc (CS/IT), BCA.',
                        'Any college / department / branch permitted.',
                        'Inter-college & inter-branch teams allowed.'
                      ].map((item, i) => (
                        <li key={i} className="flex gap-3 items-start">
                          <div className="w-1 h-1 rounded-full bg-amber-500 mt-2 shrink-0" />
                          <span className="font-sf text-[10px] text-zinc-400 font-black uppercase tracking-wider">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-6">
                    <h3 className="font-phonk text-[11px] text-white uppercase tracking-[0.3em] opacity-50 flex items-center gap-3">
                      <Users2 size={16} /> Team Formation
                    </h3>
                    <ul className="space-y-3">
                      {[
                        'Team size: 3 to 4 members.',
                        'Participants limited to one team only.',
                        'Team composition fixed upon registration.',
                        'Valid college ID required for onsite round.'
                      ].map((item, i) => (
                        <li key={i} className="flex gap-3 items-start">
                          <div className="w-1 h-1 rounded-full bg-amber-500 mt-2 shrink-0" />
                          <span className="font-sf text-[10px] text-zinc-400 font-black uppercase tracking-wider">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Final Protocols Footer */}
                <div className="pt-10 border-t border-white/5 grid grid-cols-2 sm:grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <Laptop className="text-amber-500" size={20} />
                    <p className="font-sf text-[9px] text-zinc-500 font-black uppercase tracking-widest leading-tight">OWN LAPTOPS<br/>MANDATORY</p>
                  </div>
                  <div className="space-y-2">
                    <Zap className="text-amber-500" size={20} />
                    <p className="font-sf text-[9px] text-zinc-500 font-black uppercase tracking-widest leading-tight">GEN-AI & APIS<br/>PERMITTED</p>
                  </div>
                  <div className="space-y-2">
                    <Utensils className="text-amber-500" size={20} />
                    <p className="font-sf text-[9px] text-zinc-500 font-black uppercase tracking-widest leading-tight">ONSITE FOOD<br/>PROVIDED</p>
                  </div>
                  <div className="space-y-2">
                    <Award className="text-amber-500" size={20} />
                    <p className="font-sf text-[9px] text-zinc-500 font-black uppercase tracking-widest leading-tight">PARTICIPATION<br/>CERTIFICATES</p>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        </section>

        {/* CRITERIA & RULES SECTION */}
        <section id="judging" className="max-w-7xl mx-auto px-6 py-12 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-20 items-start">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl sm:text-6xl font-phonk text-white uppercase mb-8 sm:mb-16 text-center lg:text-left">Judging Criteria</h2>
              <div className="space-y-8 sm:space-y-14">
                {JUDGING_CRITERIA.map((item, i) => (
                  <div key={i} className="group">
                    <div className="flex gap-6 sm:gap-10 items-start">
                      <div className="w-1.5 h-16 sm:h-20 bg-amber-500/20 group-hover:bg-amber-600 transition-colors shrink-0" />
                      <div>
                        <h4 className="font-sf text-lg sm:text-2xl text-white uppercase mb-2 tracking-wide font-black">{item.title}</h4>
                        <p className="font-sf text-xs sm:text-lg text-zinc-500 leading-relaxed font-black opacity-80">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="order-1 lg:order-2 bg-[#0a0a0a] border border-white/5 rounded-[3rem] sm:rounded-[5rem] p-10 sm:p-24 shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(245,158,11,0.05),transparent_70%)]" />
              <div className="flex flex-col items-center mb-12 sm:mb-16">
                <AlertTriangle className="text-amber-500 mb-4" size={32} />
                <h3 className="text-3xl sm:text-5xl font-phonk text-white uppercase tracking-tight text-center">Code of Conduct</h3>
              </div>
              <ul className="space-y-6 sm:space-y-8 relative z-10">
                {HACKATHON_RULES.map((text, i) => (
                  <li key={i} className="flex gap-4 items-start group/li">
                    <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 shrink-0 group-hover/li:scale-125 transition-transform" />
                    <p className="font-sf text-xs sm:text-lg text-zinc-400 leading-relaxed font-black">{text}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-16 p-6 border border-amber-500/20 bg-amber-500/5 rounded-2xl flex items-center justify-center gap-4">
                <span className="font-sf text-[9px] sm:text-[11px] text-amber-500 uppercase tracking-[0.3em] font-black text-center">Protocol strictly enforced by High Council</span>
              </div>
            </div>
          </div>
        </section>

        {/* REGISTRATION SECTION */}
        <section id="register" className="max-w-7xl mx-auto px-6 py-16 sm:py-24">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-[2.5rem] sm:rounded-[4rem] p-10 sm:p-24 bg-white/5 border border-white/10 text-center overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-600/5 to-transparent pointer-events-none group-hover:opacity-40 transition-opacity" />
            <h2 className="text-2xl sm:text-7xl font-phonk text-white uppercase mb-6 sm:mb-10 leading-tight">Registration</h2>
            <div className="flex flex-col items-center gap-6 mb-12 sm:mb-16">
               <p className="font-sf text-zinc-400 max-w-3xl mx-auto text-xs sm:text-lg tracking-[0.1em] uppercase px-4 font-black">
                Sync complete. Finalize via Unstop. Secure your unit's access to the singularity today.
              </p>
              <div className="bg-amber-500/10 border border-amber-500/20 px-6 py-3 rounded-full flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                <span className="font-sf text-[10px] sm:text-xs text-amber-500 uppercase tracking-[0.2em] font-black">ZERO-RISK ENTRY: 100% CAPITAL RECOVERY GUARANTEED</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12 relative z-10">
              <motion.a 
                href="#" 
                target="_blank" 
                whileHover={{ scale: 1.05 }} 
                className="w-full sm:w-auto px-12 py-5 bg-white text-black font-phonk text-[10px] sm:text-sm uppercase tracking-[0.2em] rounded-full hover:bg-amber-500 hover:text-white transition-all duration-300 flex items-center justify-center gap-3 shadow-lg"
              >
                UNSTOP PORTAL <ExternalLink size={16} />
              </motion.a>
              <div className="text-center sm:text-left font-sf">
                <p className="text-white text-base sm:text-lg font-bold tracking-[0.2em] uppercase font-black">FEE: ₹350</p>
                <p className="text-zinc-500 text-[8px] sm:text-[10px] tracking-widest italic uppercase mt-1 font-black">Registration exclusively through unstop</p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* COORDINATORS SECTION */}
        <section id="coordinators" className="max-w-7xl mx-auto px-6 py-12 text-center">
          <h2 className="text-2xl sm:text-7xl font-phonk text-white uppercase mb-16 sm:mb-24 tracking-tighter">Coordinators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 max-w-4xl mx-auto">
            {COORDINATORS.map((person, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -10 }} 
                className="p-8 sm:p-12 rounded-[2.5rem] sm:rounded-[4rem] border border-white/10 bg-white/5 backdrop-blur-3xl group transition-all"
              >
                <div className="relative w-32 h-32 sm:w-56 sm:h-56 mx-auto mb-8 sm:mb-10">
                  <div className="absolute inset-0 bg-amber-600/10 rounded-full blur-2xl group-hover:scale-110 transition-transform opacity-0 group-hover:opacity-100" />
                  <img src={person.image} alt={person.name} className="w-full h-full rounded-full object-cover border border-white/10 grayscale group-hover:grayscale-0 transition-all duration-500 shadow-xl relative z-10" />
                </div>
                <h4 className="font-phonk text-lg sm:text-2xl text-white uppercase mb-2 tracking-widest">{person.name}</h4>
                <p className="font-sf text-[9px] sm:text-[11px] text-amber-500 font-bold uppercase tracking-[0.3em] mb-8 sm:mb-10">{person.role}</p>
                <a href={person.linkedin} className="inline-block p-4 rounded-full bg-white/5 border border-white/10 hover:bg-amber-600/20 transition-all active:scale-90">
                  <Linkedin size={18} className="text-amber-500" />
                </a>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <footer className="py-12 sm:py-16 text-center border-t border-white/5 bg-black/80 backdrop-blur-md">
        <h2 className="font-phonk text-3xl sm:text-6xl text-white uppercase opacity-5 tracking-[0.5em] mb-12 select-none">PARADOX</h2>
        <div className="flex justify-center gap-10 sm:gap-14 mb-12 opacity-30">
          {[Instagram, Twitter, Linkedin].map((Icon, i) => (
            <a key={i} href="#" className="text-white hover:text-amber-500 transition-all active:scale-75"><Icon size={22} /></a>
          ))}
        </div>
        <p className="font-sf text-zinc-800 text-[8px] sm:text-[10px] uppercase font-black tracking-[1em] px-4 opacity-50">SIESGST ACM CHAPTER // 2026 // SYNC_STABLE</p>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Keania+One&family=Syncopate:wght@700&display=swap');
        
        :root { 
          --font-phonk: 'Syncopate', sans-serif;
          --font-sf: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Inter", sans-serif;
          --font-keania: 'Keania One', cursive;
        }

        body { 
          background-color: #02040a; 
          color: white; 
          overflow-x: hidden; 
          -webkit-font-smoothing: antialiased; 
          margin: 0; 
          font-family: var(--font-sf); 
        }

        .font-phonk { font-family: var(--font-phonk); letter-spacing: -0.04em; }
        .font-sf { font-family: var(--font-sf); font-weight: 700; letter-spacing: 0.04em; }
        .font-keania { font-family: var(--font-keania); }
        
        .grain-texture { 
          background-image: url('https://grainy-gradients.vercel.app/noise.svg'); 
          filter: contrast(180%) brightness(120%); 
          pointer-events: none; 
          position: fixed;
          inset: 0;
          opacity: 0.02;
        }
        
        ::selection { background: rgba(217, 119, 6, 0.4); }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #02040a; }
        ::-webkit-scrollbar-thumb { background: #1a1c2e; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #d97706; }
        
        html { scroll-behavior: smooth; }
        .shadow-3xl { box-shadow: 0 40px 100px -30px rgba(0, 0, 0, 0.95); }
        
        canvas {
          image-rendering: -webkit-optimize-contrast;
          image-rendering: crisp-edges;
        }

        @media (max-width: 640px) {
          .font-phonk { letter-spacing: -0.02em; }
        }
      `}</style>
    </div>
  )
}

export default App;