import Team from "./Team.jsx";
import { homeImages } from "../lib/homeImages.js";

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
      <section id="about-intro" className="section-anchor bg-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <div className="reveal grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div>
              <span className="kicker">About FIN</span>
              <h1 className="mt-7 text-4xl font-black leading-tight tracking-tight text-brand-navy sm:text-5xl">
                Financial confidence should be within every student’s reach.
              </h1>
            </div>
            <div className="max-w-2xl text-base leading-relaxed text-brand-navy/75 sm:text-lg">
              <p>
                Financial Initiatives Nepal works to make personal finance and accounting easier for young people across Nepal to learn. We want students to understand everyday money decisions, build lasting financial security, and have the confidence to plan for their futures.
              </p>
              <p className="mt-5">
                Through the National Accounting and Financial Olympiad, high school students can put their knowledge to work and show what they can do. We also aim to widen access to financial education for students who have had fewer opportunities, wherever they live and whatever their background.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Team />
      <section id="about" className="section-anchor bg-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <div className="mb-16 grid overflow-hidden border border-brand-navy/15 bg-brand-cream sm:grid-cols-[16rem_minmax(0,1fr)]">
            <figure className="relative">
              <img
                src={homeImages.sowellMono}
                alt="Portrait of Thomas Sowell"
                loading="lazy"
                className="aspect-[4/5] h-full w-full object-cover grayscale"
              />
              <figcaption className="absolute bottom-3 left-3 bg-brand-navy/80 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
                Thomas Sowell
              </figcaption>
            </figure>
            <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-14">
              <span className="kicker">Our Purpose</span>
              <blockquote className="mt-5">
                <p className="text-2xl font-extrabold leading-snug text-brand-navy sm:text-3xl">
                  “Even if we all had equal potential at birth, or at conception, too many factors are at work—and at work differently from one individual to another, even within the same family — for us to develop the same capabilities to the same degree.”
                </p>
                <footer className="mt-4 text-xs font-bold uppercase tracking-[0.16em] text-brand-sienna">
                  Thomas Sowell
                </footer>
              </blockquote>
              <p className="mt-5 max-w-2xl leading-relaxed text-brand-navy/75">
                FIN works to make financial literacy and accounting knowledge accessible to students across Nepal, regardless of ethnicity, financial status, or privilege.
              </p>
            </div>
          </div>

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
