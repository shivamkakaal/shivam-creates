'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function PortfolioPreview({ initialProjects }: { initialProjects: any[] }) {
  return (
    <section className="section-padding relative">
      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="caption mb-4 block">Our Work</span>
          <h2 className="heading-1 mb-4">
            Featured{' '}
            <span className="gradient-text">Projects</span>
          </h2>
          <p className="body-large max-w-[600px] mx-auto">
            Real projects with real results — every pixel crafted to perfection.
          </p>
        </motion.div>

        {/* Project Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {initialProjects.slice(0, 4).map((project) => (
            <Link href={`/portfolio/${project.slug}`} key={project.id}>
              <motion.div
                variants={cardVariants}
                className="group relative rounded-2xl overflow-hidden border border-white/5 bg-gradient-to-br from-white/[0.03] to-white/[0.01] hover:border-purple/20 transition-all duration-500 h-full"
              >
                {/* Thumbnail Area */}
                <div className="relative h-[240px] md:h-[280px] bg-gradient-to-br from-purple/10 via-electric-blue/5 to-accent-pink/10 overflow-hidden">
                  {project.thumbnail_url ? (
                    <Image src={project.thumbnail_url} alt={project.title} fill className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-6xl font-black text-white/10 group-hover:text-white/20 transition-colors duration-500 group-hover:scale-110 transform">
                        {project.title[0]}
                      </span>
                    </div>
                  )}

                  {/* Animated gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple/20 via-transparent to-electric-blue/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium text-white">
                      <ExternalLink className="w-4 h-4" />
                      View Project
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 text-xs font-medium text-white capitalize">
                      {project.category}
                    </span>
                  </div>
                </div>

              {/* Info */}
              <div className="p-6">
                <h3 className="heading-3 text-foreground mb-2 group-hover:text-purple transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech_stack && project.tech_stack.slice(0, 4).map((tech: string) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md bg-white/5 border border-white/8 text-xs text-text-secondary font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
        </motion.div>

        {/* See All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <a href="/portfolio" className="btn-ghost">
            <span>See Full Portfolio</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
