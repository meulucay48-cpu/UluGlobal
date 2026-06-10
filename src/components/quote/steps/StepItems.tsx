'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus, Trash2, Package } from 'lucide-react';
import { useQuoteStore, type QuoteItem } from '@/stores/quote-store';
import { Field, TextInput, Select } from '@/components/quote/Field';
import { Button } from '@/components/primitives/Button';

const units: QuoteItem['unit'][] = ['sqm', 'piece', 'pallet', 'box'];

export function StepItems() {
  const t = useTranslations('quote.items');
  const items = useQuoteStore((s) => s.items);
  const addItem = useQuoteStore((s) => s.addItem);
  const removeItem = useQuoteStore((s) => s.removeItem);

  const [name, setName] = useState('');
  const [qty, setQty] = useState('');
  const [unit, setUnit] = useState<QuoteItem['unit']>('sqm');

  const add = () => {
    if (!name.trim()) return;
    addItem({
      id: `${name}-${items.length}-${qty || '0'}`,
      name: name.trim(),
      quantity: Number(qty) || 1,
      unit,
    });
    setName('');
    setQty('');
  };

  return (
    <div>
      <h2 className="font-display text-2xl font-light md:text-3xl">{t('title')}</h2>

      <div className="mt-8 grid gap-4 rounded-2xl border border-stone-200 bg-stone-50 p-5 sm:grid-cols-[1fr_auto_auto_auto] sm:items-end">
        <Field label={t('product')}>
          <TextInput
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), add())}
            placeholder="—"
          />
        </Field>
        <Field label={t('quantity')} className="sm:w-28">
          <TextInput
            type="number"
            min={1}
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            placeholder="0"
          />
        </Field>
        <Field label={t('unit')} className="sm:w-28">
          <Select value={unit} onChange={(e) => setUnit(e.target.value as QuoteItem['unit'])}>
            {units.map((u) => (
              <option key={u} value={u}>
                {t(`units.${u}`)}
              </option>
            ))}
          </Select>
        </Field>
        <button
          type="button"
          onClick={add}
          className="flex h-12 items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 text-sm font-medium text-stone-50 transition-colors hover:bg-gold-500"
        >
          <Plus className="h-4 w-4" />
          {t('add')}
        </button>
      </div>

      <div className="mt-6 space-y-2">
        <AnimatePresence initial={false}>
          {items.length === 0 ? (
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-stone-300 py-12 text-slate-400">
              <Package className="h-8 w-8" />
              <p className="text-sm">{t('empty')}</p>
            </div>
          ) : (
            items.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center justify-between rounded-xl border border-stone-200 bg-stone-50 px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-stone-100 text-gold-600">
                    <Package className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-medium text-slate-900">{item.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-slate-500">
                    {item.quantity} {t(`units.${item.unit}`)}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="text-slate-400 transition-colors hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
