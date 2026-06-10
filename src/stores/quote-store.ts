'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CategoryKey } from '@/lib/data';

export interface QuoteItem {
  id: string;
  name: string;
  quantity: number;
  unit: 'sqm' | 'piece' | 'pallet' | 'box';
}

export interface QuoteState {
  step: number;
  categories: CategoryKey[];
  items: QuoteItem[];
  project: {
    type: string;
    city: string;
    deadline: string;
    notes: string;
  };
  contact: {
    name: string;
    phone: string;
    email: string;
    company: string;
    fileName: string;
  };
  setStep: (step: number) => void;
  toggleCategory: (key: CategoryKey) => void;
  addItem: (item: QuoteItem) => void;
  removeItem: (id: string) => void;
  setProject: (data: Partial<QuoteState['project']>) => void;
  setContact: (data: Partial<QuoteState['contact']>) => void;
  reset: () => void;
}

const initial = {
  step: 0,
  categories: [] as CategoryKey[],
  items: [] as QuoteItem[],
  project: { type: '', city: '', deadline: '', notes: '' },
  contact: { name: '', phone: '', email: '', company: '', fileName: '' },
};

export const useQuoteStore = create<QuoteState>()(
  persist(
    (set) => ({
      ...initial,
      setStep: (step) => set({ step }),
      toggleCategory: (key) =>
        set((s) => ({
          categories: s.categories.includes(key)
            ? s.categories.filter((c) => c !== key)
            : [...s.categories, key],
        })),
      addItem: (item) => set((s) => ({ items: [...s.items, item] })),
      removeItem: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
      setProject: (data) => set((s) => ({ project: { ...s.project, ...data } })),
      setContact: (data) => set((s) => ({ contact: { ...s.contact, ...data } })),
      reset: () => set({ ...initial }),
    }),
    { name: 'ulu-quote' },
  ),
);
