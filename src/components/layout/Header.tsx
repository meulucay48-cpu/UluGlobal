'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, usePathname } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { Logo } from './Logo';
import { LangSwitcher } from './LangSwitcher';
import { FullscreenNav } from './FullscreenNav';

const navLinks = [
  { href: '/kurumsal', key: 'about' },
  { href: '/urunler', key: 'products' },
  { href: '/markalar', key: 'brands' },
  { href: '/iletisim', key: 'contact' },
] as const;

export function Header() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 40));

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  }, [menuOpen]);

  // Koyu hero/galeri ile başlayan sayfalarda, en üstteyken açık renk header
  const darkHeroRoutes = ['/', '/projeler', '/markalar', '/kurumsal', '/urunler', '/iletisim', '/blog'];
  const light = darkHeroRoutes.includes(pathname) && !scrolled && !menuOpen;

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'fixed inset-x-0 top-0 z-[80] transition-all duration-500',
          scrolled
            ? 'border-b border-stone-200/70 bg-stone-50/80 backdrop-blur-xl py-3'
            : 'bg-transparent py-5',
        )}
      >
        <div className="mx-auto flex max-w-container items-center justify-between px-6 md:px-10 lg:px-16">
          <Logo light={light} />

          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((l) => (
              <Link
                key={l.key}
                href={l.href}
                className={cn(
                  'group relative text-sm font-medium tracking-wide transition-colors',
                  light ? 'text-stone-100 hover:text-stone-50' : 'text-slate-700 hover:text-slate-900',
                )}
              >
                {t(l.key)}
                <span className="absolute -bottom-1 start-0 h-px w-0 bg-gold-500 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4 md:gap-6">
            <LangSwitcher light={light} />
            <Link
              href="/teklif"
              className={cn(
                'hidden items-center rounded-full px-5 py-2.5 text-sm font-medium transition-colors sm:inline-flex',
                light
                  ? 'bg-stone-50 text-slate-900 hover:bg-gold-500 hover:text-stone-50'
                  : 'bg-slate-900 text-stone-50 hover:bg-gold-500',
              )}
            >
              {t('quote')}
            </Link>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className={cn(
                'relative z-[95] flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:text-gold-600',
                light ? 'text-stone-50' : 'text-slate-900',
              )}
              aria-label={menuOpen ? t('close') : t('menu')}
            >
              {menuOpen ? <X className="h-5 w-5 text-stone-50" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      <FullscreenNav open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
