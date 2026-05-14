import type { FAQ, NavLink, PricingTier, Stat } from '@/types';

// =============================================
// Navigation
// =============================================
export const NAV_LINKS: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

// =============================================
// Services
// =============================================
export const SERVICES = [
  {
    icon: 'Globe',
    title: 'Web Development',
    description: 'Custom, blazing-fast websites built with Next.js, React, and modern tech stacks that convert visitors into customers.',
    slug: 'web-development',
  },
  {
    icon: 'Smartphone',
    title: 'App Development',
    description: 'Cross-platform mobile apps with native performance, elegant UI, and seamless user experiences.',
    slug: 'app-development',
  },
  {
    icon: 'Video',
    title: 'Video Editing',
    description: 'Cinematic video production with color grading, motion graphics, and scroll-stopping social media content.',
    slug: 'video-editing',
  },
  {
    icon: 'Palette',
    title: 'Branding & Identity',
    description: 'Complete brand systems — logos, typography, color palettes, and guidelines that make your brand unforgettable.',
    slug: 'branding',
  },
  {
    icon: 'TrendingUp',
    title: 'Digital Marketing',
    description: 'Data-driven marketing strategies, social media management, and ad campaigns that deliver measurable ROI.',
    slug: 'digital-marketing',
  },
  {
    icon: 'Figma',
    title: 'UI/UX Design',
    description: 'User-centered design with pixel-perfect interfaces, wireframes, and prototypes that delight and convert.',
    slug: 'ui-ux-design',
  },
];

