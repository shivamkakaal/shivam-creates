import type { Metadata } from 'next';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import PortfolioPage from './PortfolioPage';
import { createClient } from '@supabase/supabase-js';

export const metadata: Metadata = {
  title: 'Portfolio',
  description:
    'Explore our best work — stunning websites, mobile apps, branding, and more. Real projects with real results from Shivam Creates.',
};

export const revalidate = 60; // Revalidate every minute for ISR

const getSupabase = () => createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function Page() {
  const supabase = getSupabase();

  const { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    .eq('is_published', true)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching public projects:', error);
  }

  return (
    <>
      <Header />
      <main>
        <PortfolioPage initialProjects={projects || []} />
      </main>
      <Footer />
    </>
  );
}
