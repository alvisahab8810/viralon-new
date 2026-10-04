// components/social-content/WrongPlatform.js — "Where most get it wrong" on
// /social-content.
//
// A single dark panel sitting on the page's white band. The dark is the
// artwork itself — pattern.webp, the export from the frame — so the panel
// declares no background colour of its own: whatever the image covers is what
// you see. Type is the scale the rest of the page's sections already use (27
// eyebrow, 55/60 heading, 16/150% body).
//
// The button is the site's "Let's talk" pill at its usual size — it carries
// the same .swy-cta classes, and custome.css lists .social-wrong alongside
// .search-why on those rules, so only the colours are restated here: white
// pill, purple disc, as the frame draws it. Like the others it opens the
// enquiry popup rather than following the /contact-us href.
//
// Styles live at the end of custome.css, responsive steps at the end of
// responsive.css. Every rule is prefixed .social-wrong because the page is
// wrapped in .bg-dark, whose `h1..h6 { color: var(--white) }` in style.css
// would otherwise take the accent off the heading.
import React from "react";
import Link from "next/link";
import { openEnquiry } from "../common/EnquiryPopup";

// The copy the page ships with; a stored band overrides a line at a time.
const COPY = {
  eyebrow: "Where most get it wrong",
  headA: "Everyone Starts On Instagram.",
  accent: "Most Should Not.",
  body: "Your Competitors Being On A Platform Is Not A Reason For You To Be There. The Only Question That Matters Is Where The Person Who Signs The Cheque Already Spends Their Attention.",
  ctaText: "Let us talk",
};

export default function WrongPlatform({ d = {} }) {
  const c = { ...COPY };
  for (const k of Object.keys(COPY)) if (d[k]) c[k] = d[k];

  return (
    <section className="social-wrong">
      <div className="container">
        <div className="swr-panel">
          <p className="swr-eyebrow">{c.eyebrow}</p>

          <h2 className="swr-heading">
            {c.headA}{" "}
            <span className="swr-accent">{c.accent}</span>
          </h2>

          <p className="swr-body">{c.body}</p>

          <Link
            href="/contact-us"
            className="swy-cta"
            onClick={(e) => {
              e.preventDefault();
              openEnquiry();
            }}
          >
            <span className="swy-cta-text">{c.ctaText}</span>
            <span className="swy-cta-icon" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M3 11L11 3M11 3H4.5M11 3V9.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
