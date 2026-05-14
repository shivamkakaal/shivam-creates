'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';
import { Trash2, Edit, Loader2, Star, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

export default function TestimonialsTable({ initialTestimonials }: { initialTestimonials: any[] }) {
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;

    setIsDeleting(id);
    try {
      const { error } = await supabase.from('testimonials').delete().eq('id', id);
      if (error) throw error;

      setTestimonials((prev) => prev.filter((t) => t.id !== id));
      toast.success('Testimonial deleted');
      router.refresh();
    } catch (error: any) {
      toast.error('Failed to delete testimonial');
      console.error(error);
    } finally {
      setIsDeleting(null);
    }
  };

  const togglePublish = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('testimonials')
        .update({ is_published: !currentStatus })
        .eq('id', id);

      if (error) throw error;

      setTestimonials((prev) =>
        prev.map((t) => (t.id === id ? { ...t, is_published: !currentStatus } : t))
      );
      toast.success('Status updated');
      router.refresh();
    } catch (error: any) {
      toast.error('Failed to update status');
    }
  };

  if (testimonials.length === 0) {
    return (
      <div className="p-8 text-center text-text-secondary">
        No testimonials found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-white/5 bg-white/5">
            <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Client</th>
            <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Review</th>
            <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
            <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {testimonials.map((t) => (
            <tr key={t.id} className="hover:bg-white/[0.02] transition-colors">
              <td className="px-6 py-4">
                <div className="font-medium text-foreground text-sm">{t.client_name}</div>
                <div className="text-xs text-text-muted">{t.business_name}</div>
                <div className="flex gap-0.5 mt-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </td>
              <td className="px-6 py-4">
                <p className="text-sm text-text-secondary line-clamp-2 max-w-md">{t.review}</p>
                <div className="text-[10px] text-amber mt-1">{t.service_type}</div>
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() => togglePublish(t.id, t.is_published)}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-colors ${
                    t.is_published
                      ? 'bg-green-500/10 text-green-400 border-green-500/20'
                      : 'bg-white/5 text-text-muted border-white/10'
                  }`}
                >
                  {t.is_published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                  {t.is_published ? 'Published' : 'Draft'}
                </button>
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <Link
                    href={`/admin/testimonials/${t.id}`}
                    className="p-2 text-text-muted hover:text-amber transition-colors rounded-lg hover:bg-white/5"
                  >
                    <Edit className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(t.id)}
                    disabled={isDeleting === t.id}
                    className="p-2 text-text-muted hover:text-red-400 transition-colors rounded-lg hover:bg-white/5"
                  >
                    {isDeleting === t.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
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
