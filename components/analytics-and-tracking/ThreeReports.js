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

// The copy the band ships with; a stored band overrides a line at a time.
const COPY = {
  headA: "Three People,",
  accent: "Three Reports.",
  ctaText: "Have a look",
  ctaHref: "/our-work",
};

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

// A stored card writes its three lines flat, one field each, because that is
// what an admin form can edit; a shipped card already carries the array.
const toItems = (r) =>
  r.items || [r.itemOne, r.itemTwo, r.itemThree].filter(Boolean);

// A stored row carries a finished path, the shipped list a bare filename.
const src = (im) => (String(im || "").includes("/") ? im : DIR + im);

// `d` is one section's stored content when this band is placed on a page the
// CRM built. A bare call renders exactly what the page shipped with.
export default function ThreeReports({ d = {} }) {
  const c = { ...COPY };
  for (const k of Object.keys(COPY)) if (d[k]) c[k] = d[k];
  const reports = d.reports?.length ? d.reports : REPORTS;

  // On a phone the three cards become the same swipeable rail the rest of the
  // site uses, arrows and all. The hooks run at every width; only CSS decides
  // whether the row is a grid or a scroller, so nothing above 560 moves.
  const { trackRef, atStart, atEnd, updateEdges, scrollByCard } =
    useSliderTrack(".anr-card");

  return (
    <section className="ant-reports">
      <div className="container">
        <h2 className="anq-heading anr-heading">
          {c.headA}{" "}
          <span className="anq-accent">{c.accent}</span>
        </h2>

        <ul className="anr-row" ref={trackRef} onScroll={updateEdges}>
          {reports.map((report, ri) => (
            <li className="anr-card" key={ri}>
              <p className="anr-who">{report.who}</p>
              <h3 className="anr-needs">{report.needs}</h3>

              <ul className="anr-items">
                {toItems(report).map((item, ii) => (
                  <li className="anr-item" key={ii}>
                    {item}
                  </li>
                ))}
              </ul>

              {/* Decorative: the artwork carries no information the card
                  has not already given in words. */}
              <div className="anr-media">
                <img
                  className="anr-image"
                  src={src(report.image)}
                  alt=""
                  loading="lazy"
                />

                {/* The site's pill, the same one /search and /social-content
                    use -- .swy-cta is listed with theirs in custome.css, and
                    this section only says how much smaller it sets here. */}
                <Link href={c.ctaHref} className="swy-cta anr-cta">
                  <span className="swy-cta-text">{c.ctaText}</span>
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
