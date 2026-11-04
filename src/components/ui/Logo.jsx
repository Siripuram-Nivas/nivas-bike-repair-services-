import { Wrench } from 'lucide-react';
import { business } from '../../config/business';

/**
 * Brand lockup used in the navbar and footer.
 * `onDark` switches the wordmark colour for transparent/dark surfaces.
 */
export default function Logo({ onDark = false, className = '' }) {
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-[4px] bg-accent text-ink shadow-[0_8px_20px_-10px_rgba(245,158,11,0.9)]">
        <Wrench aria-hidden="true" className="h-5 w-5" strokeWidth={2.4} />
        <span
          aria-hidden="true"
          className="absolute inset-x-1.5 bottom-1.5 h-px bg-ink/25"
        />
      </span>
      <span className="min-w-0 leading-none">
        <span
          className={`block font-display text-[1.0625rem] font-extrabold uppercase leading-none tracking-[0.02em] ${
            onDark ? 'text-white' : 'text-ink'
          }`}
        >
          {business.shortName}
        </span>
        <span
          className={`mt-1.5 block text-[0.5625rem] font-semibold uppercase tracking-[0.22em] ${
            onDark ? 'text-white/50' : 'text-muted'
          }`}
        >
          {business.address.locality} · Telangana
        </span>
      </span>
    </span>
  );
}
