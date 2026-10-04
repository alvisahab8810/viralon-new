// components/website-and-cro/ReturnOnSpend.js — the dark statement band on
// /website-and-cro.
//
// The /paid-ads band with this page's argument: same #0E0920 ground, same
// 55/60 heading whose second half turns orange, same body size. It keeps that
// band's classes (.pa-spend / .pas-) so the two never drift; .wcro-spend is an
// empty handle for a later nudge that must not reach /paid-ads.
import React from "react";

// The copy the page ships with; a stored band overrides a line at a time.
// A pipe in a heading is a line break.
const COPY = {
  headA: "For every $92 you spend|getting someone to your|site, you spend $1",
  accent: "making|sure they do something|when they arrive.",
  bodyA: "That ratio is not an exaggeration. It is the industry average, and it is why the cheapest growth available to most businesses is sitting inside traffic they have already paid for.",
  bodyB: "The median site converts 2.35% of visitors. The top ten percent convert 11.45%. That is not a traffic difference. That is a website difference.",
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
export default function ReturnOnSpend({ d = {} }) {
  const c = { ...COPY };
  for (const k of Object.keys(COPY)) if (d[k]) c[k] = d[k];

  return (
    <section className="pa-spend wcro-spend">
      <div className="container">
        <h2 className="pas-heading">
          {lines(c.headA)}{" "}
          <span className="pas-accent">{lines(c.accent)}</span>
        </h2>

        <p className="pas-body">{c.bodyA}</p>

        <p className="pas-body">{c.bodyB}</p>
      </div>
    </section>
  );
}
