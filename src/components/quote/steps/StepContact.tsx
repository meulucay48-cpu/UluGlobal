'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { UploadCloud, FileCheck2 } from 'lucide-react';
import { useQuoteStore } from '@/stores/quote-store';
import { Field, TextInput } from '@/components/quote/Field';
import { cn } from '@/lib/utils';

export function StepContact({ errors }: { errors: Record<string, string> }) {
  const t = useTranslations('quote.contactStep');
  const contact = useQuoteStore((s) => s.contact);
  const setContact = useQuoteStore((s) => s.setContact);
  const [drag, setDrag] = useState(false);

  const onFile = (file?: File) => {
    if (file) setContact({ fileName: file.name });
  };

  return (
    <div>
      <h2 className="font-display text-2xl font-light md:text-3xl">{t('title')}</h2>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <Field label={t('name')}>
          <TextInput
            value={contact.name}
            onChange={(e) => setContact({ name: e.target.value })}
          />
          {errors.name && <span className="mt-1 block text-xs text-red-500">{errors.name}</span>}
        </Field>

        <Field label={t('phone')}>
          <TextInput
            type="tel"
            value={contact.phone}
            onChange={(e) => setContact({ phone: e.target.value })}
          />
          {errors.phone && <span className="mt-1 block text-xs text-red-500">{errors.phone}</span>}
        </Field>

        <Field label={t('email')}>
          <TextInput
            type="email"
            value={contact.email}
            onChange={(e) => setContact({ email: e.target.value })}
          />
          {errors.email && <span className="mt-1 block text-xs text-red-500">{errors.email}</span>}
        </Field>

        <Field label={t('company')}>
          <TextInput
            value={contact.company}
            onChange={(e) => setContact({ company: e.target.value })}
          />
        </Field>

        <div className="sm:col-span-2">
          <span className="mb-2 block text-xs font-medium uppercase tracking-widest text-slate-500">
            {t('files')}
          </span>
          <label
            onDragOver={(e) => {
              e.preventDefault();
              setDrag(true);
            }}
            onDragLeave={() => setDrag(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDrag(false);
              onFile(e.dataTransfer.files?.[0]);
            }}
            className={cn(
              'flex cursor-pointer flex-col items-center gap-3 rounded-2xl border-2 border-dashed px-6 py-10 text-center transition-colors',
              drag ? 'border-gold-500 bg-gold-500/5' : 'border-stone-300 hover:border-stone-400',
            )}
          >
            {contact.fileName ? (
              <>
                <FileCheck2 className="h-8 w-8 text-gold-600" />
                <span className="text-sm font-medium text-slate-900">{contact.fileName}</span>
              </>
            ) : (
              <>
                <UploadCloud className="h-8 w-8 text-slate-400" />
                <span className="text-sm text-slate-500">{t('filesHint')}</span>
              </>
            )}
            <input
              type="file"
              accept=".pdf,image/*"
              className="hidden"
              onChange={(e) => onFile(e.target.files?.[0])}
            />
          </label>
        </div>
      </div>
    </div>
  );
}
