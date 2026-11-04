/**
 * Single source of truth for all business information used across the site.
 *
 * When the owner confirms new information (prices, hours, photos), update it
 * here instead of editing individual components.
 *
 * IMPORTANT: do not add prices, ratings, review counts, certifications or
 * guarantees that the business has not confirmed.
 */

export const business = {
  name: 'Nivas Bike Repair Services',
  shortName: 'Nivas Bike Repair',
  tagline: 'Bike repair & servicing in Sundaragiri',
  siteUrl: 'https://nivas-bike-repair-services.vercel.app/',

  phone: {
    display: '+91 91103 72978',
    e164: '+919110372978',
    telHref: 'tel:+919110372978',
  },

  whatsapp: {
    number: '919110372978',
    display: '+91 91103 72978',
  },

  address: {
    line1: '55VX+VRM',
    locality: 'Sundaragiri',
    region: 'Telangana',
    postalCode: '505467',
    country: 'India',
    countryCode: 'IN',
    display: '55VX+VRM, Sundaragiri, Telangana 505467, India',
  },

  plusCode: '55VX+VRM',

  maps: {
    // Plus Code search — deliberately no invented latitude/longitude.
    url: 'https://www.google.com/maps/search/?api=1&query=55VX%2BVRM%2C%20Sundaragiri%2C%20Telangana%20505467',
    embedUrl:
      'https://maps.google.com/maps?q=55VX%2BVRM%2C%20Sundaragiri%2C%20Telangana%20505467&t=&z=15&ie=UTF8&iwloc=&output=embed',
  },

  /**
   * Hours shown on the existing website. Kept until the owner confirms them.
   * See the delivery notes for the verification item.
   */
  hours: {
    weekdays: 'Monday – Saturday',
    time: '8:00 AM – 7:00 PM',
    sunday: 'Sunday: by appointment',
    schema: {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '08:00',
      closes: '19:00',
    },
  },

  /**
   * Set this to the Google Business Profile review URL once the owner supplies
   * it. Leave empty and the site will not show a "write a review" button.
   */
  googleReviewUrl: '',

  /** Brands already documented in the project. Confirm before expanding. */
  brands: ['Hero', 'Honda', 'Bajaj', 'TVS', 'Royal Enfield', 'Yamaha'],

  images: {
    hero: {
      src: '/images/hero-workshop-1600.jpg',
      srcSet:
        '/images/hero-workshop-900.jpg 900w, /images/hero-workshop-1600.jpg 1600w',
      width: 1600,
      height: 1000,
      altKey: 'hero_image_alt',
    },
    why: {
      src: '/images/why-workshop.jpg',
      srcSet: '/images/why-workshop-sm.jpg 600w, /images/why-workshop.jpg 900w',
      width: 900,
      height: 1100,
      altKey: 'why_image_alt',
    },
  },
};

/**
 * Services offered. `nameKey` / `descKey` map to translations in
 * src/context/LanguageContext.jsx.
 *
 * `price`: set a number (in INR) ONLY after the owner confirms the rate.
 * While it is null the UI shows "Contact us for an estimate" — never a
 * guessed or "from" price.
 */
export const services = [
  {
    id: 'general-servicing',
    nameKey: 'svc1_title',
    descKey: 'svc1_desc',
    icon: 'settings',
    price: null,
  },
  {
    id: 'engine-repair',
    nameKey: 'svc2_title',
    descKey: 'svc2_desc',
    icon: 'engine',
    price: null,
  },
  {
    id: 'engine-oil',
    nameKey: 'svc3_title',
    descKey: 'svc3_desc',
    icon: 'oil',
    price: null,
  },
  {
    id: 'brakes-clutch',
    nameKey: 'svc4_title',
    descKey: 'svc4_desc',
    icon: 'brake',
    price: null,
  },
  {
    id: 'maintenance',
    nameKey: 'svc5_title',
    descKey: 'svc5_desc',
    icon: 'wrench',
    price: null,
  },
  {
    id: 'chain-care',
    nameKey: 'svc6_title',
    descKey: 'svc6_desc',
    icon: 'chain',
    price: null,
  },
];

/**
 * Workshop gallery. These are licensed, representative photographs — not
 * photos of the Nivas workshop. Replace the files in public/images with real
 * workshop photos when they are available and keep the dimensions in sync.
 */
export const gallery = [
  {
    id: 'clutch',
    src: '/images/gallery-clutch.jpg',
    width: 1000,
    height: 750,
    titleKey: 'gallery1_title',
    altKey: 'gallery1_alt',
  },
  {
    id: 'engine',
    src: '/images/gallery-engine.jpg',
    width: 1000,
    height: 750,
    titleKey: 'gallery2_title',
    altKey: 'gallery2_alt',
  },
  {
    id: 'sprocket',
    src: '/images/gallery-sprocket.jpg',
    width: 1000,
    height: 750,
    titleKey: 'gallery3_title',
    altKey: 'gallery3_alt',
  },
  {
    id: 'classic',
    src: '/images/gallery-mechanic.jpg',
    width: 1000,
    height: 750,
    titleKey: 'gallery4_title',
    altKey: 'gallery4_alt',
  },
  {
    id: 'electrical',
    src: '/images/gallery-electrical.jpg',
    width: 1000,
    height: 750,
    titleKey: 'gallery5_title',
    altKey: 'gallery5_alt',
  },
  {
    id: 'local',
    src: '/images/gallery-local.jpg',
    width: 1000,
    height: 750,
    titleKey: 'gallery6_title',
    altKey: 'gallery6_alt',
  },
];

export const navLinks = [
  { id: 'home', key: 'nav_home' },
  { id: 'services', key: 'nav_services' },
  { id: 'why', key: 'nav_why' },
  { id: 'gallery', key: 'nav_gallery' },
  { id: 'process', key: 'nav_process' },
  { id: 'reviews', key: 'nav_feedback' },
  { id: 'faq', key: 'nav_faq' },
  { id: 'contact', key: 'nav_contact' },
];

export const seo = {
  title:
    'Nivas Bike Repair Services | Bike Servicing & Repair in Sundaragiri',
  description:
    'Bike servicing, engine repair, oil changes and brake work in Sundaragiri, Telangana. Talk directly to the mechanic and request an appointment on WhatsApp.',
  ogImage: '/images/og-image.jpg',
  locale: 'en_IN',
  themeColor: '#0e1116',
};
