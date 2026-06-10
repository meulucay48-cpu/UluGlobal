import { setRequestLocale, getTranslations } from 'next-intl/server';
import { HorizontalProjects } from '@/components/sections/HorizontalProjects';
import { CtaBand } from '@/components/sections/CtaBand';

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  // başlık bilgisini önceden yüklemek için (galeri kendi metinlerini çekiyor)
  await getTranslations({ locale, namespace: 'projectsPage' });

  return (
    <>
      {/* <HorizontalProjects /> */}
      <CtaBand />
    </>
  );
}
