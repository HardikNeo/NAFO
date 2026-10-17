import { useEffect, useRef } from "react";

export default function Modal({ label, onClose, children }) {
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onCloseRef.current();
    };

    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={label}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8"
    >
      <button
        type="button"
        aria-label="Close"
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-brand-navy/50 backdrop-blur-sm"
      />

      <div className="relative flex max-h-full w-full max-w-6xl flex-col overflow-hidden rounded-lg border border-brand-navy/15 bg-brand-cream shadow-2xl">
        <div className="flex shrink-0 items-center justify-between gap-4 border-b border-brand-navy/15 bg-brand-cream px-6 py-4">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-navy">
            {label}
          </p>
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
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Close
          </button>
        </div>

        <div className="modal-body min-h-0 flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
