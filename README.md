# Nivas Bike Repair Services

A mobile-first, bilingual (English / Telugu) website for a motorcycle workshop in
Sundaragiri, Telangana. Visitors can review the services, ask for an estimate and
send a booking request directly to the workshop on WhatsApp.

## Stack

- React 19 + Vite 8
- Tailwind CSS 4 (design tokens in `src/index.css`)
- Framer Motion for reveal / hero motion
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
| `services[].price` | `null` until the owner confirms a rate |

Prices are intentionally `null`. The UI then says **“Contact us for an estimate”**
rather than showing an invented figure. To publish a confirmed starting price,
set a number (INR), for example:

```js
{ id: 'general-servicing', /* … */ price: 450 }
```

The pricing section will render “Starting from ₹450”.

Copy for both languages is in `src/context/LanguageContext.jsx`. Every visible
string has matching `en` and `te` keys; keep them in sync when editing.

## Booking flow

- The form collects name, mobile number, bike brand, model, required service,
  preferred date, preferred time and an optional problem description.
- Indian mobile numbers are normalised and validated (`src/lib/whatsapp.js`).
- Submitting builds a URL-encoded message and opens
  `https://wa.me/919110372978?text=…` in a new tab.
- Nothing is sent to a server and nothing is stored in the browser.
- The interface states that the appointment is **not confirmed** until the
  workshop replies on WhatsApp. There is no fake “booking confirmed” state.

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
phone number, address and weekday hours. It deliberately has **no** `geo`,
`aggregateRating`, review count, price range or certification that the owner has
not verified.

`public/og-image.jpg` (1024 × 536) is the social preview image. Replace it with
a real workshop photo when available and keep the dimensions in `index.html` in
sync.

## Deploying to Vercel

1. Push the repository to GitHub/GitLab/Bitbucket.
2. In Vercel, choose **Add New → Project** and import the repository.
3. Framework preset: **Vite**. Build command: `npm run build`. Output: `dist`.
4. Deploy, then add the final domain under **Settings → Domains**.
5. Update the public URL in the four places listed above and redeploy.
6. In Google Search Console, submit the deployed `sitemap.xml` and request
   indexing for `/`.

Any static host works as well: upload the contents of `dist/` and keep the
`public/` files (`robots.txt`, `sitemap.xml`, images) at the site root.

## Accessibility and motion

- Semantic landmarks, skip link, visible focus rings, labelled form fields,
  inline validation and a focus trap in the mobile menu.
- WCAG 2.2 AA target; body text and muted copy use contrast-checked colours.
- `prefers-reduced-motion` disables smooth scrolling and shortens animations.
- The mobile action bar respects `env(safe-area-inset-bottom)` on notched phones.

## Images

`public/workshop-hero.jpg` and its variants are temporary crops from the supplied
reference image. The shirt still shows another workshop name and the photo should
be replaced with **real photos of Nivas Bike Repair Services** before launch.
Recommended replacements:

- Hero portrait: about 720 × 900 or larger
- Detail / “why us” landscape: about 1024 × 640
- Social preview: 1200 × 630 (or 1024 × 536)

## HeroScrub component note

The originally supplied `hero-scrub.tsx` demo depends on TypeScript, shadcn/ui
project conventions, GSAP ScrollTrigger and a 300-frame Ferrari image sequence.
This project is JavaScript + Tailwind, has no shadcn setup, and the Ferrari
imagery is unrelated to a local bike workshop.

Instead, `src/components/ui/HeroScrub.jsx` adapts the same scroll-scrub idea to
the existing stack using Framer Motion scroll transforms and the workshop image.
This avoids a new GSAP dependency and a multi-megabyte frame download on mobile.

To use the literal GSAP demo instead, you would need to:

1. Convert the project to TypeScript and add a `components.json` / shadcn setup.
2. `npm install gsap` and register `ScrollTrigger`.
3. Host the 300-frame sequence and preload it (several MB and a major mobile
   performance cost), or replace it with your own short image sequence.
4. Rebuild the component around the real workshop imagery.

## Before launch — owner verification

- [ ] Confirm exact service prices (or keep “Contact us for an estimate”).
- [ ] Confirm working hours (currently Mon–Sat 8:00 AM–7:00 PM, Sunday by appointment).
- [ ] Confirm service scope and supported brands.
- [ ] Confirm the phone/WhatsApp number and full address.
- [ ] Supply the Google Business Profile review URL (optional).
- [ ] Replace the reference workshop photos with real photos.
- [ ] Replace the placeholder deployment URL everywhere listed above.
