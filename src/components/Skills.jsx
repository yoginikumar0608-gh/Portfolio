import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SKILLS_DATA, LANGUAGES_DATA } from '../data/portfolioData';
import { 
  Code, 
  Cpu, 
  Server, 
  Brain, 
  Layers, 
  Layout, 
  Sparkles, 
  Globe, 
  CheckCircle2, 
  Filter 
} from 'lucide-react';
import { TypewriterText, FlyInHeading, FadeRiseText } from './TextAnimations';

const categoryIcons = {
  "PROGRAMMING LANGUAGES": Code,
  "FRAMEWORKS & LIBRARIES": Cpu,
  "TOOLS & PLATFORMS": Server,
  "AI / ML": Brain,
  "CORE CS": Layers,
  "WEB & DEVELOPMENT": Layout
};

const categoryAccents = {
  "PROGRAMMING LANGUAGES": {
    glow: "rgba(0, 245, 212, 0.4)",
    border: "border-cyan-400/40",
    badge: "bg-cyan-400/10 text-cyan-300 border-cyan-400/30",
    tag: "LANGUAGES"
  },
  "FRAMEWORKS & LIBRARIES": {
    glow: "rgba(168, 85, 247, 0.4)",
    border: "border-purple-400/40",
    badge: "bg-purple-400/10 text-purple-300 border-purple-400/30",
    tag: "FRAMEWORKS"
  },
  "TOOLS & PLATFORMS": {
    glow: "rgba(56, 189, 248, 0.4)",
    border: "border-sky-400/40",
    badge: "bg-sky-400/10 text-sky-300 border-sky-400/30",
    tag: "INFRA & TOOLS"
  },
  "AI / ML": {
    glow: "rgba(244, 63, 94, 0.4)",
    border: "border-rose-400/40",
    badge: "bg-rose-400/10 text-rose-300 border-rose-400/30",
    tag: "CORE INTELLIGENCE"
  },
  "CORE CS": {
    glow: "rgba(16, 185, 129, 0.4)",
    border: "border-emerald-400/40",
    badge: "bg-emerald-400/10 text-emerald-300 border-emerald-400/30",
    tag: "THEORETICAL FOUNDATION"
  },
  "WEB & DEVELOPMENT": {
    glow: "rgba(245, 158, 11, 0.4)",
    border: "border-amber-400/40",
    badge: "bg-amber-400/10 text-amber-300 border-amber-400/30",
    tag: "FRONTEND & RUNTIME"
  }
};

