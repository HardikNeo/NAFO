import { Link } from "react-router-dom";
import { districts } from "../lib/progress.js";

export default function NAFO() {
  return (
    <section id="nafo" className="section-anchor bg-brand-cream">
      <div className="mx-auto max-w-7xl px-4 pt-24 pb-20 sm:px-6 lg:px-8 lg:pt-32 lg:pb-24">
        <header className="max-w-3xl reveal">
          <span className="kicker">FIN 2026</span>
          <h2 className="mt-8 text-4xl font-black tracking-tight text-brand-navy sm:text-5xl">
            Our Progress
          </h2>
        </header>

        <div className="reveal mt-14" style={{ animationDelay: "100ms" }}>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {districts.map((district) => (
              <Link
                key={district.slug}
                to={`/nafo/${district.slug}`}
                className="group border border-brand-navy/15 bg-white p-8 transition-colors hover:bg-brand-cream"
              >
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-sienna">
                  {district.province}
                </p>
                <h3 className="mt-4 text-2xl font-extrabold leading-snug text-brand-navy transition-colors group-hover:text-brand-sienna">
                  {district.name}
                </h3>
                <span className="mt-8 inline-flex items-center gap-2 border-t border-brand-navy/15 pt-4 text-xs font-bold uppercase tracking-[0.2em] text-brand-teal transition-colors group-hover:text-brand-sienna">
                  View details
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
      </div>
    </section>
  );
}
