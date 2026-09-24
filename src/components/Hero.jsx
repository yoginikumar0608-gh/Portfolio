import React from 'react';
import { motion } from 'framer-motion';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Terminal, ArrowRight, Cpu, ShieldCheck } from 'lucide-react';
import { TypewriterText, DepthEmergeText, FadeRiseText } from './TextAnimations';

export default function Hero({ onNavigate }) {
  const nameLetters = Array.from("YOGINI S");

  return (
    <div className="relative w-full h-full flex items-center justify-center px-4 sm:px-6 lg:px-16 max-w-7xl mx-auto py-8 sm:py-12 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center w-full">
        
        {/* Left Column: Mission & Identity */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left">
          
          {/* Status Badge with Typewriter & Blinking Indicator */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full glass-panel border border-cyan-400/30 text-xs font-mono text-cyan-300 w-fit mb-5 shadow-[0_0_20px_rgba(0,245,212,0.15)]"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <TypewriterText text={PERSONAL_INFO.status} showCursor={true} delay={0.2} speed={0.02} />
          </motion.div>

          {/* Cinematic Letter-by-Letter Assembled Name Heading */}
          <div className="mb-4">
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="font-heading font-black text-4xl sm:text-6xl lg:text-7xl tracking-tight text-white leading-none flex flex-wrap gap-x-3 gap-y-1"
            >
              {nameLetters.map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: -25, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{
                    duration: 0.5,
                    delay: 0.15 + index * 0.05,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className={char === ' ' ? 'inline-block w-4' : 'inline-block text-white hover:text-cyan-400 transition-colors'}
                >
                  {char}
                </motion.span>
              ))}
            </motion.h1>

            {/* Subtitle Materializing from Depth */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, filter: 'blur(14px)', y: 18 }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 }}
              transition={{
                duration: 0.85,
                delay: 0.45,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="mt-3 sm:mt-4 font-heading font-black text-xl sm:text-2xl lg:text-3xl tracking-wider leading-snug sm:leading-tight"
            >
              <div className="text-gradient-cyan uppercase">
                AI & MACHINE LEARNING
              </div>
              <div className="text-white/90 uppercase tracking-widest text-lg sm:text-xl lg:text-2xl font-bold">
                ENGINEERING STUDENT
              </div>
            </motion.div>
          </div>

          {/* Tagline with Fade & Vertical Rise */}
          <FadeRiseText delay={0.6} distance={14}>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl font-light leading-relaxed mb-7">
              {PERSONAL_INFO.tagline}
            </p>
          </FadeRiseText>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="flex flex-wrap gap-3.5 items-center mb-8"
          >
            <button
              onClick={() => onNavigate(3)} // Jump to Projects
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-600 text-black font-heading font-bold text-xs tracking-wider flex items-center gap-2 shadow-[0_0_30px_rgba(0,245,212,0.4)] hover:shadow-[0_0_45px_rgba(0,245,212,0.7)] hover:scale-105 transition-all duration-300"
            >
              <Cpu size={15} />
              <span>EXPLORE AI SYSTEMS</span>
              <ArrowRight size={14} />
            </button>

            <button
              onClick={() => onNavigate(6)} // Jump to Contact
              className="px-6 py-3 rounded-xl glass-panel text-white font-heading font-semibold text-xs tracking-wider border border-white/10 hover:border-cyan-400/50 hover:bg-white/10 transition-all duration-300 flex items-center gap-2"
            >
              <span>GET IN TOUCH</span>
            </button>
          </motion.div>

          {/* Quick Metrics Bar with Depth Emerge numbers */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-5 border-t border-white/10">
            {PERSONAL_INFO.stats.map((stat, i) => (
              <div key={i} className="flex flex-col">
                <DepthEmergeText delay={0.7 + i * 0.08}>
                  <span className="font-heading font-extrabold text-2xl text-white">
                    {stat.value}
                  </span>
                </DepthEmergeText>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mt-0.5">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Interactive Code Console & Holographic Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="lg:col-span-5 relative"
        >
          {/* Main Terminal Window */}
          <div className="glass-panel rounded-2xl border border-white/10 p-5 shadow-[0_25px_60px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
            {/* Terminal Window Bar */}
            <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <div className="font-mono text-xs text-slate-400 flex items-center gap-1.5">
                <Terminal size={12} className="text-cyan-400" />
                yogini_ai_runtime.v1
              </div>
              <div className="w-3" />
            </div>

            {/* Code Body */}
            <div className="font-mono text-xs sm:text-[13px] leading-relaxed text-left text-slate-300 space-y-1">
              <div>
                <span className="text-purple-400">const</span>{' '}
                <span className="text-cyan-300">student</span> = {'{'}
              </div>
              <div className="pl-4">
                <span className="text-slate-400">name:</span>{' '}
                <span className="text-emerald-300">"{PERSONAL_INFO.name}"</span>,
              </div>
              <div className="pl-4">
                <span className="text-slate-400">degree:</span>{' '}
                <span className="text-emerald-300">"B.E. in Artificial Intelligence & ML"</span>,
              </div>
              <div className="pl-4">
                <span className="text-slate-400">institution:</span>{' '}
                <span className="text-emerald-300">"{PERSONAL_INFO.institution}"</span>,
              </div>
              <div className="pl-4">
                <span className="text-slate-400">cgpa:</span>{' '}
                <span className="text-cyan-400 font-bold">"{PERSONAL_INFO.cgpa}"</span>,
              </div>
              <div className="pl-4">
                <span className="text-slate-400">duration:</span>{' '}
                <span className="text-purple-300">"2024 – 2028"</span>,
              </div>
              <div className="pl-4">
                <span className="text-slate-400">focus:</span> [
              </div>
              <div className="pl-8 text-cyan-200">
                "Generative AI & RAG",<br />
                "Computer Vision & CNNs",<br />
                "GANs & Deep Learning",<br />
                "LangChain & Hugging Face"
              </div>
              <div className="pl-4">],</div>
              <div className="pl-4">
                <span className="text-slate-400">status:</span>{' '}
                <span className="text-pink-400">"INNOVATING_&_EXPLORING"</span>
              </div>
              <div>{'}'};</div>
              <br />
              <div className="text-slate-500 italic">
                // Explore interactive AI world:
              </div>
              <div className="text-cyan-400 flex items-center gap-1">
                <span>await student.launchSolutions();</span>
                <span className="w-1.5 h-3.5 bg-cyan-400 inline-block animate-pulse" />
              </div>
            </div>
          </div>

          {/* Floating Cyber Hologram Badge with Avatar */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-6 left-2 sm:-left-4 md:-left-6 glass-panel px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-2xl border border-cyan-400/40 shadow-[0_15px_35px_rgba(0,0,0,0.6)] flex items-center gap-3 max-w-[calc(100%-1rem)]"
          >
            <img
              src={PERSONAL_INFO.avatar}
              alt={PERSONAL_INFO.name}
              className="w-11 h-11 rounded-xl object-cover border border-cyan-400 shadow-[0_0_15px_rgba(0,245,212,0.4)]"
            />
            <div className="text-left">
              <div className="font-heading font-bold text-sm text-white flex items-center gap-1.5">
                <span>{PERSONAL_INFO.name}</span>
                <ShieldCheck size={14} className="text-cyan-400" />
              </div>
              <div className="text-[11px] font-mono text-cyan-300 truncate">
                AI & ML Engineering Student
              </div>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
}
