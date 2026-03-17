# Brandon Canniff — AI Product Manager Portfolio

A professional portfolio website showcasing AI product leadership experience, case studies, and impact.

## Features

- **Modern dark design** with responsive layout
- **Three detailed case studies** from GenAI, govtech, and public health domains
- **Peer testimonials** from colleagues across product, engineering, and design
- **Skills & capabilities** highlighting technical depth and execution track record
- **Single-file HTML** — no dependencies, easily deployable

## Getting Started

### Local Development
```bash
# Open in browser
open index.html

# Or serve locally
python3 -m http.server 8000
# Visit http://localhost:8000
```

### Analytics Setup (Optional)
CTA click events are already instrumented in `index.html` via `data-track` attributes.

Recommended setup:

```bash
# edit analytics.config.js with real provider values
npm run check:analytics
```

The page auto-loads `analytics.config.js` at runtime if present.
Use strict mode in CI once production analytics values are expected:

```bash
npm run check:analytics:strict
```

### E2E Smoke Tests
```bash
npm install
npx playwright install chromium
npm run test:e2e
```

Smoke tests cover:
- core hero/contact CTA visibility
- navigation anchor flow (`#work`, `#contact`)
- hero image fallback behavior on image load error
- responsive hero image delivery path
- mobile menu toggle + Escape-close behavior
- case-study evidence CTA presence
- analytics bootstrap injection path
- evidence index routing

### Add Your Headshot
Replace source image and regenerate responsive variants:
```bash
# 1) Replace headshot.jpg
# 2) Regenerate responsive assets
python3 - <<'PY'
from PIL import Image
src = Image.open('headshot.jpg').convert('RGB')
w, h = src.size
side = min(w, h)
left = (w - side) // 2
top = (h - side) // 2
crop = src.crop((left, top, left + side, top + side))
for size in (140, 280, 560):
    out = crop.resize((size, size), Image.Resampling.LANCZOS)
    out.save(f'assets/images/headshot-{size}.webp', format='WEBP', quality=84, method=6)
    out.save(f'assets/images/headshot-{size}.jpg', format='JPEG', quality=86, optimize=True, progressive=True)
print('done')
PY
```

### Deploy Online
Push to GitHub Pages, Vercel, Netlify, or any static host.

```bash
# Deploy to GitHub Pages
git push origin main
# Then enable "Settings > Pages > Deploy from branch"
```

### Customize
- **Color scheme**: Edit CSS variables in `<style>` (--accent, --bg, etc.)
- **Content**: Update text directly in HTML sections
- **Logo**: Change "brandon." in nav to your name

## File Structure
```
index.html          # Complete portfolio (self-contained)
evidence.html       # Public sanitized artifact index
README.md          # This file
tests/smoke.spec.ts # Lightweight UI smoke tests
assets/images/      # Optimized responsive headshot assets
.github/workflows/  # CI automation for smoke tests
analytics.config.js # Runtime analytics config (safe defaults)
analytics.config.example.js # Analytics config template
```

## Deployment Options
1. **GitHub Pages** (free): Push to GitHub, enable Pages in settings
2. **Vercel** (free): Drag & drop index.html or connect repo
3. **Netlify** (free): Same as Vercel
4. **Custom domain**: Point DNS to any of the above

## Contact
- LinkedIn: https://www.linkedin.com/in/brandoncanniff/
- GitHub: https://github.com/gobrando
- Email: iambrandomoon@gmail.com

---

Built for impact. Ship fast. Scale responsibly.
