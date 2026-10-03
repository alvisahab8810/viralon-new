// components/sample/Industries.js — "Ten Industries." on /sample.
//
// The /search "Why search" composition rebuilt as this page's own: heading full
// width, then copy on the left and a photograph on the right. The type and the
// pill are that section's — 55/60 heading, 18px body, the violet button with
// its white disc — so the two bands read the same size; the markup and the
// .smi-* classes are this page's.
//
// Two differences the frame asks for. The copy is plain paragraphs rather than
// the two grey boxes, so the column is one measure of text. And the button sits
// under the copy instead of over it, which is why the column is not pushed
// apart with space-between the way the search one is.
//
// Every rule is prefixed with the section class, because a page-level
// `h1..h6 { color: var(--white) }` would otherwise wash this light band out.
import React from "react";
import Link from "next/link";
import { openEnquiry } from "../common/EnquiryPopup";

export default function Industries() {
  return (
    <section className="smp-ind">
      <div className="container">
        <h2 className="smi-heading">
          <span className="smi-accent">Ten Industries.</span> We Already Know
          What A Lead Means In Each One.
        </h2>

        <div className="smi-grid">
          <div className="smi-col">
            <p className="smi-body">
              In real estate, the form fill means nothing, and the site visit is
              everything. In education, parents search six months before the
              session opens. Patients never fill a form; they read reviews for
              three weeks and then call. A car wash enquiry and a full paint
              enquiry cost the same to buy and are worth twenty times apart.
            </p>

            {/* The lead-in is the claim, so it is <strong> rather than a styled
                span: it is emphasis in the sentence, and anything reading the
                page without the stylesheet should still get it. */}
            <p className="smi-body">
              <strong className="smi-lead">
                You should not have to explain any of that to your agency.
              </strong>{" "}
              We have run these accounts, made these mistakes, and learned what a
              qualified lead actually means in each one. That knowledge sits at
              the strategy level, not with whoever manages your account.
            </p>

            <Link
              href="/contact-us"
              className="smi-cta"
              onClick={(e) => {
                e.preventDefault();
                openEnquiry();
              }}
            >
              <span className="smi-cta-text">Let&apos;s Talk</span>
              <span className="smi-cta-icon" aria-hidden="true">
                {/* An SVG, not the ↗ character: the glyph sits off-centre in
                    the disc by a different amount in every font. */}
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

          <div className="smi-art">
            <img src="/assets/others/sample-abt.png" alt="" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  );
}
