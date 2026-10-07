// components/jobs/AtAGlance.js — "Viralon At A Glance" on a job detail page.
//
// The same three promises the /career page opens with, said at length. They
// are the same for every role, so this band is static: nothing here comes
// from the job post, and adding a position in the admin needs no change here.
//
// Styles live at the end of custome.css, responsive steps at the end of
// responsive.css, every rule prefixed .job-glance.
import React from "react";

const ICONS = "/assets/img/careers/icons/";

// `tone` picks the card's colour. The three run dark, light, purple, left to
// right, exactly as the frame draws them.
const CARDS = [
  {
    tone: "dark",
    icon: "gray1.svg",
    title: "Learning & Growth",
    body:
      "Access to continuous market classes, global agency certifications, and targeted mentorship programs.",
  },
  {
    tone: "light",
    icon: "gray2.svg",
    title: "Creative Freedom",
    body:
      "Own your ideas, test unconventional approaches, and push boundaries without red tape.",
  },
  {
    tone: "purple",
    icon: "gray3.svg",
    title: "Team Culture",
    body:
      "A collaborative crew of designers, developers, and writers moving toward a unified target.",
  },
];

export default function AtAGlance() {
  return (
    <section className="job-glance">
      <div className="container">
        <h2 className="jgl-heading">
          <span className="jgl-accent">Viralon</span> At A Glance
        </h2>

        <ul className="jgl-cards">
          {CARDS.map((card, i) => (
            <li className={`jgl-card jgl-card-${card.tone}`} key={i}>
              <span className="jgl-icon">
                <img src={ICONS + card.icon} alt="" width="128" />
              </span>
              <h3 className="jgl-title">{card.title}</h3>
              <p className="jgl-body">{card.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
