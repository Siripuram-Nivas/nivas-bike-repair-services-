import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Bike, Check, MapPin, MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/useLanguage';
import HeroScrub from './ui/HeroScrub';

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0 },
};

export default function Hero() {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();

  const trustItems = [
    { titleKey: 'trust1_title', descKey: 'trust1_desc', Icon: MapPin },
    { titleKey: 'trust2_title', descKey: 'trust2_desc', Icon: MessageCircle },
    { titleKey: 'trust3_title', descKey: 'trust3_desc', Icon: Bike },
  ];

  return (
    <section id="home" className="relative overflow-hidden bg-ink text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #ffffff 1px, transparent 1px)',
          backgroundSize: '96px 100%',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-[-10%] h-[36rem] w-[36rem] rounded-full bg-accent/10 blur-[120px]"
      />

      <div className="container-page relative z-10 pb-12 pt-[7.25rem] sm:pb-16 lg:pb-20 lg:pt-[9.5rem]">
        <div className="grid items-center gap-10 lg:grid-cols-[1.06fr_0.94fr] lg:gap-16">
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
              className="display-title mt-5 max-w-[13ch] text-[clamp(2.15rem,7.4vw,4.6rem)] text-white"
            >
              {t('hero_title')}{' '}
              <span className="text-accent">{t('hero_title_accent')}</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-white/70 sm:text-lg"
            >
              {t('hero_desc')}
            </motion.p>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
            >
              <a href="#book" className="btn btn-primary w-full sm:w-auto">
                <MessageCircle aria-hidden="true" className="h-[18px] w-[18px]" />
                {t('hero_cta')}
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </a>
              <a
                href="#services"
                className="btn btn-outline-light w-full sm:w-auto"
              >
                {t('hero_cta_secondary')}
                <ArrowDown aria-hidden="true" className="h-4 w-4" />
              </a>
            </motion.div>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="mt-4 flex items-start gap-2 text-[0.8125rem] leading-relaxed text-white/50"
            >
              <Check
                aria-hidden="true"
                className="mt-0.5 h-4 w-4 shrink-0 text-accent"
              />
              {t('hero_note')}
            </motion.p>
          </motion.div>

          <div className="relative mx-auto w-full max-w-[30rem] lg:max-w-none">
            <div
              aria-hidden="true"
              className="absolute -left-2 -top-2 h-16 w-16 border-l-2 border-t-2 border-accent/70"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-2 -right-2 h-16 w-16 border-b-2 border-r-2 border-white/15"
            />

            <HeroScrub
              src="/workshop-hero.jpg"
              srcSet="/workshop-hero-480.jpg 480w, /workshop-hero.jpg 720w"
              sizes="(min-width: 1024px) 470px, (min-width: 640px) 30rem, 92vw"
              alt={t('hero_image_alt')}
              width={720}
              height={900}
              className="aspect-[5/6] w-full rounded-[10px] ring-1 ring-white/10 sm:aspect-[4/5]"
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-r from-ink/25 via-transparent to-transparent"
              />

              <div className="absolute inset-x-3 bottom-3 z-10 flex items-center justify-between gap-3 rounded-[6px] border border-white/15 bg-ink/75 px-4 py-3 backdrop-blur-sm">
                <div className="min-w-0">
                  <p className="text-[0.625rem] font-bold uppercase tracking-[0.18em] text-accent-light">
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

            <p
              aria-hidden="true"
              className="mt-4 text-center font-mono text-[0.625rem] uppercase tracking-[0.22em] text-white/35 lg:mt-5"
            >
              55VX+VRM · Sundaragiri
            </p>
          </div>
        </div>

        <ul className="mt-10 grid gap-4 border-t border-white/10 pt-6 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-white/10">
          {trustItems.map(({ titleKey, descKey, Icon }, index) => (
            <li
              key={titleKey}
              className={`flex items-start gap-3 ${
                index > 0 ? 'sm:pl-5' : ''
              } pr-2`}
            >
              <Icon
                aria-hidden="true"
                className="mt-0.5 h-[18px] w-[18px] shrink-0 text-accent"
              />
              <div>
                <p className="text-[0.8125rem] font-semibold text-white">
                  {t(titleKey)}
                </p>
                <p className="mt-0.5 text-xs leading-relaxed text-white/50">
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
