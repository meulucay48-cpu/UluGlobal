'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Send, MessageCircle, CheckCircle2 } from 'lucide-react';
import { Field, TextInput, TextArea } from '@/components/quote/Field';
import { contactInfo } from '@/lib/data';
import { whatsappUrl } from '@/lib/quote-message';

type FormState = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const empty: FormState = { name: '', email: '', phone: '', subject: '', message: '' };

export function ContactForm() {
  const t = useTranslations('contactPage.form');
  const tp = useTranslations('contactPage');
  const tv = useTranslations('quote.validation');
  const reduce = useReducedMotion();

  const [form, setForm] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [sent, setSent] = useState(false);

  const set = (k: keyof FormState, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const validate = () => {
    const e: typeof errors = {};
    if (!form.name.trim()) e.name = tv('required');
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) e.email = tv('email');
    if (!form.message.trim()) e.message = tv('required');
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const buildMessage = () =>
    [
      '✉️ ULU GLOBAL YAPI — İletişim',
      '',
      `👤 ${form.name}`,
      form.phone && `📞 ${form.phone}`,
      `✉️ ${form.email}`,
      form.subject && `📌 ${form.subject}`,
      '',
      form.message,
    ]
      .filter(Boolean)
      .join('\n');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    window.open(whatsappUrl(contactInfo.whatsapp, buildMessage()), '_blank');
    setSent(true);
  };

  const fields: { key: keyof FormState; type?: string; half?: boolean; area?: boolean }[] = [
    { key: 'name', half: true },
    { key: 'email', type: 'email', half: true },
    { key: 'phone', type: 'tel', half: true },
    { key: 'subject', half: true },
    { key: 'message', area: true },
  ];

  return (
    <div className="rounded-3xl border border-stone-200 bg-white/60 p-6 backdrop-blur md:p-10">
      <h2 className="font-display text-2xl font-light md:text-3xl">{tp('formTitle')}</h2>

      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-5 py-16 text-center"
          >
            <CheckCircle2 className="h-14 w-14 text-gold-500" />
            <p className="max-w-sm text-slate-600">{t('success')}</p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={submit}
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.06 } } }}
            className="mt-8 grid gap-5 sm:grid-cols-2"
          >
            {fields.map((f) => (
              <motion.div
                key={f.key}
                variants={{
                  hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 16 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
                }}
                className={f.half ? '' : 'sm:col-span-2'}
              >
                <Field label={t(f.key)}>
                  {f.area ? (
                    <TextArea
                      value={form[f.key]}
                      onChange={(e) => set(f.key, e.target.value)}
                      placeholder={t('messagePlaceholder')}
                    />
                  ) : (
                    <TextInput
                      type={f.type ?? 'text'}
                      value={form[f.key]}
                      onChange={(e) => set(f.key, e.target.value)}
                    />
                  )}
                  {errors[f.key] && (
                    <span className="mt-1 block text-xs text-red-500">{errors[f.key]}</span>
                  )}
                </Field>
              </motion.div>
            ))}

            <motion.div
              variants={{
                hidden: { opacity: 0 },
                show: { opacity: 1, transition: { duration: 0.5 } },
              }}
              className="flex flex-wrap gap-3 sm:col-span-2"
            >
              <button
                type="submit"
                className="group inline-flex items-center gap-2 rounded-full bg-slate-900 px-7 py-3.5 text-sm font-medium text-stone-50 transition-colors hover:bg-gold-500"
              >
                <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl-flip" />
                {t('send')}
              </button>
              <a
                href={whatsappUrl(contactInfo.whatsapp, '')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-stone-300 px-7 py-3.5 text-sm font-medium text-slate-700 transition-colors hover:border-[#25D366] hover:text-[#25D366]"
              >
                <MessageCircle className="h-4 w-4" />
                {t('whatsapp')}
              </a>
            </motion.div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
