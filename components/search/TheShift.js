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

// The copy the page ships with; a stored band overrides a line at a time.
const COPY = {
  eyebrow: "The shift that matters",
  headA: "People",
  accent: "Stopped Typing Keywords.",
  headB: "They Started Asking Questions.",
  intro:
    "A Keyword Gave You A Topic. A Question Gives You A Situation, A Budget, A Doubt And A Deadline. Far More Useful, And Almost Nobody Is Mapping Content To It.",
};

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

export default function TheShift({ d = {} }) {
  const c = { ...COPY };
  for (const k of Object.keys(COPY)) if (d[k]) c[k] = d[k];
  const pairs = d.pairs?.length ? d.pairs : PAIRS;

  return (
    <section className="search-shift">
      <div className="container">
        <p className="ssh-eyebrow">{c.eyebrow}</p>

        <h2 className="ssh-heading">
          {c.headA} <span className="ssh-accent">{c.accent}</span>{" "}
          {c.headB}
        </h2>

        <p className="ssh-intro">{c.intro}</p>

        <dl className="ssh-pairs">
          {pairs.map((pair, i) => (
            <div className="ssh-pair" key={i}>
              <dt className="ssh-keyword">{pair.keyword}</dt>
              <dd className="ssh-question">{pair.question}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
