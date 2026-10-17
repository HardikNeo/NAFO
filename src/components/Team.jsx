import { useEffect, useState } from "react";
import { fetchTeam } from "../lib/team.js";

function initials(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function MemberTile({ member }) {
  return (
    <article className="flex flex-col border border-brand-navy/15 bg-brand-cream">
      <div className="relative aspect-[4/5] overflow-hidden bg-brand-seafoam">
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
      <div className="p-6">
        <h3 className="text-lg font-extrabold leading-snug text-brand-navy">
          {member.name}
        </h3>
        <p className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-brand-sienna">
          {member.role}
        </p>
      </div>
    </article>
  );
}

export default function Team() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetchTeam()
      .then((data) => {
        if (active) setMembers(data);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <section id="team" className="section-anchor bg-brand-cream">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <header className="max-w-3xl reveal">
          <span className="kicker">Our Team</span>
          <h2 className="mt-8 text-4xl font-black tracking-tight text-brand-navy sm:text-5xl">
            The People Behind FIN
          </h2>
        </header>

        <div className="reveal mt-20" style={{ animationDelay: "150ms" }}>
          {loading ? (
            <p className="py-20 text-center text-xs font-bold uppercase tracking-[0.25em] text-brand-slate">
              Loading team…
            </p>
          ) : members.length === 0 ? (
            <div className="border border-brand-navy/15 bg-white/50 px-8 py-20 text-center">
              <h3 className="text-2xl font-black text-brand-navy">Team coming soon</h3>
              <p className="mx-auto mt-4 max-w-md leading-relaxed text-brand-navy/75">
                Our team profiles will appear here shortly.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {members.map((member) => (
                <MemberTile key={member.id} member={member} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
