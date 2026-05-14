'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';
import { Loader2, Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import MediaPicker from './MediaPicker';

type BlogFormProps = {
  initialData?: any;
};

export default function BlogForm({ initialData }: BlogFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    category: initialData?.category || 'Development',
    excerpt: initialData?.excerpt || '',
    content: initialData?.content || '',
    thumbnail_url: initialData?.thumbnail_url || '',
    tags: initialData?.tags ? initialData.tags.join(', ') : '',
    read_time_minutes: initialData?.read_time_minutes || 5,
    author_name: initialData?.author_name || 'Shivam Creates',
    is_published: initialData?.is_published ?? false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setFormData((prev) => ({ ...prev, [e.target.name]: value }));
  };

  const handleSlugify = () => {
    if (formData.title && !formData.slug) {
      setFormData(prev => ({
        ...prev,
        slug: prev.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        ...formData,
        tags: formData.tags.split(',').map((t: string) => t.trim()).filter(Boolean),
        read_time_minutes: parseInt(formData.read_time_minutes as unknown as string, 10),
      };

      let error;

      if (initialData?.id) {
        // Update
        const { error: updateError } = await supabase
          .from('blog_posts')
          .update({ ...payload, updated_at: new Date().toISOString() })
          .eq('id', initialData.id);
        error = updateError;
      } else {
        // Create
        const { error: insertError } = await supabase
          .from('blog_posts')
          .insert([payload]);
        error = insertError;
      }

      if (error) throw error;

      toast.success(`Blog post ${initialData ? 'updated' : 'created'} successfully!`);
      router.push('/admin/blog');
      router.refresh();
    } catch (error: any) {
      console.error('Blog post save error:', error);
      toast.error(error.message || 'Failed to save blog post');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses =
    'w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-foreground text-sm placeholder:text-text-muted focus:outline-none focus:border-amber/40 focus:bg-white/[0.06] transition-all duration-300';
  const labelClasses = 'block text-sm font-medium text-text-secondary mb-2';

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Title & Slug */}
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClasses}>Post Title *</label>
            <input type="text" name="title" required value={formData.title} onChange={handleChange} onBlur={handleSlugify} className={inputClasses} placeholder="e.g. 10 Tips for Better Web Design" />
          </div>
          <div>
            <label className={labelClasses}>URL Slug *</label>
            <input type="text" name="slug" required value={formData.slug} onChange={handleChange} className={inputClasses} placeholder="10-tips-for-better-web-design" />
          </div>
        </div>

        {/* Category & Read Time */}
        <div>
          <label className={labelClasses}>Category *</label>
          <input type="text" name="category" required value={formData.category} onChange={handleChange} className={inputClasses} placeholder="e.g. Development, Design, Marketing" />
        </div>
        <div>
          <label className={labelClasses}>Read Time (Minutes) *</label>
          <input type="number" name="read_time_minutes" required min="1" value={formData.read_time_minutes} onChange={handleChange} className={inputClasses} />
        </div>

        {/* Author & Thumbnail */}
        <div>
          <label className={labelClasses}>Author Name *</label>
          <input type="text" name="author_name" required value={formData.author_name} onChange={handleChange} className={inputClasses} placeholder="Shivam Creates" />
        </div>
        <div>
          <MediaPicker 
            label="Thumbnail Image URL"
            value={formData.thumbnail_url}
            onChange={(url) => setFormData(prev => ({ ...prev, thumbnail_url: url }))}
          />
        </div>

        {/* Tags */}
        <div className="md:col-span-2">
          <label className={labelClasses}>Tags (Comma separated)</label>
          <input type="text" name="tags" value={formData.tags} onChange={handleChange} className={inputClasses} placeholder="React, Next.js, SEO..." />
        </div>

        {/* Excerpt */}
        <div className="md:col-span-2">
          <label className={labelClasses}>Excerpt (Short Summary)</label>
          <textarea name="excerpt" rows={3} value={formData.excerpt} onChange={handleChange} className={`${inputClasses} resize-none`} placeholder="Brief summary of the article..." />
        </div>

        {/* Content */}
        <div className="md:col-span-2">
          <label className={labelClasses}>Content (Markdown format) *</label>
          <textarea 
            name="content" 
            rows={15} 
            required 
            value={formData.content} 
            onChange={handleChange} 
            className={`${inputClasses} font-mono text-sm leading-relaxed resize-y`} 
            placeholder="Write your post content here using Markdown..." 
          />
          <p className="text-xs text-text-muted mt-2">
            Supports Markdown formatting: # Heading, **bold**, *italic*, [link](url), etc.
          </p>
        </div>

        {/* Toggles */}
        <div className="md:col-span-2 flex gap-8 p-4 rounded-xl border border-white/5 bg-white/[0.02]">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" name="is_published" checked={formData.is_published} onChange={handleChange} className="w-4 h-4 rounded border-white/20 bg-transparent text-amber focus:ring-amber focus:ring-offset-background" />
            <span className="text-sm font-medium text-foreground">Published (Public visible)</span>
          </label>
        </div>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-white/10">
        <Link href="/admin/blog" className="btn-ghost text-sm">
          <ArrowLeft className="w-4 h-4" />
          <span>Cancel</span>
        </Link>
        <button type="submit" disabled={isSubmitting} className="btn-primary text-sm disabled:opacity-60">
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <span>Save Post</span>
              <Save className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
