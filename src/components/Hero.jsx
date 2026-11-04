import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowUpRight,
  Bike,
  CalendarCheck,
  Check,
  Clock,
  MapPin,
  MessageCircle,
  Phone,
} from 'lucide-react';
import { business } from '../config/business';
import { useLanguage } from '../context/useLanguage';
import HeroScrub from './ui/HeroScrub';

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0 },
};

export default function Hero() {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();
  const heroImage = business.images.hero;

  const trustItems = [
    { titleKey: 'trust1_title', descKey: 'trust1_desc', Icon: MapPin },
    { titleKey: 'trust2_title', descKey: 'trust2_desc', Icon: MessageCircle },
    { titleKey: 'trust3_title', descKey: 'trust3_desc', Icon: CalendarCheck },
  ];

  return (
    <section id="home" className="relative overflow-hidden bg-ink text-white">
      <div aria-hidden="true" className="texture-grid absolute inset-0 opacity-60" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-[-12%] h-[38rem] w-[38rem] rounded-full bg-accent/10 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-[-20%] h-[30rem] w-[30rem] rounded-full bg-accent/5 blur-[120px]"
      />

      <div className="container-page relative z-10 pb-12 pt-[7.5rem] sm:pb-16 lg:pb-20 lg:pt-[9.5rem]">
        <div className="grid items-center gap-10 lg:grid-cols-[1.04fr_0.96fr] lg:gap-14">
          <motion.div
            initial={reduceMotion ? false : 'hidden'}
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } },
            }}
          >
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="eyebrow eyebrow-on-dark"
            >
              {t('hero_eyebrow')}
            </motion.p>

            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="display-title mt-5 max-w-[13ch] text-[clamp(2.3rem,7.5vw,4.85rem)] text-white"
            >
              {t('hero_title')}{' '}
              <span className="text-accent">{t('hero_title_accent')}</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-white/65 sm:text-lg"
            >
              {t('hero_desc')}
            </motion.p>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
            >
              <a href="#book" className="btn btn-primary w-full sm:w-auto">
                <CalendarCheck aria-hidden="true" className="h-[18px] w-[18px]" />
                {t('hero_cta')}
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </a>
              <a
                href={business.phone.telHref}
                className="btn btn-outline-light w-full sm:w-auto"
              >
                <Phone aria-hidden="true" className="h-[17px] w-[17px]" />
                {t('hero_cta_secondary')}
              </a>
            </motion.div>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="mt-5 flex max-w-lg items-start gap-2 text-[0.8125rem] leading-relaxed text-white/45"
            >
              <Check
                aria-hidden="true"
                className="mt-0.5 h-4 w-4 shrink-0 text-accent"
              />
              {t('hero_note')}
            </motion.p>
          </motion.div>

          <div className="relative mx-auto w-full max-w-[34rem] lg:max-w-none">
            <div
              aria-hidden="true"
              className="absolute -left-2 -top-2 h-16 w-16 border-l-2 border-t-2 border-accent/70"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-2 -right-2 h-16 w-16 border-b-2 border-r-2 border-white/15"
            />

            <HeroScrub
              src={heroImage.src}
              srcSet={heroImage.srcSet}
              sizes="(min-width: 1280px) 600px, (min-width: 1024px) 46vw, (min-width: 640px) 34rem, 92vw"
              alt={t(heroImage.altKey)}
              width={heroImage.width}
              height={heroImage.height}
              className="aspect-[4/3] w-full rounded-[6px] ring-1 ring-white/10 lg:aspect-[16/11]"
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-r from-ink/30 via-transparent to-transparent"
              />

              <div className="absolute inset-x-3 bottom-3 z-10 flex items-center justify-between gap-3 rounded-[4px] border border-white/15 bg-ink/80 px-4 py-3 backdrop-blur-sm">
                <div className="min-w-0">
                  <p className="text-[0.5625rem] font-bold uppercase tracking-[0.2em] text-accent-light">
                    {t('hero_card_label')}
                  </p>
                  <p className="mt-1 truncate text-sm font-semibold text-white">
                    {t('hero_card_meta')}
                  </p>
                </div>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[4px] bg-accent text-ink">
                  <Bike aria-hidden="true" className="h-5 w-5" />
                </span>
              </div>
            </HeroScrub>

            <dl className="mt-4 grid grid-cols-2 gap-3 lg:mt-5">
              <div className="border-t border-white/10 pt-3">
                <dt className="flex items-start gap-2.5 text-[0.5625rem] font-bold uppercase tracking-[0.16em] text-white/55">
                  <Clock
                    aria-hidden="true"
                    className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                  />
                  <span>{t('hero_hours_label')}</span>
                </dt>
                <dd className="ml-[26px] mt-1 text-[0.75rem] font-medium leading-snug text-white/80">
                  {t('hero_hours_value')}
                </dd>
              </div>
              <div className="border-t border-white/10 pt-3">
                <dt className="flex items-start gap-2.5 text-[0.5625rem] font-bold uppercase tracking-[0.16em] text-white/55">
                  <MapPin
                    aria-hidden="true"
                    className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                  />
                  <span>{t('hero_location_label')}</span>
                </dt>
                <dd className="ml-[26px] mt-1 text-[0.75rem] font-medium leading-snug text-white/80">
                  {t('hero_location_value')}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <ul className="mt-10 grid gap-4 border-t border-white/10 pt-6 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-white/10">
          {trustItems.map(({ titleKey, descKey, Icon }, index) => (
            <li
              key={titleKey}
              className={`flex items-start gap-3 pr-2 ${index > 0 ? 'sm:pl-5' : ''}`}
            >
              <Icon
                aria-hidden="true"
                className="mt-0.5 h-[18px] w-[18px] shrink-0 text-accent"
              />
              <div>
                <p className="text-[0.8125rem] font-semibold text-white">
                  {t(titleKey)}
                </p>
                <p className="mt-0.5 text-xs leading-relaxed text-white/45">
                  {t(descKey)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
