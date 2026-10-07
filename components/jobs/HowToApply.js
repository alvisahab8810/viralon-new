// components/jobs/HowToApply.js — "How To Apply At Viralon".
//
// Four numbered steps in a row with an arrow between them. The steps are the
// same whichever role someone is applying for, so they are static here; the
// one line underneath is the post's own `howToApply` field when the admin has
// written one, which is where a role-specific instruction belongs.
import React from "react";

const STEPS = [
  "Click Apply Now",
  "Attach Your Updated Resume",
  "Attach Portfolio of Your Work",
  "Hit Send!",
];

// The admin field is rich text; this band only has room for one line, so the
// tags come off and the words stay.
const plain = (v) =>
  typeof v === "string"
    ? v.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim()
    : "";

export default function HowToApply({ note }) {
  const line = plain(note);

  return (
    <section className="job-apply">
      <div className="container">
        <h2 className="jap-heading">
          How To <span className="jap-accent">Apply At Viralon</span>
        </h2>

        <ol className="jap-steps">
          {STEPS.map((step, i) => (
            <li className="jap-step" key={i}>
              <span className="jap-num">{i + 1}</span>
              <span className="jap-text">{step}</span>
            </li>
          ))}
        </ol>

        {line ? <p className="jap-note">{line}</p> : null}
      </div>
    </section>
  );
}
