'use client';

import { useTranslations } from 'next-intl';
import { useQuoteStore } from '@/stores/quote-store';

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 py-2 text-sm">
      <span className="text-slate-500">{label}</span>
      <span className="text-end font-medium text-slate-900">{value || '—'}</span>
    </div>
  );
}

export function StepReview() {
  const t = useTranslations('quote.review');
  const tc = useTranslations('categories.items');
  const tu = useTranslations('quote.items.units');
  const tp = useTranslations('quote.project');
  const { categories, items, project, contact } = useQuoteStore();

  return (
    <div>
      <h2 className="font-display text-2xl font-light md:text-3xl">{t('title')}</h2>

      <div className="mt-8 space-y-6">
        <section className="rounded-2xl border border-stone-200 bg-stone-50 p-5">
          <h3 className="mb-3 text-xs uppercase tracking-widest text-gold-600">
            {t('categories')}
          </h3>
          <div className="flex flex-wrap gap-2">
            {categories.length ? (
              categories.map((c) => (
                <span
                  key={c}
                  className="rounded-full bg-stone-100 px-3 py-1 text-sm text-slate-700"
                >
                  {tc(`${c}.name`)}
                </span>
              ))
            ) : (
              <span className="text-sm text-slate-400">—</span>
            )}
          </div>
        </section>

        <section className="rounded-2xl border border-stone-200 bg-stone-50 p-5">
          <h3 className="mb-3 text-xs uppercase tracking-widest text-gold-600">{t('products')}</h3>
          {items.length ? (
            <ul className="divide-y divide-stone-200">
              {items.map((i) => (
                <li key={i.id} className="flex justify-between py-2 text-sm">
                  <span className="text-slate-900">{i.name}</span>
                  <span className="text-slate-500">
                    {i.quantity} {tu(i.unit)}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-400">{t('noProducts')}</p>
          )}
        </section>

        <section className="rounded-2xl border border-stone-200 bg-stone-50 p-5">
          <h3 className="mb-3 text-xs uppercase tracking-widest text-gold-600">
            {t('projectInfo')}
          </h3>
          <Row label={tp('type')} value={project.type ? tp(`types.${project.type}`) : ''} />
          <Row label={tp('city')} value={project.city} />
          <Row label={tp('deadline')} value={project.deadline} />
          <Row label={tp('notes')} value={project.notes} />
        </section>

        <section className="rounded-2xl border border-stone-200 bg-stone-50 p-5">
          <h3 className="mb-3 text-xs uppercase tracking-widest text-gold-600">
            {t('contactInfo')}
          </h3>
          <Row label="—" value={`${contact.name} · ${contact.phone}`} />
          <Row label="—" value={contact.email} />
          {contact.company && <Row label="—" value={contact.company} />}
          {contact.fileName && <Row label="—" value={contact.fileName} />}
        </section>
      </div>
    </div>
  );
}
