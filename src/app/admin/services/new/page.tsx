import ServiceForm from '../../components/ServiceForm';

export const metadata = {
  title: 'Add New Service | Admin',
};

export default function NewServicePage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Add New Service</h1>
        <p className="text-text-secondary">Create a new service offering.</p>
      </div>
      
      <div className="card !p-6 lg:!p-8">
        <ServiceForm />
      </div>
    </div>
  );
}
