// Verified district results for the 2026 round.
//
// These lists are committed with the site so the published pages always show
// the official results, even when Firestore has no documents yet. Kathmandu
// Valley entries carry a school name; the lists themselves are ranked by marks
// with the school shown under each student name.
//
// `marks` is kept for ordering and for districts where marks are public.
// Dolpa sets `showMarks: false` so the marks column is hidden there.
//
// Districts whose papers are still being checked carry `pending: true` and no
// lists, so the results pages show the pending message instead of names.

export const PENDING_RESULTS_MESSAGE =
  "Examination papers are undergoing checking by the examination coordinator";

function student(name, marks) {
  return { name, marks };
}

export const resultsData = {
  dolpa: {
    showMarks: false,
    selected: [
      student("Jigml Phuntsok", 13.5),
      student("Suman Budha", 13.5),
      student("Kesang Lama", 11),
    ],
    waitlisted: [
      student("Anita Budha", 10.5),
      student("Pasang Dorje", 10.5),
      student("Chandra Prasad Rokaya", 7.5),
    ],
  },
  jhapa: {
    showMarks: true,
    selected: [
      student("Praagya Bhattarai", 33.5),
      student("Manish Meche", 28),
      student("Aayan Shrestha", 23.5),
    ],
    waitlisted: [
      student("Nirmal Baskata", 23),
      student("Krishu Pathak", 23),
      student("Anmol Daskota", 23),
      student("Simran Rijal", 23),
      student("Anuska Dhakal", 23),
      student("Tenzing Kunsel Lama", 20.5),
      student("Kasis Karki", 20.5),
    ],
  },
  "kathmandu-valley": {
    showMarks: true,
    groups: [
      {
        school: "Sambriddhi School",
        selected: [
          student("Roman Tamang", 30),
          student("Bishes Thapa", 22.5),
          student("Krishal Man Shakya", 22.5),
          student("Niyomi Khatri", 22.5),
        ],
        waitlisted: [
          student("Rubik Prajupati", 20.5),
          student("Sureshna Newa", 17.5),
        ],
      },
      {
        school: "St Xavier's School",
        selected: [
          student("Samyoug Rai", 37.5),
          student("Yassins Suden Shrestha", 35.5),
          student("Anuska Sharma", 35.5),
        ],
        waitlisted: [
          student("Sanjeevani Sunar", 35),
          student("Susan Angdembe", 33),
        ],
      },
    ],
  },
  jumla: {
    showMarks: true,
    note: "Further examinations will be conducted to select two more people for the competition.",
    selected: [
      student("Samyhana Budha", 25.5),
      student("Ojaswi Neupane", 23),
      student("Anusha Kafle", 23),
      student("Ksitika Shahi", 23),
      student("Dakshina Chaulagin", 23),
      student("Pusstika Devkota", 23),
      student("Manushi Rawal", 23),
      student("Krisha Khatri", 23),
    ],
    waitlisted: [
      student("Aayushma Basnet", 20.5),
      student("Aayusma Shahi", 20.5),
    ],
  },
  kailali: {
    showMarks: true,
    selected: [
      student("Sarika Dangaura", 32.5),
      student("Puja Bhatta", 32.5),
      student("Dipshika Mahara", 32.5),
    ],
    waitlisted: [
      student("Kabita Bhatta", 30),
      student("Falguni Ayer", 30),
      student("Nabin Malla", 30),
      student("Bishesh Raj Bhandari", 27.5),
      student("Kushal Dhami", 27.5),
      student("Biplob Bam", 27.5),
      student("Pratik Mahara", 27.5),
    ],
  },
  parsa: { showMarks: false, pending: true },
  morang: { showMarks: false, pending: true },
  kavre: { showMarks: false, pending: true },
};

export function getStaticResults(slug) {
  return resultsData[slug] ?? null;
}

// Flat rows for a list, with the school attached to every row. Grouped
// districts (Kathmandu Valley) are flattened in group order.
export function getStaticRows(slug, listKey) {
  const data = resultsData[slug];
  if (!data) return null;

  if (data.groups) {
    return data.groups.flatMap((group) =>
      (group[listKey] ?? []).map((entry) => ({
        ...entry,
        school: group.school,
      })),
    );
  }

  return data[listKey] ?? [];
}

export function hasStaticResults(slug, listKey) {
  const rows = getStaticRows(slug, listKey);
  return Array.isArray(rows) && rows.length > 0;
}

export function getResultsMeta(slug) {
  const data = resultsData[slug];
  return {
    showMarks: data?.showMarks !== false,
    note: data?.note ?? "",
    pending: data?.pending === true,
  };
}

// School names used in the Kathmandu Valley overview.
export function getResultSchools(slug) {
  const data = resultsData[slug];
  return data?.groups?.map((group) => group.school) ?? [];
}
