'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowLeft, Tag } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';

export default function BlogPostContent({ post }: { post: any }) {
  const publishedDate = new Date(post.published_at || post.created_at).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <article className="section-padding relative pt-32 lg:pt-40 min-h-screen">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-purple/10 blur-[120px] pointer-events-none rounded-full" />
      
      <div className="relative max-w-[800px] mx-auto px-6 lg:px-8">
        
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link href="/blog" className="inline-flex items-center text-sm font-medium text-text-secondary hover:text-amber transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
        </motion.div>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-amber">
              <Tag className="w-3 h-3 inline mr-1.5" />
              {post.category}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-text-muted">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber to-neon-orange flex items-center justify-center text-white font-bold">
                {post.author_name ? post.author_name[0] : 'S'}
              </div>
              <span className="font-medium text-text-secondary">{post.author_name || 'Shivam Creates'}</span>
            </div>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {publishedDate}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {post.read_time_minutes} min read
            </span>
          </div>
        </motion.header>

        {/* Hero Image */}
        {post.thumbnail_url && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="w-full aspect-video md:aspect-[21/9] rounded-2xl overflow-hidden mb-12 border border-white/5 shadow-2xl relative"
          >
            <Image 
              src={post.thumbnail_url} 
              alt={post.title}
              fill
              priority
              className="object-cover"
            />
          </motion.div>
        )}

        {/* Content Wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="prose prose-invert prose-amber max-w-none prose-headings:font-bold prose-h2:text-3xl prose-h2:mt-12 prose-h3:text-2xl prose-a:text-amber prose-a:no-underline hover:prose-a:text-neon-orange prose-img:rounded-xl prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10"
        >
          <ReactMarkdown>
            {post.content}
          </ReactMarkdown>
        </motion.div>

        {/* Tags Footer */}
        {post.tags && post.tags.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16 pt-8 border-t border-white/10"
          >
            <h4 className="text-sm font-semibold text-text-secondary mb-4 uppercase tracking-wider">Tags</h4>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag: string) => (
                <span key={tag} className="px-3 py-1.5 rounded-lg bg-white/5 text-xs text-text-muted hover:text-foreground transition-colors cursor-default">
                  #{tag}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </article>
  );
}
