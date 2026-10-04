import React from "react";

/*
 * Phone-only version of "We Know". Figma's mobile layout is not the desktop
 * one reflowed -- the photo becomes a card at the top and the two cards become
 * plain stacked paragraphs -- so it ships as its own component and the desktop
 * one is hidden below 1024px (and this one above it) in custome.css.
 *
 * It is handed the same section record as WeKnow: the two paragraphs are
 * shared, the photo and the heading lines are its own (mEyebrow, mHeadA,
 * mHeadB, imgMobile), because the phone composition words them differently.
 */
const COPY = {
  mEyebrow: "We Know",
  mHeadA: "What you are",
  mHeadB: "going through",
  bodyA:
    "You have probably got a social agency, someone running ads, and a website built two years ago by a person you no longer speak to. None of them talks to each other, so nobody can tell you which of them actually brought you customers",
  bodyB:
    "We run all six together. Content builds demand, search and ads capture it, the website turns it into an enquiry, and tracking proves it.",
  imgMobile: "/assets/images/abt-mobile.webp",
};

export default function WeKnowMobile({ d = {} }) {
  const c = { ...COPY };
  for (const k of Object.keys(COPY)) if (d[k]) c[k] = d[k];

  return (
    <section className="weknowm-section">
      <div className="container">
        <div className="weknowm-photo-frame">
          <img className="weknowm-photo" src={c.imgMobile} alt="" />
        </div>

        <p className="weknowm-eyebrow">{c.mEyebrow}</p>

        <h2 className="weknowm-heading">
          {c.mHeadA}
          <br />
          {c.mHeadB}
        </h2>

        <p className="weknowm-body">{c.bodyA}</p>

        <p className="weknowm-body weknowm-body--accent">{c.bodyB}</p>
      </div>
    </section>
  );
}
