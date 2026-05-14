import { createClient } from '@/lib/supabase/server';
import LeadsTable from './LeadsTable';

export const dynamic = 'force-dynamic';

export default async function LeadsPage() {
  const supabase = await createClient();

  const { data: leads, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching leads:', error);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Leads & Inquiries</h1>
        <p className="text-text-secondary">Manage your project inquiries and contact messages.</p>
      </div>

      <div className="card !p-0 overflow-hidden border border-white/5 bg-white/[0.02]">
        <LeadsTable initialLeads={leads || []} />
      </div>
    </div>
  );
}
