// components/social-content/ThreeWays.js — "Three ways we work" on
// /social-content.
//
// The same section as /search, with this page's own copy. It renders the
// search section's classes (.search-ways and the .swa-* set) so the band, the
// cards and the button are one stylesheet rather than two that drift; the
// extra .social-ways class carries only what this version does differently —
// the standfirst under the outcome, the grouped lists, and the ticks in place
// of the dots. Those overrides sit next to the .search-ways rules at the end
// of custome.css.
//
// The copy is not shared with /search: Presence, Growth and Authority mean
// something different here (they stack — Growth is Presence plus more,
// Authority is Growth plus more), which is why the cards carry groups rather
// than one flat list.
import React from "react";
import Link from "next/link";
import { openEnquiry } from "../common/EnquiryPopup";

const WAYS = [
  {
    name: "Presence",
    promise: "Look real",
    forWho: "For businesses that are invisible when someone checks them up",
    outcome: "A page that proves you are a serious business.",
    intro:
      "The baseline. Anyone who hears your name, searches you, and lands on your profile finds a business that is clearly running and clearly capable.",
    groups: [
      {
        title: "Content we make",
        items: [
          "Founder led talking pieces answering the questions you get on every sales call",
          "Text hook reels built from stock or your own footage, no shoot needed",
          "Static posts for announcements, offers and the pieces that make a page look considered",
          "Carousels for the topics that need more than fifteen seconds",
          "Trend formats where they suit the brand, skipped where they do not",
        ],
      },
      {
        title: "Content we make",
        items: [
          "Calendar planned and approved before anything is produced",
          "Scripting, editing, captions, hashtags and scheduling in your buyer's timezone",
          "A daily engagement window so the page never looks abandoned",
          "Performance report and a plan for the month after",
        ],
      },
    ],
  },
  {
    name: "Growth",
    promise: "Get Found",
    forWho: "For businesses ready to be found, not just checked",
    outcome: "Content that earns reach and feeds your ads.",
    intro:
      "Everything in Presence, and then the part that compounds. More formats, real testing, and the best performing organic content moving into paid where it works twice.",
    groups: [
      {
        title: "Added Content",
        items: [
          "Product and service demos shot in your own space",
          "Customer stories, the highest converting format you own",
          "UGC style pieces built to run as ad creative",
          "Designed static posts carrying data, offers and comparisons",
          "Ad variants of anything that performs, same edit, different hook",
        ],
      },
      {
        title: "Added Activity",
        items: [
          "A weekly direction call where we art direct the shoot with your team",
          "Second platform brought live once the first is working",
          "Creator seeding begins, small scale, matched to your category",
          "Reporting on which content produced enquiries, not impressions",
        ],
      },
    ],
  },
  {
    name: "Authority",
    promise: "Be The Name",
    forWho: "For businesses that want to own the category conversation",
    outcome: "The name people bring up before they compare.",
    intro:
      "Everything in Growth, plus the work that makes you the reference point. Long form, creators, and a presence across every place your buyer looks.",
    groups: [
      {
        title: "Added Content",
        items: [
          "Long form founder video on YouTube, the only format still earning years later",
          "Documentary style films about the work, the team, the process",
          "Podcast and interview cuts repurposed across every platform",
          "Category commentary, the opinion pieces that get you quoted",
        ],
      },
      {
        title: "Added Activity",
        items: [
          "Influencer and creator programmes, sourced, briefed and managed end to end",
          "Full platform coverage including founder presence on LinkedIn and X",
          "Community management and reputation handling",
          "Quarterly strategy review with the leadership team",
        ],
      },
    ],
  },
];

// Drawn rather than typed: a tick character lands at a different height in
// every font, and this one has to sit on the same line as the first row of
// its item at all three card widths.
function Tick() {
  return (
    <span className="swa-tick" aria-hidden="true">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="7.25" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M5 8.2L7.1 10.3L11.2 6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export default function ThreeWays() {
  return (
    <section className="search-ways social-ways">
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
              <p className="swa-intro">{way.intro}</p>

              {/* Two cards repeat a group title ("Content we make"), so the
                  key is the position, not the title. */}
              {way.groups.map((group, i) => (
                <div className="swa-group" key={i}>
                  <p className="swa-group-title">{group.title}</p>
                  <ul className="swa-items">
                    {group.items.map((item) => (
                      <li className="swa-item" key={item}>
                        <Tick />
                        <span className="swa-item-text">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
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
            <span className="swy-cta-text">Let us talk</span>
            <span className="swy-cta-icon" aria-hidden="true">
              {/* An SVG, not the ↗ character: the glyph sits off-centre in the
                  disc by a different amount in every font. */}
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
