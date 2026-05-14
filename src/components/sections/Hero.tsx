'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';

const HERO_WORDS = ['Experiences', 'Websites', 'Brands', 'Products'];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-10"
    >
      {/* Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-purple/10 blur-[120px] animate-blob" />
        <div className="absolute top-1/3 -right-32 w-[400px] h-[400px] rounded-full bg-electric-blue/10 blur-[120px] animate-blob-delay-2" />
        <div className="absolute bottom-1/4 left-1/3 w-[350px] h-[350px] rounded-full bg-accent-pink/8 blur-[100px] animate-blob-delay-4" />
        <div className="absolute top-1/2 right-1/4 w-[300px] h-[300px] rounded-full bg-amber/8 blur-[110px] animate-blob" />
        <div className="absolute bottom-1/3 -left-16 w-[250px] h-[250px] rounded-full bg-neon-orange/6 blur-[90px] animate-blob-delay-2" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-grid opacity-40" />

      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 w-full max-w-[1280px] mx-auto px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Column - Text */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber/30 bg-amber/5 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-amber animate-pulse" />
              <span className="text-sm font-medium text-amber">BUILD &nbsp;|&nbsp; EDIT &nbsp;|&nbsp; GROW</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="heading-display mb-6 text-balance"
            >
              We Create Digital{' '}
              <br className="hidden sm:block" />
              <span className="gradient-text">{HERO_WORDS[0]}</span>{' '}
              <br className="hidden sm:block" />
              That Inspire
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="body-large max-w-[600px] mx-auto lg:mx-0 mb-10 text-balance"
            >
              Modern digital solutions for fast-growing brands. From stunning websites to
              powerful apps — we turn your vision into a premium digital reality.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <Link href="/book" className="btn-primary text-base">
                <span>Book Free Call</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/portfolio" className="btn-ghost text-base">
                <Play className="w-4 h-4" />
                <span>View Portfolio</span>
              </Link>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="mt-12 flex items-center justify-center lg:justify-start gap-8 text-text-muted text-sm"
            >
              <div className="flex flex-col items-center lg:items-start gap-1">
                <span className="text-2xl font-bold text-foreground">50+</span>
                <span>Projects Delivered</span>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="flex flex-col items-center lg:items-start gap-1">
                <span className="text-2xl font-bold text-foreground">100%</span>
                <span>Client Satisfaction</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="order-1 lg:order-2 relative w-full aspect-[4/5] max-w-[500px] mx-auto lg:ml-auto"
          >
            {/* Glow behind image */}
            <div className="absolute inset-0 bg-gradient-to-tr from-amber/20 to-purple/20 blur-3xl rounded-[2rem]" />
            
            {/* Image Container */}
            <div className="relative w-full h-full rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl group">
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent z-10" />
              <Image
                src="/images/hero-founder.jpg"
                alt="Shivam Creates Founder"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
              
              {/* Floating Badge on Image */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="absolute bottom-8 left-8 z-20 glass-panel rounded-2xl p-4 flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center relative">
                  <div className="w-3 h-3 rounded-full bg-green-500 absolute top-0 right-0 animate-ping" />
                  <div className="w-3 h-3 rounded-full bg-green-500 absolute top-0 right-0" />
                  <span className="text-xl">👋</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Available for work</p>
                  <p className="text-xs text-text-muted">Let&apos;s build something!</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}
