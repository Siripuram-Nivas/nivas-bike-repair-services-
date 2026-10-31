import { useId, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, Plus } from 'lucide-react';
import { useLanguage } from '../context/useLanguage';
import { generalEnquiryUrl } from '../lib/whatsapp';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';

const faqItems = [
  { qKey: 'faq1_q', aKey: 'faq1_a' },
  { qKey: 'faq2_q', aKey: 'faq2_a' },
  { qKey: 'faq3_q', aKey: 'faq3_a' },
  { qKey: 'faq4_q', aKey: 'faq4_a' },
  { qKey: 'faq5_q', aKey: 'faq5_a' },
  { qKey: 'faq6_q', aKey: 'faq6_a' },
  { qKey: 'faq7_q', aKey: 'faq7_a' },
];

function FAQItem({ item, index, isOpen, onToggle }) {
  const { t } = useLanguage();
  const baseId = useId();
  const buttonId = `faq-button-${baseId}`;
  const panelId = `faq-panel-${baseId}`;

  return (
    <li className="border-b border-line">
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full items-start justify-between gap-4 py-5 text-left transition-colors hover:text-accent-dark"
        >
          <span className="flex gap-3">
            <span
              aria-hidden="true"
              className="mt-0.5 font-mono text-[0.6875rem] font-medium tracking-wider text-muted/70"
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="font-display text-[0.9375rem] font-bold leading-snug text-ink sm:text-[1rem]">
              {t(item.qKey)}
            </span>
          </span>
          <span
            aria-hidden="true"
            className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-colors ${
              isOpen
                ? 'border-accent bg-accent text-ink'
                : 'border-line text-graphite'
            }`}
          >
            <Plus
              className={`h-3.5 w-3.5 transition-transform duration-300 ${
                isOpen ? 'rotate-45' : ''
              }`}
            />
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 pl-8 pr-10 text-[0.875rem] leading-relaxed text-muted">
              {t(item.aKey)}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </li>
  );
}

export default function BikeFAQ() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="section-y scroll-mt-24 bg-white">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrowKey="faq_eyebrow"
              titleKey="faq_title"
              subtitleKey="faq_subtitle"
            />

            <Reveal delay={0.08}>
              <div className="mt-8 rounded-[10px] border border-line bg-cream p-5">
                <p className="font-display text-[0.9375rem] font-bold text-ink">
                  {t('faq_contact')}
                </p>
                <a
                  href={generalEnquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-dark mt-4 w-full !min-h-11 !text-sm"
                >
                  <MessageCircle aria-hidden="true" className="h-4 w-4" />
                  {t('faq_contact_cta')}
                  <span className="sr-only"> ({t('new_tab')})</span>
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.06}>
            <ul className="border-t border-line">
              {faqItems.map((item, index) => (
                <FAQItem
                  key={item.qKey}
                  item={item}
                  index={index}
                  isOpen={openIndex === index}
                  onToggle={() =>
                    setOpenIndex((current) => (current === index ? -1 : index))
                  }
                />
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
