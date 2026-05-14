'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';
import { MoreHorizontal, Mail, Phone, ExternalLink } from 'lucide-react';

type Lead = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  project_type: string;
  budget_range: string;
  message: string;
  status: string;
  source: string;
  created_at: string;
};

export default function LeadsTable({ initialLeads }: { initialLeads: Lead[] }) {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const supabase = createClient();

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('leads')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;

      setLeads((prev) =>
        prev.map((lead) => (lead.id === id ? { ...lead, status: newStatus } : lead))
      );
      toast.success('Status updated');
    } catch (error: any) {
      toast.error('Failed to update status');
      console.error(error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'contacted': return 'bg-amber/10 text-amber border-amber/20';
      case 'in_progress': return 'bg-purple/10 text-purple border-purple/20';
      case 'won': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'lost': return 'bg-red-500/10 text-red-400 border-red-500/20';
      default: return 'bg-white/5 text-text-muted border-white/10';
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-white/5 bg-white/5">
            <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Contact</th>
            <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Project Details</th>
            <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Source</th>
            <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
            <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {leads.map((lead) => (
            <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors group">
              <td className="px-6 py-4">
                <div className="font-medium text-foreground text-sm mb-1">{lead.full_name}</div>
                <div className="flex flex-col gap-1 text-xs text-text-muted">
                  <span className="flex items-center gap-1.5"><Mail className="w-3 h-3" /> {lead.email}</span>
                  {lead.phone && <span className="flex items-center gap-1.5"><Phone className="w-3 h-3" /> {lead.phone}</span>}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-foreground mb-1">{lead.project_type || 'N/A'}</div>
                <div className="text-xs text-amber">{lead.budget_range || 'No budget specified'}</div>
              </td>
              <td className="px-6 py-4">
                <span className="text-xs bg-white/5 px-2 py-1 rounded border border-white/10 text-text-secondary">
                  {lead.source === 'project_form' ? 'Project Brief' : lead.source === 'booking' ? 'Booking' : 'Contact Form'}
                </span>
                <div className="text-[10px] text-text-muted mt-2">
                  {new Date(lead.created_at).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
              </td>
              <td className="px-6 py-4">
                <select
                  value={lead.status}
                  onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                  className={`text-xs px-3 py-1.5 rounded-full border outline-none cursor-pointer appearance-none ${getStatusColor(lead.status)}`}
                >
                  <option value="new" className="bg-[#0a0f1e] text-white">New</option>
                  <option value="contacted" className="bg-[#0a0f1e] text-white">Contacted</option>
                  <option value="in_progress" className="bg-[#0a0f1e] text-white">In Progress</option>
                  <option value="won" className="bg-[#0a0f1e] text-white">Won</option>
                  <option value="lost" className="bg-[#0a0f1e] text-white">Lost</option>
                </select>
              </td>
              <td className="px-6 py-4 text-right">
                <button 
                  className="p-2 text-text-muted hover:text-foreground transition-colors rounded-lg hover:bg-white/5"
                  onClick={() => alert(`Message:\n${lead.message}`)}
                  title="View Message"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
          {leads.length === 0 && (
            <tr>
              <td colSpan={5} className="px-6 py-12 text-center text-text-muted text-sm">
                No leads found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
