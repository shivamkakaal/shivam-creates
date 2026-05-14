'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';
import { Trash2, Edit, Loader2, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

export default function BlogTable({ initialPosts }: { initialPosts: any[] }) {
  const [posts, setPosts] = useState(initialPosts);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [isToggling, setIsToggling] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;

    setIsDeleting(id);
    try {
      const { error } = await supabase.from('blog_posts').delete().eq('id', id);
      if (error) throw error;

      setPosts((prev) => prev.filter((p) => p.id !== id));
      toast.success('Blog post deleted successfully');
      router.refresh();
    } catch (error: any) {
      toast.error('Failed to delete blog post');
      console.error(error);
    } finally {
      setIsDeleting(null);
    }
  };

  const togglePublish = async (id: string, currentStatus: boolean) => {
    setIsToggling(id);
    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({ is_published: !currentStatus })
        .eq('id', id);

      if (error) throw error;

      setPosts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, is_published: !currentStatus } : p))
      );
      toast.success(`Post ${!currentStatus ? 'published' : 'unpublished'}`);
      router.refresh();
    } catch (error: any) {
      toast.error('Failed to update status');
      console.error(error);
    } finally {
      setIsToggling(null);
    }
  };

  if (posts.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-text-secondary">No blog posts found. Create your first post!</p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-left text-sm text-text-secondary">
        <thead className="bg-white/[0.02] border-b border-white/5 text-xs uppercase text-text-muted">
          <tr>
            <th className="px-6 py-4 font-medium">Title</th>
            <th className="px-6 py-4 font-medium">Category</th>
            <th className="px-6 py-4 font-medium">Date</th>
            <th className="px-6 py-4 font-medium">Status</th>
            <th className="px-6 py-4 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {posts.map((post) => (
            <tr key={post.id} className="hover:bg-white/[0.02] transition-colors">
              <td className="px-6 py-4">
                <div className="font-medium text-foreground truncate max-w-[200px]">
                  {post.title}
                </div>
                <div className="text-xs text-text-muted truncate max-w-[200px] mt-0.5">
                  /{post.slug}
                </div>
              </td>
              <td className="px-6 py-4 capitalize">{post.category}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {new Date(post.created_at).toLocaleDateString()}
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() => togglePublish(post.id, post.is_published)}
                  disabled={isToggling === post.id}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-colors ${
                    post.is_published
                      ? 'bg-neon-green/10 text-neon-green border-neon-green/20 hover:bg-neon-green/20'
                      : 'bg-white/5 text-text-muted border-white/10 hover:bg-white/10'
                  }`}
                >
                  {isToggling === post.id ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : post.is_published ? (
                    <Eye className="w-3 h-3" />
                  ) : (
                    <EyeOff className="w-3 h-3" />
                  )}
                  {post.is_published ? 'Published' : 'Draft'}
                </button>
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <Link
                    href={`/admin/blog/${post.id}`}
                    className="p-2 rounded-lg text-text-secondary hover:text-amber hover:bg-amber/10 transition-colors"
                    title="Edit post"
                  >
                    <Edit className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(post.id)}
                    disabled={isDeleting === post.id}
                    className="p-2 rounded-lg text-text-secondary hover:text-accent-pink hover:bg-accent-pink/10 transition-colors disabled:opacity-50"
                    title="Delete post"
                  >
                    {isDeleting === post.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
