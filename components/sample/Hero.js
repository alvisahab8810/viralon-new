// components/sample/Hero.js — hero for /sample.
//
// This page's own hero. It looks like the social-content and paid-ads heroes
// because the design is the same band — #0E0920, the orange title, the two
// gradient hairlines around the quote and the gradient strokes between the six
// figures — but it shares nothing with them: its own markup, its own .smh-*
// classes and its own CSS block at the end of custome.css. Retuning this page
// therefore cannot move /paid-ads or /social-content, and vice versa.
import React from "react";

const SOURCE = "Lorem ipsum";
const NOTE =
  "publishing, and web development to preview layouts and visual structure without the distraction of readable content.";

const STATS = [
  { figure: "3 yrs", label: "Building and testing" },
  { figure: "100", label: "Sites and landing pages" },
  { figure: "10,000", label: "Tests run" },
  { figure: "100 Cr", label: "Average conversion lift" },
  { figure: "8+", label: "Load time we build to" },
  { figure: "10+", label: "Stacks we work in" },
];

export default function Hero() {
  return (
    <section className="sample-hero">
      <div className="container">
        <h1 className="smh-title">Sample Page</h1>

        <div className="smh-rule" />

        <figure className="smh-quote">
          {/* The break is set here rather than left to wrapping: the sentence
              is meant to turn after "placeholder or" wherever it fits on two
              lines. It is dropped again on a phone (responsive.css). */}
          <blockquote>
            Lorem ipsum is a standard placeholder or<br /> dummy text used
            widely in graphic design,
          </blockquote>
          <figcaption className="smh-attrib mobile-none">{SOURCE}</figcaption>
        </figure>

        <p className="smh-note mobile-none">{NOTE}</p>

        {/* On a phone the note and the source move inside a panel, source
            underneath, which is how every hero on the site reads at that
            width. Declared in full under .smh-badge so this page owns it. */}
        <div className="desktop-none">
          <div className="smh-badge">
            <p className="smh-note">{NOTE}</p>
            <p className="smh-attrib-mobile">{SOURCE}</p>
          </div>
        </div>

        <div className="smh-rule" />

        <ul className="smh-stats">
          {STATS.map((s) => (
            <li className="smh-stat" key={s.label}>
              <span className="smh-figure">{s.figure}</span>
              <span className="smh-label">{s.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
