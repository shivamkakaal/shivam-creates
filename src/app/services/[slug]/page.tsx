import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import ServiceDetailPage from './ServiceDetailPage';
import { createClient } from '@supabase/supabase-js';

export const revalidate = 60; // ISR 1 minute

const getSupabase = () => createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function generateStaticParams() {
  const supabase = getSupabase();
  const { data: services } = await supabase.from('services').select('slug').eq('is_published', true);
  return (services || []).map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const supabase = getSupabase();
  const { data: service } = await supabase.from('services').select('*').eq('slug', slug).single();

  if (!service) return { title: 'Service Not Found' };

  return {
    title: service.title,
    description: service.description,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = getSupabase();

  // Fetch current service
  const { data: service } = await supabase
    .from('services')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!service) notFound();

  return (
    <>
      <Header />
      <main>
        <ServiceDetailPage service={service} />
      </main>
      <Footer />
    </>
  );
}
