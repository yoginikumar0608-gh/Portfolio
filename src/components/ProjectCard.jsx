import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Zap, CheckCircle, Layers, Scan, Brain, Sparkles, FileText, Activity } from 'lucide-react';
import { GithubIcon } from './BrandIcons';

// Six distinct cinematic origin animations strictly as requested:
// 1. Project 1: materialize from the center
// 2. Project 2: emerge from background depth
// 3. Project 3: rise upward with holographic particles
// 4. Project 4: assemble from scattered elements
// 5. Project 5: emerge through a scanning effect
// 6. Project 6: form from document/data particles

const projectSpecificVariants = {
  // 0: AI Face Generator — Materialize from Center
  0: {
    initial: {
      opacity: 0,
      scale: 0.52,
      x: 0,
      y: 0,
      z: -180,
      rotateX: 10,
      filter: 'blur(16px)',
      boxShadow: '0 0 70px rgba(0, 245, 212, 0.6), 0 0 120px rgba(0, 245, 212, 0.25)',
    },
    animate: {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      z: 0,
      rotateX: 0,
      filter: 'blur(0px)',
      boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
      transition: {
        duration: 0.95,
        ease: [0.16, 1, 0.3, 1],
        opacity: { duration: 0.6 },
        scale: { type: 'spring', stiffness: 180, damping: 22 },
        filter: { duration: 0.75 },
      }
    }
  },

  // 1: AI Health Information Researcher — Emerge from Background Depth
  1: {
    initial: {
      opacity: 0,
      scale: 0.45,
      x: 0,
      y: 35,
      z: -290,
      rotateX: 16,
      filter: 'blur(20px)',
      boxShadow: '0 0 70px rgba(56, 189, 248, 0.5), 0 0 110px rgba(121, 40, 202, 0.3)',
    },
    animate: {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      z: 0,
      rotateX: 0,
      filter: 'blur(0px)',
      boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
      transition: {
        duration: 1.05,
        delay: 0.1,
        ease: [0.16, 1, 0.3, 1],
        opacity: { duration: 0.7 },
        scale: { type: 'spring', stiffness: 160, damping: 20 },
        filter: { duration: 0.8 },
      }
    }
  },

  // 2: CareerMate — Rise Upward with Holographic Particles
  2: {
    initial: {
      opacity: 0,
      y: 110,
      scale: 0.82,
      rotateX: 14,
      filter: 'blur(14px)',
      boxShadow: '0 0 65px rgba(168, 85, 247, 0.55)',
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      filter: 'blur(0px)',
      boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
      transition: {
        duration: 0.95,
        delay: 0.15,
        ease: [0.16, 1, 0.3, 1],
        opacity: { duration: 0.65 },
        scale: { type: 'spring', stiffness: 175, damping: 22 },
        filter: { duration: 0.75 },
      }
    }
  },

  // 3: Facial Emotion Recognition — Assemble from Scattered Elements
  3: {
    initial: {
      opacity: 0,
      x: -95,
      y: -70,
      scale: 0.72,
      rotateZ: -8,
      rotateY: 18,
      filter: 'blur(15px)',
      boxShadow: '0 0 60px rgba(244, 63, 94, 0.5)',
    },
    animate: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      rotateZ: 0,
      rotateY: 0,
      filter: 'blur(0px)',
      boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
      transition: {
        duration: 0.95,
        delay: 0.2,
        ease: [0.16, 1, 0.3, 1],
        opacity: { duration: 0.65 },
        scale: { type: 'spring', stiffness: 170, damping: 20 },
        filter: { duration: 0.75 },
      }
    }
  },

  // 4: Kaapi Sense Leaf Disease Detector — Emerge through a Scanning Effect
  4: {
    initial: {
      opacity: 0,
      scale: 0.86,
      rotateX: -10,
      filter: 'blur(12px)',
      boxShadow: '0 0 65px rgba(16, 185, 129, 0.5)',
    },
    animate: {
      opacity: 1,
      scale: 1,
      rotateX: 0,
      filter: 'blur(0px)',
      boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
      transition: {
        duration: 0.9,
        delay: 0.25,
        ease: [0.16, 1, 0.3, 1],
        opacity: { duration: 0.6 },
        scale: { type: 'spring', stiffness: 180, damping: 22 },
        filter: { duration: 0.7 },
      }
    }
  },

  // 5: StudyMate — Form from Document/Data Particles
  5: {
    initial: {
      opacity: 0,
      scale: 0.68,
      z: -140,
      rotateY: -12,
      rotateX: 10,
      filter: 'blur(16px)',
      boxShadow: '0 0 65px rgba(245, 158, 11, 0.5), 0 0 95px rgba(0, 245, 212, 0.25)',
    },
    animate: {
      opacity: 1,
      scale: 1,
      z: 0,
      rotateY: 0,
      rotateX: 0,
      filter: 'blur(0px)',
      boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
      transition: {
        duration: 1.0,
        delay: 0.3,
        ease: [0.16, 1, 0.3, 1],
        opacity: { duration: 0.65 },
        scale: { type: 'spring', stiffness: 165, damping: 22 },
        filter: { duration: 0.75 },
      }
    }
  }
};

