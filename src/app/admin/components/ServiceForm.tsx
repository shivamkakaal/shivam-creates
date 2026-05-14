'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';
import { Loader2, Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

type ServiceFormProps = {
  initialData?: any;
};

export default function ServiceForm({ initialData }: ServiceFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    tagline: initialData?.tagline || '',
    description: initialData?.description || '',
    icon: initialData?.icon || 'Code',
    deliverables: initialData?.deliverables ? initialData.deliverables.join('\n') : '',
    tech_used: initialData?.tech_used ? initialData.tech_used.join(', ') : '',
    timeline_min: initialData?.timeline_min || '',
    timeline_max: initialData?.timeline_max || '',
    sort_order: initialData?.sort_order || 0,
    is_published: initialData?.is_published ?? true,
    pricing_tiers: initialData?.pricing_tiers ? JSON.stringify(initialData.pricing_tiers, null, 2) : '[]',
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
      let parsedPricing = [];
      try {
        parsedPricing = JSON.parse(formData.pricing_tiers || '[]');
      } catch (err) {
        throw new Error('Pricing Tiers must be valid JSON');
      }

      const payload = {
        title: formData.title,
        slug: formData.slug,
        tagline: formData.tagline,
        description: formData.description,
        icon: formData.icon,
        timeline_min: formData.timeline_min ? parseInt(formData.timeline_min.toString(), 10) : null,
        timeline_max: formData.timeline_max ? parseInt(formData.timeline_max.toString(), 10) : null,
        sort_order: parseInt(formData.sort_order.toString(), 10) || 0,
        is_published: formData.is_published,
        pricing_tiers: parsedPricing,
        deliverables: formData.deliverables.split('\n').map((d: string) => d.trim()).filter(Boolean),
        tech_used: formData.tech_used.split(',').map((t: string) => t.trim()).filter(Boolean),
      };

      let error;

      if (initialData?.id) {
        // Update
        const { error: updateError } = await supabase
          .from('services')
          .update(payload)
          .eq('id', initialData.id);
        error = updateError;
      } else {
        // Create
        const { error: insertError } = await supabase
          .from('services')
          .insert([payload]);
        error = insertError;
      }

      if (error) throw error;

      toast.success(`Service ${initialData ? 'updated' : 'created'} successfully!`);
      router.push('/admin/services');
      router.refresh();
    } catch (error: any) {
      console.error('Service save error:', error);
      toast.error(error.message || 'Failed to save service');
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
        <div>
          <label className={labelClasses}>Service Title *</label>
          <input type="text" name="title" required value={formData.title} onChange={handleChange} onBlur={handleSlugify} className={inputClasses} placeholder="e.g. Web Development" />
        </div>
        <div>
          <label className={labelClasses}>URL Slug *</label>
          <input type="text" name="slug" required value={formData.slug} onChange={handleChange} className={inputClasses} placeholder="web-development" />
        </div>

        {/* Tagline & Icon */}
        <div>
          <label className={labelClasses}>Tagline</label>
          <input type="text" name="tagline" value={formData.tagline} onChange={handleChange} className={inputClasses} placeholder="Build faster, scale better." />
        </div>
        <div>
          <label className={labelClasses}>Lucide Icon Name</label>
          <input type="text" name="icon" value={formData.icon} onChange={handleChange} className={inputClasses} placeholder="Code, Smartphone, Video..." />
          <p className="text-xs text-text-muted mt-1">Must exactly match a Lucide React icon name.</p>
        </div>

        {/* Timeline */}
        <div>
          <label className={labelClasses}>Min Timeline (Days)</label>
          <input type="number" name="timeline_min" value={formData.timeline_min} onChange={handleChange} className={inputClasses} placeholder="5" />
        </div>
        <div>
          <label className={labelClasses}>Max Timeline (Days)</label>
          <input type="number" name="timeline_max" value={formData.timeline_max} onChange={handleChange} className={inputClasses} placeholder="14" />
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className={labelClasses}>Full Description</label>
          <textarea name="description" rows={3} value={formData.description} onChange={handleChange} className={`${inputClasses} resize-none`} placeholder="Detailed service description..." />
        </div>

        {/* Deliverables */}
        <div className="md:col-span-2">
          <label className={labelClasses}>Deliverables (One per line)</label>
          <textarea name="deliverables" rows={4} value={formData.deliverables} onChange={handleChange} className={`${inputClasses} resize-none`} placeholder="Responsive Design&#10;SEO Optimization&#10;CMS Setup" />
        </div>

        {/* Tech Stack */}
        <div className="md:col-span-2">
          <label className={labelClasses}>Technologies Used (Comma separated)</label>
          <input type="text" name="tech_used" value={formData.tech_used} onChange={handleChange} className={inputClasses} placeholder="React, Next.js, Vercel" />
        </div>

        {/* Pricing Tiers JSON */}
        <div className="md:col-span-2">
          <label className={labelClasses}>Pricing Tiers (JSON Format)</label>
          <textarea name="pricing_tiers" rows={6} value={formData.pricing_tiers} onChange={handleChange} className={`${inputClasses} font-mono text-xs`} placeholder="[{ 'name': 'Basic', 'price': 5000 }]" />
        </div>

        {/* Order & Publish */}
        <div>
          <label className={labelClasses}>Sort Order (Smaller = First)</label>
          <input type="number" name="sort_order" value={formData.sort_order} onChange={handleChange} className={inputClasses} />
        </div>
        
        <div className="flex items-center pt-8">
          <label className="flex items-center gap-3 cursor-pointer p-4 w-full rounded-xl border border-white/5 bg-white/[0.02]">
            <input type="checkbox" name="is_published" checked={formData.is_published} onChange={handleChange} className="w-4 h-4 rounded border-white/20 bg-transparent text-amber focus:ring-amber focus:ring-offset-background" />
            <span className="text-sm font-medium text-foreground">Published (Public visible)</span>
          </label>
        </div>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-white/10">
        <Link href="/admin/services" className="btn-ghost text-sm">
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
              <span>Save Service</span>
              <Save className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
