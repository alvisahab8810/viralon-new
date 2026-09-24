// components/case-study/SectionHead.js — the "05 / THE PROBLEM" strip and the
// heading under it, which every section on a case study opens with.
//
// It is local to the case study rather than shared, for the same reason the
// sections are: the numbers, labels and headings are edited per study from the
// admin, and a shared header would carry those edits onto fixed pages.
import React from "react";

export default function SectionHead({ section = {}, tone, split }) {
  const { number, label, heading = {}, intro } = section;
  const hasHeading = heading.lead || heading.accent || heading.tail;

  const eyebrow =
    number || label ? (
      <p className="csd-eyebrow">
        {number ? <span className="csd-num">{number}</span> : null}
        {number && label ? <span className="csd-slash">/</span> : null}
        {label}
      </p>
    ) : null;

  const title = hasHeading ? (
    <h2 className="csd-title">
      {heading.lead}
      {heading.accent ? <span className="csd-accent">{heading.accent}</span> : null}
      {heading.tail}
    </h2>
  ) : null;

  const body = intro ? <p className="csd-intro">{intro}</p> : null;

  // The split head is the design's two-block version: the number and the
  // heading in one block on the left, the paragraph in its own block set
  // against it on the right. They are separate elements rather than two
  // columns of the same one, so each block can be moved or restyled on its
  // own.
  if (split) {
    return (
      <div className={"cs-head cs-head-split" + (tone ? ` cs-head-${tone}` : "")}>
        <div className="csd-head-main">
          {eyebrow}
          {title}
        </div>
        <div className="csd-head-side">{body}</div>
      </div>
    );
  }

  return (
    <div className={"cs-head" + (tone ? ` cs-head-${tone}` : "")}>
      {eyebrow}
      {title}
      {body}
    </div>
  );
}
