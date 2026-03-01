OG image export checklist
=========================

Filenames to use (place in `public/` or site root):
- `og-image.png`        — default Open Graph image (recommended master for most platforms)
- `og-twitter.png`      — Twitter / X large summary card image

Primary recommended sizes
- `og-image.png` (1x): 1200 × 630 px (1.91:1) — good default for Facebook, LinkedIn, WhatsApp, Slack, Discord
- `og-twitter.png` (1x): 1200 × 675 px (16:9) — preferred for Twitter/X large summary card

Retina / hi-DPI masters (keep for exporting crisp assets)
- `og-image@2x` master: 2400 × 1260 px
- `og-twitter@2x` master: 2400 × 1350 px

File formats
- Use sRGB color profile.
- PNG: for images with text, logos, or flat-color graphics (recommended)
- JPEG: for photographs (export at high quality)
- Avoid SVG as the only OG image — many social crawlers prefer PNG/JPEG.

Safe area and layout
- Keep logos and text within the central 80% area — leave ~10% padding on each edge.
- Use clear, large type (≥24px at 1200px width) so text remains legible after cropping/scaling.

Illustrator export steps (quick)
1. Create artboard at the correct pixel size (e.g., 1200 × 630 px). Set raster effects to 300 ppi.
2. Work in sRGB color space: `File > Document Color Mode > RGB Color` and use `Edit > Assign Profile` if necessary.
3. Keep important content inside a centered guide (10% margin).
4. When ready to export: `File > Export > Export for Screens` and choose PNG 1x and PNG 2x (for retina). Or `File > Export > Export As...` with `Use Artboards` and `PNG`.
5. For JPEG exports use Quality 80–90% for a good tradeoff.

File size
- Aim for < 1–2 MB if possible. If images are large, compress with a lossless tool (pngquant, oxipng) or JPEG quality 85.

Meta tags (already added to `index.html`)
- `og:image` → `/og-image.png`
- `og:image:alt` → short description (used for accessibility)
- `twitter:image` → `/og-twitter.png`
- `twitter:image:alt` → short description

Notes
- Replace `https://example.com/` in `og:url` and `<link rel="canonical">` with your real production URL before deploying.
- Test your images with social debuggers:
  - Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/
  - Twitter Card Validator (if available) / X: https://cards-dev.twitter.com/validator
  - LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/

If you want, I can create placeholder PNGs (optimized) and add them to `public/` so you can replace them with final exports.
