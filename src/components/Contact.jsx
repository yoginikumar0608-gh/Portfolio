import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Mail, Phone, MapPin, Send, CheckCircle, RotateCw, Copy, ExternalLink, ShieldCheck } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './BrandIcons';
import confetti from 'canvas-confetti';
import { TypewriterText, FlyInHeading } from './TextAnimations';

export default function Contact({ onLoopHome }) {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#00f5d4', '#7928ca', '#f72585']
      });

      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 5000);
    }, 1200);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center px-4 sm:px-6 lg:px-16 max-w-7xl mx-auto py-6 sm:py-12 overflow-y-auto max-h-[calc(100vh-7rem)]">
      <div className="w-full flex flex-col justify-center text-left">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <TypewriterText text="07 • INITIATE CONTACT & SEAMLESS LOOP" showCursor={true} delay={0.1} />
            </div>
            <FlyInHeading from="top" delay={0.15}>
              <h2 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight">
                Start a Conversation
              </h2>
            </FlyInHeading>
            <p className="text-slate-400 text-xs sm:text-sm font-light mt-1">
              Reach out for AI/ML engineering opportunities, project collaborations, or technical discussions.
            </p>
          </div>

          {/* Seamless Loop Button: Return to Home */}
          <button
            onClick={onLoopHome}
            className="px-4 py-2 rounded-full glass-panel border border-cyan-400/40 text-cyan-300 font-mono text-xs flex items-center gap-2 hover:bg-cyan-400/10 hover:border-cyan-400 transition-all w-fit cursor-pointer"
            title="Complete circular loop and return to Home"
          >
            <RotateCw size={13} className="text-cyan-400 animate-spin" style={{ animationDuration: '8s' }} />
            <span>SEAMLESS LOOP: BACK TO HOME →</span>
          </button>
        </div>

        {/* 2-Column Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start w-full">
          
          {/* Left Column: Direct Channels */}
          <div className="lg:col-span-5 space-y-3.5">
            
            {/* Identity Profile Stamp */}
            <div className="glass-panel p-4 rounded-2xl border border-cyan-400/30 bg-gradient-to-br from-cyan-400/5 to-purple-600/5">
              <div className="font-heading font-black text-lg text-white flex items-center gap-2">
                <span>{PERSONAL_INFO.name}</span>
                <ShieldCheck size={16} className="text-cyan-400" />
              </div>
              <div className="text-xs font-mono text-cyan-300 mt-0.5">
                {PERSONAL_INFO.title}
              </div>
            </div>

            {/* Copyable / Clickable Email Card */}
            <div
              onClick={handleCopyEmail}
              className="glass-panel p-4 rounded-2xl border border-white/10 hover:border-cyan-400/40 transition-all cursor-pointer group relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                    <Mail size={17} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">
                      Direct Email (Click to Copy)
                    </span>
                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      onClick={(e) => e.stopPropagation()}
                      className="font-heading font-semibold text-xs sm:text-sm text-white group-hover:text-cyan-300 transition-colors"
                    >
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                </div>
                <span className="text-xs font-mono text-cyan-400">
                  {copiedEmail ? 'COPIED!' : <Copy size={14} />}
                </span>
              </div>
            </div>

            {/* Clickable / Copyable Phone Card */}
            <div
              onClick={handleCopyPhone}
              className="glass-panel p-4 rounded-2xl border border-white/10 hover:border-emerald-400/40 transition-all cursor-pointer group relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                    <Phone size={17} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">
                      Phone (Click to Call / Copy)
                    </span>
                    <a
                      href={`tel:${PERSONAL_INFO.phone}`}
                      onClick={(e) => e.stopPropagation()}
                      className="font-heading font-semibold text-xs sm:text-sm text-white group-hover:text-emerald-300 transition-colors"
                    >
                      +91 {PERSONAL_INFO.phone}
                    </a>
                  </div>
                </div>
                <span className="text-xs font-mono text-emerald-400">
                  {copiedPhone ? 'COPIED!' : <Copy size={14} />}
                </span>
              </div>
            </div>

            {/* LinkedIn Card */}
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel p-4 rounded-2xl border border-white/10 hover:border-purple-400/40 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-105 transition-transform">
                  <LinkedinIcon size={17} />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">
                    LinkedIn Network
                  </span>
                  <span className="font-heading font-semibold text-xs sm:text-sm text-white group-hover:text-purple-300 transition-colors">
                    linkedin.com/in/yogini-s-kumar-360490386
                  </span>
                </div>
              </div>
              <ExternalLink size={15} className="text-slate-500 group-hover:text-purple-400 transition-colors" />
            </a>

            {/* GitHub Card */}
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel p-4 rounded-2xl border border-white/10 hover:border-cyan-400/40 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-700/30 border border-slate-600/30 flex items-center justify-center text-slate-300 group-hover:scale-105 transition-transform">
                  <GithubIcon size={17} />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">
                    GitHub Profile
                  </span>
                  <span className="font-heading font-semibold text-xs sm:text-sm text-white group-hover:text-cyan-300 transition-colors">
                    github.com/yoginikumar0608-gh
                  </span>
                </div>
              </div>
              <ExternalLink size={15} className="text-slate-500 group-hover:text-cyan-400 transition-colors" />
            </a>

            {/* Location Card */}
            <div className="glass-panel p-4 rounded-2xl border border-white/10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400">
                <MapPin size={17} />
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase block">
                  Location
                </span>
                <span className="font-heading font-semibold text-xs sm:text-sm text-white">
                  {PERSONAL_INFO.location}
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Message Transmission Terminal */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-white/10 relative shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
              {submitted ? (
                <div className="py-12 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-400/20 border border-emerald-400 flex items-center justify-center text-emerald-400 mb-4 animate-bounce">
                    <CheckCircle size={32} />
                  </div>
                  <h3 className="font-heading font-black text-2xl text-white mb-2">
                    Transmission Acknowledged!
                  </h3>
                  <p className="text-slate-300 text-sm max-w-md font-light leading-relaxed">
                    Thank you for reaching out. Yogini will review your message and respond directly via email within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1.5">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Mercer"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-sans text-xs focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1.5">
                        Your Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. alex@frontier.ai"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-sans text-xs focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1.5">
                      Subject / Opportunity
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Senior AI/ML Systems Engineer Opportunity"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-sans text-xs focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1.5">
                      Transmission Payload
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Discuss the vision, architecture, or high-impact role..."
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-sans text-xs focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-600 text-black font-heading font-bold text-xs tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(0,245,212,0.4)] hover:shadow-[0_0_40px_rgba(0,245,212,0.6)] transition-all duration-300 disabled:opacity-50"
                  >
                    {submitting ? (
                      <span>TRANSMITTING MESSAGE...</span>
                    ) : (
                      <>
                        <Send size={14} />
                        <span>DISPATCH TRANSMISSION</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
