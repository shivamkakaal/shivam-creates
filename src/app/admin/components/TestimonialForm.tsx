'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';
import { Loader2, Save, ArrowLeft, Star } from 'lucide-react';
import Link from 'next/link';
import MediaPicker from './MediaPicker';

type TestimonialFormProps = {
  initialData?: any;
};

export default function TestimonialForm({ initialData }: TestimonialFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const [formData, setFormData] = useState({
    client_name: initialData?.client_name || '',
    business_name: initialData?.business_name || '',
    review: initialData?.review || '',
    rating: initialData?.rating || 5,
    avatar_url: initialData?.avatar_url || '',
    video_url: initialData?.video_url || '',
    service_type: initialData?.service_type || '',
    is_featured: initialData?.is_featured ?? false,
    is_published: initialData?.is_published ?? true,
    sort_order: initialData?.sort_order || 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setFormData((prev) => ({ ...prev, [e.target.name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        ...formData,
        rating: parseInt(formData.rating as unknown as string, 10),
        sort_order: parseInt(formData.sort_order as unknown as string, 10),
      };

      let error;

      if (initialData?.id) {
        const { error: updateError } = await supabase
          .from('testimonials')
          .update(payload)
          .eq('id', initialData.id);
        error = updateError;
      } else {
        const { error: insertError } = await supabase
          .from('testimonials')
          .insert([payload]);
        error = insertError;
      }

      if (error) throw error;

      toast.success(`Testimonial ${initialData ? 'updated' : 'created'} successfully!`);
      router.push('/admin/testimonials');
      router.refresh();
    } catch (error: any) {
      console.error('Testimonial save error:', error);
      toast.error(error.message || 'Failed to save testimonial');
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
        <div>
          <label className={labelClasses}>Client Name *</label>
          <input type="text" name="client_name" required value={formData.client_name} onChange={handleChange} className={inputClasses} placeholder="John Doe" />
        </div>
        <div>
          <label className={labelClasses}>Business/Company Name</label>
          <input type="text" name="business_name" value={formData.business_name} onChange={handleChange} className={inputClasses} placeholder="Acme Corp" />
        </div>

        <div>
          <label className={labelClasses}>Rating (1-5)</label>
          <div className="flex items-center gap-4">
            <select name="rating" value={formData.rating} onChange={handleChange} className={inputClasses}>
              {[5, 4, 3, 2, 1].map(r => <option key={r} value={r}>{r} Stars</option>)}
            </select>
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < formData.rating ? 'fill-yellow-400 text-yellow-400' : 'text-text-muted'}`} />
              ))}
            </div>
          </div>
        </div>
        <div>
          <label className={labelClasses}>Service Type</label>
          <input type="text" name="service_type" value={formData.service_type} onChange={handleChange} className={inputClasses} placeholder="Web Development" />
        </div>

        <div className="md:col-span-2">
          <label className={labelClasses}>Review/Testimonial Text *</label>
          <textarea name="review" required rows={4} value={formData.review} onChange={handleChange} className={`${inputClasses} resize-none`} placeholder="What did the client say?" />
        </div>

        <div>
          <MediaPicker 
            label="Avatar URL"
            value={formData.avatar_url}
            onChange={(url) => setFormData(prev => ({ ...prev, avatar_url: url }))}
          />
        </div>
        <div>
          <label className={labelClasses}>Video URL (Optional)</label>
          <input type="url" name="video_url" value={formData.video_url} onChange={handleChange} className={inputClasses} placeholder="https://..." />
        </div>

        <div>
          <label className={labelClasses}>Sort Order</label>
          <input type="number" name="sort_order" value={formData.sort_order} onChange={handleChange} className={inputClasses} />
        </div>

        <div className="md:col-span-2 flex gap-8 p-4 rounded-xl border border-white/5 bg-white/[0.02]">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" name="is_published" checked={formData.is_published} onChange={handleChange} className="w-4 h-4 rounded border-white/20 bg-transparent text-amber focus:ring-amber focus:ring-offset-background" />
            <span className="text-sm font-medium text-foreground">Published</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" name="is_featured" checked={formData.is_featured} onChange={handleChange} className="w-4 h-4 rounded border-white/20 bg-transparent text-amber focus:ring-amber focus:ring-offset-background" />
            <span className="text-sm font-medium text-foreground">Featured (Show on Home)</span>
          </label>
        </div>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-white/10">
        <Link href="/admin/testimonials" className="btn-ghost text-sm">
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
              <span>Save Testimonial</span>
              <Save className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
