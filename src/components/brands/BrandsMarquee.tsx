'use client';

import { brands } from '@/lib/data';
import { cn } from '@/lib/utils';
import { BrandLogo } from './BrandLogo';

function Row({
  reverse = false,
  duration = 40,
}: {
  reverse?: boolean;
  duration?: number;
}) {
  // Kesintisiz döngü için liste iki kez render edilir
  const items = [...brands, ...brands];
  return (
    <div className="marquee-pause flex overflow-hidden">
      <div
        className={cn('flex shrink-0 items-center gap-5', reverse ? 'animate-marquee-reverse' : 'animate-marquee')}
        style={{ '--marquee-duration': `${duration}s` } as React.CSSProperties}
      >
        {items.map((b, i) => (
          <div
            key={`${b.id}-${i}`}
            className="flex h-24 w-52 shrink-0 items-center justify-center rounded-2xl bg-white px-8 py-6 shadow-sm ring-1 ring-black/5"
            title={b.name}
          >
            <BrandLogo brand={b} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function BrandsMarquee({ light = false }: { light?: boolean }) {
  return (
    <div className="relative flex flex-col gap-8 py-4">
      <Row duration={45} />
      <Row reverse duration={55} />
      {/* Kenar geçiş maskeleri */}
      <div
        className={cn(
          'pointer-events-none absolute inset-y-0 start-0 w-24 bg-gradient-to-r',
          light ? 'from-slate-900 to-transparent' : 'from-stone-50 to-transparent',
        )}
      />
      <div
        className={cn(
          'pointer-events-none absolute inset-y-0 end-0 w-24 bg-gradient-to-l',
          light ? 'from-slate-900 to-transparent' : 'from-stone-50 to-transparent',
        )}
      />
    </div>
  );
}
