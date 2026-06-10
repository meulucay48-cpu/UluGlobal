'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, MessageCircle, CheckCircle2 } from 'lucide-react';
import { useQuoteStore } from '@/stores/quote-store';
import { contactInfo } from '@/lib/data';
import { buildQuoteMessage, whatsappUrl } from '@/lib/quote-message';
import { cn } from '@/lib/utils';
import { Progress } from './Progress';
import { StepCategory } from './steps/StepCategory';
import { StepItems } from './steps/StepItems';
import { StepProject } from './steps/StepProject';
import { StepContact } from './steps/StepContact';
import { StepReview } from './steps/StepReview';

const TOTAL = 5;

export function QuoteWizard() {
  const t = useTranslations('quote');
  const tv = useTranslations('quote.validation');
  const reduce = useReducedMotion();
  const store = useQuoteStore();
  const { step, setStep } = store;

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [dir, setDir] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const validate = (current: number): boolean => {
    const e: Record<string, string> = {};
    if (current === 0 && store.categories.length === 0) {
      e.category = tv('selectCategory');
    }
    if (current === 3) {
      if (!store.contact.name.trim()) e.name = tv('required');
      if (!store.contact.phone.trim()) e.phone = tv('phone');
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(store.contact.email)) e.email = tv('email');
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const go = (next: number) => {
    if (next > step && !validate(step)) return;
    setDir(next > step ? 1 : -1);
    setStep(Math.max(0, Math.min(TOTAL - 1, next)));
  };

  const submit = () => {
    const msg = buildQuoteMessage(store);
    window.open(whatsappUrl(contactInfo.whatsapp, msg), '_blank');
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-5 rounded-3xl border border-stone-200 bg-stone-50 px-6 py-20 text-center"
      >
        <CheckCircle2 className="h-16 w-16 text-gold-500" />
        <h2 className="font-display text-2xl font-light md:text-3xl">{t('review.success')}</h2>
      </motion.div>
    );
  }

  const variants = {
    enter: (d: number) => (reduce ? { opacity: 0 } : { opacity: 0, x: d * 40 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => (reduce ? { opacity: 0 } : { opacity: 0, x: d * -40 }),
  };

  return (
    <div className="rounded-3xl border border-stone-200 bg-white/60 p-6 backdrop-blur md:p-10">
      <Progress step={step} />

      <div className="relative min-h-[360px]">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={step}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {step === 0 && <StepCategory error={errors.category} />}
            {step === 1 && <StepItems />}
            {step === 2 && <StepProject />}
            {step === 3 && <StepContact errors={errors} />}
            {step === 4 && <StepReview />}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-10 flex items-center justify-between gap-4 border-t border-stone-200 pt-6">
        <button
          type="button"
          onClick={() => go(step - 1)}
          className={cn(
            'flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-slate-900',
            step === 0 && 'pointer-events-none opacity-0',
          )}
        >
          <ArrowLeft className="h-4 w-4 rtl-flip" />
          {t('back')}
        </button>

        <span className="text-xs text-slate-400">
          {t('step')} {step + 1} {t('of')} {TOTAL}
        </span>

        {step < TOTAL - 1 ? (
          <button
            type="button"
            onClick={() => go(step + 1)}
            className="flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-stone-50 transition-colors hover:bg-gold-500"
          >
            {t('next')}
            <ArrowRight className="h-4 w-4 rtl-flip" />
          </button>
        ) : (
          <button
            type="button"
            onClick={submit}
            className="flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            <MessageCircle className="h-4 w-4" />
            {t('whatsapp')}
          </button>
        )}
      </div>
    </div>
  );
}
