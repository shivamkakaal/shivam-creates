import ProjectForm from '../../components/ProjectForm';

export const metadata = {
  title: 'Add New Project | Admin',
};

export default function NewProjectPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Add New Project</h1>
        <p className="text-text-secondary">Create a new case study for your portfolio.</p>
      </div>
      
      <div className="card !p-6 lg:!p-8">
        <ProjectForm />
      </div>
    </div>
  );
}
