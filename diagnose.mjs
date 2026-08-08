import fs from "node:fs";

const env = fs
  .readFileSync(".env", "utf8")
  .split(/\r?\n/)
  .filter((l) => l.trim() && !l.trim().startsWith("#"))
  .forEach((l) => {
    const i = l.indexOf("=");
    process.env[l.slice(0, i)] = l.slice(i + 1);
  });

const { initializeApp } = await import("firebase/app");
const { getFirestore, collection, getDocs } = await import("firebase/firestore");

const app = initializeApp({
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
});

const db = getFirestore(app);
try {
  const snap = await getDocs(collection(db, "notices"));
  console.log("notice count:", snap.size);
  snap.forEach((d) => {
    console.log("---", d.id);
    console.log(JSON.stringify(d.data(), null, 2));
  });
  process.exit(0);
} catch (e) {
  console.log("ERROR:", e.code || e.name, "-", e.message);
  process.exit(1);
}
