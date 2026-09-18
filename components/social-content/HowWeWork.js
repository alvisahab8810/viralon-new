// components/social-content/HowWeWork.js — "How we work" on /social-content.
//
// The five steps are pinned: when the section reaches the top of the screen it
// stays there while the page keeps scrolling, and each further screen-height of
// scroll swaps the copy on the right. After the fifth the pin releases and the
// rest of the page carries on.
//
// How the pin works, in two parts: the outer .sst-scroll is five viewports
// tall, and the .sst-stage inside it is `position: sticky; top: 0` at one
// viewport tall. The browser does the freezing; this component only reads how
// far through the tall wrapper the page has travelled and turns that into an
// index. Nothing here moves the page itself — no scroll hijacking, so a
// trackpad fling, a scrollbar drag, keyboard paging and find-in-page all still
// behave normally, and the section can be scrolled past at any speed.
//
// Below 1024 the pin is dropped entirely in responsive.css (the wrapper goes
// auto-height and the stage static) and the five steps simply stack. On a phone
// a pinned section costs five screens of scrolling to read five short
// paragraphs, and it fights the browser's own address-bar resize.
//
// Styles live at the end of custome.css, responsive steps at the end of
// responsive.css. Every rule is prefixed .social-steps because the page is
// wrapped in .bg-dark, whose `h1..h6 { color: var(--white) }` in style.css
// would otherwise turn the section heading white on the white band.
import React, { useEffect, useRef, useState } from "react";

const IMAGE = "/assets/others/the-work/social-content/steps.webp";

const STEPS = [
  {
    n: "01",
    title: "Decide the platform",
    body: "Where Your Buyer Already Is, Not Where Your Competitor Posts. This Decision Changes Everything After It.",
  },
  {
    n: "02",
    title: "Plan the month",
    body: "One Calendar, Built Around The Questions Your Buyer Asks Before They Buy, Not Around What Happens To Be Trending That Week.",
  },
  {
    n: "03",
    title: "Script before anyone shoots",
    body: "Hook, Angle And Structure Written First, Calendar Shared For Approval Fifteen Days Ahead. Nobody Points A Camera At Anything Until The Idea Is Signed Off.",
  },
  {
    n: "04",
    title: "Produce, publish, engage",
    body: "Edited, Captioned, Scheduled For The Hours Your Audience Is Actually Awake, In Their Timezone. Then A Daily Engagement Window, Because A Page That Never Replies Looks Abandoned.",
  },
  {
    n: "05",
    title: "Measure, then change something",
    body: "One Report A Month On What Moved, What Did Not, And What We Are Doing Differently Next Month. Decisions, Not Vanity Numbers.",
  },
];

export default function HowWeWork() {
  const wrapRef = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    // The stage is pinned for exactly (wrapper height - one viewport) of
    // scrolling, so that distance divided into five equal bands is the step
    // index. Clamped at both ends, because the handler also runs while the
    // section is still below the fold or already above it.
    const read = () => {
      const el = wrapRef.current;
      if (!el) return;
      const pinned = el.offsetHeight - window.innerHeight;
      if (pinned <= 0) return;
      const travelled = Math.min(
        Math.max(-el.getBoundingClientRect().top, 0),
        pinned
      );
      const i = Math.min(
        STEPS.length - 1,
        Math.floor((travelled / pinned) * STEPS.length)
      );
      setActive(i);
    };

    read();
    window.addEventListener("scroll", read, { passive: true });
    window.addEventListener("resize", read);
    return () => {
      window.removeEventListener("scroll", read);
      window.removeEventListener("resize", read);
    };
  }, []);

  return (
    <section className="social-steps">
      <div className="container">
        <p className="sst-eyebrow">How we work</p>
        <h2 className="sst-heading">
          Five Steps, Every Month,{" "}
          <span className="sst-accent">In The Same Order.</span>
        </h2>
      </div>

      <div className="sst-scroll" ref={wrapRef}>
        <div className="sst-stage">
          <div className="sst-visual">
            {/* Decorative: the step copy beside it carries the meaning. */}
            <img src={IMAGE} alt="" />
          </div>

          {/* All five panels are rendered and stacked; only the active one is
              shown. Swapping visibility rather than the text itself means the
              panel never reflows mid-scroll, and the outgoing step can fade
              under the incoming one. The inactive panels are hidden from
              screen readers so the section reads as one step at a time. */}
          {/* The panel's tone alternates with the step, so every swap is
              visible on the background as well as in the copy: odd steps sit
              on the lighter of the two. */}
          <div className={"sst-panel" + (active % 2 ? " is-alt" : "")}>
            {STEPS.map((s, i) => (
              <article
                className={"sst-step" + (i === active ? " is-active" : "")}
                key={s.n}
                aria-hidden={i === active ? undefined : "true"}
              >
                <p className="sst-num">{s.n}</p>
                <h3 className="sst-title">{s.title}</h3>
                <p className="sst-body">{s.body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
