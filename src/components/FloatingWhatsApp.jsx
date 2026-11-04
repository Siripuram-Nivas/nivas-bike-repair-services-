import { MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/useLanguage';
import { generalEnquiryUrl } from '../lib/whatsapp';

export default function FloatingWhatsApp() {
  const { t } = useLanguage();

  return (
    <div className="fixed bottom-6 right-5 z-40 hidden min-[1380px]:block">
      <a
        href={generalEnquiryUrl}
        target="_blank"
        rel="noopener noreferrer"
        id="floating-whatsapp-btn"
        aria-label={`${t('floating_label')} (${t('new_tab')})`}
        className="group relative flex items-center justify-center rounded-full bg-whatsapp text-[#082415] shadow-[0_14px_34px_-12px_rgba(37,211,102,0.8)] transition-transform duration-200 hover:-translate-y-0.5 hover:scale-[1.04] active:translate-y-0"
        style={{ height: '3.25rem', width: '3.25rem' }}
      >
        <MessageCircle aria-hidden="true" className="relative z-10 h-6 w-6" />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-[calc(100%+0.6rem)] whitespace-nowrap rounded-[3px] border border-line bg-white px-3 py-1.5 text-xs font-semibold text-ink opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
        >
          {t('floating_label')}
        </span>
      </a>
    </div>
  );
}
