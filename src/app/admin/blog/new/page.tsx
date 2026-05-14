import BlogForm from '../../components/BlogForm';

export const metadata = {
  title: 'Add New Blog Post | Admin',
};

export default function NewBlogPostPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Add New Blog Post</h1>
        <p className="text-text-secondary">Create a new article for your blog.</p>
      </div>
      
      <div className="card !p-6 lg:!p-8">
        <BlogForm />
      </div>
    </div>
  );
}
