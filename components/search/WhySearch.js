// components/search/WhySearch.js — "Why search" on /search.
//
// Heading full width, then a two-column body: the CTA and the two grey copy
// blocks on the left, the photograph on the right. The copy blocks are pushed
// to the foot of their column so they finish level with the bottom of the
// image rather than floating under the button.
//
// The two blocks are deliberately uneven — the first is a short setup, the
// second carries the argument — so the left column is split 0.62fr / 1fr
// rather than in half. Fractions, not fixed widths, so the split survives the
// container stepping down at each breakpoint.
//
// The highlighted runs inside the copy are the claim itself, so they are
// <strong> rather than a styled <span>: they are emphasis in the sentence, and
// anything reading the page without the stylesheet should still get them.
//
// Styles are at the end of custome.css under `.search-why`, responsive steps
// at the end of responsive.css. Every rule is prefixed with the section class
// because /search wraps the page in .bg-dark, whose `h1..h6 { color:
// var(--white) }` and `p { … }` rules in style.css would wash this light band
// out.
import React from "react";
import Link from "next/link";
import { openEnquiry } from "../common/EnquiryPopup";

export default function WhySearch() {
  return (
    <section className="search-why">
      <div className="container">
        <p className="swy-eyebrow">Why search</p>

        <h2 className="swy-heading">
          The Only Channel Where They{" "}
          <span className="swy-accent">Arrive Already Wanting It.</span>
        </h2>

        <div className="swy-grid">
          <div className="swy-col">
            <Link
              href="/contact-us"
              className="swy-cta"
              onClick={(e) => {
                e.preventDefault();
                openEnquiry();
              }}
            >
              <span className="swy-cta-text">Let's talk</span>
              <span className="swy-cta-icon" aria-hidden="true">
                {/* An SVG, not the ↗ character: the glyph sits off-centre in the disc
                    by a different amount in every font. */}
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

            <div className="swy-cards">
              <p className="swy-card">
                An Ad Interrupts Someone. A Reel Earns Three Seconds.{" "}
                <strong className="swy-hl">
                  A Search Is A Person Typing Their Problem Into A Box
                </strong>
                , Right Now, Intending To Solve It.
              </p>

              <p className="swy-card">
                You Are Not Creating Demand. You Are Catching It At The Exact
                Moment It Exists. That Is Why{" "}
                <strong className="swy-hl">
                  Search Enquiries Close Faster And Cost Less Than Anything Else
                  You Run
                </strong>
                , And Why A Page That Ranks Keeps Producing Them Long After The
                Work Is Done.
              </p>
            </div>
          </div>

          <div className="swy-art">
            <img src="/assets/others/abt1.png" alt="" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  );
}
