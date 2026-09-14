// components/brand/HowWeSee.js -- "Two Halves. Fourteen Decisions." on /brand.
//
// Two horizontal accordions side by side. Every panel is a narrow spine with
// its label running bottom-to-top; clicking one widens it, turns the label
// upright and fades its copy in, while whichever panel was open in that column
// closes. The two columns are independent -- each holds its own open index --
// so Direction and Expression can be read at the same time.
//
// The label does not swap between `writing-mode: vertical-rl` and horizontal,
// because writing-mode cannot be transitioned: the panel would snap. Instead
// the whole label strip is one element that is always laid out horizontally
// and rotated -90deg while closed, so opening it is a plain rotation back to
// zero and animates with the width. The icon inside counter-rotates by +90deg
// so it stays upright in both states.
//
// Both columns run the same seven icons, in the same order -- the set only
// exists once, and the two halves are meant to read as a matched pair.
//
// All styling is in custome.css / responsive.css under `.bsee-`. The section
// runs light on a dark page, so every rule is prefixed with the section class:
// style.css sets `.bg-dark h1..h6 { color: var(--white) }` at (0,1,1) and a
// bare heading rule would lose to it and come out white on white.
import React, { useState } from "react";

const ICONS = "/assets/others/icons/";

const DIRECTION = [
  {
    title: "Mission",
    icon: ICONS + "mission.svg",
    text: "What you actually do about the purpose, every day. The part a new hire can repeat on day one.",
  },
  {
    title: "Audience",
    icon: ICONS + "audience.svg",
    text: "Who this is for, written tightly enough that it also says who it is not for.",
  },
  {
    title: "Purpose",
    icon: ICONS + "purpose.svg",
    text: "Why the business exists past the revenue. The answer that survives a bad quarter.",
  },
  {
    title: "Values",
    icon: ICONS + "values.svg",
    text: "The calls you make when the money points the other way. Anything else is wall art.",
  },
  {
    title: "Competitors",
    icon: ICONS + "competitors.svg",
    text: "Who the customer actually compares you to, which is rarely the list you watch.",
  },
  {
    title: "Difference",
    icon: ICONS + "difference.svg",
    text: "The one thing a rival cannot copy by Friday. Price and service are not it.",
  },
  {
    title: "Vision",
    icon: ICONS + "vision.svg",
    text: "Where this ends up if the work keeps compounding. Near enough to aim at.",
  },
];

const EXPRESSION = [
  {
    title: "Name",
    icon: ICONS + "mission.svg",
    text: "What it is called, how it is said out loud, and what it stops you doing later.",
  },
  {
    title: "Logo",
    icon: ICONS + "audience.svg",
    text: "The mark at the size it is used most, which is almost never the size it was drawn at.",
  },
  {
    title: "Colour",
    icon: ICONS + "purpose.svg",
    text: "A range that holds up in print, on a phone at night, and against a competitor's.",
  },
  {
    title: "Type",
    icon: ICONS + "values.svg",
    text: "The voice on the page. It carries more of the feel than the logo ever does.",
  },
  {
    title: "Voice",
    icon: ICONS + "competitors.svg",
    text: "How it sounds in an ad, an invoice and an apology. The last one matters most.",
  },
  {
    title: "Imagery",
    icon: ICONS + "difference.svg",
    text: "What gets photographed and what never does. The rule is worth more than the shoot.",
  },
  {
    title: "System",
    icon: ICONS + "vision.svg",
    text: "The pieces written down so the next twenty assets look like the first three.",
  },
];

function Column({ title, items }) {
  // Held per column, so opening one here never closes the other column's panel.
  // There is always exactly one open: clicking the open panel leaves it open
  // rather than collapsing the column to a row of empty spines.
  const [open, setOpen] = useState(0);

  return (
    <div className="bsee-col">
      <h3 className="bsee-col-title">{title}</h3>

      <div className="bsee-panels">
        {items.map((item, i) => {
          const isOpen = i === open;
          return (
            <button
              type="button"
              key={item.title}
              className={"bsee-panel" + (isOpen ? " is-open" : "")}
              aria-expanded={isOpen}
              onClick={() => setOpen(i)}
            >
              {/* One strip holding icon and label. Rotated while closed, level
                  while open -- see the note at the top of the file. */}
              <span className="bsee-face">
                <span className="bsee-icon" aria-hidden="true">
                  <img src={item.icon} alt="" />
                </span>
                <span className="bsee-label">{item.title}</span>
              </span>

              {/* Kept in the DOM at all widths and hidden with opacity, not
                  display: a panel that has to reflow its text on every click
                  cannot animate its width smoothly. */}
              <span className="bsee-text">{item.text}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function HowWeSee() {
  return (
    <section className="bsee-section">
      <div className="container">
        <p className="bsee-eyebrow">How we see brand</p>
        <h2 className="bsee-heading">
          Two Halves. Fourteen Decisions.
          <br />
          <span className="bsee-accent">Nothing Decorative.</span>
        </h2>

        <div className="bsee-grid">
          <Column title="Direction" items={DIRECTION} />
          <Column title="Expression" items={EXPRESSION} />
        </div>
      </div>
    </section>
  );
}
