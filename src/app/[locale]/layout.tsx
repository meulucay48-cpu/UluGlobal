import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { routing, localeMeta, type Locale } from '@/i18n/routing';
import { fontSans, fontDisplay, fontArabic } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Loader } from '@/components/motion/Loader';
import { ScrollProgress } from '@/components/motion/ScrollProgress';
import { PageTransition } from '@/components/motion/PageTransition';
import { SmoothScroll } from '@/components/motion/SmoothScroll';
import { Cursor } from '@/components/motion/Cursor';
import '../globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Ulu Global Yapı — Seramik · Vitrifiye · Yapı Malzemeleri',
    template: '%s · Ulu Global Yapı',
  },
  description:
    'Premium seramik, vitrifiye ve yapı kimyasalları. Projeleriniz için modern yapı malzemesi çözümleri.',
  metadataBase: new URL('https://uluglobalyapi.com'),
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const dir = localeMeta[locale as Locale].dir;

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body
        className={cn(
          fontSans.variable,
          fontDisplay.variable,
          fontArabic.variable,
          dir === 'rtl' ? 'font-arabic' : 'font-sans',
          'min-h-screen antialiased',
        )}
      >
        <NextIntlClientProvider messages={messages}>
          <Loader />
          <Cursor />
          <ScrollProgress />
          <SmoothScroll>
            <Header />
            <PageTransition>
              <main>{children}</main>
            </PageTransition>
            <Footer />
          </SmoothScroll>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
