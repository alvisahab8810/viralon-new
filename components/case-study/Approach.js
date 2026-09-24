// components/case-study/Approach.js — "04 / OUR APPROACH": the numbered cards
// describing what we did about it.
//
// A card is only its number, its title and its lines -- the design carries
// nothing else, so the kicker and the link the admin's card form offers are
// deliberately not drawn here.
import React from "react";
import SectionHead from "./SectionHead";

export default function Approach({ section }) {
  const cards = section?.cards || [];
  if (!cards.length) return null;

  return (
    <section className="cs-section cs-approach" id="cs-approach">
      <SectionHead section={section} />

      <ul className="csa-grid">
        {cards.map((card, i) => (
          <li className={"csa-card" + (card.tone ? ` csa-${card.tone}` : "")} key={i}>
            <span className="csa-num">{card.number || String(i + 1).padStart(2, "0")}</span>
            {card.title ? <h3 className="csa-title">{card.title}</h3> : null}
            {card.body ? <p className="csa-body">{card.body}</p> : null}
          </li>
        ))}
      </ul>
    </section>
  );
}
