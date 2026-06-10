import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const locales = ['tr', 'en', 'ru', 'ar'] as const;
export type Locale = (typeof locales)[number];

export const rtlLocales: Locale[] = ['ar'];

export const localeMeta: Record<Locale, { label: string; flag: string; dir: 'ltr' | 'rtl' }> = {
  tr: { label: 'Türkçe', flag: '🇹🇷', dir: 'ltr' },
  en: { label: 'English', flag: '🇬🇧', dir: 'ltr' },
  ru: { label: 'Русский', flag: '🇷🇺', dir: 'ltr' },
  ar: { label: 'العربية', flag: '🇸🇦', dir: 'rtl' },
};

export const routing = defineRouting({
  locales,
  defaultLocale: 'tr',
  localePrefix: 'as-needed',
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
