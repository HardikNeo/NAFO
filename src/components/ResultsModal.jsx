import { useEffect } from "react";
import NAFO from "./NAFO.jsx";

export default function ResultsModal({ onClose }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Results"
      className="fixed inset-0 z-[60] overflow-y-auto bg-brand-navy/60 backdrop-blur-sm"
    >
      <div className="min-h-full bg-brand-cream">
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-brand-navy/10 bg-brand-cream/95 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-navy">Results</p>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-teal transition-colors hover:text-brand-sienna"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Back
          </button>
        </div>

        <NAFO />
      </div>
    </div>
  );
}
