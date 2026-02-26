# KD Entertainment IPTV Website

A multi-page IPTV service website built with vanilla HTML, CSS, and JavaScript. Layout and design based on desiworldiptv.com with KD Entertainment branding.

## Pages

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Hero, features, movies, stats, pricing, testimonials |
| Pricing | `pricing.html` | Subscription plans |
| Channel List | `channel-list.html` | Channel categories |
| Products | `products.html` | IPTV service & hardware |
| Blog | `blog.html` | Articles and guides |
| Contact | `contact.html` | Contact form and WhatsApp |

## Quick Start

1. Open `index.html` in a browser, or
2. Serve locally: `npx serve .` or `python -m http.server 8000`

## Project Structure

```
├── index.html          # Home
├── pricing.html
├── channel-list.html
├── products.html
├── blog.html
├── contact.html
├── css/styles.css      # All styles
├── js/main.js          # Accordion, mobile menu, nav active
├── assets/
│   ├── hero-bg.jpg     # Hero background (generated)
│   ├── images/         # Additional images
│   └── icons/          # Custom icons (optional)
└── docs/               # Design knowledge & image prompts
```

## Customization

### WhatsApp Number
WhatsApp links use business number 2262426755 (wa.me/12262426755). To change, search for `wa.me/` in the project.

### Images
- **Hero**: `assets/hero-bg.jpg` — custom cinematic background (fallback to Unsplash if missing)
- **Movie posters**: Update carousel in `index.html`
- **Testimonial avatars**: Replace pravatar.cc URLs with real photos
- **Blog**: Update images in `blog.html`

## Design System

- **Primary**: Navy `#003D82`
- **Accent**: Green `#00D084`
- **Font**: Poppins (Google Fonts)

See `docs/KNOWLEDGE.md` for full design specifications.

## Browser Support

Modern browsers (Chrome, Firefox, Safari, Edge). No build step required.
