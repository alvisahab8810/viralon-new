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

export default function Layers() {
  return (
    <section className="search-layers">
      <div className="container">
        <div className="sly-head">
          <div>
            <p className="sly-eyebrow">What you get</p>
            <h2 className="sly-heading">
              They <span className="sly-accent">Run Together.</span>{" "}
              Not Instead Of Each Other.
            </h2>
          </div>

          <p className="sly-intro">
            Ranking on page one does not guarantee you appear in AI answers.
            Appearing in AI answers does not require page one. Two games, one
            foundation, and the domains already ranking well tend to win both.
          </p>
        </div>

        <div className="sly-table" role="table" aria-label="Search layers">
          <div className="sly-row sly-row-head" role="row">
            <span role="columnheader">Layer</span>
            <span role="columnheader">The goal</span>
          </div>
          {LAYERS.map((layer) => (
            <div
              className="sly-row"
              role="row"
              key={layer.name}
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
