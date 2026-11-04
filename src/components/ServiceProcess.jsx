import { Bike, MessageCircle, Send, Wrench } from 'lucide-react';
import { useLanguage } from '../context/useLanguage';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';

const steps = [
  { titleKey: 'step1_title', descKey: 'step1_desc', Icon: Wrench },
  { titleKey: 'step2_title', descKey: 'step2_desc', Icon: Send },
  { titleKey: 'step3_title', descKey: 'step3_desc', Icon: MessageCircle },
  { titleKey: 'step4_title', descKey: 'step4_desc', Icon: Bike },
];

export default function ServiceProcess() {
  const { t } = useLanguage();

  return (
    <section id="process" className="section-y scroll-mt-24 bg-cream">
      <div className="container-page">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrowKey="process_eyebrow"
            titleKey="process_title"
            subtitleKey="process_subtitle"
          />
          <a
            href="#book"
            className="btn btn-dark shrink-0 self-start md:self-auto"
          >
            {t('process_cta')}
          </a>
        </div>

        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4 lg:gap-5">
          {steps.map(({ titleKey, descKey, Icon }, index) => (
            <li key={titleKey} className="h-full">
              <Reveal
                delay={index * 0.05}
                className="group relative h-full rounded-[5px] border border-line border-t-2 border-t-ink/15 bg-white p-6 transition-colors duration-300 hover:border-t-accent"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-4 top-3 font-display text-[3.75rem] font-extrabold leading-none text-ink/45"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>

                <span className="relative flex h-11 w-11 items-center justify-center rounded-[4px] bg-ink text-accent-light transition-colors duration-300 group-hover:bg-accent group-hover:text-ink">
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </span>

                <p className="relative mt-4 font-mono text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-muted">
                  {t('process_step')} {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className="relative mt-1.5 font-display text-[1.05rem] font-bold leading-snug text-ink">
                  {t(titleKey)}
                </h3>
                <p className="relative mt-1.5 text-[0.8125rem] leading-relaxed text-muted">
                  {t(descKey)}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal delay={0.1}>
          <p className="mt-6 flex items-start gap-2 text-[0.75rem] leading-relaxed text-muted">
            <span
              aria-hidden="true"
              className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
            />
            {t('process_note')}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
