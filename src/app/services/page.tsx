import type { Metadata } from 'next';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import ServicesPage from './ServicesPage';
import { createClient } from '@supabase/supabase-js';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Explore our full range of digital services — web development, app development, video editing, branding, digital marketing, and UI/UX design. Premium quality at accessible prices.',
};

export const revalidate = 60;

const getSupabase = () => createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function Page() {
  const supabase = getSupabase();

  const { data: services, error } = await supabase
    .from('services')
    .select('*')
    .eq('is_published', true)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching services:', error);
  }

  return (
    <>
      <Header />
      <main>
        <ServicesPage initialServices={services || []} />
      </main>
      <Footer />
    </>
  );
}
