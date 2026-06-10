'use client';

import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/primitives/Container';
import { Button } from '@/components/primitives/Button';
import { Reveal } from '@/components/motion/Reveal';
import { Magnetic } from '@/components/motion/MagneticButton';
import { Parallax } from '@/components/motion/Parallax';
import Image from 'next/image';

export function CtaBand() {
  const t = useTranslations('ctaBand');

  return (
    <section className="relative overflow-hidden bg-slate-900 py-28 md:py-40">
      <Parallax speed={0.3} className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2000&q=80"
          alt=""
          fill
          className="object-cover opacity-25"
        />
      </Parallax>
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-slate-900/40" />

      <Container className="relative text-center">
        <Reveal>
          <h2 className="mx-auto max-w-3xl font-display text-3xl font-light leading-tight text-stone-50 text-balance md:text-5xl">
            {t('title')}
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-10 flex justify-center">
            <Magnetic>
              <Button href="/teklif" variant="gold" size="lg">
                {t('button')}
                <ArrowRight className="h-4 w-4 rtl-flip transition-transform group-hover:translate-x-1" />
              </Button>
            </Magnetic>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
