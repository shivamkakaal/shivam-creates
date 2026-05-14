'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Filter } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const CATEGORIES = [
  { key: 'all', label: 'All Projects' },
  { key: 'website', label: 'Websites' },
  { key: 'app', label: 'Apps' },
  { key: 'branding', label: 'Branding' },
  { key: 'video', label: 'Video Editing' },
  { key: 'marketing', label: 'Marketing' },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.95,
    transition: { duration: 0.3 },
  },
};

// Unique accent per category
const CATEGORY_COLORS: Record<string, { gradient: string; badge: string }> = {
  website: { gradient: 'from-electric-blue/20 via-purple/10 to-cyan/20', badge: 'text-electric-blue border-electric-blue/20' },
  app: { gradient: 'from-neon-green/20 via-cyan/10 to-electric-blue/20', badge: 'text-neon-green border-neon-green/20' },
  branding: { gradient: 'from-accent-pink/20 via-neon-orange/10 to-amber/20', badge: 'text-accent-pink border-accent-pink/20' },
  video: { gradient: 'from-purple/20 via-accent-pink/10 to-neon-purple/20', badge: 'text-purple border-purple/20' },
  marketing: { gradient: 'from-amber/20 via-gold/10 to-neon-orange/20', badge: 'text-amber border-amber/20' },
};

export default function PortfolioPage({ initialProjects }: { initialProjects: any[] }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered =
    activeCategory === 'all'
      ? initialProjects
      : initialProjects.filter((p) => p.category === activeCategory);

  return (
    <section className="section-padding relative pt-32 lg:pt-40">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -right-40 w-[500px] h-[500px] rounded-full bg-purple/8 blur-[140px]" />
        <div className="absolute bottom-40 -left-32 w-[400px] h-[400px] rounded-full bg-amber/6 blur-[120px]" />
      </div>

      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="caption mb-4 block">Our Work</span>
          <h1 className="heading-1 mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h1>
          <p className="body-large max-w-[600px] mx-auto">
            Real projects with real results — every pixel crafted to perfection, every line of code optimized for performance.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-12"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeCategory === cat.key
                  ? 'bg-gradient-to-r from-purple to-amber text-white shadow-[0_0_20px_rgba(168,85,247,0.2)]'
                  : 'bg-white/5 text-text-secondary border border-white/8 hover:border-amber/30 hover:text-foreground'
              }`}
            >
              {cat.key === 'all' && <Filter className="w-3.5 h-3.5 inline mr-1.5" />}
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Project Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {filtered.map((project, i) => {
              const colors = CATEGORY_COLORS[project.category] || CATEGORY_COLORS['websites'];
              return (
                <Link href={`/portfolio/${project.slug}`} key={project.id}>
                  <motion.div
                    variants={cardVariants}
                    custom={i}
                    transition={{ delay: i * 0.1 }}
                    className="group relative rounded-2xl overflow-hidden border border-white/5 bg-gradient-to-br from-white/[0.03] to-white/[0.01] hover:border-amber/20 transition-all duration-500 h-full"
                  >
                    <div className={`relative h-[240px] md:h-[300px] bg-gradient-to-br ${colors.gradient} overflow-hidden`}>
                      {project.thumbnail_url ? (
                        <Image src={project.thumbnail_url} alt={project.title} fill className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105" />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-7xl font-black text-white/10 group-hover:text-white/20 transition-all duration-500 group-hover:scale-110 transform">
                            {project.title[0]}
                          </span>
                        </div>
                      )}
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium text-white">
                        <ExternalLink className="w-4 h-4" />
                        View Project
                      </div>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm border text-xs font-medium capitalize ${colors.badge}`}>
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-6">
                    <h3 className="heading-3 text-foreground mb-2 group-hover:text-amber transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Client */}
                    {project.client_name && (
                      <p className="text-xs text-amber mb-3">Client: {project.client_name}</p>
                    )}

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                      {project.tech_stack && project.tech_stack.slice(0, 5).map((tech: string) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-md bg-white/5 border border-white/8 text-xs text-text-secondary font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Tags */}
                    {project.tags && project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {project.tags.map((tag: string) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded-full bg-purple/10 border border-purple/20 text-xs text-purple"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              </Link>
            );
          })}
          </motion.div>
        </AnimatePresence>

        {/* Empty state */}
        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-text-muted text-lg">No projects in this category yet.</p>
            <p className="text-sm text-text-muted mt-2">Check back soon — we&apos;re always creating!</p>
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <p className="text-text-secondary mb-4">Want something like this for your brand?</p>
          <a href="/contact" className="btn-primary text-base">
            <span>Start Your Project</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
