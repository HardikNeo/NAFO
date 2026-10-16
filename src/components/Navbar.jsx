import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../images/logo.png";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "NAFO", to: "/nafo" },
  { label: "Notices", to: "/notices" },
  { label: "Contact Us", to: "/contact" },
];

function Logo({ className = "" }) {
  return (
    <img
      src={logo}
      alt="National Accounting and Finance Olympiad logo"
      className={`shrink-0 object-cover ${className}`}
    />
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-brand-navy/10 bg-brand-cream/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Logo className="aspect-square h-10 w-10" />
          <div className="leading-tight">
            <p className="text-base font-extrabold text-brand-navy sm:text-lg">
              NAFO
            </p>
            <p className="text-[10px] font-semibold tracking-[0.18em] text-brand-sienna uppercase sm:text-xs">
              National Accounting &amp; Finance Olympiad
            </p>
          </div>
        </Link>

        <ul className="hidden items-center gap-9 lg:flex">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} className="group relative block pb-1">
                {({ isActive }) => (
                  <>
                    <span
                      className={`text-xs font-bold uppercase tracking-[0.18em] transition-colors ${
                        isActive ? "text-brand-sienna" : "text-brand-navy hover:text-brand-sienna"
                      }`}
                    >
                      {link.label}
                    </span>
                    <span
                      className={`absolute inset-x-0 bottom-0 h-px origin-left bg-brand-sienna transition-transform duration-300 ${
                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          className="inline-flex items-center justify-center p-2 text-brand-navy lg:hidden"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="border-t border-brand-navy/10 bg-brand-cream lg:hidden">
          <ul className="flex flex-col divide-y divide-brand-navy/10 px-4">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block py-4 text-sm font-bold uppercase tracking-[0.18em] transition-colors ${
                      isActive ? "text-brand-sienna" : "text-brand-navy"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
