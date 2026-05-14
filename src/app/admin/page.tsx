import { createClient } from '@/lib/supabase/server';
import { Users, Calendar, Briefcase, TrendingUp, FileText, Settings } from 'lucide-react';
import Link from 'next/link';

export default async function AdminDashboard() {
  const supabase = await createClient();

  // Fetch quick stats
  const [
    { count: leadsCount },
    { count: appointmentsCount },
    { count: projectsCount }
  ] = await Promise.all([
    supabase.from('leads').select('*', { count: 'exact', head: true }),
    supabase.from('appointments').select('*', { count: 'exact', head: true }),
    supabase.from('projects').select('*', { count: 'exact', head: true })
  ]);

  const stats = [
    { label: 'Total Leads', value: leadsCount || 0, icon: Users, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { label: 'Appointments', value: appointmentsCount || 0, icon: Calendar, color: 'text-amber', bg: 'bg-amber/10' },
    { label: 'Portfolio Projects', value: projectsCount || 0, icon: Briefcase, color: 'text-purple', bg: 'bg-purple/10' },
    { label: 'Conversion Rate', value: '12%', icon: TrendingUp, color: 'text-neon-green', bg: 'bg-neon-green/10' },
  ];

  // Fetch recent leads
  const { data: recentLeads } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Dashboard Overview</h1>
        <p className="text-text-secondary">Welcome back to your command center.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="card !p-6 flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg}`}>
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-text-muted">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card !p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-foreground">Recent Leads</h2>
          </div>
          <div className="space-y-4">
            {recentLeads?.length ? (
              recentLeads.map((lead) => (
                <div key={lead.id} className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                  <div>
                    <p className="font-medium text-foreground text-sm">{lead.full_name}</p>
                    <p className="text-xs text-text-muted">{lead.project_type}</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded-full font-medium ${
                      lead.status === 'new' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                      lead.status === 'contacted' ? 'bg-amber/10 text-amber border border-amber/20' :
                      'bg-white/5 text-text-muted border border-white/10'
                    }`}>
                      {lead.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-text-muted">No leads found.</p>
            )}
          </div>
        </div>

        <div className="card !p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-foreground">Quick Actions</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
             <Link href="/admin/portfolio/new" className="p-4 rounded-xl border border-white/5 hover:border-amber/30 transition-colors cursor-pointer group text-center bg-white/[0.02]">
               <Briefcase className="w-6 h-6 mx-auto mb-2 text-text-muted group-hover:text-amber transition-colors" />
               <p className="text-xs font-medium text-text-secondary group-hover:text-foreground">Add Project</p>
             </Link>
             <Link href="/admin/leads" className="p-4 rounded-xl border border-white/5 hover:border-amber/30 transition-colors cursor-pointer group text-center bg-white/[0.02]">
               <Users className="w-6 h-6 mx-auto mb-2 text-text-muted group-hover:text-amber transition-colors" />
               <p className="text-xs font-medium text-text-secondary group-hover:text-foreground">View Leads</p>
             </Link>
             <Link href="/admin/blog/new" className="p-4 rounded-xl border border-white/5 hover:border-amber/30 transition-colors cursor-pointer group text-center bg-white/[0.02]">
               <FileText className="w-6 h-6 mx-auto mb-2 text-text-muted group-hover:text-amber transition-colors" />
               <p className="text-xs font-medium text-text-secondary group-hover:text-foreground">Write Blog</p>
             </Link>
             <Link href="/admin/settings" className="p-4 rounded-xl border border-white/5 hover:border-amber/30 transition-colors cursor-pointer group text-center bg-white/[0.02]">
               <Settings className="w-6 h-6 mx-auto mb-2 text-text-muted group-hover:text-amber transition-colors" />
               <p className="text-xs font-medium text-text-secondary group-hover:text-foreground">Settings</p>
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
