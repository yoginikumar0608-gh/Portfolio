import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { SECTIONS, PERSONAL_INFO } from './data/portfolioData';

// Components
import BackgroundVideo from './components/BackgroundVideo';
import CinematicTransition from './components/CinematicTransition';
import CustomCursor from './components/CustomCursor';
import Navigation from './components/Navigation';
import SectionIndicator from './components/SectionIndicator';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Resume from './components/Resume';
import Contact from './components/Contact';

// Icons
import { Bot, X, Send } from 'lucide-react';

// Cinematic Scene Transition Variants per Section (Zero horizontal page sliding)
const sectionSceneVariants = {
  // 0: HOME — Enters with radial focus & forward scale; Exits dissolving into particles
  0: {
    enter: {
      opacity: 0,
      scale: 0.95,
      filter: 'blur(12px)',
      y: 0,
    },
    center: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
        opacity: { duration: 0.5 },
        scale: { type: 'spring', stiffness: 200, damping: 24 },
        filter: { duration: 0.6 },
      }
    },
    exit: {
      // Hero dissolves while particles gather
      opacity: 0,
      scale: 0.96,
      filter: 'blur(12px)',
      transition: {
        duration: 0.45,
        ease: [0.4, 0, 0.2, 1],
      }
    }
  },

  // 1: ABOUT — Hero dissolves while particles gather and ABOUT materializes; Exits moving backward into depth
  1: {
    enter: {
      opacity: 0,
      scale: 0.91,
      filter: 'blur(14px)',
      y: 12,
    },
    center: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: {
        duration: 0.75,
        ease: [0.16, 1, 0.3, 1],
        opacity: { duration: 0.55 },
        scale: { type: 'spring', stiffness: 190, damping: 22 },
        filter: { duration: 0.65 },
        y: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
      }
    },
    exit: {
      // Moves subtly backward into depth
      opacity: 0,
      scale: 0.86,
      filter: 'blur(12px)',
      transition: {
        duration: 0.45,
        ease: [0.4, 0, 0.2, 1],
      }
    }
  },

  // 2: SKILLS — Skills materialize around AI environment; Exits dissolving into particles
  2: {
    enter: {
      opacity: 0,
      scale: 1.06,
      filter: 'blur(12px)',
      y: 0,
    },
    center: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
        opacity: { duration: 0.5 },
        scale: { type: 'spring', stiffness: 200, damping: 24 },
        filter: { duration: 0.6 },
      }
    },
    exit: {
      // Skill elements dissolve into particles
      opacity: 0,
      scale: 0.94,
      filter: 'blur(14px)',
      transition: {
        duration: 0.45,
        ease: [0.4, 0, 0.2, 1],
      }
    }
  },

  // 3: PROJECTS — Projects emerge from particles; Exits receding into darkness & depth
  3: {
    enter: {
      opacity: 0,
      scale: 0.88,
      filter: 'blur(14px)',
      y: 10,
    },
    center: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: {
        duration: 0.75,
        ease: [0.16, 1, 0.3, 1],
        opacity: { duration: 0.55 },
        scale: { type: 'spring', stiffness: 180, damping: 22 },
        filter: { duration: 0.65 },
      }
    },
    exit: {
      // Projects recede into darkness
      opacity: 0,
      scale: 0.82,
      filter: 'blur(14px)',
      transition: {
        duration: 0.45,
        ease: [0.4, 0, 0.2, 1],
      }
    }
  },

  // 4: EDUCATION — Education timeline emerges vertically; Exits receding into depth
  4: {
    enter: {
      opacity: 0,
      y: 40,
      scale: 0.95,
      filter: 'blur(12px)',
    },
    center: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.75,
        ease: [0.16, 1, 0.3, 1],
        opacity: { duration: 0.5 },
        y: { type: 'spring', stiffness: 190, damping: 22 },
        scale: { duration: 0.6 },
        filter: { duration: 0.6 },
      }
    },
    exit: {
      opacity: 0,
      scale: 0.90,
      y: -15,
      filter: 'blur(10px)',
      transition: {
        duration: 0.45,
        ease: [0.4, 0, 0.2, 1],
      }
    }
  },

  // 5: RESUME — Holographic document summoned from center/depth; Exits receding into depth
  5: {
    enter: {
      opacity: 0,
      scale: 0.72,
      rotateX: 12,
      rotateY: -4,
      filter: 'blur(14px)',
    },
    center: {
      opacity: 1,
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.85,
        ease: [0.16, 1, 0.3, 1],
        opacity: { duration: 0.55 },
        scale: { type: 'spring', stiffness: 175, damping: 22 },
        filter: { duration: 0.7 },
        rotateX: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
        rotateY: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
      }
    },
    exit: {
      // Resume recedes into depth
      opacity: 0,
      scale: 0.76,
      rotateX: -8,
      filter: 'blur(12px)',
      transition: {
        duration: 0.45,
        ease: [0.4, 0, 0.2, 1],
      }
    }
  },

  // 6: CONTACT — Holographic materialization & terminal typing emergence; Exits dissolving into depth
  6: {
    enter: {
      opacity: 0,
      scale: 0.93,
      y: 16,
      filter: 'blur(12px)',
    },
    center: {
      opacity: 1,
      scale: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.75,
        ease: [0.16, 1, 0.3, 1],
        opacity: { duration: 0.55 },
        scale: { type: 'spring', stiffness: 190, damping: 22 },
        filter: { duration: 0.65 },
        y: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
      }
    },
    exit: {
      opacity: 0,
      scale: 0.90,
      filter: 'blur(10px)',
      transition: {
        duration: 0.45,
        ease: [0.4, 0, 0.2, 1],
      }
    }
  }
};

