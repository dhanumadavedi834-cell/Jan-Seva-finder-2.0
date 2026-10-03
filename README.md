# JanSeva Finder (जनसेवा फाइंडर)

> **Independent Public Information & Government Services Discovery Directory for India**

JanSeva Finder is an open, client-side, zero-login public information platform designed to help citizens across India discover verified government services, welfare schemes, student scholarships, public employment, internships, and digital documents from genuine official domains (`.gov.in` and `.nic.in`).

---

## 🏛 Key Principles & Safety Standards

1. **No User Login / No Accounts**: Completely public and accessible without requiring accounts, signups, passwords, or authentication.
2. **Independent Directory**: Explicitly disclaims government affiliation. JanSeva Finder does not process government applications, collect administrative fees, or guarantee admissions/jobs.
3. **Verified Official Portals Only**: Every listing links directly to the real government website (e.g. `scholarships.gov.in`, `digilocker.gov.in`, `ncs.gov.in`, `parivahan.gov.in`, `myaadhaar.uidai.gov.in`, `myscheme.gov.in`, `web.umang.gov.in`).
4. **Zero-Sensitivity Data Policy**: Never requests or stores Aadhaar numbers, PAN numbers, OTPs, passwords, or bank credentials.

---

## 🚀 Features

- **Instant Search & Discovery**: Real-time client-side search across service names, descriptions, departments, states, and keywords.
- **12 Categories**:
  1. 🏛 Government Services
  2. 💰 Government Schemes
  3. 🎓 Scholarships (AY 2026–27)
  4. 💼 Government Jobs (NCS, UPSC, SSC, Railways RRB)
  5. 🚀 Internships (AICTE, NITI Aayog, MEA, MeitY)
  6. 📄 Documents & Certificates (DigiLocker, Aadhaar, PAN, Passports, CRS)
  7. 🚗 Transport Services (Parivahan Sarathi & Vahan)
  8. 🏦 Financial Services (Atal Pension, Mudra, Jan Dhan, EPFO)
  9. 🏥 Health Services (Ayushman Bharat PM-JAY, ABHA Health ID)
  10. 📚 Education (SWAYAM, Vidya Lakshmi, NTA)
  11. 🧑💻 Skill Development (Skill India Digital Hub, PMKVY)
  12. 🌐 State Services (All 28 States & 8 Union Territories)
- **State-Specific Routing**: Deep links such as `#/states/telangana`, `#/states/maharashtra`, `#/states/delhi` presenting official state portals (e-District, MeeSeva, Seva Sindhu, etc.) and state-specific citizen services.
- **Dedicated Student & Internships Hubs**: Deep coverage of NSP 2026-27 and verified paid government internships.
- **Recruitment Fraud Protection**: Prominent statutory warnings advising citizens never to pay money for government job promises.
- **Future Ad Ready**: Clearly labeled `Advertisement` placeholders strictly segregated from official government links.
- **Privacy-Preserving Analytics**: Local-only, anonymous event tracking with automatic sanitization of accidental numeric inputs.

---

## 🛠 Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler & Build Tool**: Vite 8
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Routing**: Client-side hash router with browser history synchronization and dynamic SEO title/canonical metadata.

---

## 📦 Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Lint and check types
npm run lint

# Build production bundle
npm run build
```

---

## ☁️ Deployment Instructions

### 1. Cloudflare Pages Deployment (Recommended)

1. Connect your repository to **Cloudflare Dashboard** > **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
2. Configure the build settings:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Node.js version**: `18.x` or `20.x` (set environment variable `NODE_VERSION=20`)
3. Click **Save and Deploy**. Cloudflare Pages will build the static SPA and serve it globally with edge caching.

### 2. Single-Page Application (SPA) Fallback for Cloudflare Pages

To ensure direct routes like `/services` or `/scholarships` rewrite to `index.html`, create a `_routes.json` or `_headers` / `_redirects` file:

`public/_redirects`:
```text
/*    /index.html   200
```

This ensures full client-side routing on Cloudflare Pages without 404 errors on browser refresh.

---

## ⚖️ Legal Disclaimer

JanSeva Finder is an independent information platform and is not affiliated with, operated by, or endorsed by the Government of India or any government department. Information may change. Always verify eligibility, fees, deadlines and requirements on the official website before taking action.
