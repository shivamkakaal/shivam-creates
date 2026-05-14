import { createClient } from '@/lib/supabase/server';
import TestimonialForm from '../../components/TestimonialForm';
import { notFound } from 'next/navigation';

export default async function EditTestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: testimonial } = await supabase
    .from('testimonials')
    .select('*')
    .eq('id', id)
    .single();

  if (!testimonial) {
    notFound();
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Edit Testimonial</h1>
        <p className="text-text-secondary">Update client review details.</p>
      </div>
      
      <div className="card !p-6 lg:!p-8">
        <TestimonialForm initialData={testimonial} />
      </div>
    </div>
  );
}
