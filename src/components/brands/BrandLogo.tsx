import type { Brand } from '@/lib/data';
import { cn } from '@/lib/utils';

/**
 * Marka logosu. /public/brands/<id> dosyası varsa onu (object-contain) gösterir;
 * yoksa şık tipografik wordmark'a düşer. SVG + raster için düz <img> kullanılır.
 */
export function BrandLogo({
  brand,
  className,
  light = false,
}: {
  brand: Brand;
  className?: string;
  light?: boolean;
}) {
  if (brand.logo) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={brand.logo}
        alt={brand.name}
        loading="lazy"
        className={cn('h-full w-full object-contain', className)}
      />
    );
  }

  return (
    <span
      className={cn(
        'select-none whitespace-nowrap font-display text-2xl font-light tracking-tight md:text-3xl',
        light ? 'text-stone-50' : 'text-slate-700',
        className,
      )}
    >
      {brand.name}
    </span>
  );
}
