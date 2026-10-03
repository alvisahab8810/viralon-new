// components/sample/Layers.js — "What you get" (SEO / AEO / GEO) on /sample.
//
// The three layers set as three columns rather than the rows /search uses: the
// name over its goal, the columns ruled apart. The type is that section's --
// 27px eyebrow, 55/60 heading, 18px intro, 42px names -- so the two bands read
// the same size; the markup and the .sml-* classes are this page's.
//
// It is still a two-column lookup, so the columns carry ARIA table roles -- but
// they are divs, not a <table>: custome.css has an unscoped
// `.blog-item-box tbody, td, th, tr { border: 1px; padding: 7px }` marked
// !important that boxes every table cell on the site, and fighting it here
// would mean !important on every rule.
import React from "react";

const LAYERS = [
  {
    name: "SEO",
    goal: "Rank in the results that still exist and still convert",
  },
  {
    name: "AEO",
    goal: "Be the direct answer, not one of ten links",
  },
  {
    name: "GEO",
    goal: "Be cited inside an answer a model writes from scratch",
  },
];

export default function Layers() {
  return (
    <section className="smp-layers">
      <div className="container">
        <div className="sml-head">
          <div>
            <p className="sml-eyebrow">What you get</p>
            <h2 className="sml-heading">
              They <span className="sml-accent">Run Together.</span> Not Instead
              Of Each Other.
            </h2>
          </div>

          <p className="sml-intro">
            Ranking on page one does not guarantee you appear in AI answers.
            Appearing in AI answers does not require page one. Two games, one
            foundation, and the domains already ranking well tend to win both.
          </p>
        </div>

        <div className="sml-grid" role="table" aria-label="Search layers">
          {LAYERS.map((layer) => (
            <div className="sml-col" role="row" key={layer.name}>
              <span className="sml-name" role="rowheader">
                {layer.name}
              </span>
              <span className="sml-goal" role="cell">
                {layer.goal}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