// =============================================
// Service Detail Data (for /services/[slug])
// =============================================
export const SERVICE_DETAILS: Record<string, {
  tagline: string;
  features: { title: string; desc: string }[];
  deliverables: string[];
  techUsed: string[];
  faqs: { question: string; answer: string }[];
  pricing: { name: string; price: string; timeline: string; includes: string }[];
}> = {
  'web-development': {
    tagline: 'Modern, fast, and SEO-optimized websites that convert visitors into customers.',
    features: [
      { title: 'Responsive Design', desc: 'Pixel-perfect on every device — mobile, tablet, and desktop.' },
      { title: 'SEO Optimized', desc: 'Built with best-practice SEO from day one — meta tags, schema, sitemaps.' },
      { title: 'Performance Tuned', desc: 'Lighthouse 90+ scores with optimized images, code splitting, and CDN delivery.' },
      { title: 'CMS Integration', desc: 'Easy content management with headless CMS or custom admin panel.' },
      { title: 'Custom Animations', desc: 'Smooth, cinematic animations with Framer Motion that delight users.' },
      { title: 'API Development', desc: 'Full-stack with REST or GraphQL APIs, authentication, and database.' },
    ],
    deliverables: ['Fully coded website', 'Source code (GitHub)', 'SEO setup', 'Contact forms', 'Analytics integration', 'Responsive testing', '30-day post-launch support'],
    techUsed: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Framer Motion', 'Vercel'],
    faqs: [
      { question: 'How long does a website take?', answer: 'Landing pages: 3-5 days. Full business websites: 7-14 days. Complex platforms: 15-45 days.' },
      { question: 'Do you provide hosting?', answer: 'We deploy on Vercel (free tier available) with custom domain setup. You own everything.' },
      { question: 'Can I update content myself?', answer: 'Yes! We can integrate a CMS like Supabase or build a custom admin panel for easy content management.' },
    ],
    pricing: [
      { name: 'Landing Page', price: '₹3,000', timeline: '3-5 days', includes: '1-page site, SEO, contact form' },
      { name: 'Portfolio Website', price: '₹5,000', timeline: '5-7 days', includes: 'Multi-page, animations, blog' },
      { name: 'Business Website', price: '₹8,000', timeline: '7-14 days', includes: 'Full site, CMS, SEO, analytics' },
    ],
  },
  'app-development': {
    tagline: 'Cross-platform mobile apps with native feel and blazing performance.',
    features: [
      { title: 'Cross-Platform', desc: 'One codebase for iOS and Android using React Native.' },
      { title: 'Native Performance', desc: 'Smooth 60fps animations and instant transitions.' },
      { title: 'Push Notifications', desc: 'Keep users engaged with targeted push notifications.' },
      { title: 'Offline Support', desc: 'Works offline with local data sync when connected.' },
      { title: 'App Store Ready', desc: 'Full submission to Google Play Store and Apple App Store.' },
      { title: 'Auth & Database', desc: 'Secure authentication and real-time database with Firebase or Supabase.' },
    ],
    deliverables: ['iOS + Android app', 'Source code', 'App Store submission', 'Push notification setup', 'Admin panel', 'Analytics', '30-day support'],
    techUsed: ['React Native', 'Expo', 'TypeScript', 'Firebase', 'Supabase', 'Node.js'],
    faqs: [
      { question: 'iOS and Android both?', answer: 'Yes! We use React Native so both platforms are built from a single codebase.' },
      { question: 'Do you publish to app stores?', answer: 'Yes, we handle the entire submission process for both Google Play and Apple App Store.' },
      { question: 'Can you add features later?', answer: 'Absolutely. We build modular, scalable codebases designed for future growth.' },
    ],
    pricing: [
      { name: 'Simple App', price: '₹15,000', timeline: '15-25 days', includes: 'Auth, CRUD, basic features' },
      { name: 'Complex App', price: '₹30,000', timeline: '25-45 days', includes: 'Real-time, payments, admin panel' },
    ],
  },
  'video-editing': {
    tagline: 'Cinematic video content that stops the scroll and tells your brand story.',
    features: [
      { title: 'Color Grading', desc: 'Professional color correction for a cinematic, polished look.' },
      { title: 'Motion Graphics', desc: 'Animated titles, lower thirds, and visual effects.' },
      { title: 'Sound Design', desc: 'Music sync, sound effects, and audio enhancement.' },
      { title: 'Captions & Subs', desc: 'Accurate captions for accessibility and engagement.' },
      { title: 'Social Media Cuts', desc: 'Optimized formats for Instagram, YouTube, TikTok.' },
      { title: 'Transitions & VFX', desc: 'Smooth transitions and visual effects that elevate quality.' },
    ],
    deliverables: ['Edited video files', 'Multiple format exports', 'Raw project files', 'Thumbnail designs', 'Caption files (SRT)'],
    techUsed: ['Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Photoshop', 'Audition'],
    faqs: [
      { question: 'What formats do you deliver?', answer: 'MP4, MOV, and optimized exports for each social platform.' },
      { question: 'How many revisions?', answer: '2-3 rounds of revisions are included in every package.' },
      { question: 'Do you provide raw footage?', answer: 'We work with your footage. If you need shooting services, we can arrange it.' },
    ],
    pricing: [
      { name: 'Short Reel', price: '₹500/min', timeline: '2-3 days', includes: 'Color graded, captioned, music synced' },
      { name: 'YouTube Video', price: '₹2,000', timeline: '3-5 days', includes: 'Full edit, graphics, thumbnail' },
    ],
  },
  'branding': {
    tagline: 'Complete brand identity systems that make your business unforgettable.',
    features: [
      { title: 'Logo Design', desc: '3-5 unique logo concepts with unlimited revisions on the chosen direction.' },
      { title: 'Color Palette', desc: 'Curated color system with primary, secondary, and accent colors.' },
      { title: 'Typography', desc: 'Carefully selected font pairings that reflect your brand personality.' },
      { title: 'Brand Guidelines', desc: 'Comprehensive document covering logo usage, colors, typography, and tone.' },
      { title: 'Social Templates', desc: 'Ready-to-use templates for Instagram, LinkedIn, and other platforms.' },
      { title: 'Stationery Design', desc: 'Business cards, letterheads, and email signatures.' },
    ],
    deliverables: ['Logo files (AI, SVG, PNG)', 'Brand guidelines PDF', 'Color palette', 'Typography guide', 'Social media templates', 'Business card design'],
    techUsed: ['Figma', 'Illustrator', 'Photoshop', 'Brand Strategy'],
    faqs: [
      { question: 'How many logo concepts?', answer: '3-5 initial concepts, then unlimited revisions on your chosen direction.' },
      { question: 'What file formats?', answer: 'AI, SVG, PNG, JPG, PDF — all formats you need for print and digital.' },
      { question: 'Can you match my existing style?', answer: 'Yes! We can evolve your existing brand or create something completely new.' },
    ],
    pricing: [
      { name: 'Logo Only', price: '₹2,000', timeline: '3-5 days', includes: 'Logo design + files' },
      { name: 'Full Branding', price: '₹5,000', timeline: '5-7 days', includes: 'Logo, colors, typography, guidelines' },
    ],
  },
  'digital-marketing': {
    tagline: 'Data-driven strategies that grow your audience and drive measurable ROI.',
    features: [
      { title: 'Social Media Management', desc: 'Content creation, scheduling, and engagement across all platforms.' },
      { title: 'Ad Campaigns', desc: 'Targeted Facebook, Instagram, and Google Ads that convert.' },
      { title: 'SEO Strategy', desc: 'On-page and off-page SEO to rank higher on Google.' },
      { title: 'Content Creation', desc: 'Blog posts, social graphics, and video content for your brand.' },
      { title: 'Analytics Reports', desc: 'Monthly performance reports with actionable insights.' },
      { title: 'Growth Hacking', desc: 'Creative strategies to accelerate growth on a budget.' },
    ],
    deliverables: ['Social media calendar', 'Ad creatives', 'Monthly analytics report', 'SEO audit', 'Content strategy document'],
    techUsed: ['Meta Ads Manager', 'Google Ads', 'Google Analytics', 'Canva', 'SEMrush', 'Buffer'],
    faqs: [
      { question: 'How soon will I see results?', answer: 'Organic: 2-3 months. Paid ads: within the first week. We set expectations upfront.' },
      { question: 'Do you manage the ad budget?', answer: 'Yes, we manage your ad spend to maximize ROI. Ad budget is separate from our service fee.' },
      { question: 'What platforms do you cover?', answer: 'Instagram, Facebook, LinkedIn, YouTube, Google Ads, and more.' },
    ],
    pricing: [
      { name: 'Starter', price: '₹3,000/mo', timeline: 'Ongoing', includes: 'Social posts, basic analytics' },
      { name: 'Growth', price: '₹8,000/mo', timeline: 'Ongoing', includes: 'Ads + social + SEO + reports' },
    ],
  },
  'ui-ux-design': {
    tagline: 'User-centered design that delights users and drives business results.',
    features: [
      { title: 'Wireframes', desc: 'Low-fidelity wireframes to map user flows and information architecture.' },
      { title: 'High-Fi Mockups', desc: 'Pixel-perfect, production-ready design mockups in Figma.' },
      { title: 'Prototyping', desc: 'Interactive prototypes for user testing and stakeholder review.' },
      { title: 'User Research', desc: 'Competitor analysis, persona mapping, and user journey design.' },
      { title: 'Design Systems', desc: 'Reusable component libraries for consistent, scalable design.' },
      { title: 'Usability Testing', desc: 'Testing with real users to validate design decisions.' },
    ],
    deliverables: ['Figma design files', 'Interactive prototype', 'Design system', 'User flow diagrams', 'Handoff documentation'],
    techUsed: ['Figma', 'Adobe XD', 'Framer', 'Maze', 'Hotjar'],
    faqs: [
      { question: 'Do you do development too?', answer: 'Yes! We offer end-to-end design + development. Or design-only if you have a developer.' },
      { question: 'Can I edit the designs?', answer: 'Yes, you get full Figma source files with organized layers and components.' },
      { question: 'What about mobile design?', answer: 'All designs are responsive — mobile, tablet, and desktop breakpoints included.' },
    ],
    pricing: [
      { name: 'UI Design', price: '₹5,000', timeline: '5-7 days', includes: 'Mockups, prototype, handoff' },
      { name: 'Full UX + UI', price: '₹10,000', timeline: '10-14 days', includes: 'Research, wireframes, mockups, testing' },
    ],
  },
};

