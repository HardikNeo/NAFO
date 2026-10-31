import { Link } from "react-router-dom";
import logo from "../../images/logo.png";

const footerLinks = [
  {
    heading: "Explore",
    links: [
      { label: "Home", to: "/" },
      { label: "About Us", to: "/about" },
      { label: "Results", to: "/nafo" },
      { label: "Notices", to: "/notices" },
      { label: "Contact Us", to: "/contact" },
    ],
  },
];

function FooterLogo() {
  return (
    <img
      src={logo}
      alt="Financial Initiatives Nepal logo"
      className="h-12 w-12 shrink-0 object-cover"
    />
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#263744] text-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <div className="flex items-center gap-4">
              <FooterLogo />
              <div className="leading-tight">
                <p className="text-base font-extrabold text-white">FIN</p>
                <p className="mt-0.5 text-[10px] font-semibold tracking-[0.18em] text-brand-seafoam uppercase sm:text-xs">
                  Financial Initiatives Nepal
                </p>
              </div>
            </div>
          </div>

          {footerLinks.map((group) => (
            <div key={group.heading}>
              <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-brand-seafoam">
                {group.heading}
              </h3>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-[13px] text-white/60 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-white/15 pt-8 sm:flex-row sm:items-center">
          <div className="space-y-1">
            <p className="text-[11px] text-white/50">
              © {new Date().getFullYear()} FIN. All rights reserved.
            </p>
            <p className="text-[11px] text-white/40">
              Credits: Eron Subedi - Web Design
            </p>
          </div>
          <p className="text-xs text-white/60">
            Kathmandu, Nepal
          </p>
        </div>
      </div>
    </footer>
  );
}
