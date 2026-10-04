import React from "react";
import SliderNav, { useSliderTrack } from "./SliderNav";

/*
 * "Which Part Of Yours Is Broken?" — a dark rail of five diagnostic cards.
 * Media is 372x502 with a 30px radius; the nav sits under the rail, right
 * aligned.
 */

/* Copy is verbatim from the Figma prototype; artwork is the exported set in
   /assets/images/broken (1..5), in the same order. */
const PARTS = [
  {
    title: "People visit the site and leave without enquiring.",
    desc: "Start with web development. Your traffic is fine. Your website is losing it.",
    img: "/assets/images/broken/1.webp",
  },
  {
    title: "Leads come in, but nobody can say where they came from.",
    desc: "Start with measurement. You are optimising against numbers that are wrong.",
    img: "/assets/images/broken/2.webp",
  },
  {
    title: "The moment we pause ads, everything goes quiet.",
    desc: "Start with SEO. You are renting your customers.",
    img: "/assets/images/broken/3.webp",
  },
  {
    title: "We get enquiries, but they are the wrong people asking about price.",
    desc: "Start with branding. Your message is pulling the wrong buyer.",
    img: "/assets/images/broken/4.webp",
  },
  {
    title: "Everything runs, and we still cannot decide what to do next.",
    desc: "Start with advisory. You do not have a marketing problem. You have a decision problem.",
    img: "/assets/images/broken/5.webp",
  },
];

/* The wording around the rail. The phone heading breaks in a different place,
   so it is its own pair of lines rather than the same ones reflowed.
   Overridden by the home record when the CRM holds one. */
const COPY = {
  headA: "Which Part Of Yours",
  headB: "Is",
  accent: "Broken?",
  headMobileA: "Which Part Of",
  headMobileB: "Yours Is",
  intro:
    "One of these five is your business right now. Pick it, and we will tell you where to start and what it costs.",
};

export default function BrokenParts({ d = {} }) {
  const { trackRef, atStart, atEnd, updateEdges, scrollByCard } =
    useSliderTrack(".broken-card");

  const c = { ...COPY };
  for (const k of Object.keys(COPY)) if (d[k]) c[k] = d[k];
  const parts = d.cards?.length ? d.cards : PARTS;

  return (
    <section className="broken-section">
      <div className="container">
        <div className="broken-head">
          <h2 className="broken-heading mobile-none" >
            {c.headA}
            <br />
            {c.headB} <span className="broken-accent">{c.accent}</span>
          </h2>

          <h2 className="broken-heading desktop-none" >
            {c.headMobileA} <br /> {c.headMobileB}{" "}
            <span className="broken-accent">{c.accent}</span>
          </h2>

          <p className="broken-intro">{c.intro}</p>
        </div>
      </div>

      <div className="broken-track-wrap">
        <div className="broken-track" ref={trackRef} onScroll={updateEdges}>
          {parts.map((part, i) => (
            <article className="broken-card" key={part.title + i}>
              <div className="broken-media">
                <img src={part.img} alt="" loading="lazy" aria-hidden="true" />
              </div>
              <h3 className="broken-card-title">{part.title}</h3>
              <p className="broken-card-desc">{part.desc}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="container">
        <div className="broken-foot">
          <SliderNav
            atStart={atStart}
            atEnd={atEnd}
            onScroll={scrollByCard}
            theme="dark"
          />
        </div>
      </div>
    </section>
  );
}
