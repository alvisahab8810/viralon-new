import React from "react";
import { isYes } from "../../utils/homeSchema";

/*
 * "How It Runs" — stacked stage cards. Each card is a full-bleed image with
 * the copy laid over it; the gradient, photo and colour dots all live in the
 * image itself, so this component only positions type on top.
 *
 * `flip: true` moves the copy to the right half. It follows the artwork:
 * each image keeps its subject on one side and leaves the other side clear,
 * so the copy always sits on the empty half.
 */

const STEPS = [
  {
    num: "01",
    label: "Foundation",
    title: "Positioning, brand,\nwebsite, tracking",
    desc: "Positioning settled and the brand built for the customer you actually want. Website built or improved. Tracking wired in before a single rupee is spent. Nothing runs blind.",
    img: "/assets/images/how-runs/first-card.webp",
    imgMobile: "/assets/images/how-runs/first-card-mobile.webp",
    flip: false,
  },
  {
    num: "02",
    label: "Traction",
    title: "Paid ads, social\ncontent, first leads",
    desc: "Ads go live and social content starts running. This is the part that moves fastest — the first qualified enquiries land here, and every rupee is traced back to what caused it.",
    img: "/assets/images/how-runs/second-card.webp",
    imgMobile: "/assets/images/how-runs/second-card-mobile.webp",
    flip: true,
  },
  {
    num: "03",
    label: "Visibility",
    title: "Search, content,\nauthority",
    desc: "Search is slow to start and impossible to buy your way out of later. We build it from month one, so the enquiries keep arriving long after the ad budget stops.",
    img: "/assets/images/how-runs/third-card.webp",
    imgMobile: "/assets/images/how-runs/third-card-mobile.webp",
    flip: false,
  },
  {
    num: "04",
    label: "Compounding",
    title: "Every part feeding\nthe next one",
    desc: "Brand makes the ads cheaper. Content feeds search. Tracking tells all of them where to push. This is the point where the machine stops needing to be pushed.",
    img: "/assets/images/how-runs/fourth.webp",
    imgMobile: "/assets/images/how-runs/fourth-card-mobile.webp",
    flip: true,
  },
];

/* The wording around the cards, overridden by the home record when the CRM
   holds one. `flip` arrives from the CRM as a word rather than a boolean, so
   isYes reads it — the hard-coded steps above stay booleans. */
const COPY = {
  headA: "How It",
  accent: "Runs",
  intro: "Everything starts together. The parts just mature at different speeds.",
};

export default function HowItRuns({ d = {} }) {
  const c = { ...COPY };
  for (const k of Object.keys(COPY)) if (d[k]) c[k] = d[k];
  const steps = d.steps?.length ? d.steps : STEPS;

  return (
    <section className="howruns-section">
      <div className="container">
        <div className="howruns-head">
          <h2 className="howruns-heading">
            {c.headA} <span className="howruns-accent">{c.accent}</span>
          </h2>
          <p className="howruns-intro">{c.intro}</p>
        </div>

        <div className="howruns-list">
          {steps.map((step, i) => (
            <article
              className={`howruns-card${
                step.flip === true || isYes(step.flip) ? " is-flipped" : ""
              }`}
              key={step.num + i}
            >
              <img
                className="howruns-card-bg howruns-card-bg--desktop"
                src={step.img}
                alt=""
                aria-hidden="true"
              />
              <img
                className="howruns-card-bg howruns-card-bg--mobile"
                src={step.imgMobile}
                alt=""
                aria-hidden="true"
              />

              <span className="howruns-num" aria-hidden="true">
                {step.num}
              </span>

              <div className="howruns-card-body">
                <span className="howruns-eyebrow">
                  <i aria-hidden="true" />
                  {step.label}
                </span>
                <h3 className="howruns-card-title">{step.title}</h3>
                <p className="howruns-card-desc">{step.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
