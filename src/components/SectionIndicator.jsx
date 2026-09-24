import React from 'react';
import { motion } from 'framer-motion';
import { SECTIONS } from '../data/portfolioData';
import { Compass, RotateCw } from 'lucide-react';

export default function SectionIndicator({ currentSectionIndex, onSelectSection }) {
  const current = SECTIONS[currentSectionIndex] || SECTIONS[0];
  const progressPercent = ((currentSectionIndex + 1) / SECTIONS.length) * 100;

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-30 px-6 py-4 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        
        {/* Left: Spatial Coordinates / Index indicator */}
        <div className="flex items-center gap-3 glass-panel px-3.5 py-1.5 rounded-full border border-white/10 text-xs font-mono">
          <div className="flex items-center gap-1.5 text-cyan-400">
            <Compass size={13} className="animate-spin" style={{ animationDuration: '12s' }} />
            <span className="font-bold">{current.code}</span>
          </div>
          <span className="text-white/20">|</span>
          <span className="text-white tracking-widest font-semibold">{current.label}</span>
          <span className="text-white/20">|</span>
          <span className="text-slate-400 text-[11px]">0{SECTIONS.length}</span>
        </div>

        {/* Center: Interactive spatial progress pips */}
        <div className="hidden md:flex items-center gap-2 glass-panel px-4 py-2 rounded-full border border-white/10">
          <span className="text-[10px] font-mono text-slate-400 mr-1 flex items-center gap-1">
            <RotateCw size={11} className="text-cyan-400" />
            LOOP TRACK:
          </span>
          <div className="flex items-center gap-1.5">
            {SECTIONS.map((sec, idx) => {
              const active = currentSectionIndex === idx;
              return (
                <button
                  key={sec.id}
                  onClick={() => onSelectSection(idx)}
                  title={`Navigate to ${sec.label}`}
                  className="group relative py-1 focus:outline-none"
                >
                  <motion.div
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      active
                        ? 'w-7 bg-gradient-to-r from-cyan-400 to-purple-500 shadow-[0_0_12px_rgba(0,245,212,0.8)]'
                        : 'w-2 bg-white/20 hover:bg-white/50'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Spatial movement hint */}
        <div className="flex items-center gap-2 glass-panel px-3 py-1.5 rounded-full border border-white/10 text-[11px] font-mono text-slate-400">
          <span className="hidden sm:inline">DRAG, WHEEL OR KEYS</span>
          <span className="text-cyan-400 font-bold">⇄</span>
        </div>
      </div>

      {/* Thin ambient progress hairline at very bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5">
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500"
          animate={{ width: `${progressPercent}%` }}
          transition={{ type: 'spring', damping: 30, stiffness: 200 }}
        />
      </div>
    </footer>
  );
}
