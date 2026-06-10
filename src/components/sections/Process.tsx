'use client';

import { useTranslations } from 'next-intl';
import { Container } from '@/components/primitives/Container';
import { Reveal } from '@/components/motion/Reveal';

const steps = ['one', 'two', 'three'] as const;

export function Process() {
  const t = useTranslations('process');

  return (
    <section className="bg-stone-50 py-24 md:py-32">
      <Container>
        <Reveal>
          <h2 className="mb-16 font-display text-3xl font-light md:text-5xl">{t('title')}</h2>
        </Reveal>
        <div className="grid gap-px overflow-hidden rounded-3xl border border-stone-200 bg-stone-200 md:grid-cols-3">
          {steps.map((step, i) => (
            <Reveal key={step} delay={i * 0.12}>
              <div className="group h-full bg-stone-50 p-8 transition-colors duration-500 hover:bg-stone-100 md:p-10">
                <span className="font-display text-5xl font-extralight text-stone-300 transition-colors duration-500 group-hover:text-gold-500">
                  0{i + 1}
                </span>
                <h3 className="mt-6 text-xl font-medium text-slate-900">
                  {t(`steps.${step}.title`)}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-500">
                  {t(`steps.${step}.desc`)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
