
import { motion } from 'framer-motion';
import { MessageCircle, Phone, MapPin, Clock } from 'lucide-react';
import { useLanguage } from '../context/useLanguage';

const WHATSAPP = 'https://wa.me/919110372978?text=Hi%2C%20I%20would%20like%20to%20book%20a%20bike%20service.';
const PHONE = 'tel:+919110372978';

export default function Contact() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="section-padding" style={{ background: 'linear-gradient(135deg, #36454F 0%, #2a3940 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left: Text + CTAs */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/80 text-sm font-semibold mb-6">
              Contact Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">{t('contact_title')}</h2>
            <p className="text-white/60 text-lg mb-8 leading-relaxed">{t('contact_subtitle')}</p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noreferrer"
                id="contact-whatsapp-btn"
                className="flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-[#25D366] text-white font-bold text-base hover:bg-[#1fb858] transition-all shadow-lg hover:scale-105 active:scale-95"
              >
                <MessageCircle className="w-5 h-5" />
                {t('contact_whatsapp')}
              </a>
              <a
                href={PHONE}
                id="contact-call-btn"
                className="flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl border-2 border-white/30 text-white font-bold text-base hover:border-white hover:bg-white/10 transition-all"
              >
                <Phone className="w-5 h-5" />
                {t('contact_call')}
              </a>
            </div>
          </motion.div>

          {/* Right: Info card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-3xl p-8 flex flex-col gap-6"
          >
            {/* Location */}
            <a
              href="https://maps.google.com/?q=55VX%2BVRM+Sundaragiri+Telangana+505467"
              target="_blank"
              rel="noreferrer"
              id="contact-location-link"
              className="flex items-start gap-4 group"
            >
              <div className="w-11 h-11 rounded-xl bg-brand-orange/20 flex items-center justify-center shrink-0 group-hover:bg-brand-orange/40 transition-colors">
                <MapPin className="w-5 h-5 text-brand-orange" />
              </div>
              <div>
                <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Location</p>
                <p className="text-white font-semibold group-hover:text-brand-orange transition-colors">{t('contact_address')}</p>
                <p className="text-white/40 text-xs mt-0.5">55VX+VRM, Sundaragiri, Telangana 505467</p>
              </div>
            </a>

            {/* Hours */}
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-brand-blue/20 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-brand-blue" />
              </div>
              <div>
                <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Working Hours</p>
                <p className="text-white font-semibold">{t('contact_hours')}</p>
                <p className="text-white/50 text-sm mt-0.5">Sunday: By Appointment</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-[#25D366]/20 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-[#25D366]" />
              </div>
              <div>
                <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Phone / WhatsApp</p>
                <a href={PHONE} className="text-white font-semibold hover:text-brand-orange transition-colors">
                  +91 91103 72978
                </a>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-white/10" />

            {/* Map link */}
            <a
              href="https://maps.google.com/?q=55VX%2BVRM+Sundaragiri+Telangana+505467"
              target="_blank"
              rel="noreferrer"
              id="contact-map-link"
              className="rounded-xl overflow-hidden bg-white/5 h-36 flex items-center justify-center border border-white/10 hover:border-brand-orange/50 hover:bg-white/10 transition-all group cursor-pointer"
            >
              <div className="text-center">
                <MapPin className="w-8 h-8 text-brand-orange/60 mx-auto mb-2 group-hover:text-brand-orange group-hover:scale-110 transition-all" />
                <p className="text-white/60 text-sm font-semibold">Sundaragiri, Telangana 505467</p>
                <p className="text-brand-orange/70 text-xs mt-1 group-hover:text-brand-orange transition-colors">📍 View on Google Maps →</p>
              </div>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
