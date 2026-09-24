import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * CinematicTransition:
 * Ambient particle gathering & dispersal wave effect triggered during section transitions.
 * Accompanying the AI world transformation:
 * - Particles gather toward center or disperse outward depending on the scene transition.
 * - Subtle holographic scan-line flash.
 * - Fully non-blocking (pointer-events-none).
 */
export default function CinematicTransition({
  currentSectionIndex,
  isTransitioning,
  reducedMotion = false,
}) {
  // Determine transition characteristic:
  // Gathering: HOME -> ABOUT, EDUCATION -> RESUME, RESUME -> CONTACT
  // Dispersal: ABOUT -> SKILLS, SKILLS -> PROJECTS, PROJECTS -> EDUCATION
  const isGathering = useMemo(() => {
    return [0, 1, 5, 6].includes(currentSectionIndex);
  }, [currentSectionIndex]);

  // Generate 20 lightweight radial particle rays
  const particles = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => {
      const angle = (i / 20) * Math.PI * 2;
      const distance = 160 + (i % 3) * 60;
      return {
        id: i,
        startX: isGathering ? Math.cos(angle) * distance : 0,
        startY: isGathering ? Math.sin(angle) * distance : 0,
        targetX: isGathering ? 0 : Math.cos(angle) * distance,
        targetY: isGathering ? 0 : Math.sin(angle) * distance,
        color: i % 2 === 0 ? 'rgba(0, 245, 212, 0.75)' : 'rgba(168, 85, 247, 0.65)',
        size: 3 + (i % 3) * 1.5,
      };
    });
  }, [isGathering]);

  if (reducedMotion || !isTransitioning) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden flex items-center justify-center">
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            key={currentSectionIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative w-full h-full flex items-center justify-center"
          >
            {/* 1. Holographic Central Lens Flare Pulse */}
            <motion.div
              initial={{ scale: isGathering ? 0.3 : 0.8, opacity: 0 }}
              animate={{
                scale: isGathering ? [0.3, 1.4, 1.1] : [0.8, 1.6, 2.0],
                opacity: [0, 0.35, 0],
              }}
              transition={{ duration: 0.65, ease: 'easeOut' }}
              className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-cyan-400/20 via-purple-600/15 to-transparent blur-3xl pointer-events-none"
            />

            {/* 2. Micro Particle Dispersal / Gathering Swarm */}
            {particles.map((p) => (
              <motion.div
                key={p.id}
                initial={{
                  x: p.startX,
                  y: p.startY,
                  opacity: 0,
                  scale: isGathering ? 1.4 : 0.3,
                }}
                animate={{
                  x: p.targetX,
                  y: p.targetY,
                  opacity: [0, 0.9, 0],
                  scale: isGathering ? 0.2 : 1.3,
                }}
                transition={{
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{
                  width: p.size,
                  height: p.size,
                  backgroundColor: p.color,
                  boxShadow: `0 0 10px ${p.color}`,
                }}
                className="absolute rounded-full"
              />
            ))}

            {/* 3. Subtle Cyan Holographic Scanner Beam */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: [0, 0.6, 0], scaleX: [0, 1.2, 1] }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent shadow-[0_0_15px_#00f5d4]"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
