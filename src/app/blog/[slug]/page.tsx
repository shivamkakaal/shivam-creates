import type { Metadata } from 'next';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import BlogPostContent from './BlogPostContent';
import { createClient } from '@supabase/supabase-js';
import { notFound } from 'next/navigation';

export const revalidate = 60; // ISR 1 minute

const getSupabase = () => createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function generateStaticParams() {
  const supabase = getSupabase();
  const { data: posts } = await supabase.from('blog_posts').select('slug').eq('is_published', true);
  return (posts || []).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const supabase = getSupabase();
  const { data: post } = await supabase.from('blog_posts').select('*').eq('slug', slug).single();

  if (!post) return { title: 'Post Not Found' };

  return {
    title: `${post.title} | Blog`,
    description: post.excerpt || `Read ${post.title} on Shivam Creates blog.`,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.thumbnail_url ? [post.thumbnail_url] : [],
      type: 'article',
      publishedTime: post.published_at || post.created_at,
      authors: [post.author_name || 'Shivam Creates'],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = getSupabase();

  const { data: post } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single();

  if (!post) {
    notFound();
  }

  return (
    <>
      <Header />
      <main>
        <BlogPostContent post={post} />
      </main>
      <Footer />
    </>
  );
}
