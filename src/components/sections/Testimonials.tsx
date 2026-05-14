'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { TESTIMONIALS as STATIC_TESTIMONIALS } from '@/lib/constants';

export default function Testimonials({ initialTestimonials }: { initialTestimonials?: any[] }) {
  const testimonials = initialTestimonials && initialTestimonials.length > 0 
    ? initialTestimonials 
    : STATIC_TESTIMONIALS;
    
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  // Auto-advance
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  const testimonial = testimonials[current];

  if (!testimonial) {
    return null;
  }

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="caption mb-4 block">Testimonials</span>
          <h2 className="heading-1 mb-4">
            Client{' '}
            <span className="gradient-text">Love</span>
          </h2>
          <p className="body-large max-w-[600px] mx-auto">
            Don&apos;t just take our word for it — hear what our clients say.
          </p>
        </motion.div>

        {/* Testimonial Card */}
        <div
          className="max-w-[700px] mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="card text-center relative !p-8 lg:!p-12"
            >
              {/* Quote Icon */}
              <Quote className="w-10 h-10 text-purple/20 mx-auto mb-6" />

              {/* Review */}
              <p className="text-lg lg:text-xl leading-relaxed text-foreground/90 mb-8 text-balance">
                &ldquo;{testimonial.review}&rdquo;
              </p>

              {/* Stars */}
              <div className="flex items-center justify-center gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Client Info */}
              <div>
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber to-neon-orange mx-auto mb-3 flex items-center justify-center">
                  <span className="text-lg font-bold text-white">
                    {(testimonial.clientName || testimonial.client_name || 'S')[0]}
                  </span>
                </div>
                <h4 className="font-semibold text-foreground">{testimonial.clientName || testimonial.client_name}</h4>
                <p className="text-sm text-text-secondary">{testimonial.businessName || testimonial.business_name}</p>
                <p className="text-xs text-amber mt-1">{testimonial.serviceType || testimonial.service_type}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-text-secondary hover:text-foreground hover:border-purple/30 transition-all duration-300"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === current ? 'bg-amber w-6' : 'bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-text-secondary hover:text-foreground hover:border-purple/30 transition-all duration-300"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