export default function ProjectCard({ project, index = 0, onSelectProject }) {
  const shouldReduceMotion = useReducedMotion();
  const activeVariant = projectSpecificVariants[index] || projectSpecificVariants[0];

  const initialStyle = shouldReduceMotion
    ? { opacity: 0, y: 15 }
    : activeVariant.initial;

  const animateStyle = shouldReduceMotion
    ? { opacity: 1, y: 0, transition: { duration: 0.4, delay: index * 0.08 } }
    : activeVariant.animate;

  // Visual cues specific to each project concept
  const renderProjectVisualCue = () => {
    switch (index) {
      case 0: // GAN Face Generator
        return (
          <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md glass-panel border border-cyan-400/40 text-[10px] font-mono text-cyan-300 flex items-center gap-1 backdrop-blur-md">
            <Brain size={11} className="text-cyan-400 animate-pulse" />
            <span>GAN LATENT SPACE</span>
          </div>
        );
      case 1: // AI Health Researcher
        return (
          <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md glass-panel border border-sky-400/40 text-[10px] font-mono text-sky-300 flex items-center gap-1 backdrop-blur-md">
            <Activity size={11} className="text-sky-400 animate-pulse" />
            <span>BIOMEDICAL RAG</span>
          </div>
        );
      case 2: // CareerMate
        return (
          <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md glass-panel border border-purple-400/40 text-[10px] font-mono text-purple-300 flex items-center gap-1 backdrop-blur-md">
            <Sparkles size={11} className="text-purple-400 animate-pulse" />
            <span>AI COPILOT + TTS</span>
          </div>
        );
      case 3: // Facial Emotion Recognition
        return (
          <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md glass-panel border border-rose-400/40 text-[10px] font-mono text-rose-300 flex items-center gap-1 backdrop-blur-md">
            <Layers size={11} className="text-rose-400 animate-pulse" />
            <span>FACIAL LANDMARKS CNN</span>
          </div>
        );
      case 4: // Kaapi Sense
        return (
          <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md glass-panel border border-emerald-400/40 text-[10px] font-mono text-emerald-300 flex items-center gap-1 backdrop-blur-md">
            <Scan size={11} className="text-emerald-400 animate-pulse" />
            <span>PATHOLOGY SCAN</span>
          </div>
        );
      case 5: // StudyMate
        return (
          <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md glass-panel border border-amber-400/40 text-[10px] font-mono text-amber-300 flex items-center gap-1 backdrop-blur-md">
            <FileText size={11} className="text-amber-400 animate-pulse" />
            <span>CHROMADB + GEMINI</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={initialStyle}
      animate={animateStyle}
      whileHover={shouldReduceMotion ? {} : { y: -6, scale: 1.015 }}
      style={{ transformStyle: 'preserve-3d' }}
      className="glass-panel rounded-3xl border border-white/10 overflow-hidden flex flex-col h-full hover:border-cyan-400/50 transition-colors duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.6)] group relative"
    >
      {/* Laser Scanning Effect for Project 5 (Kaapi Sense) */}
      {index === 4 && (
        <motion.div
          initial={{ top: '0%', opacity: 0 }}
          animate={{ top: ['0%', '100%', '0%'], opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent pointer-events-none z-30 shadow-[0_0_15px_#10b981]"
        />
      )}

      {/* Media Mockup Header */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-950">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b101d] via-transparent to-transparent opacity-90" />
        
        {/* Project Specific Concept Badge */}
        {renderProjectVisualCue()}

        {/* Metric Chip */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass-panel border border-cyan-400/30 text-[11px] font-mono text-cyan-300 backdrop-blur-md">
          <Zap size={12} className="text-cyan-400 shrink-0" />
          <span className="truncate font-semibold">{project.metrics}</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 sm:p-6 flex flex-col flex-1 text-left justify-between">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <h3 className="font-heading font-black text-xl text-white group-hover:text-cyan-300 transition-colors">
              {project.title}
            </h3>
          </div>

          <p className="font-mono text-xs text-purple-400 mb-2.5">
            {project.subtitle}
          </p>

          <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed mb-3.5">
            {project.description}
          </p>

          {/* Project Tagline */}
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 mb-4 text-[11px] font-mono text-cyan-200/90 italic leading-snug">
            "{project.tagline}"
          </div>

          {/* Architectural highlights */}
          <div className="space-y-1.5 mb-4">
            {project.highlights.slice(0, 2).map((item, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-400 font-light">
                <CheckCircle size={13} className="text-cyan-400 shrink-0 mt-0.5" />
                <span className="leading-snug">{item}</span>
              </div>
            ))}
          </div>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-[10px] font-mono text-slate-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-3.5 border-t border-white/10">
          <button
            onClick={() => onSelectProject(project)}
            className="flex-1 py-2 px-3 rounded-xl bg-cyan-400/10 border border-cyan-400/40 text-cyan-300 hover:bg-cyan-400 hover:text-black font-heading font-semibold text-xs tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5"
          >
            <Layers size={13} />
            <span>ARCH DEEP-DIVE</span>
          </button>

          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-xl glass-panel border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-cyan-400 transition-colors"
            title="View Code on GitHub"
          >
            <GithubIcon size={15} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
