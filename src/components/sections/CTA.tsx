'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { CONTACT } from '@/lib/constants';

export default function CTA() {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple/[0.04] to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple/10 rounded-full blur-[200px]" />
        <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-amber/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 left-1/4 w-[300px] h-[300px] bg-neon-orange/6 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-[800px] mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <span className="caption mb-6 block">Let&apos;s Build Together</span>

          {/* Headline */}
          <h2 className="heading-display mb-6 text-balance">
            Ready to Build Something{' '}
            <span className="gradient-text">Extraordinary?</span>
          </h2>

          {/* Description */}
          <p className="body-large max-w-[550px] mx-auto mb-10 text-balance">
            Let&apos;s transform your digital presence together. Book a free discovery call
            and let&apos;s discuss how we can bring your vision to life.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact" className="btn-primary text-base">
              <span>Start Your Project</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost text-base !border-green-600/20 hover:!border-green-600/40 hover:!bg-green-600/5"
            >
              <MessageCircle className="w-4 h-4 text-green-400" />
              <span>WhatsApp Us</span>
            </a>
          </div>

          {/* Trust Line */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-sm text-text-muted"
          >
            Free consultation · No commitment · Response within 24 hours
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
