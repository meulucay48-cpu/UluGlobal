// Statik veri katmanı. İleride Sanity/Strapi gibi bir headless CMS ile değiştirilebilir.

export type CategoryKey = 'ceramic' | 'vitrified' | 'chemicals' | 'armature' | 'parke';

export interface Category {
  key: CategoryKey;
  slug: string;
  image: string;
  tone: string; // hover glow rengi
}

export const categories: Category[] = [
  {
    key: 'ceramic',
    slug: 'seramik',
    image:
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=80',
    tone: '#C9C0B4',
  },
  {
    key: 'chemicals',
    slug: 'yapi-kimyasallari',
    image:
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80',
    tone: '#B08D57',
  },
  {
    key: 'vitrified',
    slug: 'vitrifiye',
    image:
      'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1200&q=80',
    tone: '#A99E8E',
  },
  {
    key: 'armature',
    slug: 'armatur',
    image:
      'https://images.unsplash.com/photo-1576698483491-8c43f0862543?auto=format&fit=crop&w=1200&q=80',
    tone: '#C6A876',
  },
  {
    key: 'parke',
    slug: 'parke',
    image:
      'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=1200&q=80',
    tone: '#C0A06A',
  },
];

export const stats = [
  { key: 'projects', value: 500, suffix: '+' },
  { key: 'area', value: 5, suffix: 'M' },
  { key: 'customer', value: 1000, suffix: '+' },
  { key: 'years', value: 46, suffix: '' },
] as const;

export interface Project {
  id: string;
  city: string;
  // çeviri anahtarı — quote.project.types altından okunur
  typeKey: 'residential' | 'commercial' | 'hotel' | 'other';
  year: string;
  area: string;
  image: string;
}

export const projects: Project[] = [
  {
    id: 'p1',
    city: 'İstanbul',
    typeKey: 'hotel',
    year: '2025',
    area: '12.400 m²',
    image:
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=80',
  },
  {
    id: 'p2',
    city: 'Bodrum',
    typeKey: 'residential',
    year: '2024',
    area: '8.200 m²',
    image:
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1400&q=80',
  },
  {
    id: 'p3',
    city: 'İzmir',
    typeKey: 'commercial',
    year: '2024',
    area: '15.600 m²',
    image:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80',
  },
  {
    id: 'p4',
    city: 'Antalya',
    typeKey: 'hotel',
    year: '2023',
    area: '21.000 m²',
    image:
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1400&q=80',
  },
  {
    id: 'p5',
    city: 'Ankara',
    typeKey: 'commercial',
    year: '2023',
    area: '9.800 m²',
    image:
      'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1400&q=80',
  },
];

export interface Brand {
  id: string;
  name: string;
  category: 'ceramic' | 'vitrified' | 'armature' | 'chemicals' | 'panel';
  accent: string;
  // Gerçek logo dosyasını /public/brands/<id>.svg olarak ekleyince
  // otomatik kullanılır; yoksa şık tipografik wordmark gösterilir.
  logo?: string;
}

export const brands: Brand[] = [
  // Seramik
  { id: 'ng-kutahya', name: 'NG Kütahya', category: 'ceramic', accent: '#4A4F54', logo: '/brands/ng-kutahya.svg' },
  { id: 'qua-granite', name: 'QUA Granite', category: 'ceramic', accent: '#93733F', logo: '/brands/qua-granite.png' },
  { id: 'bien', name: 'Bien Seramik', category: 'ceramic', accent: '#B08D57', logo: '/brands/bien.jpg' },
  { id: 'duratiles', name: 'Duratiles', category: 'ceramic', accent: '#D1342B', logo: '/brands/duratiles.png' },
  { id: 'usak', name: 'Uşak Seramik', category: 'ceramic', accent: '#D1342B', logo: '/brands/usak.png' },
  // Yapı Kimyasalları
  { id: 'kyk', name: 'KYK', category: 'chemicals', accent: '#B08D57', logo: '/brands/kyk.jpg' },
  // Vitrifiye & Armatür
  { id: 'vitra', name: 'VitrA', category: 'vitrified', accent: '#B08D57', logo: '/brands/vitra.png' },
  { id: 'isvea', name: 'İsvea', category: 'vitrified', accent: '#C0182A', logo: '/brands/isvea.png' },
  { id: 'penta', name: 'Penta', category: 'vitrified', accent: '#23262A', logo: '/brands/penta.jpg' },
  // Panel & Laminat
  { id: 'yildiz-entegre', name: 'Yıldız Entegre', category: 'panel', accent: '#3FAE49', logo: '/brands/yildiz-entegre.png' },
  { id: 'agt', name: 'AGT', category: 'panel', accent: '#2E9E48', logo: '/brands/agt.jpg' },
];

// İletişim / WhatsApp ayarları — yayına çıkmadan önce gerçek değerlerle güncelleyin.
export const contactInfo = {
  whatsapp: '905555555555',
  email: 'info@uluglobalyapi.com',
  phone: '+90 555 555 55 55',
  hours: {
    weekday: '09:00 – 18:30',
    saturday: '09:00 – 16:00',
    sunday: null as string | null,
  },
};

export interface Location {
  id: string;
  city: string;
  typeKey: 'office' | 'store';
  address: string;
  phone: string;
  email?: string;
  // Google Maps embed — gerçek adres/konumla değiştirin
  mapQuery: string;
}

// Lokasyonlar — yayına çıkmadan önce gerçek adres, telefon ve harita konumlarıyla güncelleyin.
export const locations: Location[] = [
  {
    id: 'ankara',
    city: 'Ankara',
    typeKey: 'office',
    address: 'Örnek Mah. Yapı Cad. No:1, Çankaya / Ankara',
    phone: '+90 312 000 00 00',
    email: 'ankara@uluglobalyapi.com',
    mapQuery: 'Çankaya, Ankara, Türkiye',
  },
  {
    id: 'adiyaman',
    city: 'Adıyaman',
    typeKey: 'store',
    address: 'Merkez Mah. Sanayi Cad. No:00, Merkez / Adıyaman',
    phone: '+90 416 000 00 00',
    email: 'adiyaman@uluglobalyapi.com',
    mapQuery: 'Adıyaman, Türkiye',
  },
  {
    id: 'kahta',
    city: 'Kahta',
    typeKey: 'store',
    address: 'Cumhuriyet Mah. Atatürk Bul. No:00, Kahta / Adıyaman',
    phone: '+90 416 000 00 00',
    email: 'kahta@uluglobalyapi.com',
    mapQuery: 'Kahta, Adıyaman, Türkiye',
  },
];
