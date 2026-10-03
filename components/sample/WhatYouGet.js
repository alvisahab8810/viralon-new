// components/sample/WhatYouGet.js — "What you get" on /sample.
//
// One card: a violet panel carrying the deliverables as a ticked list, and the
// photograph filling the right side of the same card. The panel is rounded on
// its outer corners only, so the two halves read as one object rather than two
// boxes sitting next to each other.
//
// The white line is two exported vectors, not a border. above-vector.svg comes
// in from the left edge and turns down; below-vector.svg turns out of that
// descent and runs along the floor of the panel, far wider than the panel is,
// so it is cut off by the panel's own overflow exactly where the photograph
// starts -- which is what the frame shows. Between the two curves there is
// nothing to export, so the straight run is a 6px rule in CSS at the same
// colour and width; the three pieces line up on one centre (--smg-line-x).
//
// Standalone like the rest of components/sample: its own .smg-* classes, its
// own block at the end of custome.css, sharing nothing with another page.
import React from "react";

const DIR = "/assets/others/the-work/";

const ITEMS = [
  "Positioning statement",
  "Audience definition",
  "Competitor mapping",
  "Messaging framework",
  "Brand voice guide",
  "Logo and identity",
  "Colour and type system",
  "Brand guidelines",
  "Page copy",
  "Templates",
];

// Drawn rather than typed: a tick character lands at a different height in
// every font, and this one has to sit on the first line's cap height at every
// width the list is set at.
function Tick() {
  return (
    <span className="smg-tick" aria-hidden="true">
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="14" fill="#FE4601" />
        <path
          d="M8.4 14.3L12.2 18L19.6 10.4"
          stroke="#ffffff"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export default function WhatYouGet() {
  return (
    <section className="smp-get">
      <div className="container">
        <p className="smg-eyebrow">What you get</p>
        <h2 className="smg-heading">
          Everything <span className="smg-accent">Your Team Needs</span> To Say
          The Same Thing.
        </h2>

        <div className="smg-card">
          <div className="smg-panel">
            {/* Decoration only -- it carries no meaning, so it stays out of the
                accessibility tree and out of the reading order. */}
            <span className="smg-line" aria-hidden="true">
              <img className="smg-line-top" src={DIR + "above-vector.svg"} alt="" />
              <span className="smg-line-run" />
              <img className="smg-line-bot" src={DIR + "below-vector.svg"} alt="" />
            </span>

            <ul className="smg-list">
              {ITEMS.map((item) => (
                <li className="smg-item" key={item}>
                  <Tick />
                  <span className="smg-text">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="smg-art">
            <img src={DIR + "sample2.webp"} alt="" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  );
}
