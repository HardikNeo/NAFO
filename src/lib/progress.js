import { db, firebaseConfigured } from "./firebase.js";
import { doc, getDoc } from "firebase/firestore";

// District photos are bundled from `images/<collection>/` (named 1, 2, ...).
// District result lists (selected / waitlisted) come from Firestore, one
// collection per district:
//
//   <collection>/selected    -> { names: ["Name", ...] }
//   <collection>/waitlisted  -> { names: [...], ... }
//
// Without Firebase (or when a document is missing) the lists fall back to the
// placeholders at the bottom of this file.

export const DISTRICT_DOCS = {
  selected: "selected",
  waitlisted: "waitlisted",
};

// Field names we accept for the result lists, in priority order.
const STUDENT_FIELDS = [
  "names",
  "name",
  "students",
  "participants",
  "results",
  "list",
];

// Every image under images/<folder>/ (1.jpg, 2.jpeg, ...), keyed by URL.
const districtImageModules = import.meta.glob(
  "../../images/*/*.{jpg,jpeg,png,webp,avif}",
  { eager: true, import: "default" },
);

function buildImagesByDistrict() {
  const byDistrict = new Map();

  for (const [path, url] of Object.entries(districtImageModules)) {
    const parts = path.split("/");
    const file = parts.pop() ?? "";
    const folder = parts.pop() ?? "";
    if (!folder) continue;

    const images = byDistrict.get(folder) ?? [];
    images.push({ file, url });
    byDistrict.set(folder, images);
  }

  // "1" before "2" before "10", regardless of the file extension.
  for (const [folder, images] of byDistrict) {
    images.sort((a, b) => a.file.localeCompare(b.file, undefined, { numeric: true }));
    byDistrict.set(
      folder,
      images.map((image) => image.url),
    );
  }

  return byDistrict;
}

const IMAGES_BY_DISTRICT = buildImagesByDistrict();

export const resultsLists = [
  {
    key: "selected",
    label: "Selected",
    description:
      "Students who qualified from this district and are moving on to the next stage.",
  },
  {
    key: "waitlisted",
    label: "Waitlisted",
    description:
      "Students on the waitlist, in line should a place become available.",
  },
];

export function getResultsList(key) {
  return resultsLists.find((list) => list.key === key) ?? null;
}

// `collection` is both the Firestore collection name (result lists) and the
// matching folder under `images/` (district photos).
export const districts = [
  {
    slug: "kathmandu-valley",
    name: "Kathmandu Valley",
    province: "Bagmati",
    collection: "kathmandu",
  },
  { slug: "jumla", name: "Jumla", province: "Karnali", collection: "jumla" },
  { slug: "dolpa", name: "Dolpa", province: "Karnali", collection: "dolpa" },
  { slug: "jhapa", name: "Jhapa", province: "Koshi", collection: "jhapa" },
  {
    slug: "kailali",
    name: "Kailali",
    province: "Sudurpashchim",
    collection: "kailali",
  },
  { slug: "parsa", name: "Parsa", province: "Madhesh", collection: "parsa" },
  { slug: "morang", name: "Morang", province: "Koshi", collection: "morang" },
  { slug: "kavre", name: "Kavre", province: "Bagmati", collection: "kavre" },
];

export function getDistrict(slug) {
  return districts.find((district) => district.slug === slug) ?? null;
}

// Firestore collection / images folder name for a district (defaults to slug).
export function getDistrictCollection(slug) {
  const district = getDistrict(slug);
  if (district?.collection) return district.collection;
  return slug ? String(slug).toLowerCase() : null;
}

// Bundled photo URLs for a district, in file-name order.
export function getDistrictImages(slug) {
  const folder = getDistrictCollection(slug);
  if (!folder) return [];
  return IMAGES_BY_DISTRICT.get(folder) ?? [];
}

// First `limit` photos across all districts, in district order.
export function getProgressImages(limit = 2) {
  return districts
    .flatMap((district) =>
      getDistrictImages(district.slug).map((url) => ({
        district: district.name,
        url,
      })),
    )
    .slice(0, limit);
}

function toStudent(value, fallbackSchool = "") {
  if (typeof value === "string") {
    const name = value.trim();
    return name ? { name, school: fallbackSchool } : null;
  }

  if (value && typeof value === "object") {
    const name =
      value.name ??
      value.fullName ??
      value.student ??
      value.studentName ??
      value.title;

    if (typeof name === "string" && name.trim()) {
      const school =
        value.school ??
        value.schoolName ??
        value.institution ??
        value.college ??
        fallbackSchool;
      return {
        name: name.trim(),
        school: typeof school === "string" ? school.trim() : String(school ?? ""),
      };
    }
  }

  return null;
}

// Accepts `names: ["A", "B"]`, `names: [{ name, school }]`,
// `names: "A, B"` or `names: { "A": "School" }`.
export function extractStudents(data) {
  if (!data) return [];

  for (const field of STUDENT_FIELDS) {
    const value = data[field];
    if (value == null) continue;

    if (Array.isArray(value)) {
      const entries = value.map((item) => toStudent(item)).filter(Boolean);
      if (entries.length) return entries;
      continue;
    }

    if (typeof value === "string") {
      const entries = value
        .split(/\r?\n|,/)
        .map((item) => toStudent(item))
        .filter(Boolean);
      if (entries.length) return entries;
      continue;
    }

    if (typeof value === "object") {
      const entries = Object.entries(value)
        .map(([name, school]) =>
          toStudent(name, typeof school === "string" ? school : ""),
        )
        .filter(Boolean);
      if (entries.length) return entries;
    }
  }

  return [];
}

async function fetchDoc(collectionName, docId) {
  if (!firebaseConfigured || !db || !collectionName) return null;
  try {
    const snap = await getDoc(doc(db, collectionName, docId));
    return snap.exists() ? snap.data() : null;
  } catch (error) {
    console.error(
      `Failed to read ${collectionName}/${docId} from Firestore:`,
      error,
    );
    return null;
  }
}

// Real result names for a district (empty arrays when unset).
export async function fetchDistrictResults(slug) {
  const collectionName = getDistrictCollection(slug);
  const [selected, waitlisted] = await Promise.all([
    fetchDoc(collectionName, DISTRICT_DOCS.selected),
    fetchDoc(collectionName, DISTRICT_DOCS.waitlisted),
  ]);

  return {
    selected: extractStudents(selected),
    waitlisted: extractStudents(waitlisted),
  };
}

// Placeholder name lists — used only when a district has no Firestore data yet.
export function getResults(districtName, listKey) {
  const count = listKey === "selected" ? 8 : 4;
  return Array.from({ length: count }, (_, index) => ({
    id: `${listKey}-${index + 1}`,
    name: `${districtName} Participant ${String(index + 1).padStart(2, "0")}`,
    school: `${districtName} Secondary School`,
  }));
}
