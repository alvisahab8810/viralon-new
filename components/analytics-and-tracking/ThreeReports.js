// components/analytics-and-tracking/ThreeReports.js — "Three people, three
// reports." on /analytics-and-tracking.
//
// The same white card as "Three questions" above it -- same ground, same
// radius, same shadow, same 12px label -- carrying a different payload: who
// the report is for, what they need out of it, and the three lines that
// report actually contains. The heading uses the shared .anq- section head,
// so it sets at the size every section on every page does.
//
// Each card ends on its own artwork with the site's purple pill sat on it,
// the way the frame draws it. The pill is the same .swy-cta that /search and
// /social-content use -- this section is listed on those rules in custome.css
// and only says how much smaller it sets here, so the button stays one rule
// across the site rather than three that drift.
//
// Styles live at the end of custome.css, responsive steps at the end of
// responsive.css.
import React from "react";
import Link from "next/link";
import SliderNav, { useSliderTrack } from "../home/SliderNav";

const DIR = "/assets/others/";

const REPORTS = [
  {
    who: "Your media buyer",
    needs: "Needs granularity",
    items: [
      "Cost per qualified lead by creative",
      "Which angles are fatiguing",
      "Search terms and negatives",
    ],
    image: "first-p.png",
  },
  {
    who: "You",
    needs: "Needs direction",
    items: [
      "Blended cost of acquisition",
      "Which channel deserves more next month",
      "What to stop doing",
    ],
    image: "second-p.png",
  },
  {
    who: "Your CFO or board",
    needs: "Needs proof",
    items: [
      "Incremental revenue, not attributed",
      "Payback period by channel",
      "Evidence a holdout test produced",
    ],
    image: "third-p.png",
  },
];

export default function ThreeReports() {
  // On a phone the three cards become the same swipeable rail the rest of the
  // site uses, arrows and all. The hooks run at every width; only CSS decides
  // whether the row is a grid or a scroller, so nothing above 560 moves.
  const { trackRef, atStart, atEnd, updateEdges, scrollByCard } =
    useSliderTrack(".anr-card");

  return (
    <section className="ant-reports">
      <div className="container">
        <h2 className="anq-heading anr-heading">
          Three People,{" "}
          <span className="anq-accent">Three Reports.</span>
        </h2>

        <ul className="anr-row" ref={trackRef} onScroll={updateEdges}>
          {REPORTS.map((report) => (
            <li className="anr-card" key={report.who}>
              <p className="anr-who">{report.who}</p>
              <h3 className="anr-needs">{report.needs}</h3>

              <ul className="anr-items">
                {report.items.map((item) => (
                  <li className="anr-item" key={item}>
                    {item}
                  </li>
                ))}
              </ul>

              {/* Decorative: the artwork carries no information the card
                  has not already given in words. */}
              <div className="anr-media">
                <img
                  className="anr-image"
                  src={DIR + report.image}
                  alt=""
                  loading="lazy"
                />

                {/* The site's pill, the same one /search and /social-content
                    use -- .swy-cta is listed with theirs in custome.css, and
                    this section only says how much smaller it sets here. */}
                <Link href="/our-work" className="swy-cta anr-cta">
                  <span className="swy-cta-text">Have a look</span>
                  <span className="swy-cta-icon" aria-hidden="true">
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
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
            </li>
          ))}
        </ul>

        {/* Phone only -- `.anr-nav-below` is display:none above 560, where the
            cards are a grid and there is nothing to scroll. */}
        <div className="anr-nav-below">
          <SliderNav atStart={atStart} atEnd={atEnd} onScroll={scrollByCard} />
        </div>
      </div>
    </section>
  );
}
