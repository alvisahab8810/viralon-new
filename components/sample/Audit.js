// components/sample/Audit.js — the closing ask on /sample.
//
// The /analytics-and-tracking band rebuilt as this page's own: the question set
// as large as the band allows, with the artwork running off the right edge
// behind it. The image is decorative and deliberately cropped by the section,
// which is why it carries an empty alt and sits under the copy in the stacking
// order rather than beside it in the flow.
//
// Same artwork and the same values as that band -- 84.4/85 heading, the 239x48
// pill -- so the two read identically; the markup and the .sma-* classes are
// this page's, so retuning one cannot move the other.
//
// The button opens the enquiry popup like every other call on the site, and
// keeps /contact-us as its href so it still works with JavaScript off.
import React from "react";
import Link from "next/link";
import { openEnquiry } from "../common/EnquiryPopup";

const COPY = {
  heading: "Start with one question you cannot answer.",
  note:
    "Tell us the decision you are stuck on. We will tell you whether it is a tracking problem, a modelling problem, or a question only a holdout test can settle.",
  ctaText: "Request an audit",
  img: "/assets/others/start-abt.png",
};

// `d` is one section's stored content on a CRM-built page; /sample passes
// nothing and gets COPY.
export default function Audit({ d = {} }) {
  const c = { ...COPY };
  for (const k of Object.keys(COPY)) if (d[k]) c[k] = d[k];

  return (
    <section className="smp-audit">
      <img
        className="sma-art"
        src={c.img}
        alt=""
        aria-hidden="true"
        loading="lazy"
      />

      <div className="container">
        <div className="sma-text">
          <h2 className="sma-heading">{c.heading}</h2>

          <p className="sma-note">{c.note}</p>

          <Link
            href="/contact-us"
            className="sma-cta"
            onClick={(e) => {
              e.preventDefault();
              openEnquiry();
            }}
          >
            {c.ctaText}
          </Link>
        </div>
      </div>
    </section>
  );
}
