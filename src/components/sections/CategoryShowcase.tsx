'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ArrowUpRight } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { Container } from '@/components/primitives/Container';
import { Reveal } from '@/components/motion/Reveal';
import { Tilt } from '@/components/motion/Tilt';
import { categories } from '@/lib/data';

export function CategoryShowcase() {
  const t = useTranslations('categories');

  return (
    <section className="bg-stone-100 py-24 md:py-32">
      <Container>
        <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <h2 className="font-display text-3xl font-light md:text-5xl">{t('title')}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-md text-sm leading-relaxed text-slate-500 md:text-base">
              {t('subtitle')}
            </p>
          </Reveal>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {categories.map((cat, i) => (
            <Reveal key={cat.key} delay={i * 0.08}>
              <Link href={`/urunler/${cat.slug}`} className="group block">
                <Tilt className="relative overflow-hidden rounded-3xl bg-slate-900 transition-transform duration-500 group-hover:-translate-y-1.5">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={cat.image}
                      alt={t(`items.${cat.key}.name`)}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
                    <div
                      className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{
                        background: `radial-gradient(120% 80% at 50% 100%, ${cat.tone}40, transparent)`,
                      }}
                    />
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-xl font-normal text-stone-50">
                        {t(`items.${cat.key}.name`)}
                      </h3>
                      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-50/30 text-stone-50 transition-all duration-500 group-hover:border-gold-400 group-hover:bg-gold-500">
                        <ArrowUpRight className="h-4 w-4 rtl-flip" />
                      </span>
                    </div>
                    <p className="mt-2 max-h-0 overflow-hidden text-sm text-stone-300 opacity-0 transition-all duration-500 group-hover:max-h-20 group-hover:opacity-100">
                      {t(`items.${cat.key}.desc`)}
                    </p>
                  </div>
                </Tilt>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
