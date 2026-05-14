// =============================================
// SHIVAM CREATES — Type Definitions
// =============================================

export interface Service {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  icon: string;
  features: Feature[];
  deliverables: string[];
  processSteps: ProcessStep[];
  pricingTiers: PricingTier[];
  faqs: FAQ[];
  techUsed: string[];
  timelineMin: number;
  timelineMax: number;
}

export interface Feature {
  title: string;
  description: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  icon: string;
}

export interface PricingTier {
  name: string;
  startingPrice: string;
  timeline: string;
  deliverables: string;
  popular?: boolean;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  clientName: string;
  techStack: string[];
  liveUrl?: string;
  thumbnailUrl: string;
  galleryUrls: string[];
  videoUrl?: string;
  isFeatured: boolean;
  tags: string[];
  results: Record<string, string>;
}

export interface Testimonial {
  id: string;
  clientName: string;
  businessName: string;
  review: string;
  rating: number;
  avatarUrl?: string;
  serviceType: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Lead {
  fullName: string;
  email: string;
  phone?: string;
  businessName?: string;
  projectType?: string;
  budgetRange?: string;
  deadline?: string;
  message: string;
  referenceUrls?: string[];
  source: 'contact_form' | 'booking' | 'project_form';
  attribution?: string;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface NavLink {
  href: string;
  label: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}
