-- Seed script for Services based on PRD
-- Run this in your Supabase SQL Editor

INSERT INTO public.services (slug, title, tagline, description, icon, deliverables, pricing_tiers, timeline_min, timeline_max, sort_order)
VALUES 
(
  'landing-page',
  'Landing Page',
  'High-converting single page websites',
  'A focused, high-converting one-page website designed to capture leads, sell a product, or promote an event.',
  'Globe',
  ARRAY['1-page responsive site', 'SEO basics', 'Contact form', 'Fast loading speed'],
  '[{"name": "Standard", "price": 3000, "description": "Complete landing page with form"}]'::jsonb,
  3,
  5,
  1
),
(
  'portfolio-website',
  'Portfolio Website',
  'Showcase your work professionally',
  'A multi-page portfolio website with smooth animations, project showcases, contact forms, and blog integration.',
  'Palette',
  ARRAY['Multi-page site', 'Animations', 'Contact form', 'Blog integration'],
  '[{"name": "Standard", "price": 5000, "description": "Professional portfolio with animations"}]'::jsonb,
  5,
  7,
  2
),
(
  'business-website',
  'Business Website',
  'Complete digital presence for your brand',
  'A full-scale business website with CMS, advanced SEO, analytics, and multiple pages tailored to your brand.',
  'Briefcase',
  ARRAY['Full site', 'CMS integration', 'Advanced SEO', 'Analytics setup'],
  '[{"name": "Standard", "price": 8000, "description": "Full business website with CMS"}]'::jsonb,
  7,
  14,
  3
),
(
  'app-development',
  'App Development',
  'Native and cross-platform mobile apps',
  'Custom mobile application development using React Native or Web Apps with authentication and database integrations.',
  'Smartphone',
  ARRAY['React Native / Web App', 'Authentication', 'Database integration', 'App store guidance'],
  '[{"name": "Standard", "price": 15000, "description": "Cross-platform mobile app"}]'::jsonb,
  15,
  45,
  4
),
(
  'video-editing',
  'Video Editing',
  'Cinematic editing for reels and ads',
  'Professional video editing including color grading, captions, music syncing, and effects for social media and marketing.',
  'Video',
  ARRAY['Color grading', 'Captions/Subtitles', 'Music synced reel', 'Motion graphics'],
  '[{"name": "Per Minute", "price": 500, "description": "Professional video editing per minute"}]'::jsonb,
  2,
  3,
  5
),
(
  'branding',
  'Branding Package',
  'Complete brand identity design',
  'A comprehensive branding package including logo design, color palettes, typography, and brand guidelines.',
  'PenTool',
  ARRAY['Logo design', 'Color palette', 'Typography', 'Brand guidelines'],
  '[{"name": "Standard", "price": 5000, "description": "Complete brand identity"}]'::jsonb,
  5,
  7,
  6
),
(
  'digital-marketing',
  'Digital Marketing',
  'Grow your audience and sales',
  'Ongoing digital marketing services including social media posts, ad campaigns, and monthly analytics reporting.',
  'Megaphone',
  ARRAY['Social posts', 'Ad campaigns', 'Analytics report', 'Strategy sessions'],
  '[{"name": "Monthly", "price": 3000, "description": "Monthly marketing retainer"}]'::jsonb,
  30,
  30,
  7
)
ON CONFLICT (slug) DO UPDATE 
SET 
  title = EXCLUDED.title,
  tagline = EXCLUDED.tagline,
  description = EXCLUDED.description,
  icon = EXCLUDED.icon,
  deliverables = EXCLUDED.deliverables,
  pricing_tiers = EXCLUDED.pricing_tiers,
  timeline_min = EXCLUDED.timeline_min,
  timeline_max = EXCLUDED.timeline_max,
  sort_order = EXCLUDED.sort_order;
