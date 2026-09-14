// components/search/ThreeWays.js — "Three ways we work" on /search.
//
// Three engagement cards on the dark band: the job's name and its one-line
// promise, who it is for, what it produces, then what is in it. The cards are
// the same shape on purpose so they can be compared line for line.
//
// The "Let's talk" button is the Why-search section's own button, not a copy:
// it carries the same .swy-cta classes (and, like it, opens the enquiry popup
// rather than following the /contact-us href), and custome.css lists .search-ways
// alongside .search-why on those rules -- so a change to that button lands
// here too.
//
// Styles live at the end of custome.css under `.search-ways`, responsive steps
// at the end of responsive.css.
import React from "react";
import Link from "next/link";
import { openEnquiry } from "../common/EnquiryPopup";

const WAYS = [
  {
    name: "Growth",
    promise: "Be Chosen",
    forWho: "For businesses ranking somewhere, but not where the money is",
    outcome: "Content that earns position and gets quoted.",
    items: [
      "Original research and data, the only reliable way to earn a citation",
      "Named expert attribution, which lifts AI visibility materially",
      "Answer engine work aimed at AI Overviews and snippets",
      "Monthly prompt gap analysis across ChatGPT, Perplexity and Gemini",
      "Digital PR on real publications, plus conversion work on pages already getting traffic",
    ],
  },
  {
    name: "Authority",
    promise: "Be Cited",
    forWho: "For businesses that want to be the answer, not a result",
    outcome: "The source everyone else gets compared to.",
    items: [
      "Entity establishment everywhere the engines verify who you are",
      "Sourced mentions programme on Reddit, YouTube and niche communities",
      "Category defining content, the pieces competitors end up citing",
      "Multi-market and multi-language search where you sell across borders",
      "Weekly citation tracking across four engines, logged and reported",
    ],
  },
  {
    name: "Presence",
    promise: "Be Findable",
    forWho: "For businesses that do not appear when someone searches the obvious thing",
    outcome: "The foundation, done properly, once.",
    items: [
      "Technical audit and fixes so crawlers can actually read you",
      "Keyword and prompt mapping across the buying journey",
      "Core pages rewritten to answer the question, not describe the service",
      "Local search, profiles, city pages and reviews",
      "Rankings tracked every month, not filed",
    ],
  },
];

export default function ThreeWays() {
  return (
    <section className="search-ways">
      <div className="container">
        <p className="swa-eyebrow">Three ways we work</p>

        <h2 className="swa-heading">
          Not Packages. <span className="swa-accent">Three Different Jobs.</span>
        </h2>

        <ul className="swa-cards">
          {WAYS.map((way) => (
            <li className="swa-card" key={way.name}>
              <h3 className="swa-name">{way.name}</h3>
              <p className="swa-promise">{way.promise}</p>

              <p className="swa-for">{way.forWho}</p>
              <p className="swa-outcome">{way.outcome}</p>

              <ul className="swa-items">
                {way.items.map((item) => (
                  <li className="swa-item" key={item}>
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <div className="swa-foot">
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
        </div>
      </div>
    </section>
  );
}
