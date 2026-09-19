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

export default function Dashboards() {
  return (
    <section className="pa-dash">
      <div className="container">
        <h2 className="pad-heading">
          76% of marketing leaders spend more time reading dashboards than
          working on creative.
        </h2>

        <p className="pad-note">
          The dashboard is where results appear. Creative is where they are
          made.
        </p>
      </div>
    </section>
  );
}
