import { CalendarCheck, MessageCircle, Phone } from 'lucide-react';
import { business } from '../config/business';
import { useLanguage } from '../context/useLanguage';
import { generalEnquiryUrl } from '../lib/whatsapp';

export default function MobileActionBar() {
  const { t } = useLanguage();

  return (
    <nav
      aria-label={t('mobile_actions')}
      className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ink/95 backdrop-blur-md lg:hidden"
    >
      <div className="grid grid-cols-3 divide-x divide-white/10 safe-bottom">
        <a
          href={business.phone.telHref}
          className="flex min-h-[3.5rem] flex-col items-center justify-center gap-1 text-white/65 transition-colors hover:text-white active:bg-white/5"
        >
          <Phone aria-hidden="true" className="h-[18px] w-[18px]" />
          <span className="text-[0.625rem] font-semibold uppercase tracking-[0.08em]">
            {t('action_call')}
          </span>
        </a>

        <a
          href={generalEnquiryUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-[3.5rem] flex-col items-center justify-center gap-1 text-whatsapp transition-colors hover:text-[#3ee07d] active:bg-white/5"
        >
          <MessageCircle aria-hidden="true" className="h-[18px] w-[18px]" />
          <span className="text-[0.625rem] font-semibold uppercase tracking-[0.08em]">
            {t('action_whatsapp')}
          </span>
          <span className="sr-only"> ({t('new_tab')})</span>
        </a>

        <a
          href="#book"
          className="flex min-h-[3.5rem] flex-col items-center justify-center gap-1 bg-accent text-ink transition-colors hover:bg-[#fb923c] active:bg-accent"
        >
          <CalendarCheck aria-hidden="true" className="h-[18px] w-[18px]" />
          <span className="text-[0.625rem] font-bold uppercase tracking-[0.08em]">
            {t('action_book')}
          </span>
        </a>
      </div>
    </nav>
  );
}
