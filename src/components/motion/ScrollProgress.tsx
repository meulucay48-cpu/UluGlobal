'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

/** Sayfanın en üstünde, kaydırma ilerlemesini gösteren ince altın çubuk. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[85] h-[3px] origin-left bg-gradient-to-r from-gold-500 to-gold-300 ltr:origin-left rtl:origin-right"
      aria-hidden
    />
  );
}
