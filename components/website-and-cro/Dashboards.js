// components/website-and-cro/Dashboards.js — the orange statement band on
// /website-and-cro.
//
// The /paid-ads orange band with this page's claim: one statement set as large
// as the band allows, one line under it turning the statement into the
// argument, nothing else. Same classes (.pa-dash / .pad-), same #FE4601
// ground; .wcro-dash is an empty handle.
import React from "react";

// The copy the page ships with; a stored band overrides a line at a time.
// A pipe in the statement is a line break.
const COPY = {
  headA: "Doubling your conversion|rate halves what a|customer costs you.|Without spending another|dollar on traffic.",
  note: "This is the only lever in marketing that works that way.",
};

// The headings here are broken by hand, line by line, rather than left to
// wrap. A stored field keeps that control without becoming HTML: the lines are
// written in one box separated by a pipe, and rendered with a <br /> between
// them -- the same markup the band shipped with.
const lines = (v) =>
  String(v || "")
    .split("|")
    .map((l, i) =>
      i === 0 ? (
        l
      ) : (
        <React.Fragment key={i}>
          <br />
          {l}
        </React.Fragment>
      )
    );

// `d` is one section's stored content when this band is placed on a page the
// CRM built. A bare call renders exactly what the page shipped with.
export default function Dashboards({ d = {} }) {
  const c = { ...COPY };
  for (const k of Object.keys(COPY)) if (d[k]) c[k] = d[k];

  return (
    <section className="pa-dash wcro-dash">
      <div className="container">
        <h2 className="pad-heading">{lines(c.headA)}</h2>

        <p className="pad-note">{c.note}</p>
      </div>
    </section>
  );
}
