import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Settings, Zap, Droplets, AlertCircle, Wrench, Circle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const services = [
  { titleKey: 'svc1_title', descKey: 'svc1_desc', icon: Settings, color: '#FF5733' },
  { titleKey: 'svc2_title', descKey: 'svc2_desc', icon: Zap, color: '#2563EB' },
  { titleKey: 'svc3_title', descKey: 'svc3_desc', icon: Droplets, color: '#059669' },
  { titleKey: 'svc4_title', descKey: 'svc4_desc', icon: AlertCircle, color: '#d97706' },
  { titleKey: 'svc5_title', descKey: 'svc5_desc', icon: Wrench, color: '#7c3aed' },
  { titleKey: 'svc6_title', descKey: 'svc6_desc', icon: Circle, color: '#0891b2' },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' }
  }),
};

export default function BikeServices() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="services" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-orange-100 text-[#FF5733] text-sm font-semibold mb-4">
            What We Do
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#36454F] mb-4">{t('services_title')}</h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">{t('services_subtitle')}</p>
        </motion.div>

        {/* Grid */}
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc, i) => {
            const Icon = svc.icon;
            return (
              <motion.div
                key={i}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                whileHover={{ y: -6, boxShadow: `0 12px 32px ${svc.color}22` }}
                className="group relative bg-white rounded-2xl p-7 border border-gray-100 card-shadow cursor-default transition-all duration-300"
              >
                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${svc.color}15` }}
                >
                  <Icon className="w-7 h-7" style={{ color: svc.color }} />
                </div>

                {/* Number badge */}
                <span
                  className="absolute top-5 right-5 text-5xl font-black opacity-5 select-none"
                  style={{ color: svc.color }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                <h3 className="text-lg font-bold text-[#36454F] mb-2">{t(svc.titleKey)}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{t(svc.descKey)}</p>

                {/* Bottom accent */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: `linear-gradient(90deg, ${svc.color}, ${svc.color}88)` }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
