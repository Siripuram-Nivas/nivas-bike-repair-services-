import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { services } from '../config/business';
import { useBooking } from '../context/useBooking';
import { useLanguage } from '../context/useLanguage';
import { generalEnquiryUrl } from '../lib/whatsapp';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';

const inr = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

export default function Pricing() {
  const { t } = useLanguage();
  const { openBooking } = useBooking();

  const notes = ['pricing_note_1', 'pricing_note_2', 'pricing_note_3', 'pricing_note_4'];

  return (
    <section id="pricing" className="section-y scroll-mt-24 bg-ink text-white">
      <div className="container-page">
        <SectionHeading
          eyebrowKey="pricing_eyebrow"
          titleKey="pricing_title"
          subtitleKey="pricing_subtitle"
          dark
        />

        <div className="mt-10 grid gap-10 lg:mt-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <Reveal>
            <ul className="border-t border-white/12">
              {services.map((service) => (
                <li
                  key={service.id}
                  className="border-b border-white/12 py-5"
                >
                  <div className="flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                    <h3 className="font-display text-[1.0625rem] font-bold leading-snug text-white">
                      {t(service.nameKey)}
                    </h3>
                    <p
                      className={`shrink-0 text-sm font-semibold ${
                        service.price !== null ? 'text-white' : 'text-accent-light'
                      }`}
                    >
                      {service.price !== null
                        ? `${t('pricing_from')} ${inr.format(service.price)}`
                        : t('price_estimate')}
                    </p>
                  </div>

                  <p className="mt-1 max-w-xl text-[0.8125rem] leading-relaxed text-white/50">
                    {t(service.descKey)}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
                    <span className="text-[0.6875rem] uppercase tracking-[0.12em] text-white/50">
                      {t('price_after_inspection')}
                    </span>
                    <button
                      type="button"
                      onClick={() => openBooking(service.id)}
                      aria-label={`${t('pricing_cta')}: ${t(service.nameKey)}`}
                      className="inline-flex min-h-8 items-center gap-1.5 text-[0.8125rem] font-semibold text-accent transition-colors hover:text-accent-light"
                    >
                      {t('pricing_cta')}
                      <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-[10px] border border-white/12 bg-graphite p-6 sm:p-7 lg:sticky lg:top-28">
              <h3 className="font-display text-lg font-bold text-white">
                {t('pricing_note_title')}
              </h3>

              <ol className="mt-5 space-y-4">
                {notes.map((note, index) => (
                  <li key={note} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-accent/40 font-mono text-[0.625rem] font-semibold text-accent-light"
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <p className="text-[0.875rem] leading-relaxed text-white/65">
                      {t(note)}
                    </p>
                  </li>
                ))}
              </ol>

              <p className="mt-5 border-t border-white/10 pt-5 text-[0.8125rem] leading-relaxed text-white/55">
                {t('pricing_disclaimer')}
              </p>

              <a
                href={generalEnquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary mt-6 w-full"
              >
                <MessageCircle aria-hidden="true" className="h-[18px] w-[18px]" />
                {t('contact_whatsapp')}
                <span className="sr-only"> ({t('new_tab')})</span>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
