'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowRight,
  MapPin,
  Calendar,
  Users,
  Target,
  Heart,
  Rocket,
  Code,
  Palette,
  Video,
  TrendingUp,
  Globe,
} from 'lucide-react';
import { STATS } from '@/lib/constants';

const TOOLS = [
  { name: 'Next.js', color: 'text-foreground' },
  { name: 'React', color: 'text-electric-blue' },
  { name: 'TypeScript', color: 'text-electric-blue' },
  { name: 'Tailwind CSS', color: 'text-cyan' },
  { name: 'Supabase', color: 'text-neon-green' },
  { name: 'Framer Motion', color: 'text-accent-pink' },
  { name: 'React Native', color: 'text-electric-blue' },
  { name: 'Figma', color: 'text-purple' },
  { name: 'Photoshop', color: 'text-electric-blue' },
  { name: 'Illustrator', color: 'text-neon-orange' },
  { name: 'Premiere Pro', color: 'text-purple' },
  { name: 'After Effects', color: 'text-purple' },
  { name: 'Node.js', color: 'text-neon-green' },
  { name: 'PostgreSQL', color: 'text-electric-blue' },
  { name: 'WordPress', color: 'text-electric-blue' },
  { name: 'Git', color: 'text-neon-orange' },
];

const VALUES = [
  { icon: Target, title: 'Quality First', desc: 'Every project gets the same premium attention to detail, no matter the budget.', color: 'text-amber' },
  { icon: Heart, title: 'Client Love', desc: 'Your success is our success. We treat every client like a long-term partner.', color: 'text-accent-pink' },
  { icon: Rocket, title: 'Innovation', desc: 'We stay ahead of trends and use cutting-edge tools to deliver future-proof solutions.', color: 'text-neon-green' },
  { icon: Users, title: 'Transparency', desc: 'No hidden costs, no surprises. Clear communication from day one to launch day.', color: 'text-electric-blue' },
];

const SKILLS = [
  { icon: Globe, label: 'Web Development', level: 95, color: 'from-electric-blue to-cyan' },
  { icon: Code, label: 'App Development', level: 88, color: 'from-neon-green to-cyan' },
  { icon: Palette, label: 'Branding & Design', level: 90, color: 'from-accent-pink to-purple' },
  { icon: Video, label: 'Video Editing', level: 85, color: 'from-neon-orange to-amber' },
  { icon: TrendingUp, label: 'Digital Marketing', level: 80, color: 'from-amber to-gold' },
];

const JOURNEY = [
  { year: '2022', title: 'Started Freelancing', desc: 'Began creating websites and designs for local businesses.' },
  { year: '2023', title: 'Shivam Creates Founded', desc: 'Officially launched the agency with a focus on premium digital services.' },
  { year: '2024', title: '50+ Projects', desc: 'Crossed 50 successful projects with clients across India, UK, and USA.' },
  { year: '2025', title: 'Full-Stack Agency', desc: 'Expanded into app development, video editing, and comprehensive digital marketing.' },
];

export default function AboutPage() {
  return (
    <section className="section-padding relative pt-32 lg:pt-40">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -right-40 w-[500px] h-[500px] rounded-full bg-purple/8 blur-[140px]" />
        <div className="absolute bottom-40 -left-32 w-[400px] h-[400px] rounded-full bg-amber/6 blur-[120px]" />
      </div>

      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="caption mb-4 block">About Us</span>
          <h1 className="heading-1 mb-6">
            The Story Behind{' '}
            <span className="gradient-text">Shivam Creates</span>
          </h1>

          {/* Avatar */}
          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-amber via-neon-orange to-purple mx-auto mb-6 flex items-center justify-center shadow-[0_0_40px_rgba(245,158,11,0.2)]">
            <span className="text-4xl font-black text-white">S</span>
          </div>

          <p className="body-large max-w-[650px] mx-auto mb-4">
            Hi, I&apos;m <span className="text-amber font-semibold">Shivam</span> — a passionate digital creator, developer, and designer from the beautiful valleys of Jammu &amp; Kashmir, India.
          </p>
          <p className="body-regular max-w-[600px] mx-auto">
            I help brands and businesses grow with powerful digital solutions, creative designs, and results-driven strategies. From a simple logo to a full-scale SaaS platform — I do it all.
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 text-sm text-text-muted">
            <MapPin className="w-4 h-4 text-amber" />
            Jammu &amp; Kashmir, India
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-24"
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card text-center"
            >
              <div className="text-3xl font-bold gradient-text-amber mb-1">
                {stat.value}{stat.suffix}
              </div>
              <p className="text-sm text-text-secondary">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Journey Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <h2 className="heading-2 text-center mb-12">
            My <span className="gradient-text-amber">Journey</span>
          </h2>
          <div className="relative max-w-[700px] mx-auto">
            <div className="absolute left-6 lg:left-1/2 lg:-translate-x-px top-0 bottom-0 w-[2px] bg-gradient-to-b from-amber/50 via-purple/30 to-electric-blue/50" />
            {JOURNEY.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative flex items-start gap-6 mb-10 last:mb-0 ${
                  i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                <div className="absolute left-6 lg:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-amber border-4 border-[#050816] z-10 mt-1.5 shadow-[0_0_20px_rgba(245,158,11,0.4)]" />
                <div className={`ml-16 lg:ml-0 lg:w-[calc(50%-40px)] card ${
                  i % 2 === 0 ? 'lg:mr-auto lg:text-right' : 'lg:ml-auto'
                }`}>
                  <span className="text-xs font-bold text-amber uppercase tracking-wider">{item.year}</span>
                  <h3 className="heading-3 text-foreground mt-1 mb-1">{item.title}</h3>
                  <p className="text-sm text-text-secondary">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <h2 className="heading-2 text-center mb-12">
            Skills &amp; <span className="gradient-text">Expertise</span>
          </h2>
          <div className="max-w-[700px] mx-auto space-y-6">
            {SKILLS.map((skill, i) => (
              <motion.div
                key={skill.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <skill.icon className="w-5 h-5 text-amber" />
                    <span className="text-sm font-medium text-foreground">{skill.label}</span>
                  </div>
                  <span className="text-sm font-bold gradient-text-amber">{skill.level}%</span>
                </div>
                <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.3 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tools & Tech */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <h2 className="heading-2 text-center mb-12">
            Tools &amp; <span className="gradient-text-amber">Technologies</span>
          </h2>
          <div className="flex flex-wrap justify-center gap-3 max-w-[800px] mx-auto">
            {TOOLS.map((tool, i) => (
              <motion.span
                key={tool.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.03 }}
                className={`px-4 py-2 rounded-xl bg-white/5 border border-white/8 text-sm font-medium ${tool.color} hover:border-amber/30 hover:bg-white/8 transition-all duration-300`}
              >
                {tool.name}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="heading-2 text-center mb-12">
            What I <span className="gradient-text">Believe In</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map((val, i) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4">
                  <val.icon className={`w-6 h-6 ${val.color}`} />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{val.title}</h3>
                <p className="text-sm text-text-secondary">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="heading-2 mb-4">
            Let&apos;s Work <span className="gradient-text">Together</span>
          </h2>
          <p className="body-large max-w-[500px] mx-auto mb-8">
            Got a project in mind? I&apos;d love to hear about it.
          </p>
          <Link href="/contact" className="btn-primary text-base">
            <span>Start a Conversation</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
