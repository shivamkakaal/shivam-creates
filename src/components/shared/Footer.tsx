import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, Mail, Phone, MapPin } from 'lucide-react';
import { NAV_LINKS, SOCIAL_LINKS as FALLBACK_SOCIAL, CONTACT as FALLBACK_CONTACT } from '@/lib/constants';
import { createClient } from '@supabase/supabase-js';

export default async function Footer() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data } = await supabase.from('settings').select('value').eq('key', 'site_config').single();
  const settings = data?.value || {};

  const dynamicSocialLinks = [];
  if (settings.facebook_url) dynamicSocialLinks.push({ name: 'Facebook', url: settings.facebook_url });
  if (settings.instagram_url) dynamicSocialLinks.push({ name: 'Instagram', url: settings.instagram_url });
  if (settings.twitter_url) dynamicSocialLinks.push({ name: 'Twitter', url: settings.twitter_url });
  if (settings.linkedin_url) dynamicSocialLinks.push({ name: 'LinkedIn', url: settings.linkedin_url });

  const socialLinksToUse = dynamicSocialLinks.length > 0 ? dynamicSocialLinks : FALLBACK_SOCIAL;

  const contactEmail = settings.contact_email || FALLBACK_CONTACT.email;
  const contactPhone = settings.contact_phone || FALLBACK_CONTACT.phone;
  const contactAddress = settings.address || FALLBACK_CONTACT.location;
  const whatsappUrl = settings.whatsapp_number 
    ? `https://wa.me/${settings.whatsapp_number.replace(/\D/g, '')}?text=Hi%20Shivam!`
    : FALLBACK_CONTACT.whatsappUrl;

  return (
    <footer className="relative border-t border-white/5">
      {/* Gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber/50 to-transparent" />

      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1 flex flex-col items-center text-center lg:items-start lg:text-left">
            <Link href="/" className="block -mt-6 -mb-6 lg:-mt-10 lg:-mb-10 flex justify-center lg:justify-start w-full">
              <div className="relative h-[140px] w-[320px] lg:h-[180px] lg:w-[420px]">
                <Image 
                  src="/images/logo-main.png" 
                  alt="Shivam Creates Logo" 
                  fill
                  className="object-contain object-center lg:object-left mix-blend-screen"
                />
              </div>
            </Link>
            <p className="text-text-secondary text-sm leading-relaxed mb-6 max-w-[280px]">
              Premium digital creative agency delivering world-class design and development for ambitious brands.
            </p>
            {/* Social Links */}
            <div className="flex gap-3 justify-center lg:justify-start">
              {socialLinksToUse.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center text-text-secondary hover:text-purple hover:border-purple/30 hover:bg-purple/5 transition-all duration-300"
                  aria-label={social.name}
                >
                  <span className="text-xs font-bold">{social.name[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links & Services */}
          <div className="md:col-span-2 grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">Quick Links</h4>
              <ul className="space-y-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-secondary hover:text-purple transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">Services</h4>
              <ul className="space-y-3">
                {['Web Development', 'App Development', 'Video Editing', 'Branding', 'Digital Marketing', 'UI/UX Design'].map((service) => (
                  <li key={service}>
                    <Link
                      href="/services"
                      className="text-sm text-text-secondary hover:text-purple transition-colors duration-300"
                    >
                      {service}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">Contact</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href={`mailto:${contactEmail}`}
                  className="flex items-center gap-3 text-sm text-text-secondary hover:text-purple transition-colors duration-300"
                >
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  {contactEmail}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${contactPhone.replace(/\s/g, '')}`}
                  className="flex items-center gap-3 text-sm text-text-secondary hover:text-purple transition-colors duration-300"
                >
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  {contactPhone}
                </a>
              </li>
              <li>
                <div className="flex items-center gap-3 text-sm text-text-secondary">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  {contactAddress}
                </div>
              </li>
            </ul>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-green-600/10 border border-green-600/20 text-green-400 text-sm font-medium hover:bg-green-600/20 transition-colors duration-300"
            >
              💬 WhatsApp Us
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted">
            © {new Date().getFullYear()} Shivam Creates. All rights reserved.
          </p>
          <p className="text-xs text-text-muted">
            Crafted with 💜 in Jammu & Kashmir, India
          </p>
        </div>
      </div>
    </footer>
  );
}
