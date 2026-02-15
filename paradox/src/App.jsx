import React, { useState, useEffect, useMemo, useRef, memo, useCallback } from 'react'
import {
  Trophy, Rocket, Zap, Globe, Shield, Cpu,
  Instagram, Linkedin, Clock, MoveRight,
  Menu, X as XIcon, ChevronDown, Fingerprint, Layers, Terminal, Mail, User, Users, Phone,
  Building2, UserPlus, Twitter, Info, MapPin, Calendar, CreditCard, ExternalLink, AlertTriangle,
  Lightbulb, Code, Target, MessageSquare, Monitor, FastForward, Award, CheckCircle2,
  Cpu as CpuIcon, Sparkles, Coins, Users2, GraduationCap, Laptop, Utensils, Search, Boxes, ClipboardCheck,
  FileText, ShieldAlert, Gift, Camera, Scale, ShieldCheck, HeartHandshake, ArrowUpRight
} from 'lucide-react'
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useInView, useMotionValue } from 'framer-motion';

// --- Assets ---
// Note: Relative imports of local assets may fail in certain environments.
// Replace the empty string below with your actual image path or a hosted URL.
import logo from './assets/image4.png';

// --- Data Constants ---
const ELIGIBILITY = [
  { 
    icon: GraduationCap, 
    title: 'Academic Standing', 
    desc: 'Open to all undergraduate students. Eligible degrees: B.Tech / B.E., B.Sc. (CS / IT / Related), and BCA.' 
  },
  { 
    icon: Globe, 
    title: 'Open Access', 
    desc: 'Students from any college, department, or branch are allowed. Inter-college and inter-branch teams are permitted.' 
  },
  { 
    icon: UserPlus, 
    title: 'Valid Identification', 
    desc: 'All participants must carry a valid college ID card for verification during the offline round at SIESGST.' 
  }
]

const TEAM_RULES = [
  'Team size: 3 to 4 members',
  'Participants can only be part of one team',
  'Team members cannot be changed after registration',
  'Joining multiple teams results in disqualification'
]

const ROUNDS = [
  {
    id: '01',
    title: 'Round 1: Idea Submission (Online)',
    desc: 'Submit a proposal detailing the problem statement, solution, use of Agentic AI, and expected impact.',
    eval: 'Evaluated on Innovation, Feasibility, Technical Depth, Relevance, and Impact.',
    footer: 'Top 40 teams advance. Non-shortlisted teams receive a 100% registration fee refund.'
  },
  {
    id: '02',
    title: 'Round 2: Offline Hackathon & MVP',
    desc: 'A 6–7 hour continuous coding sprint at SIESGST. The specific paradox will be revealed on the spot.',
    eval: 'Build and present a functional Minimum Viable Product (MVP). Mentors & judges will assist.',
    footer: 'Final presentations and evaluation conducted onsite at the venue.'
  }
]

const JUDGING_CRITERIA = [
  { title: 'Innovation & Creativity', desc: 'Novelty of the concept and unique use of Agentic AI.' },
  { title: 'Technical Implementation', desc: 'Complexity, code quality, and logic of the MVP.' },
  { title: 'Problem-Solving', desc: 'How effectively the solution addresses the problem statement.' },
  { title: 'Paradox Relevance', desc: 'Alignment with the specific paradox revealed on the day.' },
  { title: 'Presentation', desc: 'Clarity of thought and professionalism in the final pitch.' }
]

const HACKATHON_RULES = [
  'Only original ideas and implementations are allowed.',
  'Pre-built or previously developed projects are strictly forbidden.',
  'Disqualification for plagiarism, misrepresentation, or unethical behavior.',
  'Teams must be present for the entire offline round; no-shows are disqualified.',
  'Participants must maintain discipline and professional conduct at all times.'
]

const PROTOCOLS = [
  { icon: ShieldCheck, title: 'Code of Conduct', desc: 'Ethical behavior is mandatory. Any venue damage or malpractice during evaluation leads to direct disqualification.' },
  { icon: Camera, title: 'Media & Rights', desc: 'Participants grant permission for photography/videography. Organizers reserve rights to modify or postpone the event.' },
  { icon: HeartHandshake, title: 'Personal Responsibility', desc: 'Travel and personal belongings are the responsibility of participants. Stay updated via Unstop and email.' }
]

const COORDINATORS = [
  {
    name: 'Human A',
    role: 'Event Head',
    linkedin: '#',
    image: 'https://static.vecteezy.com/system/resources/previews/006/487/917/original/man-avatar-icon-free-vector.jpg'
  },
  {
    name: 'Human B',
    role: 'Event Head',
    linkedin: '#',
    image: 'https://static.vecteezy.com/system/resources/previews/014/194/215/original/avatar-icon-human-a-person-s-badge-social-media-profile-symbol-the-symbol-of-a-person-vector.jpg'
  }
]

// --- Helper Components ---

