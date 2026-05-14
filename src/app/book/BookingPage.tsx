'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  MessageCircle,
  CheckCircle,
  Loader2,
  Sparkles,
} from 'lucide-react';
import { toast } from 'sonner';
import { SERVICES, CONTACT } from '@/lib/constants';

const TIME_SLOTS = [
  '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '2:00 PM', '2:30 PM',
  '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM',
  '5:00 PM', '5:30 PM', '6:00 PM',
];

const BUDGET_RANGES = [
  '₹3,000 – ₹5,000',
  '₹5,000 – ₹10,000',
  '₹10,000 – ₹25,000',
  '₹25,000 – ₹50,000',
  '₹50,000+',
  'Not sure yet',
];

const STEPS = ['Service', 'Date & Time', 'Details', 'Confirm'];

const inputClasses =
  'w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-foreground text-sm placeholder:text-text-muted focus:outline-none focus:border-amber/40 focus:bg-white/[0.06] focus:shadow-[0_0_20px_rgba(245,158,11,0.08)] transition-all duration-300';

export default function BookingPage() {
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    service: '',
    date: '',
    time: '',
    fullName: '',
    email: '',
    phone: '',
    budget: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const canProceed = () => {
    if (step === 0) return formData.service !== '';
    if (step === 1) return formData.date !== '' && formData.time !== '';
    if (step === 2) return formData.fullName !== '' && formData.email !== '';
    return true;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to book appointment');
      }

      toast.success('Call booked successfully!');
      setIsSubmitted(true);
    } catch (error: any) {
      console.error('Booking form error:', error);
      toast.error(error.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Generate next 14 days
  const dates = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    // Skip Sunday
    if (d.getDay() === 0) {
      d.setDate(d.getDate() + 1);
    }
    return {
      value: d.toISOString().split('T')[0],
      label: d.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' }),
      day: d.toLocaleDateString('en-IN', { weekday: 'short' }),
      date: d.getDate(),
    };
  });

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
            <h2 className="heading-2 text-foreground mb-3">Call Booked! 🎉</h2>
            <p className="text-text-secondary mb-2">
              Your discovery call has been scheduled for:
            </p>
            <p className="text-amber font-semibold mb-6">
              {formData.date} at {formData.time}
            </p>
            <p className="text-sm text-text-muted mb-8 max-w-[400px] mx-auto">
              We&apos;ll send a confirmation email with the meeting link. You&apos;ll also get a WhatsApp reminder before the call.
            </p>
            <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-primary text-base">
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding relative pt-32 lg:pt-40">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-40 w-[500px] h-[500px] rounded-full bg-purple/8 blur-[140px]" />
        <div className="absolute bottom-40 -right-32 w-[400px] h-[400px] rounded-full bg-amber/6 blur-[120px]" />
      </div>

      <div className="relative max-w-[700px] mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="caption mb-4 block">Book a Call</span>
          <h1 className="heading-1 mb-4">
            Schedule a <span className="gradient-text">Free Discovery Call</span>
          </h1>
          <p className="body-regular max-w-[500px] mx-auto">
            30 minutes to discuss your project, goals, and how we can help you grow.
          </p>
        </motion.div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  i <= step
                    ? 'bg-gradient-to-r from-purple to-amber text-white'
                    : 'bg-white/5 text-text-muted border border-white/10'
                }`}
              >
                {i < step ? '✓' : i + 1}
              </div>
              <span className={`text-xs hidden sm:inline ${i <= step ? 'text-foreground' : 'text-text-muted'}`}>
                {s}
              </span>
              {i < STEPS.length - 1 && (
                <div className={`w-8 h-px ${i < step ? 'bg-amber' : 'bg-white/10'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Form Steps */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="card !p-8"
          >
            {/* Step 1: Service Selection */}
            {step === 0 && (
              <div>
                <h2 className="heading-3 text-foreground mb-6">What do you need help with?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SERVICES.map((s) => (
                    <button
                      key={s.slug}
                      onClick={() => setFormData((prev) => ({ ...prev, service: s.title }))}
                      className={`p-4 rounded-xl border text-left transition-all duration-300 ${
                        formData.service === s.title
                          ? 'border-amber/40 bg-amber/5 shadow-[0_0_20px_rgba(245,158,11,0.08)]'
                          : 'border-white/8 bg-white/[0.02] hover:border-white/20'
                      }`}
                    >
                      <span className="text-sm font-medium text-foreground">{s.title}</span>
                      <p className="text-xs text-text-muted mt-1 line-clamp-1">{s.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Date & Time */}
            {step === 1 && (
              <div>
                <h2 className="heading-3 text-foreground mb-6">
                  <Calendar className="w-5 h-5 inline mr-2 text-amber" />
                  Pick a Date & Time
                </h2>

                {/* Date Grid */}
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 mb-6">
                  {dates.slice(0, 14).map((d) => (
                    <button
                      key={d.value}
                      onClick={() => setFormData((prev) => ({ ...prev, date: d.value }))}
                      className={`p-2 rounded-xl border text-center transition-all duration-300 ${
                        formData.date === d.value
                          ? 'border-amber/40 bg-amber/10'
                          : 'border-white/8 hover:border-white/20'
                      }`}
                    >
                      <span className="text-[10px] text-text-muted block">{d.day}</span>
                      <span className="text-lg font-bold text-foreground">{d.date}</span>
                    </button>
                  ))}
                </div>

                {/* Time Slots */}
                <h3 className="text-sm font-medium text-text-secondary mb-3">
                  <Clock className="w-4 h-4 inline mr-1 text-amber" />
                  Available Slots (IST)
                </h3>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {TIME_SLOTS.map((t) => (
                    <button
                      key={t}
                      onClick={() => setFormData((prev) => ({ ...prev, time: t }))}
                      className={`px-3 py-2 rounded-lg border text-xs font-medium transition-all duration-300 ${
                        formData.time === t
                          ? 'border-amber/40 bg-amber/10 text-amber'
                          : 'border-white/8 text-text-secondary hover:border-white/20'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Details */}
            {step === 2 && (
              <div>
                <h2 className="heading-3 text-foreground mb-6">
                  <User className="w-5 h-5 inline mr-2 text-amber" />
                  Your Details
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">Full Name *</label>
                    <input type="text" name="fullName" placeholder="Your name" value={formData.fullName} onChange={handleChange} required className={inputClasses} />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">
                        <Mail className="w-3.5 h-3.5 inline mr-1" /> Email *
                      </label>
                      <input type="email" name="email" placeholder="your@email.com" value={formData.email} onChange={handleChange} required className={inputClasses} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">
                        <Phone className="w-3.5 h-3.5 inline mr-1" /> Phone
                      </label>
                      <input type="tel" name="phone" placeholder="+91 XXXXX XXXXX" value={formData.phone} onChange={handleChange} className={inputClasses} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">Budget Range</label>
                    <select name="budget" value={formData.budget} onChange={handleChange} className={`${inputClasses} appearance-none`}>
                      <option value="" disabled>Select budget</option>
                      {BUDGET_RANGES.map((r) => (
                        <option key={r} value={r} className="bg-[#0a0f1e]">{r}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">Anything you&apos;d like to discuss?</label>
                    <textarea name="message" rows={3} placeholder="Brief about your project..." value={formData.message} onChange={handleChange} className={`${inputClasses} resize-none`} />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Confirm */}
            {step === 3 && (
              <div>
                <h2 className="heading-3 text-foreground mb-6">
                  <Sparkles className="w-5 h-5 inline mr-2 text-amber" />
                  Confirm Your Booking
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-white/5">
                    <span className="text-sm text-text-muted">Service</span>
                    <span className="text-sm font-medium text-foreground">{formData.service}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-white/5">
                    <span className="text-sm text-text-muted">Date</span>
                    <span className="text-sm font-medium text-foreground">{formData.date}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-white/5">
                    <span className="text-sm text-text-muted">Time</span>
                    <span className="text-sm font-medium text-amber">{formData.time} IST</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-white/5">
                    <span className="text-sm text-text-muted">Name</span>
                    <span className="text-sm font-medium text-foreground">{formData.fullName}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-white/5">
                    <span className="text-sm text-text-muted">Email</span>
                    <span className="text-sm font-medium text-foreground">{formData.email}</span>
                  </div>
                  {formData.budget && (
                    <div className="flex justify-between items-center py-3 border-b border-white/5">
                      <span className="text-sm text-text-muted">Budget</span>
                      <span className="text-sm font-medium gradient-text-amber">{formData.budget}</span>
                    </div>
                  )}
                </div>
                <p className="text-xs text-text-muted mt-4">
                  By confirming, you agree to receive a meeting link via email and a reminder on WhatsApp.
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="btn-ghost text-sm disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          {step < 3 ? (
            <button
              onClick={() => setStep((s) => Math.min(3, s + 1))}
              disabled={!canProceed()}
              className="btn-primary text-sm disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="btn-primary text-sm disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Booking...</span>
                </>
              ) : (
                <>
                  <span>Confirm Booking</span>
                  <CheckCircle className="w-4 h-4" />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
