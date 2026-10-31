import { CalendarCheck, FlaskConical, Gauge, Link2 } from 'lucide-react';
import { useLanguage } from '../context/useLanguage';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';

const tips = [
  { titleKey: 'tip1_title', descKey: 'tip1_desc', Icon: CalendarCheck },
  { titleKey: 'tip2_title', descKey: 'tip2_desc', Icon: Gauge },
  { titleKey: 'tip3_title', descKey: 'tip3_desc', Icon: Link2 },
  { titleKey: 'tip4_title', descKey: 'tip4_desc', Icon: FlaskConical },
];

export default function BikeCareTips() {
  const { t } = useLanguage();

  return (
    <section id="tips" className="scroll-mt-24 bg-graphite py-16 text-white md:py-20">
      <div className="container-page">
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
                  <Icon
                    aria-hidden="true"
                    className="h-5 w-5 text-accent transition-transform duration-300 group-hover:-translate-y-0.5"
                  />
                  <span
                    aria-hidden="true"
                    className="font-mono text-[0.625rem] tracking-[0.18em] text-white/25"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-[0.9375rem] font-bold text-white">
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
