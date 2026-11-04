/**
 * Small date/time helpers shared by the review step and the WhatsApp message.
 * Dates are handled as local `YYYY-MM-DD` strings to avoid timezone surprises.
 */

export function todayISO() {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
}

export function formatDateLabel(iso) {
  if (!iso) return '';
  const date = new Date(`${iso}T00:00:00`);

  if (Number.isNaN(date.getTime())) return iso;

  return new Intl.DateTimeFormat('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

/** Convert a 24-hour "HH:MM" value into a friendly 12-hour label. */
export function formatTimeLabel(value) {
  if (!value) return '';
  const [hoursPart, minutesPart = '00'] = value.split(':');
  const hours = Number(hoursPart);

  if (Number.isNaN(hours)) return value;

  const suffix = hours >= 12 ? 'PM' : 'AM';
  const hour12 = hours % 12 || 12;
  return `${hour12}:${minutesPart} ${suffix}`;
}

/**
 * 30-minute slots inside the workshop's published hours.
 * 8:00 AM through 6:30 PM; the workshop confirms the exact slot.
 */
export const timeSlots = [
  { value: '08:00', period: 'morning' },
  { value: '08:30', period: 'morning' },
  { value: '09:00', period: 'morning' },
  { value: '09:30', period: 'morning' },
  { value: '10:00', period: 'morning' },
  { value: '10:30', period: 'morning' },
  { value: '11:00', period: 'morning' },
  { value: '11:30', period: 'morning' },
  { value: '12:00', period: 'afternoon' },
  { value: '12:30', period: 'afternoon' },
  { value: '13:00', period: 'afternoon' },
  { value: '13:30', period: 'afternoon' },
  { value: '14:00', period: 'afternoon' },
  { value: '14:30', period: 'afternoon' },
  { value: '15:00', period: 'afternoon' },
  { value: '15:30', period: 'afternoon' },
  { value: '16:00', period: 'afternoon' },
  { value: '16:30', period: 'afternoon' },
  { value: '17:00', period: 'evening' },
  { value: '17:30', period: 'evening' },
  { value: '18:00', period: 'evening' },
  { value: '18:30', period: 'evening' },
].map((slot) => ({ ...slot, label: formatTimeLabel(slot.value) }));
