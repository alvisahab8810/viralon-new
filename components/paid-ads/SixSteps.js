// components/paid-ads/SixSteps.js — "How we work" on /paid-ads.
//
// The social page's phone row (components/social-content/WhatWeMake.js) with
// six frames instead of five and one step written on each screen. The frames
// are the same PNGs: their screens already carry the colours the mock uses, so
// the sixth phone is the red frame again rather than a new export.
//
// The band is dark, because this page runs dark from the hero down. The copy
// turns as it does there: every phone carries two lines -- the step, and what
// the step is actually for -- and one interval in this component turns all six
// together, so they can never drift apart. Anyone who has asked not to be
// shown motion gets the first line and no turning at all.
//
// Sizing works exactly as it does there: one number, --pst-w, is the phone
// body's width, and the body height and image height are ratios of it, so the
// row rescales whole from a single value per breakpoint.
//
// Styles live at the end of custome.css, responsive steps at the end of
// responsive.css. Every phone also carries its own .pst-phone-N class, so one
// can be nudged without disturbing its neighbours.
import React, { useEffect, useState } from "react";

const DIR = "/assets/others/the-work/social-content/";

// How long each line stays on screen.
const HOLD_MS = 3200;

const STEPS = [
  {
    image: "phone1.png",
    slides: ["Pick The Platform", "Where The Buyer Already Is"],
  },
  {
    image: "phone2.png",
    slides: ["Set The Budget Floor", "Enough To Learn, Not To Guess"],
  },
  {
    image: "phone3.png",
    slides: ["Crunch, Cut, Scale", "Kill The Losers, Feed The Winner"],
  },
  {
    image: "phone4.png",
    slides: ["Fix The Destination First", "The Page Decides, Not The Click"],
  },
  {
    image: "phone5.png",
    slides: ["Launch And Test In Volume", "Many Angles, One Honest Read"],
  },
  {
    image: "phone2.png",
    slides: ["Report Against The Business", "Leads And Revenue, Not Reach"],
  },
];

export default function SixSteps() {
  const [slot, setSlot] = useState(0);

  useEffect(() => {
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (still.matches) return;
    const id = setInterval(() => setSlot((s) => s + 1), HOLD_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="pa-steps">
      <div className="container">
        <p className="pst-eyebrow">How we work</p>

        <h2 className="pst-heading">
          Six Steps. In This Order.{" "}
          <span className="pst-accent">Every Time.</span>
        </h2>

        <ol className="pst-row">
          {STEPS.map((step, i) => {
            const line = step.slides[slot % step.slides.length];
            return (
              <li
                className={"pst-phone pst-phone-" + (i + 1)}
                key={step.slides[0]}
              >
                {/* Decorative: the frame is the container, the line written
                    across it is the content. */}
                <img
                  className="pst-device"
                  src={DIR + step.image}
                  alt=""
                  loading="lazy"
                />

                {/* `key` on the line is the text itself, so React replaces the
                    element on every turn rather than editing it -- that
                    restart is what re-runs the fade and rise. The live region
                    tells a screen reader the copy changed on its own. */}
                <div className="pst-screen" aria-live="polite">
                  <p className="pst-title" key={line}>
                    {line}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
