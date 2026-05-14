import { MetadataRoute } from 'next';
import { createClient } from '@supabase/supabase-js';

const getSupabase = () => createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://shivamcreates.com';
  const supabase = getSupabase();

  // Core static routes
  const routes = [
    '',
    '/about',
    '/services',
    '/portfolio',
    '/blog',
    '/contact',
    '/start-project',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Fetch dynamic routes concurrently
  const [
    { data: services },
    { data: projects },
    { data: blogPosts }
  ] = await Promise.all([
    supabase.from('services').select('slug, updated_at, is_published').eq('is_published', true),
    supabase.from('projects').select('slug, updated_at, is_published').eq('is_published', true),
    supabase.from('blog_posts').select('slug, updated_at, is_published').eq('is_published', true),
  ]);

  const serviceRoutes = (services || []).map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(service.updated_at || new Date()),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const projectRoutes = (projects || []).map((project) => ({
    url: `${baseUrl}/portfolio/${project.slug}`,
    lastModified: new Date(project.updated_at || new Date()),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const blogRoutes = (blogPosts || []).map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updated_at || new Date()),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...routes, ...serviceRoutes, ...projectRoutes, ...blogRoutes];
}
