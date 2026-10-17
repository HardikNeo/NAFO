import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const RegistrationContext = createContext(() => {});

export function useRegistrationNotice() {
  return useContext(RegistrationContext);
}

export default function RegistrationNoticeProvider({ children }) {
  const [open, setOpen] = useState(false);

  const show = useCallback(() => setOpen(true), []);
  const hide = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event) {
      if (event.key === "Escape") hide();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, hide]);

  return (
    <RegistrationContext.Provider value={show}>
      {children}
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-navy/50 p-4"
          onClick={hide}
          role="dialog"
          aria-modal="true"
          aria-label="Registration not open"
        >
          <div
            className="w-full max-w-md rounded-lg border border-brand-navy/15 bg-white p-10 text-center"
            onClick={(event) => event.stopPropagation()}
          >
            <span className="kicker">FIN 2026</span>
            <h3 className="mt-5 text-3xl font-black text-brand-navy">
              Registration Not Open
            </h3>
            <p className="mt-4 leading-relaxed text-brand-navy/75">
              Registration for FIN 2026 hasn&apos;t opened yet. We&apos;ll announce the
              opening date here as soon as it&apos;s confirmed.
            </p>
            <button type="button" onClick={hide} className="btn btn-primary mt-8">
              Close
            </button>
          </div>
        </div>
      )}
    </RegistrationContext.Provider>
  );
}
