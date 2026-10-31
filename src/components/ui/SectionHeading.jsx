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
        className={`display-title mt-4 text-[2rem] leading-[1.06] sm:text-4xl lg:text-[2.85rem] ${
          dark ? 'text-white' : 'text-ink'
        }`}
      >
        {t(titleKey)}
      </h2>
      {subtitleKey ? (
        <p className={`lead mt-4 ${dark ? 'text-white/65' : ''}`}>
          {t(subtitleKey)}
        </p>
      ) : null}
    </div>
  );
}
