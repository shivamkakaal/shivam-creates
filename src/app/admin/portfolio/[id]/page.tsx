import { createClient } from '@/lib/supabase/server';
import ProjectForm from '../../components/ProjectForm';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'Edit Project | Admin',
};

export default async function EditProjectPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();

  const { data: project, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error || !project) {
    notFound();
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Edit Project</h1>
        <p className="text-text-secondary">Update case study details.</p>
      </div>
      
      <div className="card !p-6 lg:!p-8">
        <ProjectForm initialData={project} />
      </div>
    </div>
  );
}
