'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  Globe,
  Smartphone,
  Video,
  Palette,
  TrendingUp,
  PenTool,
  Sparkles,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  Globe, Smartphone, Video, Palette, TrendingUp, Figma: PenTool,
};

const SERVICE_COLORS: Record<string, { accent: string; bg: string; border: string }> = {
  'web-development': { accent: 'text-electric-blue', bg: 'bg-electric-blue/10', border: 'border-electric-blue/20' },
  'app-development': { accent: 'text-neon-green', bg: 'bg-neon-green/10', border: 'border-neon-green/20' },
  'video-editing': { accent: 'text-neon-orange', bg: 'bg-neon-orange/10', border: 'border-neon-orange/20' },
  'branding': { accent: 'text-accent-pink', bg: 'bg-accent-pink/10', border: 'border-accent-pink/20' },
  'digital-marketing': { accent: 'text-cyan', bg: 'bg-cyan/10', border: 'border-cyan/20' },
  'ui-ux-design': { accent: 'text-purple', bg: 'bg-purple/10', border: 'border-purple/20' },
};

// Removed static interfaces

// Removed FAQItem component

export default function ServiceDetailPage({
  service,
}: {
  service: any;
}) {
  const IconComponent = ICON_MAP[service.icon];
  const colors = SERVICE_COLORS[service.slug] || SERVICE_COLORS['ui-ux-design'];

  return (
    <section className="relative pt-32 lg:pt-40 pb-20">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-40 w-[500px] h-[500px] rounded-full bg-purple/8 blur-[140px]" />
        <div className="absolute bottom-40 -right-32 w-[400px] h-[400px] rounded-full bg-amber/6 blur-[120px]" />
      </div>

      <div className="relative max-w-[1024px] mx-auto px-6 lg:px-8">
        {/* Back */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Link href="/services" className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-amber transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            All Services
          </Link>
        </motion.div>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-16 h-16 rounded-2xl ${colors.bg} border ${colors.border} flex items-center justify-center`}>
              {IconComponent && <IconComponent className={`w-8 h-8 ${colors.accent}`} />}
            </div>
            <div>
              <h1 className="heading-1">{service.title}</h1>
              <p className={`text-sm font-medium ${colors.accent}`}>{service.tagline}</p>
            </div>
          </div>
          <p className="body-large max-w-[700px] mt-4">{service.description}</p>
        </motion.div>

        {/* Features removed since deliverables handles this in the new DB schema */}

        {/* Deliverables */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="heading-2 mb-8">
            <span className="gradient-text-amber">Deliverables</span>
          </h2>
          <div className="card">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {service.deliverables && service.deliverables.map((item: string) => (
                <div key={item} className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-neon-green flex-shrink-0" />
                  <span className="text-sm text-text-secondary">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Tech Used */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="heading-3 text-foreground mb-4">Technologies & Tools</h2>
          <div className="flex flex-wrap gap-3">
            {service.tech_used && service.tech_used.map((tech: string) => (
              <span key={tech} className="px-4 py-2 rounded-xl bg-white/5 border border-white/8 text-sm font-mono text-text-secondary">
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Pricing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="heading-2 mb-8">
            Pricing for <span className="gradient-text-amber">{service.title}</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {service.pricing_tiers && service.pricing_tiers.map((tier: any, i: number) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="card text-center flex flex-col h-full"
              >
                <h3 className="font-semibold text-foreground mb-2">{tier.name}</h3>
                <p className="text-2xl font-bold gradient-text-amber mb-1">₹{tier.price.toLocaleString()}</p>
                <div className="mt-auto pt-4">
                  <Link href="/contact" className="text-sm text-amber hover:text-amber/80 font-medium transition-colors">
                    Get Started →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQs removed since they are not part of the service schema */}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="heading-2 mb-4">
            Ready to Start Your <span className="gradient-text">{service.title}</span> Project?
          </h2>
          <p className="body-large max-w-[500px] mx-auto mb-8">
            Book a free discovery call and let&apos;s discuss your requirements.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact" className="btn-primary text-base">
              <span>Get a Quote</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/portfolio" className="btn-ghost text-base">
              <span>View Our Work</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
