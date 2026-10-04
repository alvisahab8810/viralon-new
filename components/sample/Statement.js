// components/sample/Statement.js — the orange statement band on /sample.
//
// The band the frame puts under the card rail: the brand orange edge to edge, a
// large white heading and two paragraphs under it, everything ranged left. No
// artwork and no button — the point of the band is that it is only words, so it
// is left as a block of text rather than dressed up.
//
// Standalone, like the rest of components/sample: its own .sms-* classes and
// its own CSS block at the end of custome.css.
import React from "react";

const PARAS = [
  "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia",
  "ooked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.",
];

// `d` is one section's stored content on a CRM-built page. The paragraphs come
// back from the CRM as rows of { text } rather than bare strings, because that
// is what a repeating form field produces, so both shapes are accepted.
export default function Statement({ d = {} }) {
  const paras = (d.paras?.length ? d.paras : PARAS).map((p) =>
    typeof p === "string" ? p : p?.text || ""
  );

  return (
    <section className="smp-statement">
      <div className="container">
        <h2 className="sms-heading">
          {d.heading ||
            "Lorem ipsum is a standard placeholder or dummy text used widely in graphic design."}
        </h2>

        {paras.map((text) => (
          <p className="sms-body" key={text.slice(0, 24)}>
            {text}
          </p>
        ))}
      </div>
    </section>
  );
}
