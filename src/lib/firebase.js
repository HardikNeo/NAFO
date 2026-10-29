import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const env = import.meta.env;

const REQUIRED_KEYS = [
  "VITE_FIREBASE_API_KEY",
  "VITE_FIREBASE_AUTH_DOMAIN",
  "VITE_FIREBASE_PROJECT_ID",
  "VITE_FIREBASE_APP_ID",
];

export const firebaseMissingKeys = REQUIRED_KEYS.filter((key) => !env[key]);
export const firebaseConfigured = firebaseMissingKeys.length === 0;

const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: env.VITE_FIREBASE_APP_ID,
};

let app = null;
let db = null;

if (firebaseConfigured) {
  try {
    // Reuse the existing default app during Vite hot reloads instead of calling
    // initializeApp() twice, which throws a "duplicate-app" error.
    app =
      getApps().find((existing) => existing.name === "[DEFAULT]") ??
      initializeApp(firebaseConfig);
    db = getFirestore(app);
  } catch (error) {
    console.error("Failed to initialize Firebase:", error);
  }
} else if (firebaseMissingKeys.length) {
  console.warn(
    `Firebase is not configured. Missing: ${firebaseMissingKeys.join(", ")}`,
  );
}

export { app, db };