// =============================================
// Stats
// =============================================
export const STATS: Stat[] = [
  { value: 50, suffix: '+', label: 'Projects Completed' },
  { value: 35, suffix: '+', label: 'Happy Clients' },
  { value: 3, suffix: '+', label: 'Years Experience' },
  { value: 6, suffix: '', label: 'Services Offered' },
];

// =============================================
// Process Steps
// =============================================
export const PROCESS_STEPS = [
  {
    step: 1,
    title: 'Discovery',
    description: 'Understanding your goals, audience, and competition through deep-dive research and strategy sessions.',
    icon: 'Search',
  },
  {
    step: 2,
    title: 'Planning',
    description: 'Sitemap, wireframes, content strategy, and tech stack decisions — building the blueprint for success.',
    icon: 'FileText',
  },
  {
    step: 3,
    title: 'Design',
    description: 'High-fidelity mockups, design systems, and interactive prototypes with your feedback at every step.',
    icon: 'Paintbrush',
  },
  {
    step: 4,
    title: 'Development',
    description: 'Full-stack build with clean code, responsive design, animations, and performance optimization.',
    icon: 'Code',
  },
  {
    step: 5,
    title: 'Launch & Support',
    description: 'Deployment, SEO setup, analytics, and 30 days of post-launch support to ensure everything runs perfectly.',
    icon: 'Rocket',
  },
];

