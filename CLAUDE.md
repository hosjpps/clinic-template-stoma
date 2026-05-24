# AI builder instructions — clinic-template-stoma

This is a Next.js 16 App Router dental clinic template.
`output: 'export'` — fully static, no server runtime.

## Stack

- **Next.js 16** App Router, `output: 'export'`
- **Tailwind CSS v4** + **shadcn/ui** (base-ui variant, base-nova style)
- **@base-ui/react** — accordion, button, checkbox, dialog, radio, select, sheet
- **TypeScript** strict, `@/*` path alias → project root
- **React Hook Form** + **Zod v4** + `standardSchemaResolver`
- **pnpm** package manager

## Palette C — Soft hybrid

```
primary:    #1E3A5F
accent:     #7BA3C0
bg-soft:    #F4F1EC
background: white
```

CSS vars in `app/globals.css`.

## Data architecture

All clinic-specific data lives in `content/`:

| File | Purpose |
|------|---------|
| `clinic.ts` | Name, address, phones, hours, rating, social, metro, features, promos |
| `doctors.ts` | Doctor list with id, name, position, specialization, photo path |
| `services.ts` | Service cards shown on homepage and `/uslugi/` |
| `faq.ts` | FAQ accordion items |
| `prices.ts` | AUTO-GENERATED — run `pnpm scrape:prices` |
| `reviews.ts` | AUTO-GENERATED — run `pnpm scrape:reviews` |

**Never hardcode clinic-specific values in components.** Always import from `content/`.

## Key rules

1. **Read before editing.** Always read the target file before proposing changes.
2. **content/*.ts is the single source of truth.** Components must read from there.
3. **Static export constraints**: no `useSearchParams` without Suspense, no server-only APIs, no dynamic routes without `generateStaticParams`.
4. **Images via ClinicImage component** (`components/ClinicImage.tsx`) — handles avif/webp/jpg srcSet. Raw images go in `public/images/raw/`, optimized output in `public/images/`.
5. **Form submission** goes to `clinic.yclientsUrl` (booking widget) or the inline fetch in `BookingForm.tsx`. No server actions — static export.
6. **Smoke tests** live in `tests/smoke.spec.ts`. Run `pnpm test:e2e` after `pnpm build`.

## Filling the template (step order)

**Step 0** — RESEARCH first. See [`RESEARCH-PIPELINE.md`](./RESEARCH-PIPELINE.md) — full Playwright + curl scraping workflow for collecting clinic data from Yandex Maps, 2GIS, Prodoctorov, old website. Output goes to `research/` directory at project root (sibling to this Next.js dir). Do NOT skip — without scraped data the next steps are guesswork.

Then:

1. `content/clinic.ts` — fill from `research/clinic_data.json`
2. `content/doctors.ts` — real doctor list from `research/clinic_data.json` + `research/doctors-prodoctorov/`
3. `content/faq.ts` — clinic-specific answers
4. `pnpm scrape:prices` — reads `research/prices/all_prices.json` → writes `content/prices.ts`
5. `pnpm scrape:reviews` — reads `research/reviews_yandex.json` → writes `content/reviews.ts`
6. Curate images → drop to `public/images/raw/clinic/` and `public/images/raw/doctors/`
7. `pnpm optimize:images` — generates AVIF + WebP + JPEG fallback at 640/1280/1920 widths
8. Update production URL in `app/layout.tsx` (`metadataBase`), `app/sitemap.ts` (`BASE`), `components/JsonLd.tsx` (`SITE_URL`)
9. `pnpm build && pnpm test:smoke`
10. Push to GitHub + deploy to Vercel

## Reference implementations

| Repo | Specialty | Notes |
|---|---|---|
| https://github.com/hosjpps/apex-dental-bytovo | Стоматология (АПЕКС, Южное Бутово) | Original reference — 14 routes, 6 service detail pages, full content |
| (TBD) | Акушерство-гинекология | Second reference for non-stoma clinics — adds different UX patterns |

Study these to understand how a filled template looks in production.

## Do NOT

- Run `git`, `pnpm install`, or modify `pnpm-lock.yaml` unless explicitly asked.
- Copy real patient data, doctor photos, or clinic images from the reference.
- Add comments that restate the code — only explain non-obvious decisions.
- Create new abstraction layers / wrappers unless the task demands them.
