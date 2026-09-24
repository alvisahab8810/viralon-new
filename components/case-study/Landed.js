// components/case-study/Landed.js — "10 / WHERE IT LANDED": the orange band
// that closes the study.
//
// The design centres everything on the band: the head, then the chain of what
// shipped with an arrow between each link, then the figures it moved as two
// pale pills. The links are plain type rather than boxes -- the arrows are
// what make it a chain.
import React from "react";
import SectionHead from "./SectionHead";

const Arrow = () => (
  <svg width="38" height="12" viewBox="0 0 38 12" fill="none" aria-hidden="true">
    <path
      d="M0 6h35M30 1l5.5 5L30 11"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function Landed({ section }) {
  const flow = section?.flow || [];
  const stats = section?.stats || [];
  if (!flow.length && !stats.length) return null;

  return (
    <section className="cs-section cs-landed" id="cs-landed">
      <SectionHead section={section} tone="on-orange" />

      {flow.length ? (
        <ul className="csl-flow">
          {flow.map((step, i) => (
            <React.Fragment key={i}>
              {i ? (
                <li className="csl-arrow" aria-hidden="true">
                  <Arrow />
                </li>
              ) : null}
              <li className="csl-node">
                <span className="csl-label">{step.label}</span>
                {step.sub ? <span className="csl-sub">{step.sub}</span> : null}
              </li>
            </React.Fragment>
          ))}
        </ul>
      ) : null}

      {stats.length ? (
        <ul className="csl-stats">
          {stats.map((stat, i) => (
            <li className="csl-stat" key={i}>
              <p className="csl-value">{stat.value}</p>
              <p className="csl-slabel">{stat.label}</p>
              {stat.sub ? <p className="csl-sub2">{stat.sub}</p> : null}
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
