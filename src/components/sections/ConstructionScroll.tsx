'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Container } from '@/components/primitives/Container';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Gerçek inşaat aşaması fotoğrafları (cross-fade)
const STAGES = [
  { key: 's1', img: 'https://images.unsplash.com/photo-1517089152318-42ec560349c0?auto=format&fit=crop&w=2000&q=80' }, // kazı / zemin
  { key: 's2', img: 'https://images.unsplash.com/photo-1429497419816-9ca5cfb4571a?auto=format&fit=crop&w=2000&q=80' }, // strüktür / vinçler ve iskelet
  { key: 's3', img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=2000&q=80' }, // duvarlar / modern cephe
  { key: 's4', img: 'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&w=2000&q=80' }, // seramik tile + mermer kaplama
  { key: 's5', img: 'https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=2000&q=80' }, // vitrifiye / teslim
] as const;

export function ConstructionScroll() {
  const t = useTranslations('construction');
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [noAnim, setNoAnim] = useState(false);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;
      const mm = gsap.matchMedia();

      mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        const st = ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: `+=${STAGES.length * 90}%`,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const i = Math.min(STAGES.length - 1, Math.floor(self.progress * STAGES.length * 0.999));
            setActive(i);
          },
        });
        return () => st.kill();
      });

      mm.add('(max-width: 767px), (prefers-reduced-motion: reduce)', () => {
        setNoAnim(true);
        return () => setNoAnim(false);
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  const current = noAnim ? STAGES.length - 1 : active;

  return (
    <section
      ref={sectionRef}
      className="relative h-[100svh] min-h-[600px] overflow-hidden bg-slate-900 text-stone-50"
    >
      {/* Cross-fade fotoğraflar + Ken Burns */}
      {STAGES.map((s, i) => (
        <div
          key={s.key}
          className={cn(
            'absolute inset-0 transition-opacity duration-[1200ms] ease-out',
            i === current ? 'opacity-100' : 'opacity-0',
          )}
        >
          <Image
            src={s.img}
            alt={t(`steps.${s.key}.title`)}
            fill
            priority={i === 0}
            sizes="100vw"
            className={cn(
              'object-cover transition-transform ease-out',
              i === current ? 'scale-110 duration-[8000ms]' : 'scale-100 duration-700',
            )}
          />
        </div>
      ))}

      {/* Katmanlı karartma (okunabilirlik + derinlik) */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/45 to-slate-900/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 via-slate-900/10 to-transparent" />

      {/* İçerik */}
      <Container className="relative flex h-full flex-col justify-between py-24 md:py-28">
        <div>
          <p className="mb-4 text-xs uppercase tracking-widest text-gold-300">{t('eyebrow')}</p>
          <h2 className="max-w-2xl font-display text-3xl font-light leading-tight text-balance md:text-5xl">
            {t('title')}
          </h2>
          <p className="mt-4 max-w-md text-sm text-stone-300 md:text-base">{t('subtitle')}</p>
        </div>

        <div>
          {/* Aktif adım */}
          <div className="flex items-end gap-5">
            <span className="font-display text-6xl font-extralight leading-none text-gold-400 md:text-8xl">
              0{current + 1}
            </span>
            <div className="pb-1 md:pb-2">
              <span className="text-xs text-stone-400">/ 0{STAGES.length}</span>
              <h3 className="font-display text-2xl font-light md:text-4xl">
                {t(`steps.${STAGES[current].key}.title`)}
              </h3>
            </div>
          </div>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-stone-300 md:text-base">
            {t(`steps.${STAGES[current].key}.desc`)}
          </p>

          {/* İlerleme adımları */}
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-3 md:grid-cols-5">
            {STAGES.map((s, i) => (
              <div key={s.key}>
                <div className="h-[3px] w-full overflow-hidden rounded-full bg-stone-50/15">
                  <div
                    className={cn(
                      'h-full rounded-full bg-gold-500 transition-all duration-700 ease-out',
                      noAnim || i <= active ? 'w-full' : 'w-0',
                    )}
                  />
                </div>
                <div className="mt-2 flex items-baseline gap-1.5">
                  <span
                    className={cn(
                      'text-[10px] tabular-nums transition-colors',
                      i === current ? 'text-gold-400' : 'text-stone-500',
                    )}
                  >
                    0{i + 1}
                  </span>
                  <span
                    className={cn(
                      'text-xs transition-colors duration-500',
                      i === current ? 'text-stone-50' : 'text-stone-400',
                    )}
                  >
                    {t(`steps.${s.key}.title`)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