// =============================================
// Pricing
// =============================================
export const PRICING: PricingTier[] = [
  {
    name: 'Landing Page',
    startingPrice: '₹3,000',
    timeline: '3–5 days',
    deliverables: '1-page responsive site, SEO basics, contact form',
  },
  {
    name: 'Portfolio Website',
    startingPrice: '₹5,000',
    timeline: '5–7 days',
    deliverables: 'Multi-page, animations, contact form, blog',
  },
  {
    name: 'Business Website',
    startingPrice: '₹8,000',
    timeline: '7–14 days',
    deliverables: 'Full site, CMS, SEO, analytics',
    popular: true,
  },
  {
    name: 'App Development',
    startingPrice: '₹15,000',
    timeline: '15–45 days',
    deliverables: 'React Native / Web App, auth, database',
  },
  {
    name: 'Video Editing',
    startingPrice: '₹500/min',
    timeline: '2–3 days',
    deliverables: 'Color graded, captioned, music synced reel',
  },
  {
    name: 'Branding Package',
    startingPrice: '₹5,000',
    timeline: '5–7 days',
    deliverables: 'Logo, colors, typography, brand guidelines',
  },
  {
    name: 'Digital Marketing',
    startingPrice: '₹3,000/mo',
    timeline: 'Ongoing',
    deliverables: 'Social posts, ad campaigns, analytics report',
  },
];

// =============================================
// Testimonials (placeholder data)
// =============================================
export const TESTIMONIALS = [
  {
    id: '1',
    clientName: 'Rahul Mehta',
    businessName: 'TechVista Solutions',
    review: 'Shivam delivered an absolutely stunning website for our SaaS startup. The attention to detail in animations and user experience was beyond anything we expected. Our conversion rate jumped 40% within the first month!',
    rating: 5,
    serviceType: 'Web Development',
  },
  {
    id: '2',
    clientName: 'Priya Sharma',
    businessName: 'Bloom Organics',
    review: 'The branding package transformed our entire business identity. From logo to social media templates, everything feels premium and cohesive. We constantly get compliments on our new look!',
    rating: 5,
    serviceType: 'Branding',
  },
  {
    id: '3',
    clientName: 'Alex Kingston',
    businessName: 'NovaPay UK',
    review: 'Working with Shivam from across the globe was seamless. The communication was clear, turnaround was fast, and the final product — a fintech dashboard — exceeded our expectations. Highly recommend!',
    rating: 5,
    serviceType: 'UI/UX Design',
  },
  {
    id: '4',
    clientName: 'Ananya Verma',
    businessName: 'FitZone Studio',
    review: 'Our fitness brand needed a complete digital overhaul. Shivam delivered a gorgeous website, Instagram content strategy, and video reels that helped us gain 5,000 followers in just 2 months.',
    rating: 5,
    serviceType: 'Digital Marketing',
  },
  {
    id: '5',
    clientName: 'Karan Patel',
    businessName: 'CloudBase.io',
    review: 'The mobile app Shivam built for us is silky smooth. Clean animations, intuitive UX, and rock-solid performance. Our users love it and our app store rating went from 3.2 to 4.8 stars.',
    rating: 5,
    serviceType: 'App Development',
  },
  {
    id: '6',
    clientName: 'Meera Joshi',
    businessName: 'Artisan Bakery',
    review: 'I was amazed at how quickly Shivam understood our brand vision. The website he created captures the warmth and craft of our bakery perfectly. Online orders increased by 60%!',
    rating: 5,
    serviceType: 'Web Development',
  },
];

