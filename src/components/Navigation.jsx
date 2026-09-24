import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SECTIONS } from '../data/portfolioData';
import { ChevronLeft, ChevronRight, Menu, X, Volume2, VolumeX } from 'lucide-react';

export default function Navigation({
  currentSectionIndex,
  onSelectSection,
  onPrevSection,
  onNextSection,
  soundEnabled,
  onToggleSound,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-6 py-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo & System Status */}
        <div 
          onClick={() => onSelectSection(0)}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-600 p-[1px] shadow-[0_0_15px_rgba(0,245,212,0.3)]">
            <div className="w-full h-full bg-[#05070d] rounded-lg flex items-center justify-center">
              <span className="font-mono font-bold text-xs text-cyan-400">&gt;Y</span>
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#05070d] animate-ping" />
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#05070d]" />
          </div>

          <div>
            <div className="font-heading font-extrabold tracking-tight text-white text-base group-hover:text-cyan-400 transition-colors">
              Yogini<span className="text-cyan-400">.AI</span>
            </div>
            <div className="text-[10px] font-mono text-slate-400 tracking-widest uppercase flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-cyan-400" />
              SYSTEM ACTIVE
            </div>
          </div>
        </div>

        {/* Desktop Continuous Navigation Bar */}
        <nav className="hidden lg:flex items-center gap-1 glass-panel px-3 py-1.5 rounded-full border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
          {SECTIONS.map((section, idx) => {
            const isActive = currentSectionIndex === idx;
            return (
              <button
                key={section.id}
                onClick={() => onSelectSection(idx)}
                className={`relative px-4 py-1.5 rounded-full font-mono text-xs tracking-wider transition-all duration-300 ${
                  isActive ? 'text-black font-semibold' : 'text-slate-400 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400 rounded-full -z-10 shadow-[0_0_20px_rgba(0,245,212,0.6)]"
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                  />
                )}
                <span className="opacity-60 text-[10px] mr-1.5">
                  {section.code}
                </span>
                {section.label}
              </button>
            );
          })}
        </nav>

        {/* Spatial Quick Controls (Prev, Next, Audio, Resume) */}
        <div className="flex items-center gap-2">
          {/* Audio toggle */}
          <button
            onClick={onToggleSound}
            title={soundEnabled ? "Mute interface audio" : "Enable interface audio"}
            className="w-9 h-9 rounded-full glass-panel flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-400/40 transition-colors"
          >
            {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} className="text-slate-500" />}
          </button>

          {/* Previous section */}
          <button
            onClick={onPrevSection}
            title="Previous Section (or Press Left Arrow)"
            className="w-9 h-9 rounded-full glass-panel flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-400/40 transition-colors"
          >
            <ChevronLeft size={16} />
          </button>

          {/* Next section */}
          <button
            onClick={onNextSection}
            title="Next Section (or Press Right Arrow)"
            className="w-9 h-9 rounded-full glass-panel flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-400/40 transition-colors"
          >
            <ChevronRight size={16} />
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-9 h-9 rounded-full glass-panel flex items-center justify-center text-slate-300 hover:text-cyan-400"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden mt-3 mx-4 glass-panel rounded-2xl p-4 border border-white/10"
          >
            <div className="grid grid-cols-2 gap-2">
              {SECTIONS.map((section, idx) => (
                <button
                  key={section.id}
                  onClick={() => {
                    onSelectSection(idx);
                    setMobileMenuOpen(false);
                  }}
                  className={`p-3 rounded-xl font-mono text-left text-xs tracking-wider border ${
                    currentSectionIndex === idx
                      ? 'bg-cyan-400/10 border-cyan-400 text-cyan-300 font-bold'
                      : 'bg-white/5 border-white/5 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  <span className="text-[10px] text-slate-500 block mb-0.5">{section.code}</span>
                  {section.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
