import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const pathname = headersList.get('x-next-pathname') || headersList.get('x-invoke-path') || '';
  
  // Skip auth check for the login page (proxy handles auth redirects)
  const isLoginPage = pathname.includes('/admin/login');
  if (isLoginPage) {
    return <>{children}</>;
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/admin/login');
  }

  // Get user profile to check role (optional, based on DB setup)
  const { data: profile } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single();

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <Topbar user={user} profile={profile} />
        <main className="flex-1 overflow-y-auto p-6 lg:p-8 bg-white/[0.01]">
          {children}
        </main>
      </div>
    </div>
  );
}

