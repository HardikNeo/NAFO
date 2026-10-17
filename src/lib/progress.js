// Placeholder data for the "Our Progress" section of the NAFO page.
// District tiles, result lists, and names are stand-ins for now — swap them
// for real data (or wire them to Firestore) when the information is available.

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

export const districts = [
  { slug: "kathmandu-valley", name: "Kathmandu Valley", province: "Bagmati" },
  { slug: "jumla", name: "Jumla", province: "Karnali" },
  { slug: "dolpa", name: "Dolpa", province: "Karnali" },
  { slug: "jhapa", name: "Jhapa", province: "Koshi" },
  { slug: "kailali", name: "Kailali", province: "Sudurpashchim" },
  { slug: "parsa", name: "Parsa", province: "Madhesh" },
  { slug: "morang", name: "Morang", province: "Koshi" },
  { slug: "kavre", name: "Kavre", province: "Bagmati" },
];

export function getDistrict(slug) {
  return districts.find((district) => district.slug === slug) ?? null;
}

// Placeholder name lists — clearly fake for now.
export function getResults(districtName, listKey) {
  const count = listKey === "selected" ? 8 : 4;
  return Array.from({ length: count }, (_, index) => ({
    id: `${listKey}-${index + 1}`,
    name: `${districtName} Participant ${String(index + 1).padStart(2, "0")}`,
    school: `${districtName} Secondary School`,
  }));
}
