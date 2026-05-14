'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Clock,
  User,
  Tag,
  Quote,
  TrendingUp,
} from 'lucide-react';

interface ProjectData {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  clientName: string;
  techStack: string[];
  tags: string[];
  thumbnailUrl: string;
  isFeatured: boolean;
  challenge?: string;
  solution?: string;
  results?: Record<string, string>;
  timeline?: string;
  testimonial?: string;
}

const CATEGORY_COLORS: Record<string, { gradient: string; accent: string }> = {
  websites: { gradient: 'from-electric-blue/20 via-purple/10 to-cyan/20', accent: 'text-electric-blue' },
  apps: { gradient: 'from-neon-green/20 via-cyan/10 to-electric-blue/20', accent: 'text-neon-green' },
  branding: { gradient: 'from-accent-pink/20 via-neon-orange/10 to-amber/20', accent: 'text-accent-pink' },
};

export default function ProjectDetailPage({ project, allProjects }: { project: any; allProjects: any[] }) {
  const colors = CATEGORY_COLORS[project.category] || CATEGORY_COLORS['websites'];
  const currentIndex = allProjects.findIndex((p) => p.slug === project.slug);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  return (
    <section className="relative pt-32 lg:pt-40 pb-20">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -right-40 w-[500px] h-[500px] rounded-full bg-purple/8 blur-[140px]" />
        <div className="absolute bottom-40 -left-32 w-[400px] h-[400px] rounded-full bg-amber/6 blur-[120px]" />
      </div>

      <div className="relative max-w-[1024px] mx-auto px-6 lg:px-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-amber transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </Link>
        </motion.div>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Category + Tags */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className={`px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium capitalize ${colors.accent}`}>
              {project.category}
            </span>
            {project.tags && project.tags.map((tag: string) => (
              <span key={tag} className="px-2 py-0.5 rounded-full bg-purple/10 border border-purple/20 text-xs text-purple">
                {tag}
              </span>
            ))}
          </div>

          <h1 className="heading-1 mb-4">{project.title}</h1>
          <p className="body-large max-w-[700px] mb-6">{project.description}</p>

          {/* Meta Bar */}
          <div className="flex flex-wrap gap-6 text-sm text-text-secondary mb-10">
            {project.client_name && (
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-amber" />
                <span>{project.client_name}</span>
              </div>
            )}
            {project.timeline && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber" />
                <span>{project.timeline}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-amber" />
              <span className="capitalize">{project.category}</span>
            </div>
          </div>
        </motion.div>

        {/* Hero Image Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`relative h-[300px] md:h-[450px] rounded-2xl bg-gradient-to-br ${colors.gradient} mb-16 flex items-center justify-center overflow-hidden border border-white/5`}
        >
          <span className="text-[120px] md:text-[200px] font-black text-white/8 select-none">
            {project.title[0]}
          </span>
          <div className="absolute inset-0 bg-gradient-to-t from-[#050816]/60 to-transparent" />
        </motion.div>

        {/* Challenge & Solution */}
        {(project.challenge || project.solution) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {project.challenge && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="card"
              >
                <h2 className="heading-3 text-foreground mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-accent-pink/10 flex items-center justify-center">
                    <span className="text-accent-pink text-sm font-bold">!</span>
                  </span>
                  The Challenge
                </h2>
                <p className="body-regular">{project.challenge}</p>
              </motion.div>
            )}

            {project.solution && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="card"
              >
                <h2 className="heading-3 text-foreground mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-neon-green/10 flex items-center justify-center">
                    <span className="text-neon-green text-sm font-bold">✓</span>
                  </span>
                  Our Solution
                </h2>
                <p className="body-regular">{project.solution}</p>
              </motion.div>
            )}
          </div>
        )}

        {/* Results */}
        {project.results && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <h2 className="heading-2 text-center mb-8">
              <TrendingUp className="w-6 h-6 inline mr-2 text-amber" />
              Results <span className="gradient-text-amber">Achieved</span>
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(project.results).map(([key, value], i) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="card text-center"
                >
                  <p className="text-2xl font-bold gradient-text-amber mb-1">{value as React.ReactNode}</p>
                  <p className="text-xs text-text-secondary">{key}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Tech Stack */}
        {project.tech_stack && project.tech_stack.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <h2 className="heading-3 text-foreground mb-4">Tech Stack</h2>
            <div className="flex flex-wrap gap-3">
              {project.tech_stack.map((tech: string) => (
                <span
                  key={tech}
                  className="px-4 py-2 rounded-xl bg-white/5 border border-white/8 text-sm font-mono text-text-secondary hover:border-amber/30 hover:text-foreground transition-all duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Client Testimonial */}
        {project.testimonial && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="card !border-amber/20 mb-16"
          >
            <Quote className="w-8 h-8 text-amber/30 mb-4" />
            <p className="text-lg text-foreground italic leading-relaxed mb-4">
              &ldquo;{project.testimonial}&rdquo;
            </p>
            {project.client_name && (
              <p className="text-sm text-amber font-medium">— {project.client_name}</p>
            )}
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h3 className="heading-3 mb-3">Want a project like this?</h3>
          <p className="text-text-secondary mb-6">Let&apos;s build something extraordinary together.</p>
          <Link href="/contact" className="btn-primary text-base">
            <span>Start Your Project</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-white/5">
          {prevProject ? (
            <Link
              href={`/portfolio/${prevProject.slug}`}
              className="flex items-center gap-2 text-sm text-text-secondary hover:text-amber transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="hidden sm:inline">{prevProject.title}</span>
              <span className="sm:hidden">Previous</span>
            </Link>
          ) : (
            <div />
          )}
          {nextProject ? (
            <Link
              href={`/portfolio/${nextProject.slug}`}
              className="flex items-center gap-2 text-sm text-text-secondary hover:text-amber transition-colors group"
            >
              <span className="hidden sm:inline">{nextProject.title}</span>
              <span className="sm:hidden">Next</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </section>
  );
}
