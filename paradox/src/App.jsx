import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Trophy, Rocket, Zap, CheckCircle2, 
  Mail, Linkedin, ExternalLink, Globe, Shield, Cpu,
  ChevronRight, Info, Users, Activity, Sparkles,
  BarChart3, Radio, Phone, User,
  Instagram, Twitter, Github, ChevronDown
} from 'lucide-react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';

// --- Assets ---
// Points to public/astronaut.png
const ASTRONAUT_IMG = "../public/astronaut.png"; 

// --- Data Constants ---
const TIMELINE = [
  { time: "09:00 AM", title: "Arrival & Sync", description: "Collect cosmic entry kits and settle into the docking station." },
  { time: "10:30 AM", title: "The Singularity", description: "Opening Ceremony and the grand reveal of this year's paradox." },
  { time: "11:30 AM", title: "Phase 1: Expansion", description: "Teams ignite their engines and begin the ideation phase." },
  { time: "01:30 PM", title: "Fueling Window", description: "Mandatory refueling break for all units." },
  { time: "02:30 PM", title: "Phase 2: Event Horizon", description: "Intense development and hacking begins in the void." },
  { time: "06:00 PM", title: "Mission Control", description: "Expert mentors provide guidance to steer your trajectory." },
];

const PRIZES = [
  { 
    rank: "Titan Winner", 
    amount: "₹50,000", 
    color: "from-blue-400 to-indigo-600", 
    icon: <Trophy size={48} />,
    perks: ["Paid Internships", "Cyber Kit V1", "Physical Artifact", "1TB Cloud Grid"]
  },
  { 
    rank: "Nova Runner Up", 
    amount: "₹30,000", 
    color: "from-purple-400 to-pink-600", 
    icon: <Trophy size={40} />,
    perks: ["Internship Access", "Tech Goodies", "Silver Artifact", "500GB Cloud Grid"]
  },
  { 
    rank: "Pulsar Third", 
    amount: "₹15,000", 
    color: "from-slate-400 to-slate-700", 
    icon: <Trophy size={32} />,
    perks: ["Network Access", "Swag Box", "Bronze Artifact", "200GB Cloud Grid"]
  },
];

const COORDINATORS = [
  { 
    name: "John Doe", 
    role: "Event Commander", 
    phone: "+91 98765 43210", 
    email: "john.commander@paradox.tech",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256&h=256&fit=crop"
  },
  { 
    name: "Jane Smith", 
    role: "Technical Architect", 
    phone: "+91 87654 32109", 
    email: "jane.arch@paradox.tech",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&h=256&fit=crop"
  },
  { 
    name: "Alex Vex", 
    role: "Design Specialist", 
    phone: "+91 76543 21098", 
    email: "alex.design@paradox.tech",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&h=256&fit=crop"
  },
];

// --- Sub-Components ---

const Digit = ({ value }) => (
  <div className="relative overflow-hidden h-10 sm:h-16 w-6 sm:w-10 flex justify-center">
    <AnimatePresence mode="popLayout">
      <motion.span
        key={value}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ duration: 0.4, ease: "circOut" }}
        className="absolute font-mono font-black text-white text-3xl sm:text-6xl tabular-nums"
      >
        {value}
      </motion.span>
    </AnimatePresence>
  </div>
);

const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(targetDate).getTime() - now;
      if (distance < 0) {
        clearInterval(timer);
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const TimeUnit = ({ value, label }) => {
    const digits = value.toString().padStart(2, '0').split('');
    return (
      <div className="flex flex-col items-center px-2 sm:px-6">
        <div className="flex">
          {digits.map((d, i) => (
            <Digit key={i} value={d} />
          ))}
        </div>
        <span className="text-[7px] sm:text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] mt-2">
          {label}
        </span>
      </div>
    );
  };

  return (
    <div className="flex items-center justify-center divide-x divide-white/10 border-y border-white/5 py-8 bg-white/[0.01] backdrop-blur-sm">
      <TimeUnit value={timeLeft.days} label="Days" />
      <TimeUnit value={timeLeft.hours} label="Hours" />
      <TimeUnit value={timeLeft.minutes} label="Mins" />
      <TimeUnit value={timeLeft.seconds} label="Secs" />
    </div>
  );
};

const SectionHeading = ({ children, subtitle }) => (
  <div className="mb-12 sm:mb-20 text-center px-4">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {subtitle && <p className="text-blue-500 font-mono tracking-[0.3em] sm:tracking-[0.5em] text-[8px] sm:text-[10px] uppercase mb-4 font-black">{subtitle}</p>}
      <h2 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter text-white uppercase italic leading-tight sm:leading-none">
        {children}
      </h2>
      <div className="w-24 sm:w-40 h-1 sm:h-1.5 bg-gradient-to-r from-transparent via-blue-600 to-transparent mx-auto mt-6 sm:mt-8 rounded-full shadow-[0_0_30px_rgba(37,99,235,1)]" />
    </motion.div>
  </div>
);

