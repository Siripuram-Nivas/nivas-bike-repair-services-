
import { Wrench, MessageCircle, MapPin, Phone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const WHATSAPP = 'https://wa.me/919110372978';

const quickLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Why Choose Us', href: '#why' },
  { label: 'Service Process', href: '#process' },
  { label: 'Bike Care Tips', href: '#tips' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'FAQ', href: '#faq' },
];

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#1a2830] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-brand-orange flex items-center justify-center">
                <Wrench className="text-white w-5 h-5" />
              </div>
              <div className="leading-tight">
                <span className="block font-bold text-white text-sm">Nivas Bike Repair</span>
                <span className="block text-[10px] text-brand-orange font-medium tracking-wide">Sundaragiri</span>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-5">{t('footer_tagline')}</p>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#25D366] text-white text-sm font-semibold hover:bg-[#1fb858] transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Us
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-5 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map(link => (
                <li key={link.href}>
                  <a href={link.href} className="text-white/50 text-sm hover:text-brand-orange transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-white mb-5 text-sm uppercase tracking-wider">Services</h4>
            <ul className="flex flex-col gap-2.5">
              {['Complete Servicing', 'Engine Overhaul', 'Oil Change', 'Brake Repair', 'Maintenance', 'Tyre Replacement'].map(s => (
                <li key={s}>
                  <span className="text-white/50 text-sm">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white mb-5 text-sm uppercase tracking-wider">Contact</h4>
            <div className="flex flex-col gap-4">
              <a
                href="https://maps.google.com/?q=55VX%2BVRM+Sundaragiri+Telangana+505467"
                target="_blank"
                rel="noreferrer"
                id="footer-location-link"
                className="flex items-start gap-3 group"
              >
                <MapPin className="w-4 h-4 text-brand-orange mt-0.5 shrink-0" />
                <p className="text-white/50 text-sm group-hover:text-brand-orange transition-colors">{t('contact_address')}</p>
              </a>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-brand-orange shrink-0" />
                <a href="tel:+919110372978" className="text-white/50 text-sm hover:text-white transition-colors">
                  +91 91103 72978
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <a href={WHATSAPP} target="_blank" rel="noreferrer" className="text-white/50 text-sm hover:text-white transition-colors">
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">{t('footer_rights')}</p>
          <p className="text-white/30 text-xs">Made with ❤️ for Sundaragiri</p>
        </div>
      </div>
    </footer>
  );
}
