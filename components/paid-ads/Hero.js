// components/paid-ads/Hero.js — hero for /paid-ads.
//
// Same band as the social content hero (components/social-content/Hero.js):
// #0E0920, the orange title, the two gradient hairlines around the quote and
// the gradient column strokes between the figures. It reuses that hero's
// classes outright rather than re-declaring them, so the pair can never drift
// apart; .paid-hero is only a modifier, and the handful of rules under it in
// custome.css do two things — fit six stat columns where social content has
// four, and close the band, because this page has no platform strip to act as
// its floor.
import React from "react";

// The copy the page ships with; a stored band overrides a line at a time.
const COPY = {
  title: "Paid Ads",
  quoteA: "Never stop testing, and your advertising will",
  quoteB: "never stop improving.",
  attrib: "David Ogilvy",
  note: "That is the whole job. Everything else is a dashboard.",
};

const STATS = [
  { figure: "3 yrs", label: "Running accounts" },
  { figure: "100", label: "Brands worked with" },
  { figure: "10,000", label: "Qualified leads generated" },
  { figure: "100 Cr", label: "Ad budget managed" },
  { figure: "8+", label: "Ad platforms" },
  { figure: "10+", label: "Industries" },
];

export default function Hero({ d = {} }) {
  const c = { ...COPY };
  for (const k of Object.keys(COPY)) if (d[k]) c[k] = d[k];
  const stats = d.stats?.length ? d.stats : STATS;

  return (
    <section className="social-hero paid-hero">
      <div className="container">
        <h1 className="sch-title">{c.title}</h1>

        <div className="sch-rule" />

        <figure className="sch-quote">
          {/* The break is set here rather than left to wrapping: the quote is
              meant to turn after "your advertising" wherever it fits on two
              lines. */}
          <blockquote>
            {c.quoteA}<br /> {c.quoteB}
          </blockquote>
          <figcaption className="sch-attrib mobile-none">{c.attrib}</figcaption>
        </figure>

        <p className="sch-note mobile-none">{c.note}</p>

        {/* On a phone the note and the source move inside the badge box, source
            underneath -- the same treatment the social content hero gets, and
            the same .hero-stat-badge it borrows from the home page. */}
        <div className="desktop-none">
          <div className="hero-stat-badge">
            <p className="sch-note">{c.note}</p>
            <p className="sch-attrib-mobile">{c.attrib}</p>
          </div>
        </div>

        <div className="sch-rule" />

        <ul className="sch-stats">
          {stats.map((s, i) => (
            <li className="sch-stat" key={i}>
              <span className="sch-figure">{s.figure}</span>
              <span className="sch-label">{s.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
