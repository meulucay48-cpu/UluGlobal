# Ulu Global Yapı — Web Sitesi

Premium yapı malzemeleri / seramik / vitrifiye kurumsal web sitesi.
Modern, çok dilli (TR/EN/RU/AR + RTL), animasyonlu, yüksek performanslı.

## Stack

- **Next.js 15** (App Router, SSG)
- **TailwindCSS** + class-variance-authority (tasarım token'ları)
- **next-intl** — çok dilli routing + RTL
- **Framer Motion** — animasyon / mikro etkileşim / sayfa geçişi
- **GSAP** (eklendi, ileri scroll koreografisi için)
- **Zustand** — teklif sihirbazı durumu (localStorage persist)
- **React Hook Form + Zod** — form altyapısı (hazır)
- **lucide-react** — ikonlar

## Komutlar

```bash
npm install      # bağımlılıklar
npm run dev      # geliştirme (http://localhost:3000)
npm run build    # production derleme
npm start        # production sunucu
```

## Yapı

```
src/
├─ app/[locale]/        # dil bazlı rotalar (tr|en|ru|ar)
│  ├─ page.tsx          # ana sayfa
│  ├─ kurumsal/ urunler/ urunler/[category]/
│  ├─ projeler/ blog/ iletisim/
│  └─ teklif/           # çok adımlı teklif sihirbazı
├─ components/
│  ├─ primitives/       # Button, Container
│  ├─ layout/           # Header, FullscreenNav, Footer, LangSwitcher, Logo
│  ├─ motion/           # Loader, PageTransition, Reveal, Parallax, TextReveal, Magnetic
│  ├─ sections/         # Hero, Manifesto, CategoryShowcase, Stats, Process, CtaBand, PageHero
│  └─ quote/            # QuoteWizard + 5 adım + Progress + Field
├─ i18n/                # routing.ts, request.ts
├─ lib/                 # data.ts, fonts.ts, utils.ts, quote-message.ts
├─ stores/              # quote-store.ts
└─ middleware.ts        # next-intl middleware
messages/               # tr.json en.json ru.json ar.json
```

## Yayına çıkmadan önce yapılacaklar

1. **`src/lib/data.ts`** → `contactInfo` içindeki WhatsApp numarası, e-posta, telefonu gerçek değerlerle değiştirin.
2. Görseller şu an Unsplash placeholder. Gerçek ürün/proje fotoğraflarıyla değiştirin (`next/image`).
3. **E-posta gönderimi**: Teklif sihirbazı şu an WhatsApp'a yönlendiriyor. E-posta için `Resend` + bir `app/api/quote/route.ts` server action eklenebilir.
4. İçerik için **Sanity/Strapi** entegrasyonu (`lib/data.ts` yerine).
5. SEO: `app/[locale]/sitemap.ts`, `robots.ts`, lokalize OG görselleri eklenebilir.

## i18n notu

`localePrefix: 'as-needed'` — Türkçe kök (`/`), diğerleri prefix'li (`/en`, `/ru`, `/ar`).
Tarayıcı dili otomatik algılanır. RTL, Arapça'da `dir="rtl"` ile kökten uygulanır; layout'lar
`ms-/me-/ps-/pe-` logical property'leri ve `rtl-flip` ile yön duyarlıdır.
# UluGlobal
