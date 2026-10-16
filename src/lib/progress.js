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
  { slug: "kathmandu", name: "Kathmandu", province: "Bagmati" },
  { slug: "lalitpur", name: "Lalitpur", province: "Bagmati" },
  { slug: "bhaktapur", name: "Bhaktapur", province: "Bagmati" },
  { slug: "kaski", name: "Kaski", province: "Gandaki" },
  { slug: "chitwan", name: "Chitwan", province: "Bagmati" },
  { slug: "morang", name: "Morang", province: "Koshi" },
  { slug: "sunsari", name: "Sunsari", province: "Koshi" },
  { slug: "rupandehi", name: "Rupandehi", province: "Lumbini" },
  { slug: "banke", name: "Banke", province: "Lumbini" },
  { slug: "kailali", name: "Kailali", province: "Sudurpashchim" },
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
