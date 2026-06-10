'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { projects } from '@/lib/data';
import { rtlLocales, type Locale } from '@/i18n/routing';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function HorizontalProjects() {
  const t = useTranslations('projectsPage');
  const tTypes = useTranslations('quote.project.types');
  const locale = useLocale() as Locale;
  const isRtl = rtlLocales.includes(locale);

  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

      const mm = gsap.matchMedia();

      // Yalnızca masaüstünde ve reduced-motion kapalıyken pin-scroll
      mm.add(
        '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
        () => {
          const distance = track.scrollWidth - window.innerWidth;
          if (distance <= 0) return;

          gsap.to(track, {
            x: isRtl ? distance : -distance,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: () => `+=${distance}`,
              scrub: 1,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });
        },
      );

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [isRtl] },
  );

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-slate-900 py-20 lg:py-0">
      <div className="grain absolute inset-0 opacity-30" />

      {/* Mobil/tablet: yatay kaydırmalı şerit; masaüstü: pin-scroll */}
      <div
        ref={trackRef}
        className="relative flex gap-6 overflow-x-auto px-6 pb-6 lg:h-screen lg:items-center lg:overflow-visible lg:px-16 lg:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {/* Giriş paneli */}
        <div className="flex h-[60vh] w-[80vw] shrink-0 flex-col justify-center sm:w-[420px] lg:h-[70vh]">
          <p className="text-xs uppercase tracking-widest text-gold-400">{t('eyebrow')}</p>
          <h2 className="mt-4 font-display text-4xl font-light leading-tight text-stone-50 md:text-5xl">
            {t('title')}
          </h2>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-stone-400">{t('subtitle')}</p>
          <span className="mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-stone-500">
            {t('scrollHint')}
            <span className="rtl-flip">→</span>
          </span>
        </div>

        {/* Proje panelleri */}
        {projects.map((p, i) => (
          <article
            key={p.id}
            className="group relative h-[60vh] w-[80vw] shrink-0 overflow-hidden rounded-3xl sm:w-[460px] lg:h-[70vh] lg:w-[36vw]"
          >
            <Image
              src={p.image}
              alt={`${tTypes(p.typeKey)} · ${p.city}`}
              fill
              sizes="(max-width: 1024px) 80vw, 36vw"
              className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-8">
              <div>
                <span className="text-xs uppercase tracking-widest text-gold-300">
                  {tTypes(p.typeKey)}
                </span>
                <h3 className="mt-1 font-display text-3xl font-light text-stone-50">{p.city}</h3>
                <div className="mt-3 flex gap-5 text-xs text-stone-300">
                  <span>
                    {t('year')} · {p.year}
                  </span>
                  <span>
                    {t('area')} · {p.area}
                  </span>
                </div>
              </div>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-stone-50/30 text-stone-50 transition-all duration-500 group-hover:border-gold-400 group-hover:bg-gold-500">
                <ArrowUpRight className="h-5 w-5 rtl-flip" />
              </span>
            </div>

            <span className="absolute start-6 top-6 font-display text-5xl font-extralight text-stone-50/30">
              0{i + 1}
            </span>
          </article>
        ))}

        {/* Kapanış paneli — CTA */}
        <div className="flex h-[60vh] w-[70vw] shrink-0 flex-col justify-center sm:w-[320px] lg:h-[70vh]">
          <Link
            href="/projeler"
            className="group inline-flex items-center gap-3 text-stone-50"
          >
            <span className="font-display text-2xl font-light">{t('viewAll')}</span>
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-500 transition-transform duration-500 group-hover:scale-110">
              <ArrowUpRight className="h-5 w-5 rtl-flip" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
