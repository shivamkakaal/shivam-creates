import { createClient } from '@/lib/supabase/server';
import BlogForm from '../../components/BlogForm';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'Edit Blog Post | Admin',
};

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: post } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('id', id)
    .single();

  if (!post) {
    notFound();
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Edit Blog Post</h1>
        <p className="text-text-secondary">Make changes to your article.</p>
      </div>
      
      <div className="card !p-6 lg:!p-8">
        <BlogForm initialData={post} />
      </div>
    </div>
  );
}
