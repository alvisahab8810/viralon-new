// components/case-study/HowItRan.js — "06 / HOW IT RAN": the stacked stage
// cards of the engagement.
//
// The card is the homepage's "How It Runs" card (components/home/HowItRuns.js)
// written out again for this page: a full-bleed image with the copy laid over
// one half, a dash-and-label eyebrow, and the ghost stage number sunk into the
// artwork. It is a copy rather than a reuse, because every step here comes out
// of the admin for this one study -- the homepage's four are fixed.
//
// The copy alternates sides down the list, following the artwork: each image
// keeps its subject on one side, so the words always land on the clear half.
import React from "react";
import SectionHead from "./SectionHead";

// The phone crops of the stage artwork. They are portrait, they carry the
// stage number already drawn into the top of the picture, and they keep the
// subject at the foot so the copy has the flat top to itself -- none of which
// the wide admin image can do once it is squeezed to 375px.
//
// They are fixed and matched by position rather than written per study,
// because they are the band's furniture: the admin supplies the picture that
// goes behind the words on a desktop, and a study with a fifth stage simply
// keeps its own image there on the phone too.
const MOBILE_ART = [
  "/assets/images/how-runs/first-mob-card.webp",
  "/assets/images/how-runs/second-mob-card.webp",
  "/assets/images/how-runs/third-mob-card.webp",
  "/assets/images/how-runs/fourth-mob-card.webp",
];

export default function HowItRan({ section }) {
  const steps = section?.steps || [];
  if (!steps.length) return null;

  return (
    <section className="cs-section cs-ran" id="cs-how-it-ran">
      <SectionHead section={section} split />

      <div className="csr-list">
        {steps.map((step, i) => {
          const flipped = i % 2 === 1;
          const num = step.number || String(i + 1).padStart(2, "0");

          return (
            <article
              className={
                "csr-card" +
                (flipped ? " is-flipped" : "") +
                (step.tone ? ` csr-${step.tone}` : "")
              }
              key={i}
            >
              {/* Decorative: the step is named in the copy over it. Both
                  crops are in the markup and CSS shows one of them, so the
                  swap happens on resize rather than on a measurement taken
                  after the card has already drawn. */}
              {step.image ? (
                <img
                  className="csr-bg csr-bg--desktop"
                  src={step.image}
                  alt=""
                  aria-hidden="true"
                />
              ) : null}
              {MOBILE_ART[i] || step.image ? (
                <img
                  className="csr-bg csr-bg--mobile"
                  src={MOBILE_ART[i] || step.image}
                  alt=""
                  aria-hidden="true"
                />
              ) : null}

              <span className="csr-num" aria-hidden="true">
                {num}
              </span>

              <div className="csr-card-body">
                {step.kicker ? (
                  <span className="csr-eyebrow">
                    <i aria-hidden="true" />
                    {step.kicker}
                  </span>
                ) : null}
                {step.title ? <h3 className="csr-card-title">{step.title}</h3> : null}
                {step.body ? <p className="csr-card-desc">{step.body}</p> : null}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
