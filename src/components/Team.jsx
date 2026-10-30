import { useEffect, useMemo, useState } from "react";
import { fetchTeam } from "../lib/team.js";
import { teamPhotos } from "../lib/teamPhotos.js";
import chairmanPhoto from "../../images/nip.jpg";

const teamRows = [
  [
    { name: "Yogeshwor Sharma", role: "Founder and Managing Director" },
  ],
  [
    { name: "Pratyush Neupane", role: "Marketing Director and Founder" },
    { name: "Nischal Ghimire", role: "Finance Director and Founder" },
    { name: "Piyush Joshi", role: "Outreach Director and Examination Manager" },
  ],
  [
    { name: "Tikaram Sharma", role: "Examination Coordinator" },
    { name: "Hardik Neopane", role: "Lead Developer" },
    { name: "Eron Subedi", role: "Director of Legal Affairs" },
    { name: "Pranay Singh", role: "Logistics Manager" },
  ],
  [
    { name: "Supreeti Lamichhane", role: "Outreach Officer" },
    {
      name: "Sambriddhi Bhattarai",
      role: "Financial Literacy Assessment Specialist and Examination Manager",
    },
    { name: "Pradakshina Khatiwada", role: "Examination Manager" },
    { name: "Abinash Poudel", role: "Research Analyst" },
    { name: "Krinjal Timalsina", role: "Examination Manager" },
  ],
];

const chairman = { name: "Nirjala Poudel", role: "Chairman and Chief Advisor" };

// Photos bundled from `images/` take priority over Firestore `imageUrl` values.
const localPhotos = {
  "Nirjala Poudel": chairmanPhoto,
};

function initials(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function MemberTile({ member, size }) {
  const sizeClasses = {
    founder: {
      image: "aspect-[4/5]",
      card: "w-full max-w-[17.28rem]",
      name: "text-2xl sm:text-3xl",
      padding: "p-6 sm:p-8",
    },
    director: {
      image: "aspect-[4/5]",
      card: "w-full max-w-[12.65rem]",
      name: "text-lg sm:text-xl",
      padding: "p-5",
    },
    manager: {
      image: "aspect-[4/5]",
      card: "w-full max-w-[11.2rem]",
      name: "text-base sm:text-lg",
      padding: "p-4",
    },
    officer: {
      image: "aspect-[4/5]",
      card: "w-full max-w-[8rem]",
      name: "text-sm sm:text-base",
      padding: "p-4",
    },
    chairman: {
      image: "aspect-[4/5]",
      card: "w-full max-w-[14.25rem]",
      name: "text-xl",
      padding: "p-5",
    },
  }[size];

  return (
    <article className={`mx-auto flex flex-col border border-brand-navy/15 bg-white ${sizeClasses.card}`}>
      <div className={`relative overflow-hidden bg-brand-seafoam ${sizeClasses.image}`}>
        {member.imageUrl ? (
          <img
            src={member.imageUrl}
            alt={member.name}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center"
            role="img"
            aria-label={member.name}
          >
            <span className="font-serif text-4xl font-bold text-brand-teal">
              {initials(member.name)}
            </span>
          </div>
        )}
      </div>
      <div className={sizeClasses.padding}>
        <h3 className={`font-extrabold leading-snug text-brand-navy ${sizeClasses.name}`}>
          {member.name}
        </h3>
        <p className="mt-2 text-[0.65rem] font-bold uppercase leading-relaxed tracking-[0.14em] text-brand-sienna sm:text-xs">
          {member.role}
        </p>
      </div>
    </article>
  );
}

export default function Team() {
  const [storedMembers, setStoredMembers] = useState([]);

  useEffect(() => {
    let active = true;
    fetchTeam().then((data) => {
      if (active) setStoredMembers(data);
    });
    return () => {
      active = false;
    };
  }, []);

  const membersByName = useMemo(
    () =>
      new Map(
        storedMembers.map((member) => [member.name.trim().toLowerCase(), member]),
      ),
    [storedMembers],
  );

  const withStoredPhoto = (member) => {
    const stored = membersByName.get(member.name.toLowerCase());
    const imageUrl =
      member.name === "Hardik Neopane"
        ? ""
        : localPhotos[member.name] ??
          teamPhotos[member.name] ??
          stored?.imageUrl ??
          "";
    return { ...member, imageUrl };
  };

  return (
    <section id="team" className="section-anchor bg-brand-cream">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <header className="max-w-3xl reveal">
          <span className="kicker">Our Team</span>
          <h2 className="mt-8 text-4xl font-black tracking-tight text-brand-navy sm:text-5xl">
            The People Behind FIN
          </h2>
        </header>

        <div className="mt-14 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_14.25rem] lg:gap-12">
          <div className="space-y-12 sm:space-y-16">
            {teamRows.map((row, rowIndex) => {
              const isFounder = rowIndex === 0;
              const isDirectorRow = rowIndex === 1;
              const isManagerRow = rowIndex === 2;
              const size = isFounder
                ? "founder"
                : isDirectorRow
                  ? "director"
                  : isManagerRow
                    ? "manager"
                    : "officer";

              return (
                <div
                  key={rowIndex}
                  className={`grid items-start justify-center gap-5 sm:gap-6 ${
                    isFounder
                      ? "grid-cols-1"
                      : row.length === 5
                        ? "grid-cols-2 sm:grid-cols-3 xl:grid-cols-5"
                        : row.length === 4
                          ? "grid-cols-2 sm:grid-cols-4"
                          : "grid-cols-2 sm:grid-cols-3"
                  }`}
                >
                  {row.map((member) => (
                    <MemberTile
                      key={member.name}
                      member={withStoredPhoto(member)}
                      size={size}
                    />
                  ))}
                </div>
              );
            })}
          </div>

          <aside className="lg:sticky lg:top-24">
            <p className="kicker mb-4">Chairman</p>
            <MemberTile
              member={withStoredPhoto(chairman)}
              size="chairman"
            />
          </aside>
        </div>
      </div>
    </section>
  );
}
