import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wrench, Menu, X, MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/useLanguage';

const navLinks = [
  { key: 'nav_home', href: '#home' },
  { key: 'nav_services', href: '#services' },
  { key: 'nav_why', href: '#why' },
  { key: 'nav_process', href: '#process' },
  { key: 'nav_tips', href: '#tips' },
  { key: 'nav_testimonials', href: '#testimonials' },
  { key: 'nav_faq', href: '#faq' },
  { key: 'nav_contact', href: '#contact' },
];

const WHATSAPP = 'https://wa.me/919110372978';

export default function Navbar() {
  const { t, lang, toggleLang } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a href="#home" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-[#FF5733] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <Wrench className="text-white w-5 h-5" />
              </div>
              <div className="leading-tight">
                <span className="block font-bold text-[#36454F] text-sm">Nivas Bike Repair</span>
                <span className="block text-[10px] text-[#FF5733] font-medium tracking-wide">Sundaragiri</span>
              </div>
            </a>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map(link => (
                <a
                  key={link.key}
                  href={link.href}
                  className="px-3 py-1.5 rounded-lg text-sm font-medium text-[#36454F] hover:text-[#FF5733] hover:bg-orange-50 transition-all"
                >
                  {t(link.key)}
                </a>
              ))}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              {/* Language toggle */}
              <button
                onClick={toggleLang}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#36454F]/20 text-xs font-semibold text-[#36454F] hover:border-[#FF5733] hover:text-[#FF5733] transition-all"
              >
                {lang === 'en' ? '🇮🇳 తెలుగు' : '🌐 English'}
              </button>
              {/* Book Now CTA */}
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noreferrer"
                className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FF5733] text-white text-sm font-semibold hover:bg-[#e04e2e] transition-all shadow-md hover:shadow-orange-200"
              >
                <MessageCircle className="w-4 h-4" />
                {t('nav_book')}
              </a>
              {/* Mobile menu toggle */}
              <button
                id="mobile-menu-btn"
                onClick={() => setOpen(!open)}
                className="lg:hidden p-2 rounded-xl text-[#36454F] hover:bg-orange-50 transition-colors"
              >
                {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <div className="absolute top-0 right-0 bottom-0 w-72 bg-white shadow-2xl flex flex-col p-6 gap-4">
              <div className="flex items-center justify-between mb-4">
                <span className="font-bold text-[#36454F] text-lg">Menu</span>
                <button onClick={() => setOpen(false)} className="p-1.5 rounded-lg hover:bg-gray-100">
                  <X className="w-5 h-5 text-[#36454F]" />
                </button>
              </div>
              {navLinks.map(link => (
                <a
                  key={link.key}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="py-2.5 px-3 rounded-xl text-base font-medium text-[#36454F] hover:text-[#FF5733] hover:bg-orange-50 transition-all"
                >
                  {t(link.key)}
                </a>
              ))}
              <div className="mt-4 border-t pt-4 flex flex-col gap-3">
                <button
                  onClick={() => { toggleLang(); setOpen(false); }}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-full border border-[#36454F]/20 text-sm font-semibold text-[#36454F] hover:border-[#FF5733] hover:text-[#FF5733] transition-all"
                >
                  {lang === 'en' ? '🇮🇳 తెలుగు' : '🌐 English'}
                </button>
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-[#FF5733] text-white text-sm font-bold hover:bg-[#e04e2e] transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  {t('nav_book')}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
