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

### Add Your Headshot
Replace the placeholder headshot by:
1. Converting your image to base64
2. Finding the line: `src="data:image/svg+xml,..."`
3. Replace with: `src="data:image/jpeg;base64,[YOUR_BASE64_HERE]"`

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
README.md          # This file
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
