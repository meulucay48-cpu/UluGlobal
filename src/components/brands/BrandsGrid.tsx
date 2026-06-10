'use client';

import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';
import { brands } from '@/lib/data';
import { BrandLogo } from './BrandLogo';

export function BrandsGrid() {
  const t = useTranslations('brandsPage.categories');
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      variants={{ show: { transition: { staggerChildren: 0.05 } } }}
      className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-stone-200 bg-stone-200 sm:grid-cols-3 lg:grid-cols-4"
    >
      {brands.map((b) => (
        <motion.div
          key={b.id}
          variants={{
            hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 24 },
            show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
          }}
          className="group relative flex aspect-[4/3] flex-col items-center justify-center gap-2 overflow-hidden bg-white p-5 transition-colors duration-500 md:p-6"
        >
          {/* Hover ışık efekti (markanın aksan rengiyle) */}
          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: `radial-gradient(120% 90% at 50% 120%, ${b.accent}1f, transparent)`,
            }}
          />
          <div className="relative flex h-16 w-full max-w-[78%] items-center justify-center opacity-90 transition-all duration-500 group-hover:scale-[1.07] group-hover:opacity-100 md:h-20">
            <BrandLogo brand={b} className="!text-2xl" />
          </div>
          <span
            className="relative max-h-0 overflow-hidden text-[11px] uppercase tracking-widest opacity-0 transition-all duration-500 group-hover:max-h-6 group-hover:opacity-100"
            style={{ color: b.accent }}
          >
            {t(b.category)}
          </span>
          {/* Alt aksan çizgisi */}
          <span
            className="absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 transition-all duration-500 group-hover:w-2/3"
            style={{ backgroundColor: b.accent }}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
