import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { PageHero } from '@/components/sections/PageHero';
import { Container } from '@/components/primitives/Container';
import { Reveal } from '@/components/motion/Reveal';
import { CtaBand } from '@/components/sections/CtaBand';
import { categories } from '@/lib/data';
import { products } from '@/lib/products';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    categories.map((c) => ({ locale, category: c.slug })),
  );
}

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
  const items = products[cat.slug] ?? [];

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
            {items.map((p, i) => (
              <Reveal key={p.image} delay={(i % 3) * 0.08}>
                <div className="group">
                  <div className="relative aspect-square overflow-hidden rounded-2xl border border-stone-200 bg-white">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-contain p-4 transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
                    />
                    {/* hover aksan ışıması */}
                    <div
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{ background: `radial-gradient(120% 80% at 50% 120%, ${cat.tone}26, transparent)` }}
                    />
                  </div>
                  <h3 className="mt-4 font-medium leading-snug text-slate-900">{p.name}</h3>
                  <p className="mt-0.5 text-sm text-gold-600">{t(`${cat.key}.name`)}</p>
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
