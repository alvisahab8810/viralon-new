// components/case-study/Teams.js — the light band naming who was on it:
// "Five Works Teams, One Accountable Team."
//
// The card is the homepage's "6 Parts Of Machine" card
// (components/home/SixParts.js): white, rounded, artwork running to the card's
// own edges and a pill under it. It is a copy rather than a reuse, because
// every card here is written in the admin for this one study -- the
// homepage's six are fixed.
//
// The band itself keeps the page's dark ground -- only the cards are light.
import React from "react";
import Link from "next/link";
import SectionHead from "./SectionHead";

// The admin types a card's lines one per row; more than one becomes the
// bulleted list the design shows, a single line stays a sentence.
function lines(body) {
  return String(body || "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

export default function Teams({ section }) {
  const cards = section?.cards || [];
  const head = section || {};
  if (!cards.length && !head.heading?.lead && !head.heading?.accent) return null;

  return (
    <section className="cs-section cs-teams" id="cs-teams">
      <SectionHead section={section} split />

      {cards.length ? (
        <div className="cstm-track">
          {cards.map((card, i) => {
            const body = lines(card.body);

            return (
              <article className="cstm-card" key={i}>
                {card.title ? <h3 className="cstm-title">{card.title}</h3> : null}

                {body.length > 1 ? (
                  <ul className="cstm-points">
                    {body.map((line, n) => (
                      <li key={n}>{line}</li>
                    ))}
                  </ul>
                ) : body.length ? (
                  <p className="cstm-body">{body[0]}</p>
                ) : null}

                {card.image ? (
                  <div className="cstm-media">
                    {/* Decorative: the card is named above it. */}
                    <img src={card.image} alt="" loading="lazy" />
                  </div>
                ) : null}

                {card.ctaLabel ? (
                  <Link className="cstm-cta" href={card.ctaHref || "/contact-us"}>
                    {card.ctaLabel}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path
                        d="M7 17L17 7M9 7h8v8"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                ) : null}
              </article>
            );
          })}
        </div>
      ) : null}
    </section>
  );
}
