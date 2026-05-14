'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';
import { Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import * as LucideIcons from 'lucide-react';

type Service = {
  id: string;
  title: string;
  slug: string;
  icon: string | null;
  is_published: boolean;
  sort_order: number;
};

export default function ServicesTable({ initialServices }: { initialServices: Service[] }) {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const supabase = createClient();

  const togglePublish = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('services')
        .update({ is_published: !currentStatus })
        .eq('id', id);

      if (error) throw error;

      setServices((prev) =>
        prev.map((s) => (s.id === id ? { ...s, is_published: !currentStatus } : s))
      );
      toast.success(`Service ${!currentStatus ? 'published' : 'unpublished'}`);
    } catch (error: any) {
      toast.error('Failed to update status');
      console.error(error);
    }
  };

  const deleteService = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;
    
    setIsDeleting(id);
    try {
      const { error } = await supabase.from('services').delete().eq('id', id);
      if (error) throw error;
      
      setServices((prev) => prev.filter((s) => s.id !== id));
      toast.success('Service deleted successfully');
    } catch (error: any) {
      toast.error('Failed to delete service');
      console.error(error);
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-white/5 bg-white/5">
            <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Service</th>
            <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
            <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Order</th>
            <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {services.map((service) => {
            // Dynamically get icon
            const Icon = service.icon && (LucideIcons as any)[service.icon] 
              ? (LucideIcons as any)[service.icon] 
              : LucideIcons.FileText;

            return (
              <tr key={service.id} className="hover:bg-white/[0.02] transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-amber/10 border border-amber/20 flex items-center justify-center flex-shrink-0 text-amber">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground text-sm mb-1">{service.title}</div>
                      <div className="text-xs text-text-muted">/{service.slug}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => togglePublish(service.id, service.is_published)}
                    className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border transition-colors ${
                      service.is_published 
                        ? 'bg-green-500/10 text-green-400 border-green-500/20 hover:bg-green-500/20' 
                        : 'bg-white/5 text-text-muted border-white/10 hover:bg-white/10'
                    }`}
                  >
                    {service.is_published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                    {service.is_published ? 'Published' : 'Draft'}
                  </button>
                </td>
                <td className="px-6 py-4 text-sm text-text-secondary">
                  {service.sort_order}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                    <Link 
                      href={`/admin/services/${service.id}`}
                      className="p-2 text-text-muted hover:text-amber transition-colors rounded-lg hover:bg-white/5"
                      title="Edit Service"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>
                    <button 
                      onClick={() => deleteService(service.id)}
                      disabled={isDeleting === service.id}
                      className="p-2 text-text-muted hover:text-red-400 transition-colors rounded-lg hover:bg-white/5 disabled:opacity-50"
                      title="Delete Service"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
          {services.length === 0 && (
            <tr>
              <td colSpan={4} className="px-6 py-12 text-center text-text-muted text-sm">
                No services found. Add one to get started.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
