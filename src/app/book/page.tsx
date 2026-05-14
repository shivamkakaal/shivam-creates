import type { Metadata } from 'next';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import BookingPage from './BookingPage';

export const metadata: Metadata = {
  title: 'Book a Free Call',
  description:
    'Schedule a free 30-minute discovery call with Shivam Creates. Discuss your project, get a quote, and start building your dream digital product.',
};

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <BookingPage />
      </main>
      <Footer />
    </>
  );
}
