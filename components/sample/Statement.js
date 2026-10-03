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

export default function Statement() {
  return (
    <section className="smp-statement">
      <div className="container">
        <h2 className="sms-heading">
          Lorem ipsum is a standard placeholder or dummy text used widely in
          graphic design.
        </h2>

        {PARAS.map((text) => (
          <p className="sms-body" key={text.slice(0, 24)}>
            {text}
          </p>
        ))}
      </div>
    </section>
  );
}
