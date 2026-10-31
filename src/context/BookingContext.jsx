import { useCallback, useMemo, useState } from 'react';
import { BookingContext } from './useBooking';

/**
 * Lets any "Book this service" button prefill the booking form and scroll to it,
 * without duplicating booking state in each component.
 */
export const BookingProvider = ({ children }) => {
  const [request, setRequest] = useState(null);

  const openBooking = useCallback((serviceId = '') => {
    setRequest({ id: serviceId, nonce: Date.now() });

    const target = document.getElementById('book');
    if (!target) return;

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    target.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  }, []);

  const clearRequest = useCallback(() => {
    setRequest((current) => (current ? { ...current, id: '' } : current));
  }, []);

  const value = useMemo(
    () => ({ request, openBooking, clearRequest }),
    [request, openBooking, clearRequest],
  );

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
};
