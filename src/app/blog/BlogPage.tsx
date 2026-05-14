'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Calendar, Clock, Tag, Sparkles } from 'lucide-react';

import Image from 'next/image';

const CATEGORY_COLORS: Record<string, { color: string; bgColor: string; borderColor: string }> = {
  'development': { color: 'text-electric-blue', bgColor: 'from-electric-blue/20 to-cyan/10', borderColor: 'border-electric-blue/20' },
  'design': { color: 'text-purple', bgColor: 'from-purple/20 to-accent-pink/10', borderColor: 'border-purple/20' },
  'marketing': { color: 'text-cyan', bgColor: 'from-cyan/20 to-electric-blue/10', borderColor: 'border-cyan/20' },
  'branding': { color: 'text-accent-pink', bgColor: 'from-accent-pink/20 to-purple/10', borderColor: 'border-accent-pink/20' },
  'video': { color: 'text-neon-orange', bgColor: 'from-neon-orange/20 to-amber/10', borderColor: 'border-neon-orange/20' },
  'default': { color: 'text-amber', bgColor: 'from-amber/20 to-neon-orange/10', borderColor: 'border-amber/20' },
};

export default function BlogPage({ initialPosts }: { initialPosts: any[] }) {
  return (
    <section className="section-padding relative pt-32 lg:pt-40">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-32 -right-40 w-[500px] h-[500px] rounded-full bg-purple/8 blur-[140px]" />
        <div className="absolute bottom-60 -left-32 w-[400px] h-[400px] rounded-full bg-amber/6 blur-[120px]" />
      </div>

      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="caption mb-4 block">Blog</span>
          <h1 className="heading-1 mb-4">
            Insights &amp; <span className="gradient-text">Knowledge</span>
          </h1>
          <p className="body-large max-w-[600px] mx-auto">
            Tips, tutorials, and insights on web development, design, marketing, and growing your brand in the digital age.
          </p>
        </motion.div>

        {/* Coming Soon Notice */}
        {initialPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="card text-center mb-16 !py-8 border-amber/20"
          >
            <Sparkles className="w-8 h-8 text-amber mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Blog is Coming Soon!</h3>
            <p className="text-sm text-text-secondary max-w-[400px] mx-auto">
              We&apos;re writing some amazing content for you. Check back later for the latest insights.
            </p>
          </motion.div>
        )}

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {initialPosts.map((post, i) => {
            const normalizedCategory = post.category?.toLowerCase() || 'default';
            const style = CATEGORY_COLORS[normalizedCategory] || CATEGORY_COLORS['default'];

            return (
              <Link href={`/blog/${post.slug}`} key={post.id}>
                <motion.article
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="group card cursor-pointer hover:border-amber/20 h-full flex flex-col"
                >
                  {/* Thumbnail placeholder */}
                  <div className={`h-[160px] rounded-xl bg-gradient-to-br ${style.bgColor} mb-5 flex items-center justify-center overflow-hidden relative shrink-0`}>
                    {post.thumbnail_url ? (
                      <Image src={post.thumbnail_url} alt={post.title} fill className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105" />
                    ) : (
                      <span className="text-5xl font-black text-white/10 group-hover:text-white/20 transition-all duration-500 group-hover:scale-110">
                        {post.title[0]}
                      </span>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </div>

                  {/* Category Badge */}
                  <div className="flex items-center gap-2 mb-3 shrink-0">
                    <span className={`px-2.5 py-1 rounded-full bg-white/5 border ${style.borderColor} text-xs font-medium ${style.color}`}>
                      <Tag className="w-3 h-3 inline mr-1" />
                      {post.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-amber transition-colors duration-300">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-sm text-text-secondary line-clamp-3 mb-4 flex-1">
                    {post.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-xs text-text-muted mt-auto shrink-0">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.published_at || post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.read_time_minutes} min read
                    </span>
                  </div>

                  {/* Read More */}
                  <div className="mt-4 flex items-center gap-2 text-amber text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 shrink-0">
                    Read Article <ArrowRight className="w-4 h-4" />
                  </div>
                </motion.article>
              </Link>
            );
          })}
        </div>

        {/* Newsletter CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-20"
        >
          <h2 className="heading-2 mb-4">
            Want to <span className="gradient-text-amber">Stay Updated?</span>
          </h2>
          <p className="body-regular max-w-[400px] mx-auto mb-6">
            Follow us on social media for the latest tips and insights.
          </p>
          <Link href="/contact" className="btn-primary text-base">
            <span>Get in Touch</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
