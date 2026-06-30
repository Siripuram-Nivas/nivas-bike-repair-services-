import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, ChevronDown, Shield, Clock, ThumbsUp } from 'lucide-react';
import { useLanguage } from '../context/useLanguage';

const WHATSAPP = 'https://wa.me/919110372978?text=Hi%2C%20I%20would%20like%20to%20book%20a%20bike%20service.';

const badges = [
  { numKey: 'hero_badge1', subKey: 'hero_badge1_sub', icon: Shield },
  { numKey: 'hero_badge2', subKey: 'hero_badge2_sub', icon: ThumbsUp },
  { numKey: 'hero_badge3', subKey: 'hero_badge3_sub', icon: Clock },
];

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #36454F 0%, #2a3940 50%, #1a2830 100%)' }}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/hero_mechanic.png"
          alt="Bike mechanic at work"
          className="w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a2830]/95 via-[#36454F]/80 to-[#36454F]/40" />
      </div>

      {/* Decorative circles */}
      <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-[#FF5733]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-48 h-48 rounded-full bg-[#2563EB]/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40">
        <div className="max-w-3xl">
          {/* Tag pill */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FF5733]/20 border border-[#FF5733]/40 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[#FF5733] animate-pulse" />
            <span className="text-[#FF5733] text-sm font-semibold tracking-wide">Sundaragiri's #1 Bike Mechanic</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-4"
          >
            {t('hero_title')}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl sm:text-2xl font-semibold text-[#FF5733] mb-4"
          >
            {t('hero_subtitle')}
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-white/70 mb-10 max-w-xl leading-relaxed"
          >
            {t('hero_desc')}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-4 mb-14"
          >
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              id="hero-book-cta"
              className="flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#FF5733] text-white font-bold text-base hover:bg-[#e04e2e] transition-all shadow-lg shadow-orange-700/30 hover:shadow-orange-700/50 hover:scale-105 active:scale-95"
            >
              <MessageCircle className="w-5 h-5" />
              {t('hero_cta')}
            </a>
            <a
              href="#services"
              id="hero-services-link"
              className="flex items-center gap-2.5 px-7 py-3.5 rounded-full border-2 border-white/30 text-white font-semibold text-base hover:border-white hover:bg-white/10 transition-all"
            >
              {t('hero_cta2')}
            </a>
          </motion.div>

          {/* Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            {badges.map((b, i) => {
              const Icon = b.icon;
              return (
                <div
                  key={i}
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#FF5733]/30 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#FF5733]" />
                  </div>
                  <div>
                    <div className="font-bold text-white text-base leading-tight">{t(b.numKey)}</div>
                    <div className="text-white/60 text-xs">{t(b.subKey)}</div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/40"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
