import { createClient } from '@/lib/supabase/server';
import ServicesTable from './ServicesTable';
import Link from 'next/link';
import { Plus } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function ServicesPage() {
  const supabase = await createClient();

  const { data: services, error } = await supabase
    .from('services')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching services:', error);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-1">Services Manager</h1>
          <p className="text-text-secondary">Manage the services you offer to clients.</p>
        </div>
        <Link href="/admin/services/new" className="btn-primary text-sm !py-2.5 !px-4">
          <Plus className="w-4 h-4 mr-2" />
          <span>Add Service</span>
        </Link>
      </div>

      <div className="card !p-0 overflow-hidden border border-white/5 bg-white/[0.02]">
        <ServicesTable initialServices={services || []} />
      </div>
    </div>
  );
}
