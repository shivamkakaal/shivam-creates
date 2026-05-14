import SettingsForm from '../components/SettingsForm';

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Site Settings</h1>
        <p className="text-text-secondary">Configure your agency's contact information and social presence.</p>
      </div>

      <div className="card !p-6 lg:!p-10">
        <SettingsForm />
      </div>
    </div>
  );
}
