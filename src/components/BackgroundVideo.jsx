import React from 'react';
import AIWorld from './AIWorld/AIWorld';

/**
 * BackgroundVideo (now Cinematic AI World Host):
 * Houses the continuously looping personalized 3D AI Robot (Y-BOT)
 * and ambient digital environment behind all portfolio sections.
 * The robot never freezes or restarts when changing sections.
 */
const yBotStates = [
  "Y-BOT // CURIOUS • SCANNING ENVIRONMENT",
  "Y-BOT // OBSERVING • PROCESSING PROFILE",
  "Y-BOT // SCANNING TECHNOLOGY NODES",
  "Y-BOT // ANALYZING PROJECT INTERFACES",
  "Y-BOT // PROCESSING INFORMATION",
  "Y-BOT // DOCUMENT SCANNING EFFECT",
  "Y-BOT // FRIENDLY • ATTENTIVE STATE"
];

export default function BackgroundVideo({ currentSectionIndex = 0 }) {
  const statusLabel = yBotStates[currentSectionIndex] || yBotStates[0];

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      {/* 1. 3D Procedural AI Robot (Y-BOT) & Particle Space */}
      <AIWorld currentSectionIndex={currentSectionIndex} />

      {/* 2. Ambient Gradient Atmospheric Orbs */}
      <div className="absolute -top-32 -left-32 w-[650px] h-[650px] bg-cyan-500/10 rounded-full blur-[140px] animate-pulse-glow" />
      <div 
        className="absolute -bottom-32 -right-32 w-[700px] h-[700px] bg-purple-600/10 rounded-full blur-[160px] animate-pulse-glow" 
        style={{ animationDelay: '1.8s' }} 
      />

      {/* 3. Subtle Cybernetic Grid Overlay */}
      <div className="absolute inset-0 cyber-grid-overlay opacity-30 pointer-events-none" />

      {/* 4. Cinematic Depth Vignette for Optimal Text Legibility */}
      <div className="absolute inset-0 bg-radial-vignette from-transparent via-[#05070d]/50 to-[#05070d] pointer-events-none" />

      {/* 5. Minimal Sci-Fi AI Telemetry Status Stamp */}
      <div className="absolute top-20 right-8 hidden lg:flex items-center gap-2.5 font-mono text-[10px] tracking-widest text-slate-500/70 uppercase select-none pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        <span>{statusLabel}</span>
      </div>
    </div>
  );
}
