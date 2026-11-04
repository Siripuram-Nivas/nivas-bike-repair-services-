# Nivas Bike Repair Services

A mobile-first, bilingual (English / Telugu) website for a motorcycle workshop in
Sundaragiri, Telangana. Visitors can review the services, browse the workshop
gallery and send a structured booking request directly to the workshop on
WhatsApp.

## Stack

- React 19 + Vite 8
- Tailwind CSS 4 (design tokens and component classes in `src/index.css`)
- Framer Motion for reveal and hero motion
- Lucide React icons
- No backend, database or customer-data storage

## Run locally

```bash
npm install
npm run dev       # http://localhost:5173
npm run lint
npm run build     # production output in dist/
npm run preview
```

Node 20.19+ or 22.12+ is recommended for Vite 8.

## Page structure

`src/App.jsx` renders the sections in this order:

1. Hero
2. Services (estimates, no invented prices)
3. Why choose us
4. Gallery (accessible lightbox)
5. How it works (four steps)
6. Bike care tips
7. Rider feedback (no fabricated testimonials or ratings)
8. FAQ
9. Booking wizard
10. Contact and map
11. Footer, mobile action bar and floating WhatsApp button

English and Telugu copy lives in `src/context/LanguageContext.jsx`. Every
visible string has matching `en` and `te` keys; keep both in sync when editing.

## Where to edit business information

All business details live in **`src/config/business.js`**:

| Field | Purpose |
| --- | --- |
| `phone` | Display number and `tel:` link |
| `whatsapp.number` | Number used by every WhatsApp link (currently `919110372978`) |
| `address` / `plusCode` | Address shown on the site and in structured data |
| `maps.url` / `maps.embedUrl` | Google Maps directions link and embedded map |
| `hours` | Displayed hours and schema.org opening hours |
| `googleReviewUrl` | Optional Google review link; leave empty to fall back to Maps |
| `images` | Hero and “why us” image paths, dimensions and alt-text keys |
| `gallery` | Gallery image paths, dimensions, titles and alt-text keys |
| `services[].price` | `null` until the owner confirms a rate |

Prices are intentionally `null`. The UI then shows **“Contact for estimate”**
rather than an invented figure. To publish a confirmed starting price, set a
number in INR:

```js
{ id: 'general-servicing', /* … */ price: 450 }
```

The services section will then show “Starting from ₹450”. Parts are always
quoted separately.

## Booking flow

The booking section is a six-step wizard:

1. Select a service
2. Bike brand and model
3. Name and Indian mobile number
4. Preferred date and time slot
5. Optional problem description
6. Review and send

- Indian mobile numbers are normalised and validated (`src/lib/whatsapp.js`).
- Dates use local `YYYY-MM-DD` values and 30-minute slots inside the published
  workshop hours (`src/lib/datetime.js`).
- Submitting builds a URL-encoded message and opens
  `https://wa.me/919110372978?text=…` in a new tab.
- Nothing is sent to a server and nothing is stored in the browser.
- The interface states that the appointment is **not confirmed** until the
  workshop replies on WhatsApp. There is no fake “booking confirmed” state.
- “Book this service” buttons prefill the wizard and move focus to it.

## SEO, social previews and deployment URL

The canonical URL, Open Graph tags, Twitter card, JSON-LD, `robots.txt` and
`sitemap.xml` currently use the placeholder:

```
https://nivas-bike-repair-services.vercel.app/
```

Before going live, replace that string in:

1. `index.html` (canonical, `og:url`, `og:image`, `twitter:image`, JSON-LD IDs)
2. `public/robots.txt`
3. `public/sitemap.xml`
4. `src/config/business.js` (`siteUrl`)

The structured data describes an `AutoRepair` / `LocalBusiness` with the real
phone number, address and weekday hours, plus an `FAQPage` that mirrors the
visible FAQ. It deliberately has **no** `geo`, `aggregateRating`, review count,
price range or certification that the owner has not verified.

`public/images/og-image.jpg` (1200 × 630) is the social preview image. Replace
it with a real workshop photo when available and keep the dimensions in
`index.html` in sync.

## Deploying to Vercel

1. Push the repository to GitHub/GitLab/Bitbucket.
2. In Vercel, choose **Add New → Project** and import the repository.
3. Framework preset: **Vite**. Build command: `npm run build`. Output: `dist`.
4. Deploy, then add the final domain under **Settings → Domains**.
5. Update the public URL in the four places listed above and redeploy.
6. In Google Search Console, submit the deployed `sitemap.xml` and request
   indexing for `/`.

Any static host works as well: upload the contents of `dist/` and keep the
`public/` files (`robots.txt`, `sitemap.xml`, `images/`) at the site root.

## Accessibility and motion

- Semantic landmarks, skip link, visible focus rings, labelled form fields,
  inline validation and a focus trap in the mobile menu.
- The gallery lightbox traps focus, closes with Escape, supports arrow-key
  navigation and returns focus to the photo that opened it.
- The booking wizard announces each step, moves focus to the step heading and
  focuses the first invalid field.
- `prefers-reduced-motion` disables smooth scrolling and shortens animations.
- The mobile action bar respects `env(safe-area-inset-bottom)` on notched phones.

## Images and credits

All photographs in `public/images/` are licensed stock photos from
[Pexels](https://www.pexels.com/) and are **representative** of motorcycle
workshop work — they are not photos of the Nivas workshop. Photo IDs:
`4427647`, `3822843`, `38158330`, `37609825`, `24861968`, `5184917`, `3855231`
and `16718410`.

Replace them with real workshop photos when available, keeping the same file
names and dimensions (or update `src/config/business.js` and `index.html`):

| File | Use | Size |
| --- | --- | --- |
| `hero-workshop-1600.jpg` / `-900.jpg` | Hero | 1600 × 1000 / 900 × 563 |
| `why-workshop.jpg` / `-sm.jpg` | Why us | 900 × 1100 / 600 × 733 |
| `gallery-*.jpg` | Gallery (6 photos) | 1000 × 750 |
| `og-image.jpg` | Social preview | 1200 × 630 |

## HeroScrub component note

The originally supplied `hero-scrub.tsx` demo depends on TypeScript, shadcn/ui
project conventions, GSAP ScrollTrigger and a 300-frame image sequence. This
project is JavaScript + Tailwind and has no shadcn setup.

Instead, `src/components/ui/HeroScrub.jsx` adapts the scroll-scrub idea to the
existing stack using Framer Motion scroll transforms and a single optimised
workshop photograph. This avoids a new GSAP dependency and a multi-megabyte
frame download on mobile.

## Before launch — owner verification

- [ ] Confirm exact service prices (or keep “Contact for estimate”).
- [ ] Confirm working hours (currently Mon–Sat 8:00 AM–7:00 PM, Sunday by appointment).
- [ ] Confirm service scope and supported brands.
- [ ] Confirm the phone/WhatsApp number and full address.
- [ ] Supply the Google Business Profile review URL (optional).
- [ ] Replace the representative stock photos with real workshop photos.
- [ ] Replace the placeholder deployment URL everywhere listed above.
