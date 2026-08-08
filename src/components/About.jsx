import { Link } from "react-router-dom";
import { useRegistrationNotice } from "./RegistrationNotice.jsx";

const pillars = [
  {
    key: "vision",
    kicker: "Our Vision",
    title: "A Financially Confident Nepal",
    description:
      "We envision a Nepal where every student graduates with the confidence to earn, save, and invest — and where the country's financial future is shaped by financially literate young people.",
    accent: "bg-brand-teal",
    badge: "bg-brand-teal text-white",
    points: [
      "Financial literacy taught in every school",
      "Young Nepalis shaping the national economy",
      "Money confidence from the classroom upward",
    ],
  },
  {
    key: "mission",
    kicker: "Our Mission",
    title: "Make Money Skills Mainstream",
    description:
      "NAFO exists to make financial education a rite of passage for every high school student in Nepal — through curriculum, workshops, and a national olympiad that makes learning about money genuinely exciting.",
    accent: "bg-brand-sienna",
    badge: "bg-brand-sienna text-white",
    points: [
      "Practical workshops delivered in schools nationwide",
      "A national olympiad that makes money fun",
      "Free, accessible learning for every student",
    ],
  },
  {
    key: "gap",
    kicker: "The Gap",
    title: "The Financial Literacy Divide",
    description:
      "Most Nepali students finish high school without ever budgeting, saving, or investing. Those in rural and under-resourced schools have the least access to financial education — the very students who need it most.",
    accent: "bg-brand-seafoam",
    badge: "bg-brand-seafoam text-brand-teal",
    points: [
      "Unequal access to financial education nationwide",
      "Little practical money curriculum in schools",
      "High-stakes money decisions made young and alone",
    ],
  },
  {
    key: "bridge",
    kicker: "The Bridge",
    title: "How We Close It",
    description:
      "We close the divide with hands-on workshops in schools and the National Accounting and Finance Olympiad — giving students real incentives to master money and a national stage to prove it.",
    accent: "bg-brand-navy",
    badge: "bg-brand-navy text-white",
    points: [
      "Workshops and curriculum delivered in schools",
      "NAFO's three stages — registration to results",
      "A growing community of young financiers",
    ],
  },
];

export default function About() {
  const showRegistration = useRegistrationNotice();

  return (
    <section id="about" className="section-anchor bg-white">
      <div className="mx-auto max-w-7xl px-4 pt-24 pb-20 sm:px-6 lg:px-8 lg:pt-32 lg:pb-24">
        <header className="max-w-3xl reveal">
          <span className="kicker">About NAFO</span>
          <h2 className="mt-8 text-4xl font-black tracking-tight text-brand-navy sm:text-5xl">
            A National Stage for Financial Talent
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-brand-navy/75">
            NAFO — the National Accounting and Finance Olympiad — brings high school
            students from across Nepal together to test their money skills in a
            nationwide competition. This is the story behind it.
          </p>
        </header>

        <div className="mt-20 grid gap-16 sm:grid-cols-2 lg:gap-x-16 lg:gap-y-20">
          {pillars.map((pillar, index) => (
            <article
              key={pillar.key}
              className="reveal border-t border-brand-navy/15 pt-8"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <span className={`block h-2 w-2 ${pillar.accent}`} />
              <p className="kicker mt-6">{pillar.kicker}</p>
              <h3 className="mt-4 text-2xl font-extrabold text-brand-navy">
                {pillar.title}
              </h3>
              <p className="mt-4 leading-relaxed text-brand-navy/75">
                {pillar.description}
              </p>

              <ul className="mt-8 divide-y divide-brand-navy/15 border-y border-brand-navy/15">
                {pillar.points.map((point) => (
                  <li key={point} className="py-3 text-sm text-brand-navy/80">
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="reveal mt-24 overflow-hidden rounded-lg bg-brand-navy text-white lg:mt-32">
          <div className="grid gap-12 px-8 py-16 sm:px-14 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:px-20 lg:py-20">
            <div>
              <p className="kicker kicker-light">Next Steps</p>
              <h3 className="mt-6 text-3xl font-black tracking-tight sm:text-4xl">
                Take Your Place in NAFO
              </h3>
              <p className="mt-6 max-w-xl leading-relaxed text-white/75">
                Students, schools, and partner organisations are all welcome. Whether you
                want to compete, host a workshop, or help us grow the olympiad, there is
                a place for you here.
              </p>
            </div>
            <div className="flex flex-col gap-4 lg:items-end">
              <Link to="/" onClick={showRegistration} className="btn btn-light w-full sm:w-auto">
                Register Now
              </Link>
              <Link to="/notices" className="btn btn-outline-light w-full sm:w-auto">
                View Notices
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
