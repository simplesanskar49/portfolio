# Sanskar Kumar — Portfolio

Personal portfolio of Sanskar Kumar, Product Engineer (full-stack · React, TypeScript, Go).

## Stack

- **React 19 + React Router 7** (framework mode, `ssr: false` + `prerender: true` → fully static HTML)
- **Vite 8**, **TypeScript** (strict)
- **Tailwind CSS v4** with design tokens in `src/styles/tokens.css` (dark-first, teal accent, rem units)
- **Vercel** hosting + **Vercel Web Analytics** (cookie-free visitor stats)
- Self-hosted fonts: Inter Variable, JetBrains Mono Variable

## Getting started

```bash
nvm use            # Node 22 (see .nvmrc)
npm install
npm run dev        # http://localhost:5173
```

## Scripts

| Script              | What it does                                              |
| ------------------- | --------------------------------------------------------- |
| `npm run dev`       | Dev server with HMR                                       |
| `npm run build`     | Prerender the site to `build/client`                      |
| `npm run preview`   | Serve the production build locally                        |
| `npm run typecheck` | Generate route types + `tsc`                              |
| `npm run lint`      | ESLint (typescript-eslint strict, jsx-a11y, react-hooks)  |
| `npm run format`    | Prettier (with Tailwind class sorting)                    |
| `npm test`          | Unit/component tests (Vitest + Testing Library)           |
| `npm run test:e2e`  | Playwright: a11y (axe) + no horizontal scroll at 8 widths |
| `npm run check`     | Everything CI runs, except e2e                            |

## Deploy (Vercel)

Static output, configured in `vercel.json` (build `npm run build`, output `build/client`, security + cache headers). Missing paths get `404.html` with a 404 status.

Live at **https://sanskar-kumar.vercel.app** (the project domain, also the default in `src/constants/site.ts`). Every push to `main` deploys to production.

1. To move to a custom domain: add it under the project's **Domains**, then set `VITE_SITE_URL` (see `.env.example`) in the Production environment and redeploy.
2. **Analytics** tab → enable Web Analytics.
3. **Google Search Console** → Add property → **URL prefix** → HTML tag. Put the `content` value in `VITE_GOOGLE_SITE_VERIFICATION`, redeploy, click Verify. Then **Sitemaps** → submit `sitemap.xml`.
4. **Bing Webmaster Tools** → import the site from Search Console (or use `VITE_BING_SITE_VERIFICATION` with the HTML tag method). Bing also powers ChatGPT and Copilot search.

Preview deployments are `noindex` by default on Vercel, so only production is indexed.

## Project structure

```
src/
  root.tsx  routes.ts     app shell + route config
  routes/                 route modules (lowercase = URL)
  components/atoms/       design-system primitives (Button, Card, Badge…)
  components/layout/      NavBar, Footer, Section
  components/sections/    page sections (Hero, Experience…)
  content/                typed site copy (single place to edit text)
  types/  hooks/  utils/  constants/
  styles/tokens.css       design tokens (dark + light)
e2e/                      Playwright tests
test/                     Vitest setup
```

## Conventions

- Components are PascalCase (`NavBar.tsx`), routes lowercase (`home.tsx`), other modules camelCase.
- Copy lives in `src/content`; components never hard-code text.
- Components use semantic tokens (`bg-bg-surface`, `text-text-muted`, `text-accent`), never raw hex.
- Sizes in rem. Mobile-first classes.
