import React from 'react';
import { motion } from 'framer-motion';
import { ABOUT_DATA, PERSONAL_INFO } from '../data/portfolioData';
import { Cpu, Layers, Zap, Shield, MapPin, GraduationCap, Sparkles } from 'lucide-react';
import { TypewriterText, MaterializeText, DepthEmergeText } from './TextAnimations';

const iconMap = {
  Cpu: Cpu,
  Layers: Layers,
  Zap: Zap,
  Shield: Shield
};

// Word-by-word staggered reveal component with blur-to-sharp and subtle depth movement
function StaggeredSentence({ text, delayOffset = 0 }) {
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.038,
        delayChildren: delayOffset,
      },
    },
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 12,
      scale: 0.94,
      filter: 'blur(10px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.p
      variants={container}
      initial="hidden"
      animate="visible"
      className="inline-block leading-relaxed"
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={child}
          className="inline-block mr-1 text-slate-200 font-light hover:text-cyan-300 transition-colors"
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
}

export default function About({ onNavigate }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center px-4 sm:px-6 lg:px-16 max-w-7xl mx-auto py-8 sm:py-12 overflow-y-auto max-h-[calc(100vh-7rem)]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
        
        {/* Left Column: Visual Profile Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.93, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5"
        >
          <div className="glass-panel rounded-3xl p-6 border border-white/10 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
            {/* Holographic scanner & ambient glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-400/5 via-transparent to-purple-500/5 pointer-events-none" />

            <div className="relative flex flex-col items-center text-center">
              {/* Avatar with cyber neon border */}
              <div className="relative w-32 h-32 sm:w-36 sm:h-36 mb-4 rounded-2xl p-1 bg-gradient-to-tr from-cyan-400 via-purple-500 to-pink-500 shadow-[0_0_30px_rgba(0,245,212,0.35)]">
                <img
                  src={PERSONAL_INFO.avatar}
                  alt={PERSONAL_INFO.name}
                  className="w-full h-full object-cover rounded-xl bg-slate-900"
                />
              </div>

              <MaterializeText delay={0.2}>
                <h3 className="font-heading font-extrabold text-2xl text-white">
                  {PERSONAL_INFO.name}
                </h3>
              </MaterializeText>

              <div className="font-mono text-xs text-cyan-400 mt-1 mb-5">
                <TypewriterText text={PERSONAL_INFO.title} delay={0.3} speed={0.02} />
              </div>

              {/* Quick specs */}
              <div className="w-full space-y-2.5 pt-4 border-t border-white/10 text-left text-xs font-mono">
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <MapPin size={13} className="text-cyan-400" /> Location:
                  </span>
                  <span className="text-white font-medium">{PERSONAL_INFO.location}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <GraduationCap size={13} className="text-purple-400" /> Degree & College:
                  </span>
                  <span className="text-white font-medium truncate max-w-[200px]" title="B.E. in AI & ML • Coorg Institute of Technology">
                    CIT • 2024–2028
                  </span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Sparkles size={13} className="text-pink-400" /> Academic CGPA:
                  </span>
                  <span className="text-cyan-400 font-bold">{PERSONAL_INFO.cgpa} / 10.0</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="w-full mt-6 grid grid-cols-2 gap-3">
                <button
                  onClick={() => onNavigate(5)} // Jump to Resume
                  className="py-2.5 px-4 rounded-xl glass-panel text-white font-heading font-semibold text-xs tracking-wider border border-white/10 hover:border-cyan-400/50 hover:bg-white/10 transition-colors"
                >
                  VIEW RESUME
                </button>
                <button
                  onClick={() => onNavigate(6)} // Jump to Contact
                  className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-600 text-black font-heading font-bold text-xs tracking-wider shadow-[0_0_20px_rgba(0,245,212,0.3)] hover:scale-105 transition-all"
                >
                  CONNECT
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Narrative & 4 Architectural Pillars */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left">
          {/* Section Tag with Blinking Cursor */}
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <TypewriterText text="02 • PROFESSIONAL PROFILE & CAPABILITIES" showCursor={true} delay={0.1} />
          </div>

          {/* Heading Materializes from Center with Blur and Scale */}
          <MaterializeText delay={0.2}>
            <h2 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight leading-tight mb-5">
              {ABOUT_DATA.headline}
            </h2>
          </MaterializeText>

          {/* Staggered Word-Assembly Professional Summary (No instant block reveal) */}
          <div className="space-y-3.5 text-xs sm:text-sm leading-relaxed mb-8">
            {ABOUT_DATA.paragraphs.map((p, i) => (
              <div key={i}>
                <StaggeredSentence text={p} delayOffset={0.3 + i * 0.25} />
              </div>
            ))}
          </div>

          {/* 4 Architectural Pillars Grid with Depth Emerge Titles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {ABOUT_DATA.pillars.map((pillar, i) => {
              const IconComponent = iconMap[pillar.icon] || Cpu;
              return (
                <div
                  key={i}
                  className="glass-panel p-4 rounded-2xl border border-white/10 hover:border-cyan-400/40 transition-all duration-300 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 mb-2.5 group-hover:scale-110 group-hover:bg-cyan-400 group-hover:text-black transition-all">
                    <IconComponent size={16} />
                  </div>
                  <DepthEmergeText delay={0.4 + i * 0.08}>
                    <h4 className="font-heading font-bold text-sm text-white mb-1">
                      {pillar.title}
                    </h4>
                  </DepthEmergeText>
                  <p className="text-xs text-slate-400 leading-relaxed font-light">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
