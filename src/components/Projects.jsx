import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS_DATA } from '../data/portfolioData';
import ProjectCard from './ProjectCard';
import { X, Layers, CheckCircle2 } from 'lucide-react';
import { GithubIcon } from './BrandIcons';

import { TypewriterText, DepthEmergeText, FadeRiseText } from './TextAnimations';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="relative w-full h-full flex items-center justify-center px-4 sm:px-6 lg:px-16 max-w-7xl mx-auto py-6 sm:py-12 overflow-y-auto max-h-[calc(100vh-7rem)]">
      <div className="w-full flex flex-col justify-center text-left">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <TypewriterText text="04 • FEATURED SYSTEMS" showCursor={true} delay={0.1} />
            </div>
            <DepthEmergeText delay={0.15}>
              <h2 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight">
                Flagship AI & Machine Learning Systems
              </h2>
            </DepthEmergeText>
            <FadeRiseText delay={0.25}>
              <p className="text-slate-400 text-xs sm:text-sm font-light mt-1">
                Hands-on architectures spanning Generative AI, RAG, Computer Vision, CNNs, and Deep Learning.
              </p>
            </FadeRiseText>
          </div>

          <div className="text-xs font-mono text-slate-400">
            Click <span className="text-cyan-400 font-semibold">"ARCH DEEP-DIVE"</span> for system specs
          </div>
        </div>

        {/* 3-Column Projects Grid with 3D perspective */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
          style={{ perspective: 1400, transformStyle: 'preserve-3d' }}
        >
          {PROJECTS_DATA.map((proj, index) => (
            <ProjectCard
              key={proj.id}
              project={proj}
              index={index}
              onSelectProject={(p) => setSelectedProject(p)}
            />
          ))}
        </div>

      </div>

      {/* Architectural Deep-Dive Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="glass-panel w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 border border-cyan-400/40 shadow-[0_25px_70px_rgba(0,0,0,0.9)] relative text-left"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 w-9 h-9 rounded-full glass-panel flex items-center justify-center text-slate-400 hover:text-white hover:bg-rose-500/20 hover:border-rose-500 transition-colors"
              >
                <X size={18} />
              </button>

              {/* Modal Header */}
              <div className="mb-6">
                <span className="px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-[11px] font-mono text-cyan-300">
                  SYSTEM ARCHITECTURE SPECIFICATION
                </span>
                <h3 className="font-heading font-black text-2xl sm:text-3xl text-white mt-3 mb-1">
                  {selectedProject.title}
                </h3>
                <p className="font-mono text-sm text-purple-400">
                  {selectedProject.subtitle}
                </p>
              </div>

              {/* Media Preview inside modal */}
              <div className="rounded-2xl overflow-hidden mb-6 border border-white/10 h-64 bg-slate-950">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Description & Metrics */}
              <div className="mb-6">
                <h4 className="font-heading font-bold text-base text-white mb-2">
                  System Overview
                </h4>
                <p className="text-slate-300 text-sm leading-relaxed font-light">
                  {selectedProject.description}
                </p>
              </div>

              {/* Architectural Breakdown */}
              <div className="mb-6 p-4 rounded-2xl glass-panel border border-white/10">
                <h4 className="font-heading font-bold text-sm text-white mb-3 flex items-center gap-2">
                  <Layers size={16} className="text-cyan-400" />
                  Key Architectural Decisions & Guardrails:
                </h4>
                <ul className="space-y-2">
                  {selectedProject.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 font-light">
                      <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technology Stack Tags */}
              <div className="mb-8">
                <h4 className="font-mono text-xs text-slate-400 uppercase tracking-wider mb-2">
                  Technology Stack:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-cyan-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-white/10">
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-600 text-black font-heading font-bold text-xs tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(0,245,212,0.3)] hover:scale-105 transition-all"
                >
                  <GithubIcon size={15} />
                  <span>VIEW REPOSITORY</span>
                </a>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-5 py-2.5 rounded-xl glass-panel text-white font-heading font-semibold text-xs tracking-wider border border-white/10 hover:border-cyan-400/40 transition-colors"
                >
                  CLOSE
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
