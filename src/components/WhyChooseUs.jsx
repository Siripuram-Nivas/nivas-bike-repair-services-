import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, DollarSign, Clock, Star, Award, Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const features = [
  { titleKey: 'why1_title', descKey: 'why1_desc', icon: ShieldCheck },
  { titleKey: 'why2_title', descKey: 'why2_desc', icon: DollarSign },
  { titleKey: 'why3_title', descKey: 'why3_desc', icon: Clock },
  { titleKey: 'why4_title', descKey: 'why4_desc', icon: Star },
  { titleKey: 'why5_title', descKey: 'why5_desc', icon: Award },
  { titleKey: 'why6_title', descKey: 'why6_desc', icon: Heart },
];

export default function WhyChooseUs() {
  const { t } = useLanguage();

  return (
    <section id="why" className="section-padding" style={{ background: 'linear-gradient(135deg, #FFFDD0 0%, #fff9e6 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#FF5733]/10 text-[#FF5733] text-sm font-semibold mb-4">
            Our Promise
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#36454F] mb-4">{t('why_title')}</h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">{t('why_subtitle')}</p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -4 }}
                className="flex gap-4 p-6 bg-white rounded-2xl card-shadow border border-orange-50 group transition-all duration-300"
              >
                <div className="shrink-0 w-12 h-12 rounded-xl bg-[#FF5733]/10 flex items-center justify-center group-hover:bg-[#FF5733] transition-colors">
                  <Icon className="w-6 h-6 text-[#FF5733] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="font-bold text-[#36454F] mb-1 text-base">{t(f.titleKey)}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{t(f.descKey)}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
