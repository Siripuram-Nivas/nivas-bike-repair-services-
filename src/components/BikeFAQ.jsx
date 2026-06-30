import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/useLanguage';

const faqKeys = [
  { qKey: 'faq1_q', aKey: 'faq1_a' },
  { qKey: 'faq2_q', aKey: 'faq2_a' },
  { qKey: 'faq3_q', aKey: 'faq3_a' },
  { qKey: 'faq4_q', aKey: 'faq4_a' },
];

function FAQItem({ qKey, aKey, index }) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
        open ? 'border-[#FF5733]/40 shadow-md shadow-orange-100' : 'border-gray-200 hover:border-[#FF5733]/20'
      }`}
    >
      <button
        id={`faq-item-${index}`}
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left bg-white hover:bg-orange-50/30 transition-colors"
      >
        <span className="font-semibold text-[#36454F] text-sm sm:text-base">{t(qKey)}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
            open ? 'bg-[#FF5733] text-white' : 'bg-gray-100 text-gray-500'
          }`}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden bg-white"
          >
            <p className="px-6 pb-5 text-gray-500 text-sm leading-relaxed border-t border-gray-100 pt-4">
              {t(aKey)}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function BikeFAQ() {
  const { t } = useLanguage();

  return (
    <section id="faq" className="section-padding bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-orange-100 text-[#FF5733] text-sm font-semibold mb-4">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#36454F] mb-4">{t('faq_title')}</h2>
          <p className="text-gray-500 text-lg">{t('faq_subtitle')}</p>
        </motion.div>

        {/* Accordion */}
        <div className="flex flex-col gap-4">
          {faqKeys.map((item, i) => (
            <FAQItem key={i} qKey={item.qKey} aKey={item.aKey} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
