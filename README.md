# Marine Experts — Astro Landing Page

Production-ready landing site for Marine Experts built with Astro 5, Tailwind CSS, and a few client islands (React) for interactive parts. It includes a contact API with SMTP, SEO metadata, dynamic Open Graph image, Plausible tracking, and Vercel Analytics.

— Live domain: `https://marineexpertsuae.com` (set via `astro.config.mjs`)

## Tech Stack

- Astro 5 (server output with Vercel adapter)
- Tailwind CSS (+ typography)
- React islands: `ContactForm`, `FAQAccordion`, `PricingTable`
- Nodemailer (serverless API route)
- Plausible Analytics + outbound links plugin
- Vercel Analytics (`@vercel/analytics/astro`)
- Sharp image service (Astro built-in)

## Features

- SEO-friendly pages with `MetaTags` and dynamic OG image at `/og.svg`
- Contact form posting to `/api/contact` with optional hCaptcha verify
- A/B cookie middleware for hero variant (`heroA`/`heroB`)
- Click tracking helpers in `public/cta-track.js`
- Clean component structure and reusable content in `src/content/site.ts`

## Getting Started

Install dependencies:

```powershell
npm install
```

Run the dev server (default port `4321`):

```powershell
npm run dev
```

Expose to your LAN (binds to `0.0.0.0`):

```powershell
npm run dev:host
```

Build and preview production output:

```powershell
npm run build
npm run preview
```

## Environment Variables

Create a `.env.local` (not committed) and configure these values for local/dev. On Vercel, set them in Project → Settings → Environment Variables.

- `SITE`: Full site origin, e.g. `https://marineexpertsuae.com` (used by Astro `site` and meta urls)
- `PLAUSIBLE_DOMAIN`: Domain used by Plausible, e.g. `marineexpertsuae.com`
- `HCAPTCHA_ENABLED`: `true` to enforce captcha server-side; omit/false to skip
- `HCAPTCHA_SITEKEY`: hCaptcha site key for the client form
- `HCAPTCHA_SECRET`: hCaptcha secret for server verification
- `SMTP_HOST`: SMTP host (e.g., `smtp.zoho.com`)
- `SMTP_PORT`: SMTP port (`465` for SSL or `587` for STARTTLS)
- `SMTP_USER`: SMTP username
- `SMTP_PASS`: SMTP password or app password
- `MAIL_TO`: Destination email address for contact submissions

Important: Never commit real secrets. Use Vercel environment variables in production.

## Analytics

- Plausible is loaded in `src/pages/index.astro` via `<script defer data-domain="...">` and a small queue shim in `public/plausible-shim.js`.
- Vercel Analytics is wired in `src/layouts/Base.astro` and only renders in production:
  - `import Analytics from '@vercel/analytics/astro'`
  - `{import.meta.env.PROD && <Analytics />}`

## Project Structure

```text
src/
  components/        Reusable UI components (Astro + React islands)
  layouts/           `Base.astro` and page layout
  pages/             Astro routes (including `/api/contact` and `/og.svg.ts`)
  utils/             SEO helpers (JSON-LD, etc.)
  content/           Site copy and config objects
public/              Static assets, icons, tracking helpers
scripts/             Utility scripts (e.g., OG helpers)
```

## Contact API

- Endpoint: `POST /api/contact`
- Validates fields, optionally verifies hCaptcha, and sends an email via SMTP.
- On auth/connection issues, the API returns an error with hints; check your SMTP host region and credentials.

## Deployment (Vercel)

1. Set `Adapter: vercel()` in `astro.config.mjs` (already configured).
2. Push to your Git repo and import the project in Vercel.
3. Add environment variables (see above) to Production and Preview.
4. Set your domain in Vercel and update `SITE` to the final origin.

## NPM Scripts

- `dev`: Start local dev server
- `dev:host`: Start dev server bound to `0.0.0.0`
- `build`: Create production build
- `preview`: Preview the build locally
- `lint`: Run ESLint
- `format`: Run Prettier on the repo

## Troubleshooting

- SMTP verify failed: confirm host/port, use an app password, and check data-center (`.com` vs `.eu`).
- hCaptcha failing locally: ensure both site key and secret are set; disable with `HCAPTCHA_ENABLED=false` for local.
- Wrong canonical/OG URLs: confirm `SITE` matches your deployed origin.

## License

Private project. All rights reserved.
