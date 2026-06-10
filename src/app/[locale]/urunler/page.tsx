import { setRequestLocale, getTranslations } from 'next-intl/server';
import { FullscreenHero } from '@/components/sections/FullscreenHero';
import { CategoryShowcase } from '@/components/sections/CategoryShowcase';
import { CtaBand } from '@/components/sections/CtaBand';

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'categories' });
  const nav = await getTranslations({ locale, namespace: 'nav' });

  return (
    <>
      <FullscreenHero
        eyebrow={nav('products')}
        title={t('title')}
        subtitle={t('subtitle')}
        image="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=2400&q=80"
      />
      <CategoryShowcase />
      <CtaBand />
    </>
  );
}
