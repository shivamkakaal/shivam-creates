'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Globe,
  Smartphone,
  Video,
  Palette,
  TrendingUp,
  PenTool,
  ArrowRight,
  Check,
  Zap,
  Shield,
  Clock,
  HeadphonesIcon,
  Code,
  Megaphone,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  Globe, Smartphone, Video, Palette, TrendingUp, Figma: PenTool, Code, Megaphone,
};

const SERVICE_COLORS: Record<string, { accent: string; bg: string; border: string; glow: string }> = {
  'web-development': { accent: 'text-electric-blue', bg: 'bg-electric-blue/10', border: 'border-electric-blue/20', glow: 'shadow-[0_0_30px_rgba(59,130,246,0.1)]' },
  'app-development': { accent: 'text-neon-green', bg: 'bg-neon-green/10', border: 'border-neon-green/20', glow: 'shadow-[0_0_30px_rgba(34,197,94,0.1)]' },
  'video-editing': { accent: 'text-neon-orange', bg: 'bg-neon-orange/10', border: 'border-neon-orange/20', glow: 'shadow-[0_0_30px_rgba(251,146,60,0.1)]' },
  'branding': { accent: 'text-accent-pink', bg: 'bg-accent-pink/10', border: 'border-accent-pink/20', glow: 'shadow-[0_0_30px_rgba(236,72,153,0.1)]' },
  'digital-marketing': { accent: 'text-cyan', bg: 'bg-cyan/10', border: 'border-cyan/20', glow: 'shadow-[0_0_30px_rgba(6,182,212,0.1)]' },
  'ui-ux-design': { accent: 'text-purple', bg: 'bg-purple/10', border: 'border-purple/20', glow: 'shadow-[0_0_30px_rgba(168,85,247,0.1)]' },
};

// Removed static features data

const WHY_CHOOSE = [
  { icon: Zap, title: 'Lightning Fast', desc: 'Quick turnaround without compromising quality' },
  { icon: Shield, title: '100% Satisfaction', desc: 'We work until you are absolutely delighted' },
  { icon: Clock, title: 'On-Time Delivery', desc: 'We respect deadlines — always on schedule' },
  { icon: HeadphonesIcon, title: 'Lifetime Support', desc: 'Post-launch support and maintenance included' },
];

export default function ServicesPage({ initialServices }: { initialServices: any[] }) {
  return (
    <section className="section-padding relative pt-32 lg:pt-40">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-32 -left-40 w-[500px] h-[500px] rounded-full bg-purple/8 blur-[140px]" />
        <div className="absolute bottom-60 -right-32 w-[450px] h-[450px] rounded-full bg-amber/6 blur-[130px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full bg-electric-blue/5 blur-[100px]" />
      </div>

      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="caption mb-4 block">Our Services</span>
          <h1 className="heading-1 mb-4">
            Everything You Need to{' '}
            <span className="gradient-text">Dominate Digital</span>
          </h1>
          <p className="body-large max-w-[650px] mx-auto">
            From concept to launch and beyond — we deliver premium digital solutions that help brands stand out, grow faster, and convert more.
          </p>
        </motion.div>

        {/* Services Detail Cards */}
        <div className="space-y-8 mb-24">
          {initialServices.map((service, i) => {
            const IconComponent = ICON_MAP[service.icon] || Globe;
            const colors = SERVICE_COLORS[service.slug] || SERVICE_COLORS['ui-ux-design'];
            const features = service.deliverables || [];
            
            // Find lowest price tier
            const lowestPrice = service.pricing_tiers && service.pricing_tiers.length > 0 
              ? Math.min(...service.pricing_tiers.map((t: any) => t.price))
              : null;

            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className={`card group hover:${colors.glow} relative overflow-hidden`}
              >
                {/* Accent line at top */}
                <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent ${colors.accent.replace('text-', 'via-')}/30 to-transparent`} />

                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Left — Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-5">
                      <div className={`w-14 h-14 rounded-2xl ${colors.bg} border ${colors.border} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        {IconComponent && <IconComponent className={`w-7 h-7 ${colors.accent}`} />}
                      </div>
                      <div>
                        <h2 className="heading-3 text-foreground">{service.title}</h2>
                        {lowestPrice && (
                          <p className="text-sm gradient-text-amber font-semibold">Starting at ₹{lowestPrice.toLocaleString()}</p>
                        )}
                      </div>
                    </div>
                    <p className="body-regular leading-relaxed mb-6 max-w-[500px]">
                      {service.description}
                    </p>
                    <Link
                      href="/contact"
                      className={`inline-flex items-center gap-2 text-sm font-semibold ${colors.accent} hover:gap-3 transition-all duration-300`}
                    >
                      Get a Quote <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                  {/* Right — Features */}
                  <div className="lg:w-[340px] flex-shrink-0">
                    <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-4">What&apos;s Included</h4>
                    <div className="grid grid-cols-2 gap-2.5">
                      {features.map((f: string) => (
                        <div key={f} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-neon-green flex-shrink-0" />
                          <span className="text-sm text-text-secondary">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Why Choose Us */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="heading-2 text-center mb-12">
            Why Choose <span className="gradient-text-amber">Shivam Creates?</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {WHY_CHOOSE.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-amber/10 border border-amber/20 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-amber" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                <p className="text-sm text-text-secondary">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="heading-2 mb-4">
            Ready to <span className="gradient-text">Get Started?</span>
          </h2>
          <p className="body-large max-w-[500px] mx-auto mb-8">
            Book a free discovery call and let&apos;s discuss your project.
          </p>
          <Link href="/contact" className="btn-primary text-base">
            <span>Book Free Call</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
