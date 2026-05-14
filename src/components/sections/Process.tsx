'use client';

import { motion } from 'framer-motion';
import {
  Search,
  FileText,
  Paintbrush,
  Code,
  Rocket,
} from 'lucide-react';
import { PROCESS_STEPS } from '@/lib/constants';

const ICON_MAP: Record<string, React.ElementType> = {
  Search,
  FileText,
  Paintbrush,
  Code,
  Rocket,
};

export default function Process() {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-electric-blue/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="caption mb-4 block">How We Work</span>
          <h2 className="heading-1 mb-4">
            Our{' '}
            <span className="gradient-text">Process</span>
          </h2>
          <p className="body-large max-w-[600px] mx-auto">
            From idea to launch in 5 simple steps — transparent, organized, and stress-free.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-[800px] mx-auto">
          {/* Vertical line */}
          <div className="absolute left-6 lg:left-1/2 lg:-translate-x-px top-0 bottom-0 w-[2px] bg-gradient-to-b from-amber/50 via-purple/30 to-electric-blue/50" />

          {PROCESS_STEPS.map((step, i) => {
            const IconComponent = ICON_MAP[step.icon];
            const isLeft = i % 2 === 0;

            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className={`relative flex items-start gap-6 mb-12 last:mb-0 ${
                  isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-6 lg:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-amber border-4 border-[#050816] z-10 mt-1.5 shadow-[0_0_20px_rgba(245,158,11,0.4)]" />

                {/* Content Card */}
                <div
                  className={`ml-16 lg:ml-0 lg:w-[calc(50%-40px)] card ${
                    isLeft ? 'lg:mr-auto lg:text-right' : 'lg:ml-auto'
                  }`}
                >
                  {/* Step number */}
                  <div className={`flex items-center gap-3 mb-3 ${isLeft ? 'lg:justify-end' : ''}`}>
                    <div className="w-10 h-10 rounded-xl bg-amber/10 border border-amber/20 flex items-center justify-center">
                      {IconComponent && <IconComponent className="w-5 h-5 text-amber" />}
                    </div>
                    <span className="text-xs font-bold text-amber uppercase tracking-wider">
                      Step {step.step}
                    </span>
                  </div>

                  <h3 className="heading-3 text-foreground mb-2">{step.title}</h3>
                  <p className="body-regular text-sm">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
