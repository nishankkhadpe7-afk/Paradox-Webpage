import React, { useState, useEffect, useMemo, useRef, memo, useCallback } from 'react'
import {
  Trophy, Rocket, Zap, Globe, Shield, Cpu,
  Instagram, Linkedin, Clock, MoveRight,
  Menu, X as XIcon, ChevronDown, Fingerprint, Layers, Terminal, Mail, User, Users, Phone,
  Building2, UserPlus, Twitter, Info, MapPin, Calendar, CreditCard, ExternalLink, AlertTriangle,
  Lightbulb, Code, Target, MessageSquare, Monitor, FastForward, Award, CheckCircle2,
  Cpu as CpuIcon, Sparkles, Coins, Users2, GraduationCap, Laptop, Utensils, Search, Boxes, ClipboardCheck,
  FileText, ShieldAlert, Gift, Camera
} from 'lucide-react'
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useInView, useMotionValue } from 'framer-motion'

/**
 * NOTE: Using a placeholder for logo since local assets are unavailable in this environment.
 * The code is structured to use your 'logo' import logic.
 */
import logo from './assets/image 4.png';

// --- Data Constants ---
const ELIGIBILITY = [
  { icon: GraduationCap, title: 'Undergraduate Students', desc: 'Open to all undergraduate students. Eligible degrees include: B.Tech / B.E., B.Sc. (Computer Science / IT / related fields), and BCA.' },
  { icon: Globe, title: 'Open Access', desc: 'Students from any college and any department/branch are allowed. Inter-college teams / Inter-branch / Inter-specialization teams are allowed.' },
  { icon: UserPlus, title: 'Valid Identification', desc: 'Participants must carry a valid college ID card during the offline round.' }
]

const TEAM_RULES = [
  'Team size: 3 to 4 members',
  'Each participant can be part of only one team',
  'Once registered, team members cannot be changed',
  'No participant is allowed to join multiple teams'
]

const ROUNDS = [
  {
    id: '01',
    title: 'Round 1: Idea Submission (Online)',
    desc: 'Teams must submit an original idea/proposal clearly mentioning the problem statement, proposed solution, use of Agentic AI, and expected impact.',
    eval: 'Ideas will be evaluated on: Innovation, Feasibility, Technical Depth, Relevance, and Impact.',
    footer: 'Top 40 teams will be shortlisted for the offline round. Teams not shortlisted receive a 100% registration fee refund.'
  },
  {
    id: '02',
    title: 'Round 2: Offline Hackathon & MVP Development',
    desc: 'Shortlisted teams participate onsite at SIESGST. Problem statement will be revealed on the event day.',
    eval: 'Continuous coding duration: 6–7 hours. Teams must build and present a functional MVP (Minimum Viable Product).',
    footer: 'Mentors and judges will be available. Final evaluation conducted at the venue.'
  }
]

const JUDGING_CRITERIA = [
  { title: 'Innovation & Creativity', desc: 'Novelty of the concept and use of Agentic AI.' },
  { title: 'Technical Implementation', desc: 'Complexity, code quality, and logic of the solution.' },
  { title: 'Problem-Solving Approach', desc: 'Effectiveness of the solution to the problem statement.' },
  { title: 'Statement Relevance', desc: 'How well the solution addresses the revealed paradox.' },
  { title: 'Presentation & Demonstration', desc: 'Clarity of thought and professionalism in pitching.' }
]

