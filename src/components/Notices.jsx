import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchNotices } from "../lib/notices.js";
import NoticeImage from "./NoticeImage.jsx";

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function Notices() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetchNotices()
      .then((data) => {
        if (active) setNotices(data);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const sorted = [...notices].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <section id="notices" className="section-anchor bg-brand-cream">
      <div className="mx-auto max-w-7xl px-4 pt-24 pb-20 sm:px-6 lg:px-8 lg:pt-32 lg:pb-24">
        <header className="max-w-3xl reveal">
          <span className="kicker">Notices</span>
          <h2 className="mt-8 text-4xl font-black tracking-tight text-brand-navy sm:text-5xl">
            Latest Updates
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-brand-navy/75">
            Stay up to date with registration deadlines, round announcements, results,
            and everything happening across NAFO.
          </p>
        </header>

        <div className="reveal mt-20" style={{ animationDelay: "150ms" }}>
          {loading ? (
            <p className="py-20 text-center text-xs font-bold uppercase tracking-[0.25em] text-brand-slate">
              Loading notices…
            </p>
          ) : sorted.length === 0 ? (
            <div className="border border-brand-navy/15 bg-white/50 px-8 py-20 text-center">
              <h3 className="text-2xl font-black text-brand-navy">No notices yet</h3>
              <p className="mx-auto mt-4 max-w-md leading-relaxed text-brand-navy/75">
                We haven&apos;t posted anything yet. Check back soon for registration
                deadlines, round announcements, and results.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {sorted.map((notice) => (
                <Link
                  key={notice.id}
                  to={`/notices/${notice.id}`}
                  className="group flex flex-col border border-brand-navy/15 bg-brand-cream"
                >
                  <div className="relative aspect-[3/2] overflow-hidden bg-brand-seafoam">
                    <NoticeImage
                      imageUrl={notice.imageUrl}
                      alt={notice.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-8">
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-slate">
                      {formatDate(notice.date)}
                    </p>
                    <h3 className="mt-4 text-xl font-extrabold leading-snug text-brand-navy transition-colors group-hover:text-brand-sienna">
                      {notice.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-brand-navy/70">
                      {notice.description}
                    </p>
                    <span className="mt-8 inline-flex items-center gap-2 border-t border-brand-navy/15 pt-4 text-xs font-bold uppercase tracking-[0.2em] text-brand-teal transition-colors group-hover:text-brand-sienna">
                      Read
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
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
