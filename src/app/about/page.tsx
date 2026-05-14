import type { Metadata } from 'next';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import AboutPage from './AboutPage';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Meet Shivam — a passionate digital creator from Jammu & Kashmir, India. Learn about the story, skills, and vision behind Shivam Creates.',
};

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <AboutPage />
      </main>
      <Footer />
    </>
  );
}