export default function Skills() {
  // activeCategory: -1 for ALL, or 0..5
  const [activeCategory, setActiveCategory] = useState(-1);
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const displayedSkills = activeCategory === -1
    ? SKILLS_DATA.flatMap(cat => cat.skills.map(skill => ({ skill, category: cat.category })))
    : SKILLS_DATA[activeCategory].skills.map(skill => ({ skill, category: SKILLS_DATA[activeCategory].category }));

  return (
    <div className="relative w-full h-full flex items-center justify-center px-4 sm:px-6 lg:px-16 max-w-7xl mx-auto py-6 sm:py-10 overflow-y-auto max-h-[calc(100vh-7rem)]">
      <div className="w-full flex flex-col justify-center text-left">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <TypewriterText text="03 • INTERACTIVE TECHNICAL MATRIX" showCursor={true} delay={0.1} />
            </div>
            <FlyInHeading from="top" delay={0.15}>
              <h2 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight">
                Verified Technical Capabilities
              </h2>
            </FlyInHeading>
            <FadeRiseText delay={0.25}>
              <p className="text-slate-400 text-xs sm:text-sm font-light mt-1">
                Hands-on development across modern AI architectures, frameworks, tools, and computer science foundations.
              </p>
            </FadeRiseText>
          </div>

          {/* Quick Metrics Tag */}
          <div className="hidden lg:flex items-center gap-3 font-mono text-xs">
            <span className="px-3 py-1.5 rounded-xl glass-panel border border-cyan-400/30 text-cyan-300 flex items-center gap-2">
              <Sparkles size={13} className="text-cyan-400" />
              <span>{displayedSkills.length} NODES VISIBLE</span>
            </span>
          </div>
        </div>

        {/* Category Navigation Pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setActiveCategory(-1)}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono tracking-wider transition-all duration-300 flex items-center gap-1.5 ${
              activeCategory === -1
                ? 'bg-gradient-to-r from-cyan-400 to-purple-600 text-black font-bold shadow-[0_0_20px_rgba(0,245,212,0.4)]'
                : 'glass-panel text-slate-400 hover:text-white border border-white/10'
            }`}
          >
            <Filter size={12} />
            <span>ALL DOMAINS</span>
          </button>

          {SKILLS_DATA.map((cat, idx) => {
            const active = activeCategory === idx;
            const IconComp = categoryIcons[cat.category] || Brain;
            return (
              <button
                key={cat.category}
                onClick={() => setActiveCategory(idx)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono tracking-wider transition-all duration-300 flex items-center gap-1.5 ${
                  active
                    ? 'bg-gradient-to-r from-cyan-400 to-purple-600 text-black font-bold shadow-[0_0_20px_rgba(0,245,212,0.4)]'
                    : 'glass-panel text-slate-400 hover:text-white border border-white/10'
                }`}
              >
                <IconComp size={12} />
                <span>{cat.category}</span>
              </button>
            );
          })}
        </div>

        {/* Interactive Floating Technology Nodes Environment */}
        <div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 w-full"
          style={{ perspective: 1200 }}
        >
          <AnimatePresence mode="popLayout">
            {displayedSkills.map((item, idx) => {
              const accent = categoryAccents[item.category] || categoryAccents["AI / ML"];
              const IconComp = categoryIcons[item.category] || Code;
              const isHovered = hoveredSkill === `${item.category}-${item.skill}`;

              return (
                <motion.div
                  key={`${item.category}-${item.skill}`}
                  layout
                  initial={{ opacity: 0, scale: 0.82, filter: 'blur(10px)', y: 15 }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 }}
                  exit={{ opacity: 0, scale: 0.85, filter: 'blur(8px)', transition: { duration: 0.2 } }}
                  transition={{ 
                    duration: 0.45, 
                    delay: Math.min(idx * 0.025, 0.4),
                    ease: [0.16, 1, 0.3, 1] 
                  }}
                  onMouseEnter={() => setHoveredSkill(`${item.category}-${item.skill}`)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  whileHover={{ 
                    y: -5, 
                    scale: 1.04,
                    transition: { duration: 0.2 }
                  }}
                  className={`relative p-3.5 sm:p-4 rounded-2xl glass-panel border transition-all duration-300 flex flex-col justify-between group overflow-hidden cursor-default ${
                    isHovered ? `${accent.border} shadow-[0_10px_25px_rgba(0,0,0,0.8)]` : 'border-white/10'
                  }`}
                  style={{
                    boxShadow: isHovered ? `0 0 25px ${accent.glow}` : undefined,
                    transformStyle: 'preserve-3d'
                  }}
                >
                  {/* Subtle holographic glow gradient on hover */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" 
                  />

                  {/* Header of node card */}
                  <div className="flex items-center justify-between mb-2 z-10">
                    <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 group-hover:text-cyan-400 group-hover:border-cyan-400/40 transition-colors">
                      <IconComp size={14} />
                    </div>
                    <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider group-hover:text-slate-400">
                      {accent.tag}
                    </span>
                  </div>

                  {/* Skill Name */}
                  <div className="z-10 mt-1">
                    <h4 className="font-heading font-bold text-sm sm:text-base text-white group-hover:text-cyan-300 transition-colors leading-snug">
                      {item.skill}
                    </h4>
                  </div>

                  {/* Subtle verification indicator */}
                  <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-500 z-10">
                    <span className="flex items-center gap-1 group-hover:text-emerald-400 transition-colors">
                      <CheckCircle2 size={11} className="text-emerald-400" /> Verified
                    </span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400">
                      ACTIVE
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Interactive Linguistic Competencies (Languages Visualization) */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
            <div className="font-mono text-xs text-cyan-400 uppercase tracking-widest flex items-center gap-2">
              <Globe size={14} className="text-cyan-400" />
              <span>10 • LINGUISTIC COMPETENCIES & MULTILINGUAL COMMUNICATION</span>
            </div>
            <div className="text-[11px] font-mono text-slate-400">
              {LANGUAGES_DATA.length} Languages Known
            </div>
          </div>

          {/* Interactive Language Nodes Constellation */}
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5">
            {LANGUAGES_DATA.map((lang, lIdx) => (
              <motion.div
                key={lang}
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + lIdx * 0.05 }}
                whileHover={{ y: -3, scale: 1.05 }}
                className="glass-panel p-3 rounded-xl border border-white/10 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(0,245,212,0.3)] transition-all duration-300 text-center group cursor-default"
              >
                <div className="w-2 h-2 rounded-full bg-cyan-400 mx-auto mb-1.5 opacity-60 group-hover:opacity-100 group-hover:scale-125 transition-all shadow-[0_0_8px_#00f5d4]" />
                <span className="font-heading font-bold text-xs sm:text-sm text-white group-hover:text-cyan-300 transition-colors block">
                  {lang}
                </span>
                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block mt-0.5">
                  COMMUNICATION
                </span>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
