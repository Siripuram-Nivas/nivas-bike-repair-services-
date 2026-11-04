import { CalendarCheck, Droplets, Gauge, Link2 } from 'lucide-react';
import { useLanguage } from '../context/useLanguage';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';

const tips = [
  { titleKey: 'tip1_title', descKey: 'tip1_desc', Icon: CalendarCheck },
  { titleKey: 'tip2_title', descKey: 'tip2_desc', Icon: Gauge },
  { titleKey: 'tip3_title', descKey: 'tip3_desc', Icon: Link2 },
  { titleKey: 'tip4_title', descKey: 'tip4_desc', Icon: Droplets },
];

export default function BikeCareTips() {
  const { t } = useLanguage();

  return (
    <section
      id="tips"
      className="relative scroll-mt-24 overflow-hidden bg-graphite py-16 text-white md:py-20"
    >
      <div aria-hidden="true" className="texture-grid absolute inset-0 opacity-40" />

      <div className="container-page relative z-10">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeading
            eyebrowKey="tips_eyebrow"
            titleKey="tips_title"
            subtitleKey="tips_subtitle"
            dark
          />

          <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
            {tips.map(({ titleKey, descKey, Icon }, index) => (
              <Reveal
                key={titleKey}
                delay={index * 0.04}
                className="group border-t border-white/15 pt-5"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="flex h-9 w-9 items-center justify-center rounded-[4px] border border-white/15 text-accent transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-ink">
                    <Icon aria-hidden="true" className="h-4 w-4" />
                  </span>
                  <span
                    aria-hidden="true"
                    className="font-mono text-[0.625rem] tracking-[0.18em] text-white/25"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-[1rem] font-bold text-white">
                  {t(titleKey)}
                </h3>
                <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-white/55">
                  {t(descKey)}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
