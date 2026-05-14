import { createClient } from '@/lib/supabase/server';
import AppointmentsTable from './AppointmentsTable';

export const dynamic = 'force-dynamic';

export default async function AppointmentsPage() {
  const supabase = await createClient();

  const { data: appointments, error } = await supabase
    .from('appointments')
    .select('*')
    .order('scheduled_at', { ascending: false });

  if (error) {
    console.error('Error fetching appointments:', error);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Appointments</h1>
        <p className="text-text-secondary">Manage your scheduled discovery calls and meetings.</p>
      </div>

      <div className="card !p-0 overflow-hidden border border-white/5 bg-white/[0.02]">
        <AppointmentsTable initialAppointments={appointments || []} />
      </div>
    </div>
  );
}
