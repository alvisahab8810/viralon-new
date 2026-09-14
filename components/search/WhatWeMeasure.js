// components/search/WhatWeMeasure.js — "What we measure" on /search.
//
// Four slim cards in a row: a faint number and the metric's name. The card
// under the pointer opens -- wider and taller, the artwork rising in at the top,
// the name set large with a line of explanation under it -- while the other
// three give up the width. Pure CSS (:hover / :focus-within on a flex row with
// flex-grow and height transitioned), so there is no state to keep in sync.
//
// Every card is focusable (tabIndex 0) so a keyboard opens them the same way a
// pointer does. On devices with no hover, and below 1024 where the row would be
// too narrow to open a card inside, all four simply render open in a grid --
// see responsive.css.
//
// The closed state's number and label duplicate the open state's title, so
// that layer is aria-hidden; the open layer is only faded, never removed, and
// is what a screen reader reads.
//
// Styles live at the end of custome.css under `.search-measure`, responsive
// steps at the end of responsive.css.
import React from "react";

const METRICS = [
  {
    num: "01.",
    title: "Enquiries from search",
    desc: "The only number that pays for the work",
    img: "/assets/others/hover1.png",
  },
  {
    num: "02.",
    title: "Qualified organic traffic",
    desc: "Visits from people who could actually buy",
    img: "/assets/others/hover2.png",
  },
  {
    num: "03.",
    title: "AI citations and referrals",
    desc: "How often you appear inside an answer, and what it sends",
    img: "/assets/others/hover3.png",
  },
  {
    num: "04.",
    title: "Cost per qualified lead",
    desc: "The number every part of the machine reports into",
    img: "/assets/others/hover4.png",
  },
];

export default function WhatWeMeasure() {
  return (
    <section className="search-measure">
      <div className="container">
        <p className="smm-eyebrow">What we measure</p>

        <h2 className="smm-heading">
          The Deliverables Are Not The Results
          <br />
          <span className="smm-accent">The Results Are The Result</span>
        </h2>

        <ul className="smm-row">
          {METRICS.map((m) => (
            <li className="smm-card" key={m.num} tabIndex={0}>
              <div className="smm-closed" aria-hidden="true">
                <span className="smm-num">{m.num}</span>
                <span className="smm-label">{m.title}</span>
              </div>

              <div className="smm-open">
                <div className="smm-media">
                  <img src={m.img} alt="" loading="lazy" />
                </div>
                <div className="smm-body">
                  <h3 className="smm-title">{m.title}</h3>
                  <p className="smm-desc">{m.desc}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
