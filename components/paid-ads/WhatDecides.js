// components/paid-ads/WhatDecides.js — "Eight Things Decide Performance." on
// /paid-ads.
//
// The social page's metric row (components/social-content/Metrics.js) rebuilt
// as a rail: same gradients, same overlap, same lift on hover, but each card
// is a step smaller than the one before it, so the row recedes to the right
// the way the mock draws it. The scale ramp is one custom property per card
// (--pdw-step, 0 through 7); every size on the card — width, height, radius
// and type — is derived from it, so the ramp can be retuned in one place.
//
// The head of the section is a two-column row: the heading on the left, the
// audit note pinned top right.
//
// Styles live at the end of custome.css, responsive steps at the end of
// responsive.css. Every rule is prefixed .pa-decides because the page is
// wrapped in .bg-dark, whose `h1..h6 { color: var(--white) }` in style.css
// would otherwise take the dark ink off the heading.
import React, { useCallback, useState } from "react";
import SliderNav, { useSliderTrack } from "../home/SliderNav";

const CARDS = [
  {
    title: "Creative",
    body:
      "The single biggest lever left. Creative drives 49% of incremental sales, more than targeting, reach and recency combined.",
  },
  {
    title: "The offer",
    body:
      "Change the promise, the bundle or the guarantee before you touch anything cosmetic. Button colour never saved a weak offer.",
  },
  {
    title: "Product market fit",
    body:
      "No ad fixes a product people do not want. Ads make an existing answer louder, including the wrong one.",
  },
  {
    title: "Pricing",
    body:
      "Priced well above the market with no reason given? Ads will carry that objection to more people, faster.",
  },
  {
    title: "Brand",
    body:
      "A name people recognise converts cheaper. Cold traffic to an unknown brand always costs more, everywhere.",
  },
  {
    title: "Landing page",
    body:
      "Traffic without a page built to convert is wasted spend. The highest leverage, lowest cost fix in the whole account.",
  },
  {
    title: "Platform fit",
    body:
      "Being on the wrong platform is not a budget problem. It is a decision problem, and more money makes it worse.",
  },
  {
    title: "Tracking",
    body:
      "The algorithm optimises toward what it can see. Feed it a pixel firing on page load and it will find you page loads.",
  },
];

export default function WhatDecides() {
  // On a phone the eight cards become the same swipeable rail the rest of the
  // site uses, arrows and all. The hooks run at every width; only CSS decides
  // whether the list is a grid or a scroller, so the desktop ramp is untouched.
  const { trackRef, atStart, atEnd, updateEdges, scrollByCard } =
    useSliderTrack(".pdw-card");

  // Which card is at the head of the rail. It is the one drawn at full size
  // (see .is-lead in responsive.css), so a card grows as it is scrolled in and
  // settles back as it leaves -- the ramp the desktop row has, one card at a
  // time. Above 560 the class is inert: the grid gives every card one size.
  const [lead, setLead] = useState(0);

  const onScroll = useCallback(
    (e) => {
      updateEdges();
      // Read off the cards' own offsets rather than a card width times an
      // index: the lead card is wider than the rest, so a fixed step would
      // drift by a few pixels per card and pick the wrong one near the end.
      const el = e.currentTarget;
      const cards = el.querySelectorAll(".pdw-card");
      const edge =
        el.getBoundingClientRect().left +
        (parseFloat(getComputedStyle(el).paddingLeft) || 0);
      let best = 0;
      let bestGap = Infinity;
      cards.forEach((card, i) => {
        const d = Math.abs(card.getBoundingClientRect().left - edge);
        if (d < bestGap) {
          bestGap = d;
          best = i;
        }
      });
      setLead(best);
    },
    [updateEdges]
  );

  return (
    <section className="pa-decides">
      <div className="container">
        <div className="pdw-head">
          <div className="pdw-head-main">
            <p className="pdw-eyebrow">Before you blame the ads</p>

            <h2 className="pdw-heading">
              Eight Things Decide Performance.{" "}
              <span className="pdw-accent">Only Two Are The Ads.</span>
            </h2>
          </div>

          <p className="pdw-note">
            Most accounts we audit are not badly run. They are running perfectly
            against a problem sitting somewhere else entirely.
          </p>
        </div>

        {/* The stack order is set in source order by z-index, exactly as on
            /social-content: hover only lifts a card, it never reorders the
            rail. --pdw-step is the card's place on the ramp. */}
        <ul className="pdw-rail" ref={trackRef} onScroll={onScroll}>
          {CARDS.map((card, i) => (
            <li
              className={
                "pdw-card pdw-card-" + (i + 1) + (i === lead ? " is-lead" : "")
              }
              key={card.title}
              style={{ "--pdw-step": i }}
            >
              <h3 className="pdw-title">{card.title}</h3>
              <p className="pdw-body">{card.body}</p>
            </li>
          ))}
        </ul>

        {/* Phone only -- `.pdw-nav-below` is display:none above 560, where the
            cards are a grid or the desktop ramp. */}
        <div className="pdw-nav-below">
          <SliderNav atStart={atStart} atEnd={atEnd} onScroll={scrollByCard} />
        </div>
      </div>
    </section>
  );
}