// =============================================
// Portfolio Projects (placeholder data)
// =============================================
export const FEATURED_PROJECTS = [
  {
    id: '1',
    title: 'TechVista SaaS Platform',
    slug: 'techvista-saas-platform',
    category: 'websites',
    description: 'A modern SaaS dashboard with real-time analytics, dark mode, and stunning data visualizations built with Next.js and Supabase.',
    clientName: 'TechVista Solutions',
    techStack: ['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Framer Motion'],
    tags: ['SaaS', 'Dashboard', 'Full-Stack'],
    thumbnailUrl: '',
    isFeatured: true,
    challenge: 'TechVista needed a performant SaaS dashboard that could handle real-time data from 10,000+ daily active users while maintaining sub-second load times and a premium dark-mode UI.',
    solution: 'We built a Next.js application with server-side rendering, Supabase real-time subscriptions for live data, and a custom charting system with Recharts. The dark mode UI features glassmorphism cards and smooth Framer Motion transitions.',
    results: { 'Page Load': '< 1.2s', 'Conversion Rate': '+40%', 'User Retention': '+65%', 'Lighthouse Score': '96' },
    timeline: '21 days',
    testimonial: 'Shivam delivered an absolutely stunning website. Our conversion rate jumped 40% within the first month!',
  },
  {
    id: '2',
    title: 'Bloom Organics E-Commerce',
    slug: 'bloom-organics-ecommerce',
    category: 'websites',
    description: 'Premium organic food e-commerce platform with PWA capabilities, integrated payments via Razorpay, and a beautiful product showcase.',
    clientName: 'Bloom Organics',
    techStack: ['Next.js', 'React', 'Razorpay', 'PostgreSQL'],
    tags: ['E-Commerce', 'PWA', 'Payments'],
    thumbnailUrl: '',
    isFeatured: true,
    challenge: 'Bloom Organics was losing 60% of mobile traffic due to a slow, outdated website. They needed a fast, mobile-first e-commerce experience with seamless checkout.',
    solution: 'We built a Progressive Web App with Next.js, optimized images, skeleton loaders, and integrated Razorpay for one-tap payments. The product pages load instantly with ISR.',
    results: { 'Mobile Speed': '< 2s', 'Online Orders': '+60%', 'Cart Abandonment': '-35%', 'PWA Installs': '2,000+' },
    timeline: '14 days',
    testimonial: 'Online orders increased by 60%! The website captures the warmth of our bakery perfectly.',
  },
  {
    id: '3',
    title: 'FitZone Mobile App',
    slug: 'fitzone-mobile-app',
    category: 'apps',
    description: 'Cross-platform fitness tracking app with workout plans, progress charts, social features, and real-time chat with trainers.',
    clientName: 'FitZone Studio',
    techStack: ['React Native', 'Expo', 'Firebase', 'Node.js'],
    tags: ['Mobile App', 'Fitness', 'Cross-Platform'],
    thumbnailUrl: '',
    isFeatured: true,
    challenge: 'FitZone had a 3.2-star app with terrible UX. Members were churning because the app was slow, hard to navigate, and lacked social features.',
    solution: 'We rebuilt the entire app in React Native with silky-smooth animations, intuitive workout tracking, progress charts, and a real-time chat system for trainer-member communication.',
    results: { 'App Rating': '3.2 → 4.8', 'Daily Users': '+120%', 'Retention': '+45%', 'Crash Rate': '< 0.1%' },
    timeline: '35 days',
    testimonial: 'The app is silky smooth. Our app store rating went from 3.2 to 4.8 stars.',
  },
  {
    id: '4',
    title: 'NovaPay Brand Identity',
    slug: 'novapay-brand-identity',
    category: 'branding',
    description: 'Complete brand identity system for a UK fintech startup — logo, typography, color system, and comprehensive brand guidelines.',
    clientName: 'NovaPay UK',
    techStack: ['Figma', 'Illustrator', 'Brand Strategy'],
    tags: ['Branding', 'Fintech', 'Identity'],
    thumbnailUrl: '',
    isFeatured: true,
    challenge: 'NovaPay was launching in a crowded UK fintech market and needed a brand identity that communicated trust, innovation, and security to both consumers and investors.',
    solution: 'We designed a complete brand system — from logo concepts and color psychology to typography selection and a 50-page brand guidelines document. Every element was tested against competitor brands for differentiation.',
    results: { 'Brand Assets': '50+ files', 'Investor Pitch': 'Funded', 'Brand Recognition': '+80%', 'Social Followers': '5K+ in 2mo' },
    timeline: '10 days',
    testimonial: 'The communication was clear, turnaround was fast, and the final product exceeded our expectations. Highly recommend!',
  },
];

