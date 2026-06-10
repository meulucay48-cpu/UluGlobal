import type { QuoteState } from '@/stores/quote-store';

/** Teklif verisini WhatsApp/e-posta için okunabilir metne çevirir. */
export function buildQuoteMessage(
  q: Pick<QuoteState, 'categories' | 'items' | 'project' | 'contact'>,
): string {
  const lines: string[] = [];
  lines.push('🏗️ ULU GLOBAL YAPI — Teklif Talebi', '');

  if (q.categories.length) {
    lines.push(`📦 Kategoriler: ${q.categories.join(', ')}`);
  }

  if (q.items.length) {
    lines.push('', '🧱 Ürünler:');
    q.items.forEach((i) => lines.push(`  • ${i.name} — ${i.quantity} ${i.unit}`));
  }

  lines.push('', '🏠 Proje:');
  if (q.project.type) lines.push(`  • Tip: ${q.project.type}`);
  if (q.project.city) lines.push(`  • Şehir: ${q.project.city}`);
  if (q.project.deadline) lines.push(`  • Teslim: ${q.project.deadline}`);
  if (q.project.notes) lines.push(`  • Not: ${q.project.notes}`);

  lines.push('', '👤 İletişim:');
  lines.push(`  • ${q.contact.name}`);
  lines.push(`  • ${q.contact.phone}`);
  lines.push(`  • ${q.contact.email}`);
  if (q.contact.company) lines.push(`  • ${q.contact.company}`);
  if (q.contact.fileName) lines.push(`  • Dosya: ${q.contact.fileName}`);

  return lines.join('\n');
}

export function whatsappUrl(phone: string, message: string): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
