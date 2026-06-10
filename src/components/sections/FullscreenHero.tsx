'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Container } from '@/components/primitives/Container';
import { TextReveal } from '@/components/motion/TextReveal';

export function FullscreenHero({
  eyebrow,
  title,
  subtitle,
  image,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  image: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '45%']);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[600px] w-full overflow-hidden">
      <motion.div style={{ y: reduce ? 0 : imageY }} className="absolute inset-0 scale-110">
        <Image src={image} alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/55 via-slate-900/35 to-stone-50" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/40 to-transparent" />
      </motion.div>

      <motion.div
        style={{ y: reduce ? 0 : contentY, opacity: reduce ? 1 : opacity }}
        className="relative mx-auto flex h-full max-w-container flex-col justify-end px-6 pb-24 md:px-10 lg:px-16 lg:pb-32"
      >
        {eyebrow && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mb-5 text-xs uppercase tracking-widest text-gold-300"
          >
            {eyebrow}
          </motion.p>
        )}

        <h1 className="max-w-4xl font-display text-4xl font-light leading-[1.05] text-stone-50 text-balance sm:text-5xl md:text-6xl lg:text-7xl">
          <TextReveal text={title} delay={0.4} />
        </h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-stone-200 md:text-lg"
          >
            {subtitle}
          </motion.p>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="h-10 w-px bg-gradient-to-b from-stone-200/80 to-transparent"
        />
      </motion.div>
    </section>
  );
}