// =============================================
// FAQs
// =============================================
export const FAQS: FAQ[] = [
  {
    question: 'What services does Shivam Creates offer?',
    answer: 'We offer web development, app development, video editing, branding & identity design, digital marketing, and UI/UX design. From a simple landing page to a full-scale SaaS platform — we handle it all.',
  },
  {
    question: 'How much does a website cost?',
    answer: 'Our pricing starts at ₹3,000 for a landing page, ₹5,000 for a portfolio website, and ₹8,000+ for a full business website. Pricing depends on complexity, features, and timeline. We provide transparent quotes before starting.',
  },
  {
    question: 'How long does it take to build a website?',
    answer: 'A landing page takes 3–5 days, a portfolio site 5–7 days, and a full business website 7–14 days. Complex apps and platforms take 15–45 days. We always agree on timelines upfront.',
  },
  {
    question: 'Do you work with international clients?',
    answer: 'Absolutely! We work with clients across India, USA, UK, UAE, and Canada. We are timezone-flexible and communicate fluently in English. All communication is professional and organized.',
  },
  {
    question: 'What technologies do you use?',
    answer: 'Our primary stack includes Next.js, React, TypeScript, Tailwind CSS, Supabase, and Framer Motion. For mobile apps, we use React Native. We choose the best tools for each project.',
  },
  {
    question: 'Do you provide revisions?',
    answer: 'Yes! Every project includes 2–3 rounds of revisions. We work closely with you throughout the process to ensure the final product matches your vision perfectly.',
  },
  {
    question: 'How do I get started?',
    answer: 'Simply click "Book Free Call" to schedule a 30-minute discovery call, or fill out our project requirement form. We will discuss your goals, provide a quote, and get started within 24–48 hours.',
  },
  {
    question: 'Do you offer ongoing maintenance?',
    answer: 'Yes! We offer monthly maintenance and support packages starting at ₹2,000/month. This includes updates, bug fixes, content changes, and performance monitoring.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept UPI, bank transfers (NEFT/IMPS), Razorpay (cards, wallets), and PayPal for international clients. We typically require 50% upfront and 50% on completion.',
  },
  {
    question: 'Can I see examples of your previous work?',
    answer: 'Of course! Visit our Portfolio page to see detailed case studies with real results. Every project showcases the problem, our approach, and the measurable outcomes achieved.',
  },
];

// =============================================
// Social Links
// =============================================
export const SOCIAL_LINKS = [
  { name: 'Instagram', url: 'https://instagram.com/shivamcreates', icon: 'Instagram' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/shivamcreates', icon: 'Linkedin' },
  { name: 'YouTube', url: 'https://youtube.com/@shivamcreates', icon: 'Youtube' },
  { name: 'GitHub', url: 'https://github.com/shivamcreates', icon: 'Github' },
  { name: 'Twitter', url: 'https://twitter.com/shivamcreates', icon: 'Twitter' },
];

// =============================================
// Contact Info
// =============================================
export const CONTACT = {
  email: 'shivamkakaal@gmail.com',
  phone: '+91 7006506721',
  whatsappUrl: 'https://wa.me/917006506721?text=Hi%20Shivam!%20I%27m%20interested%20in%20your%20services.',
  location: 'Jammu & Kashmir, India',
};
