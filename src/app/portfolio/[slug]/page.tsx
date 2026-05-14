import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import ProjectDetailPage from './ProjectDetailPage';
import { createClient } from '@supabase/supabase-js';

const getSupabase = () => createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function generateStaticParams() {
  const supabase = getSupabase();
  const { data: projects } = await supabase.from('projects').select('slug').eq('is_published', true);
  return (projects || []).map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const supabase = getSupabase();
  const { data: project } = await supabase.from('projects').select('*').eq('slug', slug).single();
  
  if (!project) return { title: 'Project Not Found' };

  return {
    title: project.title,
    description: project.description,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = getSupabase();
  
  // Fetch current project
  const { data: project } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!project) notFound();

  // Fetch all projects for next/prev navigation
  const { data: allProjects } = await supabase
    .from('projects')
    .select('slug, title')
    .eq('is_published', true)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });

  return (
    <>
      <Header />
      <main>
        <ProjectDetailPage project={project} allProjects={allProjects || []} />
      </main>
      <Footer />
    </>
  );
}
