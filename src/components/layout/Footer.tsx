import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Container } from '@/components/primitives/Container';
import { contactInfo } from '@/lib/data';

export function Footer() {
  const t = useTranslations('footer');
  const nav = useTranslations('nav');

  return (
    <footer className="relative overflow-hidden bg-slate-900 text-stone-300">
      <div className="grain absolute inset-0 opacity-30" />
      <Container className="relative py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="h-20 w-20 overflow-hidden rounded-2xl ring-1 ring-white/10">
              <Image
                src="/logo.png"
                alt="Ulu Global Yapı"
                width={160}
                height={160}
                className="h-full w-full object-cover"
              />
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-stone-400">
              {t('tagline')}
            </p>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-gold-500">{t('explore')}</h4>
            <ul className="mt-5 space-y-3 text-sm">
              {(['products', 'brands', 'blog'] as const).map((k) => (
                <li key={k}>
                  <Link
                    href={k === 'products' ? '/urunler' : k === 'brands' ? '/markalar' : '/blog'}
                    className="transition-colors hover:text-stone-50"
                  >
                    {nav(k)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-gold-500">{t('company')}</h4>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <Link href="/kurumsal" className="transition-colors hover:text-stone-50">
                  {nav('about')}
                </Link>
              </li>
              <li>
                <Link href="/teklif" className="transition-colors hover:text-stone-50">
                  {nav('quote')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-gold-500">{t('contact')}</h4>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a href={`mailto:${contactInfo.email}`} className="transition-colors hover:text-stone-50">
                  {contactInfo.email}
                </a>
              </li>
              <li>
                <a href={`tel:${contactInfo.phone}`} className="transition-colors hover:text-stone-50">
                  {contactInfo.phone}
                </a>
              </li>
              <li className="text-stone-400">{t('address')}</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-stone-700/40 pt-8 text-xs text-stone-500 sm:flex-row">
          <p>
            © {2026} Ulu Global Yapı. {t('rights')}
          </p>
          <p className="tracking-wide">Made with precision · İstanbul</p>
        </div>
      </Container>
    </footer>
  );
}
