import { Link } from "react-router-dom";
import { useRegistrationNotice } from "./RegistrationNotice.jsx";

const rounds = [
  {
    title: "Registration",
    description:
      "Schools and students register online to enter the competition. Register early to secure your school's place on the national stage.",
    meta: "Online · Yet to be decided",
  },
  {
    title: "Olympiad",
    description:
      "Competitors sit the preliminary and regional rounds across the country, advancing through the ranks in a battle of financial skill.",
    meta: "In-person · Yet to be decided",
  },
  {
    title: "Results",
    description:
      "Finalists gather in Kathmandu for the national championship, where Nepal's top young financiers are crowned.",
    meta: "Kathmandu · Yet to be decided",
  },
];

export default function NAFO() {
  const showRegistration = useRegistrationNotice();

  return (
    <section id="nafo" className="section-anchor bg-brand-teal text-white">
      <div className="mx-auto max-w-7xl px-4 pt-24 pb-20 sm:px-6 lg:px-8 lg:pt-32 lg:pb-24">
        <header className="max-w-3xl reveal">
          <span className="kicker kicker-light">
            National Accounting &amp; Finance Olympiad
          </span>
          <h2 className="mt-8 text-5xl font-black tracking-tight text-white sm:text-6xl">
            NAFO
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-white/80">
            The National Accounting and Finance Olympiad brings together Nepal's
            brightest young minds for a national test of financial knowledge.
            Three stages, one champion.
          </p>
        </header>

        <ol
          className="reveal mt-20 grid md:grid-cols-3 md:gap-0 md:divide-x md:divide-white/20"
          style={{ animationDelay: "150ms" }}
        >
          {rounds.map((round, index) => (
            <li
              key={round.title}
              className="border-b border-white/20 py-12 last:border-b-0 md:border-b-0 md:px-12 md:py-0 md:first:pl-0 md:last:pr-0"
            >
              <p className="font-serif text-6xl font-bold text-white/25">
                0{index + 1}
              </p>
              <h3 className="mt-8 text-2xl font-extrabold text-white">{round.title}</h3>
              <p className="mt-4 leading-relaxed text-white/75">{round.description}</p>
              <p className="mt-8 border-t border-white/20 pt-5 text-xs font-bold uppercase tracking-[0.2em] text-brand-seafoam">
                {round.meta}
              </p>
            </li>
          ))}
        </ol>

        <div
          className="reveal mt-24 overflow-hidden rounded-lg border border-white/20 bg-white text-brand-navy lg:mt-32"
          style={{ animationDelay: "250ms" }}
        >
          <div className="grid items-center gap-10 px-8 py-14 sm:px-14 lg:grid-cols-2 lg:px-20">
            <div>
              <h3 className="text-3xl font-black tracking-tight sm:text-4xl">
                Put Your Skills to the Test
              </h3>
              <p className="mt-4 max-w-xl leading-relaxed text-brand-navy/75">
                Register your place in NAFO 2026 and represent your school on the
                national stage. Finalists compete in Kathmandu for national recognition.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row lg:justify-end">
              <Link to="/" onClick={showRegistration} className="btn btn-primary">
                Register Now
              </Link>
              <Link to="/notices" className="btn btn-outline">
                View Notices
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
