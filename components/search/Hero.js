// components/search/Hero.js — hero for /search.
//
// Deliberately the brand hero's twin: same #0E0920 band, same 128.8px/118%
// orange title, same 60/68 stat figures and the same gradient column strokes,
// because the two pages are a matched pair and the type scale was signed off
// on /brand. What differs is the middle — a query pill and a struck-out claim
// instead of the quote and hairlines.
//
// The pill is presentational, not a working search box: the sentence inside it
// is the argument ("this is the shape of a question an engine now answers"),
// and there is no site search behind it. It is a <div>, not an <input>, so
// nothing invites a visitor to type into a field that goes nowhere — swap it
// for a real form the day a search endpoint exists.
//
// Styles live at the end of public/assets/css/custome.css, responsive steps at
// the end of responsive.css. Every rule is prefixed .search-hero because
// style.css sets `.bg-dark h1..h6 { color: var(--white) }` — a bare .sh-title
// would lose that cascade and the heading would come out white, not orange.
import React from "react";

const QUERY = "which agency handles both seo and ai search for education brands";

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
    <section className="search-hero">
      <div className="container">
        <h1 className="sh-title">Search</h1>

        <div className="sh-query">
          <span className="sh-query-text">{QUERY}</span>
          <i className="ri-search-line sh-query-icon" aria-hidden="true" />
        </div>

        {/* Struck through with a pseudo-element rather than line-through: the
            rule has to overhang the words at both ends and run orange against
            grey text, and text-decoration gives neither. */}
        <p className="sh-dead">
          <span>SEO is dead.</span>
        </p>

        <h2 className="sh-line">Search just stopped being a list.</h2>

        <ul className="sh-stats">
          {STATS.map((s) => (
            <li className="sh-stat" key={s.figure}>
              <span className="sh-figure">{s.figure}</span>
              <span className="sh-label">{s.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
