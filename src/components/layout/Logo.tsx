import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils';

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-3.5" aria-label="Ulu Global Yapı">
      <span className="relative block h-14 w-14 overflow-hidden rounded-2xl shadow-sm ring-1 ring-black/5 transition-transform duration-500 group-hover:scale-105 md:h-16 md:w-16">
        {/* Tam logodan UG amblemini gösterecek şekilde çerçevelenir */}
        <Image
          src="/logo.png"
          alt="Ulu Global Yapı"
          width={120}
          height={120}
          priority
          className="absolute max-w-none"
          style={{ width: '185%', height: '185%', left: '-42%', top: '-11%' }}
        />
      </span>
      <span className="hidden flex-col leading-none sm:flex">
        <span
          className={cn(
            'text-base font-semibold tracking-[0.2em] transition-colors md:text-lg',
            light ? 'text-stone-50' : 'text-slate-900',
          )}
        >
          ULU GLOBAL
        </span>
        <span
          className={cn(
            'text-[11px] tracking-[0.3em] transition-colors md:text-xs',
            light ? 'text-stone-300' : 'text-slate-500',
          )}
        >
          YAPI
        </span>
      </span>
    </Link>
  );
}
