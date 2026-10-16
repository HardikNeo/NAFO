# Firebase Setup — What To Do

This app uses Firebase (Cloud Firestore) for two things:

1. **Notices** — the Notices page reads them from a `notices` collection.
2. **Contact form** — submissions are saved to a `messages` collection.

The code is already in place. Your part is to create the Firebase project, add
the data, and drop your config into a `.env` file. Here's the full walkthrough.

---

## Step 1 — Create a Firebase project

1. Go to <https://console.firebase.google.com> and sign in with a Google account.
2. Click **Add project** → name it (e.g. `nafo-nepal`) → follow the prompts
   (Google Analytics is optional — you can leave it off).
3. Once created, you'll land in the Firebase console for that project.

## Step 2 — Register a web app and grab the config

1. In the project overview, click the **Web** icon (`</>`).
2. Give the app a nickname (e.g. `nafo-website`).
3. Click **Register app**.
4. On the next screen you'll see a block like this — copy the values:

```js
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "nafo-nepal.firebaseapp.com",
  projectId: "nafo-nepal",
  storageBucket: "nafo-nepal.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcd1234",
};
```

> You don't need to run their SDK snippet — just keep the values.

## Step 3 — Create the Firestore database

1. In the left sidebar go to **Build → Firestore Database**.
2. Click **Create database**.
3. Choose **Production mode** (recommended).
4. Pick a location close to you (e.g. `asia-south1` Mumbai, or `asia-east2` Hong Kong).
5. Click **Enable**.

## Step 4 — Add the required collections

### `notices` collection
The app reads notices from the `notices` collection. Each document has these fields:

| Field         | Type   | Notes                                                            |
| ------------- | ------ | ---------------------------------------------------------------- |
| `title`       | string | Short headline for the notice                                    |
| `date`        | string | `2026-08-05` (ISO format `YYYY-MM-DD`, used for sorting)         |
| `description` | string | The notice body text                                             |
| `imageUrl`    | string | Optional — a URL to an image. If missing, empty, or `null`, the notice shows a solid seafoam accent-colour block instead. The field must be named exactly `imageUrl` (variants like `imageURL` are also accepted). |

To add a notice:
1. Go to **Build → Firestore Database → Data**.
2. Click **Start collection** → name it `notices` → **Next**.
3. Add each document (the Document ID can be left as auto-generated).

### `team` collection (for "Our Team" on About page)
The About page reads team members from the `team` collection. Each document has these fields:

| Field     | Type   | Notes                                                            |
| --------- | ------ | ---------------------------------------------------------------- |
| `name`    | string | Full name of the team member                                     |
| `role`    | string | Role/title (e.g. "Founder & President")                          |
| `imageUrl` | string | Optional — photo URL. If empty, initials are shown.             |
| `order`   | number | Optional — sort order (lowest first)                             |

To add a member:
1. Go to **Build → Firestore Database → Data**.
2. Click **Start collection** → name it `team` → **Next**.
3. Add each document with the fields above.

The `messages` collection doesn't need any setup — it's created automatically the
first time someone submits the contact form.

## Step 5 — Set the Firestore security rules

Go to **Build → Firestore Database → Rules** and replace the rules with:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Anyone can read notices (they're public content).
    match /notices/{id} {
      allow read: if true;
      allow write: if false;
    }
    // Anyone can submit a contact message, but only you can read them.
    match /messages/{id} {
      allow read: if false;
      allow create: if true;
      allow update, delete: if false;
    }
    // Anyone can read team members (public on About page).
    match /team/{id} {
      allow read: if true;
      allow write: if false;
    }
  }
}
```

Then click **Publish**.

## Step 6 — Add your config to the app

1. In the project, copy `.env.example` to a new file named `.env` (same folder,
   i.e. `C:\Users\admin\Documents\FIN\Website\.env`).
2. Fill in each value from Step 2:

```
VITE_FIREBASE_API_KEY=AIza...
VITE_FIREBASE_AUTH_DOMAIN=nafo-nepal.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=nafo-nepal
VITE_FIREBASE_STORAGE_BUCKET=nafo-nepal.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcd1234
```

3. Restart the dev server so the new env vars load:
   `npm run dev`

## Step 7 — Verify it works

- **Notices**: open `/notices` — the cards should load from Firestore (they'll
  briefly show "Loading notices…").
- **Contact**: submit the form → you should get the "Thank You!" screen, and a new
  document appears under `messages` in the console.

---

## Notes & Troubleshooting

- **`.env` is a secret** — never commit it. It's not in the repo. If you later run
  `git init`, add `.env` to `.gitignore`.
- **Before you configure Firebase**, the site still works: notices show a "No
  notices yet" empty state, and the contact form shows a message explaining
  Firebase isn't configured yet.
- **Dates in notices** must be `YYYY-MM-DD` strings — the list sorts by this field.
- **The link on each notice card** uses the document's Firestore ID, so detail pages
  work for any notice you add later.
- **Viewing submitted messages**: open **Build → Firestore Database → Data → messages**
  in the Firebase console. Each document has `name`, `email`, `subject`, `message`,
  and `createdAt`.
- If notices don't load, check the **Rules** tab was published and that the `notices`
  collection name matches exactly (lowercase).
