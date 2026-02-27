import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import { redirect } from 'next/navigation';

export default function Home({
  params: { locale },
  searchParams,
}: {
  params: { locale: string };
  searchParams: { code?: string };
}) {
  if (searchParams?.code) {
    redirect(`/${locale}/auth/callback?code=${encodeURIComponent(searchParams.code)}`);
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      <Pricing />
      <FAQ />
      <Footer />
    </main>
  );
}
