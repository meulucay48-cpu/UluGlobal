'use client';

import { useState, useTransition } from 'react';
import { useLocale } from 'next-intl';
import { useRouter, usePathname, locales, localeMeta, type Locale } from '@/i18n/routing';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export function LangSwitcher({ light = false }: { light?: boolean }) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [, startTransition] = useTransition();

  const change = (next: Locale) => {
    setOpen(false);
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'flex items-center gap-1.5 text-sm font-medium tracking-wide transition-colors',
          light ? 'text-stone-50 hover:text-gold-300' : 'text-slate-700 hover:text-gold-600',
        )}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span>{localeMeta[locale].flag}</span>
        <span className="uppercase">{locale}</span>
        <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', open && 'rotate-180')} />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.ul
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="absolute end-0 z-50 mt-3 min-w-[160px] overflow-hidden rounded-2xl border border-stone-200 bg-stone-50 p-1.5 shadow-xl shadow-slate-900/5"
              role="listbox"
            >
              {locales.map((l) => (
                <li key={l}>
                  <button
                    onClick={() => change(l)}
                    className={cn(
                      'flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm transition-colors',
                      l === locale
                        ? 'bg-stone-100 text-gold-600'
                        : 'text-slate-700 hover:bg-stone-100',
                    )}
                    role="option"
                    aria-selected={l === locale}
                  >
                    <span>{localeMeta[l].flag}</span>
                    <span>{localeMeta[l].label}</span>
                  </button>
                </li>
              ))}
            </motion.ul>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
