import {
  Bike,
  CheckCircle2,
  ClipboardList,
  MessageCircle,
  Phone,
  Search,
} from 'lucide-react';
import { useLanguage } from '../context/useLanguage';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';

const steps = [
  { titleKey: 'p1_title', descKey: 'p1_desc', Icon: Phone },
  { titleKey: 'p2_title', descKey: 'p2_desc', Icon: MessageCircle },
  { titleKey: 'p3_title', descKey: 'p3_desc', Icon: Search },
  { titleKey: 'p4_title', descKey: 'p4_desc', Icon: ClipboardList },
  { titleKey: 'p5_title', descKey: 'p5_desc', Icon: CheckCircle2 },
  { titleKey: 'p6_title', descKey: 'p6_desc', Icon: Bike },
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
          <a href="#book" className="btn btn-dark shrink-0 self-start md:self-auto">
            {t('nav_book')}
          </a>
        </div>

        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-5">
          {steps.map(({ titleKey, descKey, Icon }, index) => (
            <li key={titleKey}>
              <Reveal
                delay={index * 0.05}
                className="group relative h-full overflow-hidden rounded-[10px] border border-line bg-white p-6 transition-colors duration-300 hover:border-accent/50"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-2 -top-4 font-display text-[5.5rem] font-extrabold leading-none text-ink/[0.045]"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>

                <div className="relative flex items-center justify-between gap-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-[5px] bg-ink text-accent-light transition-colors duration-300 group-hover:bg-accent group-hover:text-ink">
                    <Icon aria-hidden="true" className="h-[18px] w-[18px]" />
                  </span>
                  <span className="font-mono text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-muted">
                    {t('process_step')} {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <h3 className="relative mt-5 font-display text-[1rem] font-bold leading-snug text-ink">
                  {t(titleKey)}
                </h3>
                <p className="relative mt-1.5 text-[0.8125rem] leading-relaxed text-muted">
                  {t(descKey)}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
