import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Container } from '@/components/primitives/Container';
import { QuoteWizard } from '@/components/quote/QuoteWizard';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'quote' });
  return { title: t('title') };
}

export default async function QuotePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'quote' });

  return (
    <div className="bg-stone-100 pb-28 pt-32 md:pt-40">
      <Container className="max-w-3xl">
        <header className="mb-10 text-center">
          <h1 className="font-display text-4xl font-light md:text-5xl">{t('title')}</h1>
          <p className="mx-auto mt-4 max-w-lg text-slate-500">{t('subtitle')}</p>
        </header>
        <QuoteWizard />
      </Container>
    </div>
  );
}
