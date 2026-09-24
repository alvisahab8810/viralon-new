// components/paid-ads/Measure.js — "What we measure" on /paid-ads.
//
// Four artwork cards in a row, each one a number we report against. The card
// is the homepage's "Which Part Of Yours Is Broken?" card
// (components/home/BrokenParts.js): same purple ink, same weight, same
// rounded media block that lifts its image on hover. The difference is that
// this row is four fixed columns rather than a scrolling rail, and each card
// carries only the metric's name -- no paragraph under it.
//
// The artwork is the m1..m4 set in /assets/others/the-work/paid-ads (428x498),
// and the media block holds that ratio at every width, so nothing crops.
//
// Styles live at the end of custome.css, responsive steps at the end of
// responsive.css. Every rule is prefixed .pa-measure because the page is
// wrapped in .bg-dark, whose `h1..h6 { color: var(--white) }` in style.css
// would otherwise take the ink off the heading and the metric names.
import React from "react";
import SliderNav, { useSliderTrack } from "../home/SliderNav";

const DIR = "/assets/others/the-work/paid-ads/";

const METRICS = [
  { name: "Cost per qualified lead", image: "m1.png" },
  { name: "Lead to enquiry rate", image: "m2.png" },
  { name: "Creative win rate", image: "m3.png" },
  { name: "Blended acquisition cost", image: "m4.png" },
];

export default function Measure() {
  // On a phone the four cards become the same swipeable rail the rest of the
  // site uses, arrows and all. The hooks run at every width; only CSS decides
  // whether the list is a row or a scroller, so nothing changes above 560.
  const { trackRef, atStart, atEnd, updateEdges, scrollByCard } =
    useSliderTrack(".pms-card");

  return (
    <section className="pa-measure">
      <div className="container">
        <p className="pms-eyebrow">What we measure</p>

        <h2 className="pms-heading">
          Clicks Are Not <span className="pms-accent">Customers.</span>
        </h2>

        <ul className="pms-cards" ref={trackRef} onScroll={updateEdges}>
          {METRICS.map((m) => (
            <li className="pms-card" key={m.name}>
              {/* Decorative: the metric is named in the heading under it. */}
              <div className="pms-media">
                <img src={DIR + m.image} alt="" loading="lazy" />
              </div>
              <h3 className="pms-name">{m.name}</h3>
            </li>
          ))}
        </ul>

        {/* Phone only -- `.pms-nav-below` is display:none above 560, where the
            cards are a row and there is nothing to scroll. */}
        <div className="pms-nav-below">
          <SliderNav atStart={atStart} atEnd={atEnd} onScroll={scrollByCard} />
        </div>
      </div>
    </section>
  );
}
