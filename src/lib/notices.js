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

const PRE_NATIONAL_NOTICE = {
  id: "pre-national-round",
  title: "Pre National Round of National Accounting and Financial Olympiad",
  date: "2026-10-29",
  description:
    "The Pre National selection round has been successfully completed in 5 provinces and 10 districts across Nepal. We greatly appreciate the enthusiastic participation from students and their schools. All results have been published on the website, and students can check their results there. FIN thanks all school representatives and everyone who directly or indirectly supported the event. The national round will be organized after Chhath, and all selected students will be notified. Before the national round, selected students will receive financial literacy and accounting training. Once again, thank you to everyone who helped us. Please stay updated through our website.",
  imageUrl: "",
};

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
  if (!firebaseConfigured || !db) return [PRE_NATIONAL_NOTICE];
  try {
    const q = query(collection(db, NOTICES_COLLECTION), orderBy("date", "desc"));
    const snapshot = await getDocs(q);
    const storedNotices = snapshot.docs.map((snap) =>
      mapNotice(snap.id, snap.data()),
    );
    return [
      PRE_NATIONAL_NOTICE,
      ...storedNotices.filter((notice) => notice.id !== PRE_NATIONAL_NOTICE.id),
    ];
  } catch (error) {
    console.error("Failed to fetch notices from Firestore:", error);
    return [PRE_NATIONAL_NOTICE];
  }
}

export async function fetchNoticeById(id) {
  if (String(id) === PRE_NATIONAL_NOTICE.id) return PRE_NATIONAL_NOTICE;
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
