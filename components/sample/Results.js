// components/sample/Results.js — the card rail under the hero on /sample.
//
// This page's own band. It reads like the /paid-ads results row because the
// frame is the same family — the #EFEFF0 floor, the orange eyebrow, the orange
// half of the heading, the purple pill — but nothing is shared: its own markup,
// its own .smr-* classes and its own CSS block at the end of custome.css. The
// cards differ from that row in two ways the screenshot asks for: the artwork
// sits across the top of the card rather than on its floor, and a date tab
// straddles the bottom edge of the picture.
//
// The cards sit in a snapping scroller rather than a grid, so the row is a
// slider at every width and a fifth study can be added without the layout
// having to be rethought.
//
// Artwork is standing in from public/assets/img/our-work; swapping a file path
// below is the whole job when the real exports arrive.
import React from "react";
import Link from "next/link";

const CARDS = [
  {
    kicker: "Travel · Kashmir",
    figure: "100%",
    body: "lower cost per qualified enquiry in one season",
    client: "Tourwatchout",
    img: "/assets/img/our-work/champion-tutors.webp",
    href: "/our-work",
  },
  {
    kicker: "Automotive · Car Care",
    figure: "Rs 1k",
    body: "cost per booked job, down from Rs 10,000",
    client: "Colomoto",
    img: "/assets/img/our-work/colomoto.webp",
    date: { day: "25", month: "Aug" },
    href: "/our-work",
  },
  {
    kicker: "Real Estate · NCR",
    figure: "200%",
    body: "lower cost per qualified site visit, same budget",
    client: "Rajpreet Infra",
    img: "/assets/img/our-work/hitech.webp",
    date: { day: "05", month: "Jul" },
    href: "/our-work",
  },
  {
    kicker: "Skincare · Marketplace",
    figure: "10x",
    body: "return on marketplace ad spend",
    client: "Episoul",
    img: "/assets/img/our-work/episoul.webp",
    date: { day: "25", month: "Aug" },
    href: "/our-work",
  },
];

export default function Results() {
  return (
    <section className="smp-results">
      <div className="container">
        <p className="smr-eyebrow">Lorem ipsum</p>

        <h2 className="smr-heading">
          Lorem Ipsum Is A{" "}
          <span className="smr-accent">Standard Placeholder</span>
        </h2>

        <ul className="smr-track">
          {CARDS.map((card) => (
            <li className="smr-card" key={card.client}>
              <div className="smr-art">
                <img src={card.img} alt="" loading="lazy" />

                {/* Only some studies carry a date, so the tab is drawn only
                    where there is one -- an empty box would read as a gap. */}
                {card.date ? (
                  <span className="smr-date">
                    <span className="smr-day">{card.date.day}</span>
                    <span className="smr-month">{card.date.month}</span>
                  </span>
                ) : null}
              </div>

              <div className="smr-body">
                <p className="smr-kicker">{card.kicker}</p>
                {/* The figure is the card's whole argument, so it is read as
                    part of the sentence rather than treated as decoration. */}
                <p className="smr-figure">{card.figure}</p>
                <p className="smr-line">{card.body}</p>

                <p className="smr-client">
                  Client: <span className="smr-client-name">{card.client}</span>
                </p>

                <Link href={card.href} className="smr-cta">
                  Read Case Study
                  <span className="smr-arrow" aria-hidden="true">
                    &#8599;
                  </span>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
