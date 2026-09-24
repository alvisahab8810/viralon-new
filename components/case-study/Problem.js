// components/case-study/Problem.js — "03 / THE CHALLENGE": the row of picture
// cards naming what was wrong before the work started.
//
// The card is the one /paid-ads and /website-and-cro use for "What we
// measure" (components/paid-ads/Measure.js): the same rounded media block
// that lifts its image on hover and the same purple title under it. It is
// written out again here rather than shared, because every word and picture
// in this row comes out of the case study record -- those pages' rows are
// fixed and must stay that way.
import React from "react";
import SectionHead from "./SectionHead";

export default function Problem({ section }) {
  const cards = section?.cards || [];
  if (!cards.length) return null;

  return (
    <section className="cs-section cs-problem" id="cs-problem">
      <SectionHead section={section} split />

      <ul className="csp-grid">
        {cards.map((card, i) => (
          <li className={"csp-card" + (card.tone ? ` csp-${card.tone}` : "")} key={i}>
            {card.image ? (
              <div className="csp-frame">
                {/* Decorative: the card is named in the heading under it. */}
                <img className="csp-img" src={card.image} alt="" loading="lazy" />
              </div>
            ) : null}
            {card.title ? <h3 className="csp-title">{card.title}</h3> : null}
            {card.body ? <p className="csp-body">{card.body}</p> : null}
          </li>
        ))}
      </ul>
    </section>
  );
}
