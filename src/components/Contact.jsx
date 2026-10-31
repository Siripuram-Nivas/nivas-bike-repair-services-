import {
  ArrowUpRight,
  Clock,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
} from 'lucide-react';
import { business } from '../config/business';
import { generalEnquiryUrl } from '../lib/whatsapp';
import { useLanguage } from '../context/useLanguage';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';

export default function Contact() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="section-y scroll-mt-24 bg-cream">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrowKey="contact_eyebrow"
              titleKey="contact_title"
              subtitleKey="contact_subtitle"
            />

            <Reveal delay={0.06}>
              <div className="mt-8 border-y border-line">
                <div className="flex gap-4 py-4">
                  <MapPin
                    aria-hidden="true"
                    className="mt-0.5 h-5 w-5 shrink-0 text-accent-dark"
                  />
                  <div>
                    <p className="text-[0.625rem] font-bold uppercase tracking-[0.16em] text-muted">
                      {t('contact_address_label')}
                    </p>
                    <p className="mt-1 text-[0.9375rem] font-semibold text-ink">
                      {business.name}
                    </p>
                    <a
                      href={business.maps.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-0.5 block text-sm leading-relaxed text-graphite/75 underline decoration-line decoration-1 underline-offset-4 transition-colors hover:text-accent-dark"
                    >
                      {t('contact_address')}
                    </a>
                    <p className="mt-1 text-[0.6875rem] text-muted">
                      {t('contact_plus_code')}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 border-t border-line py-4">
                  <Phone
                    aria-hidden="true"
                    className="mt-0.5 h-5 w-5 shrink-0 text-accent-dark"
                  />
                  <div>
                    <p className="text-[0.625rem] font-bold uppercase tracking-[0.16em] text-muted">
                      {t('contact_phone_label')}
                    </p>
                    <a
                      href={business.phone.telHref}
                      className="mt-1 block text-[0.9375rem] font-semibold text-ink transition-colors hover:text-accent-dark"
                    >
                      {business.phone.display}
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 border-t border-line py-4">
                  <Clock
                    aria-hidden="true"
                    className="mt-0.5 h-5 w-5 shrink-0 text-accent-dark"
                  />
                  <div>
                    <p className="text-[0.625rem] font-bold uppercase tracking-[0.16em] text-muted">
                      {t('contact_hours_label')}
                    </p>
                    <p className="mt-1 text-[0.9375rem] font-semibold text-ink">
                      {t('contact_hours')}
                    </p>
                    <p className="mt-0.5 text-[0.8125rem] text-muted">
                      {t('contact_hours_note')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={generalEnquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp w-full whitespace-nowrap sm:w-auto"
                >
                  <MessageCircle aria-hidden="true" className="h-[18px] w-[18px]" />
                  {t('contact_whatsapp')}
                  <span className="sr-only"> ({t('new_tab')})</span>
                </a>
                <a
                  href={business.maps.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-dark w-full whitespace-nowrap sm:w-auto"
                >
                  <Navigation aria-hidden="true" className="h-[18px] w-[18px]" />
                  {t('contact_directions')}
                  <span className="sr-only"> ({t('new_tab')})</span>
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <div className="overflow-hidden rounded-[10px] border border-line bg-white">
              <div className="relative aspect-[4/3] w-full sm:aspect-[16/10]">
                <iframe
                  title={t('contact_map_title')}
                  src={business.maps.embedUrl}
                  width="1024"
                  height="640"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full border-0"
                />
              </div>

              <div className="flex flex-col gap-3 border-t border-line p-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-sm text-[0.6875rem] leading-relaxed text-muted">
                  {t('contact_map_note')}
                </p>
                <a
                  href={business.maps.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-9 shrink-0 items-center gap-1.5 text-[0.8125rem] font-semibold text-accent-dark transition-colors hover:text-ink"
                >
                  {t('contact_open_maps')}
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                  <span className="sr-only"> ({t('new_tab')})</span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
