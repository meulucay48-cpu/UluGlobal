import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/primitives/Container';
import { Button } from '@/components/primitives/Button';

export default async function NotFound() {
  const nav = await getTranslations('nav');
  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center gap-6 text-center">
      <p className="font-display text-8xl font-extralight text-gold-500">404</p>
      <Button href="/" variant="primary">
        {nav('home')}
      </Button>
    </Container>
  );
}
