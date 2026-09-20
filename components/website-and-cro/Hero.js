// components/website-and-cro/Hero.js — hero for /website-and-cro.
//
// This page is the paid-ads page with its own copy, so the hero is that hero:
// it wears .social-hero and .paid-hero outright rather than re-declaring their
// rules, which is what keeps the two bands identical when either is touched
// later. .wcro-hero carries nothing today; it is here so a line on this page
// can be nudged without disturbing /paid-ads.
import React from "react";

const SOURCE = "Steve Jobs";
const NOTE =
  "Your website is not a brochure. It is the last thing standing between a click and a customer.";

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
    <section className="social-hero paid-hero wcro-hero">
      <div className="container">
        <h1 className="sch-title">Website And CRO</h1>

        <div className="sch-rule" />

        <figure className="sch-quote">
          {/* The break is set here rather than left to wrapping: the quote is
              meant to turn after "looks like" wherever it fits on two lines. */}
          <blockquote>
            Design is not just what it looks like. Design is<br /> how it works.
          </blockquote>
          <figcaption className="sch-attrib">{SOURCE}</figcaption>
        </figure>

        <p className="sch-note">{NOTE}</p>

        <div className="sch-rule" />

        <ul className="sch-stats">
          {STATS.map((s) => (
            <li className="sch-stat" key={s.label}>
              <span className="sch-figure">{s.figure}</span>
              <span className="sch-label">{s.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
