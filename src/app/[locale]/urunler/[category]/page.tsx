import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { PageHero } from '@/components/sections/PageHero';
import { Container } from '@/components/primitives/Container';
import { Reveal } from '@/components/motion/Reveal';
import { CtaBand } from '@/components/sections/CtaBand';
import { categories } from '@/lib/data';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    categories.map((c) => ({ locale, category: c.slug })),
  );
}

// Demo amaçlı örnek ürün ızgarası
const demoProducts = Array.from({ length: 6 }).map((_, i) => i);

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}) {
  const { locale, category } = await params;
  setRequestLocale(locale);

  const cat = categories.find((c) => c.slug === category);
  if (!cat) notFound();

  const t = await getTranslations({ locale, namespace: 'categories.items' });
  const nav = await getTranslations({ locale, namespace: 'nav' });

  return (
    <>
      <PageHero
        eyebrow={nav('products')}
        title={t(`${cat.key}.name`)}
        subtitle={t(`${cat.key}.desc`)}
      />

      <section className="bg-stone-50 py-20 md:py-28">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {demoProducts.map((i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div className="group cursor-pointer">
                  <div className="relative aspect-square overflow-hidden rounded-2xl bg-stone-100">
                    <Image
                      src={cat.image}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
                    />
                  </div>
                  <h3 className="mt-4 font-medium text-slate-900">
                    {t(`${cat.key}.name`)} {String(i + 1).padStart(2, '0')}
                  </h3>
                  <p className="text-sm text-slate-500">60×120 cm · Mat</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
