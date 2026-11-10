import { useEffect, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { getDistrict, fetchDistrictResults } from "../lib/progress.js";
import {
  PENDING_RESULTS_MESSAGE,
  getResultsMeta,
  getStaticRows,
} from "../lib/resultsData.js";

const LABELS = {
  selected: "Selected",
  waitlisted: "Waitlisted",
};

export default function ResultsList() {
  const { district, list } = useParams();
  const info = getDistrict(district);
  const meta = getResultsMeta(district);
  const valid =
    Boolean(info) &&
    Boolean(LABELS[list]) &&
    (!meta.ranked || list === "selected");
  const staticRows = valid ? getStaticRows(district, list) : null;
  const usingStatic = Array.isArray(staticRows) && staticRows.length > 0;
  const [rows, setRows] = useState(null);

  useEffect(() => {
    if (!valid) return undefined;

    setRows(null);
    if (usingStatic) return undefined;

    let active = true;
    fetchDistrictResults(district).then((content) => {
      if (active) setRows(content[list] ?? []);
    });

    return () => {
      active = false;
    };
  }, [district, list, valid, usingStatic]);

  if (!valid) {
    return <Navigate to="/nafo" replace />;
  }

  // Committed results take priority; Firestore is used only when a district has
  // no committed list. Districts with no results at all show the pending
  // message instead of placeholder names.
  const loading = !usingStatic && rows === null;
  const live = !usingStatic && Array.isArray(rows) && rows.length > 0;
  const hasResults = usingStatic || live;
  const pending = meta.pending || (!loading && !hasResults);
  const sourceRows = usingStatic ? staticRows : live ? rows : [];
  const results = sourceRows.map((student, index) => ({
    id: `${list}-${index + 1}`,
    name: student.name,
    school: student.school,
    marks: student.marks,
  }));

  // Rank by marks (highest first). Equal marks keep their original order.
  const orderedResults = [...results].sort(
    (a, b) => (b.marks ?? -Infinity) - (a.marks ?? -Infinity),
  );

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
            {meta.ranked && list === "selected"
              ? `Ranked Results — ${info.name}`
              : `${LABELS[list]} — ${info.name}`}
          </h1>
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.18em] text-brand-slate">
            {meta.pending
              ? "Results pending"
              : meta.ranked
                ? "Ranked by marks"
                : "Verified by the Examination Coordinator"}
          </p>
          {meta.note ? (
            <p className="mt-6 border-l-2 border-brand-sienna bg-white px-5 py-4 text-sm font-semibold leading-relaxed text-brand-navy">
              {meta.note}
            </p>
          ) : null}
        </header>

        <div
          className="reveal mt-16"
          style={{ animationDelay: "150ms" }}
        >
          {pending ? (
            <div className="border border-brand-navy/15 bg-white px-6 py-12 text-center sm:px-10">
              <p className="mx-auto max-w-2xl text-lg font-semibold leading-relaxed text-brand-navy">
                {PENDING_RESULTS_MESSAGE}
              </p>
            </div>
          ) : loading ? (
            <div className="border border-brand-navy/15 bg-white px-6 py-12 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-slate">
                Loading results…
              </p>
            </div>
          ) : (
            <div className="overflow-hidden border border-brand-navy/15 bg-white">
              <ol className="divide-y divide-brand-navy/15">
                {orderedResults.map((item, index) => (
                  <li
                    key={item.id ?? `${list}-${index}`}
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
                        {item.school ? (
                          <p className="mt-0.5 text-sm text-brand-navy/70">
                            {item.school}
                          </p>
                        ) : null}
                      </div>
                    </div>
                    {meta.showMarks && item.marks != null ? (
                      <p className="flex items-baseline gap-2 sm:justify-end">
                        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-slate">
                          Marks
                        </span>
                        <span className="text-lg font-extrabold text-brand-navy">
                          {item.marks}
                        </span>
                      </p>
                    ) : null}
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
