# NAFO — National Accounting and Finance Olympiad

A responsive React website for **NAFO**, Nepal's national accounting and finance olympiad where high school students across the country put their financial skills to the test.

Built with **React 18 + Vite + Tailwind CSS**.

---

## Quick Start

```bash
npm install        # first time only
npm run dev        # start local dev server (http://localhost:5173)
npm run build      # production build → dist/
npm run preview    # preview the production build
```

---

## Project Structure

```
Website/
├── index.html                  # HTML shell, fonts, page title
├── package.json                # scripts & dependencies
├── vite.config.js              # Vite settings
├── tailwind.config.js          # ★ BRAND COLORS & fonts live here
├── postcss.config.js
└── src/
    ├── main.jsx                # React entry point
    ├── App.jsx                 # page layout: Navbar + sections + Footer
    ├── index.css               # global styles (Tailwind directives)
    ├── lib/
    │   ├── firebase.js          # Firebase setup
    │   ├── notices.js           # Notices + contact helpers
    │   ├── progress.js          # NAFO progress placeholders (districts, results)
    │   └── team.js              # Team data helper
    └── components/
        ├── Navbar.jsx          # top navigation + logo
        ├── Home.jsx            # hero / landing section
        ├── About.jsx           # About page (Vision/Mission + Team)
        ├── Team.jsx            # Our Team section
        ├── NAFO.jsx            # Our Progress (district tiles)
        ├── DistrictPage.jsx    # District subpage (View Results + Photos)
        ├── Results.jsx         # Selected/Waitlisted selector
        ├── ResultsList.jsx     # List of names
        ├── Notices.jsx         # renders the notices grid (reads Firestore)
        ├── NoticeDetail.jsx    # single notice page (reads Firestore)
        ├── NoticeImage.jsx     # notice image with accent-colour fallback
        ├── Contact.jsx         # contact form + social links
        └── Footer.jsx          # bottom footer
```

---

## "Where do I change...?"

| What you want to change | Where to go |
|---|---|
| **Colors** | `tailwind.config.js` → `theme.extend.colors.brand` |
| **Font** | `tailwind.config.js` → `theme.extend.fontFamily.sans` (and `index.html` font link) |
| **Site title / page name** | `index.html` → `<title>` |
| **Logo** | `src/components/Navbar.jsx` → the `Logo` component (SVG placeholder). Keep `aspect-square` for the 1:1 ratio. Footer has its own copy. |
| **Nav menu links** | `src/components/Navbar.jsx` → the `navLinks` array |
| **Hero text / CTA / stats** | `src/components/Home.jsx` |
| **About (Vision/Mission)** | `src/components/About.jsx` → the `pillars` array |
| **Team members** | Firestore → `team` collection (see `FIREBASE_SETUP.md`) |
| **NAFO progress (districts, results placeholders)** | `src/lib/progress.js` → `districts` and result lists |
| **Add / edit a notice** | Firestore → `notices` collection (the app reads from there) |
| **Notice card layout / styling** | `src/components/Notices.jsx` |
| **Contact details & social links** | `src/components/Contact.jsx` → `socialLinks` array + info cards |
| **Footer links** | `src/components/Footer.jsx` → `footerLinks` array |
| **Section order** | `src/App.jsx` → `<main>` block |
| **Spacing / padding across the site** | each section uses `py-20 lg:py-28` — adjust per component |

---

## Brand Colors

Defined in `tailwind.config.js` and used as `bg-brand-teal`, `text-brand-sienna`, etc.

| Name | Hex | Used for |
|---|---|---|
| `brand.teal` | `#1C5D65` | Primary, brandmark, headers |
| `brand.sienna` | `#AF604E` | Calls to action, highlights |
| `brand.navy` | `#2C3E50` | Body text, borders |
| `brand.slate` | `#798C8D` | Secondary graphics |
| `brand.seafoam` | `#96C4BE` | Backgrounds, overlays |
| `brand.cream` | `#FAF7F0` | Main app background |

---

## Adding a Notice (via Firestore)

Notices are stored in Firestore — the app reads them from the `notices`
collection (see `FIREBASE_SETUP.md`). Each document has these fields:

| Field         | Type   | Notes                                                            |
| ------------- | ------ | ---------------------------------------------------------------- |
| `title`       | string | Short headline for the notice                                    |
| `date`        | string | `YYYY-MM-DD`, newest shows first                                 |
| `description` | string | The notice body text                                             |
| `imageUrl`    | string | Optional. If empty or broken, the notice shows a solid accent-colour block instead |

> The notice card's link uses the document's Firestore ID, so detail pages work
> for any notice you add. If the `notices` collection is empty, the page shows a
> "No notices yet" empty state.

### Adding Team Members

Team profiles are stored in Firestore in the `team` collection (see
`FIREBASE_SETUP.md`). If the collection is empty, the "Our Team" section displays
"Team coming soon."

---

## Placeholder Content

All body copy is Lorem Ipsum placeholder text — search for `Lorem ipsum` in any component to find and replace it with real copy. Stats, dates, and phone/email in `Contact.jsx` are also fake; update them before launch. The NAFO Progress district list and result placeholders live in `src/lib/progress.js`.
