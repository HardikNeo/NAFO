import { useState } from "react";
import { Link } from "react-router-dom";
import ResultsModal from "./ResultsModal.jsx";

const timeline = [
  { label: "Pre Nationals", status: "completed" },
  { label: "Nationals", status: "upcoming" },
];

const STATUS = {
  tbd: { label: "To be decided", dot: "bg-brand-slate", text: "text-brand-slate" },
  upcoming: { label: "Upcoming", dot: "bg-brand-teal", text: "text-brand-teal" },
  live: { label: "Live", dot: "bg-brand-sienna", text: "text-brand-sienna" },
  completed: { label: "Completed", dot: "bg-brand-navy/40", text: "text-brand-navy/40" },
};

function getStatus(item) {
  return item.status ?? "tbd";
}

function getOverallStatus() {
  if (timeline.some((item) => getStatus(item) === "live")) return "live";
  if (timeline.some((item) => getStatus(item) === "upcoming")) return "upcoming";
  if (timeline.every((item) => getStatus(item) === "completed")) return "completed";
  if (timeline.every((item) => getStatus(item) === "tbd")) return "tbd";
  return "upcoming";
}

export default function Home() {
  const overall = getOverallStatus();
  const overallConfig = STATUS[overall];
  const [resultsOpen, setResultsOpen] = useState(false);

  return (
    <section id="home" className="section-anchor bg-brand-cream">
      <div className="mx-auto max-w-7xl px-4 pt-24 pb-24 sm:px-6 lg:px-8 lg:pt-32 lg:pb-32">
        <div className="grid gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-24">
          <div className="reveal">
            <span className="kicker">Nepal&apos;s first ever national finance olympiad</span>

            <h1 className="mt-8 text-5xl leading-[1.05] font-black tracking-tight text-brand-navy sm:text-6xl lg:text-7xl">
              5 provinces, 10 districts, 300+ students
            </h1>

            <div className="mt-12 flex flex-col gap-4 sm:flex-row">
              <Link to="/about" className="btn btn-outline">
                About FIN
              </Link>
              <button
                type="button"
                onClick={() => setResultsOpen(true)}
                className="btn btn-primary"
              >
                Results
              </button>
            </div>
          </div>

          <div className="reveal" style={{ animationDelay: "150ms" }}>
            <div className="rounded-lg border border-brand-navy/15 bg-white">
              <div className="flex items-center justify-between border-b border-brand-navy/15 px-8 py-6">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-navy">
                  NAFO 2025 Timeline
                </p>
                {overall !== "tbd" && (
                  <span
                    className={`flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] ${overallConfig.text}`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${overallConfig.dot}`} />
                    {overallConfig.label}
                  </span>
                )}
              </div>
              <ol className="divide-y divide-brand-navy/15">
                {timeline.map((item, index) => {
                  const status = getStatus(item);
                  const config = STATUS[status];
                  return (
                    <li key={item.label} className="flex items-center gap-6 px-8 py-6">
                      <span
                        className={`font-serif text-2xl font-bold ${
                          status === "live"
                            ? "text-brand-sienna"
                            : status === "completed"
                              ? "text-brand-navy/40"
                              : status === "tbd"
                                ? "text-brand-navy/25"
                                : "text-brand-navy/70"
                        }`}
                      >
                        0{index + 1}
                      </span>
                      <div className="flex-1">
                        <p
                          className={`text-sm font-bold ${
                            status === "completed" ? "text-brand-navy/50" : "text-brand-navy"
                          }`}
                        >
                          {item.label}
                        </p>
                      </div>
                      <span
                        className={`flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] ${config.text}`}
                      >
                        <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />
                        {config.label}
                      </span>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>

        <div
          className="reveal mt-24 border-y border-brand-navy/15 py-14 lg:mt-32"
          style={{ animationDelay: "250ms" }}
        >
          <div className="grid gap-10 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-16">
            <p className="kicker lg:w-56">Our Mission in One Line</p>
            <p className="max-w-3xl text-2xl leading-snug font-semibold text-brand-navy lg:text-3xl">
              Make financial literacy and accounting knowledge accessible to students
              all over Nepal regardless of their ethnicity, financial status, and
              privilege status.
            </p>
          </div>
        </div>
      </div>

      {resultsOpen && <ResultsModal onClose={() => setResultsOpen(false)} />}
    </section>
  );
}