const LiquidGlassCard = memo(({ children, className = "" }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current || window.innerWidth < 768) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    cardRef.current.style.setProperty('--mouse-x', `${x}%`);
    cardRef.current.style.setProperty('--mouse-y', `${y}%`);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.1)] liquid-glass-effect transform-gpu ${className}`}
    >
      {children}
    </motion.div>
  );
});

const InteractiveStars = memo(() => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    let animationFrameId;
    const particles = [];
    const particleCount = window.innerWidth < 768 ? 60 : 200;

    class Star {
      constructor(w, h) { this.init(w, h); }
      init(w, h) {
        this.baseX = Math.random() * w;
        this.baseY = Math.random() * h;
        this.x = this.baseX;
        this.y = this.baseY;
        this.size = Math.random() * 1.2 + 0.4;
        this.depth = Math.random() * 0.6 + 0.2;
        this.alpha = Math.random() * 0.6 + 0.3;
        this.driftX = (Math.random() - 0.5) * 0.1;
        this.driftY = (Math.random() - 0.5) * 0.1;
      }
      update(w, h, mx, my) {
        this.baseX += this.driftX;
        this.baseY += this.driftY;
        if (this.baseX < 0) this.baseX = w;
        if (this.baseX > w) this.baseX = 0;
        if (this.baseY < 0) this.baseY = h;
        if (this.baseY > h) this.baseY = 0;
        const centerX = w / 2;
        const centerY = h / 2;
        const targetX = this.baseX + (mx - centerX) * (this.depth * 0.05);
        const targetY = this.baseY + (my - centerY) * (this.depth * 0.05);
        this.x += (targetX - this.x) * 0.1;
        this.y += (targetY - this.y) * 0.1;
      }
      draw(context) {
        context.fillStyle = `rgba(255, 255, 255, ${this.alpha * 0.3})`;
        context.beginPath();
        context.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
        context.fill();

        context.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fill();
      }
    }

    const setupCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const displayWidth = window.innerWidth, displayHeight = window.innerHeight;
      canvas.width = displayWidth * dpr; canvas.height = displayHeight * dpr;
      ctx.scale(dpr, dpr);
      mouseRef.current = { x: displayWidth / 2, y: displayHeight / 2 };
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) { particles.push(new Star(displayWidth, displayHeight)); }
    };

    const animate = () => {
      const w = window.innerWidth, h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);
      const { x: mx, y: my } = mouseRef.current;
      for (let i = 0; i < particles.length; i++) {
        particles[i].update(w, h, mx, my);
        particles[i].draw(ctx);
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', setupCanvas);
    const handleMove = (e) => {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      mouseRef.current = { x: clientX, y: clientY };
    }
    window.addEventListener('mousemove', handleMove, { passive: true });
    window.addEventListener('touchmove', handleMove, { passive: true });
    setupCanvas(); animate();
    return () => {
      window.removeEventListener('resize', setupCanvas);
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full opacity-70 pointer-events-none z-0 transform-gpu" />;
});

const SingularityCore = memo(({ scrollYProgress }) => {
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 45, damping: 30, mass: 1 })
  const scale = useTransform(smoothProgress, [0, 0.45, 1], [0.85, 1.1, 2.5])
  const rotateScroll = useTransform(smoothProgress, [0, 1], [0, 10])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden transform-gpu translate-z-0">
      <div className="absolute inset-0 bg-[#02040a]" />
      <InteractiveStars />
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_50%_50%,rgba(245,158,11,0.06)_0%,rgba(16,24,48,0.1)_40%,transparent_75%)]" />
      <motion.div style={{ scale, rotate: rotateScroll }} className="absolute inset-0 flex items-center justify-center will-change-transform transform-gpu origin-center z-10">
        <div className="relative flex items-center justify-center">
          <div className="absolute w-[90vw] h-[90vw] md:w-[60vw] md:h-[60vw] max-w-[650px] max-h-[650px] rounded-full bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.06)_0%,transparent_75%)] blur-md animate-slow-pulse" />

          <motion.div animate={{ rotate: 360 }} transition={{ duration: 80, repeat: Infinity, ease: "linear" }} className="absolute w-[80vw] h-[30vw] md:w-[45vw] md:h-[15vw] max-w-[550px] max-h-[180px] rounded-[100%] border-[2px] md:border-[6px] border-amber-500/10 blur-sm opacity-30" style={{ transform: "rotateX(75deg) rotateY(10deg)" }} />

          <div className="absolute w-[45vw] h-[45vw] md:w-[31vw] md:h-[31vw] max-w-[335px] max-h-[335px] rounded-full bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.4)_0%,rgba(245,158,11,0.1)_40%,transparent_70%)] blur-[10px]" />

          <div className="relative flex items-center justify-center translate-z-0">
            <div className="absolute w-[42vw] h-[42vw] md:w-[30.5vw] md:h-[30.5vw] max-w-[324px] max-h-[324px] rounded-full bg-amber-600/40 blur-[8px] shadow-[0_0_30px_rgba(245,158,11,0.6)]" />

            <div className="w-[40vw] h-[40vw] md:w-[30vw] md:h-[30vw] max-w-[320px] max-h-[320px] rounded-full bg-black z-50 relative border border-amber-500/70 shadow-[inset_0_0_80px_rgba(0,0,0,1)] overflow-hidden">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute inset-[-50%] bg-[conic-gradient(from_0deg,transparent_0%,rgba(245,158,11,0.08)_20%,transparent_40%,rgba(16,24,48,0.08)_60%,transparent_80%,transparent_100%)] opacity-20 blur-sm" />
              <div className="absolute top-[10%] left-[15%] w-[35%] h-[35%] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04)_0%,transparent_80%)] blur-sm" />
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,transparent_42%,rgba(245,158,11,0.02)_48%,rgba(245,158,11,0.08)_58%,transparent_72%)]" />
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,transparent_50%,#000_92%)] opacity-95" />
            </div>
          </div>
          <div className="absolute w-1 h-[70vh] bg-gradient-to-b from-transparent via-amber-500/5 to-transparent blur-sm" />
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
      if (distance < 0) { clearInterval(timer) }
      else {
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
  const items = [{ v: timeLeft.days, l: "Days" }, { v: timeLeft.hours, l: "Hrs" }, { v: timeLeft.minutes, l: "Min" }, { v: timeLeft.seconds, l: "Sec" }];
  return (
    <div className="flex items-center justify-center flex-wrap gap-4 sm:gap-6 md:gap-10 font-phonk text-2xl sm:text-4xl md:text-7xl text-white tracking-tighter tabular-nums uppercase">
      {items.map((item, idx) => (
        <div key={idx} className="flex flex-col items-center">
          <div className="leading-none">{item.v.toString().padStart(2, '0')}</div>
          <span className="font-jakarta text-[8px] sm:text-[10px] text-zinc-500 tracking-[0.2em] mt-1 sm:mt-3 capitalize">{item.l}</span>
        </div>
      ))}
    </div>
  )
})

const PrizePoolCard = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-100, 100], [10, -10]);
  const rotateY = useTransform(mouseX, [-100, 100], [-10, 10]);
  const sprRotateX = useSpring(rotateX, { damping: 35, stiffness: 200 });
  const sprRotateY = useSpring(rotateY, { damping: 35, stiffness: 200 });

  function handleMouseMove(event) {
    if (window.innerWidth < 768) return;
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set(((event.clientX - rect.left) / rect.width - 0.5) * 160);
    mouseY.set(((event.clientY - rect.top) / rect.height - 0.5) * 160);
  }

  return (
    <motion.div initial={{ scale: 0.95, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} className="relative flex flex-col items-center my-8 md:my-12 px-4 w-full" style={{ perspective: 1200 }}>
      <motion.div onMouseMove={handleMouseMove} onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
        style={{ rotateX: sprRotateX, rotateY: sprRotateY, transformStyle: "preserve-3d" }}
        className="relative w-full max-w-[260px] sm:max-w-[340px] aspect-[4/5] bg-white/[0.04] backdrop-blur-2xl rounded-[2rem] sm:rounded-[2.5rem] border border-white/10 flex flex-col items-center justify-center p-6 sm:p-10 overflow-hidden shadow-2xl group hover:border-amber-500/40 transform-gpu"
      >
        <div className="flex flex-col items-center text-center">
          <h2 className="font-keania text-4xl sm:text-7xl text-white leading-[0.85] tracking-[0.05em] uppercase">PRIZE<br />POOL</h2>
          <div className="w-12 sm:w-16 h-[2px] bg-amber-500/60 my-6 sm:my-8 rounded-full" />
          <p className="font-keania text-2xl sm:text-5xl text-white tracking-tight leading-none group-hover:text-amber-500 transition-colors duration-500 uppercase">15000/- Rs</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

/**
 * NavLogo Component
 * Strictly uses the logo asset without overlapping text as requested.
 */
const NavLogo = ({ className = "" }) => (
  <div className={`flex items-center justify-center h-full ${className}`}>
    {logo && (
      <img 
        src={logo} 
        alt="Paradox Logo" 
        className="h-8 sm:h-10 md:h-11 w-auto object-contain brightness-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]"
        onError={(e) => {
          e.target.style.display = 'none';
        }}
      />
    )}
  </div>
)

const App = () => {
  const containerRef = useRef(null)
  const [activeSection, setActiveSection] = useState('home')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const isScrollingManually = useRef(false)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] })

  const scrollTo = useCallback((id) => {
    const element = document.getElementById(id)
    if (element) {
      isScrollingManually.current = true
      setIsMobileMenuOpen(false)
      setActiveSection(id)
      element.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => { isScrollingManually.current = false }, 1000)
    }
  }, [])

  const navItems = useMemo(() => [
    { label: 'About', id: 'about' },
    { label: 'Rounds', id: 'rounds' },
    { label: 'Rules', id: 'rules' },
    { label: 'Judging', id: 'judging' },
    { label: 'Registration', id: 'register' },
    { label: 'Coordinators', id: 'coordinators' }
  ], [])

  useEffect(() => {
    let timeoutId;
    const handleScroll = () => {
      if (isScrollingManually.current) return

      if (timeoutId) return;
      timeoutId = setTimeout(() => {
        const sections = navItems.map(item => document.getElementById(item.id))
        sections.push(document.getElementById('home'))
        const scrollPosition = window.scrollY + 200;

        const current = sections.find(section => {
          if (!section) return false;
          const top = section.offsetTop;
          const height = section.offsetHeight;
          return scrollPosition >= top && scrollPosition < top + height;
        });

        if (current && current.id !== activeSection) setActiveSection(current.id)
        timeoutId = null;
      }, 50);
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (timeoutId) clearTimeout(timeoutId);
    }
  }, [activeSection, navItems])

  const sectionAnimation = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }

  // Variants for Mobile Nav Animations
  const menuVariants = {
    closed: { opacity: 0, y: -20, scale: 0.95 },
    open: { 
      opacity: 1, 
      y: 15, 
      scale: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
        ease: "easeOut",
        duration: 0.4
      }
    },
    exit: { 
      opacity: 0, 
      y: -10, 
      scale: 0.98,
      transition: { staggerChildren: 0.05, staggerDirection: -1 } 
    }
  }

  const itemVariants = {
    closed: { opacity: 0, x: -10 },
    open: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 10 }
  }

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#02040a] text-zinc-300 selection:bg-amber-600/30 overflow-x-hidden">
      <div className="fixed inset-0 z-[100] pointer-events-none opacity-[0.015] grain-texture" />
      <SingularityCore scrollYProgress={scrollYProgress} />

      {/* --- Unified Navigation System --- */}
      <nav className="fixed top-4 md:top-8 left-0 right-0 z-[110] px-4 sm:px-10 flex justify-center pointer-events-none">

        {/* PC/Desktop Layout */}
        <div className="hidden lg:flex items-center justify-between w-full max-w-7xl h-20 px-10 bg-black/50 border border-white/10 backdrop-blur-3xl rounded-full shadow-2xl pointer-events-auto">
          <button onClick={() => scrollTo('home')} className="flex items-center justify-center h-full hover:opacity-80 transition-opacity">
            <NavLogo />
          </button>

          <div className="flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`relative px-5 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center ${activeSection === item.id ? 'text-white' : 'text-zinc-500 hover:text-zinc-200 hover:bg-white/5'}`}
              >
                {activeSection === item.id && (
                  <motion.div
                    layoutId="active-desktop-nav"
                    className="absolute inset-0 rounded-full bg-amber-600 shadow-[0_0_20px_rgba(217,119,6,0.4)] -z-10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile/Tablet Layout */}
        <div className="lg:hidden flex items-center justify-between w-full max-w-2xl h-14 sm:h-16 px-6 bg-black/70 border border-white/10 rounded-full backdrop-blur-3xl shadow-2xl pointer-events-auto relative">
          <button onClick={() => scrollTo('home')} className="flex items-center justify-center h-full">
            <NavLogo className="scale-90" />
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2.5 text-white active:scale-90 transition-transform relative z-[130] flex items-center justify-center"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <XIcon size={24} /> : <Menu size={24} />}
          </button>

          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                variants={menuVariants}
                initial="closed"
                animate="open"
                exit="exit"
                className="absolute top-full left-0 right-0 mt-4 bg-[#0a0c14]/95 border border-white/10 backdrop-blur-3xl rounded-[2.5rem] p-4 sm:p-6 shadow-[0_32px_64px_rgba(0,0,0,0.8)] flex flex-col gap-2 z-[125] overflow-hidden"
              >
                {/* Visual Accent */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-amber-600/50 to-transparent rounded-full opacity-50" />
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-amber-600/5 blur-[60px] rounded-full pointer-events-none" />

                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    variants={itemVariants}
                    onClick={() => scrollTo(item.id)}
                    className={`group w-full py-4 px-6 text-[11px] font-bold uppercase tracking-[0.2em] rounded-2xl border transition-all duration-300 flex items-center justify-between relative overflow-hidden ${
                      activeSection === item.id 
                        ? 'bg-amber-600 border-amber-500 text-white shadow-lg shadow-amber-600/20' 
                        : 'bg-white/[0.03] border-white/5 text-zinc-400 active:bg-white/10 active:scale-[0.98]'
                    }`}
                  >
                    <div className="flex items-center gap-4 relative z-10">
                      <span className={`font-phonk text-[9px] opacity-40 ${activeSection === item.id ? 'text-white' : 'text-amber-500'}`}>
                        0{index + 1}
                      </span>
                      <span>{item.label}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 relative z-10">
                      {activeSection === item.id ? (
                         <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      ) : (
                        <ArrowUpRight size={14} className="opacity-20 group-hover:opacity-100 group-hover:text-amber-500 transition-all transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      )}
                    </div>

                    {/* Subtle Hover Reveal */}
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-600/0 via-amber-600/5 to-amber-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </motion.button>
                ))}

                {/* Mobile Menu Footer Branding */}
                <div className="mt-4 pt-4 border-t border-white/5 text-center">
                  <span className="font-phonk text-[7px] text-zinc-600 uppercase tracking-[0.5em]">Paradox Protocol v1.0</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      <main className="relative z-10 w-full transform-gpu">
        {/* --- Home Section --- */}
        <section id="home" className="min-h-[100dvh] flex flex-col items-center justify-center px-6 sm:px-10 text-center pt-32 sm:pt-48 pb-12">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="flex flex-col items-center w-full max-w-5xl">
            <span className="font-phonk text-amber-500/80 tracking-[0.2em] md:tracking-[0.4em] text-[8px] sm:text-xs font-bold uppercase mb-4 md:mb-8">SIESGST ACM CHAPTER PRESENTS</span>
            <div className="relative mb-8 md:mb-12 w-full flex flex-col items-center justify-center">
              <h1 className="text-[clamp(2.5rem,14vw,12rem)] font-phonk text-white uppercase leading-none tracking-tighter drop-shadow-2xl text-center mr-[-0.05em]">
                PARA<span className="text-amber-600">DOX</span>
              </h1>
              <p className="mt-4 sm:mt-8 font-phonk text-zinc-400 text-[9px] sm:text-sm font-bold tracking-[0.1em] md:tracking-[0.2em] uppercase max-w-2xl mx-auto px-4 leading-relaxed italic opacity-80 text-center">
                CERTAIN ONLY IN UNCERTAINTY
              </p>
            </div>

            <LiquidGlassCard className="mb-4 px-6 sm:px-10 py-8 sm:py-12 rounded-[2rem] sm:rounded-[3rem] w-full max-w-4xl">
              <CountdownTimer targetDate="2026-03-05T09:00:00" />
            </LiquidGlassCard>

            <PrizePoolCard />

            <motion.button
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={() => scrollTo('register')}
              className="px-12 sm:px-24 py-5 sm:py-6 bg-white text-black font-phonk uppercase tracking-[0.2em] rounded-full text-[9px] sm:text-sm hover:bg-amber-500 hover:text-white transition-all duration-300 shadow-2xl active:scale-95 touch-manipulation mt-4"
            >
              Start Registration
            </motion.button>
          </motion.div>
        </section>

        {/* --- About Section --- */}
        <motion.section id="about" {...sectionAnimation} className="max-w-7xl mx-auto px-6 sm:px-10 py-16 md:py-32">
          <div className="mb-12 md:mb-20 flex flex-col items-center text-center">
            <h2 className="text-3xl sm:text-6xl md:text-8xl font-phonk text-white uppercase mb-4">Event Details</h2>
            <div className="w-20 sm:w-24 h-1.5 bg-amber-500 rounded-full" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-start">
            <div className="space-y-8 md:space-y-12 font-jakarta text-zinc-300 leading-relaxed font-medium">
              <p className="text-lg sm:text-2xl">
                Paradox is an inter-collegiate Agentic AI Hackathon designed to bring together innovative minds to build intelligent, autonomous AI-driven solutions. The hackathon encourages creativity, problem-solving, and hands-on implementation using modern technologies.
              </p>
              <LiquidGlassCard className="p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem]">
                <p className="text-sm sm:text-lg text-zinc-400 font-semibold italic">
                  The problem statement will be declared on the hackathon day to ensure fairness and originality.
                </p>
              </LiquidGlassCard>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:gap-8 font-jakarta">
              {[
                { icon: Calendar, label: 'Date', val: '5 Mar 2026' },
                { icon: MapPin, label: 'Venue', val: 'SIESGST, Navi Mumbai' },
                { icon: Clock, label: 'Duration', val: '10 Hours Total' },
                { icon: CreditCard, label: 'Fee', val: '₹350' }
              ].map((item, i) => (
                <LiquidGlassCard key={i} className="p-6 sm:p-8 rounded-3xl flex flex-col gap-3 sm:gap-6">
                  <item.icon size={24} className="text-amber-500" />
                  <div>
                    <p className="font-phonk text-[9px] sm:text-[13px] text-zinc-500 uppercase tracking-widest mb-1">{item.label}</p>
                    <p className="text-xs sm:text-lg font-bold text-white whitespace-nowrap">{item.val}</p>
                  </div>
                </LiquidGlassCard>
              ))}
            </div>
          </div>
        </motion.section>

        {/* --- Eligibility & Teams --- */}
        <motion.section id="eligibility" {...sectionAnimation} className="max-w-7xl mx-auto px-6 sm:px-10 py-16 md:py-32 lg:bg-white/[0.01] lg:rounded-[5rem]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
            <div>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-phonk text-white uppercase mb-12 md:mb-16">Eligibility</h2>
              <div className="space-y-8 md:space-y-12 font-jakarta">
                {ELIGIBILITY.map((item, i) => (
                  <div key={i} className="flex gap-6 md:gap-8 items-start">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl md:rounded-3xl bg-amber-500/10 flex items-center justify-center shrink-0">
                      <item.icon size={24} className="text-amber-500" />
                    </div>
                    <div>
                      <h4 className="font-phonk text-xs md:text-lg text-white uppercase tracking-widest mb-3">{item.title}</h4>
                      <p className="text-sm md:text-lg text-zinc-500 leading-relaxed font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-phonk text-white uppercase mb-12 md:mb-16">Teams</h2>
              <LiquidGlassCard className="p-8 md:p-12 rounded-[2.5rem] md:rounded-[4rem]">
                <ul className="space-y-6 md:space-y-8">
                  {TEAM_RULES.map((rule, i) => (
                    <li key={i} className="flex gap-6 items-center">
                      <div className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                      <p className="text-sm sm:text-xl font-jakarta text-zinc-300 font-medium">{rule}</p>
                    </li>
                  ))}
                </ul>
              </LiquidGlassCard>
            </div>
          </div>
        </motion.section>

        {/* --- Rounds --- */}
        <motion.section id="rounds" {...sectionAnimation} className="max-w-7xl mx-auto px-6 sm:px-10 py-16 md:py-32 font-jakarta">
          <div className="mb-12 md:mb-20 flex flex-col items-center text-center">
            <h2 className="text-3xl sm:text-6xl md:text-8xl font-phonk text-white uppercase mb-4">Format</h2>
            <div className="w-20 sm:w-24 h-1.5 bg-amber-500 rounded-full" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
            {ROUNDS.map((round, i) => (
              <LiquidGlassCard key={i} className="group relative p-8 md:p-14 rounded-[2.5rem] md:rounded-[4rem] overflow-hidden hover:border-amber-500/30">
                <div className="absolute top-0 right-0 p-8 md:p-12 font-phonk text-5xl md:text-8xl text-white/5 select-none">{round.id}</div>
                <h3 className="font-phonk text-[11px] md:text-xl text-amber-500 uppercase tracking-widest mb-8 md:mb-10">{round.title}</h3>
                <div className="space-y-6 md:space-y-8 relative z-10">
                  <p className="text-sm md:text-xl text-zinc-300 font-medium leading-relaxed">{round.desc}</p>
                  <div className="p-6 md:p-8 rounded-[2rem] bg-white/5 border border-white/5 text-xs md:text-lg text-zinc-400 italic leading-relaxed">{round.eval}</div>
                  <p className="text-xs md:text-base text-amber-500 font-bold tracking-widest bg-amber-500/10 px-4 py-2 rounded-lg inline-block">{round.footer}</p>
                </div>
              </LiquidGlassCard>
            ))}
          </div>
        </motion.section>

        {/* --- Rules & Protocols --- */}
        <motion.section id="rules" {...sectionAnimation} className="max-w-7xl mx-auto px-6 sm:px-10 py-16 md:py-32 font-jakarta">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">
            <LiquidGlassCard className="p-8 md:p-14 rounded-[2.5rem] md:rounded-[4rem]">
              <div className="flex items-center gap-6 mb-10">
                <h2 className="text-2xl md:text-4xl font-phonk text-white uppercase">Rules</h2>
              </div>
              <ul className="space-y-6 md:space-y-8">
                {HACKATHON_RULES.map((rule, i) => (
                  <li key={i} className="flex gap-6 items-start">
                    <div className="w-2 h-2 rounded-full bg-amber-500 mt-2.5 shrink-0" />
                    <p className="text-sm sm:text-lg text-zinc-400 font-medium leading-relaxed">{rule}</p>
                  </li>
                ))}
              </ul>
            </LiquidGlassCard>
            <div className="space-y-8 md:space-y-12">
              <LiquidGlassCard className="p-8 md:p-12 rounded-[2rem] md:rounded-[3rem]">
                <h3 className="font-phonk text-[10px] md:text-2xl text-white uppercase mb-6 md:mb-10 tracking-widest">Resources</h3>
                <p className="text-sm md:text-lg text-zinc-400 mb-8 font-medium leading-relaxed">Bring your own laptops. Food and internet provided.</p>
                <div className="flex flex-wrap gap-3">
                  {['GenAI Tools', 'Agentic APIs', 'OSS Libraries', 'LangGraph'].map((tag, i) => (
                    <span key={i} className="px-5 py-2.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[9px] md:text-sm font-bold uppercase tracking-widest">{tag}</span>
                  ))}
                </div>
              </LiquidGlassCard>
              <LiquidGlassCard className="p-8 md:p-12 rounded-[2rem] md:rounded-[3rem]">
                <h3 className="font-phonk text-[10px] md:text-2xl text-white uppercase mb-6 md:mb-10 tracking-widest">Rewards</h3>
                <ul className="space-y-4 md:space-y-6 text-sm md:text-lg text-zinc-400 font-medium">
                  <li className="flex items-center gap-4"><Trophy size={20} className="text-amber-500" /> Cash Prizes for Winners</li>
                  <li className="flex items-center gap-4"><CheckCircle2 size={20} className="text-amber-500" /> Merit & Participation Certificates</li>
                  <li className="flex items-center gap-4"><Gift size={20} className="text-amber-500" /> Exclusive Swag Bags</li>
                </ul>
              </LiquidGlassCard>
            </div>
          </div>
          
          <div className="mt-12 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            {PROTOCOLS.map((protocol, i) => (
              <LiquidGlassCard key={i} className="p-8 rounded-[2rem]">
                <protocol.icon size={24} className="text-amber-500 mb-6" />
                <h4 className="font-phonk text-[10px] md:text-base text-white uppercase mb-4 tracking-widest">{protocol.title}</h4>
                <p className="text-sm text-zinc-500 leading-relaxed">{protocol.desc}</p>
              </LiquidGlassCard>
            ))}
          </div>
        </motion.section>

        {/* --- Judging --- */}
        <motion.section id="judging" {...sectionAnimation} className="max-w-7xl mx-auto px-6 sm:px-10 py-16 md:py-32 lg:bg-white/[0.01] lg:rounded-[5rem] font-jakarta">
          <div className="mb-12 md:mb-20 flex flex-col items-center text-center">
            <h2 className="text-3xl sm:text-6xl md:text-8xl font-phonk text-white uppercase mb-4">Judging</h2>
            <div className="w-20 sm:w-24 h-1.5 bg-amber-500 rounded-full" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            {JUDGING_CRITERIA.map((item, i) => (
              <LiquidGlassCard key={i} className="p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] hover:border-amber-500/20 transition-all duration-500">
                <h4 className="font-phonk text-[10px] md:text-lg text-white uppercase tracking-widest mb-5 leading-relaxed">{item.title}</h4>
                <p className="text-sm md:text-lg text-zinc-500 font-medium leading-relaxed">{item.desc}</p>
              </LiquidGlassCard>
            ))}
          </div>
        </motion.section>

        {/* --- Registration Section --- */}
        <motion.section id="register" {...sectionAnimation} className="max-w-7xl mx-auto px-6 sm:px-10 py-16 md:py-32 font-jakarta">
          <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
            <LiquidGlassCard className="relative rounded-[3rem] md:rounded-[5rem] p-10 sm:p-16 md:p-28 text-center overflow-hidden transform-gpu">
              <div className="w-full flex justify-center">
              <h2 className="text-[clamp(1.5rem,8vw,7rem)] font-phonk text-white uppercase mb-8 md:mb-12 leading-tight tracking-tighter text-center">Registration
              </h2>
              </div>
              <div className="flex flex-col items-center gap-8 md:gap-12 mb-12 md:mb-20">
                <p className="text-zinc-400 max-w-3xl mx-auto text-sm sm:text-2xl tracking-wide font-medium leading-relaxed">
                  Secure your unit's access via Unstop. Final selection grants access to the offline paradox at SIESGST. 
                </p>
                <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-[10px] md:text-sm text-zinc-500 font-bold uppercase tracking-[0.3em]">
                  <span className="flex items-center gap-3"><Utensils size={18} className="text-amber-500" /> Meals Included</span>
                  <span className="flex items-center gap-3"><Globe size={18} className="text-amber-500" /> Open Network</span>
                </div>
              </div>
              <div className="flex flex-col lg:flex-row items-center justify-center gap-8 md:gap-12 relative z-10">
                <motion.a
                  href="#" target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  className="w-full lg:w-auto px-12 py-6 md:px-16 md:py-8 bg-white text-black font-phonk text-[10px] md:text-lg uppercase tracking-[0.25em] rounded-full hover:bg-amber-500 hover:text-white transition-all duration-500 flex items-center justify-center gap-4 shadow-3xl touch-manipulation"
                >
                  Unstop <ExternalLink size={20} />
                </motion.a>
                <div className="text-center lg:text-left">
                  <p className="text-white text-xl md:text-4xl font-extrabold tracking-widest uppercase">FEE: ₹350</p>
                  <p className="text-zinc-500 text-xs md:text-lg italic font-semibold mt-1">Full refund if Round 1 is not cleared</p>
                </div>
              </div>
            </LiquidGlassCard>
          </motion.div>
        </motion.section>

        {/* --- Coordinators Section --- */}
        <motion.section id="coordinators" {...sectionAnimation} className="max-w-7xl mx-auto px-6 sm:px-10 py-16 md:py-32 text-center font-jakarta">
          <div className="mb-12 md:mb-20 flex flex-col items-center text-center">
            <h2 className="text-3xl sm:text-6xl md:text-8xl font-phonk text-white uppercase mb-4">Coordinators</h2>
            <div className="w-20 sm:w-24 h-1.5 bg-amber-500 rounded-full" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 md:gap-16 max-w-5xl mx-auto">
            {COORDINATORS.map((person, i) => (
              <motion.div key={i} whileHover={{ y: -10 }} transition={{ type: "spring", stiffness: 300, damping: 25 }} className="group">
                <LiquidGlassCard className="p-10 md:p-16 rounded-[3rem] md:rounded-[4rem]">
                  <div className="relative w-32 h-32 sm:w-56 sm:h-56 mx-auto mb-8 md:mb-12 overflow-hidden rounded-full ring-4 ring-white/5 group-hover:ring-amber-500/30 transition-all duration-500">
                    <img src={person.image} alt={person.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 shadow-2xl" />
                  </div>
                  <h4 className="font-phonk text-lg md:text-3xl text-white uppercase mb-3 tracking-[0.1em]">{person.name}</h4>
                  <p className="text-[10px] md:text-sm text-amber-500 font-bold uppercase tracking-[0.4em] mb-8 md:mb-12">{person.role}</p>
                  <a href={person.linkedin} className="inline-block p-4 md:p-5 rounded-full bg-white/5 border border-white/10 hover:bg-amber-600 shadow-xl transition-all active:scale-90">
                    <Linkedin className="text-white w-6 h-6 md:w-7 md:h-7" />
                  </a>
                </LiquidGlassCard>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>

      {/* --- Footer --- */}
      <footer className="py-20 md:py-32 text-center border-t border-white/5 bg-black/90 backdrop-blur-xl font-jakarta">
        <h2 className="font-phonk text-3xl sm:text-6xl md:text-9xl text-white uppercase opacity-10 tracking-[0.5em] mb-12 select-none pointer-events-none">PARADOX</h2>
        <div className="flex justify-center gap-8 md:gap-16 mb-12 md:mb-20 opacity-60">
          {[Instagram, Twitter, Linkedin].map((Icon, i) => (
            <a key={i} href="#" className="text-white hover:text-amber-500 hover:scale-125 transition-all active:scale-90">
              <Icon className="w-6 md:w-8 h-6 md:h-8" />
            </a>
          ))}
        </div>
        <div className="px-6 space-y-4">
          <p className="text-zinc-500 text-[10px] md:text-[13px] uppercase font-bold tracking-[0.4em] md:tracking-[0.8em] opacity-60 leading-loose">SIESGST ACM CHAPTER // EST. 2026 // NAVI MUMBAI </p>
          <p className="text-zinc-700 text-[8px] md:text-[10px] font-medium tracking-[0.1em]">© 2026 PARADOX. ALL RIGHTS RESERVED.</p>
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Keania+One&family=Syncopate:wght@700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;700;800&display=swap');
        
        :root { 
          --font-phonk: 'Syncopate', sans-serif; 
          --font-keania: 'Keania One', cursive; 
          --font-jakarta: 'Plus Jakarta Sans', sans-serif;
          --font-inter: 'Inter', sans-serif;
        }

        html { 
          scroll-behavior: smooth; 
          scroll-padding-top: 60px; 
          overflow-y: scroll;
        }

        @media (min-width: 1024px) {
          html { scroll-padding-top: 100px; }
        }

        body { 
          background-color: #02040a; 
          color: white; 
          overflow-x: hidden; 
          margin: 0; 
          font-family: var(--font-jakarta); 
          -webkit-font-smoothing: antialiased; 
          text-rendering: optimizeLegibility;
        }

        .font-phonk { font-family: var(--font-phonk); }
        .font-keania { font-family: var(--font-keania); }
        .font-jakarta { font-family: var(--font-jakarta); }
        .font-inter { font-family: var(--font-inter); }
        
        .grain-texture { 
          background-image: url('https://grainy-gradients.vercel.app/noise.svg'); 
          filter: contrast(180%) brightness(120%); 
          position: fixed; inset: 0; opacity: 0.015; 
        }

        @keyframes slow-pulse { 
            0%, 100% { opacity: 0.3; transform: scale(1); } 
            50% { opacity: 0.5; transform: scale(1.05); } 
        }
        .animate-slow-pulse { animation: slow-pulse 12s ease-in-out infinite; }
        
        .liquid-glass-effect {
          --mouse-x: 50%;
          --mouse-y: 50%;
          position: relative;
          will-change: transform, background;
        }

        @media (min-width: 768px) {
            .liquid-glass-effect:hover {
                background: radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.03) 45%, rgba(255,255,255,0.01) 100%) !important;
            }
        }

        ::selection { background: rgba(217, 119, 6, 0.4); }
        
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #02040a; }
        ::-webkit-scrollbar-thumb { background: #1a1c2e; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #d97706; }

        .transform-gpu {
          transform: translateZ(0);
          backface-visibility: hidden;
        }

        .min-h-screen { min-height: 100vh; min-height: 100dvh; }
      `}</style>
    </div>
  )
}
export default App;