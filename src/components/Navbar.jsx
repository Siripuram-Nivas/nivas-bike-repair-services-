import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Menu, MessageCircle, Phone, X } from 'lucide-react';
import { business, navLinks } from '../config/business';
import { generalEnquiryUrl } from '../lib/whatsapp';
import { useLanguage } from '../context/useLanguage';
import Logo from './ui/Logo';

export default function Navbar() {
  const { t, lang, setLang } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');
  const panelRef = useRef(null);

  const solid = scrolled || open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter(Boolean);

    if (!('IntersectionObserver' in window)) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-42% 0px -54% 0px', threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return undefined;

    const panel = panelRef.current;
    const closeButton = panel?.querySelector('[data-close-menu]');
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';
    closeButton?.focus();

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        return;
      }

      if (event.key !== 'Tab' || !panel) return;

      const focusable = Array.from(
        panel.querySelectorAll(
          'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => element.offsetParent !== null);

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, [open]);

  const handleNavigate = () => setOpen(false);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
          solid
            ? 'border-line bg-cream/95 shadow-[0_10px_30px_-26px_rgba(14,17,22,0.6)] backdrop-blur-md'
            : 'border-transparent bg-transparent'
        }`}
      >
        <div className="container-page">
          <div className="flex h-[4.5rem] items-center justify-between gap-3">
            <a
              href="#home"
              className="shrink-0 rounded-sm focus-visible:outline-offset-4"
            >
              <Logo onDark={!solid} />
              <span className="sr-only"> — {t('nav_home')}</span>
            </a>

            <nav
              aria-label={t('nav_aria')}
              className="hidden items-center xl:flex"
            >
              {navLinks.map((link) => {
                const isActive = active === link.id;
                return (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    aria-current={isActive ? 'location' : undefined}
                    className={`relative whitespace-nowrap px-2.5 py-2.5 text-[0.75rem] font-semibold transition-colors ${
                      solid
                        ? isActive
                          ? 'text-ink'
                          : 'text-graphite/65 hover:text-ink'
                        : isActive
                          ? 'text-white'
                          : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {t(link.key)}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-2.5 -bottom-px h-[2px] origin-left bg-accent transition-transform duration-300 ${
                        isActive ? 'scale-x-100' : 'scale-x-0'
                      }`}
                    />
                  </a>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setLang(lang === 'en' ? 'te' : 'en')}
                className={`hidden h-9 items-center whitespace-nowrap rounded-[4px] border px-3 text-[0.6875rem] font-semibold transition-colors md:inline-flex ${
                  solid
                    ? 'border-line text-graphite hover:border-ink hover:text-ink'
                    : 'border-white/25 text-white/80 hover:border-white/60 hover:text-white'
                }`}
              >
                <span lang={lang === 'en' ? 'te' : 'en'}>{t('lang_toggle')}</span>
                <span className="sr-only"> {t('lang_toggle_aria')}</span>
              </button>

              <a
                href="#book"
                className="btn btn-primary hidden whitespace-nowrap !min-h-10 !px-4 !py-2 !text-[0.75rem] md:inline-flex"
              >
                {t('nav_book')}
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </a>

              <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                aria-expanded={open}
                aria-controls="mobile-navigation"
                aria-label={open ? t('nav_close') : t('nav_menu')}
                className={`inline-flex h-10 w-10 items-center justify-center rounded-[4px] border transition-colors xl:hidden ${
                  solid
                    ? 'border-line text-ink hover:bg-ink hover:text-white'
                    : 'border-white/25 text-white hover:bg-white/10'
                }`}
              >
                {open ? (
                  <X aria-hidden="true" className="h-5 w-5" />
                ) : (
                  <Menu aria-hidden="true" className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="mobile-menu"
            initial={false}
            className="fixed inset-0 z-[60] xl:hidden"
          >
            <motion.button
              type="button"
              aria-label={t('nav_close')}
              tabIndex={-1}
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 h-full w-full cursor-default bg-ink/75 backdrop-blur-sm"
            />

            <motion.div
              id="mobile-navigation"
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label={t('mobile_nav_aria')}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-y-0 right-0 flex w-[min(22rem,100%)] flex-col bg-cream shadow-2xl"
            >
              <div className="flex h-[4.5rem] items-center justify-between border-b border-line px-5">
                <Logo />
                <button
                  type="button"
                  data-close-menu
                  onClick={() => setOpen(false)}
                  aria-label={t('nav_close')}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-[4px] border border-line text-ink transition-colors hover:bg-ink hover:text-white"
                >
                  <X aria-hidden="true" className="h-5 w-5" />
                </button>
              </div>

              <div className="flex items-center justify-between gap-3 border-b border-line bg-white px-5 py-3">
                <div>
                  <p className="text-[0.5625rem] font-bold uppercase tracking-[0.18em] text-muted">
                    {t('contact_hours_label')}
                  </p>
                  <p className="mt-1 text-[0.8125rem] font-semibold text-ink">
                    {t('hero_hours_value')}
                  </p>
                </div>
                <a
                  href={business.phone.telHref}
                  aria-label={t('contact_call')}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[4px] bg-ink text-accent-light transition-colors hover:bg-accent hover:text-ink"
                >
                  <Phone aria-hidden="true" className="h-4 w-4" />
                </a>
              </div>

              <nav
                aria-label={t('mobile_nav_aria')}
                className="flex-1 overflow-y-auto px-5 py-4"
              >
                <ul className="divide-y divide-line/80">
                  {navLinks.map((link, index) => (
                    <li key={link.id}>
                      <a
                        href={`#${link.id}`}
                        onClick={handleNavigate}
                        aria-current={active === link.id ? 'location' : undefined}
                        className={`flex items-center justify-between gap-4 py-3.5 text-[1.0625rem] font-semibold transition-colors ${
                          active === link.id
                            ? 'text-accent-dark'
                            : 'text-ink hover:text-accent-dark'
                        }`}
                      >
                        <span>{t(link.key)}</span>
                        <span className="font-mono text-[0.6875rem] font-medium tracking-wider text-muted">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>

                <div className="mt-5">
                  <p className="mb-2 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-muted">
                    {t('lang_label')}
                  </p>
                  <div
                    role="group"
                    aria-label={t('lang_toggle_aria')}
                    className="grid grid-cols-2 gap-2"
                  >
                    <button
                      type="button"
                      onClick={() => setLang('en')}
                      aria-pressed={lang === 'en'}
                      className={`min-h-10 rounded-[4px] border px-3 text-sm font-semibold transition-colors ${
                        lang === 'en'
                          ? 'border-ink bg-ink text-white'
                          : 'border-line bg-white text-graphite hover:border-ink'
                      }`}
                    >
                      English
                    </button>
                    <button
                      type="button"
                      onClick={() => setLang('te')}
                      aria-pressed={lang === 'te'}
                      lang="te"
                      className={`min-h-10 rounded-[4px] border px-3 text-sm font-semibold transition-colors ${
                        lang === 'te'
                          ? 'border-ink bg-ink text-white'
                          : 'border-line bg-white text-graphite hover:border-ink'
                      }`}
                    >
                      తెలుగు
                    </button>
                  </div>
                </div>
              </nav>

              <div className="space-y-2 border-t border-line px-5 pb-6 pt-4 safe-bottom">
                <a
                  href="#book"
                  onClick={handleNavigate}
                  className="btn btn-primary w-full"
                >
                  {t('nav_book')}
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                </a>
                <a
                  href={business.phone.telHref}
                  onClick={handleNavigate}
                  className="btn btn-outline-dark w-full !min-h-11 !text-sm"
                >
                  <Phone aria-hidden="true" className="h-4 w-4" />
                  {t('contact_call')}
                </a>
                <a
                  href={generalEnquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleNavigate}
                  className="btn btn-whatsapp w-full !min-h-11 !text-sm"
                >
                  <MessageCircle aria-hidden="true" className="h-4 w-4" />
                  {t('action_whatsapp')}
                  <span className="sr-only"> ({t('new_tab')})</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
