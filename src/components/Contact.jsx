import { useState } from "react";
import { submitContactMessage } from "../lib/notices.js";

const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/nafo.nepal/",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/financial-initiatives-nepal/",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.5c0-1.3-.03-3-1.82-3-1.83 0-2.11 1.43-2.11 2.9V21h-4V9Z" />
      </svg>
    ),
  },
];

const inputClasses =
  "w-full rounded-sm border border-brand-navy/20 bg-white px-4 py-3.5 text-sm text-brand-navy placeholder-brand-navy/40 outline-none transition-colors focus:border-brand-teal focus:ring-2 focus:ring-brand-seafoam/40";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setSending(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const ok = await submitContactMessage({
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    });

    setSending(false);
    if (ok) {
      setSubmitted(true);
    } else {
      setError(
        "We couldn't send your message. Firebase isn't configured yet — add your config to make the form live."
      );
    }
  }

  return (
    <section id="contact" className="section-anchor bg-white">
      <div className="mx-auto max-w-7xl px-4 pt-24 pb-20 sm:px-6 lg:px-8 lg:pt-32 lg:pb-24">
        <header className="mx-auto max-w-3xl text-center reveal">
          <span className="kicker">Contact Us</span>
          <h2 className="mt-8 text-4xl font-black tracking-tight text-brand-navy sm:text-5xl">
            Let&apos;s Start a Conversation
          </h2>
        </header>

        <div className="mx-auto mt-20 grid max-w-6xl gap-16 lg:grid-cols-5">
          <div className="lg:col-span-3 reveal" style={{ animationDelay: "120ms" }}>
            {submitted ? (
              <div className="flex h-full flex-col items-center justify-center rounded-lg border border-brand-seafoam bg-brand-seafoam/15 p-14 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-sm bg-brand-teal text-2xl font-bold text-white">
                  ✓
                </span>
                <h3 className="mt-8 text-3xl font-black text-brand-teal">Thank You!</h3>
                <p className="mt-4 max-w-sm leading-relaxed text-brand-navy/75">
                  Your message has been received. Our team will get back to you within
                  two working days.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-lg border border-brand-navy/15 bg-brand-cream p-8 sm:p-12"
              >
                <div className="grid gap-8 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-3 block text-xs font-bold uppercase tracking-[0.18em] text-brand-navy">
                      Full Name
                    </label>
                    <input id="name" name="name" type="text" required placeholder="Your full name" className={inputClasses} />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-3 block text-xs font-bold uppercase tracking-[0.18em] text-brand-navy">
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@email.com"
                      className={inputClasses}
                    />
                  </div>
                </div>

                <div className="mt-8">
                  <label htmlFor="subject" className="mb-3 block text-xs font-bold uppercase tracking-[0.18em] text-brand-navy">
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    placeholder="e.g. FIN registration enquiry"
                    className={inputClasses}
                  />
                </div>

                <div className="mt-8">
                  <label htmlFor="message" className="mb-3 block text-xs font-bold uppercase tracking-[0.18em] text-brand-navy">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    required
                    placeholder="Tell us how we can help..."
                    className={inputClasses}
                  />
                </div>

                {error && (
                  <p className="mt-6 text-sm font-semibold text-brand-sienna">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  className="btn btn-primary mt-10 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {sending ? "Sending…" : "Send Message"}
                </button>
              </form>
            )}
          </div>

          <aside className="flex flex-col gap-10 lg:col-span-2 reveal" style={{ animationDelay: "240ms" }}>
            <div className="rounded-lg bg-brand-teal p-10 text-white">
              <h3 className="text-2xl font-black">Get in Touch</h3>
              <ul className="mt-8 space-y-5 text-sm">
                <li className="flex items-center gap-3">
                  <svg className="h-5 w-5 shrink-0 text-brand-seafoam" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2Z" />
                  </svg>
                  <a href="mailto:nafo.nepal@gmail.com" className="hover:text-brand-seafoam">
                    nafo.nepal@gmail.com
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="h-5 w-5 shrink-0 text-brand-seafoam" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 0 1 2-2h2.18a2 2 0 0 1 1.93 1.47l.8 3a2 2 0 0 1-.83 2.2l-1.1.73a13 13 0 0 0 5.42 5.42l.73-1.1a2 2 0 0 1 2.2-.83l3 .8A2 2 0 0 1 21 16.82V19a2 2 0 0 1-2 2h-1C9.72 21 3 14.28 3 6V5Z" />
                  </svg>
                  <a href="tel:+9771000000000" className="hover:text-brand-seafoam">
                    +977 1 000 0000
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="h-5 w-5 shrink-0 text-brand-seafoam" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 0 1-2.827 0l-4.244-4.243a8 8 0 1 1 11.314 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                  Kathmandu, Nepal
                </li>
              </ul>
            </div>

            <div className="rounded-lg border border-brand-navy/15 bg-brand-cream p-10">
              <h3 className="text-xl font-black text-brand-navy">Follow Us</h3>
              <p className="mt-3 text-sm text-brand-navy/70">
                Follow FIN on Instagram and LinkedIn for the latest updates.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.name}
                    className="flex h-11 w-11 items-center justify-center rounded-sm bg-brand-teal text-white transition-colors hover:bg-brand-sienna"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
