import { business } from '../config/business';

/** Build a wa.me link with a safely URL-encoded message. */
export function buildWhatsAppUrl(message) {
  return `https://wa.me/${business.whatsapp.number}?text=${encodeURIComponent(message)}`;
}

/** Short message used by general "chat with us" buttons. */
export const generalEnquiryUrl = buildWhatsAppUrl(
  `Hello ${business.name}!\n\nI would like to book a bike service. Please share the next available appointment.`,
);

/** Feedback invitation used in the reviews section. */
export const feedbackUrl = buildWhatsAppUrl(
  `Hello ${business.name}!\n\nI recently had my bike serviced with you and would like to share some feedback:\n\n`,
);

/**
 * Build the booking message. Mirrors the format requested by the business.
 * No customer data is stored anywhere — it only becomes part of the WhatsApp
 * message the customer chooses to send.
 */
export function buildBookingMessage({
  name,
  phone,
  brand,
  model,
  service,
  date,
  time,
  problem,
}) {
  const lines = [
    `Hello ${business.name}!`,
    '',
    'I would like to book a bike service.',
    '',
    `Name: ${name.trim()}`,
    `Phone: ${phone.trim()}`,
    `Bike: ${`${brand} ${model}`.trim()}`,
    `Service: ${service}`,
    `Preferred Date: ${date}`,
    `Preferred Time: ${time}`,
  ];

  if (problem.trim()) {
    lines.push(`Problem: ${problem.trim()}`);
  }

  lines.push('', 'Please confirm the appointment availability.');

  return lines.join('\n');
}

export function bookingUrl(details) {
  return buildWhatsAppUrl(buildBookingMessage(details));
}

/**
 * Normalise an Indian mobile number: strips spaces, dashes, parentheses and
 * a leading +91 / 91 / 0. Returns a 10-digit string, or null when invalid.
 */
export function normaliseIndianMobile(value) {
  const digits = String(value).replace(/\D/g, '');
  const local = digits
    .replace(/^91(?=\d{10}$)/, '')
    .replace(/^0(?=\d{10}$)/, '');
  return /^[6-9]\d{9}$/.test(local) ? local : null;
}
