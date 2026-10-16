# Firebase Hosting — Deployment Guide

Deploy the NAFO website to Firebase Hosting. These steps are done from a
terminal in this project folder (`C:\Users\admin\Documents\FIN\Website`).

> This project is already configured for Firebase Hosting — `firebase.json`,
> `.firebaserc`, `public/404.html`, and a GitHub Actions auto-deploy workflow
> (`.github/workflows/firebase-hosting-merge.yml`) are in place. This guide
> explains how it all works and what you need to do (login, secrets, push).

---

## Before you start

1. A Firebase project that already has Firestore set up (see `FIREBASE_SETUP.md`).
2. Node.js installed.
3. Google account that owns the Firebase project.
4. Your code pushed to a GitHub repository (branch `main`).

---

## Step 1 — Install the Firebase CLI (one time)

Run once per computer:

```
npm install --legacy-peer-deps --save-dev firebase-tools
```

> `--legacy-peer-deps` is needed because this project has a Vite/plugin peer
> conflict; the same flag is used for the regular `npm install`.

Then log in to your Google account:

```
npx firebase login
```

A browser opens — sign in with the same Google account that owns the Firebase
project.

---

## Step 2 — Create `firebase.json`

In the project root, create a file named `firebase.json` with:

```json
{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [{ "source": "**", "destination": "/index.html" }]
  }
}
```

What each part does:

| Setting    | Purpose |
| ---------- | ------- |
| `public`   | Which folder gets uploaded. `dist` is where `npm run build` puts the site. |
| `ignore`   | Files/folders never uploaded (dotfiles, `node_modules`). |
| `rewrites` | Sends every route back to `index.html` so deep links like `/notices` and `/about` work (SPA routing). |

## Step 3 — Create `.firebaserc`

In the project root, create a file named `.firebaserc` with your project ID:

```json
{
  "projects": {
    "default": "financial-initiatives-nepal"
  }
}
```

Find the project ID in the Firebase console → Project settings, or in your
`.env` file as `VITE_FIREBASE_PROJECT_ID`.

## Step 4 — Create the 404 page

Create `public/404.html` with a small static page that links back home, so
visitors who hit a missing page see something styled instead of a blank screen.
Example:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Page Not Found | NAFO</title>
    <style>
      body {
        font-family: system-ui, sans-serif;
        background: #faf7f0;
        color: #2c3e50;
        display: flex;
        min-height: 100vh;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: 2rem;
      }
      a {
        display: inline-block;
        background: #1c5d65;
        color: #faf7f0;
        padding: 0.9rem 1.75rem;
        text-decoration: none;
        font-weight: 700;
      }
    </style>
  </head>
  <body>
    <div>
      <p style="font-weight: 800; letter-spacing: 0.25em; text-transform: uppercase; color: #1c5d65">NAFO 2026</p>
      <h1 style="font-size: 2.5rem; margin: 1.5rem 0 1rem">Page not found</h1>
      <p style="opacity: 0.75; margin-bottom: 2rem">The page you&rsquo;re looking for doesn&rsquo;t exist or has moved.</p>
      <a href="/">Back to Home</a>
    </div>
  </body>
</html>
```

It gets copied into `dist` automatically at build time.

## Step 5 — Build the site

```
npm run build
```

This creates the `dist` folder — the complete deployable site:

```
dist/
├── index.html
├── 404.html
├── logo.png
└── assets/       (hashed JS, CSS, logo)
```

> `dist` is exactly what gets uploaded. It's regenerated every time you build,
> so you never edit files inside it.

## Step 6 — Deploy

```
npx firebase deploy --only hosting
```

When it finishes you'll see your live URL, usually:

```
https://financial-initiatives-nepal.web.app
```

To redeploy after changes, run Step 5 then Step 6 again.

---

## Deploy automatically from GitHub

A workflow (`.github/workflows/firebase-hosting-merge.yml`) already exists. It
builds the site and deploys to Firebase Hosting automatically **every time you
push to `main`**. To make it work you must add GitHub secrets first.

### 1. Add the Firebase service-account secret (required)

1. In the Firebase console go to **Project settings → Service accounts**.
2. Click **Generate new private key** (downloads a JSON file) — the workflow's
   deploy step needs this to authenticate.
3. On GitHub, go to the repo → **Settings → Secrets and variables → Actions → New
   repository secret**.
4. Name: `FIREBASE_SERVICE_ACCOUNT_FINANCIAL_INITIATIVES_NEPAL`
5. Value: paste the **entire contents** of the JSON file.
6. Click **Add secret**.

### 2. Add the Firebase config secrets (required for the build)

The build needs your config values baked in. Add one secret per value (same
page as above), each with the value from your `.env`:

| Secret name (exactly)                 | Value                    |
| ------------------------------------- | ------------------------ |
| `VITE_FIREBASE_API_KEY`               | your API key             |
| `VITE_FIREBASE_AUTH_DOMAIN`           | e.g. `nafo-nepal.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID`            | `financial-initiatives-nepal` |
| `VITE_FIREBASE_STORAGE_BUCKET`        | your storage bucket      |
| `VITE_FIREBASE_MESSAGING_SENDER_ID`   | your sender ID           |
| `VITE_FIREBASE_APP_ID`                | your app ID              |

### 3. Push and watch it deploy

Commit and push to `main`. Then check the **Actions** tab on GitHub — the
workflow runs `npm ci`, `npm run build`, and `firebase deploy`. When it's green,
your changes are live. From then on, every push to `main` deploys automatically.

> Never commit `.env` to GitHub — it's in `.gitignore`. The secrets above are
> how CI gets the values instead.

---

## Going live checklist

- [ ] Firestore security rules published (see `FIREBASE_SETUP.md` Step 5) — otherwise
      notices won't load and the contact form won't save.
- [ ] `.env` has your real Firebase config values.
- [ ] Notice images use working URLs (or are empty, for the accent-colour block).

## Troubleshooting

| Problem | Fix |
| ------- | --- |
| `Could not find the default Firebase project` | Check `.firebaserc` exists and the project ID matches the console. |
| Not logged in / permission denied | Run `npx firebase login` with the account that owns the project. |
| `/notices` shows 404 on refresh | Make sure `rewrites` is in `firebase.json` and you redeployed. |
| Notices page empty after deploy | Firestore rules still block reads — publish the rules, then refresh. |
| Changes not live | Rebuild (`npm run build`) before `firebase deploy`. |
| GitHub Action fails on install | Delete `node_modules`/lockfile issues aside, the repo's `.npmrc` already sets `legacy-peer-deps=true`, so `npm ci` should pass. |
| Action fails: `AccessDenied` / no permission | The service-account secret is missing or wrong — regenerate the key and update `FIREBASE_SERVICE_ACCOUNT_FINANCIAL_INITIATIVES_NEPAL`. |
| Site built but blank notices | Firestore rules block reads — publish the rules in the console. |
