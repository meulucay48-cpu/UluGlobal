import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Container } from '@/components/primitives/Container';
import { Reveal } from '@/components/motion/Reveal';
import { BrandsMarquee } from '@/components/brands/BrandsMarquee';
import { BrandsGrid } from '@/components/brands/BrandsGrid';
import { CtaBand } from '@/components/sections/CtaBand';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'nav' });
  return { title: t('brands') };
}

export default async function BrandsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'brandsPage' });

  return (
    <>
      {/* Koyu hero + ışıltılı marquee — görsel şölen */}
      <section className="relative overflow-hidden bg-slate-900 pb-16 pt-36 md:pb-24 md:pt-44">
        <div className="grain absolute inset-0 opacity-30" />
        <Container className="relative">
          <Reveal>
            <p className="mb-4 text-xs uppercase tracking-widest text-gold-400">{t('eyebrow')}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="max-w-4xl font-display text-4xl font-light leading-tight text-stone-50 text-balance md:text-6xl">
              {t('title')}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-stone-400 md:text-lg">
              {t('subtitle')}
            </p>
          </Reveal>
        </Container>

        <div className="relative mt-14">
          <BrandsMarquee light />
        </div>
      </section>

      {/* Marka grid */}
      <section className="bg-stone-100 py-24 md:py-32">
        <Container>
          <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <Reveal>
              <h2 className="font-display text-3xl font-light md:text-5xl">{t('gridTitle')}</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="max-w-md text-sm leading-relaxed text-slate-500 md:text-base">
                {t('gridSubtitle')}
              </p>
            </Reveal>
          </div>
          <BrandsGrid />
        </Container>
      </section>

      {/* Marka bulunamadı CTA */}
      <section className="bg-stone-50 py-20 md:py-28">
        <Container>
          <Reveal>
            <div className="flex flex-col items-center gap-6 rounded-3xl border border-stone-200 bg-white/60 px-6 py-16 text-center">
              <h3 className="font-display text-2xl font-light md:text-3xl">{t('ctaTitle')}</h3>
              <p className="max-w-md text-sm text-slate-500">{t('ctaText')}</p>
            </div>
          </Reveal>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
