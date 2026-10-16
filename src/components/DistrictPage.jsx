import { Link, useParams, Navigate } from "react-router-dom";
import { getDistrict } from "../lib/progress.js";

export default function DistrictPage() {
  const { district } = useParams();
  const info = getDistrict(district);

  if (!info) {
    return <Navigate to="/nafo" replace />;
  }

  const districtPath = `/nafo/${district}`;

  return (
    <section id="district-detail" className="section-anchor bg-brand-cream">
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-24 sm:px-6 lg:px-8 lg:pt-20 lg:pb-32">
        <Link
          to="/nafo"
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
          Back to Our Progress
        </Link>

        <header className="reveal mt-12 max-w-3xl" style={{ animationDelay: "100ms" }}>
          <span className="kicker">{info.province}</span>
          <h1 className="mt-5 text-4xl font-black tracking-tight text-brand-navy sm:text-5xl">
            {info.name}
          </h1>
          <p className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-brand-slate">
            District Progress
          </p>
        </header>

        <div
          className="reveal mt-12 flex flex-col gap-4 sm:flex-row"
          style={{ animationDelay: "150ms" }}
        >
          <Link
            to={`${districtPath}/results`}
            className="btn btn-primary w-full sm:w-auto"
          >
            View Results
          </Link>
        </div>

        <div
          className="reveal mt-16"
          style={{ animationDelay: "200ms" }}
        >
          <div className="border-t border-brand-navy/15 pt-8">
            <h2 className="text-2xl font-black text-brand-navy">Photos</h2>
            <p className="mt-4 leading-relaxed text-brand-navy/70">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((index) => (
                <div
                  key={index}
                  className="flex aspect-[4/3] items-center justify-center border border-dashed border-brand-navy/30 bg-white/60"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-slate">
                    Photos coming soon
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
