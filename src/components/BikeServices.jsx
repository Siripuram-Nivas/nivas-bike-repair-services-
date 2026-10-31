import {
  AlertCircle,
  ArrowUpRight,
  Droplets,
  Link2,
  Settings,
  Wrench,
  Zap,
} from 'lucide-react';
import { services } from '../config/business';
import { useBooking } from '../context/useBooking';
import { useLanguage } from '../context/useLanguage';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';

const icons = {
  settings: Settings,
  engine: Zap,
  oil: Droplets,
  brake: AlertCircle,
  wrench: Wrench,
  chain: Link2,
};

const inr = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

export default function BikeServices() {
  const { t } = useLanguage();
  const { openBooking } = useBooking();

  return (
    <section id="services" className="section-y scroll-mt-24 bg-cream">
      <div className="container-page">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrowKey="services_eyebrow"
            titleKey="services_title"
            subtitleKey="services_subtitle"
          />
          <Reveal delay={0.1} className="shrink-0">
            <a
              href="#pricing"
              className="inline-flex items-center gap-2 text-sm font-semibold text-ink underline decoration-accent decoration-2 underline-offset-4 transition-colors hover:text-accent-dark"
            >
              {t('pricing_eyebrow')}
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </a>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-5">
          {services.map((service, index) => {
            const Icon = icons[service.icon] || Wrench;
            const title = t(service.nameKey);

            return (
              <Reveal key={service.id} delay={index * 0.05}>
                <article className="group flex h-full flex-col rounded-[10px] border border-line bg-white p-6 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-ink/25 hover:shadow-[0_22px_50px_-34px_rgba(21,27,34,0.55)]">
                  <div className="flex items-start justify-between gap-4">
                    <span className="flex h-11 w-11 items-center justify-center rounded-[6px] border border-accent/20 bg-accent/10 text-accent-dark transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-ink">
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <span
                      aria-hidden="true"
                      className="font-mono text-[0.6875rem] font-medium tracking-[0.18em] text-muted/70"
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-[1.125rem] font-bold leading-snug text-ink">
                    {title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                    {t(service.descKey)}
                  </p>

                  <div className="mt-5 border-t border-line pt-4">
                    <p className="text-[0.8125rem] font-semibold text-ink">
                      {service.price !== null
                        ? `${t('pricing_from')} ${inr.format(service.price)}`
                        : t('price_estimate')}
                    </p>
                    <p className="mt-0.5 text-[0.6875rem] text-muted">
                      {t('price_after_inspection')}
                    </p>

                    <button
                      type="button"
                      onClick={() => openBooking(service.id)}
                      aria-label={`${t('services_book_aria')} ${title}`}
                      className="mt-4 inline-flex min-h-9 items-center gap-1.5 text-sm font-semibold text-accent-dark transition-colors hover:text-ink"
                    >
                      {t('services_book')}
                      <ArrowUpRight
                        aria-hidden="true"
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </button>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
