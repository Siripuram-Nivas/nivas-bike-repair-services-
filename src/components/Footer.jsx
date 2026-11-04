import {
  ArrowUp,
  ArrowUpRight,
  Clock,
  MapPin,
  MessageCircle,
  Phone,
} from 'lucide-react';
import { business, navLinks, services } from '../config/business';
import { generalEnquiryUrl } from '../lib/whatsapp';
import { useLanguage } from '../context/useLanguage';
import Logo from './ui/Logo';

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-ink text-white">
      <div className="border-b border-white/10">
        <div className="container-page flex flex-col gap-6 py-12 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:py-14">
          <div>
            <h2 className="display-title max-w-xl text-[1.9rem] text-white sm:text-[2.35rem]">
              {t('footer_cta_title')}
            </h2>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-white/50">
              {t('footer_cta_desc')}
            </p>
          </div>
          <div className="flex w-full flex-col gap-2.5 sm:flex-row lg:w-auto lg:shrink-0">
            <a href="#book" className="btn btn-primary w-full sm:w-auto">
              {t('footer_book')}
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </a>
            <a
              href={business.phone.telHref}
              className="btn btn-outline-light w-full sm:w-auto"
            >
              <Phone aria-hidden="true" className="h-4 w-4" />
              {business.phone.display}
            </a>
          </div>
        </div>
      </div>

      <div className="container-page py-12 md:py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_0.9fr_1.1fr] lg:gap-8">
          <div>
            <a href="#home" className="inline-flex rounded-sm">
              <Logo onDark />
            </a>
            <p className="mt-5 max-w-xs text-[0.875rem] leading-relaxed text-white/55">
              {t('footer_desc')}
            </p>
            <a
              href={generalEnquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp mt-6 !min-h-10 !px-4 !text-[0.8125rem]"
            >
              <MessageCircle aria-hidden="true" className="h-4 w-4" />
              {t('footer_whatsapp')}
              <span className="sr-only"> ({t('new_tab')})</span>
            </a>
          </div>

          <nav aria-label={t('footer_quick')}>
            <h2 className="text-[0.625rem] font-bold uppercase tracking-[0.18em] text-white/50">
              {t('footer_quick')}
            </h2>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className="text-[0.8125rem] text-white/55 transition-colors hover:text-accent-light"
                  >
                    {t(link.key)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-[0.625rem] font-bold uppercase tracking-[0.18em] text-white/50">
              {t('footer_services')}
            </h2>
            <ul className="mt-4 space-y-2.5">
              {services.map((service) => (
                <li key={service.id}>
                  <a
                    href="#services"
                    className="text-[0.8125rem] text-white/55 transition-colors hover:text-accent-light"
                  >
                    {t(service.nameKey)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-[0.625rem] font-bold uppercase tracking-[0.18em] text-white/50">
              {t('footer_contact')}
            </h2>
            <ul className="mt-4 space-y-3.5">
              <li className="flex items-start gap-2.5">
                <MapPin
                  aria-hidden="true"
                  className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                />
                <a
                  href={business.maps.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.8125rem] leading-relaxed text-white/55 transition-colors hover:text-white"
                >
                  {business.address.display}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 text-accent"
                />
                <a
                  href={business.phone.telHref}
                  className="text-[0.8125rem] text-white/55 transition-colors hover:text-white"
                >
                  {business.phone.display}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock
                  aria-hidden="true"
                  className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                />
                <span className="text-[0.8125rem] leading-relaxed text-white/55">
                  {t('contact_hours_days')}
                  <br />
                  {business.hours.time}
                  <br />
                  {t('contact_hours_note')}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6">
          <p className="max-w-3xl text-[0.6875rem] leading-relaxed text-white/50">
            {t('footer_seo')}
          </p>

          <div className="mt-5 flex flex-col gap-4 border-t border-white/[0.06] pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[0.6875rem] text-white/50">
              © {year} {business.name}. {t('footer_rights')}
            </p>
            <p className="text-[0.6875rem] text-white/55">{t('footer_credit')}</p>
            <a
              href="#home"
              className="inline-flex items-center gap-1.5 text-[0.6875rem] font-semibold text-white/60 transition-colors hover:text-accent-light"
            >
              {t('footer_back_top')}
              <ArrowUp aria-hidden="true" className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
