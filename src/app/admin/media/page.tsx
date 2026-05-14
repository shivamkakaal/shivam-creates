import MediaLibrary from '../components/MediaLibrary';

export default function MediaManagerPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Media Library</h1>
        <p className="text-text-secondary">Upload and manage your assets, images, and brand materials.</p>
      </div>

      <MediaLibrary />
    </div>
  );
}
