'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { contactInfo } from '@/lib/data';

const links = [
  { href: '/', key: 'home' },
  { href: '/kurumsal', key: 'about' },
  { href: '/urunler', key: 'products' },
  { href: '/markalar', key: 'brands' },
  { href: '/projeler', key: 'projects' },
  { href: '/blog', key: 'blog' },
  { href: '/iletisim', key: 'contact' },
] as const;

export function FullscreenNav({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const t = useTranslations('nav');

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] bg-slate-900 text-stone-50"
          initial={{ clipPath: 'circle(0% at 100% 0%)' }}
          animate={{ clipPath: 'circle(150% at 100% 0%)' }}
          exit={{ clipPath: 'circle(0% at 100% 0%)' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="grain absolute inset-0 opacity-40" />
          <div className="relative mx-auto flex h-full max-w-container flex-col justify-center px-6 md:px-16">
            <motion.nav
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.07, delayChildren: 0.25 } } }}
              className="flex flex-col gap-2"
            >
              {links.map((l, i) => (
                <motion.div
                  key={l.key}
                  variants={{
                    hidden: { y: 40, opacity: 0 },
                    show: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
                  }}
                >
                  <Link
                    href={l.href}
                    onClick={onClose}
                    className="group flex items-baseline gap-4 py-1"
                  >
                    <span className="text-xs text-gold-500 tabular-nums">
                      0{i + 1}
                    </span>
                    <span className="font-display text-4xl font-light transition-colors duration-300 group-hover:text-gold-300 md:text-6xl">
                      {t(l.key)}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </motion.nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-16 flex flex-wrap gap-x-10 gap-y-2 text-sm text-stone-300"
            >
              <a href={`mailto:${contactInfo.email}`} className="hover:text-gold-300">
                {contactInfo.email}
              </a>
              <a href={`tel:${contactInfo.phone}`} className="hover:text-gold-300">
                {contactInfo.phone}
              </a>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
