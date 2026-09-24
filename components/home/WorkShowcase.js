// components/home/WorkShowcase.js — "Case Studies" on the home page.
//
// One case study open at a time. The row of logos at the foot is the
// control: the open one is in colour, the rest are drained to black and
// white, and picking one -- or letting the section advance on its own --
// swaps the headline, the paragraph, the link and the artwork above it.
//
// The copy and the artwork are the four studies we have. The big picture is
// the same file as the logo card for now, so a real 4:3 hero can be dropped
// into `hero` per study without touching anything else.
//
// Styles live at the end of custome.css, responsive steps at the end of
// responsive.css. The section keeps .workshow-section so the dark ground and
// the page's rhythm stay shared with the rails below it.
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

// How long a study stays open before the next one comes round.
const AUTO_INTERVAL = 5000;

const CASES = [
  {
    name: "Tourwatchout",
    logo: "/assets/images/our-work/1.webp",
    hero: "/assets/images/our-work/1.webp",
    href: "/our-work/tourwatchout",
    title: ["Paid Search Strategy Delivers ", "+28% Revenue Boost", " With Decreased Ad Spend."],
    body:
      "We utilized tROAS bidding and Enhanced Conversions, and expanded into Performance Max for growth, but also selectively leveraged Standard Shopping campaigns to allocate spend for under-performing product categories in a profit-driving ad placement.",
  },
  {
    name: "Ragee Makeup",
    logo: "/assets/images/our-work/2.webp",
    hero: "/assets/images/our-work/2.webp",
    href: "/our-work/ragee-makeup",
    title: ["Creative Testing Lifts Bookings ", "+245% On The Same Budget", "."],
    body:
      "A month of short-form angles run against one another until three of them earned the spend. The winners moved to the top of the funnel, the rest were retired, and the cost of a booked seat fell while the calendar filled.",
  },
  {
    name: "Colomoto",
    logo: "/assets/images/our-work/3.webp",
    hero: "/assets/images/our-work/3.webp",
    href: "/our-work/colomoto",
    title: ["Search And Landing Pages Cut ", "Cost Per Lead By 41%", "."],
    body:
      "Search terms cleaned weekly, negatives written from the data rather than from a template, and a landing page per service instead of one page asked to answer every question. The enquiries that arrived were the ones worth calling.",
  },
  {
    name: "Sapphire Auditorium",
    logo: "/assets/images/our-work/4.webp",
    hero: "/assets/images/our-work/4.webp",
    href: "/our-work/sapphire-auditorium",
    title: ["Tracking Fixed First, Then ", "3.2x Return On Ad Spend", "."],
    body:
      "Server side tracking and a conversion that matched a real enquiry, so the platform finally optimised towards the right event. Nothing about the budget changed; the machine simply stopped buying the wrong people.",
  },
];

export default function WorkShowcase() {
  // Which study is open. The logos set it, and the timer below moves it on
  // its own so the section keeps turning while nobody is touching it.
  const [active, setActive] = useState(0);
  const railRef = useRef(null);

  useEffect(() => {
    const id = setInterval(
      () => setActive((i) => (i + 1) % CASES.length),
      AUTO_INTERVAL
    );
    return () => clearInterval(id);
  }, []);

  // The logo row scrolls on a phone, so the one that just opened is brought
  // into view rather than left off the edge.
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.children[active];
    if (!card) return;
    rail.scrollTo({
      left: card.offsetLeft - rail.offsetLeft,
      behavior: "smooth",
    });
  }, [active]);

  const study = CASES[active];

  return (
    <section className="workshow-section wsc-cases">
      <div className="container">
        <div className="wsc-panel">
          <p className="wsc-eyebrow">Case Studies</p>

          <div className="wsc-grid">
            <div className="wsc-copy">
              <h2 className="wsc-title">
                {study.title[0]}
                <span className="wsc-accent">{study.title[1]}</span>
                {study.title[2]}
              </h2>

              <p className="wsc-body">{study.body}</p>

              {/* The site's pill -- .swy-cta is listed with /search's and
                  /social-content's in custome.css, so the button stays one
                  rule across the site. */}
              <Link href={study.href} className="swy-cta wsc-cta">
                <span className="swy-cta-text">Read Case Study</span>
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

            {/* Decorative: the study is named and described beside it. */}
            <div className="wsc-media">
              <img src={study.hero} alt="" />
            </div>
          </div>

          <ul className="wsc-logos" ref={railRef}>
            {CASES.map((item, i) => (
              <li key={item.name}>
                <button
                  type="button"
                  className={"wsc-logo" + (i === active ? " is-on" : "")}
                  onClick={() => setActive(i)}
                  aria-pressed={i === active}
                >
                  <img src={item.logo} alt={item.name} loading="lazy" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
