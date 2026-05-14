'use client';

import { motion } from 'framer-motion';
import { Check, Star, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
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

export default function Pricing({ initialServices }: { initialServices?: any[] }) {
  return (
    <section className="section-padding relative">
      {/* Background */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent-pink/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="caption mb-4 block">Pricing</span>
          <h2 className="heading-1 mb-4">
            Transparent{' '}
            <span className="gradient-text">Pricing</span>
          </h2>
          <p className="body-large max-w-[600px] mx-auto">
            Premium quality at accessible prices. No hidden fees, no surprises.
          </p>
        </motion.div>

        {/* Pricing Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          {initialServices && initialServices.slice(0, 4).map((service, index) => {
            // Check if service has pricing
            if (!service.pricing_tiers || service.pricing_tiers.length === 0) return null;
            
            // Get lowest tier for starting price
            const lowestTier = service.pricing_tiers.reduce((prev: any, curr: any) => 
              prev.price < curr.price ? prev : curr
            , service.pricing_tiers[0]);
            
            // Mark the first item as popular for visual interest
            const popular = index === 0;

            return (
              <motion.div
                key={service.slug}
                variants={cardVariants}
                className={`relative card group flex flex-col h-full ${
                  popular
                    ? 'border-purple/30 bg-gradient-to-b from-purple/[0.06] to-transparent'
                    : ''
                }`}
              >
                {/* Popular Badge */}
                {popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-amber via-neon-orange to-accent-pink text-xs font-semibold text-white shadow-[0_0_20px_rgba(245,158,11,0.3)]">
                      <Star className="w-3 h-3" />
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Service Name */}
                <h3 className="heading-3 text-foreground mb-2">{service.title}</h3>

                {/* Price */}
                <div className="mb-4">
                  <span className="text-3xl font-bold gradient-text-amber">₹{lowestTier.price.toLocaleString()}</span>
                  <span className="text-sm text-text-muted ml-1">starting</span>
                </div>

                {/* Timeline */}
                <div className="flex items-center gap-2 mb-5 text-sm text-text-secondary">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber" />
                  {lowestTier.timeline}
                </div>

                {/* Deliverables */}
                <div className="space-y-2.5 mb-8">
                  {service.deliverables && service.deliverables.slice(0, 4).map((item: string) => (
                    <div key={item} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-neon-green mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-text-secondary">{item}</span>
                    </div>
                  ))}
                  {service.deliverables && service.deliverables.length > 4 && (
                    <div className="flex items-start gap-2.5">
                      <span className="w-4 h-4 flex items-center justify-center text-xs text-text-muted mt-0.5 flex-shrink-0">+</span>
                      <span className="text-sm text-text-muted italic">{service.deliverables.length - 4} more features</span>
                    </div>
                  )}
                </div>

                {/* CTA */}
                <div className="mt-auto">
                  <Link
                    href={`/services/${service.slug}`}
                    className={`w-full text-center text-sm font-medium py-3 px-4 rounded-xl transition-all duration-300 inline-flex items-center justify-center gap-2 ${
                      popular
                        ? 'btn-primary !py-3'
                        : 'bg-white/5 border border-white/10 text-foreground hover:border-purple/30 hover:bg-purple/5'
                    }`}
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-10 text-sm text-text-muted"
        >
          All prices are starting prices. Final quote depends on project complexity and requirements.
          <br />
          <span className="text-amber">50% upfront, 50% on completion</span> — simple and fair.
        </motion.p>
      </div>
    </section>
  );
}
