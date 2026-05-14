-- Seed script for Testimonials
-- Run this in your Supabase SQL Editor

INSERT INTO public.testimonials (client_name, business_name, review, rating, service_type, is_featured, sort_order)
VALUES 
(
  'Rahul Mehta',
  'TechNova Solutions',
  'Shivam Creates completely transformed our brand identity. The new website is not just beautiful, it’s lightning fast. We saw a 40% increase in lead conversions within the first month. Highly recommended for any ambitious startup!',
  5,
  'Web Development & Branding',
  true,
  1
),
(
  'Priya Sharma',
  'The Artisan Café',
  'I had zero technical knowledge, but Shivam made the entire process so simple. He built us an amazing business website and set up our digital marketing. The results have been incredible—our weekend footfall has doubled!',
  5,
  'Business Website & Marketing',
  true,
  2
),
(
  'Alex K.',
  'Elevate Fitness',
  'Working with Shivam Creates was the best investment for my business. The mobile app he developed for my fitness coaching program is flawless. Fast communication, premium quality, and delivered exactly on time.',
  5,
  'App Development',
  true,
  3
),
(
  'Rohan Desai',
  'Desai Real Estate',
  'The cinematic video editing and motion graphics provided by Shivam Creates are unmatched. Our property reels are getting thousands of views and generating high-quality leads. Exceptional work!',
  5,
  'Video Editing',
  false,
  4
),
(
  'Aisha Singh',
  'Aura Cosmetics',
  'From the UI/UX design to the final launch, every step was handled with extreme professionalism. Our D2C store looks premium and feels so smooth. Shivam Creates is truly a world-class agency.',
  5,
  'UI/UX Design & Development',
  true,
  5
);
