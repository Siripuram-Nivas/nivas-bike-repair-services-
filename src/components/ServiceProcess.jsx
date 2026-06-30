import React from 'react';
import { motion } from 'framer-motion';
import { Search, ScanLine, ClipboardList, Wrench, CheckCircle2, Bike } from 'lucide-react';
import { useLanguage } from '../context/useLanguage';

const steps = [
  { titleKey: 'p1_title', descKey: 'p1_desc', icon: Search },
  { titleKey: 'p2_title', descKey: 'p2_desc', icon: ScanLine },
  { titleKey: 'p3_title', descKey: 'p3_desc', icon: ClipboardList },
  { titleKey: 'p4_title', descKey: 'p4_desc', icon: Wrench },
  { titleKey: 'p5_title', descKey: 'p5_desc', icon: CheckCircle2 },
  { titleKey: 'p6_title', descKey: 'p6_desc', icon: Bike },
];

export default function ServiceProcess() {
  const { t } = useLanguage();

  return (
    <section id="process" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-[#2563EB] text-sm font-semibold mb-4">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#36454F] mb-4">{t('process_title')}</h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">{t('process_subtitle')}</p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-10 left-[8.33%] right-[8.33%] h-0.5 bg-gradient-to-r from-[#FF5733]/30 via-[#2563EB]/30 to-[#FF5733]/30" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isOrange = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: i * 0.12, duration: 0.5 }}
                  className="flex flex-col items-center text-center"
                >
                  {/* Icon circle */}
                  <div
                    className={`relative w-20 h-20 rounded-full flex items-center justify-center mb-4 shadow-lg border-4 border-white ${
                      isOrange ? 'bg-[#FF5733]' : 'bg-[#2563EB]'
                    }`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                    {/* Step number */}
                    <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#36454F] text-white text-xs font-bold flex items-center justify-center border-2 border-white">
                      {i + 1}
                    </span>
                  </div>

                  <h3 className="font-bold text-[#36454F] text-sm mb-1.5">{t(step.titleKey)}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{t(step.descKey)}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
