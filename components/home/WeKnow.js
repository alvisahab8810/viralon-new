import React from "react";

/*
 * "We Know, What You Are Going Through" — the problem/solution pair that sits
 * directly under the Partnering strip. The photo is the backdrop for the whole
 * block: heading and both cards ride on top of it.
 *
 * Copy comes from the home record when the CRM holds one, and from COPY
 * below otherwise, so a bare <WeKnow /> is unchanged.
 */
const COPY = {
  accent: "We Know,",
  headA: "What You",
  headB: "Are Going Through",
  bodyA:
    "You have probably got a social agency, someone running ads, and a website built two years ago by a person you no longer speak to. None of them talks to each other, so nobody can tell you which of them actually brought you customers",
  bodyB:
    "We run all six together. Content builds demand, search and ads capture it, the website turns it into an enquiry, and tracking proves it.",
  img: "/assets/images/abt.webp",
};

export default function WeKnow({ d = {} }) {
  const c = { ...COPY };
  for (const k of Object.keys(COPY)) if (d[k]) c[k] = d[k];

  return (
    <section className="weknow-section">
      <div className="weknow-stage">
        <img
          className="weknow-photo"
          src={c.img}
          alt=""
          aria-hidden="true"
        />

        <div className="container weknow-stage-inner">
          <h2 className="weknow-heading">
            <span className="weknow-heading-accent">{c.accent}</span> {c.headA}
            <br />
            {c.headB}
          </h2>

          <div className="weknow-cards">
            <article className="weknow-card weknow-card--muted">
              <p>{c.bodyA}</p>
            </article>

            <article className="weknow-card weknow-card--accent">
              <p>{c.bodyB}</p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
