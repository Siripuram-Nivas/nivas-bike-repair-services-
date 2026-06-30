
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Settings, Zap, Droplets, AlertCircle, Wrench, Link2, X, MessageCircle, Phone } from 'lucide-react';
import { useLanguage } from '../context/useLanguage';

// ─── CONFIGURATION ─────────────────────────────────────────────────────────────
// Change this value to switch contact behaviour for all service cards at once.
// "popup"    → shows a modal with WhatsApp + Call options (recommended)
// "whatsapp" → opens WhatsApp directly with a pre-filled message
// "call"     → opens the phone dialer directly
const contactMode = 'popup';

const WHATSAPP_NUMBER = '919110372978'; // country code + number, no +
const CALL_NUMBER     = '+919110372978';
// ────────────────────────────────────────────────────────────────────────────────

const services = [
  { titleKey: 'svc1_title', descKey: 'svc1_desc', icon: Settings,    color: '#FF5733' },
  { titleKey: 'svc2_title', descKey: 'svc2_desc', icon: Zap,         color: '#2563EB' },
  { titleKey: 'svc3_title', descKey: 'svc3_desc', icon: Droplets,    color: '#059669' },
  { titleKey: 'svc4_title', descKey: 'svc4_desc', icon: AlertCircle, color: '#d97706' },
  { titleKey: 'svc5_title', descKey: 'svc5_desc', icon: Wrench,      color: '#7c3aed' },
  { titleKey: 'svc6_title', descKey: 'svc6_desc', icon: Link2,       color: '#0891b2' },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' }
  }),
};

function buildWhatsAppURL(serviceName) {
  const msg = encodeURIComponent(
    `Hello, I'm interested in ${serviceName}. Please provide more details.`
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
}

export default function BikeServices() {
  const { t } = useLanguage();
  const gridRef = useRef(null);
  const inView = useInView(gridRef, { once: true, margin: '-80px' });
  const [selectedService, setSelectedService] = useState(null); // null = modal closed
  const modalRef = useRef(null);
  const firstBtnRef = useRef(null);

  /* ── Close on Escape key ── */
  useEffect(() => {
    if (!selectedService) return;
    function onKey(e) {
      if (e.key === 'Escape') setSelectedService(null);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedService]);

  /* ── Focus first button when modal opens ── */
  useEffect(() => {
    if (selectedService) {
      setTimeout(() => firstBtnRef.current?.focus(), 50);
    }
  }, [selectedService]);

  /* ── Focus trap inside modal ── */
  function handleModalKeyDown(e) {
    if (e.key !== 'Tab' || !modalRef.current) return;
    const focusable = modalRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus(); }
    } else {
      if (document.activeElement === last)  { e.preventDefault(); first.focus(); }
    }
  }

  function onCardClick(serviceName) {
    if (contactMode === 'popup') {
      setSelectedService(serviceName);
    } else if (contactMode === 'whatsapp') {
      window.open(buildWhatsAppURL(serviceName), '_blank');
    } else if (contactMode === 'call') {
      window.open(`tel:${CALL_NUMBER}`);
    }
  }

  function onWhatsApp() {
    const message = `Hello, I'm interested in ${selectedService}. Please provide more details.`;
    const whatsappUrl = `https://wa.me/919110372978?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setSelectedService(null);
  }

  function onCall() {
    window.location.assign(`tel:${CALL_NUMBER}`);
    setSelectedService(null);
  }

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
          <span className="inline-block px-4 py-1.5 rounded-full bg-orange-100 text-brand-orange text-sm font-semibold mb-4">
            What We Do
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-charcoal mb-4">{t('services_title')}</h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">{t('services_subtitle')}</p>
        </motion.div>

        {/* Grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc, i) => {
            const Icon = svc.icon;
            const title = t(svc.titleKey);
            return (
              <motion.div
                key={i}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                whileHover={{ y: -6, boxShadow: `0 12px 32px ${svc.color}22` }}
                onClick={() => onCardClick(title)}
                role="button"
                tabIndex={0}
                aria-label={`Book ${title}`}
                onKeyDown={(e) => e.key === 'Enter' && onCardClick(title)}
                className="group relative bg-white rounded-2xl p-7 border border-gray-100 card-shadow cursor-pointer transition-all duration-300"
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

                <h3 className="text-lg font-bold text-brand-charcoal mb-2">{title}</h3>
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

      {/* ── Contact Popup Modal ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedService && (
          // Backdrop — clicking the dark area closes the modal
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            style={{ backdropFilter: 'blur(6px)', background: 'rgba(0,0,0,0.45)' }}
            onClick={() => setSelectedService(null)}
            aria-hidden="true"
          >
            {/* Modal card — stopPropagation keeps backdrop onClick from firing */}
            <motion.div
              key="modal"
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              onKeyDown={handleModalKeyDown}
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1,    y: 0  }}
              exit={{   opacity: 0, scale: 0.92, y: 24  }}
              transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white w-full max-w-sm rounded-2xl shadow-2xl p-8 relative"
            >
              {/* Close ✕ */}
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
                aria-label="Close popup"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Title */}
              <h3 id="modal-title" className="text-xl font-extrabold text-brand-charcoal mb-2">
                Need This Service?
              </h3>

              {/* Subtitle */}
              <p className="text-sm text-gray-500 mb-1">
                You selected:{' '}
                <span className="font-semibold text-gray-700">{selectedService}</span>
              </p>
              <p className="text-sm text-gray-400 mb-7">
                Choose how you'd like to contact us.
              </p>

              {/* Action buttons */}
              <div className="flex flex-col gap-3">
                {/* WhatsApp */}
                <button
                  ref={firstBtnRef}
                  onClick={onWhatsApp}
                  className="flex items-center gap-3 w-full px-5 py-4 rounded-xl font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-green-400"
                  style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)' }}
                >
                  <MessageCircle className="w-5 h-5 shrink-0" />
                  WhatsApp Mechanic
                </button>

                {/* Call */}
                <button
                  onClick={onCall}
                  className="flex items-center gap-3 w-full px-5 py-4 rounded-xl font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-orange-400"
                  style={{ background: 'linear-gradient(135deg, #FF5733, #c0392b)' }}
                >
                  <Phone className="w-5 h-5 shrink-0" />
                  Call Now
                </button>

                {/* Cancel */}
                <button
                  onClick={() => setSelectedService(null)}
                  className="w-full px-5 py-3 rounded-xl font-semibold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  ✖ Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
