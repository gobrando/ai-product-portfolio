# Production Checklist

Last updated: 2026-03-16

## Completed
- SEO baseline (`description`, canonical, OG/Twitter metadata)
- Structured data (`Person` JSON-LD)
- Dedicated social preview image (`og-banner.png`)
- Mobile navigation behavior and accessibility polish (labels + Escape close)
- CTA funnel event instrumentation (`data-track` hooks + analytics shim)
- Case-study evidence request CTA blocks
- Public evidence index page (`evidence.html`) with per-case anchors
- Evidence gallery polish with proof metadata, case filters, and artifact search
- Responsive hero headshot assets (`jpg` + `webp`, `srcset` via `<picture>`)
- Playwright smoke coverage for key UI flows
- GitHub Actions workflow for smoke tests on push/PR
- Local smoke test baseline complete: 14/14 pass (desktop + mobile)
- Additional smoke coverage for evidence filter/search behavior
- Evidence page funnel instrumentation (filter/search/request/back-path events)
- Evidence artifact preview UX (sanitized thumbnail cards + modal preview + keyboard close)
- Smoke test coverage for artifact preview modal flow
- Analytics config validation script (`npm run check:analytics`, strict mode available)

## Remaining
- Configure production analytics account details:
  - edit `analytics.config.js` with `provider` + `domain` (Plausible) or `measurementId` (GA4)
- Confirm first successful CI run in GitHub Actions on default branch
- Optional: replace generated placeholder thumbnails with final redacted screenshots or short clip captures per artifact

## Verification Commands
```bash
npm install
npx playwright install chromium
npm run test:e2e
```

## Current Test Scope
- Hero and contact CTA visibility
- Top-nav anchor routing on desktop and mobile
- Mobile menu behavior (toggle + Escape close)
- Hero image fallback behavior
- Case-study evidence CTA presence
- Analytics bootstrap script injection path
- Evidence index page reachability and anchor routing
- Evidence filter/search behavior and evidence-page analytics bootstrap
