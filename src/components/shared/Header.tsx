'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles } from 'lucide-react';
import { NAV_LINKS } from '@/lib/constants';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#050816]/90 backdrop-blur-md border-b border-white/5 shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-[88px]">
            {/* Mobile Left Section & Desktop Logo */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Mobile Hamburger */}
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="lg:hidden p-2 -ml-2 text-text-secondary hover:text-foreground transition-colors relative z-20"
                aria-label="Toggle menu"
              >
                {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

              {/* Logo */}
              <Link href="/" className="flex items-center group relative z-10">
                <div className="relative h-[24px] w-[90px] sm:h-[32px] sm:w-[120px] lg:h-[45px] lg:w-[160px] transition-all duration-300">
                  <Image 
                    src="/images/logo-main.png" 
                    alt="Shivam Creates Logo" 
                    fill
                    className="object-contain object-left"
                    priority
                  />
                </div>
              </Link>
            </div>

            {/* Mobile Quick Links (Right side on mobile) */}
            <div className="flex lg:hidden items-center gap-3 sm:gap-4 relative z-20">
              <Link href="/" className="text-[13px] font-medium text-text-secondary hover:text-foreground transition-colors">Home</Link>
              <Link href="/portfolio" className="text-[13px] font-medium text-text-secondary hover:text-foreground transition-colors">Portfolio</Link>
              <Link href="/services" className="text-[13px] font-medium text-text-secondary hover:text-foreground transition-colors">Services</Link>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1 relative z-20">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-foreground transition-colors duration-300 rounded-lg hover:bg-white/5"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3 relative z-20">
              <Link href="/book" className="btn-primary text-sm !py-2.5 !px-5">
                <span>Book Free Call</span>
              </Link>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMobileOpen(false)} />
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-[280px] bg-[#0a0f1e] border-l border-white/10 p-6 pt-24 flex flex-col gap-2"
            >
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileOpen(false)}
                    className="block px-4 py-3 text-base font-medium text-text-secondary hover:text-foreground hover:bg-white/5 rounded-lg transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-6"
              >
                <Link
                  href="/contact"
                  onClick={() => setIsMobileOpen(false)}
                  className="btn-primary w-full text-center"
                >
                  <span>Book Free Call</span>
                </Link>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
