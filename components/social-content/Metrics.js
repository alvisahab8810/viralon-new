// components/social-content/Metrics.js — "Followers are not a business
// outcome" on /social-content.
//
// Six numbers, as a row of overlapping cards: each one sits on top of the one
// before it, and the card under the cursor lifts clear of the stack. The
// overlap is a negative margin plus a rising z-index, so the order is fixed in
// the markup and cannot depend on hover alone -- hover only raises the card
// that is already there, which is why the lift never reshuffles the row.
//
// Each card carries its own .smt-card-N class, and that class is the only
// thing holding its gradient, so a colour can be changed without touching the
// card layout.
//
// Styles live at the end of custome.css, responsive steps at the end of
// responsive.css. Every rule is prefixed .social-metrics because the page is
// wrapped in .bg-dark, whose `h1..h6 { color: var(--white) }` in style.css
// would otherwise take the dark ink off the section heading.
import React from "react";

const CARDS = [
  { title: "Saves and shares", body: "The only engagement that signals real interest" },
  { title: "Profile to website", body: "How many went looking for more" },
  { title: "Direct enquiries", body: "DMs and WhatsApps that started from content" },
  { title: "Branded search lift", body: "People searching your name after seeing you" },
  { title: "Creative cost per view", body: "Which organic pieces earned a place in paid" },
  { title: "Cost per qualified lead", body: "The number every platform reports last" },
];

export default function Metrics() {
  return (
    <section className="social-metrics">
      <div className="container">
        <h2 className="smt-heading">
          <span className="smt-accent">Followers Are</span> Not A Business
          Outcome.
        </h2>

        <p className="smt-note">
          Account level engagement, not vanity counts. These are the numbers
          that move before revenue does, so they are
          {/* The line is broken by hand so it reads as two balanced lines;
              responsive.css drops the break once the paragraph is narrow
              enough to wrap on its own. */}
          <br className="smt-break" /> the ones worth watching.
        </p>

        <ul className="smt-row">
          {CARDS.map((card, i) => (
            <li className={"smt-card smt-card-" + (i + 1)} key={card.title}>
              <h3 className="smt-title">{card.title}</h3>
              <p className="smt-body">{card.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
