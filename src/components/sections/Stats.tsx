'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useInView, useReducedMotion } from 'framer-motion';
import { Container } from '@/components/primitives/Container';
import { Reveal } from '@/components/motion/Reveal';
import { stats } from '@/lib/data';

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setN(value);
      return;
    }
    let raf = 0;
    const duration = 1800;
    let startTime: number | null = null;
    const tick = (ts: number) => {
      if (startTime === null) startTime = ts;
      const p = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, reduce]);

  return (
    <span ref={ref} className="tabular-nums">
      {n.toLocaleString('tr-TR')}
      {suffix}
    </span>
  );
}

export function Stats() {
  const t = useTranslations('stats');

  return (
    <section className="relative overflow-hidden bg-slate-900 py-24 text-stone-50 md:py-32">
      <div className="grain absolute inset-0 opacity-30" />
      <Container className="relative">
        <Reveal>
          <h2 className="mb-16 text-center font-display text-3xl font-light text-stone-200 md:text-4xl">
            {t('title')}
          </h2>
        </Reveal>
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.key} delay={i * 0.1}>
              <div className="text-center">
                <div className="font-display text-5xl font-light text-gold-400 md:text-6xl">
                  <Counter value={s.value} suffix={s.suffix} />
                </div>
                <p className="mt-3 text-xs uppercase tracking-widest text-stone-400 md:text-sm">
                  {t(s.key)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
