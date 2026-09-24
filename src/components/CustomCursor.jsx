import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isTouch] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(pointer: coarse)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (isTouch) return;

    const onMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      // Check if hovering interactive element
      const target = e.target;
      if (
        target &&
        (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.closest('button') ||
          target.closest('a') ||
          target.getAttribute('role') === 'button' ||
          target.classList.contains('cursor-pointer'))
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <>
      {/* Center sharp dot */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full bg-cyan-400 pointer-events-none z-50 shadow-[0_0_12px_#00f5d4]"
        animate={{
          x: mousePosition.x - 5,
          y: mousePosition.y - 5,
          scale: isHovering ? 0.6 : 1,
        }}
        transition={{ type: 'spring', damping: 40, stiffness: 600, mass: 0.1 }}
      />

      {/* Trailing luminous cyber ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-cyan-400/50 pointer-events-none z-50 backdrop-blur-[1px]"
        animate={{
          x: mousePosition.x - (isHovering ? 28 : 16),
          y: mousePosition.y - (isHovering ? 28 : 16),
          width: isHovering ? 56 : 32,
          height: isHovering ? 56 : 32,
          borderColor: isHovering ? '#a855f7' : 'rgba(0, 245, 212, 0.6)',
          backgroundColor: isHovering ? 'rgba(168, 85, 247, 0.1)' : 'rgba(0, 245, 212, 0.03)',
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 220, mass: 0.2 }}
      />
    </>
  );
}
