'use client';

import { motion } from 'framer-motion';
import {
  Globe,
  Smartphone,
  Video,
  Palette,
  TrendingUp,
  PenTool,
  Code,
  Megaphone,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  Globe,
  Smartphone,
  Video,
  Palette,
  TrendingUp,
  Figma: PenTool,
  Code,
  Megaphone,
};

// Each service gets a unique color accent — matches the poster's vibrant multi-color cards
const SERVICE_COLORS: Record<string, { iconBg: string; iconBorder: string; iconText: string; hoverGlow: string }> = {
  'web-development': {
    iconBg: 'bg-electric-blue/10',
    iconBorder: 'border-electric-blue/20',
    iconText: 'text-electric-blue',
    hoverGlow: 'group-hover:border-electric-blue/30 group-hover:shadow-[0_8px_40px_rgba(59,130,246,0.12)]',
  },
  'app-development': {
    iconBg: 'bg-neon-green/10',
    iconBorder: 'border-neon-green/20',
    iconText: 'text-neon-green',
    hoverGlow: 'group-hover:border-neon-green/30 group-hover:shadow-[0_8px_40px_rgba(34,197,94,0.12)]',
  },
  'video-editing': {
    iconBg: 'bg-neon-orange/10',
    iconBorder: 'border-neon-orange/20',
    iconText: 'text-neon-orange',
    hoverGlow: 'group-hover:border-neon-orange/30 group-hover:shadow-[0_8px_40px_rgba(251,146,60,0.12)]',
  },
  'branding': {
    iconBg: 'bg-accent-pink/10',
    iconBorder: 'border-accent-pink/20',
    iconText: 'text-accent-pink',
    hoverGlow: 'group-hover:border-accent-pink/30 group-hover:shadow-[0_8px_40px_rgba(236,72,153,0.12)]',
  },
  'digital-marketing': {
    iconBg: 'bg-cyan/10',
    iconBorder: 'border-cyan/20',
    iconText: 'text-cyan',
    hoverGlow: 'group-hover:border-cyan/30 group-hover:shadow-[0_8px_40px_rgba(6,182,212,0.12)]',
  },
  'ui-ux-design': {
    iconBg: 'bg-purple/10',
    iconBorder: 'border-purple/20',
    iconText: 'text-purple',
    hoverGlow: 'group-hover:border-purple/30 group-hover:shadow-[0_8px_40px_rgba(168,85,247,0.12)]',
  },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Services({ initialServices }: { initialServices: any[] }) {
  return (
    <section className="section-padding relative">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="caption mb-4 block">What We Do</span>
          <h2 className="heading-1 mb-4">
            Services That{' '}
            <span className="gradient-text">Deliver Results</span>
          </h2>
          <p className="body-large max-w-[600px] mx-auto">
            Everything you need to dominate the digital world — from concept to launch and beyond.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {initialServices.slice(0, 6).map((service, i) => {
            const IconComponent = ICON_MAP[service.icon] || Globe;
            const colors = SERVICE_COLORS[service.slug] || SERVICE_COLORS['ui-ux-design'];
            return (
              <motion.div
                key={service.slug}
                variants={cardVariants}
                className={`card group cursor-pointer transition-all duration-400 ${colors.hoverGlow} ${
                  i === 0 ? 'md:col-span-2 lg:col-span-1' : ''
                } relative`}
              >
                {/* Invisible link overlay */}
                <a href={`/services/${service.slug}`} className="absolute inset-0 z-10">
                  <span className="sr-only">View {service.title} service</span>
                </a>

                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl ${colors.iconBg} border ${colors.iconBorder} flex items-center justify-center mb-5 group-hover:scale-110 transition-all duration-300`}>
                  {IconComponent && (
                    <IconComponent className={`w-6 h-6 ${colors.iconText}`} />
                  )}
                </div>

                {/* Content */}
                <h3 className="heading-3 text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="body-regular text-sm leading-relaxed">
                  {service.description}
                </p>

                {/* Hover Arrow */}
                <div className={`mt-5 flex items-center gap-2 ${colors.iconText} text-sm font-medium opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300`}>
                  Learn more →
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
