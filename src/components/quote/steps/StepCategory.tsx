'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useQuoteStore } from '@/stores/quote-store';
import { categories } from '@/lib/data';
import { cn } from '@/lib/utils';

export function StepCategory({ error }: { error?: string }) {
  const t = useTranslations('quote.category');
  const tc = useTranslations('categories.items');
  const selected = useQuoteStore((s) => s.categories);
  const toggle = useQuoteStore((s) => s.toggleCategory);

  return (
    <div>
      <h2 className="font-display text-2xl font-light md:text-3xl">{t('title')}</h2>
      <p className="mt-2 text-sm text-slate-500">{t('hint')}</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {categories.map((cat) => {
          const active = selected.includes(cat.key);
          return (
            <motion.button
              key={cat.key}
              type="button"
              onClick={() => toggle(cat.key)}
              whileTap={{ scale: 0.98 }}
              className={cn(
                'group relative flex items-center gap-4 overflow-hidden rounded-2xl border p-5 text-start transition-all duration-300',
                active
                  ? 'border-gold-500 bg-gold-500/5'
                  : 'border-stone-200 bg-stone-50 hover:border-stone-300',
              )}
            >
              <div
                className="h-14 w-14 shrink-0 rounded-xl bg-cover bg-center"
                style={{ backgroundImage: `url(${cat.image})` }}
              />
              <div className="flex-1">
                <h3 className="font-medium text-slate-900">{tc(`${cat.key}.name`)}</h3>
                <p className="mt-0.5 text-xs text-slate-500">{tc(`${cat.key}.desc`)}</p>
              </div>
              <div
                className={cn(
                  'flex h-6 w-6 items-center justify-center rounded-full border transition-all',
                  active ? 'border-gold-500 bg-gold-500 text-stone-50' : 'border-stone-300',
                )}
              >
                {active && <Check className="h-3.5 w-3.5" />}
              </div>
            </motion.button>
          );
        })}
      </div>

      {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
    </div>
  );
}