// Reduced motion fallback variants
const reducedMotionVariants = {
  enter: { opacity: 0 },
  center: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.25 } }
};

export default function App() {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'bot',
      text: "Greetings! 👋 I'm **YogiAI**, Yogini S's digital twin. Ask me anything about Yogini's AI & Machine Learning engineering projects, technical stack, academic background at Coorg Institute of Technology, or contact details!"
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const reducedMotion = useReducedMotion();
  const transitionTimerRef = useRef(null);

  // Audio synthesizer (Zero external dependencies)
  const playSfx = useCallback((type = 'slide') => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      if (type === 'slide') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(320, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(640, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      } else {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(520, ctx.currentTime);
        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      }

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch {
      // AudioContext unavailable or blocked by browser autoplay policy
    }
  }, [soundEnabled]);

  // Unified Section Transition Manager (Debounced, Locks out simultaneous triggers)
  const changeSection = useCallback((targetIndex) => {
    if (isTransitioning) return; // Prevent multiple transitions from triggering simultaneously!

    const total = SECTIONS.length;
    const normalized = ((targetIndex % total) + total) % total;
    if (normalized === currentSectionIndex) return;

    setIsTransitioning(true);
    setCurrentSectionIndex(normalized);
    playSfx('slide');

    if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
    transitionTimerRef.current = setTimeout(() => {
      setIsTransitioning(false);
    }, 750);
  }, [currentSectionIndex, isTransitioning, playSfx]);

  const goToSection = useCallback((targetIndex) => {
    changeSection(targetIndex);
  }, [changeSection]);

  const goNext = useCallback(() => {
    changeSection(currentSectionIndex + 1);
  }, [changeSection, currentSectionIndex]);

  const goPrev = useCallback(() => {
    changeSection(currentSectionIndex - 1);
  }, [changeSection, currentSectionIndex]);

  // Mouse Wheel / Trackpad spatial navigation (Debounced & Transition-Aware)
  const isWheelingRef = useRef(false);
  useEffect(() => {
    const handleWheel = (e) => {
      // Ignore if user is scrolling inside chat window or deep dive modal
      if (e.target.closest('#chat-window') || e.target.closest('.overflow-y-auto')) {
        return;
      }

      if (isWheelingRef.current || isTransitioning) return;

      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (Math.abs(delta) > 30) {
        isWheelingRef.current = true;
        if (delta > 0) {
          goNext();
        } else {
          goPrev();
        }
        setTimeout(() => {
          isWheelingRef.current = false;
        }, 800);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [goNext, goPrev, isTransitioning]);

  // Keyboard navigation (Arrow keys)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Do not trigger while typing in an input
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        goNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        goPrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goNext, goPrev]);

  // Touch Swipe Gesture detection (Mobile friendly, NO horizontal carousel translation)
  const touchStartRef = useRef({ x: 0, y: 0, time: 0 });

  const handleTouchStart = (e) => {
    if (e.touches && e.touches[0]) {
      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        time: Date.now(),
      };
    }
  };

  const handleTouchEnd = (e) => {
    if (isTransitioning) return;
    if (e.target.closest('#chat-window') || e.target.closest('.overflow-y-auto')) return;

    if (e.changedTouches && e.changedTouches[0]) {
      const dx = e.changedTouches[0].clientX - touchStartRef.current.x;
      const dy = e.changedTouches[0].clientY - touchStartRef.current.y;
      const dt = Date.now() - touchStartRef.current.time;

      if (dt < 700) {
        // Horizontal swipe gesture
        if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy)) {
          if (dx < 0) {
            goNext();
          } else {
            goPrev();
          }
        }
        // Vertical swipe gesture
        else if (Math.abs(dy) > 75 && Math.abs(dy) > Math.abs(dx)) {
          if (dy < 0) {
            goNext();
          } else {
            goPrev();
          }
        }
      }
    }
  };

  // Section Component Mapper
  const renderCurrentSection = () => {
    switch (currentSectionIndex) {
      case 0:
        return <Hero onNavigate={goToSection} />;
      case 1:
        return <About onNavigate={goToSection} />;
      case 2:
        return <Skills />;
      case 3:
        return <Projects />;
      case 4:
        return <Education />;
      case 5:
        return <Resume />;
      case 6:
        return <Contact onLoopHome={() => goToSection(0)} />;
      default:
        return <Hero onNavigate={goToSection} />;
    }
  };

  // Chatbot logic
  const handleSendChat = (e) => {
    e?.preventDefault();
    const query = chatInput.trim();
    if (!query || isTyping) return;

    setChatMessages((prev) => [...prev, { sender: 'user', text: query }]);
    setChatInput('');
    setIsTyping(true);

    setTimeout(() => {
      let botResponse = "I'm YogiAI, Yogini S's AI digital assistant! You can explore her flagship AI projects like AI Face Generator and CareerMate, examine her skills in Generative AI, RAG, Computer Vision, and Deep Learning, or get in touch.";
      const q = query.toLowerCase();

      if (/project|built|face|health|careermate|emotion|leaf|kaapi|studymate/i.test(q)) {
        botResponse = "**Yogini's Flagship AI Systems**:\n1. **AI Face Generator**: GAN-based Synthetic Face Generation (Python, TensorFlow, Keras, GAN)\n2. **AI Health Information Researcher**: AI-powered Health Retrieval & Research (Generative AI, RAG, LangChain)\n3. **CareerMate**: AI-powered Resume & Career Intelligence Assistant (LangChain, RAG, Generative AI, Gradio, TTS)\n4. **Facial Emotion Recognition**: CNN-based Emotion Classification (OpenCV, CNN, TensorFlow)\n5. **Kaapi Sense Leaf Disease Detector**: Coffee Leaf Disease Detection (Computer Vision, CNN)\n6. **StudyMate**: RAG-based Intelligent Study Assistant (LangChain, ChromaDB, Gemini, RAG)\n\nNavigate to Section 04 (PROJECTS) for system deep-dives!";
      } else if (/skill|stack|python|tensorflow|pytorch|langchain|rag|vision|framework/i.test(q)) {
        botResponse = "**Technical Competencies**:\n• **Languages**: Python, C, Java, JavaScript, SQL\n• **Frameworks & Libraries**: TensorFlow, PyTorch, Hugging Face, LangChain, LangGraph, OpenCV, React\n• **Tools & Platforms**: Git, GitHub, VS Code, Google Colab, Jupyter, Android Studio, MongoDB Compass, Streamlit, Gradio, AWS\n• **AI / ML**: Machine Learning, Deep Learning, Generative AI, RAG, Computer Vision\n• **Core CS**: Data Structures & Algorithms, OOP, DBMS, Operating Systems, Computer Networks, Software Engineering\n• **Web & Dev**: HTML, CSS, React, Node.js";
      } else if (/contact|email|phone|reach|hire|work|message/i.test(q)) {
        botResponse = `You can connect with Yogini directly:\n• **Email**: \`${PERSONAL_INFO.email}\`\n• **Phone**: +91 ${PERSONAL_INFO.phone}\n• **Location**: ${PERSONAL_INFO.location}\n• **LinkedIn**: linkedin.com/in/yogini-s-kumar-360490386\n• **GitHub**: github.com/yoginikumar0608-gh\n\nOr navigate to Section 07 (CONTACT) to send a transmission!`;
      } else if (/education|college|cgpa|degree|background|university/i.test(q)) {
        botResponse = "**Academic Background**:\n• **Degree**: Bachelor of Engineering in Artificial Intelligence & Machine Learning\n• **Institution**: Coorg Institute of Technology\n• **Duration**: 2024 – 2028\n• **CGPA**: 8.16 / 10.0\n\nNavigate to Section 05 (EDUCATION) for verified credentials & certifications!";
      } else if (/certif/i.test(q)) {
        botResponse = "**Verified Certifications**:\n• **AI & GenAI**: Getting Started with Generative AI (IBM), AI Literacy (IBM), Generative AI (IBM), Agentic AI, AI: From Algorithms to Decisions (EBSCO)\n• **Programming & Database**: DBMS & SQL (Infosys Springboard), Understanding Classes & Objects in Java (Infosys Springboard)\n• **Professional Development**: Becoming a Strategic Thinker, Planning for Success, Presentation Content (EBSCO)";
      } else if (/leadership|responsibility|avinyam|sports/i.test(q)) {
        botResponse = "**Positions of Responsibility**:\n• **Avinyam Student Association**: Student Member (technical events & coordination)\n• **Event Organizer**: Event planning, logistics & participant coordination\n• **Sports**: Active participant (teamwork & leadership)";
      }

      setChatMessages((prev) => [...prev, { sender: 'bot', text: botResponse }]);
      setIsTyping(false);
      playSfx('click');
    }, 600);
  };

  const activeVariants = reducedMotion
    ? reducedMotionVariants
    : (sectionSceneVariants[currentSectionIndex] || sectionSceneVariants[0]);

  return (
    <div 
      className="relative w-screen h-screen overflow-hidden bg-[#05070d] text-white select-none max-w-full"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* 1. Cinematic Persistent AI Robot Background (Never resets or freezes) */}
      <BackgroundVideo currentSectionIndex={currentSectionIndex} />

      {/* 2. Cinematic Particle Gathering & Dispersal Overlay */}
      <CinematicTransition
        currentSectionIndex={currentSectionIndex}
        isTransitioning={isTransitioning}
        reducedMotion={reducedMotion}
      />

      {/* 3. Custom Interactive Luminous Cursor */}
      <CustomCursor />

      {/* 4. Futuristic Global Navigation Bar */}
      <Navigation
        currentSectionIndex={currentSectionIndex}
        onSelectSection={goToSection}
        onPrevSection={goPrev}
        onNextSection={goNext}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
      />

      {/* 5. Cinematic Scene Container (In-Place 3D Transitions, Zero Horizontal Page Sliding) */}
      <main 
        className="relative w-full h-full flex items-center justify-center pt-16 pb-16 overflow-hidden max-w-full"
        style={{ perspective: 1200 }}
      >
        <AnimatePresence 
          mode="wait" 
          onExitComplete={() => setIsTransitioning(false)}
        >
          <motion.div
            key={currentSectionIndex}
            variants={activeVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full h-full flex items-center justify-center pointer-events-auto"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {renderCurrentSection()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 6. Spatial Coordinates & Progress Indicator */}
      <SectionIndicator
        currentSectionIndex={currentSectionIndex}
        onSelectSection={goToSection}
      />

      {/* 7. Floating AI Twin Chatbot Trigger */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setChatOpen(!chatOpen)}
          className="relative w-14 h-14 rounded-full bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-600 text-black flex items-center justify-center shadow-[0_0_30px_rgba(0,245,212,0.6)] hover:scale-110 transition-all duration-300 group"
          title="Chat with Yogini's AI Twin"
        >
          <span className="absolute inset-0 rounded-full border-2 border-cyan-400 animate-ping opacity-30" />
          <Bot size={24} className="group-hover:rotate-12 transition-transform" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[#05070d]" />
        </button>
      </div>

      {/* 8. Conversational AI Twin Modal Window */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            id="chat-window"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] h-[520px] max-h-[calc(100vh-8rem)] glass-panel rounded-3xl border border-cyan-400/40 shadow-[0_25px_60px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden z-50 text-left"
          >
            {/* Chat Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-cyan-400/20 border border-cyan-400 flex items-center justify-center text-cyan-400">
                  <Bot size={18} />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm text-white flex items-center gap-1.5">
                    YogiAI <span className="text-[10px] font-mono text-cyan-400">TWIN</span>
                  </h4>
                  <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Online • Knowledge Graph Active
                  </span>
                </div>
              </div>
              <button
                onClick={() => setChatOpen(false)}
                className="w-8 h-8 rounded-full glass-panel flex items-center justify-center text-slate-400 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 font-sans text-xs">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                    msg.sender === 'user'
                      ? 'ml-auto bg-gradient-to-r from-cyan-400 to-purple-600 text-black font-medium'
                      : 'mr-auto glass-panel border border-white/10 text-slate-200'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                </div>
              ))}
              {isTyping && (
                <div className="glass-panel p-2.5 rounded-2xl w-16 flex items-center justify-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
              )}
            </div>

            {/* Quick Prompt Chips */}
            <div className="px-3 py-2 border-t border-white/5 flex gap-1.5 overflow-x-auto text-[10px] font-mono whitespace-nowrap">
              <button
                onClick={() => { setChatInput('What are your top projects?'); }}
                className="px-2.5 py-1 rounded-full glass-panel border border-white/10 text-slate-300 hover:text-cyan-400 hover:border-cyan-400/40"
              >
                Top Projects
              </button>
              <button
                onClick={() => { setChatInput('What is your tech stack?'); }}
                className="px-2.5 py-1 rounded-full glass-panel border border-white/10 text-slate-300 hover:text-cyan-400 hover:border-cyan-400/40"
              >
                Tech Stack
              </button>
              <button
                onClick={() => { setChatInput('How can I contact you?'); }}
                className="px-2.5 py-1 rounded-full glass-panel border border-white/10 text-slate-300 hover:text-cyan-400 hover:border-cyan-400/40"
              >
                Contact Info
              </button>
            </div>

            {/* Chat Input Bar */}
            <form onSubmit={handleSendChat} className="p-3 border-t border-white/10 flex items-center gap-2 bg-[#05070d]/80">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask YogiAI about background, stack..."
                className="flex-1 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white font-sans text-xs focus:outline-none focus:border-cyan-400"
              />
              <button
                type="submit"
                className="w-8 h-8 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-600 text-black flex items-center justify-center hover:scale-105 transition-transform"
              >
                <Send size={13} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
