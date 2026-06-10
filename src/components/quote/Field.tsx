'use client';

import { cn } from '@/lib/utils';

export function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn('block', className)}>
      <span className="mb-2 block text-xs font-medium uppercase tracking-widest text-slate-500">
        {label}
      </span>
      {children}
    </label>
  );
}

const base =
  'w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20';

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(base, props.className)} />;
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={cn(base, 'min-h-28 resize-y', props.className)} />;
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={cn(base, 'cursor-pointer', props.className)} />;
}
