import Team from "./Team.jsx";

const pillars = [
  {
    key: "mission",
    kicker: "Our Mission",
    title: "Our Mission",
    description: "",
    accent: "bg-brand-sienna",
    badge: "bg-brand-sienna text-white",
    points: [
      "To educate the upcoming generation on topics of personal finance and set a framework for long-term financial security.",
      "To give children from underprivileged backgrounds a chance to learn about financial literacy and help them create a better future for themselves.",
      "To host a platform where the most dedicated and talented accounts and finance student get a chance to show their expertise and gain rewards.",
    ],
  },
  {
    key: "vision",
    kicker: "Our Vision",
    title: "Our Vision",
    description: [
      "To make Nepal a country where financially literate youth are empowered to make informed personal finance decisions independently, contributing to their long-term financial well-being and prosperity, as well as to the nation\u2019s overall prosperity.",
      "To eradicate artificial and institutional barriers between the rich and the poor, the privileged and the underprivileged, and urban and rural youth.",
    ],
    accent: "bg-brand-teal",
    badge: "bg-brand-teal text-white",
    points: [],
  },
];

function toParagraphs(description) {
  if (Array.isArray(description)) return description;
  return description ? [description] : [];
}

export default function About() {
  return (
    <>
      <Team />
      <section id="about" className="section-anchor bg-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid gap-16 sm:grid-cols-2 lg:gap-x-16 lg:gap-y-20">
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
                {toParagraphs(pillar.description).map((paragraph) => (
                  <p
                    key={paragraph}
                    className="mt-4 leading-relaxed text-brand-navy/75"
                  >
                    {paragraph}
                  </p>
                ))}

                {pillar.points.length > 0 ? (
                  <ul className="mt-8 divide-y divide-brand-navy/15 border-y border-brand-navy/15">
                    {pillar.points.map((point) => (
                      <li key={point} className="py-3 text-sm text-brand-navy/80">
                        {point}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
