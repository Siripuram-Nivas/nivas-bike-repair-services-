import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const testimonialKeys = [
  { nameKey: 'test1_name', textKey: 'test1_text', initials: 'RK' },
  { nameKey: 'test2_name', textKey: 'test2_text', initials: 'SB' },
  { nameKey: 'test3_name', textKey: 'test3_text', initials: 'AR' },
  { nameKey: 'test4_name', textKey: 'test4_text', initials: 'PR' },
];

const avatarColors = ['#FF5733', '#2563EB', '#059669', '#7c3aed'];

export default function MechanicTestimonials() {
  const { t } = useLanguage();
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent(c => (c === 0 ? testimonialKeys.length - 1 : c - 1));
  const next = () => setCurrent(c => (c === testimonialKeys.length - 1 ? 0 : c + 1));

  return (
    <section id="testimonials" className="section-padding" style={{ background: 'linear-gradient(135deg, #FFFDD0 0%, #fff9e6 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#FF5733]/10 text-[#FF5733] text-sm font-semibold mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#36454F] mb-4">{t('test_title')}</h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">{t('test_subtitle')}</p>
        </motion.div>

        {/* Cards grid (desktop) */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonialKeys.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-6 card-shadow border border-orange-50 flex flex-col gap-4 relative"
            >
              {/* Quote icon */}
              <Quote className="absolute top-4 right-4 w-8 h-8 text-[#FF5733]/10" />
              {/* Stars */}
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, si) => (
                  <Star key={si} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              {/* Text */}
              <p className="text-gray-600 text-sm leading-relaxed flex-1">"{t(item.textKey)}"</p>
              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                  style={{ backgroundColor: avatarColors[i] }}
                >
                  {item.initials}
                </div>
                <div>
                  <p className="font-bold text-[#36454F] text-sm">{t(item.nameKey)}</p>
                  <p className="text-gray-400 text-xs">Verified Customer</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Carousel (mobile) */}
        <div className="md:hidden relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.35 }}
              className="bg-white rounded-2xl p-6 card-shadow border border-orange-50"
            >
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, si) => (
                  <Star key={si} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-5">"{t(testimonialKeys[current].textKey)}"</p>
              <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                  style={{ backgroundColor: avatarColors[current] }}
                >
                  {testimonialKeys[current].initials}
                </div>
                <div>
                  <p className="font-bold text-[#36454F] text-sm">{t(testimonialKeys[current].nameKey)}</p>
                  <p className="text-gray-400 text-xs">Verified Customer</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-5">
            <button
              onClick={prev}
              id="testimonial-prev"
              className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-[#36454F] hover:bg-[#FF5733] hover:text-white transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            {testimonialKeys.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-all ${i === current ? 'bg-[#FF5733] w-5' : 'bg-gray-300'}`}
              />
            ))}
            <button
              onClick={next}
              id="testimonial-next"
              className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-[#36454F] hover:bg-[#FF5733] hover:text-white transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
