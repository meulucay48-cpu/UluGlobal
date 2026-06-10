'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Scroll ilerledikçe ortadaki görsel tam genişliğe açılır (image expansion). */
export function ScrollExpandImage({
  image,
  caption,
}: {
  image: string;
  caption?: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const wrap = wrapRef.current;
      const section = sectionRef.current;
      if (!wrap || !section) return;

      const mm = gsap.matchMedia();
      mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          wrap,
          { width: '62%', borderRadius: 32 },
          {
            width: '100%',
            borderRadius: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              end: 'top 5%',
              scrub: 1,
              invalidateOnRefresh: true,
            },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="overflow-hidden bg-stone-50 py-10 md:py-16">
      <div className="flex justify-center">
        <div
          ref={wrapRef}
          className="relative aspect-[16/10] w-[62%] overflow-hidden rounded-[32px] md:aspect-[21/9]"
        >
          <Image
            src={image}
            alt={caption ?? ''}
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/15" />
          {caption && (
            <div className="absolute inset-x-0 bottom-0 p-8 md:p-12">
              <p className="max-w-xl font-display text-2xl font-light text-stone-50 md:text-4xl">
                {caption}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
