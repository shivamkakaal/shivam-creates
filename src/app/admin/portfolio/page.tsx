import { createClient } from '@/lib/supabase/server';
import PortfolioTable from './PortfolioTable';
import Link from 'next/link';
import { Plus } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function PortfolioPage() {
  const supabase = await createClient();

  const { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching projects:', error);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-1">Portfolio Manager</h1>
          <p className="text-text-secondary">Manage your case studies and featured projects.</p>
        </div>
        <Link href="/admin/portfolio/new" className="btn-primary text-sm !py-2.5 !px-4">
          <Plus className="w-4 h-4 mr-2" />
          <span>Add Project</span>
        </Link>
      </div>

      <div className="card !p-0 overflow-hidden border border-white/5 bg-white/[0.02]">
        <PortfolioTable initialProjects={projects || []} />
      </div>
    </div>
  );
}
