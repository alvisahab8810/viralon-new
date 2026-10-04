// components/search/Layers.js — "What you get" on /search.
//
// SEO, AEO and GEO set against the goal of each. It is a two-column lookup, so
// the rows carry ARIA table roles -- but they are divs, not a <table>:
// custome.css has an unscoped `.blog-item-box tbody, td, th, tr { border: 1px;
// padding: 7px }` marked !important that boxes every table cell on the site,
// and fighting it here would mean !important on every rule.
//
// Each layer carries its own colour (set per row through a --sly-tone custom
// property) so the three read as distinct disciplines at a glance.
//
// Styles live at the end of custome.css under `.search-layers`, responsive
// steps at the end of responsive.css. Every rule is prefixed with the section
// class because style.css's `.bg-dark h1..h6` rule would otherwise win.
import React from "react";

// The copy the page ships with; a stored band overrides a line at a time.
const COPY = {
  eyebrow: "What you get",
  headA: "They",
  accent: "Run Together.",
  headB: "Not Instead Of Each Other.",
  intro:
    "Ranking on page one does not guarantee you appear in AI answers. Appearing in AI answers does not require page one. Two games, one foundation, and the domains already ranking well tend to win both.",
  colLayer: "Layer",
  colGoal: "The goal",
};

const LAYERS = [
  {
    name: "SEO",
    tone: "#8668FF",
    goal: "Rank in the results that still exist and still convert",
  },
  {
    name: "AEO",
    tone: "#FF6D36",
    goal: "Be the direct answer, not one of ten links",
  },
  {
    name: "GEO",
    tone: "#FFC247",
    goal: "Be cited inside an answer a model writes from scratch",
  },
];

export default function Layers({ d = {} }) {
  const c = { ...COPY };
  for (const k of Object.keys(COPY)) if (d[k]) c[k] = d[k];
  const layers = d.layers?.length ? d.layers : LAYERS;

  return (
    <section className="search-layers">
      <div className="container">
        <div className="sly-head">
          <div>
            <p className="sly-eyebrow">{c.eyebrow}</p>
            <h2 className="sly-heading">
              {c.headA} <span className="sly-accent">{c.accent}</span>{" "}
              {c.headB}
            </h2>
          </div>

          <p className="sly-intro">{c.intro}</p>
        </div>

        <div className="sly-table" role="table" aria-label="Search layers">
          <div className="sly-row sly-row-head" role="row">
            <span role="columnheader">{c.colLayer}</span>
            <span role="columnheader">{c.colGoal}</span>
          </div>
          {layers.map((layer, i) => (
            <div
              className="sly-row"
              role="row"
              key={i}
              style={{ "--sly-tone": layer.tone }}
            >
              <span className="sly-name" role="rowheader">
                {layer.name}
              </span>
              <span className="sly-goal" role="cell">
                {layer.goal}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
