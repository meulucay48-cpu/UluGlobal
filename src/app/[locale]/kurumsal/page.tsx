import Image from 'next/image';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Award, ShieldCheck, Zap, Leaf } from 'lucide-react';
import { FullscreenHero } from '@/components/sections/FullscreenHero';
import { Container } from '@/components/primitives/Container';
import { Reveal } from '@/components/motion/Reveal';
import { Parallax } from '@/components/motion/Parallax';
import { Stats } from '@/components/sections/Stats';
import { BrandsMarquee } from '@/components/brands/BrandsMarquee';
import { CtaBand } from '@/components/sections/CtaBand';

const valueIcons = {
  quality: Award,
  trust: ShieldCheck,
  speed: Zap,
  sustainability: Leaf,
} as const;

const valueKeys = ['quality', 'trust', 'speed', 'sustainability'] as const;
const timelineKeys = ['t1', 't2', 't3', 't4'] as const;

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'aboutPage' });

  return (
    <>
      <FullscreenHero
        eyebrow={t('eyebrow')}
        title={t('title')}
        subtitle={t('lead')}
        image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2400&q=80"
      />

      {/* Lead + intro */}
      <section className="bg-stone-50 pb-8 pt-20 md:pt-28">
        <Container>
          <div className="grid gap-10 md:grid-cols-12">
            <Reveal className="md:col-span-7">
              <p className="font-display text-2xl font-light leading-snug text-balance md:text-3xl">
                {t('lead')}
              </p>
            </Reveal>
            <Reveal delay={0.1} className="md:col-span-5">
              <p className="text-sm leading-relaxed text-slate-500 md:text-base">{t('intro')}</p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Hikâye + parallax görsel */}
      <section className="bg-stone-50 py-20 md:py-28">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
                <Parallax speed={0.15} className="absolute inset-0 scale-110">
                  <Image
                    src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80"
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </Parallax>
              </div>
            </Reveal>
            <div>
              <Reveal>
                <h2 className="font-display text-3xl font-light md:text-4xl">{t('storyTitle')}</h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-6 text-base leading-relaxed text-slate-500">{t('storyText')}</p>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* Değerler */}
      <section className="bg-stone-100 py-24 md:py-32">
        <Container>
          <Reveal>
            <h2 className="mb-14 font-display text-3xl font-light md:text-5xl">{t('valuesTitle')}</h2>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {valueKeys.map((key, i) => {
              const Icon = valueIcons[key];
              return (
                <Reveal key={key} delay={i * 0.08}>
                  <div className="group h-full rounded-3xl border border-stone-200 bg-stone-50 p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-gold-500/40 hover:shadow-xl hover:shadow-slate-900/5">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-stone-100 text-gold-600 transition-colors duration-500 group-hover:bg-gold-500 group-hover:text-stone-50">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-6 text-lg font-medium text-slate-900">
                      {t(`values.${key}.title`)}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-500">
                      {t(`values.${key}.desc`)}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Zaman çizelgesi */}
      <section className="bg-stone-50 py-24 md:py-32">
        <Container>
          <Reveal>
            <h2 className="mb-16 font-display text-3xl font-light md:text-5xl">
              {t('timelineTitle')}
            </h2>
          </Reveal>
          <div className="relative grid gap-10 md:grid-cols-4">
            <div className="absolute inset-x-0 top-3 hidden h-px bg-stone-200 md:block" />
            {timelineKeys.map((key, i) => (
              <Reveal key={key} delay={i * 0.12}>
                <div className="relative">
                  <span className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full border border-gold-500 bg-stone-50">
                    <span className="h-2 w-2 rounded-full bg-gold-500" />
                  </span>
                  <p className="mt-6 font-display text-4xl font-extralight text-gold-500">
                    {t(`timeline.${key}.year`)}
                  </p>
                  <h3 className="mt-3 text-lg font-medium text-slate-900">
                    {t(`timeline.${key}.title`)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    {t(`timeline.${key}.desc`)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <Stats />

      {/* Çalıştığımız markalar şeridi */}
      <section className="bg-stone-50 py-16">
        <BrandsMarquee />
      </section>

      <CtaBand />
    </>
  );
}
