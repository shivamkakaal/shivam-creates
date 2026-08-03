'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';
import { Edit, Trash2, Eye, EyeOff, Globe } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

type Project = {
  id: string;
  title: string;
  slug: string;
  category: string;
  thumbnail_url: string | null;
  is_published: boolean;
  created_at: string;
  live_url: string | null;
};

export default function PortfolioTable({ initialProjects }: { initialProjects: Project[] }) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const supabase = createClient();

  const togglePublish = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('projects')
        .update({ is_published: !currentStatus })
        .eq('id', id);

      if (error) throw error;

      setProjects((prev) =>
        prev.map((p) => (p.id === id ? { ...p, is_published: !currentStatus } : p))
      );
      toast.success(`Project ${!currentStatus ? 'published' : 'unpublished'}`);
    } catch (error: any) {
      toast.error('Failed to update status');
      console.error(error);
    }
  };

  const deleteProject = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) return;
    
    setIsDeleting(id);
    try {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) throw error;
      
      setProjects((prev) => prev.filter((p) => p.id !== id));
      toast.success('Project deleted successfully');
    } catch (error: any) {
      toast.error('Failed to delete project');
      console.error(error);
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-white/5 bg-white/5">
            <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Project</th>
            <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Category</th>
            <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
            <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {projects.map((project) => (
            <tr key={project.id} className="hover:bg-white/[0.02] transition-colors group">
              <td className="px-6 py-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 overflow-hidden relative flex-shrink-0">
                    {project.thumbnail_url ? (
                      <Image src={project.thumbnail_url} alt={project.title} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-text-muted text-xs font-bold">
                        {project.title.substring(0, 2).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-foreground text-sm mb-1">{project.title}</div>
                    <div className="text-xs text-text-muted">/{project.slug}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="text-xs bg-white/5 px-2 py-1 rounded border border-white/10 text-text-secondary capitalize">
                  {project.category}
                </span>
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() => togglePublish(project.id, project.is_published)}
                  className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border transition-colors ${
                    project.is_published 
                      ? 'bg-green-500/10 text-green-400 border-green-500/20 hover:bg-green-500/20' 
                      : 'bg-white/5 text-text-muted border-white/10 hover:bg-white/10'
                  }`}
                >
                  {project.is_published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                  {project.is_published ? 'Published' : 'Draft'}
                </button>
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  {project.live_url && (
                    <a 
                      href={project.live_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 text-text-muted hover:text-blue-400 transition-colors rounded-lg hover:bg-white/5"
                      title="View Live Site"
                    >
                      <Globe className="w-4 h-4" />
                    </a>
                  )}
                  <Link 
                    href={`/admin/portfolio/${project.id}`}
                    className="p-2 text-text-muted hover:text-amber transition-colors rounded-lg hover:bg-white/5"
                    title="Edit Project"
                  >
                    <Edit className="w-4 h-4" />
                  </Link>
                  <button 
                    onClick={() => deleteProject(project.id)}
                    disabled={isDeleting === project.id}
                    className="p-2 text-text-muted hover:text-red-400 transition-colors rounded-lg hover:bg-white/5 disabled:opacity-50"
                    title="Delete Project"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {projects.length === 0 && (
            <tr>
              <td colSpan={4} className="px-6 py-12 text-center text-text-muted text-sm">
                No projects found. Add one to get started.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
