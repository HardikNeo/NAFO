import { db, firebaseConfigured } from "./firebase.js";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

const NOTICES_COLLECTION = "notices";
const MESSAGES_COLLECTION = "messages";

function mapNotice(id, data) {
  return {
    id: id ?? data.id,
    title: data.title ?? "",
    date: data.date ?? "",
    description: data.description ?? "",
    imageUrl:
      data.imageUrl ?? data.imageURL ?? data.image_url ?? data.image ?? "",
  };
}

export async function fetchNotices() {
  if (!firebaseConfigured || !db) return [];
  try {
    const q = query(collection(db, NOTICES_COLLECTION), orderBy("date", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((snap) => mapNotice(snap.id, snap.data()));
  } catch (error) {
    console.error("Failed to fetch notices from Firestore:", error);
    return [];
  }
}

export async function fetchNoticeById(id) {
  if (!firebaseConfigured || !db) return null;
  try {
    const snap = await getDoc(doc(db, NOTICES_COLLECTION, String(id)));
    if (snap.exists()) return mapNotice(snap.id, snap.data());
  } catch (error) {
    console.error("Failed to fetch notice from Firestore:", error);
  }
  return null;
}

export async function submitContactMessage({ name, email, subject, message }) {
  if (!firebaseConfigured || !db) return false;
  try {
    await addDoc(collection(db, MESSAGES_COLLECTION), {
      name,
      email,
      subject,
      message,
      createdAt: serverTimestamp(),
    });
    return true;
  } catch (error) {
    console.error("Failed to save contact message:", error);
    return false;
  }
}
