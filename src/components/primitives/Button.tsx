import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Link } from '@/i18n/routing';

const buttonVariants = cva(
  'group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-medium tracking-wide transition-all duration-500 ease-out-expo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-slate-900 text-stone-50 hover:bg-gold-500',
        gold: 'bg-gold-500 text-stone-50 hover:bg-gold-600',
        outline:
          'border border-slate-900/20 text-slate-900 hover:border-gold-500 hover:text-gold-600',
        ghost: 'text-slate-700 hover:text-gold-600',
      },
      size: {
        sm: 'h-10 px-5 text-sm',
        md: 'h-12 px-7 text-sm',
        lg: 'h-14 px-9 text-base',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
);

interface BaseProps extends VariantProps<typeof buttonVariants> {
  className?: string;
  children: React.ReactNode;
}

type ButtonAsButton = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type ButtonAsLink = BaseProps & { href: string };

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { variant, size, className, children } = props;
  const classes = cn(buttonVariants({ variant, size }), className);
  const inner = (
    <>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-700 ease-out-expo group-hover:translate-x-full" />
    </>
  );

  if ('href' in props && props.href) {
    return (
      <Link href={props.href} className={classes}>
        {inner}
      </Link>
    );
  }

  const { variant: _v, size: _s, className: _c, children: _ch, href: _h, ...rest } =
    props as ButtonAsButton;
  return (
    <button className={classes} {...rest}>
      {inner}
    </button>
  );
}
