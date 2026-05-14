import type { Metadata } from 'next';
import AdminLoginPage from './AdminLoginPage';

export const metadata: Metadata = {
  title: 'Admin Login',
  description: 'Login to Shivam Creates admin dashboard.',
};

export default function Page() {
  return <AdminLoginPage />;
}
