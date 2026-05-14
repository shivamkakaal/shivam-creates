import type { Metadata } from 'next';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import ContactPage from './ContactPage';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Shivam Creates. Book a free discovery call, request a quote, or reach out via WhatsApp, email, or phone.',
};

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <ContactPage />
      </main>
      <Footer />
    </>
  );
}
