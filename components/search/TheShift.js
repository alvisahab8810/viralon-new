// components/search/TheShift.js — "The shift that matters" on /search.
//
// The argument is a before/after: the small orange line is the keyword people
// used to type, the purple card under it is the question they type now. So the
// pair is marked up as a definition list — <dt> keyword, <dd> question — which
// is exactly the relationship, and reads correctly without the stylesheet.
//
// Dark band on the same #0E0920 as the hero, so it sits between the two light
// sections rather than running into them.
//
// Styles live at the end of custome.css under `.search-shift`, responsive steps
// at the end of responsive.css. Every rule is prefixed with the section class
// because style.css's `.bg-dark h1..h6 { color: var(--white) }` would otherwise
// beat a bare class here.
import React from "react";

const PAIRS = [
  {
    keyword: "Best CRM Software",
    question:
      "Which CRM Works For A 12 Person Sales Team That Already Runs On WhatsApp",
  },
  {
    keyword: "Dentist In Lucknow",
    question:
      "Is A Root Canal Or An Implant Better If The Tooth Is Already Cracked",
  },
  {
    keyword: "2 Bhk Noida Price",
    question:
      "What Will A 2 Bhk In Noida Extension Actually Cost Me Monthly After Registry And EMI",
  },
];

export default function TheShift() {
  return (
    <section className="search-shift">
      <div className="container">
        <p className="ssh-eyebrow">The shift that matters</p>

        <h2 className="ssh-heading">
          People <span className="ssh-accent">Stopped Typing Keywords.</span>{" "}
          They Started Asking Questions.
        </h2>

        <p className="ssh-intro">
          A Keyword Gave You A Topic. A Question Gives You A Situation, A Budget,
          A Doubt And A Deadline. Far More Useful, And Almost Nobody Is Mapping
          Content To It.
        </p>

        <dl className="ssh-pairs">
          {PAIRS.map((pair) => (
            <div className="ssh-pair" key={pair.keyword}>
              <dt className="ssh-keyword">{pair.keyword}</dt>
              <dd className="ssh-question">{pair.question}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
