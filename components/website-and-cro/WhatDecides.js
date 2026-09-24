// components/website-and-cro/WhatDecides.js — "Six Leaks. Most Sites Have Four
// Of Them." on /website-and-cro.
//
// The /paid-ads rail with six cards instead of eight. It keeps that rail's
// classes (.pa-decides / .pdw-) and its scale ramp: --pdw-step is the card's
// place on the ramp, 0 through 5 here, and every size on the card is derived
// from it, so a six-card row recedes exactly as the eight-card one does with
// no new CSS. .wcro-decides is an empty handle for a later nudge that must not
// reach /paid-ads.
import React, { useCallback, useState } from "react";
import SliderNav, { useSliderTrack } from "../home/SliderNav";

const CARDS = [
  {
    title: "Speed",
    body:
      "Every extra second of load time costs about 7% of conversions. It is the one fix that pays before a single word changes.",
  },
  {
    title: "Mobile",
    body:
      "Most of the traffic, converting at half the rate. Sites are still designed on a 27-inch screen and tested there too.",
  },
  {
    title: "The form",
    body:
      "Every field past the third costs you answers. Asking for a phone number before you have earned it costs the most.",
  },
  {
    title: "Clarity",
    body:
      "Five seconds to say what you sell, who it is for and what happens next. Most sites lose people on the first one.",
  },
  {
    title: "Proof",
    body:
      "Reviews, numbers, real faces. A claim with nothing behind it reads as a risk rather than a reason to buy.",
  },
  {
    title: "Message",
    body:
      "The page has to finish the sentence the ad started. A mismatch here loses people who had already decided.",
  },
];

export default function WhatDecides() {
  // On a phone the six cards become the same swipeable rail /paid-ads uses,
  // arrows and all. The hooks run at every width; only CSS decides whether
  // the list is the desktop ramp or a scroller, so nothing above 560 moves.
  const { trackRef, atStart, atEnd, updateEdges, scrollByCard } =
    useSliderTrack(".pdw-card");

  // Which card is at the head of the rail. It is the one drawn at full size
  // (see .is-lead in responsive.css), so a card grows as it is scrolled in
  // and settles back as it leaves -- the ramp the desktop row has, one card
  // at a time. Above 560 the class is inert: every card is one size there.
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
    <section className="pa-decides wcro-decides">
      <div className="container">
        <div className="pdw-head">
          <div className="pdw-head-main">
            <p className="pdw-eyebrow">Where the money goes</p>

            <h2 className="pdw-heading">
              Six Leaks.{" "}
              <span className="pdw-accent">Most Sites Have <br/>Four Of Them.</span>
            </h2>
          </div>

          <p className="pdw-note">
    None of these are design opinions. Every one has a number attached, and every one is fixable without touching your ad budget.
          </p>
        </div>

        {/* The stack order is set in source order by z-index: hover only lifts
            a card, it never reorders the rail. */}
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

        {/* Phone only -- `.pdw-nav-below` is display:none above 560, where
            the cards are the desktop ramp. */}
        <div className="pdw-nav-below">
          <SliderNav atStart={atStart} atEnd={atEnd} onScroll={scrollByCard} />
        </div>
      </div>
    </section>
  );
}
