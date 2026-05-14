'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';
import { 
  LogOut, 
  User as UserIcon, 
  Menu, 
  X,
  LayoutDashboard, 
  Users, 
  Calendar, 
  Briefcase, 
  Layers, 
  Settings,
  MessageSquare,
  FileText,
  Image as ImageIcon
} from 'lucide-react';
import type { User } from '@supabase/supabase-js';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/leads', label: 'Leads', icon: Users },
  { href: '/admin/appointments', label: 'Appointments', icon: Calendar },
  { href: '/admin/portfolio', label: 'Portfolio', icon: Briefcase },
  { href: '/admin/services', label: 'Services', icon: Layers },
  { href: '/admin/blog', label: 'Blog', icon: FileText },
  { href: '/admin/media', label: 'Media', icon: ImageIcon },
  { href: '/admin/testimonials', label: 'Testimonials', icon: MessageSquare },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function Topbar({ user, profile }: { user: User, profile: any }) {
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <>
      <header className="h-16 border-b border-white/5 bg-[#050816] flex items-center justify-between px-4 lg:px-8 relative z-30">
        <div className="flex items-center gap-3">
          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden p-2 text-text-secondary hover:text-foreground transition-colors"
          >
            {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          
          {/* Mobile Logo */}
          <div className="md:hidden relative h-[24px] w-[90px]">
            <Image 
              src="/images/logo-main.png" 
              alt="Logo" 
              fill
              className="object-contain object-left"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 md:pl-4 md:border-l border-white/5">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-foreground">{profile?.full_name || user.email}</p>
              <p className="text-xs text-text-muted capitalize">{profile?.role || 'Admin'}</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
              <UserIcon className="w-4 h-4 text-text-secondary" />
            </div>
            <button
              onClick={handleSignOut}
              className="p-2 text-text-muted hover:text-red-400 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden pt-16"
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsMobileOpen(false)} />
            <motion.nav
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute left-0 top-16 bottom-0 w-[280px] bg-[#0a0f1e] border-r border-white/10 p-4 overflow-y-auto"
            >
              <div className="space-y-1">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileOpen(false)}
                      className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-amber/10 text-amber'
                          : 'text-text-secondary hover:text-foreground hover:bg-white/5'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
              <div className="mt-8 pt-4 border-t border-white/5">
                <Link 
                  href="/" 
                  target="_blank" 
                  className="flex items-center gap-3 px-3 py-3 text-sm text-text-muted hover:text-foreground transition-colors"
                >
                  View Live Site
                </Link>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
