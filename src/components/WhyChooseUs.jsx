import {
  ClipboardCheck,
  Heart,
  Info,
  MapPin,
  MessageCircle,
  Phone,
  Wrench,
} from 'lucide-react';
import { business } from '../config/business';
import { useLanguage } from '../context/useLanguage';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';

const features = [
  { titleKey: 'why1_title', descKey: 'why1_desc', Icon: Heart },
  { titleKey: 'why2_title', descKey: 'why2_desc', Icon: MessageCircle },
  { titleKey: 'why3_title', descKey: 'why3_desc', Icon: ClipboardCheck },
  { titleKey: 'why4_title', descKey: 'why4_desc', Icon: Wrench },
  { titleKey: 'why5_title', descKey: 'why5_desc', Icon: MapPin },
  { titleKey: 'why6_title', descKey: 'why6_desc', Icon: Phone },
];

export default function WhyChooseUs() {
  const { t } = useLanguage();
  const whyImage = business.images.why;

  return (
    <section id="why" className="section-y scroll-mt-24 bg-white">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start lg:gap-16">
          <Reveal className="order-2 lg:order-1">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[6px] ring-1 ring-line sm:aspect-[5/6] lg:aspect-auto lg:min-h-[36rem]">
              <img
                src={whyImage.src}
                srcSet={whyImage.srcSet}
                sizes="(min-width: 1024px) 42vw, 92vw"
                alt={t(whyImage.altKey)}
                width={whyImage.width}
                height={whyImage.height}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/15 to-transparent"
              />
              <div className="absolute inset-x-4 bottom-4 border-l-2 border-accent bg-ink/85 p-4 backdrop-blur-sm">
                <p className="text-[0.5625rem] font-bold uppercase tracking-[0.2em] text-accent-light">
                  {t('why_badge_title')}
                </p>
                <p className="mt-1.5 text-[0.8125rem] font-medium leading-relaxed text-white/85">
                  {t('why_badge_text')}
                </p>
              </div>
            </div>
          </Reveal>

          <div className="order-1 lg:order-2">
            <SectionHeading
              eyebrowKey="why_eyebrow"
              titleKey="why_title"
              subtitleKey="why_subtitle"
            />

            <div className="mt-8 grid gap-x-8 sm:grid-cols-2">
              {features.map(({ titleKey, descKey, Icon }, index) => (
                <Reveal
                  key={titleKey}
                  delay={index * 0.04}
                  className="group border-t border-line py-5"
                >
                  <div className="flex items-start gap-3.5">
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-[4px] border border-line text-accent-dark transition-colors duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-accent-light">
                      <Icon aria-hidden="true" className="h-[18px] w-[18px]" />
                    </span>
                    <div>
                      <h3 className="font-display text-[0.9375rem] font-bold leading-snug text-ink">
                        {t(titleKey)}
                      </h3>
                      <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-muted">
                        {t(descKey)}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.1}>
              <p className="mt-6 flex items-start gap-2 border-l-2 border-accent bg-cream px-4 py-3 text-[0.8125rem] font-medium leading-relaxed text-graphite">
                <Info
                  aria-hidden="true"
                  className="mt-0.5 h-4 w-4 shrink-0 text-accent-dark"
                />
                {t('why_note')}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