const CustomHUDSelect = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={containerRef}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`group w-full bg-black/60 border border-white/10 rounded-xl px-5 py-4 text-white flex items-center justify-between cursor-pointer transition-all ${isOpen ? 'border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.2)]' : 'hover:border-blue-500/50'}`}
      >
        <div className="flex flex-col items-start gap-1">
          <span className="text-[8px] uppercase tracking-[0.3em] text-blue-500 font-black">Sector Locked</span>
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-100">{value}</span>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <ChevronDown size={18} className="text-blue-500" />
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute z-[110] top-full mt-3 w-full bg-black/95 backdrop-blur-3xl border border-blue-500/30 rounded-2xl overflow-hidden shadow-2xl"
          >
            {options.map((option, i) => (
              <div 
                key={option}
                onClick={() => { onChange(option); setIsOpen(false); }}
                className={`px-8 py-4 transition-all flex items-center justify-between group cursor-pointer ${value === option ? 'bg-blue-600/20' : 'hover:bg-white/5'}`}
              >
                <span className="text-[10px] font-black uppercase text-white group-hover:text-blue-400">{option}</span>
                {value === option && <CheckCircle2 size={16} className="text-blue-500" />}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const PrizeCard = ({ prize, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="relative h-[400px] w-full perspective-1000 z-10"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="relative w-full h-full transition-all duration-700 preserve-3d cursor-pointer"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
      >
        <div className="absolute inset-0 backface-hidden p-8 rounded-[3rem] border border-blue-500/30 flex flex-col items-center justify-center text-center bg-blue-600/10 shadow-[0_0_80px_rgba(59,130,246,0.15)] backdrop-blur-xl">
          <div className={`w-20 h-20 rounded-2xl flex items-center justify-center bg-gradient-to-br ${prize.color} text-white mb-6 shadow-2xl`}>
            {prize.icon}
          </div>
          <h3 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em] mb-3">{prize.rank}</h3>
          <div className="text-4xl font-black text-white italic">{prize.amount}</div>
        </div>

        <div className="absolute inset-0 backface-hidden p-8 rounded-[3rem] border border-blue-500/50 flex flex-col items-center justify-center text-center rotate-y-180 bg-blue-900/40 shadow-[0_0_100px_rgba(59,130,246,0.3)] backdrop-blur-2xl">
          <h3 className="text-xs font-black text-blue-300 uppercase tracking-[0.3em] mb-6 italic underline">Bounty Manifest</h3>
          <div className="w-full space-y-3">
            {prize.perks.map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-slate-100 text-xs font-black uppercase tracking-widest text-left">
                <CheckCircle2 size={12} className="text-blue-500 shrink-0" /> <span className="truncate">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const App = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [missionSector, setMissionSector] = useState("Quantum Code (Logical Ops)");

  const contentOpacity = useTransform(scrollYProgress, [0, 0.85, 0.92], [1, 1, 0]);
  const bhScale = useTransform(scrollYProgress, [0, 0.85, 0.98, 1], [1, 1.4, 40, 45]);
  const bhOpacity = useTransform(scrollYProgress, [0.85, 0.95], [0.4, 1]);
  const bhRotation = useTransform(scrollYProgress, [0, 1], [0, 180]);
  
  const astroOpacity = useTransform(scrollYProgress, [0.97, 0.99, 1], [0, 1, 1]);
  const astroScale = useTransform(scrollYProgress, [0.97, 1], [0.7, 0.9]);
  const astroY = useTransform(scrollYProgress, [0.97, 1], [40, 0]);

  const smoothBHScale = useSpring(bhScale, { stiffness: 40, damping: 25 });

  const stars = useMemo(() => [...Array(80)].map((_, i) => ({
    size: Math.random() * 2 + 0.5,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    duration: 3 + Math.random() * 7
  })), []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div ref={containerRef} className="relative bg-[#010206] text-slate-200 selection:bg-blue-600/40 font-sans cursor-crosshair overflow-x-hidden">
      
      {/* PERSISTENT BACKGROUND LAYER */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(15,35,90,0.2),transparent_90%)]" />
        {stars.map((star, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full opacity-20"
            style={{ width: star.size, height: star.size, top: star.top, left: star.left }}
            animate={{ opacity: [0.1, 0.6, 0.1] }}
            transition={{ duration: star.duration, repeat: Infinity }}
          />
        ))}

        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div style={{ scale: smoothBHScale, rotate: bhRotation }} className="relative flex items-center justify-center">
            <motion.div style={{ opacity: bhOpacity }} className="w-48 h-48 sm:w-80 sm:h-80 rounded-full bg-black shadow-[0_0_150px_80px_rgba(37,99,235,0.4)] z-10" />
            <motion.div className="absolute w-[150%] h-[150%] border-t-[3px] border-b-[3px] border-blue-500/20 rounded-[48%] blur-[3px]" animate={{ rotate: 360 }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }} />
          </motion.div>
        </div>

        <motion.div 
          style={{ opacity: astroOpacity, scale: astroScale, y: astroY }} 
          className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-black"
        >
            <div className="relative w-full max-w-xl flex items-center justify-center">
              <img 
                src={ASTRONAUT_IMG} 
                alt="Paradox Astronaut" 
                className="w-full h-auto drop-shadow-[0_0_80px_rgba(59,130,246,0.6)] object-contain" 
              />
              <div className="absolute inset-0 bg-blue-600/10 blur-[100px] rounded-full -z-10" />
            </div>
        </motion.div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-8 left-0 right-0 z-[100] flex justify-center px-4">
        <div className="flex items-center gap-2 p-2 rounded-2xl bg-black/70 backdrop-blur-3xl border border-white/10 shadow-2xl overflow-x-auto no-scrollbar">
          {['home', 'events', 'timeline', 'prizes', 'register'].map((id) => (
            <button key={id} onClick={() => scrollToSection(id)} className="px-6 py-3 rounded-lg transition-all text-xs font-black uppercase tracking-widest text-slate-500 hover:text-white group shrink-0">
              {id}
            </button>
          ))}
        </div>
      </nav>

      <motion.div style={{ opacity: contentOpacity }} className="relative z-10">
        
        <section id="home" className="flex flex-col items-center justify-center min-h-screen px-4 py-20 text-center relative">
          <motion.div initial={{ scale: 0.95, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} className="relative z-20 w-full max-w-6xl mx-auto">
            <div className="relative z-10 py-12">
              <motion.div initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }}>
                <span className="text-blue-500 font-mono tracking-[1.5em] text-[10px] font-black uppercase mb-4 block animate-pulse">AUTHENTICATING_USER_749</span>
                <h1 className="text-6xl sm:text-9xl font-black text-white tracking-tighter leading-tight italic uppercase">PARADOX</h1>
              </motion.div>

              {/* Countdown Component */}
              <motion.div 
                initial={{ opacity: 0 }} 
                whileInView={{ opacity: 1 }} 
                transition={{ delay: 0.4 }}
                className="mt-12 w-full max-w-4xl mx-auto"
              >
                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.5em] mb-6 italic">Mission_Commences_In:</div>
                <CountdownTimer targetDate="2026-03-15T09:00:00" />
              </motion.div>

              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(59, 130, 246, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('events')}
                className="mt-12 px-12 py-5 bg-white text-black font-black uppercase tracking-[0.3em] rounded-full transition-all flex items-center gap-4 text-xs mx-auto shadow-2xl"
              >
                INITIALIZE <Rocket size={16} />
              </motion.button>
            </div>
          </motion.div>
        </section>

        <section id="events" className="max-w-7xl mx-auto px-4 py-40 min-h-screen">
          <SectionHeading subtitle="Mission Segments">Events description</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Quantum Code", desc: "Solve paradoxes that break standard logic. Optimization at light speed.", icon: <Cpu /> },
              { title: "Nexus UX", desc: "Interfaces for high-gravity environments. Where beauty meets pure utility.", icon: <Globe /> },
              { title: "Gravity Hack", desc: "A 24-hour engineering sprint building tech that defies conventional physics.", icon: <Shield /> }
            ].map((event, i) => (
              <motion.div key={i} whileHover={{ y: -10 }} className="p-10 rounded-[2.5rem] bg-black/50 backdrop-blur-3xl border border-white/10 hover:border-blue-500/50 transition-all">
                <div className="w-16 h-16 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-400 mb-6">{event.icon}</div>
                <h3 className="text-3xl font-black mb-4 text-white uppercase italic">{event.title}</h3>
                <p className="text-slate-400 mb-8">{event.desc}</p>
                <button onClick={() => scrollToSection('register')} className="text-[10px] font-black text-blue-400 uppercase tracking-widest flex items-center gap-2">MISSION BRIEF <ChevronRight size={14} /></button>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="timeline" className="max-w-4xl mx-auto px-4 py-40">
          <SectionHeading subtitle="Mission Parameters">Timeline page</SectionHeading>
          <div className="space-y-6">
            {TIMELINE.map((item, i) => (
              <motion.div key={i} initial={{ x: -20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} className="flex gap-8 group">
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-blue-600 border-[4px] border-[#010206] shadow-[0_0_15px_rgba(37,99,235,0.8)]" />
                  {i !== TIMELINE.length - 1 && <div className="w-[1px] h-full bg-blue-600/20" />}
                </div>
                <div className="pb-20">
                  <span className="px-4 py-2 rounded-full bg-blue-600/10 text-blue-400 font-mono text-[10px] font-black uppercase tracking-widest border border-blue-500/30">{item.time}</span>
                  <h4 className="text-3xl font-black text-white mt-4 uppercase italic">{item.title}</h4>
                  <p className="text-slate-500 text-lg mt-2">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="prizes" className="max-w-7xl mx-auto px-4 py-40 text-center">
          <SectionHeading subtitle="Mission Rewards">Prize pool</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {PRIZES.map((prize, i) => (
              <PrizeCard key={i} prize={prize} index={i} />
            ))}
          </div>
        </section>

        <section id="register" className="max-w-4xl mx-auto px-4 py-40">
          <SectionHeading subtitle="Establish Link">Registration process</SectionHeading>
          <div className="p-10 sm:p-20 rounded-[4rem] bg-black/60 backdrop-blur-3xl border border-white/10 shadow-3xl">
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <input type="text" className="w-full bg-black/60 border border-white/10 rounded-2xl px-8 py-5 text-white focus:border-blue-500 outline-none transition-all" placeholder="TEAM_NAME" />
                <input type="tel" className="w-full bg-black/60 border border-white/10 rounded-2xl px-8 py-5 text-white focus:border-blue-500 outline-none transition-all" placeholder="COMMANDER_CONTACT" />
              </div>
              <CustomHUDSelect options={["Quantum Code", "Nexus UX", "Gravity Hack"]} value={missionSector} onChange={setMissionSector} />
              <button className="w-full py-6 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-[0.4em] rounded-2xl shadow-xl transition-all flex items-center justify-center gap-4">AUTHORIZE ENTRY <Zap size={18} /></button>
            </form>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-40 grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div className="space-y-10">
            <div className="flex items-center gap-4 text-white font-black uppercase tracking-widest border-b border-white/10 pb-6 text-2xl italic">
              <Shield className="text-blue-500" /> Mission Protocols
            </div>
            <ul className="space-y-8">
              {[
                "Units must consist of 2-4 synchronized members.",
                "All artifacts must be created within the event window.",
                "The High Council's logic is final.",
                "Unauthorized replication leads to DQ."
              ].map((rule, i) => (
                <motion.li key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="flex gap-6 text-slate-400 text-base font-bold italic">
                  <span className="text-blue-500 font-mono text-xl">[0{i+1}]</span> {rule}
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="space-y-10">
            <div className="flex items-center gap-4 text-white font-black uppercase tracking-widest border-b border-white/10 pb-6 text-2xl italic">
              <Users className="text-blue-500" /> Mission Control
            </div>
            <div className="grid grid-cols-1 gap-6">
              {COORDINATORS.map((person, i) => (
                <motion.div key={i} whileHover={{ x: 15 }} className="p-6 rounded-[2.5rem] bg-black/40 backdrop-blur-xl border border-white/5 hover:border-blue-500/30 transition-all flex items-center gap-8">
                  <div className="w-24 h-24 rounded-[2rem] overflow-hidden border-2 border-blue-500/30 shadow-lg">
                    <img src={person.image} alt={person.name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-black text-white text-xl uppercase italic leading-none">{person.name}</h5>
                    <p className="text-[10px] text-blue-500 font-mono uppercase tracking-[0.2em] mt-2">{person.role}</p>
                    <a href={`tel:${person.phone}`} className="text-slate-500 text-xs mt-3 flex items-center gap-2 hover:text-blue-400 transition-colors"><Phone size={12}/> {person.phone}</a>
                  </div>
                  <div className="flex gap-2">
                    <a href="#" className="p-4 rounded-2xl bg-white/5 hover:bg-blue-600 transition-all text-white"><Linkedin size={18} /></a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <footer className="py-40 text-center">
          <h2 className="font-black tracking-[0.6em] text-4xl text-white uppercase italic">PARADOX</h2>
          <p className="text-slate-500 text-xs mt-6 uppercase font-black tracking-widest">SIESGST ACM — LOGIC_CONFIRMED</p>
        </footer>
      </motion.div>

      {/* THE SINGULARITY VOID */}
      <div className="h-[200vh] w-full pointer-events-none relative">
          <div className="sticky top-0 h-screen flex items-end justify-center pb-20">
             <motion.div style={{ opacity: useTransform(scrollYProgress, [0.95, 0.98], [1, 0]) }} className="text-slate-600 text-[10px] font-black tracking-[1em] uppercase animate-pulse">Entering_Singularity</motion.div>
          </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
};

export default App;