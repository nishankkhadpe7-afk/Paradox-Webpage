import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * Argus Orbital Background - Ultra-Smooth Optimization
 * - Optimized for 60fps+ by shifting filter processing to GPU.
 * - Synchronized drawing/lifting sequence.
 * - Hardware-accelerated transforms.
 */

const App = () => {
  const [phase, setPhase] = useState('drawing'); // 'drawing' | 'completing'
  
  const drawDuration = 3.0; 
  const completeDuration = 3.8; 

  // Full 360 circle path
  const circlePath = "M 500,500 m -450,0 a 450,450 0 1,1 900,0 a 450,450 0 1,1 -900,0";

  useEffect(() => {
    // Start morphing/lifting slightly before draw finishes to maintain momentum
    const timer = setTimeout(() => {
      setPhase('completing');
    }, drawDuration * 800); 

    return () => clearTimeout(timer);
  }, []);

  // Cinematic "Weighted" Easing
  const drawEase = [0.16, 1, 0.3, 1];
  const liftEase = [0.23, 1, 0.32, 1]; // Quintic-style ease for smoothness

  return (
    <div className="relative min-h-screen w-full bg-[#010102] overflow-hidden flex items-center justify-center">
      
      {/* 1. Global Atmospheric Depth (Hardware Accelerated) */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden" style={{ perspective: '1000px' }}>
        <motion.div 
          animate={{
            y: phase === 'drawing' ? '40%' : '0%',
            opacity: phase === 'drawing' ? 0.2 : 0.6,
            scale: phase === 'drawing' ? 1.8 : 1.1
          }}
          transition={{ duration: completeDuration, ease: liftEase }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-blue-600/10 rounded-full blur-[100px]" 
          style={{ transform: 'translateZ(0)' }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_40%,_#000_100%)]" />
      </div>

      {/* 2. The Orbital System */}
      <motion.div 
        initial={{ y: '50vh', scale: 1.8 }}
        animate={{
          y: phase === 'drawing' ? '50vh' : '0vh', 
          scale: phase === 'drawing' ? 1.8 : 0.45,  
        }}
        transition={{ 
          duration: completeDuration, 
          ease: liftEase,
        }}
        style={{ 
          willChange: 'transform, opacity',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden'
        }}
        className="relative w-full max-w-5xl aspect-square pointer-events-none flex items-center justify-center overflow-visible"
      >
        <svg 
          viewBox="0 0 1000 1000" 
          preserveAspectRatio="xMidYMid meet"
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <defs>
            {/* Optimized Taper Mask - Simple gradient, no complex filters */}
            <mask id="smoothOrbitalMask">
              <linearGradient id="maskGrad" x1="0%" y1="100%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="black" />
                <stop offset="15%" stopColor="white" />
                <stop offset="50%" stopColor="white" />
                <stop offset="85%" stopColor="white" />
                <stop offset="100%" stopColor="black" />
              </linearGradient>
              <motion.path
                d={circlePath}
                stroke="white"
                strokeWidth="60"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ 
                  pathLength: phase === 'drawing' ? 0.5 : 1.0 
                }}
                transition={{ 
                  duration: phase === 'drawing' ? drawDuration : completeDuration, 
                  ease: phase === 'drawing' ? drawEase : liftEase,
                  delay: phase === 'drawing' ? 0.5 : 0
                }}
              />
            </mask>
          </defs>

          {/* LAYER 1: The Liquid Underglow (Using CSS Blur for speed) */}
          <motion.path
            d={circlePath}
            stroke="#0ea5e9"
            strokeWidth="12"
            strokeLinecap="round"
            mask="url(#smoothOrbitalMask)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: phase === 'drawing' ? 0.5 : 1.0,
              opacity: phase === 'drawing' ? 0.4 : [0.3, 0.6, 0.3]
            }}
            transition={{ 
              pathLength: { 
                duration: phase === 'drawing' ? drawDuration : completeDuration, 
                ease: phase === 'drawing' ? drawEase : liftEase,
                delay: phase === 'drawing' ? 0.5 : 0
              },
              opacity: phase === 'completing' ? { duration: 4, repeat: Infinity, ease: "easeInOut" } : { duration: 0.5 }
            }}
            style={{ 
              filter: 'blur(12px)', 
              transform: 'translateZ(0)',
              willChange: 'opacity' 
            }}
          />

          {/* LAYER 2: Main Structural Light Path (Using CSS drop-shadow) */}
          <motion.path
            d={circlePath}
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            mask="url(#smoothOrbitalMask)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: phase === 'drawing' ? 0.5 : 1.0,
              opacity: 1
            }}
            transition={{ 
              duration: phase === 'drawing' ? drawDuration : completeDuration, 
              ease: phase === 'drawing' ? drawEase : liftEase,
              delay: phase === 'drawing' ? 0.5 : 0
            }}
            style={{ 
              filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.8))',
              transform: 'translateZ(0)'
            }}
          />
        </svg>

        {/* Central Ambient Glow */}
        <motion.div 
          animate={{ 
            opacity: phase === 'completing' ? 0.25 : 0,
            scale: phase === 'completing' ? 1.4 : 0.8 
          }}
          transition={{ duration: completeDuration, ease: liftEase }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(34,211,238,0.2)_0%,_transparent_70%)] blur-3xl pointer-events-none"
          style={{ transform: 'translateZ(0)' }}
        />
      </motion.div>

      {/* 3. Horizon Grounding Fade (Smoothed) */}
      <motion.div 
        animate={{ 
          opacity: phase === 'drawing' ? 0.8 : 0,
        }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="absolute bottom-0 left-0 right-0 h-[10vh] bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" 
      />

    </div>
  );
};

export default App;