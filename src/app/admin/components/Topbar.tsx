'use client';

import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { LogOut, User as UserIcon } from 'lucide-react';
import type { User } from '@supabase/supabase-js';

export default function Topbar({ user, profile }: { user: User, profile: any }) {
  const router = useRouter();
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <header className="h-16 border-b border-white/5 bg-[#050816] flex items-center justify-between px-6 lg:px-8">
      <div className="flex items-center gap-4">
        {/* Mobile menu toggle could go here */}
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 pl-4 border-l border-white/5">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-foreground">{profile?.full_name || user.email}</p>
            <p className="text-xs text-text-muted capitalize">{profile?.role || 'Admin'}</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
            <UserIcon className="w-4 h-4 text-text-secondary" />
          </div>
          <button
            onClick={handleSignOut}
            className="ml-2 p-2 text-text-muted hover:text-red-400 transition-colors"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
