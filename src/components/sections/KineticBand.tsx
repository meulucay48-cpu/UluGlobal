'use client';

import { useTranslations } from 'next-intl';
import { VelocityRow } from '@/components/motion/VelocityText';

export function KineticBand() {
  const t = useTranslations('categories.items');
  const words = ['ceramic', 'vitrified', 'armature', 'chemicals'].map((k) => t(`${k}.name`));
  const line = words.join('  •  ');

  return (
    <section className="relative overflow-hidden bg-slate-900 py-16 md:py-24">
      <div className="grain absolute inset-0 opacity-30" />
      <div className="relative flex flex-col gap-2 md:gap-3">
        <VelocityRow baseVelocity={3}>
          <span className="font-display text-5xl font-light text-stone-50 md:text-7xl lg:text-8xl">
            {line}
            <span className="mx-6 text-gold-500">•</span>
          </span>
        </VelocityRow>
        <VelocityRow baseVelocity={-3}>
          <span
            className="font-display text-5xl font-light md:text-7xl lg:text-8xl"
            style={{
              WebkitTextStroke: '1px rgba(216,194,155,0.55)',
              color: 'transparent',
            }}
          >
            ULU GLOBAL YAPI
            <span className="mx-6" style={{ WebkitTextStroke: '0', color: '#B08D57' }}>
              ✦
            </span>
          </span>
        </VelocityRow>
      </div>
    </section>
  );
}
