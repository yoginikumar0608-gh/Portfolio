import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * 1. TypewriterText
 * Types text letter-by-letter with an optional subtle blinking cursor
 */
export function TypewriterText({ text, className = "", delay = 0.1, showCursor = false, speed = 0.03 }) {
  const letters = Array.from(text);
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <span className={`inline-flex items-center flex-wrap ${className}`}>
        {text}
        {showCursor && (
          <span className="inline-block w-1.5 h-3.5 bg-cyan-400 ml-1 rounded-sm" />
        )}
      </span>
    );
  }

  const container = {
    hidden: { opacity: 0 },
    visible: () => ({
      opacity: 1,
      transition: { staggerChildren: speed, delayChildren: delay }
    })
  };

  const child = {
    hidden: { opacity: 0, y: 1 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', damping: 15, stiffness: 400 }
    }
  };

  return (
    <motion.span
      variants={container}
      initial="hidden"
      animate="visible"
      className={`inline-flex items-center flex-wrap ${className}`}
    >
      {letters.map((char, index) => (
        <motion.span key={index} variants={child} className="inline-block">
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
      {showCursor && (
        <span className="inline-block w-1.5 h-3.5 bg-cyan-400 ml-1 rounded-sm animate-pulse" />
      )}
    </motion.span>
  );
}

/**
 * 2. FlyInHeading
 * Flies in smoothly from outside the viewport (top or bottom) with cinematic cubic-bezier easing
 */
export function FlyInHeading({ children, className = "", from = "top", delay = 0.1 }) {
  const shouldReduceMotion = useReducedMotion();
  const initialY = shouldReduceMotion ? 0 : (from === "top" ? -60 : 60);

  return (
    <motion.div
      initial={{ opacity: 0, y: initialY, filter: shouldReduceMotion ? 'none' : 'blur(6px)' }}
      animate={{ opacity: 1, y: 0, filter: 'none' }}
      transition={{
        duration: shouldReduceMotion ? 0.3 : 0.85,
        delay,
        ease: [0.16, 1, 0.3, 1],
        opacity: { duration: shouldReduceMotion ? 0.3 : 0.5, delay },
        filter: { duration: shouldReduceMotion ? 0.2 : 0.6, delay }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * 3. MaterializeText
 * Materializes from the center with scale and blur expansion
 */
export function MaterializeText({ children, className = "", delay = 0.15 }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: shouldReduceMotion ? 1 : 0.92,
        filter: shouldReduceMotion ? 'none' : 'blur(10px)'
      }}
      animate={{ opacity: 1, scale: 1, filter: 'none' }}
      transition={{
        duration: shouldReduceMotion ? 0.3 : 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1],
        scale: { type: 'spring', stiffness: 200, damping: 24, delay },
        filter: { duration: shouldReduceMotion ? 0.2 : 0.65, delay },
        opacity: { duration: shouldReduceMotion ? 0.3 : 0.5, delay }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * 4. DepthEmergeText
 * Emerges from deep space using scale and blur
 */
export function DepthEmergeText({ children, className = "", delay = 0.2 }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: shouldReduceMotion ? 1 : 0.75,
        filter: shouldReduceMotion ? 'none' : 'blur(12px)'
      }}
      animate={{ opacity: 1, scale: 1, filter: 'none' }}
      transition={{
        duration: shouldReduceMotion ? 0.3 : 0.85,
        delay,
        ease: [0.16, 1, 0.3, 1],
        scale: { type: 'spring', stiffness: 180, damping: 20, delay },
        filter: { duration: shouldReduceMotion ? 0.2 : 0.7, delay },
        opacity: { duration: shouldReduceMotion ? 0.3 : 0.6, delay }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * 5. FadeRiseText
 * Smooth subtle vertical lift for supporting text and descriptions
 */
export function FadeRiseText({ children, className = "", delay = 0.25, distance = 16 }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : distance }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: shouldReduceMotion ? 0.3 : 0.7,
        delay,
        ease: [0.16, 1, 0.3, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
