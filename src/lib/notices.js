import { db, firebaseConfigured } from "./firebase.js";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const MESSAGES_COLLECTION = "messages";

const PRE_NATIONAL_NOTICE = {
  id: "pre-national-round",
  title: "Pre National Round of National Accounting and Financial Olympiad",
  date: "2026-10-29",
  description:
    "The Pre National selection round has been successfully completed in 5 provinces and 10 districts across Nepal. We greatly appreciate the enthusiastic participation from students and their schools. All results have been published on the website, and students can check their results there. FIN thanks all school representatives and everyone who directly or indirectly supported the event. The national round will be organized after Chhath, and all selected students will be notified. Before the national round, selected students will receive financial literacy and accounting training. Once again, thank you to everyone who helped us. Please stay updated through our website.",
  imageUrl: "",
};

export async function fetchNotices() {
  return [PRE_NATIONAL_NOTICE];
}

export async function fetchNoticeById(id) {
  return String(id) === PRE_NATIONAL_NOTICE.id ? PRE_NATIONAL_NOTICE : null;
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
