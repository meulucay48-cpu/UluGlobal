'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const stepKeys = ['category', 'items', 'project', 'contact', 'review'] as const;

export function Progress({ step }: { step: number }) {
  const t = useTranslations('quote.steps');

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between">
        {stepKeys.map((key, i) => {
          const active = i === step;
          const complete = i < step;
          return (
            <div key={key} className="flex flex-1 items-center last:flex-none">
              <div className="flex flex-col items-center gap-2">
                <div
                  className={cn(
                    'flex h-9 w-9 items-center justify-center rounded-full border text-sm font-medium transition-all duration-500',
                    complete && 'border-gold-500 bg-gold-500 text-stone-50',
                    active && 'border-gold-500 text-gold-600',
                    !active && !complete && 'border-stone-300 text-slate-400',
                  )}
                >
                  {complete ? <Check className="h-4 w-4" /> : i + 1}
                </div>
                <span
                  className={cn(
                    'hidden text-[11px] uppercase tracking-wider sm:block',
                    active ? 'text-gold-600' : 'text-slate-400',
                  )}
                >
                  {t(key)}
                </span>
              </div>
              {i < stepKeys.length - 1 && (
                <div className="mx-2 h-px flex-1 bg-stone-200">
                  <motion.div
                    className="h-full bg-gold-500"
                    initial={false}
                    animate={{ width: complete ? '100%' : '0%' }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
