// components/paid-ads/Results.js — "What the accounts actually did." on
// /paid-ads.
//
// Same band as the search page's results (components/search/Results.js): the
// #EFEFF0 ground, the orange eyebrow, the 55/60 heading with an orange second
// half, and white cards with the artwork bled to the card edges and a pill
// pinned bottom-right. Three things are new here — a category kicker above the
// figure, the client's name under the artwork, and four cards across instead
// of three, which is why the copy sits at a smaller size.
//
// Like /search it keeps its own prefix (.pa-results / .par-) rather than
// borrowing .search-results. The two are separate pages with separate
// sign-off, and sharing classes would mean a card tweak here quietly moved
// /search as well.
//
// Styles are at the end of custome.css, responsive steps at the end of
// responsive.css. Artwork is the Figma export in
// public/assets/others/the-work/paid-ads — transparent PNGs, so each is
// contained and sat on the floor of its card rather than cropped to fill.
import React from "react";
import Link from "next/link";

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

export default function Results() {
  return (
    <section className="pa-results">
      <div className="container">
        <p className="par-eyebrow">Results</p>

        <h2 className="par-heading">
          What the accounts <span className="par-accent">actually did.</span>
        </h2>

        <ul className="par-cards">
          {CARDS.map((card) => (
            <li className="par-card" key={card.client}>
              <p className="par-kicker">{card.kicker}</p>
              {/* The figure is the card's whole argument, so it is read as
                  part of the sentence rather than treated as decoration. */}
              <p className="par-figure">{card.figure}</p>
              <p className="par-card-body">{card.body}</p>

              <div className="par-card-art">
                <img src={card.img} alt="" loading="lazy" />
              </div>

              <p className="par-client">
                Client: <span className="par-client-name">{card.client}</span>
              </p>

              <Link href={card.href} className="par-card-cta">
                Read Case Study
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
