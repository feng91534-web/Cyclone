# Cyclone — AI-Powered Foreign Trade Growth Platform

> Premium SaaS-style growth agency website for factory owners, trading companies, wholesalers, distributors, and aspiring foreign trade professionals.

Inspired by Stripe, Linear, Clay, Mercury, Lovable and Cursor. Dark mode by default, smooth animations, interactive world map, real-time metrics dashboard, AI market analyzer, success case studies, training program, lead capture forms, WhatsApp floating button, mobile-first responsive, and bilingual (中/EN).

---

## 🧱 Tech Stack

| Layer            | Technology                         |
|------------------|------------------------------------|
| Framework        | Next.js 15 (App Router, static export) |
| Language         | TypeScript                         |
| Styling          | TailwindCSS 4                      |
| Animations       | Framer Motion · GSAP               |
| Icons            | Lucide React                       |
| i18n             | Custom LanguageProvider (zh / en)  |
| Deployment       | Netlify (static `dist/`)           |

---

## 📦 Requirements

- Node.js ≥ 20 (see `.nvmrc`)
- npm ≥ 10

---

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start development server (http://localhost:3000)
npm run dev

# 3. Build production version (outputs to dist folder)
npm run build

# 4. Preview build locally
npm run preview
```

---

## 📜 Scripts

| Script            | Description                                  |
|-------------------|----------------------------------------------|
| `npm run dev`     | Start Next.js development server (hot reload) |
| `npm run build`   | Static export build to `dist/` folder        |
| `npm run start`   | Start Next.js production server              |
| `npm run preview` | Preview `dist/` with `serve`                 |
| `npm run lint`    | Run ESLint                                  |

---

## 📁 Project Structure

```
.
├── public/                 # Static assets (local images)
│   ├── favicon.svg         # Site icon
│   ├── logo.svg            # Brand logo
│   ├── og-image.svg        # Social share Open Graph image
│   ├── site.webmanifest    # PWA manifest
│   ├── robots.txt          # Crawler rules
│   ├── sitemap.xml         # Site map
│   └── _redirects          # Netlify SPA fallback
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Root layout + SEO + JSON-LD
│   │   ├── page.tsx        # Home page (assembles all sections)
│   │   └── globals.css     # Global styles + Tailwind theme
│   ├── components/         # Business components
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   ├── WorldMap.tsx
│   │   ├── Metrics.tsx
│   │   ├── AIAnalyzer.tsx
│   │   ├── Cases.tsx
│   │   ├── Training.tsx
│   │   ├── Contact.tsx
│   │   ├── Footer.tsx
│   │   └── WhatsAppButton.tsx
│   └── i18n/
│       ├── index.tsx       # LanguageProvider + useLanguage
│       └── locales/        # zh.json / en.json
├── .github/workflows/      # GitHub Actions CI/CD
├── netlify.toml            # Netlify deployment config
├── next.config.ts          # Next.js config (output: export → dist)
└── package.json
```

---

## 🖼️ Local Images

All images are **local SVG resources** in `public/` — no external CDN dependencies:

- `public/favicon.svg` — site icon (referenced in metadata)
- `public/logo.svg` — brand logo (referenced in JSON-LD)
- `public/og-image.svg` — 1200×630 social share card (Open Graph / Twitter)

---

## 🔍 SEO Optimization

- ✅ **Metadata API** — title template, description, keywords (zh/EN)
- ✅ **Open Graph** — `og:title`, `og:description`, `og:image`, `og:type`
- ✅ **Twitter Cards** — `summary_large_image`
- ✅ **Canonical** + `hreflang` alternates (`zh-CN`, `en`)
- ✅ **robots.txt** + **sitemap.xml** in `public/`
- ✅ **JSON-LD structured data** — Organization, WebSite, Service schemas
- ✅ **Web Manifest** + theme color
- ✅ **Viewport** + `colorScheme: dark`

---

## 📱 Mobile-First

- Single-column layout on mobile, multi-column on `sm:` / `lg:` breakpoints
- Hamburger menu with animated drawer in `Navbar`
- Touch-friendly tap targets (≥ 44px)
- WhatsApp floating button positioned for thumb reach

---

## 🌐 Deploy to Netlify

### Option A — Connect GitHub repo (recommended)

1. Go to [app.netlify.com](https://app.netlify.com) → **Add new site** → **Import from Git**
2. Select this GitHub repo
3. Build settings auto-detected from `netlify.toml`:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Node version:** 20
4. Click **Deploy**

### Option B — Netlify CLI

```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

### Option C — Drag & drop

```bash
npm run build
# Drag dist folder to https://app.netlify.com/drop
```

---

## 🐙 CI/CD with GitHub Actions

Two workflows in `.github/workflows/`:

1. **`ci.yml`** — runs on every push/PR: TypeScript type check + build verification
2. **`deploy.yml`** — runs on push to `main`/`master`: builds and deploys to Netlify

Add repository secrets (Settings → Secrets and variables → Actions):

| Secret                | Description                              |
|-----------------------|------------------------------------------|
| `NETLIFY_AUTH_TOKEN`  | Netlify personal access token            |
| `NETLIFY_SITE_ID`     | Netlify site API ID                      |

---

## 🌍 Internationalization

- `src/i18n/index.tsx` — `LanguageProvider` + `useLanguage()` hook
- `src/i18n/locales/zh.json` — Chinese strings
- `src/i18n/locales/en.json` — English strings

Toggle language via the globe button in the `Navbar`.

---

## 🎨 Design System

| Token            | Value       | Usage                         |
|------------------|-------------|-------------------------------|
| `bg-background`  | `#0a0a0f`   | Page background               |
| `bg-card`        | `#13131a`   | Card / section background     |
| `bg-secondary`   | `#1e1e2a`   | Input / chip background       |
| `text-primary`   | `#ffffff`   | Headings                      |
| `primary`        | `#6366f1`   | Brand indigo (gradient start) |
| `accent`         | `#a855f7`   | Brand purple (gradient end)   |

---

## 📝 License

Private project — © Cyclone. All rights reserved.
