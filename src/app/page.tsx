import Header from '@/components/shared/Header';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import PortfolioPreview from '@/components/sections/PortfolioPreview';
import Stats from '@/components/sections/Stats';
import Process from '@/components/sections/Process';
import Pricing from '@/components/sections/Pricing';
import Testimonials from '@/components/sections/Testimonials';
import FAQ from '@/components/sections/FAQ';
import CTA from '@/components/sections/CTA';
import Footer from '@/components/shared/Footer';
import { createClient } from '@supabase/supabase-js';

export const revalidate = 60;

// Initialize Supabase without cookies for ISR/static rendering
const getSupabase = () => createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function Home() {
  const supabase = getSupabase();

  const { data: featuredProjects } = await supabase
    .from('projects')
    .select('*')
    .eq('is_published', true)
    .eq('is_featured', true)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })
    .limit(4);

  const { data: services } = await supabase
    .from('services')
    .select('*')
    .eq('is_published', true)
    .order('sort_order', { ascending: true });

  const { data: testimonials } = await supabase
    .from('testimonials')
    .select('*')
    .eq('is_published', true)
    .eq('is_featured', true)
    .order('sort_order', { ascending: true });

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services initialServices={services || []} />
        <PortfolioPreview initialProjects={featuredProjects || []} />
        <Stats />
        <Process />
        <Pricing initialServices={services || []} />
        <Testimonials initialTestimonials={testimonials || []} />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
