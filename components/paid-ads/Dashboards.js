// components/paid-ads/Dashboards.js — the orange statistic band on /paid-ads.
//
// One claim, set as large as the band allows, with a single line under it that
// turns the statistic into the argument. Nothing else: no eyebrow, no cards,
// no link. The ground is the same #FE4601 the sixth rail card uses, so the
// section reads as the loud half of the pair it sits under.
//
// Styles live at the end of custome.css, responsive steps at the end of
// responsive.css. Every rule is prefixed .pa-dash because the page is wrapped
// in .bg-dark, whose `h1..h6 { color: var(--white) }` in style.css would
// otherwise decide the heading's colour for us.
import React from "react";

// The copy the page ships with; a stored band overrides a line at a time.
const COPY = {
  headA: "76% of marketing leaders spend more time reading dashboards than working on creative.",
  note: "The dashboard is where results appear. Creative is where they are made.",
};

export default function Dashboards({ d = {} }) {
  const c = { ...COPY };
  for (const k of Object.keys(COPY)) if (d[k]) c[k] = d[k];

  return (
    <section className="pa-dash">
      <div className="container">
        <h2 className="pad-heading">{c.headA}</h2>

        <p className="pad-note">{c.note}</p>
      </div>
    </section>
  );
}
