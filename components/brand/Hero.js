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

export default function Hero() {
  return (
    <section className="brand-hero">
      <div className="container">
        <h1 className="bh-title">Brand</h1>

        <div className="bh-rule" />

        <figure className="bh-quote">
          <blockquote>
            &ldquo;Your brand is what people say about you when<br/> you are not in
            the room.&rdquo;
          </blockquote>
          <figcaption className="bh-attrib">Jeff Bezos</figcaption>
        </figure>

        <p className="bh-note">
          Most businesses never find out what that is.
        </p>

        <div className="bh-rule" />

        <ul className="bh-stats">
          {STATS.map((s) => (
            <li className="bh-stat" key={s.figure}>
              <span className="bh-figure">{s.figure}</span>
              <span className="bh-label">{s.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
