'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';
import { Loader2, Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import MediaPicker from './MediaPicker';

type ProjectFormProps = {
  initialData?: any;
};

export default function ProjectForm({ initialData }: ProjectFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    category: initialData?.category || '',
    description: initialData?.description || '',
    client_name: initialData?.client_name || '',
    tech_stack: initialData?.tech_stack ? initialData.tech_stack.join(', ') : '',
    live_url: initialData?.live_url || '',
    thumbnail_url: initialData?.thumbnail_url || '',
    is_published: initialData?.is_published ?? true,
    is_featured: initialData?.is_featured ?? false,
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
        tech_stack: formData.tech_stack.split(',').map((t: string) => t.trim()).filter(Boolean),
      };

      let error;

      if (initialData?.id) {
        // Update
        const { error: updateError } = await supabase
          .from('projects')
          .update(payload)
          .eq('id', initialData.id);
        error = updateError;
      } else {
        // Create
        const { error: insertError } = await supabase
          .from('projects')
          .insert([payload]);
        error = insertError;
      }

      if (error) throw error;

      toast.success(`Project ${initialData ? 'updated' : 'created'} successfully!`);
      router.push('/admin/portfolio');
      router.refresh();
    } catch (error: any) {
      console.error('Project save error:', error);
      toast.error(error.message || 'Failed to save project');
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
            <label className={labelClasses}>Project Title *</label>
            <input type="text" name="title" required value={formData.title} onChange={handleChange} onBlur={handleSlugify} className={inputClasses} placeholder="e.g. E-Commerce Redesign" />
          </div>
          <div>
            <label className={labelClasses}>URL Slug *</label>
            <input type="text" name="slug" required value={formData.slug} onChange={handleChange} className={inputClasses} placeholder="e-commerce-redesign" />
          </div>
        </div>

        {/* Category & Client */}
        <div>
          <label className={labelClasses}>Category *</label>
          <select name="category" required value={formData.category} onChange={handleChange} className={`${inputClasses} appearance-none`}>
            <option value="" disabled>Select category</option>
            <option value="website" className="bg-[#0a0f1e]">Website</option>
            <option value="app" className="bg-[#0a0f1e]">Mobile App</option>
            <option value="branding" className="bg-[#0a0f1e]">Branding</option>
            <option value="video" className="bg-[#0a0f1e]">Video Editing</option>
            <option value="marketing" className="bg-[#0a0f1e]">Marketing</option>
          </select>
        </div>
        <div>
          <label className={labelClasses}>Client Name</label>
          <input type="text" name="client_name" value={formData.client_name} onChange={handleChange} className={inputClasses} placeholder="Client Inc." />
        </div>

        {/* URLs */}
        <div>
          <MediaPicker 
            label="Thumbnail Image URL"
            value={formData.thumbnail_url}
            onChange={(url) => setFormData(prev => ({ ...prev, thumbnail_url: url }))}
          />
        </div>
        <div>
          <label className={labelClasses}>Live Project URL</label>
          <input type="url" name="live_url" value={formData.live_url} onChange={handleChange} className={inputClasses} placeholder="https://..." />
        </div>

        {/* Tech Stack */}
        <div className="md:col-span-2">
          <label className={labelClasses}>Tech Stack (Comma separated)</label>
          <input type="text" name="tech_stack" value={formData.tech_stack} onChange={handleChange} className={inputClasses} placeholder="Next.js, Tailwind, Supabase..." />
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className={labelClasses}>Short Description</label>
          <textarea name="description" rows={3} value={formData.description} onChange={handleChange} className={`${inputClasses} resize-none`} placeholder="Brief summary of the project..." />
        </div>

        {/* Toggles */}
        <div className="md:col-span-2 flex gap-8 p-4 rounded-xl border border-white/5 bg-white/[0.02]">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" name="is_published" checked={formData.is_published} onChange={handleChange} className="w-4 h-4 rounded border-white/20 bg-transparent text-amber focus:ring-amber focus:ring-offset-background" />
            <span className="text-sm font-medium text-foreground">Published (Public visible)</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" name="is_featured" checked={formData.is_featured} onChange={handleChange} className="w-4 h-4 rounded border-white/20 bg-transparent text-amber focus:ring-amber focus:ring-offset-background" />
            <span className="text-sm font-medium text-foreground">Featured (Homepage visible)</span>
          </label>
        </div>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-white/10">
        <Link href="/admin/portfolio" className="btn-ghost text-sm">
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
              <span>Save Project</span>
              <Save className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
