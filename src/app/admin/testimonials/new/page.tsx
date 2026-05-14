import TestimonialForm from '../../components/TestimonialForm';

export default function NewTestimonialPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Add New Testimonial</h1>
        <p className="text-text-secondary">Capture a new client review.</p>
      </div>
      
      <div className="card !p-6 lg:!p-8">
        <TestimonialForm />
      </div>
    </div>
  );
}
