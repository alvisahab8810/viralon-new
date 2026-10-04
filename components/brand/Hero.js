// components/brand/Hero.js — hero for /brand.
//
// Values taken straight from the Figma frame: the title is 128.8px / 118% in
// #FE4601, the stat figures are 60px / 68px bold in the same orange, and the
// band runs full-bleed in #0E0920. Type is SF Pro Display to match the home
// page headings; the frame names Inter, but the site ships SF Pro.
//
// Styles live at the end of public/assets/css/custome.css, with the responsive
// steps at the end of responsive.css. Every rule is prefixed .brand-hero
// because style.css sets `.bg-dark h1..h6 { color: var(--white) }` — a bare
// .bh-title would lose that cascade and the heading would come out white.
import React from "react";

// The copy the page ships with. A stored band overrides a line at a time, so
// an empty box in the CRM leaves what is written here standing.
const COPY = {
  title: "Brand",
  quoteA: "“Your brand is what people say about you when",
  quoteB: "you are not in the room.”",
  attrib: "Jeff Bezos",
  note: "Most businesses never find out what that is.",
};

const STATS = [
  {
    figure: "10%",
    label: "of one software company's new signups now arrive from ChatGPT",
  },
  {
    figure: "40%",
    label: "lift in AI visibility from a named source over generic prose",
  },
  {
    figure: "4",
    label: "engines now answer instead of listing, each reading differently",
  },
];

export default function Hero({ d = {} }) {
  const c = { ...COPY };
  for (const k of Object.keys(COPY)) if (d[k]) c[k] = d[k];
  const stats = d.stats?.length ? d.stats : STATS;

  return (
    <section className="brand-hero">
      <div className="container">
        <h1 className="bh-title">{c.title}</h1>

        <div className="bh-rule" />

        <figure className="bh-quote">
          <blockquote>
            {c.quoteA}<br/> {c.quoteB}
          </blockquote>

        </figure>

            <div className="mobile-none">
           <figcaption className="bh-attrib">{c.attrib}</figcaption>
        <p className="bh-note">
          {c.note}
        </p>
      </div>
     <div className="desktop-none">
       <div className="hero-stat-badge ">
        <p className="bh-note">
          {c.note}
        </p>

           <figcaption className="bh-attrib-mobile">{c.attrib}</figcaption>

      </div>
     </div>

        <div className="bh-rule" />

        <ul className="bh-stats">
          {stats.map((s, i) => (
            <li className="bh-stat" key={s.figure + i}>
              <span className="bh-figure">{s.figure}</span>
              <span className="bh-label">{s.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
