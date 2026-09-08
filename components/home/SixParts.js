import React from "react";
import Link from "next/link";
import SliderNav, { useSliderTrack } from "./SliderNav";

/*
 * "The 6 Parts Of Machine" — an Apple-style horizontal card gallery.
 * Not an autoplay carousel: cards sit in a native scroll-snap track, start
 * partially peeking off the right edge of the container, and the visitor
 * drags/scrolls (or uses the prev/next arrows) to bring the next card fully
 * into view while the previous one slides out to the left.
 */

const CARDS = [
  {
    tag: "Brand",
    title: "People do not buy the cheapest option in a category they take seriously.",
    desc: "The way you look and sound decides who trusts you enough to call. We build the brand that earns that trust.",
    href: "/our-services/brand-identity-design",
    theme: "cream",
    mockup: "brand",
  },
  {
    tag: "Social content",
    title: "Your buyer checks your LinkedIn & Instagram before they call.",
    desc: "What they find decides whether they call. We make content that gives them a reason to.",
    href: "/our-services/social-media-marketing",
    theme: "peach",
    mockup: "social",
  },
  {
    tag: "Search",
    title: "Ads stop the day you stop paying. Search keeps working.",
    desc: "Slow to start, and the only channel where work you did last year is still bringing enquiries today.",
    href: "/our-services/seo",
    theme: "grey",
    mockup: "search",
  },
  {
    tag: "Paid ads",
    title: "Meta and Google send you traffic. We turn it into a cost you can live with.",
    desc: "We test the ad, then the audience, then the offer — until the number works.",
    href: "/our-services/paid-media-marketing",
    theme: "blue",
    mockup: "ads",
  },
  {
    tag: "Website",
    title: "Your website is a 24/7 salesperson, if it actually sells.",
    desc: "Every visit either turns into an enquiry or it doesn't. We build for the first one.",
    href: "/our-services/web-development",
    theme: "mint",
    mockup: "website",
  },
  {
    tag: "Tracking",
    title: "If you can't see which channel brought the customer, you can't double down on it.",
    desc: "We wire up tracking so every enquiry is traced back to the exact thing that worked.",
    href: "/our-services/digital-marketing",
    theme: "lilac",
    mockup: "tracking",
  },
];

function Mockup({ type }) {
  switch (type) {
    case "brand":
      return (
        <svg viewBox="0 0 64 64" width="56" height="56" fill="none">
          <path d="M16 24h32l4 30a4 4 0 01-4 4.4H16a4 4 0 01-4-4.4l4-30z" stroke="#0B0B0F" strokeWidth="2.4" strokeLinejoin="round" />
          <path d="M22 24v-4a10 10 0 0120 0v4" stroke="#0B0B0F" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      );
    case "social":
      return (
        <div className="sp-mock-phone">
          <div className="sp-mock-phone-notch" />
          <div className="sp-mock-post" />
          <div className="sp-mock-post-row">
            <span className="sp-mock-heart">♥</span>
            <span className="sp-mock-line" />
          </div>
        </div>
      );
    case "search":
      return (
        <div className="sp-mock-search">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="7" stroke="#94a3b8" strokeWidth="2" />
            <path d="M21 21l-4.3-4.3" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span>Search something...</span>
          <span className="sp-mock-mic">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <rect x="9" y="3" width="6" height="11" rx="3" fill="#fff" />
              <path d="M6 11a6 6 0 0012 0M12 19v2" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
        </div>
      );
    case "ads":
      return (
        <div className="sp-mock-ads">
          <span className="sp-mock-badge sp-mock-badge--meta">M</span>
          <span className="sp-mock-badge sp-mock-badge--google">G</span>
        </div>
      );
    case "website":
      return (
        <div className="sp-mock-browser">
          <div className="sp-mock-browser-bar">
            <i /><i /><i />
          </div>
          <div className="sp-mock-browser-body">
            <span className="sp-mock-line sp-mock-line--wide" />
            <span className="sp-mock-line" />
            <span className="sp-mock-line sp-mock-line--short" />
          </div>
        </div>
      );
    case "tracking":
      return (
        <svg viewBox="0 0 64 44" width="72" height="48" fill="none">
          <path d="M2 40h60" stroke="#0B0B0F" strokeWidth="2" strokeLinecap="round" opacity="0.25" />
          <rect x="8" y="24" width="9" height="16" rx="2" fill="#0B0B0F" opacity="0.55" />
          <rect x="24" y="14" width="9" height="26" rx="2" fill="#0B0B0F" opacity="0.75" />
          <rect x="40" y="4" width="9" height="36" rx="2" fill="#FE4601" />
        </svg>
      );
    default:
      return null;
  }
}

export default function SixParts() {
  const { trackRef, atStart, atEnd, updateEdges, scrollByCard } =
    useSliderTrack(".sixparts-card");

  return (
    <section className="sixparts-section">
      <div className="container">
        <div className="sixparts-head">
          <h2 className="sixparts-heading">
            The 6 Parts Of
            <br />
            <span className="sixparts-accent">Machine</span>
          </h2>

          <SliderNav atStart={atStart} atEnd={atEnd} onScroll={scrollByCard} />
        </div>

      </div>

      <div className="sixparts-track-wrap">
        <div className="sixparts-track" ref={trackRef} onScroll={updateEdges}>
          {CARDS.map((card) => (
            <article className={`sixparts-card sixparts-card--${card.theme}`} key={card.tag}>
              <span className="sixparts-tag">{card.tag}</span>
              <h3 className="sixparts-title">{card.title}</h3>
              <p className="sixparts-desc">{card.desc}</p>

              <div className="sixparts-mockup">
                <Mockup type={card.mockup} />
              </div>

              <Link href={card.href} className="sixparts-cta">
                Have a look
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path d="M7 17L17 7M9 7h8v8" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
