import { Wrench } from 'lucide-react';
import { business } from '../../config/business';

/**
 * Brand lockup used in the navbar and footer.
 * `onDark` switches the wordmark colour for transparent/dark surfaces.
 */
export default function Logo({ onDark = false, className = '' }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[6px] bg-accent text-ink shadow-[0_6px_18px_-8px_rgba(249,115,22,0.9)]">
        <Wrench aria-hidden="true" className="h-[18px] w-[18px]" strokeWidth={2.4} />
      </span>
      <span className="min-w-0 leading-none">
        <span
          className={`block font-display text-[0.95rem] font-extrabold tracking-tight ${
            onDark ? 'text-white' : 'text-ink'
          }`}
        >
          Nivas Bike Repair
        </span>
        <span
          className={`mt-1 block text-[0.6rem] font-semibold uppercase tracking-[0.2em] ${
            onDark ? 'text-white/55' : 'text-muted'
          }`}
        >
          {business.address.locality} · Telangana
        </span>
      </span>
    </span>
  );
}
