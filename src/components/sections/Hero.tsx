'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/primitives/Button';
import { TextReveal } from '@/components/motion/TextReveal';
import { Magnetic } from '@/components/motion/MagneticButton';
import { RotatingWord } from '@/components/motion/RotatingWord';

export function Hero() {
  const t = useTranslations('hero');
  const tc = useTranslations('categories.items');
  const rotating = ['ceramic', 'vitrified', 'chemicals'].map((k) => tc(`${k}.name`));
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      <motion.div style={{ y: reduce ? 0 : imageY }} className="absolute inset-0 scale-110">
        <Image
          src="/hero.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/55 via-slate-900/20 to-slate-900/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/45 to-transparent" />
      </motion.div>

      <motion.div
        style={{ y: reduce ? 0 : contentY, opacity: reduce ? 1 : opacity }}
        className="relative mx-auto flex h-full max-w-container flex-col justify-end px-6 pb-24 md:px-10 lg:px-16 lg:pb-32"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-5 text-xs uppercase tracking-widest text-gold-300"
        >
          {t('eyebrow')}
        </motion.p>

        <h1 className="max-w-4xl font-display text-4xl font-light leading-[1.05] text-stone-50 text-balance sm:text-5xl md:text-6xl lg:text-7xl">
          <TextReveal text={t('title')} delay={0.5} />
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-6 flex items-center gap-3 text-stone-100"
        >
          <span className="text-xs uppercase tracking-widest text-stone-300">
            {t('expertise')}
          </span>
          <span className="h-px w-8 bg-gold-400/60" />
          <RotatingWord
            words={rotating}
            className="font-display text-xl font-light text-gold-300 md:text-2xl"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-5 max-w-xl text-base leading-relaxed text-stone-200 md:text-lg"
        >
          {t('subtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.15 }}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <Magnetic>
            <Button href="/teklif" variant="gold" size="lg">
              {t('cta')}
              <ArrowRight className="h-4 w-4 rtl-flip transition-transform group-hover:translate-x-1" />
            </Button>
          </Magnetic>
          <Button href="/urunler" variant="outline" size="lg" className="border-stone-50/40 text-stone-50 hover:border-gold-300 hover:text-gold-300">
            {t('secondary')}
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
      >
        <span className="text-[10px] uppercase tracking-widest text-stone-200/80">
          {t('scroll')}
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="mx-auto mt-2 h-8 w-px bg-gradient-to-b from-stone-200/80 to-transparent"
        />
      </motion.div>
    </section>
  );
}
