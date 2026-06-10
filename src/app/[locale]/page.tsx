import { setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/sections/Hero';
import { Manifesto } from '@/components/sections/Manifesto';
import { CategoryShowcase } from '@/components/sections/CategoryShowcase';
import { Stats } from '@/components/sections/Stats';
import { HorizontalProjects } from '@/components/sections/HorizontalProjects';
import { Process } from '@/components/sections/Process';
import { CtaBand } from '@/components/sections/CtaBand';
import { BrandsMarquee } from '@/components/brands/BrandsMarquee';
import { KineticBand } from '@/components/sections/KineticBand';
import { ScrollExpandImage } from '@/components/sections/ScrollExpandImage';
import { ConstructionScroll } from '@/components/sections/ConstructionScroll';
import { Container } from '@/components/primitives/Container';
import { Reveal } from '@/components/motion/Reveal';
import { getTranslations } from 'next-intl/server';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tb = await getTranslations({ locale, namespace: 'brandsPage' });

  return (
    <>
      <Hero />
      {/* <Manifesto /> */}
      {/* <KineticBand /> */}
      <CategoryShowcase />
      {/* <ConstructionScroll /> */}
      <section className="bg-stone-50 py-16 md:py-20">
        <Container className="mb-10">
          <Reveal>
            <p className="text-center text-xs uppercase tracking-widest text-gold-600">
              {tb('gridTitle')}
            </p>
          </Reveal>
        </Container>
        <BrandsMarquee />
      </section>
      <ScrollExpandImage
        image="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=80"
        caption={tb('gridSubtitle')}
      />
      <Stats />
      {/* <HorizontalProjects /> */}
      <Process />
      <CtaBand />
    </>
  );
}
