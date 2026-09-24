import React from 'react';
import { motion } from 'framer-motion';
import { PERSONAL_INFO, EDUCATION_DATA, SKILLS_DATA, PROJECTS_DATA, CERTIFICATIONS_DATA, POSITIONS_OF_RESPONSIBILITY, LANGUAGES_DATA } from '../data/portfolioData';
import { 
  GraduationCap, 
  Award, 
  Cpu, 
  Briefcase, 
  Mail, 
  Phone, 
  MapPin, 
  Sparkles, 
  Printer 
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './BrandIcons';
import confetti from 'canvas-confetti';
import { TypewriterText, DepthEmergeText } from './TextAnimations';

export default function Resume() {
  const edu = EDUCATION_DATA[0];

  const handleDownload = () => {
    // Trigger celebratory cyber confetti
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#00f5d4', '#7928ca', '#f72585', '#38bdf8']
    });

    // Trigger printable clean resume
    setTimeout(() => {
      window.print();
    }, 400);
  };

  return (
    <div
      className="relative w-full h-full flex items-center justify-center px-4 sm:px-6 lg:px-16 max-w-7xl mx-auto py-6 sm:py-10 overflow-y-auto max-h-[calc(100vh-7rem)]"
      style={{ perspective: 1300 }}
    >
      {/* Cinematic Holographic Summon Container */}
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.68,
          rotateX: 16,
          rotateY: -4,
          filter: 'blur(16px)',
          boxShadow: '0 0 70px rgba(0, 245, 212, 0.5), 0 0 110px rgba(121, 40, 202, 0.3)',
        }}
        animate={{
          opacity: 1,
          scale: 1,
          rotateX: 0,
          rotateY: 0,
          filter: 'blur(0px)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7)',
        }}
        transition={{
          duration: 0.9,
          ease: [0.16, 1, 0.3, 1],
          opacity: { duration: 0.6 },
          scale: { type: 'spring', stiffness: 170, damping: 22 },
          filter: { duration: 0.75 },
          rotateX: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
          rotateY: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
        }}
        className="w-full flex flex-col justify-center text-left relative rounded-3xl"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Holographic scanner beam during summon entrance */}
        <motion.div
          initial={{ top: '-10%', opacity: 0.85 }}
          animate={{ top: '110%', opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent pointer-events-none z-30 shadow-[0_0_20px_#00f5d4]"
        />

        {/* Section Header & Action Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <TypewriterText text="06 • HOLOGRAPHIC RESUME DOSSIER" showCursor={true} delay={0.1} />
            </div>
            <DepthEmergeText delay={0.15}>
              <h2 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight">
                Verified Curriculum Vitae
              </h2>
            </DepthEmergeText>
          </div>

          {/* Download / Print Resume Button */}
          <button
            onClick={handleDownload}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-600 text-black font-heading font-bold text-xs tracking-wider flex items-center gap-2 shadow-[0_0_25px_rgba(0,245,212,0.4)] hover:scale-105 transition-all w-fit cursor-pointer"
          >
            <Printer size={15} />
            <span>PRINT / SAVE RESUME (PDF)</span>
          </button>
        </div>

        {/* Summoned Holographic Document Card */}
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-cyan-400/40 relative shadow-[0_25px_60px_rgba(0,0,0,0.8)] space-y-7">
          
          {/* Document Header */}
          <div className="flex flex-col md:flex-row md:items-start justify-between pb-6 border-b border-white/10 gap-4">
            <div>
              <h1 className="font-heading font-black text-3xl sm:text-4xl text-white tracking-tight">
                {PERSONAL_INFO.name}
              </h1>
              <div className="font-heading font-bold text-base sm:text-lg text-cyan-400 mt-1">
                {PERSONAL_INFO.title}
              </div>
              <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 mt-1">
                <MapPin size={13} className="text-cyan-400" />
                <span>{PERSONAL_INFO.location}</span>
              </div>
            </div>

            <div className="flex flex-col text-xs font-mono space-y-1.5 text-slate-300">
              <a href={`mailto:${PERSONAL_INFO.email}`} className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
                <Mail size={13} className="text-cyan-400" />
                <span>{PERSONAL_INFO.email}</span>
              </a>
              <a href={`tel:${PERSONAL_INFO.phone}`} className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
                <Phone size={13} className="text-emerald-400" />
                <span>+91 {PERSONAL_INFO.phone}</span>
              </a>
              <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-purple-400 transition-colors">
                <LinkedinIcon size={13} className="text-purple-400" />
                <span>linkedin.com/in/yogini-s-kumar-360490386</span>
              </a>
              <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
                <GithubIcon size={13} className="text-slate-400" />
                <span>github.com/yoginikumar0608-gh</span>
              </a>
            </div>
          </div>

          {/* 1. Professional Summary */}
          <div>
            <h3 className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2 flex items-center gap-2">
              <Sparkles size={13} />
              <span>PROFESSIONAL SUMMARY</span>
            </h3>
            <p className="text-slate-200 text-xs sm:text-sm font-light leading-relaxed">
              {PERSONAL_INFO.summary}
            </p>
          </div>

          {/* 2. Education */}
          <div className="pt-4 border-t border-white/10">
            <h3 className="text-xs font-mono text-purple-400 uppercase tracking-widest mb-3 flex items-center gap-2">
              <GraduationCap size={14} />
              <span>EDUCATION</span>
            </h3>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="font-heading font-bold text-sm sm:text-base text-white">
                  {edu.degree}
                </h4>
                <div className="font-mono text-xs text-slate-400 mt-0.5">
                  {edu.institution}
                </div>
              </div>
              <div className="flex sm:flex-col sm:items-end justify-between items-center text-right font-mono text-xs">
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 font-bold mb-1">
                  CGPA: {edu.cgpa}
                </span>
                <span className="text-slate-400">{edu.period}</span>
              </div>
            </div>
          </div>

          {/* 3. Technical Skills Matrix */}
          <div className="pt-4 border-t border-white/10">
            <h3 className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3 flex items-center gap-2">
              <Cpu size={14} />
              <span>TECHNICAL SKILLS</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {SKILLS_DATA.map(group => (
                <div key={group.category} className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="font-mono text-[11px] text-cyan-300 font-bold mb-1">
                    {group.category}
                  </div>
                  <div className="text-slate-300 font-light leading-relaxed">
                    {group.skills.join(" • ")}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Flagship Projects */}
          <div className="pt-4 border-t border-white/10">
            <h3 className="text-xs font-mono text-purple-400 uppercase tracking-widest mb-3 flex items-center gap-2">
              <Award size={14} />
              <span>PROJECTS</span>
            </h3>
            <div className="space-y-3">
              {PROJECTS_DATA.map((proj) => (
                <div key={proj.id} className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1 gap-1">
                    <h4 className="font-heading font-bold text-sm text-white flex items-center gap-2">
                      <span>{proj.title}</span>
                      <span className="text-[11px] font-mono text-purple-400 font-normal">
                        — {proj.subtitle}
                      </span>
                    </h4>
                  </div>
                  <div className="text-[11px] font-mono text-cyan-300 mb-1.5">
                    Technologies: {proj.tags.join(" · ")}
                  </div>
                  <p className="text-slate-300 text-xs font-light leading-relaxed mb-2">
                    {proj.description}
                  </p>
                  <div className="text-[11px] font-mono text-slate-400 italic">
                    "{proj.tagline}"
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Positions of Responsibility */}
          <div className="pt-4 border-t border-white/10">
            <h3 className="text-xs font-mono text-emerald-400 uppercase tracking-widest mb-3 flex items-center gap-2">
              <Briefcase size={14} />
              <span>POSITIONS OF RESPONSIBILITY</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {POSITIONS_OF_RESPONSIBILITY.map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="font-heading font-semibold text-xs text-white">
                    {item.organization}
                  </div>
                  <div className="font-mono text-[11px] text-cyan-400 mb-1">
                    {item.role}
                  </div>
                  <p className="text-slate-400 text-[11px] font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 6. Certifications */}
          <div className="pt-4 border-t border-white/10">
            <h3 className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3 flex items-center gap-2">
              <Award size={14} />
              <span>CERTIFICATIONS</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {CERTIFICATIONS_DATA.map(cat => (
                <div key={cat.category} className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="font-mono text-[11px] text-purple-300 font-bold mb-2">
                    {cat.category}
                  </div>
                  <ul className="space-y-1.5">
                    {cat.items.map((c, i) => (
                      <li key={i} className="text-[11px] text-slate-300 font-light flex items-start gap-1.5">
                        <span className="text-cyan-400">•</span>
                        <span>
                          {c.name} {c.issuer ? `— ${c.issuer}` : ''}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* 7. Languages */}
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="font-mono text-xs text-slate-400 uppercase tracking-wider">
              LANGUAGES KNOWN:
            </div>
            <div className="flex flex-wrap gap-2">
              {LANGUAGES_DATA.map(lang => (
                <span
                  key={lang}
                  className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-white"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>

        </div>

      </motion.div>
    </div>
  );
}
