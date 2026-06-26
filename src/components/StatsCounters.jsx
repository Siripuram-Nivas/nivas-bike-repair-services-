import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

function Counter({ end, suffix = '+', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

const stats = [
  { numKey: 'stat1_num', labelKey: 'stat1_label', suffix: '+', color: '#FF5733' },
  { numKey: 'stat2_num', labelKey: 'stat2_label', suffix: '+', color: '#2563EB' },
  { numKey: 'stat3_num', labelKey: 'stat3_label', suffix: '+', color: '#FF5733' },
  { numKey: 'stat4_num', labelKey: 'stat4_label', suffix: '%', color: '#2563EB' },
];

export default function StatsCounters() {
  const { t } = useLanguage();

  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-orange-100 text-[#FF5733] text-sm font-semibold mb-4">
            By The Numbers
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#36454F] mb-4">{t('stats_title')}</h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">{t('stats_subtitle')}</p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.1, duration: 0.5, type: 'spring' }}
              className="text-center p-8 rounded-2xl border border-gray-100 card-shadow group hover:border-[#FF5733]/30 transition-all duration-300"
            >
              <div
                className="text-4xl sm:text-5xl font-black mb-2"
                style={{ color: s.color }}
              >
                <Counter end={parseInt(t(s.numKey))} suffix={s.suffix} />
              </div>
              <p className="text-[#36454F] font-semibold text-sm sm:text-base">{t(s.labelKey)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
