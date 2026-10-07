// components/jobs/WhatWeOffer.js — the "What We Offer" panel on a job detail
// page.
//
// The words are the post's own `whatWeOffer` field (payroll admin → Website →
// Job Positions), which is why this band is lifted out of the description and
// given its own bordered panel: it is the part of the advert that sells the
// job rather than describing it.
//
// The field may be rich-text HTML from the admin editor or, on older seeded
// posts, a plain array of strings — both arrive here and both render as the
// same bulleted list.
import React from "react";

export default function WhatWeOffer({ value }) {
  const list = Array.isArray(value) ? value.filter(Boolean) : null;
  const html = !list && typeof value === "string" ? value : null;

  // Nothing published for this post: the panel does not draw an empty box.
  if (!list?.length && !html) return null;

  return (
    <section className="job-offer">
      <div className="container">
        <div className="jof-panel">
          <h2 className="jof-heading">What We Offer:</h2>

          {list ? (
            <ul className="jof-list">
              {list.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          ) : (
            <div
              className="jof-list"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          )}
        </div>
      </div>
    </section>
  );
}
