import React from 'react';
import { motion } from 'framer-motion';
import { CalendarCheck, Gauge, Link2, FlaskConical } from 'lucide-react';
import { useLanguage } from '../context/useLanguage';

const tips = [
  { titleKey: 'tip1_title', descKey: 'tip1_desc', icon: CalendarCheck, gradient: 'from-orange-500 to-orange-400' },
  { titleKey: 'tip2_title', descKey: 'tip2_desc', icon: Gauge, gradient: 'from-blue-600 to-blue-400' },
  { titleKey: 'tip3_title', descKey: 'tip3_desc', icon: Link2, gradient: 'from-emerald-600 to-emerald-400' },
  { titleKey: 'tip4_title', descKey: 'tip4_desc', icon: FlaskConical, gradient: 'from-amber-600 to-amber-400' },
];

export default function BikeCareTips() {
  const { t } = useLanguage();

  return (
    <section id="tips" className="section-padding" style={{ background: 'linear-gradient(135deg, #36454F 0%, #2a3940 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/80 text-sm font-semibold mb-4">
            Pro Tips
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">{t('tips_title')}</h2>
          <p className="text-white/60 text-lg max-w-xl mx-auto">{t('tips_subtitle')}</p>
        </motion.div>

        {/* Tips grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tips.map((tip, i) => {
            const Icon = tip.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -6 }}
                className="group bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tip.gradient} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-white text-base mb-2">{t(tip.titleKey)}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{t(tip.descKey)}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
