import { Container } from '@/components/primitives/Container';
import { Reveal } from '@/components/motion/Reveal';

export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="bg-stone-100 pb-16 pt-36 md:pb-24 md:pt-44">
      <Container>
        {eyebrow && (
          <Reveal>
            <p className="mb-4 text-xs uppercase tracking-widest text-gold-600">{eyebrow}</p>
          </Reveal>
        )}
        <Reveal delay={0.05}>
          <h1 className="max-w-4xl font-display text-4xl font-light leading-tight text-balance md:text-6xl">
            {title}
          </h1>
        </Reveal>
        {subtitle && (
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-500 md:text-lg">
              {subtitle}
            </p>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
