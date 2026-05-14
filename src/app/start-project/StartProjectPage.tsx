'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Send,
  CheckCircle,
  Loader2,
  MessageCircle,
  ArrowRight,
  FileText,
  Sparkles,
} from 'lucide-react';
import { toast } from 'sonner';
import { SERVICES, CONTACT } from '@/lib/constants';

const BUDGET_RANGES = [
  '₹3,000 – ₹5,000',
  '₹5,000 – ₹10,000',
  '₹10,000 – ₹25,000',
  '₹25,000 – ₹50,000',
  '₹50,000+',
  'Not sure yet',
];

const HOW_FOUND = [
  'Instagram',
  'LinkedIn',
  'Google Search',
  'YouTube',
  'Friend / Referral',
  'Other',
];

const inputClasses =
  'w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-foreground text-sm placeholder:text-text-muted focus:outline-none focus:border-amber/40 focus:bg-white/[0.06] focus:shadow-[0_0_20px_rgba(245,158,11,0.08)] transition-all duration-300';
const labelClasses = 'block text-sm font-medium text-text-secondary mb-2';

export default function StartProjectPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    email: '',
    phone: '',
    projectType: '',
    budget: '',
    deadline: '',
    referenceUrls: '',
    message: '',
    howFound: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit project brief');
      }

      toast.success('Project brief submitted successfully!');
      setIsSubmitted(true);
    } catch (error: any) {
      console.error('Start project form error:', error);
      toast.error(error.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section className="section-padding relative pt-32 lg:pt-40">
        <div className="relative max-w-[600px] mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card text-center !py-16"
          >
            <div className="w-16 h-16 rounded-full bg-neon-green/10 border border-neon-green/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-neon-green" />
            </div>
            <h2 className="heading-2 text-foreground mb-3">Project Brief Received! 🚀</h2>
            <p className="text-text-secondary mb-6 max-w-[400px] mx-auto">
              We&apos;ll review your requirements and get back to you with a detailed proposal within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-primary text-sm">
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp for Faster Response</span>
              </a>
              <Link href="/" className="btn-ghost text-sm">
                <span>Back to Home</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding relative pt-32 lg:pt-40">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-32 -left-40 w-[500px] h-[500px] rounded-full bg-purple/8 blur-[140px]" />
        <div className="absolute bottom-60 -right-32 w-[450px] h-[450px] rounded-full bg-amber/6 blur-[130px]" />
      </div>

      <div className="relative max-w-[800px] mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="caption mb-4 block">Start a Project</span>
          <h1 className="heading-1 mb-4">
            Tell Us About Your{' '}
            <span className="gradient-text">Dream Project</span>
          </h1>
          <p className="body-regular max-w-[550px] mx-auto">
            Fill out the form below with as much detail as possible. The more we know, the better we can help you.
          </p>
        </motion.div>

        {/* Info Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-text-secondary">
            <FileText className="w-3.5 h-3.5 text-amber" />
            Custom proposal within 24 hours
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-text-secondary">
            <Sparkles className="w-3.5 h-3.5 text-neon-green" />
            No commitment required
          </div>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          onSubmit={handleSubmit}
          className="card !p-8"
        >
          {/* Section 1: Personal Info */}
          <h3 className="text-sm font-semibold text-amber uppercase tracking-wider mb-5">Your Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
            <div>
              <label htmlFor="fullName" className={labelClasses}>Full Name *</label>
              <input type="text" id="fullName" name="fullName" required placeholder="Your full name" value={formData.fullName} onChange={handleChange} className={inputClasses} />
            </div>
            <div>
              <label htmlFor="businessName" className={labelClasses}>Business / Brand Name</label>
              <input type="text" id="businessName" name="businessName" placeholder="Your brand name" value={formData.businessName} onChange={handleChange} className={inputClasses} />
            </div>
            <div>
              <label htmlFor="email" className={labelClasses}>Email Address *</label>
              <input type="email" id="email" name="email" required placeholder="your@email.com" value={formData.email} onChange={handleChange} className={inputClasses} />
            </div>
            <div>
              <label htmlFor="phone" className={labelClasses}>Phone / WhatsApp *</label>
              <input type="tel" id="phone" name="phone" required placeholder="+91 XXXXX XXXXX" value={formData.phone} onChange={handleChange} className={inputClasses} />
            </div>
          </div>

          {/* Section 2: Project Info */}
          <h3 className="text-sm font-semibold text-amber uppercase tracking-wider mb-5">Project Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            <div>
              <label htmlFor="projectType" className={labelClasses}>Project Type *</label>
              <select id="projectType" name="projectType" required value={formData.projectType} onChange={handleChange} className={`${inputClasses} appearance-none`}>
                <option value="" disabled>Select service</option>
                {SERVICES.map((s) => (
                  <option key={s.slug} value={s.title} className="bg-[#0a0f1e]">{s.title}</option>
                ))}
                <option value="Other" className="bg-[#0a0f1e]">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="budget" className={labelClasses}>Budget Range *</label>
              <select id="budget" name="budget" required value={formData.budget} onChange={handleChange} className={`${inputClasses} appearance-none`}>
                <option value="" disabled>Select budget</option>
                {BUDGET_RANGES.map((r) => (
                  <option key={r} value={r} className="bg-[#0a0f1e]">{r}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            <div>
              <label htmlFor="deadline" className={labelClasses}>Project Deadline</label>
              <input type="date" id="deadline" name="deadline" value={formData.deadline} onChange={handleChange} className={inputClasses} />
            </div>
            <div>
              <label htmlFor="howFound" className={labelClasses}>How did you find us?</label>
              <select id="howFound" name="howFound" value={formData.howFound} onChange={handleChange} className={`${inputClasses} appearance-none`}>
                <option value="" disabled>Select</option>
                {HOW_FOUND.map((h) => (
                  <option key={h} value={h} className="bg-[#0a0f1e]">{h}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-5">
            <label htmlFor="referenceUrls" className={labelClasses}>Reference Websites / Inspiration</label>
            <input type="text" id="referenceUrls" name="referenceUrls" placeholder="https://example.com, https://another.com" value={formData.referenceUrls} onChange={handleChange} className={inputClasses} />
          </div>

          <div className="mb-8">
            <label htmlFor="message" className={labelClasses}>Project Description * <span className="text-text-muted">(min 50 chars)</span></label>
            <textarea id="message" name="message" required minLength={50} rows={6} placeholder="Describe your project in detail — what you want to build, key features, target audience, any specific design preferences, inspiration references..." value={formData.message} onChange={handleChange} className={`${inputClasses} resize-none`} />
            <p className="text-xs text-text-muted mt-1">{formData.message.length}/50 characters minimum</p>
          </div>

          {/* Submit */}
          <button type="submit" disabled={isSubmitting} className="btn-primary w-full text-base disabled:opacity-60 disabled:cursor-not-allowed">
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <span>Submit Project Brief</span>
                <Send className="w-4 h-4" />
              </>
            )}
          </button>

          <p className="text-xs text-text-muted text-center mt-4">
            We&apos;ll review your brief and send a custom proposal within 24 hours. No commitment required.
          </p>
        </motion.form>

        {/* Alternative */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mt-10"
        >
          <p className="text-sm text-text-muted mb-3">Prefer to talk first?</p>
          <div className="flex items-center justify-center gap-3">
            <Link href="/book" className="btn-ghost text-sm">
              <span>Book a Free Call</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-green-400 hover:text-green-300 transition-colors">
              <MessageCircle className="w-4 h-4" />
              WhatsApp Us
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
