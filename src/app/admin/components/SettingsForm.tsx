'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';
import { Loader2, Save, Globe, Mail, Phone, MapPin } from 'lucide-react';

export default function SettingsForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  const [settings, setSettings] = useState({
    site_name: 'Shivam Creates',
    contact_email: '',
    contact_phone: '',
    address: '',
    facebook_url: '',
    instagram_url: '',
    twitter_url: '',
    linkedin_url: '',
    whatsapp_number: '',
  });

  useEffect(() => {
    async function fetchSettings() {
      try {
        const { data, error } = await supabase
          .from('settings')
          .select('value')
          .eq('key', 'site_config')
          .single();

        if (error && error.code !== 'PGRST116') throw error;
        if (data) {
          setSettings(prev => ({ ...prev, ...data.value }));
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchSettings();
  }, [supabase]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('settings')
        .upsert({
          key: 'site_config',
          value: settings,
          category: 'general',
          updated_at: new Date().toISOString()
        }, { onConflict: 'key' });

      if (error) throw error;
      toast.success('Settings updated successfully!');
    } catch (error: any) {
      toast.error('Failed to update settings');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-amber" /></div>;
  }

  const inputClasses = 'w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-foreground text-sm focus:outline-none focus:border-amber/40 transition-all';
  const labelClasses = 'block text-sm font-medium text-text-secondary mb-2 flex items-center gap-2';

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* General Info */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Globe className="w-5 h-5 text-amber" /> General Information
          </h3>
          
          <div>
            <label className={labelClasses}>Site Name</label>
            <input type="text" name="site_name" value={settings.site_name} onChange={handleChange} className={inputClasses} />
          </div>

          <div>
            <label className={labelClasses}><Mail className="w-4 h-4" /> Contact Email</label>
            <input type="email" name="contact_email" value={settings.contact_email} onChange={handleChange} className={inputClasses} />
          </div>

          <div>
            <label className={labelClasses}><Phone className="w-4 h-4" /> Contact Phone</label>
            <input type="text" name="contact_phone" value={settings.contact_phone} onChange={handleChange} className={inputClasses} />
          </div>

          <div>
            <label className={labelClasses}><MapPin className="w-4 h-4" /> Office Address</label>
            <input type="text" name="address" value={settings.address} onChange={handleChange} className={inputClasses} />
          </div>
        </div>

        {/* Social Links */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Globe className="w-5 h-5 text-amber" /> Social Links
          </h3>

          <div>
            <label className={labelClasses}>Facebook URL</label>
            <input type="url" name="facebook_url" value={settings.facebook_url} onChange={handleChange} className={inputClasses} />
          </div>

          <div>
            <label className={labelClasses}>Instagram URL</label>
            <input type="url" name="instagram_url" value={settings.instagram_url} onChange={handleChange} className={inputClasses} />
          </div>

          <div>
            <label className={labelClasses}>Twitter URL</label>
            <input type="url" name="twitter_url" value={settings.twitter_url} onChange={handleChange} className={inputClasses} />
          </div>

          <div>
            <label className={labelClasses}>LinkedIn URL</label>
            <input type="url" name="linkedin_url" value={settings.linkedin_url} onChange={handleChange} className={inputClasses} />
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-6 border-t border-white/10">
        <button type="submit" disabled={isSubmitting} className="btn-primary">
          {isSubmitting ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
          ) : (
            <><Save className="w-4 h-4" /> Save Settings</>
          )}
        </button>
      </div>
    </form>
  );
}
