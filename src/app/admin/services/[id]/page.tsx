import { createClient } from '@/lib/supabase/server';
import ServiceForm from '../../components/ServiceForm';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'Edit Service | Admin',
};

export default async function EditServicePage({ params }: { params: { id: string } }) {
  const supabase = await createClient();

  const { data: service, error } = await supabase
    .from('services')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error || !service) {
    notFound();
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Edit Service</h1>
        <p className="text-text-secondary">Update service details and pricing.</p>
      </div>
      
      <div className="card !p-6 lg:!p-8">
        <ServiceForm initialData={service} />
      </div>
    </div>
  );
}
