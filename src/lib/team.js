import { db, firebaseConfigured } from "./firebase.js";
import { collection, getDocs } from "firebase/firestore";

const TEAM_COLLECTION = "team";

function mapMember(id, data) {
  return {
    id,
    name: data.name ?? "",
    role: data.role ?? "",
    imageUrl: data.imageUrl ?? data.imageURL ?? data.photo ?? "",
    order: typeof data.order === "number" ? data.order : 0,
  };
}

// Team members live in the Firestore `team` collection. Each document needs:
//   name      (string)  — full name
//   role      (string)  — e.g. "Founder & President"
//   imageUrl  (string)  — optional photo URL; falls back to initials when empty
//   order     (number)  — optional sort order (lowest first)
export async function fetchTeam() {
  if (!firebaseConfigured || !db) return [];
  try {
    const snapshot = await getDocs(collection(db, TEAM_COLLECTION));
    return snapshot.docs
      .map((snap) => mapMember(snap.id, snap.data()))
      .sort((a, b) => a.order - b.order);
  } catch (error) {
    console.error("Failed to fetch team from Firestore:", error);
    return [];
  }
}
