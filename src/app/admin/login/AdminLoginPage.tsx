'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';
import { Loader2, Lock, Mail, ArrowRight } from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      toast.success('Login successful!');
      router.push('/admin');
      router.refresh();
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.message || 'Invalid login credentials');
    } finally {
      setIsLoading(false);
    }
  };

  const inputClasses =
    'w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-foreground text-sm placeholder:text-text-muted focus:outline-none focus:border-amber/40 focus:bg-white/[0.06] transition-all duration-300';

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background px-6">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-[400px] h-[400px] rounded-full bg-purple/10 blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] rounded-full bg-amber/10 blur-[120px]" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-2xl font-bold text-foreground font-jetbrains tracking-tight mb-2">
            SHIVAM <span className="gradient-text-amber">CREATES</span>
          </h1>
          <p className="text-text-secondary text-sm">Secure Admin Portal</p>
        </div>

        <form onSubmit={handleLogin} className="card !p-8">
          <h2 className="text-xl font-semibold text-foreground mb-6">Welcome Back</h2>

          <div className="space-y-4 mb-8">
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-text-muted" />
              <input
                type="email"
                required
                placeholder="Admin Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClasses}
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-text-muted" />
              <input
                type="password"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClasses}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <p className="text-center text-xs text-text-muted mt-8">
          &copy; {new Date().getFullYear()} Shivam Creates. All rights reserved.
        </p>
      </div>
    </div>
  );
}
