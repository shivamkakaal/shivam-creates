import type { Metadata } from 'next';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import BlogPage from './BlogPage';

import { createClient } from '@supabase/supabase-js';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Insights, tips, and tutorials on web development, design, digital marketing, and growing your brand online — by Shivam Creates.',
};

export const revalidate = 60;

const getSupabase = () => createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function Page() {
  const supabase = getSupabase();

  const { data: posts, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('is_published', true)
    .order('published_at', { ascending: false })
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching blog posts:', error);
  }

  return (
    <>
      <Header />
      <main>
        <BlogPage initialPosts={posts || []} />
      </main>
      <Footer />
    </>
  );
}
