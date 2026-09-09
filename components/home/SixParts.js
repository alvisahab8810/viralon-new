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

/* Copy and card order are taken verbatim from the Figma prototype, and the
   artwork is the exported set in /assets/images/part-machine (1..6). */
const CARDS = [
  {
    tag: "Brand",
    title: "People do not buy the cheapest option in a category they take seriously.",
    desc: "Choose the easy way to finance with convenient monthly payment options.",
    href: "/our-services/brand-identity-design",
    img: "/assets/images/part-machine/1.png",
  },
  {
    tag: "Social content",
    title: "Your buyer checks your LinkedIn & Instagram before they call.",
    desc: "What they find decides whether they call. We make content that gives them a reason to.",
    href: "/our-services/social-media-marketing",
    img: "/assets/images/part-machine/2.png",
  },
  {
    tag: "Paid ads",
    title: "Meta and Google, held to a cost per qualified lead.",
    desc: "We test the angle first, then the format, then the wording. In that order.",
    href: "/our-services/paid-media-marketing",
    img: "/assets/images/part-machine/4.png",
  },
  {
    tag: "Website / CRO",
    title: "Same traffic. Same budget. 3× more enquiries.",
    desc: "We build websites that convert the traffic you already pay for, then keep improving them.",
    href: "/our-services/web-development",
    img: "/assets/images/part-machine/5.png",
  },
  {
    tag: "Search",
    title: "Ads stop the day you stop paying. Search keeps working.",
    desc: "Slow to start, and the only channel where work you did last year is still bringing enquiries today.",
    href: "/our-services/seo",
    img: "/assets/images/part-machine/3.png",
  },
  {
    tag: "Tracking",
    title: "Know which ad, keyword or post brings the good leads.",
    desc: "We rebuild tracking across paid, search and social on your server, so every real enquiry is properly attributed.",
    href: "/our-services/digital-marketing",
    img: "/assets/images/part-machine/6.png",
  },
];

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

        {/* Figma's phone layout carries a lead-in line under the heading that
            the desktop composition does not, so it only renders below 1024. */}
        <p className="sixparts-intro">
          One of these five is your business right now. Pick it, and we will
          tell you where to start and what it costs.
        </p>
      </div>

      <div className="sixparts-track-wrap">
        <div className="sixparts-track" ref={trackRef} onScroll={updateEdges}>
          {CARDS.map((card) => (
            <article className="sixparts-card" key={card.tag}>
              <span className="sixparts-tag">{card.tag}</span>
              <h3 className="sixparts-title">{card.title}</h3>
              <p className="sixparts-desc">{card.desc}</p>

              {/* Figma sits the CTA *on* the artwork, bottom-right, so it lives
                  inside the media box rather than after it in the flow. */}
              <div className="sixparts-media">
                <img src={card.img} alt="" loading="lazy" />

                <Link href={card.href} className="sixparts-cta">
                  Have a look
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <path d="M7 17L17 7M9 7h8v8" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Same arrows again, under the rail and right-aligned -- that is where
          Figma puts them on a phone. Only one copy is visible at a time
          (`.sixparts-nav-below` is display:none above 1023), and both drive the
          one shared `scrollByCard`. */}
      <div className="container sixparts-nav-below">
        <SliderNav atStart={atStart} atEnd={atEnd} onScroll={scrollByCard} />
      </div>
    </section>
  );
}
