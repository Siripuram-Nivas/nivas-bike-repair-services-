import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
} from 'lucide-react';
import { gallery } from '../config/business';
import { useLanguage } from '../context/useLanguage';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';

export default function Gallery() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState(null);
  const lastFocusedRef = useRef(null);
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);

  const isOpen = openIndex !== null;
  const current = isOpen ? gallery[openIndex] : null;

  const close = () => setOpenIndex(null);
  const showPrev = () =>
    setOpenIndex((index) => (index - 1 + gallery.length) % gallery.length);
  const showNext = () =>
    setOpenIndex((index) => (index + 1) % gallery.length);

  useEffect(() => {
    if (!isOpen) return undefined;

    lastFocusedRef.current = document.activeElement;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 60);

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setOpenIndex(null);
        return;
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        setOpenIndex(
          (index) => (index - 1 + gallery.length) % gallery.length,
        );
        return;
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        setOpenIndex((index) => (index + 1) % gallery.length);
        return;
      }

      if (event.key !== 'Tab' || !dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll('a[href], button:not([disabled])'),
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
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
      if (lastFocusedRef.current instanceof HTMLElement) {
        lastFocusedRef.current.focus();
      }
    };
  }, [isOpen]);

  return (
    <section id="gallery" className="section-y scroll-mt-24 bg-ink text-white">
      <div className="container-page">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrowKey="gallery_eyebrow"
            titleKey="gallery_title"
            subtitleKey="gallery_subtitle"
            dark
          />
          <p className="flex max-w-sm items-start gap-2.5 text-[0.75rem] leading-relaxed text-white/45">
            <Camera
              aria-hidden="true"
              className="mt-0.5 h-4 w-4 shrink-0 text-accent"
            />
            {t('gallery_note')}
          </p>
        </div>

        <div className="mt-9 grid auto-rows-[10.5rem] grid-cols-2 gap-3 sm:auto-rows-[12rem] md:mt-11 md:grid-cols-3 lg:auto-rows-[15.5rem] lg:gap-4">
          {gallery.map((item, index) => {
            const title = t(item.titleKey);
            const layout =
              index === 0
                ? 'col-span-2 md:col-span-2 md:row-span-2'
                : index === 5
                  ? 'col-span-2 md:col-span-1'
                  : 'col-span-1';

            return (
              <Reveal
                key={item.id}
                delay={index * 0.04}
                className={`${layout} h-full`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(index)}
                  aria-label={`${t('gallery_view_label')} ${title}`}
                  className="group relative h-full w-full overflow-hidden rounded-[5px] bg-graphite text-left ring-1 ring-white/10 transition-[box-shadow] duration-300 hover:ring-accent/70 focus-visible:ring-accent"
                >
                  <img
                    src={item.src}
                    alt={t(item.altKey)}
                    width={item.width}
                    height={item.height}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent"
                  />
                  <span className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-3">
                    <span className="font-display text-[0.9375rem] font-bold leading-tight text-white sm:text-base">
                      {title}
                    </span>
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[3px] bg-white/10 text-white backdrop-blur-sm transition-colors group-hover:bg-accent group-hover:text-ink">
                      <Maximize2 aria-hidden="true" className="h-3.5 w-3.5" />
                    </span>
                  </span>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {isOpen && current ? (
          <motion.div
            key="gallery-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6"
          >
            <button
              type="button"
              aria-label={t('gallery_close')}
              tabIndex={-1}
              onClick={close}
              className="absolute inset-0 h-full w-full cursor-default bg-ink/92 backdrop-blur-sm"
            />

            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-label={t('gallery_title')}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-[6px] border border-white/15 bg-charcoal"
            >
              <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3">
                <p className="font-display text-sm font-bold text-white sm:text-base">
                  {t(current.titleKey)}
                </p>
                <div className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="font-mono text-[0.6875rem] tracking-[0.14em] text-white/45"
                  >
                    {String(openIndex + 1).padStart(2, '0')} /{' '}
                    {String(gallery.length).padStart(2, '0')}
                  </span>
                  <button
                    ref={closeButtonRef}
                    type="button"
                    onClick={close}
                    aria-label={t('gallery_close')}
                    className="flex h-9 w-9 items-center justify-center rounded-[4px] border border-white/15 text-white transition-colors hover:border-white/40 hover:bg-white/10"
                  >
                    <X aria-hidden="true" className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="relative flex min-h-0 flex-1 items-center justify-center bg-ink/60">
                <img
                  src={current.src}
                  alt={t(current.altKey)}
                  width={current.width}
                  height={current.height}
                  className="max-h-[68vh] w-full object-contain"
                />

                <button
                  type="button"
                  onClick={showPrev}
                  aria-label={t('gallery_prev')}
                  className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-[4px] border border-white/20 bg-ink/70 text-white backdrop-blur-sm transition-colors hover:bg-accent hover:text-ink sm:left-4 sm:h-11 sm:w-11"
                >
                  <ChevronLeft aria-hidden="true" className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={showNext}
                  aria-label={t('gallery_next')}
                  className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-[4px] border border-white/20 bg-ink/70 text-white backdrop-blur-sm transition-colors hover:bg-accent hover:text-ink sm:right-4 sm:h-11 sm:w-11"
                >
                  <ChevronRight aria-hidden="true" className="h-5 w-5" />
                </button>
              </div>

              <div className="flex items-center justify-between gap-4 border-t border-white/10 px-4 py-3">
                <p className="hidden items-center gap-2 text-[0.6875rem] text-white/45 sm:flex">
                  <ArrowLeft aria-hidden="true" className="h-3.5 w-3.5" />
                  <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                  {t('gallery_note')}
                </p>
                <button
                  type="button"
                  onClick={close}
                  className="btn btn-outline-light ml-auto !min-h-9 !px-3 !py-1.5 !text-[0.75rem]"
                >
                  {t('gallery_close')}
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
