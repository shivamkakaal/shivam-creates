'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Send,
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Clock,
  ArrowRight,
  CheckCircle,
  Loader2,
} from 'lucide-react';
import { toast } from 'sonner';
import { CONTACT } from '@/lib/constants';

const PROJECT_TYPES = [
  'Website Development',
  'App Development',
  'Video Editing',
  'Branding & Identity',
  'Digital Marketing',
  'UI/UX Design',
  'Other',
];

const BUDGET_RANGES = [
  '₹3,000 – ₹5,000',
  '₹5,000 – ₹10,000',
  '₹10,000 – ₹25,000',
  '₹25,000 – ₹50,000',
  '₹50,000+',
  'Not sure yet',
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    projectType: '',
    budget: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      toast.success('Message sent successfully!');
      setIsSubmitted(true);
    } catch (error: any) {
      console.error('Contact form error:', error);
      toast.error(error.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses =
    'w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-foreground text-sm placeholder:text-text-muted focus:outline-none focus:border-amber/40 focus:bg-white/[0.06] focus:shadow-[0_0_20px_rgba(245,158,11,0.08)] transition-all duration-300';
  const labelClasses = 'block text-sm font-medium text-text-secondary mb-2';

  return (
    <section className="section-padding relative pt-32 lg:pt-40">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-40 w-[500px] h-[500px] rounded-full bg-purple/8 blur-[140px]" />
        <div className="absolute bottom-40 -right-32 w-[400px] h-[400px] rounded-full bg-amber/6 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full bg-neon-orange/5 blur-[100px]" />
      </div>

      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="caption mb-4 block">Contact Us</span>
          <h1 className="heading-1 mb-4">
            Let&apos;s Build Something{' '}
            <span className="gradient-text">Amazing Together</span>
          </h1>
          <p className="body-large max-w-[600px] mx-auto">
            Ready to start your project? Fill out the form below or reach us directly. We respond within 24 hours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="card text-center !py-16"
              >
                <div className="w-16 h-16 rounded-full bg-neon-green/10 border border-neon-green/20 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-neon-green" />
                </div>
                <h2 className="heading-3 text-foreground mb-3">Message Sent Successfully! 🎉</h2>
                <p className="text-text-secondary mb-6 max-w-[400px] mx-auto">
                  Thank you for reaching out! We&apos;ll get back to you within 24 hours with a detailed response.
                </p>
                <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-primary text-base">
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp for Faster Response</span>
                </a>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="card !p-8">
                <h2 className="heading-3 text-foreground mb-6">Send Us a Message</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                  {/* Name */}
                  <div>
                    <label htmlFor="fullName" className={labelClasses}>Full Name *</label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      required
                      placeholder="Your full name"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={inputClasses}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className={labelClasses}>Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      className={inputClasses}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className={labelClasses}>Phone (optional)</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="+91 XXXXX XXXXX"
                      value={formData.phone}
                      onChange={handleChange}
                      className={inputClasses}
                    />
                  </div>

                  {/* Project Type */}
                  <div>
                    <label htmlFor="projectType" className={labelClasses}>Project Type *</label>
                    <select
                      id="projectType"
                      name="projectType"
                      required
                      value={formData.projectType}
                      onChange={handleChange}
                      className={`${inputClasses} appearance-none`}
                    >
                      <option value="" disabled>Select a service</option>
                      {PROJECT_TYPES.map((type) => (
                        <option key={type} value={type} className="bg-[#0a0f1e] text-foreground">{type}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Budget */}
                <div className="mb-5">
                  <label htmlFor="budget" className={labelClasses}>Budget Range</label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className={`${inputClasses} appearance-none`}
                  >
                    <option value="" disabled>Select your budget</option>
                    {BUDGET_RANGES.map((range) => (
                      <option key={range} value={range} className="bg-[#0a0f1e] text-foreground">{range}</option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div className="mb-6">
                  <label htmlFor="message" className={labelClasses}>Project Details *</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell us about your project — goals, timeline, features, inspiration, anything that helps us understand your vision..."
                    value={formData.message}
                    onChange={handleChange}
                    className={`${inputClasses} resize-none`}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full text-base disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* Contact Info Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Quick Contact */}
            <div className="card">
              <h3 className="heading-3 text-foreground mb-5">Quick Contact</h3>
              <div className="space-y-4">
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-electric-blue/10 border border-electric-blue/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5 text-electric-blue" />
                  </div>
                  <div>
                    <p className="text-xs text-text-muted uppercase tracking-wider mb-0.5">Email</p>
                    <p className="text-sm text-foreground group-hover:text-electric-blue transition-colors">{CONTACT.email}</p>
                  </div>
                </a>

                <a
                  href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-neon-green/10 border border-neon-green/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Phone className="w-5 h-5 text-neon-green" />
                  </div>
                  <div>
                    <p className="text-xs text-text-muted uppercase tracking-wider mb-0.5">Phone</p>
                    <p className="text-sm text-foreground group-hover:text-neon-green transition-colors">{CONTACT.phone}</p>
                  </div>
                </a>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber/10 border border-amber/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-amber" />
                  </div>
                  <div>
                    <p className="text-xs text-text-muted uppercase tracking-wider mb-0.5">Location</p>
                    <p className="text-sm text-foreground">{CONTACT.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple/10 border border-purple/20 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-purple" />
                  </div>
                  <div>
                    <p className="text-xs text-text-muted uppercase tracking-wider mb-0.5">Response Time</p>
                    <p className="text-sm text-foreground">Within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href={CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="card group block !border-green-600/20 hover:!border-green-600/30 hover:!bg-green-600/5"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-xl bg-green-600/10 border border-green-600/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">WhatsApp Us</h3>
                  <p className="text-xs text-text-muted">Fastest way to reach us</p>
                </div>
              </div>
              <p className="text-sm text-text-secondary mb-3">
                Prefer chatting? Send us a message on WhatsApp for instant replies and project discussion.
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-medium text-green-400 group-hover:gap-3 transition-all duration-300">
                Chat Now <ArrowRight className="w-4 h-4" />
              </span>
            </a>

            {/* DM Now CTA */}
            <div className="card !border-amber/20 text-center">
              <h3 className="font-semibold text-foreground mb-2">🚀 Let&apos;s Build Something Amazing!</h3>
              <p className="text-sm text-text-secondary mb-4">
                For project discussion &amp; custom quote
              </p>
              <a
                href={CONTACT.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full text-sm"
              >
                <span>DM NOW</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <p className="text-xs text-text-muted mt-3">Free consultation · No commitment</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
