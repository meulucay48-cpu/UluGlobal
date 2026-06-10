'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/** Yumuşak takipli özel imleç: küçük nokta + gecikmeli halka, hover'da büyür. */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [hidden, setHidden] = useState(true);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 280, damping: 30, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 280, damping: 30, mass: 0.5 });

  useEffect(() => {
    // Sadece ince işaretçi (fare) olan ve hareket azaltma kapalı cihazlarda
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduce) return;
    setEnabled(true);
    document.documentElement.classList.add('has-cursor');

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHidden(false);
      const t = e.target as HTMLElement;
      setHovering(!!t.closest('a, button, [data-cursor], input, textarea, select, label'));
    };
    const leave = () => setHidden(true);

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseleave', leave);
    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseleave', leave);
      document.documentElement.classList.remove('has-cursor');
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[120] hidden md:block" aria-hidden>
      {/* Halka (gecikmeli takip) */}
      <motion.div className="absolute left-0 top-0" style={{ x: ringX, y: ringY }}>
        <motion.div
          className="absolute rounded-full border border-gold-500/70"
          style={{ translateX: '-50%', translateY: '-50%' }}
          animate={{
            width: hovering ? 56 : 34,
            height: hovering ? 56 : 34,
            opacity: hidden ? 0 : hovering ? 1 : 0.55,
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        />
      </motion.div>
      {/* Nokta (anlık takip) */}
      <motion.div className="absolute left-0 top-0" style={{ x, y }}>
        <motion.div
          className="absolute h-1.5 w-1.5 rounded-full bg-gold-500"
          style={{ translateX: '-50%', translateY: '-50%' }}
          animate={{ opacity: hidden ? 0 : 1, scale: hovering ? 0 : 1 }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
    </div>
  );
}