const HACKATHON_RULES = [
  'Only original ideas and implementations are allowed.',
  'Pre-built or previously developed projects are strictly not allowed.',
  'Any form of plagiarism, misrepresentation, or unethical behavior results in immediate disqualification.',
  'Teams must be present for the entire offline round; no-shows will be disqualified.',
  'Participants must maintain discipline and professional conduct at all times.'
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
    const particleCount = window.innerWidth < 768 ? 80 : 200; 

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
          <h2 className="font-keania text-4xl sm:text-7xl text-white leading-[0.85] tracking-[0.05em] uppercase">PRIZE<br/>POOL</h2>
          <div className="w-12 sm:w-16 h-[2px] bg-amber-500/60 my-6 sm:my-8 rounded-full" />
          <p className="font-keania text-2xl sm:text-5xl text-white tracking-tight leading-none group-hover:text-amber-500 transition-colors duration-500 uppercase">15000/- Rs</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

const NavLogo = ({ className = "" }) => (
    <div className={`flex items-center gap-2 ${className}`}>
        <img 
            src={logo} 
            alt="Paradox Logo" 
            className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 object-contain brightness-110 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]"
        />
        <span className="font-phonk text-[10px] sm:text-xs tracking-widest text-white hidden xs:inline-block">PARA<span className="text-amber-500">DOX</span></span>
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
      setIsMobileMenuOpen(false) // Close menu on click
      setActiveSection(id) 
      element.scrollIntoView({ behavior: 'smooth' });
      // Release manual scroll lock after a delay
      setTimeout(() => { isScrollingManually.current = false }, 1000)
    }
  }, [])

  const navItems = useMemo(() => [
    { label: 'Home', id: 'home' },
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

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#02040a] text-zinc-300 selection:bg-amber-600/30 overflow-x-hidden">
      <div className="fixed inset-0 z-[100] pointer-events-none opacity-[0.015] grain-texture" />
      <SingularityCore scrollYProgress={scrollYProgress} />

      {/* --- Responsive Navbar --- */}
      <nav className="fixed top-0 left-0 right-0 z-[110] p-4 sm:p-6 lg:p-8 flex justify-center items-center pointer-events-auto">
        
        {/* Desktop Container */}
        <div className="hidden md:flex items-center gap-6">
            <motion.div 
                initial={{ opacity: 0, x: -20 }} 
                animate={{ opacity: 1, x: 0 }} 
                className="shrink-0"
            >
                <NavLogo />
            </motion.div>

            <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="relative flex items-center gap-1 p-1 bg-black/40 border border-white/5 backdrop-blur-md rounded-full shadow-2xl transform-gpu">
                {navItems.map((item) => (
                    <button 
                        key={item.id} 
                        onClick={() => scrollTo(item.id)} 
                        className={`relative px-4 lg:px-5 py-2.5 rounded-full text-[9px] lg:text-[11px] font-inter font-bold uppercase tracking-widest transition-all duration-300 z-10 hover:bg-white/5 ${activeSection === item.id ? 'text-white' : 'text-zinc-500 hover:text-zinc-200'}`}
                    >
                        {activeSection === item.id && <motion.div layoutId="active-pill" className="absolute inset-0 rounded-full bg-amber-600/90 -z-10 shadow-[0_0_15px_rgba(217,119,6,0.5)]" transition={{ type: "spring", stiffness: 400, damping: 35 }} />}
                        {item.label}
                    </button>
                ))}
            </motion.div>
        </div>

        {/* Mobile Navbar Shell */}
        <div className="md:hidden flex items-center justify-between w-full max-w-sm px-4 py-2.5 bg-black/60 border border-white/10 rounded-full backdrop-blur-xl shadow-2xl relative">
          <NavLogo className="scale-90 origin-left" />
          
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="p-2 text-white active:scale-90 transition-transform relative z-[130]"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <XIcon size={20} /> : <Menu size={20} />}
          </button>
          
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="fixed top-[70px] left-4 right-4 bg-black/95 border border-white/10 backdrop-blur-3xl rounded-[2.5rem] p-6 shadow-4xl flex flex-col gap-2 z-[125] overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
                {navItems.map((item) => (
                  <button 
                    key={item.id} 
                    onClick={() => scrollTo(item.id)} 
                    className={`w-full py-4 text-[10px] font-bold uppercase tracking-widest rounded-2xl border transition-all duration-200 flex items-center justify-center gap-3 ${activeSection === item.id ? 'bg-amber-600 border-amber-500 text-white shadow-lg shadow-amber-600/20' : 'bg-white/5 border-white/5 text-zinc-400 active:bg-white/10'}`}
                  >
                    {activeSection === item.id && <Sparkles size={14} />}
                    {item.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      <main className="relative z-10 w-full transform-gpu">
        <section id="home" className="min-h-[100dvh] flex flex-col items-center justify-center px-4 sm:px-6 text-center pt-24 sm:pt-40 pb-8 sm:pb-12">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="flex flex-col items-center w-full max-w-5xl">
            <span className="font-phonk text-amber-500/80 tracking-[0.2em] md:tracking-[0.4em] text-[7px] sm:text-xs font-bold uppercase mb-4 md:mb-8">SIESGST ACM CHAPTER PRESENTS</span>
            <div className="relative mb-6 md:mb-10 w-full">
              <h1 className="text-[clamp(2.2rem,12vw,11rem)] font-phonk text-white uppercase leading-none tracking-tighter drop-shadow-2xl">PARA<span className="text-amber-600">DOX</span></h1>
              <p className="mt-4 sm:mt-6 font-phonk text-zinc-400 text-[8px] sm:text-sm font-bold tracking-[0.1em] md:tracking-[0.2em] uppercase max-w-2xl mx-auto px-4 leading-relaxed italic opacity-80">CERTAIN ONLY IN UNCERTAINTY</p>
            </div>
            
            <LiquidGlassCard className="mb-2 px-4 sm:px-8 py-6 sm:py-10 rounded-[1.5rem] sm:rounded-[2.5rem] w-full max-w-4xl">
              <CountdownTimer targetDate="2026-03-05T09:00:00" />
            </LiquidGlassCard>

            <PrizePoolCard />
            
            <motion.button 
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} 
              onClick={() => scrollTo('register')} 
              className="px-8 sm:px-20 py-4 sm:py-5 bg-white text-black font-phonk uppercase tracking-[0.15em] rounded-full text-[8px] sm:text-sm hover:bg-amber-500 hover:text-white transition-all duration-300 shadow-xl active:scale-95 touch-manipulation"
            >
              Start Registration
            </motion.button>
          </motion.div>
        </section>

        <motion.section id="about" {...sectionAnimation} className="max-w-7xl mx-auto px-6 py-12 md:py-24">
          <div className="mb-10 md:mb-16 flex flex-col items-center text-center">
            <h2 className="text-2xl sm:text-5xl md:text-7xl font-phonk text-white uppercase mb-4">The Paradox</h2>
            <div className="w-16 sm:w-20 h-1 bg-amber-500 rounded-full" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
            <div className="space-y-6 md:space-y-8 font-jakarta text-zinc-300 leading-relaxed font-medium">
              <p className="text-base sm:text-xl">
                Paradox is an inter-collegiate Agentic AI Hackathon designed to bring together innovative minds to build intelligent, autonomous AI-driven solutions. The hackathon encourages creativity, problem-solving, and hands-on implementation using Agentic AI concepts and modern technologies.
              </p>
              <LiquidGlassCard className="p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem]">
                <p className="text-xs sm:text-sm text-zinc-400 font-semibold italic">
                  The problem statement will be declared on the hackathon day to ensure fairness and originality.
                </p>
              </LiquidGlassCard>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-6 font-jakarta">
              {[
                { icon: Calendar, label: 'Date', val: '5 Mar 2026' },
                { icon: MapPin, label: 'Venue', val: 'Navi Mumbai' },
                { icon: Clock, label: 'Duration', val: '10 Hours' },
                { icon: CreditCard, label: 'Fee', val: '₹350' }
              ].map((item, i) => (
                <LiquidGlassCard key={i} className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl flex flex-col gap-2 sm:gap-4">
                  <item.icon size={18} className="text-amber-500" />
                  <div>
                    <p className="font-phonk text-[8px] sm:text-[12px] text-zinc-500 uppercase tracking-widest mb-1">{item.label}</p>
                    <p className="text-[10px] sm:text-sm font-bold text-white whitespace-nowrap">{item.val}</p>
                  </div>
                </LiquidGlassCard>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section id="eligibility" {...sectionAnimation} className="max-w-7xl mx-auto px-6 py-12 md:py-24 md:bg-white/[0.01] md:rounded-[4rem]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">
            <div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-phonk text-white uppercase mb-8 md:mb-12">Eligibility</h2>
              <div className="space-y-6 md:space-y-10 font-jakarta">
                {ELIGIBILITY.map((item, i) => (
                  <div key={i} className="flex gap-4 md:gap-6 items-start">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-amber-500/10 flex items-center justify-center shrink-0">
                      <item.icon size={20} className="text-amber-500" />
                    </div>
                    <div>
                      <h4 className="font-phonk text-[10px] md:text-base text-white uppercase tracking-widest mb-2">{item.title}</h4>
                      <p className="text-xs md:text-base text-zinc-500 leading-relaxed font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-phonk text-white uppercase mb-8 md:mb-12">Teams</h2>
              <LiquidGlassCard className="p-6 md:p-10 rounded-[1.5rem] md:rounded-[3rem]">
                <ul className="space-y-4 md:space-y-6">
                  {TEAM_RULES.map((rule, i) => (
                    <li key={i} className="flex gap-4 items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                      <p className="text-xs sm:text-lg font-jakarta text-zinc-300 font-medium">{rule}</p>
                    </li>
                  ))}
                </ul>
              </LiquidGlassCard>
            </div>
          </div>
        </motion.section>

        <motion.section id="rounds" {...sectionAnimation} className="max-w-7xl mx-auto px-6 py-12 md:py-24 font-jakarta">
          <div className="mb-10 md:mb-16 flex flex-col items-center text-center">
            <h2 className="text-2xl sm:text-5xl md:text-7xl font-phonk text-white uppercase mb-4">Format</h2>
            <div className="w-16 sm:w-20 h-1 bg-amber-500 rounded-full" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12">
            {ROUNDS.map((round, i) => (
              <LiquidGlassCard key={i} className="group relative p-6 md:p-10 rounded-[1.5rem] md:rounded-[3rem] overflow-hidden hover:border-amber-500/30">
                <div className="absolute top-0 right-0 p-6 md:p-8 font-phonk text-4xl md:text-6xl text-white/5 select-none">{round.id}</div>
                <h3 className="font-phonk text-[10px] md:text-lg text-amber-500 uppercase tracking-widest mb-6 md:mb-8">{round.title}</h3>
                <div className="space-y-4 md:space-y-6 relative z-10">
                  <p className="text-xs md:text-base text-zinc-300 font-medium leading-relaxed">{round.desc}</p>
                  <div className="p-4 md:p-6 rounded-2xl bg-white/5 border border-white/5 text-[10px] md:text-base text-zinc-400 italic">{round.eval}</div>
                  <p className="text-[10px] md:text-sm text-amber-500 font-bold tracking-wide">{round.footer}</p>
                </div>
              </LiquidGlassCard>
            ))}
          </div>
        </motion.section>

        <motion.section id="rules" {...sectionAnimation} className="max-w-7xl mx-auto px-6 py-12 md:py-24 font-jakarta">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
            <LiquidGlassCard className="p-6 md:p-10 rounded-[1.5rem] md:rounded-[3rem]">
              <div className="flex items-center gap-4 mb-8">
                <ShieldAlert className="text-amber-500 w-6 h-6 md:w-8 md:h-8" />
                <h2 className="text-xl md:text-3xl font-phonk text-white uppercase">Protocol</h2>
              </div>
              <ul className="space-y-4 md:space-y-6">
                {HACKATHON_RULES.map((rule, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                    <p className="text-[10px] sm:text-base text-zinc-400 font-medium leading-relaxed">{rule}</p>
                  </li>
                ))}
              </ul>
            </LiquidGlassCard>
            <div className="space-y-4 md:space-y-8">
              <LiquidGlassCard className="p-6 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem]">
                <h3 className="font-phonk text-xs md:text-xl text-white uppercase mb-4 md:mb-6">Resources</h3>
                <p className="text-[10px] md:text-sm text-zinc-400 mb-6 font-medium">Bring your own hardware. Permitted:</p>
                <div className="flex flex-wrap gap-2">
                  {['GenAI Tools', 'APIs', 'OSS Libs'].map((tag, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[8px] md:text-sm font-bold uppercase tracking-widest">{tag}</span>
                  ))}
                </div>
              </LiquidGlassCard>
              <LiquidGlassCard className="p-6 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem]">
                <h3 className="font-phonk text-xs md:text-xl text-white uppercase mb-4 md:mb-6">Rewards</h3>
                <ul className="space-y-3 text-[10px] md:text-sm text-zinc-400 font-medium">
                  <li className="flex items-center gap-3"><Award size={14} className="text-amber-500" /> Participation Certificates</li>
                  <li className="flex items-center gap-3"><Trophy size={14} className="text-amber-500" /> Merit for Winners</li>
                  <li className="flex items-center gap-3"><Gift size={14} className="text-amber-500" /> Exclusive Swag Bags</li>
                </ul>
              </LiquidGlassCard>
            </div>
          </div>
        </motion.section>

        <motion.section id="judging" {...sectionAnimation} className="max-w-7xl mx-auto px-6 py-12 md:py-24 md:bg-white/[0.01] md:rounded-[4rem] font-jakarta">
          <div className="mb-10 md:mb-16 flex flex-col items-center text-center">
            <h2 className="text-2xl sm:text-5xl md:text-7xl font-phonk text-white uppercase mb-4">Judging</h2>
            <div className="w-16 sm:w-20 h-1 bg-amber-500 rounded-full" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {JUDGING_CRITERIA.map((item, i) => (
              <LiquidGlassCard key={i} className="p-6 md:p-8 rounded-[1.2rem] md:rounded-[2rem] hover:border-amber-500/20">
                <h4 className="font-phonk text-[9px] md:text-base text-white uppercase tracking-widest mb-3 md:mb-4">{item.title}</h4>
                <p className="text-[11px] md:text-base text-zinc-500 font-medium leading-relaxed">{item.desc}</p>
              </LiquidGlassCard>
            ))}
          </div>
        </motion.section>

        <motion.section id="register" {...sectionAnimation} className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-24 font-jakarta">
          <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
            <LiquidGlassCard className="relative rounded-[2rem] md:rounded-[4rem] p-8 sm:p-12 md:p-24 text-center overflow-hidden transform-gpu">
              <h2 className="text-2xl sm:text-5xl md:text-7xl font-phonk text-white uppercase mb-6 md:mb-10 leading-tight">Access Key</h2>
              <div className="flex flex-col items-center gap-6 md:gap-8 mb-10 md:mb-16">
                <p className="text-zinc-400 max-w-2xl mx-auto text-xs sm:text-lg tracking-wide font-medium leading-relaxed">
                  Sync complete. Finalize via Unstop. Secure your unit's access to the singularity today. Check your encrypted mail for updates.
                </p>
                <div className="flex flex-wrap justify-center gap-4 md:gap-10 text-[8px] md:text-xs text-zinc-500 font-bold uppercase tracking-widest">
                  <span className="flex items-center gap-2"><Utensils size={14} className="text-amber-500" /> Nutrients Included</span>
                  <span className="flex items-center gap-2"><Globe size={14} className="text-amber-500" /> Open Network</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8 relative z-10">
                <motion.a 
                  href="#" target="_blank" 
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-10 py-5 md:px-12 md:py-6 bg-white text-black font-phonk text-[9px] md:text-sm uppercase tracking-[0.2em] rounded-full hover:bg-amber-500 hover:text-white transition-all duration-300 flex items-center justify-center gap-3 shadow-2xl touch-manipulation"
                >
                  REGISTER NOW <ExternalLink size={14} />
                </motion.a>
                <div className="text-center sm:text-left">
                  <p className="text-white text-base md:text-2xl font-extrabold tracking-wide uppercase">FEE: ₹350</p>
                  <p className="text-zinc-500 text-[10px] md:text-[13px] italic font-semibold">Full refund if not selected</p>
                </div>
              </div>
            </LiquidGlassCard>
          </motion.div>
        </motion.section>

        <motion.section id="coordinators" {...sectionAnimation} className="max-w-7xl mx-auto px-6 py-12 md:py-24 text-center font-jakarta">
          <div className="mb-10 md:mb-16 flex flex-col items-center text-center">
            <h2 className="text-2xl sm:text-5xl md:text-7xl font-phonk text-white uppercase mb-4">Contacts</h2>
            <div className="w-16 sm:w-20 h-1 bg-amber-500 rounded-full" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto">
            {COORDINATORS.map((person, i) => (
              <motion.div key={i} whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 300, damping: 25 }} className="group">
                <LiquidGlassCard className="p-8 md:p-12 rounded-[2rem] md:rounded-[3rem]">
                  <div className="relative w-28 h-28 sm:w-48 md:w-56 sm:h-48 md:h-56 mx-auto mb-6 md:mb-8 overflow-hidden rounded-full">
                    <img src={person.image} alt={person.name} className="w-full h-full object-cover border-4 border-white/10 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 shadow-2xl" />
                  </div>
                  <h4 className="font-phonk text-base md:text-2xl text-white uppercase mb-2 tracking-widest">{person.name}</h4>
                  <p className="text-[9px] md:text-xs text-amber-500 font-bold uppercase tracking-[0.3em] mb-6 md:mb-8">{person.role}</p>
                  <a href={person.linkedin} className="inline-block p-3 md:p-4 rounded-full bg-white/5 border border-white/10 hover:bg-amber-600/20 transition-all active:scale-90">
                    <Linkedin className="text-amber-500 w-[18px] md:w-[20px] h-[18px] md:h-[20px]" />
                  </a>
                </LiquidGlassCard>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>

      <footer className="py-16 md:py-24 text-center border-t border-white/5 bg-black/80 backdrop-blur-md font-jakarta">
        <h2 className="font-phonk text-2xl sm:text-5xl md:text-7xl text-white uppercase opacity-15 tracking-[0.4em] md:tracking-[0.6em] mb-8 md:mb-12 select-none pointer-events-none">PARADOX</h2>
        <div className="flex justify-center gap-6 md:gap-10 mb-8 md:mb-12 opacity-60">
          {[Instagram, Twitter, Linkedin].map((Icon, i) => (
            <a key={i} href="#" className="text-white hover:text-amber-500 transition-all active:scale-75">
              <Icon className="w-5 md:w-6 h-5 md:h-6" />
            </a>
          ))}
        </div>
        <p className="text-zinc-500 text-[8px] md:text-[10px] uppercase font-bold tracking-[0.3em] md:tracking-[0.6em] opacity-60 px-4 leading-loose">SIESGST ACM CHAPTER // EST. 2026 // NAVI MUMBAI </p>
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
          scroll-padding-top: 80px; 
          overflow-y: scroll;
        }

        @media (min-width: 768px) {
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
        
        /* Custom Scrollbar */
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #02040a; }
        ::-webkit-scrollbar-thumb { background: #1a1c2e; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #amber-600; }

        .transform-gpu {
          transform: translateZ(0);
          backface-visibility: hidden;
        }

        /* Prevent text zoom on input for mobile */
        input, button { font-size: inherit; }
        
        /* Fix for mobile height issues */
        .min-h-screen { min-height: 100vh; min-height: 100dvh; }
      `}</style>
    </div>
  )
}
export default App;