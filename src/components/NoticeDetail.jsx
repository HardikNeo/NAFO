import { useEffect, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { fetchNoticeById } from "../lib/notices.js";
import NoticeImage from "./NoticeImage.jsx";

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function NoticeDetail() {
  const { id } = useParams();
  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetchNoticeById(id)
      .then((data) => {
        if (active) setNotice(data);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [id]);

  if (loading) {
    return (
      <section id="notice-detail" className="section-anchor bg-brand-cream">
        <div className="mx-auto max-w-7xl px-4 py-32 text-center sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-slate">
            Loading notice…
          </p>
        </div>
      </section>
    );
  }

  if (!notice) {
    return <Navigate to="/notices" replace />;
  }

  return (
    <section id="notice-detail" className="section-anchor bg-brand-cream">
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-24 sm:px-6 lg:px-8 lg:pt-20 lg:pb-32">
        <Link
          to="/notices"
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
          Back to Notices
        </Link>

        <article
          className="reveal mt-12 grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-20"
          style={{ animationDelay: "100ms" }}
        >
          <div className="overflow-hidden bg-brand-seafoam">
            <div className="aspect-[3/2]">
              <NoticeImage
                imageUrl={notice.imageUrl}
                alt={notice.title}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="max-w-prose">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-slate">
              {formatDate(notice.date)}
            </p>
            <h1 className="mt-5 text-4xl font-black tracking-tight text-brand-navy sm:text-5xl">
              {notice.title}
            </h1>
            <p className="mt-8 text-lg leading-relaxed text-brand-navy/80">
              {notice.description}
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
