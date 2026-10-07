// components/career/Journey.js — the opening copy on /career.
//
// The page no longer sends people into two category pages: every open role is
// listed on this one page (components/career/Openings.js, directly below), so
// this band is now just the ask and the three things we promise.
//
// Styles live at the end of custome.css, responsive steps at the end of
// responsive.css. Every rule is prefixed .career-journey because the page is
// wrapped in .bg-dark, whose `h1..h6 { color: var(--white) }` in style.css
// would otherwise take the accent off the heading.
import React from "react";

const COPY = {
  headA: "Start your growth journey",
  accent: "with Viralon",
  note:
    "Take a step ahead in your career. Join Viralon, explore new opportunities, learn from the best minds and reach new heights of your growth.",
};

// Where the pill icons live. A stored `icon` holding a path is used as it
// stands, so an editor can point a pill anywhere; a bare filename is read out
// of this folder.
const ICONS = "/assets/img/careers/icons/";
const iconSrc = (v) => (String(v || "").includes("/") ? v : ICONS + v);

// The three promises.
const PILLS = [
  { label: "Learning & Growth", icon: "1.svg" },
  { label: "Creative Freedom", icon: "2.svg" },
  { label: "Team Culture", icon: "3.svg" },
];

export default function Journey({ d = {} }) {
  const c = { ...COPY };
  for (const k of Object.keys(COPY)) if (d[k]) c[k] = d[k];
  const pills = d.pills?.length ? d.pills : PILLS;

  return (
    <section className="career-journey">
      <div className="container">
        <h2 className="cjr-heading">
          {c.headA}
          <br />
          <span className="cjr-accent">{c.accent}</span>
        </h2>

        <p className="cjr-note">{c.note}</p>

        <ul className="cjr-pills">
          {pills.map((p, i) => (
            <li className="cjr-pill" key={i}>
              <span className="cjr-pill-icon">
                <img src={iconSrc(p.icon)} alt="" width="22" height="22" />
              </span>
              <span className="cjr-pill-text">{p.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
