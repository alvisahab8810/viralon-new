// components/sample/Parts.js — the four diagnostic cards on /sample.
//
// The home page's "Which Part Of Yours Is Broken?" composition, rebuilt as this
// page's own: the heading on the left, the grey line ranged right against it,
// and the cards under both. The values come from that section (.broken-section)
// so the two read as the same band; the markup and the .smpt-* classes are this
// page's, so retuning one cannot move the other.
//
// One real difference, and it is the point of the section: this is not a rail.
// On a desktop the four cards are a grid that sits still. Only on a phone, where
// four columns cannot be read, does the row turn into a snapping slider.
//
// Artwork is the home page's exported set in /assets/images/broken.
import React from "react";

const PARTS = [
  {
    title: "Enquiries had no owner",
    desc: "Three of hours, were A.A. release from really 3 hours.",
    img: "/assets/images/broken/1.webp",
  },
  {
    title: "Nobody could attribute a booking",
    desc: "Spent bloated or step readers, acc on what caused.",
    img: "/assets/images/broken/2.webp",
  },
  {
    title: "The site described, it never sold",
    desc: "No pricing signals, an in-field form, also one mobile.",
    img: "/assets/images/broken/3.webp",
  },
  {
    title: "Social ran on its own island",
    desc: "Great reach, no handoff into the pipeline.",
    img: "/assets/images/broken/4.webp",
  },
];

const INTRO =
  "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia.";

// `d` is one section's stored content on a CRM-built page; /sample passes
// nothing and gets the cards above.
export default function Parts({ d = {} }) {
  const cards = d.cards?.length ? d.cards : PARTS;

  return (
    <section className="smp-parts">
      <div className="container">
        <div className="smpt-head">
          <div className="smpt-head-left">
            <p className="smpt-eyebrow">{d.eyebrow || "Lorem ipsum"}</p>
            <h2 className="smpt-heading">
              {d.headA || "Lorem Ipsum Is A"}
              <br />
              <span className="smpt-accent">{d.accent || "Standard Placeholder"}</span>
            </h2>
          </div>

          <p className="smpt-intro">{d.intro || INTRO}</p>
        </div>

        {/* A grid at every width the cards can be read side by side, and a
            snapping rail only once they cannot -- the overflow and the snap are
            declared in the phone step alone. */}
        <div className="smpt-track">
          {cards.map((part) => (
            <article className="smpt-card" key={part.title}>
              <div className="smpt-media">
                <img src={part.img} alt="" loading="lazy" aria-hidden="true" />
              </div>
              <h3 className="smpt-card-title">{part.title}</h3>
              <p className="smpt-card-desc">{part.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
