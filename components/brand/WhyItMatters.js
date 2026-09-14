import React from "react";
import Link from "next/link";

/*
 * "Why it matters" -- three cards on the light band below the brand hero.
 * Type follows the home page scale: 55/60 headings in #0B0B0F with an #FE4601
 * accent, the same as How It Runs and What We Build It For.
 *
 * The card artwork is the Figma export in public/assets/others -- transparent
 * PNGs around 558 wide, so they are contained and bottom-aligned rather than
 * cropped to fill.
 */

const CARDS = [
  {
    title: "Cheaper leads",
    body:
      "People who already know why you are worth choosing convert at a different rate. Same budget, lower cost per enquiry.",
    img: "/assets/others/img1.png",
    href: "/our-services/paid-media-marketing",
  },
  {
    title: "Higher prices",
    body:
      "When price is the first question, nothing else was given to decide on. Brand is what gives them something else.",
    img: "/assets/others/img2.png",
    href: "/our-services/brand-identity-design",
  },
  {
    title: "They come back",
    body:
      "Consistency across every touchpoint is what turns a buyer into someone who recommends you.",
    img: "/assets/others/img3.png",
    href: "/our-work",
  },
];

export default function WhyItMatters() {
  return (
    <section className="brand-why">
      <div className="container">
        <p className="bw-eyebrow">Why it matters</p>

        <h2 className="bw-heading">
          Brand Is Not A Design Exercise. It Is The Cheapest Way To Lower{" "}
          <span className="bw-accent">What A Customer Costs You.</span>
        </h2>

        <ul className="bw-cards">
          {CARDS.map((card) => (
            <li className="bw-card" key={card.title}>
              <h3 className="bw-card-title">{card.title}</h3>
              <p className="bw-card-body">{card.body}</p>

              <div className="bw-card-art">
                <img src={card.img} alt="" loading="lazy" />
              </div>

              {/* Sits over the artwork, pinned to the bottom of the card, so
                  every button lines up across the row whatever the copy does. */}
              <Link href={card.href} className="bw-card-cta">
                Have a look
                <span className="bw-card-arrow" aria-hidden="true">
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
