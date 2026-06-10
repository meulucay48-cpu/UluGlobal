'use client';

import { useTranslations } from 'next-intl';
import { useQuoteStore } from '@/stores/quote-store';
import { Field, TextInput, TextArea, Select } from '@/components/quote/Field';

const types = ['residential', 'commercial', 'hotel', 'other'] as const;

export function StepProject() {
  const t = useTranslations('quote.project');
  const project = useQuoteStore((s) => s.project);
  const setProject = useQuoteStore((s) => s.setProject);

  return (
    <div>
      <h2 className="font-display text-2xl font-light md:text-3xl">{t('title')}</h2>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <Field label={t('type')}>
          <Select
            value={project.type}
            onChange={(e) => setProject({ type: e.target.value })}
          >
            <option value="">—</option>
            {types.map((ty) => (
              <option key={ty} value={ty}>
                {t(`types.${ty}`)}
              </option>
            ))}
          </Select>
        </Field>

        <Field label={t('city')}>
          <TextInput
            value={project.city}
            onChange={(e) => setProject({ city: e.target.value })}
          />
        </Field>

        <Field label={t('deadline')}>
          <TextInput
            type="date"
            value={project.deadline}
            onChange={(e) => setProject({ deadline: e.target.value })}
          />
        </Field>

        <Field label={t('notes')} className="sm:col-span-2">
          <TextArea
            value={project.notes}
            onChange={(e) => setProject({ notes: e.target.value })}
            placeholder={t('notesPlaceholder')}
          />
        </Field>
      </div>
    </div>
  );
}
