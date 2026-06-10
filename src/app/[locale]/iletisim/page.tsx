import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Phone, Mail, Clock, Navigation, MapPin, Building2, Store } from 'lucide-react';
import { FullscreenHero } from '@/components/sections/FullscreenHero';
import { Container } from '@/components/primitives/Container';
import { Reveal } from '@/components/motion/Reveal';
import { ContactForm } from '@/components/contact/ContactForm';
import { contactInfo, locations } from '@/lib/data';

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'contactPage' });

  const hours = [
    { label: t('hours.weekday'), value: contactInfo.hours.weekday },
    { label: t('hours.saturday'), value: contactInfo.hours.saturday },
    { label: t('hours.sunday'), value: contactInfo.hours.sunday ?? t('hours.closed') },
  ];

  const general = [
    { icon: Phone, label: t('labels.phone'), value: contactInfo.phone, href: `tel:${contactInfo.phone}` },
    { icon: Mail, label: t('labels.email'), value: contactInfo.email, href: `mailto:${contactInfo.email}` },
  ];

  return (
    <>
      <FullscreenHero
        eyebrow={t('eyebrow')}
        title={t('title')}
        subtitle={t('subtitle')}
        image="https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=2400&q=80"
      />

      <section className="bg-stone-50 pb-20 pt-20 md:pb-24 md:pt-28">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12">
            {/* Form */}
            <Reveal className="lg:col-span-7">
              <ContactForm />
            </Reveal>

            {/* Genel iletişim + saatler */}
            <div className="flex flex-col gap-6 lg:col-span-5">
              <Reveal delay={0.1}>
                <div className="rounded-3xl border border-stone-200 bg-white/60 p-8">
                  <h3 className="text-xs uppercase tracking-widest text-gold-600">{t('infoTitle')}</h3>
                  <ul className="mt-6 space-y-5">
                    {general.map((item, i) => (
                      <li key={i} className="flex gap-4">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-stone-100 text-gold-600">
                          <item.icon className="h-4 w-4" />
                        </span>
                        <div>
                          <p className="text-[11px] uppercase tracking-widest text-slate-400">{item.label}</p>
                          <a href={item.href} className="text-sm text-slate-900 transition-colors hover:text-gold-600">
                            {item.value}
                          </a>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={0.18}>
                <div className="rounded-3xl border border-stone-200 bg-slate-900 p-8 text-stone-50">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-gold-400" />
                    <h3 className="text-xs uppercase tracking-widest text-gold-400">{t('hoursTitle')}</h3>
                  </div>
                  <ul className="mt-6 space-y-3">
                    {hours.map((h, i) => (
                      <li
                        key={i}
                        className="flex items-center justify-between border-b border-stone-700/40 pb-3 text-sm last:border-0 last:pb-0"
                      >
                        <span className="text-stone-300">{h.label}</span>
                        <span className="font-medium">{h.value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* Lokasyonlar */}
      <section className="bg-stone-100 py-20 md:py-28">
        <Container>
          <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <Reveal>
              <h2 className="font-display text-3xl font-light md:text-5xl">{t('locationsTitle')}</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="max-w-md text-sm text-slate-500 md:text-base">{t('locationsSubtitle')}</p>
            </Reveal>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {locations.map((loc, i) => {
              const name = `${loc.city} ${t(`types.${loc.typeKey}`)}`;
              const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(loc.mapQuery)}&z=13&output=embed`;
              const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(loc.mapQuery)}`;
              const Icon = loc.typeKey === 'office' ? Building2 : Store;
              return (
                <Reveal key={loc.id} delay={i * 0.1}>
                  <div className="group flex h-full flex-col overflow-hidden rounded-3xl border border-stone-200 bg-white/70 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-slate-900/5">
                    <div className="relative h-44 w-full overflow-hidden border-b border-stone-200">
                      <iframe
                        title={name}
                        src={mapSrc}
                        className="h-full w-full grayscale-[0.35] contrast-[1.05]"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>

                    <div className="flex flex-1 flex-col p-7">
                      <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-stone-100 px-3 py-1 text-[11px] uppercase tracking-widest text-gold-600">
                        <Icon className="h-3.5 w-3.5" />
                        {t(`types.${loc.typeKey}`)}
                      </span>
                      <h3 className="mt-4 font-display text-2xl font-light text-slate-900">{name}</h3>

                      <ul className="mt-5 space-y-3 text-sm">
                        <li className="flex gap-3 text-slate-600">
                          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                          <span>{loc.address}</span>
                        </li>
                        <li className="flex gap-3">
                          <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                          <a href={`tel:${loc.phone}`} className="text-slate-900 transition-colors hover:text-gold-600">
                            {loc.phone}
                          </a>
                        </li>
                        {loc.email && (
                          <li className="flex gap-3">
                            <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                            <a href={`mailto:${loc.email}`} className="text-slate-900 transition-colors hover:text-gold-600">
                              {loc.email}
                            </a>
                          </li>
                        )}
                      </ul>

                      <a
                        href={directions}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-stone-300 px-5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:border-gold-500 hover:text-gold-600"
                      >
                        <Navigation className="h-4 w-4 rtl-flip" />
                        {t('directions')}
                      </a>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}
