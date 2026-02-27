import { redirect } from 'next/navigation';

export default async function SallesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect(`https://app.ahjazliqaati.com/${locale}/salles`);
}
