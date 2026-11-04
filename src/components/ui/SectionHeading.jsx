import { useLanguage } from '../../context/useLanguage';

export default function SectionHeading({
  eyebrowKey,
  titleKey,
  subtitleKey,
  dark = false,
  align = 'left',
  id,
  className = '',
}) {
  const { t } = useLanguage();
  const centered = align === 'center';

  return (
    <div
      className={`${centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'} ${className}`}
    >
      <span className={`eyebrow ${dark ? 'eyebrow-on-dark' : ''}`}>
        {t(eyebrowKey)}
      </span>
      <h2
        id={id}
        className={`display-title mt-4 text-[2.1rem] leading-[1.02] sm:text-[2.55rem] lg:text-[3.05rem] ${
          dark ? 'text-white' : 'text-ink'
        }`}
      >
        {t(titleKey)}
      </h2>
      {subtitleKey ? (
        <p
          className={`lead mt-4 max-w-xl ${centered ? 'mx-auto' : ''} ${
            dark ? 'text-white/60' : ''
          }`}
        >
          {t(subtitleKey)}
        </p>
      ) : null}
    </div>
  );
}
