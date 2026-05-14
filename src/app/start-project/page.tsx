import type { Metadata } from 'next';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import StartProjectPage from './StartProjectPage';

export const metadata: Metadata = {
  title: 'Start a Project',
  description:
    'Tell us about your project — goals, timeline, budget, and vision. Fill out the smart requirement form and get a custom quote within 24 hours.',
};

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <StartProjectPage />
      </main>
      <Footer />
    </>
  );
}
