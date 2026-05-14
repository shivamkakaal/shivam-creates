'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';
import { Calendar, Clock, Video, Mail, Phone, Info } from 'lucide-react';

type Appointment = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  service_type: string;
  scheduled_at: string;
  duration_minutes: number;
  status: string;
  meeting_link: string | null;
  admin_notes: string;
};

export default function AppointmentsTable({ initialAppointments }: { initialAppointments: Appointment[] }) {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const supabase = createClient();

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('appointments')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;

      setAppointments((prev) =>
        prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
      );
      toast.success('Appointment status updated');
    } catch (error: any) {
      toast.error('Failed to update status');
      console.error(error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-amber/10 text-amber border-amber/20';
      case 'completed': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'cancelled': return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'no_show': return 'bg-purple/10 text-purple border-purple/20';
      default: return 'bg-white/5 text-text-muted border-white/10';
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-white/5 bg-white/5">
            <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Client</th>
            <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Schedule</th>
            <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Service</th>
            <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
            <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider text-right">Notes</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {appointments.map((app) => {
            const date = new Date(app.scheduled_at);
            const formattedDate = date.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' });
            const formattedTime = date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

            return (
              <tr key={app.id} className="hover:bg-white/[0.02] transition-colors group">
                <td className="px-6 py-4">
                  <div className="font-medium text-foreground text-sm mb-1">{app.full_name}</div>
                  <div className="flex flex-col gap-1 text-xs text-text-muted">
                    <span className="flex items-center gap-1.5"><Mail className="w-3 h-3" /> {app.email}</span>
                    {app.phone && <span className="flex items-center gap-1.5"><Phone className="w-3 h-3" /> {app.phone}</span>}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm text-foreground mb-1">
                    <Calendar className="w-3.5 h-3.5 text-amber" />
                    <span>{formattedDate}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-text-muted">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{formattedTime} ({app.duration_minutes}m)</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-foreground">{app.service_type || 'General'}</div>
                  {app.meeting_link && (
                    <a href={app.meeting_link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-blue-400 mt-2 hover:underline">
                      <Video className="w-3 h-3" /> Join Meeting
                    </a>
                  )}
                </td>
                <td className="px-6 py-4">
                  <select
                    value={app.status}
                    onChange={(e) => handleStatusChange(app.id, e.target.value)}
                    className={`text-xs px-3 py-1.5 rounded-full border outline-none cursor-pointer appearance-none ${getStatusColor(app.status)}`}
                  >
                    <option value="confirmed" className="bg-[#0a0f1e] text-white">Confirmed</option>
                    <option value="completed" className="bg-[#0a0f1e] text-white">Completed</option>
                    <option value="cancelled" className="bg-[#0a0f1e] text-white">Cancelled</option>
                    <option value="no_show" className="bg-[#0a0f1e] text-white">No Show</option>
                  </select>
                </td>
                <td className="px-6 py-4 text-right">
                  {app.admin_notes ? (
                    <button 
                      className="p-2 text-text-muted hover:text-amber transition-colors rounded-lg hover:bg-amber/5"
                      onClick={() => alert(`Notes:\n${app.admin_notes}`)}
                      title="View Notes"
                    >
                      <Info className="w-4 h-4" />
                    </button>
                  ) : (
                    <span className="text-xs text-text-muted">-</span>
                  )}
                </td>
              </tr>
            );
          })}
          {appointments.length === 0 && (
            <tr>
              <td colSpan={5} className="px-6 py-12 text-center text-text-muted text-sm">
                No appointments found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
