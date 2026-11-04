import { ExternalLink, MapPin, MessageCircle, Quote, ShieldCheck } from 'lucide-react';
import { business } from '../config/business';
import { feedbackUrl } from '../lib/whatsapp';
import { useLanguage } from '../context/useLanguage';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';

export default function Reviews() {
  const { t } = useLanguage();
  const googleUrl = business.googleReviewUrl || business.maps.url;
  const googleLabel = business.googleReviewUrl
    ? t('reviews_google_review')
    : t('reviews_google');

  return (
    <section id="reviews" className="section-y scroll-mt-24 bg-cream">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
          <div>
            <SectionHeading
              eyebrowKey="reviews_eyebrow"
              titleKey="reviews_title"
              subtitleKey="reviews_subtitle"
            />

            <Reveal delay={0.08}>
              <p className="mt-5 max-w-xl text-[0.9375rem] leading-relaxed text-graphite/75">
                {t('reviews_body')}
              </p>
              <p className="mt-5 flex max-w-xl items-start gap-2.5 border-l-2 border-accent bg-white px-4 py-3 text-[0.8125rem] leading-relaxed text-muted">
                <ShieldCheck
                  aria-hidden="true"
                  className="mt-0.5 h-4 w-4 shrink-0 text-accent-dark"
                />
                {t('reviews_note')}
              </p>
              <p className="mt-4 flex items-start gap-2 text-[0.8125rem] leading-relaxed text-muted">
                <MapPin
                  aria-hidden="true"
                  className="mt-0.5 h-4 w-4 shrink-0 text-accent-dark"
                />
                {business.address.display}
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.14}>
            <div className="relative overflow-hidden rounded-[6px] border border-white/10 bg-ink p-6 text-white shadow-[0_30px_60px_-40px_rgba(14,17,22,0.8)] sm:p-8">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-8 -top-10 font-display text-[11rem] font-extrabold leading-none text-white/[0.04]"
              >
                “
              </span>

              <Quote
                aria-hidden="true"
                className="h-9 w-9 text-accent"
                strokeWidth={1.5}
              />

              <h3 className="relative mt-5 font-display text-2xl font-bold leading-tight text-white">
                {t('reviews_card_title')}
              </h3>
              <p className="relative mt-3 text-[0.9375rem] leading-relaxed text-white/60">
                {t('reviews_card_body')}
              </p>

              <div className="relative mt-7 space-y-3">
                <a
                  href={feedbackUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary w-full"
                >
                  <MessageCircle aria-hidden="true" className="h-[18px] w-[18px]" />
                  {t('reviews_whatsapp')}
                  <span className="sr-only"> ({t('new_tab')})</span>
                </a>

                <a
                  href={googleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-light w-full !min-h-11 !text-sm"
                >
                  {googleLabel}
                  <ExternalLink aria-hidden="true" className="h-4 w-4" />
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
