import { Link, useParams, Navigate } from "react-router-dom";
import { getDistrict } from "../lib/progress.js";

const lists = [
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
      "Students on the waitlist in case places become available.",
  },
];

export default function Results() {
  const { district } = useParams();
  const info = getDistrict(district);

  if (!info) {
    return <Navigate to="/nafo" replace />;
  }

  const districtPath = `/nafo/${district}`;
  const resultsPath = `${districtPath}/results`;

  return (
    <section id="results" className="section-anchor bg-brand-cream">
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-24 sm:px-6 lg:px-8 lg:pt-20 lg:pb-32">
        <Link
          to={districtPath}
          className="reveal group inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-brand-teal transition-colors hover:text-brand-sienna"
        >
          <svg
            className="h-4 w-4 transition-transform group-hover:-translate-x-1"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          Back to {info.name}
        </Link>

        <header className="reveal mt-12 max-w-3xl" style={{ animationDelay: "100ms" }}>
          <span className="kicker">{info.province}</span>
          <h1 className="mt-5 text-4xl font-black tracking-tight text-brand-navy sm:text-5xl">
            Results — {info.name}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-brand-navy/75">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </header>

        <div
          className="reveal mt-16 grid gap-6 lg:grid-cols-2"
          style={{ animationDelay: "150ms" }}
        >
          {lists.map((list) => (
            <Link
              key={list.key}
              to={`${resultsPath}/${list.key}`}
              className="group border border-brand-navy/15 bg-white p-10 transition-colors hover:bg-brand-cream"
            >
              <h2 className="text-2xl font-extrabold text-brand-navy transition-colors group-hover:text-brand-sienna">
                {list.label}
              </h2>
              <p className="mt-4 leading-relaxed text-brand-navy/70">
                {list.description}
              </p>
              <span className="mt-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-teal transition-colors group-hover:text-brand-sienna">
                View list
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
