import Team from "./Team.jsx";

const pillars = [
  {
    key: "vision",
    kicker: "Our Vision",
    title: "Our Vision",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
    accent: "bg-brand-teal",
    badge: "bg-brand-teal text-white",
    points: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    ],
  },
  {
    key: "mission",
    kicker: "Our Mission",
    title: "Our Mission",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.",
    accent: "bg-brand-sienna",
    badge: "bg-brand-sienna text-white",
    points: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    ],
  },
];

export default function About() {
  return (
    <>
      <section id="about" className="section-anchor bg-white">
        <div className="mx-auto max-w-7xl px-4 pt-24 pb-20 sm:px-6 lg:px-8 lg:pt-32 lg:pb-24">
          <header className="max-w-3xl reveal">
            <span className="kicker">About NAFO</span>
            <h2 className="mt-8 text-4xl font-black tracking-tight text-brand-navy sm:text-5xl">
              Nepal&apos;s first ever national finance olympiad
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-brand-navy/75">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
              habitant morbi tristique senectus et netus et malesuada fames ac turpis
              egestas. Sed do eiusmod tempor incididunt ut labore et dolore magna
              aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
              laboris nisi ut aliquip ex ea commodo consequat.
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
        </div>
      </section>
      <Team />
    </>
  );
}
