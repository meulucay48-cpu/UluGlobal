'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Container } from '@/components/primitives/Container';

export function Manifesto() {
  const t = useTranslations('manifesto');
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'start 0.25'],
  });

  const words = t('text').split(' ');

  return (
    <section ref={ref} className="relative bg-stone-50 py-9 md:py-9">
      <Container>
        <p className="flex max-w-4xl flex-wrap gap-x-[0.3em] gap-y-1 font-display text-2xl font-light leading-snug text-balance md:text-4xl lg:text-[2.75rem]">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return <Word key={i} progress={scrollYProgress} range={[start, end]} word={word} />;
          })}
        </p>
      </Container>
    </section>
  );
}

function Word({
  progress,
  range,
  word,
}: {
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
  range: [number, number];
  word: string;
}) {
  const color = useTransform(progress, range, ['#C9C0B4', '#23262A']);
  return <motion.span style={{ color }}>{word}</motion.span>;
}
