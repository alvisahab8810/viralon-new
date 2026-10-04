// components/website-and-cro/Results.js — "Same traffic. Different business."
// on /website-and-cro.
//
// The /paid-ads results band with this page's heading. It keeps that band's
// classes (.pa-results / .par-) and the same artwork, so the two rows stay
// identical the way the screenshots ask; only the copy above the cards is this
// page's own. .wcro-results carries nothing today -- it is a handle, so a card
// here can be moved later without touching /paid-ads.
//
// Artwork is the Figma export in public/assets/others/the-work/paid-ads --
// transparent PNGs, contained and sat on the floor of each card.
import React from "react";
import Link from "next/link";

// The copy the page ships with; a stored band overrides a line at a time.
const COPY = {
  eyebrow: "Results",
  headA: "Same traffic.",
  accent: "Different business.",
  clientLabel: "Client:",
  ctaText: "Read Case Study",
};

const CARDS = [
  {
    kicker: "Travel · Kashmir",
    figure: "100%",
    body: "lower cost per qualified enquiry in one season",
    client: "Tourwatchout",
    img: "/assets/others/the-work/paid-ads/img1-trim.png",
    href: "/our-work",
  },
  {
    kicker: "Automotive · Car Care",
    figure: "Rs 1k",
    body: "cost per booked job, down from Rs 10,000",
    client: "Colomoto",
    img: "/assets/others/the-work/paid-ads/img2.png",
    href: "/our-work",
  },
  {
    kicker: "Real Estate · NCR",
    figure: "200%",
    body: "lower cost per qualified site visit, same budget",
    client: "Rajpreet Infra",
    img: "/assets/others/the-work/paid-ads/img3.png",
    href: "/our-work",
  },
  {
    kicker: "Skincare · Marketplace",
    figure: "10x",
    body: "return on marketplace ad spend",
    client: "Episoul",
    img: "/assets/others/the-work/paid-ads/img4.png",
    href: "/our-work",
  },
];

// `d` is one section's stored content when this band is placed on a page the
// CRM built. A bare call renders exactly what the page shipped with.
export default function Results({ d = {} }) {
  const c = { ...COPY };
  for (const k of Object.keys(COPY)) if (d[k]) c[k] = d[k];
  const cards = d.cards?.length ? d.cards : CARDS;

  return (
    <section className="pa-results wcro-results">
      <div className="container">
        <p className="par-eyebrow">{c.eyebrow}</p>

        <h2 className="par-heading">
          {c.headA} <span className="par-accent">{c.accent}</span>
        </h2>

        <ul className="par-cards">
          {cards.map((card, i) => (
            <li className="par-card" key={i}>
              <p className="par-kicker">{card.kicker}</p>
              {/* The figure is the card's whole argument, so it is read as
                  part of the sentence rather than treated as decoration. */}
              <p className="par-figure">{card.figure}</p>
              <p className="par-card-body">{card.body}</p>

              <div className="par-card-art">
                <img src={card.img} alt="" loading="lazy" />
              </div>

              <p className="par-client">
                {c.clientLabel}{" "}
                <span className="par-client-name">{card.client}</span>
              </p>

              <Link href={card.href || "#"} className="par-card-cta">
                {c.ctaText}
                <span className="par-card-arrow" aria-hidden="true">
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
