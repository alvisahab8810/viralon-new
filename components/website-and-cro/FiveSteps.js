// components/website-and-cro/FiveSteps.js — "How we work" on /website-and-cro.
//
// The paid-ads phone row (components/paid-ads/SixSteps.js) with five frames
// instead of six. Every screen carries two cards -- the step, and the same
// step read the other way round -- and one interval in this component turns
// all five together, so they can never drift apart. Anyone who has asked not
// to be shown motion gets the first card and no turning at all.
//
// The row wears .pa-steps outright and adds .wcro-steps, which is where this
// page's own sizing lives: a wider phone, a bigger step, the rule under it
// and the line beneath that.
//
// Styles: .pa-steps at the end of custome.css, .wcro-steps after it,
// responsive steps at the end of responsive.css.
import React, { useEffect, useState } from "react";

const DIR = "/assets/others/the-work/social-content/";

// How long each card stays on screen.
const HOLD_MS = 3200;

const STEPS = [
  {
    image: "phone1.png",
    slides: [
      {
        title: "Find The Leak",
        body:
          "Analytics, recordings, speed test on a real mid-range device. We will not redesign a page until we can point at what is losing people.",
      },
      {
        title: "Name The Number",
        body:
          "Which page, which step, how many people fall out of it. A leak nobody can measure is an opinion, not a problem.",
      },
    ],
  },
  {
    image: "phone2.png",
    slides: [
      {
        title: "Fix Speed & Mobile",
        body:
          "Images, rendering, scripts, layout shift, tap targets. It is the cheapest win, and it lifts your search rankings at the same time.",
      },
      {
        title: "Built For One Hand",
        body:
          "Most of your buyers arrive on a phone, on ordinary data. If it is slow there, nothing further down the page ever gets read.",
      },
    ],
  },
  {
    image: "phone3.png",
    slides: [
      {
        title: "Rewrite For The Buyer",
        body:
          "Most sites describe the company. The good ones answer the question in the visitor's head. That rewrite alone often outperforms the redesign.",
      },
      {
        title: "Answer, Do Not Announce",
        body:
          "What you do, who it is for, what it costs, what happens next. In that order, above the fold, in their words.",
      },
    ],
  },
  {
    image: "phone4.png",
    slides: [
      {
        title: "Cut The Form, Add The Proof",
        body:
          "Ask for the minimum, show real numbers, real names, real faces, then make the next step obvious on every screen.",
      },
      {
        title: "Every Field Costs You",
        body:
          "Each extra box is people leaving. Ask for what your team actually needs to call back, and nothing beyond it.",
      },
    ],
  },
  {
    image: "phone5.png",
    slides: [
      {
        title: "Test, Then Keep Testing",
        body:
          "One change at a time, measured against enquiries rather than clicks. Most tests lose. That is the point of running them.",
      },
      {
        title: "Keep What Earned It",
        body:
          "Ship monthly, hold the winner, throw the rest away. The site gets better every month instead of every three years.",
      },
    ],
  },
];

export default function FiveSteps() {
  const [slot, setSlot] = useState(0);

  useEffect(() => {
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (still.matches) return;
    const id = setInterval(() => setSlot((s) => s + 1), HOLD_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="pa-steps wcro-steps">
      <div className="container">
        <p className="pst-eyebrow">How we work</p>

        <h2 className="pst-heading">
          Five Steps.{" "}
          <span className="pst-accent">Diagnosis Before Design.</span>
        </h2>

        <ol className="pst-row">
          {STEPS.map((step, i) => {
            const slide = step.slides[slot % step.slides.length];
            return (
              <li
                className={"pst-phone pst-phone-" + (i + 1)}
                key={step.slides[0].title}
              >
                {/* Decorative: the frame is the container, the step written
                    across it is the content. */}
                <img
                  className="pst-device"
                  src={DIR + step.image}
                  alt=""
                  loading="lazy"
                />

                {/* `key` on the card is its title, so React replaces the
                    element on every turn rather than editing it -- that
                    restart is what re-runs the fade and rise. The live region
                    tells a screen reader the copy changed on its own. */}
                <div className="pst-screen" aria-live="polite">
                  <div className="pst-slide" key={slide.title}>
                    <p className="pst-title">{slide.title}</p>
                    <span className="pst-rule" aria-hidden="true" />
                    <p className="pst-body">{slide.body}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
