// components/search/Results.js — "Not Just Numbers" on /search.
//
// Structurally the brand page's "Why it matters" band: same #EFEFF0 ground,
// same 55/60 heading, same three white cards with the artwork bled to the card
// edges and a blue pill pinned bottom-right. The one real difference is the
// head of each card — a large orange figure instead of a short title.
//
// It carries its own .search-results / .sr- prefix rather than borrowing the
// brand page's .brand-why / .bw- classes. The two sections look alike today,
// but they are separate pages with separate sign-off, and sharing the classes
// would mean a card-height tweak here silently moved /brand as well. The cost
// is a duplicated block of CSS; the benefit is that either page can be tuned
// without touching the other.
//
// The figures are the copy's whole argument, so they are read aloud as part of
// the sentence rather than being decorative — no aria-hidden on them.
//
// Styles are at the end of custome.css, responsive steps at the end of
// responsive.css. Artwork is the Figma export in public/assets/others —
// transparent PNGs 558 wide, so it is contained and bottom-aligned, not
// cropped to fill.
import React from "react";
import Link from "next/link";

const CARDS = [
  {
    figure: "240%",
    body:
      "People who already know why you are worth choosing convert at a different rate. Same budget, lower cost per enquiry.",
    img: "/assets/others/figure1.png",
    href: "/our-work",
  },
  {
    figure: "125%",
    body:
      "When price is the first question, nothing else was given to decide on. Brand is what gives them something else.",
    img: "/assets/others/figure2.png",
    href: "/our-work",
  },
  {
    figure: "250%",
    body:
      "Consistency across every touchpoint is what turns a buyer into someone who recommends you.",
    img: "/assets/others/figure3.png",
    href: "/our-work",
  },
];

export default function Results() {
  return (
    <section className="search-results">
      <div className="container">
        <p className="sr-eyebrow">Results</p>

        <h2 className="sr-heading">
          Not Just Numbers <span className="sr-accent">Measured Results</span>
        </h2>

        <ul className="sr-cards">
          {CARDS.map((card) => (
            <li className="sr-card" key={card.figure}>
              <p className="sr-figure">{card.figure}</p>
              <p className="sr-card-body">{card.body}</p>

              <div className="sr-card-art">
                <img src={card.img} alt="" loading="lazy" />
              </div>

              {/* Sits over the artwork, pinned to the bottom of the card, so
                  every button lines up across the row whatever the copy does. */}
              <Link href={card.href} className="sr-card-cta">
                Have a look
                <span className="sr-card-arrow" aria-hidden="true">
                  &#8599;
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
