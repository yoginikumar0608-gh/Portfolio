import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { EDUCATION_DATA, CERTIFICATIONS_DATA, POSITIONS_OF_RESPONSIBILITY } from '../data/portfolioData';
import { 
  GraduationCap, 
  Award, 
  ShieldCheck, 
  Calendar, 
  Building2, 
  Users, 
  Trophy, 
  Compass, 
  CheckCircle2
} from 'lucide-react';
import { TypewriterText, FlyInHeading, FadeRiseText, MaterializeText } from './TextAnimations';

export default function Education() {
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'education', 'certifications', 'leadership'
  const edu = EDUCATION_DATA[0];

  return (
    <div className="relative w-full h-full flex items-center justify-center px-4 sm:px-6 lg:px-16 max-w-7xl mx-auto py-6 sm:py-10 overflow-y-auto max-h-[calc(100vh-7rem)]">
      <div className="w-full flex flex-col justify-center text-left">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <TypewriterText text="05 • ACADEMIC TIMELINE & CREDENTIALS" showCursor={true} delay={0.1} />
            </div>
            <FlyInHeading from="top" delay={0.15}>
              <h2 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight">
                Education & Professional Accreditations
              </h2>
            </FlyInHeading>
            <FadeRiseText delay={0.25}>
              <p className="text-slate-400 text-xs sm:text-sm font-light mt-1">
                Rigorous foundations in Artificial Intelligence and Machine Learning, verified industry certifications, and leadership initiatives.
              </p>
            </FadeRiseText>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'COMPLETE OVERVIEW' },
              { id: 'education', label: 'DEGREE' },
              { id: 'certifications', label: 'CERTIFICATIONS' },
              { id: 'leadership', label: 'POSITIONS OF RESPONSIBILITY' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-xl font-mono text-xs tracking-wider transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-cyan-400 to-purple-600 text-black font-bold shadow-[0_0_20px_rgba(0,245,212,0.4)]'
                    : 'glass-panel text-slate-400 hover:text-white border border-white/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="space-y-6 sm:space-y-8 w-full">
          
          {/* 1. CINEMATIC DEPTH-BASED EDUCATION TIMELINE CARD */}
          {(activeTab === 'all' || activeTab === 'education') && (
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.82,
                z: -140,
                rotateX: 12,
                filter: 'blur(14px)',
                boxShadow: '0 0 60px rgba(0, 245, 212, 0.45)'
              }}
              animate={{
                opacity: 1,
                scale: 1,
                z: 0,
                rotateX: 0,
                filter: 'blur(0px)',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)'
              }}
              transition={{
                duration: 0.85,
                ease: [0.16, 1, 0.3, 1],
                scale: { type: 'spring', stiffness: 180, damping: 22 }
              }}
              style={{ transformStyle: 'preserve-3d', perspective: 1200 }}
              className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-400/40 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] group"
            >
              {/* Top ambient glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                {/* Degree Info & Timeline */}
                <div className="lg:col-span-8 space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 font-mono text-xs flex items-center gap-1.5">
                      <Calendar size={13} className="text-cyan-400" />
                      <span>{edu.period}</span>
                    </span>
                    <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 font-mono text-xs flex items-center gap-1.5">
                      <GraduationCap size={13} className="text-purple-400" />
                      <span>CURRENT DEGREE</span>
                    </span>
                  </div>

                  <MaterializeText delay={0.2}>
                    <h3 className="font-heading font-black text-xl sm:text-2xl lg:text-3xl text-white group-hover:text-cyan-300 transition-colors leading-tight">
                      {edu.degree}
                    </h3>
                  </MaterializeText>

                  <div className="flex items-center gap-2 text-sm font-mono text-purple-300">
                    <Building2 size={15} className="text-cyan-400 shrink-0" />
                    <span className="font-semibold">{edu.institution}</span>
                  </div>

                  <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed max-w-3xl">
                    {edu.description}
                  </p>

                  {/* Core competencies */}
                  <div className="pt-2">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-2">
                      CORE ENGINEERING FOCUS:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {edu.courses.map(course => (
                        <span
                          key={course}
                          className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-slate-300"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CGPA Holographic Gauge Accent */}
                <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-2xl glass-panel border border-cyan-400/30 text-center relative overflow-hidden bg-gradient-to-br from-cyan-400/5 to-purple-600/5">
                  <div className="absolute top-2 right-2">
                    <ShieldCheck size={18} className="text-cyan-400 opacity-60" />
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest mb-1">
                    CUMULATIVE CGPA
                  </span>
                  <div className="font-heading font-black text-5xl sm:text-6xl text-gradient-cyan tracking-tight my-1">
                    {edu.cgpa}
                  </div>
                  <div className="font-mono text-xs text-cyan-300/80 mb-3">
                    Out of 10.0 Scale
                  </div>
                  <div className="px-3 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-300 text-[11px] font-mono flex items-center gap-1.5">
                    <CheckCircle2 size={12} className="text-emerald-400" />
                    <span>Academic Excellence</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* 2. CERTIFICATIONS: ELEGANT VERTICAL/DEPTH-BASED ARRANGEMENT */}
          {(activeTab === 'all' || activeTab === 'certifications') && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Award size={16} className="text-cyan-400" />
                <h3 className="font-heading font-bold text-lg sm:text-xl text-white">
                  Industry Certifications
                </h3>
              </div>

              <div 
                className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full"
                style={{ perspective: 1200 }}
              >
                {CERTIFICATIONS_DATA.map((cat, cIdx) => (
                  <motion.div
                    key={cat.category}
                    initial={{ opacity: 0, y: 20, scale: 0.94 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.15 + cIdx * 0.1 }}
                    className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-cyan-400/40 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                        <span className="text-[11px] font-mono font-bold tracking-wider text-cyan-300">
                          {cat.category}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-400">
                          {cat.items.length} Credentials
                        </span>
                      </div>

                      <div className="space-y-3">
                        {cat.items.map((item, iIdx) => (
                          <div 
                            key={iIdx} 
                            className="p-3 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-400/30 transition-all group"
                          >
                            <h4 className="font-heading font-semibold text-xs sm:text-sm text-white group-hover:text-cyan-300 transition-colors leading-snug">
                              {item.name}
                            </h4>
                            {item.issuer && (
                              <div className="flex items-center justify-between mt-1 text-[11px] font-mono text-purple-300/90">
                                <span>{item.issuer}</span>
                                <CheckCircle2 size={12} className="text-emerald-400" />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* 3. POSITIONS OF RESPONSIBILITY / LEADERSHIP CARDS */}
          {(activeTab === 'all' || activeTab === 'leadership') && (
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-2">
                <Trophy size={16} className="text-purple-400" />
                <h3 className="font-heading font-bold text-lg sm:text-xl text-white">
                  Positions of Responsibility & Leadership
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                {POSITIONS_OF_RESPONSIBILITY.map((item, idx) => (
                  <motion.div
                    key={item.organization}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.2 + idx * 0.1 }}
                    className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-purple-400/40 transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-3 group-hover:scale-110 group-hover:bg-purple-500 group-hover:text-black transition-all">
                        {idx === 0 ? <Users size={16} /> : (idx === 1 ? <Compass size={16} /> : <Trophy size={16} />)}
                      </div>

                      <h4 className="font-heading font-bold text-base text-white group-hover:text-purple-300 transition-colors mb-0.5">
                        {item.organization}
                      </h4>

                      <span className="font-mono text-xs text-cyan-400 block mb-3">
                        {item.role}
                      </span>

                      <p className="text-slate-300 text-xs font-light leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
                      <CheckCircle2 size={11} />
                      <span>Verified Position</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
