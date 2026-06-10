import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Tüm yolları eşle, ama dahili Next.js yollarını ve statik dosyaları atla
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
