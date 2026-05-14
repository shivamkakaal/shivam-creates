'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
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

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-white/5 bg-[#050816] hidden md:flex flex-col">
      <div className="h-24 flex items-center px-6 border-b border-white/5 overflow-hidden">
        <Link href="/admin" className="relative h-16 w-56 -ml-2 scale-[1.8] origin-left mt-2">
          <Image 
            src="/images/logo-main.png" 
            alt="Shivam Creates Logo" 
            fill
            className="object-contain"
          />
        </Link>
      </div>

      <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-amber/10 text-amber'
                  : 'text-text-secondary hover:text-foreground hover:bg-white/5'
              }`}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5">
        <Link href="/" target="_blank" className="flex items-center gap-3 px-3 py-2 text-sm text-text-muted hover:text-foreground transition-colors">
          View Live Site
        </Link>
      </div>
    </aside>
  );
}
