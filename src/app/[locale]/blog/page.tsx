import { setRequestLocale, getTranslations } from 'next-intl/server';
import { FullscreenHero } from '@/components/sections/FullscreenHero';
import { Container } from '@/components/primitives/Container';
import { Reveal } from '@/components/motion/Reveal';

const posts = [
  { title: 'Seramik seçiminde 5 altın kural', date: '2026' },
  { title: 'Islak hacimlerde su yalıtımı rehberi', date: '2026' },
  { title: 'Banyo armatürü seçiminde nelere dikkat etmeli?', date: '2026' },
];

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const nav = await getTranslations({ locale, namespace: 'nav' });

  return (
    <>
      <FullscreenHero
        eyebrow={nav('blog')}
        title={nav('blog')}
        image="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2400&q=80"
      />
      <section className="bg-stone-50 py-20 md:py-28">
        <Container className="max-w-3xl">
          <div className="divide-y divide-stone-200 border-y border-stone-200">
            {posts.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <article className="group flex items-center justify-between gap-6 py-8 cursor-pointer">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-gold-600">{p.date}</p>
                    <h3 className="mt-2 font-display text-xl font-normal text-slate-900 transition-colors group-hover:text-gold-600 md:text-2xl">
                      {p.title}
                    </h3>
                  </div>
                  <span className="text-2xl text-stone-300 transition-all group-hover:translate-x-1 group-hover:text-gold-500 rtl-flip">
                    →
                  </span>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
