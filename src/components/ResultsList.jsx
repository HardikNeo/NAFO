import { Link, useParams, Navigate } from "react-router-dom";
import { getDistrict, getResults } from "../lib/progress.js";

const LABELS = {
  selected: "Selected",
  waitlisted: "Waitlisted",
};

export default function ResultsList() {
  const { district, list } = useParams();
  const info = getDistrict(district);

  if (!info || !LABELS[list]) {
    return <Navigate to="/nafo" replace />;
  }

  const results = getResults(info.name, list);

  return (
    <section id="results-list" className="section-anchor bg-brand-cream">
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-24 sm:px-6 lg:px-8 lg:pt-20 lg:pb-32">
        <Link
          to={`/nafo/${district}/results`}
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
          Back to Results
        </Link>

        <header className="reveal mt-12 max-w-3xl" style={{ animationDelay: "100ms" }}>
          <span className="kicker">{info.province}</span>
          <h1 className="mt-5 text-4xl font-black tracking-tight text-brand-navy sm:text-5xl">
            {LABELS[list]} — {info.name}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-brand-navy/75">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </header>

        <div
          className="reveal mt-16"
          style={{ animationDelay: "150ms" }}
        >
          <div className="overflow-hidden border border-brand-navy/15 bg-white">
            <ol className="divide-y divide-brand-navy/15">
              {results.map((item, index) => (
                <li
                  key={item.id}
                  className="flex flex-col gap-3 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
                >
                  <div className="flex items-center gap-6">
                    <span className="font-serif text-2xl font-bold text-brand-navy/40">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="text-base font-extrabold text-brand-navy">
                        {item.name}
                      </p>
                      <p className="mt-0.5 text-sm text-brand-navy/70">
                        {item.school}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-slate">
                    Placeholder
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
