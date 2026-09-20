// components/analytics-and-tracking/Mistake.js — "The mistake everyone makes"
// on /analytics-and-tracking.
//
// The one full-orange band on the page, so it reads as the argument stopping
// to say the thing out loud. Two columns: the claim on the left behind a rule
// that runs the height of it, the reasoning on the right.
//
// Styles live at the end of custome.css, responsive steps at the end of
// responsive.css.
import React from "react";

export default function Mistake() {
  return (
    <section className="ant-mistake">
      <div className="container">
        <div className="anm-row">
          <div className="anm-claim">
            <p className="anm-label">The mistake everyone makes</p>

            <h2 className="anm-heading">
              Buying A Tool Before Deciding What You Measure.
            </h2>
          </div>

          <div className="anm-reason">
            <p className="anm-body">
              A tool is an instrument. A framework is a set of decisions about
              what gets measured, how often, and who has to act on it. Without
              the second one, the best attribution platform in the world
              produces interesting data that changes nothing about how you run
              the company.
            </p>

            <p className="anm-body">
              So we start at the other end. What decision are you struggling to
              make, who makes it, and how often. Then we build backward until
              there is a number that answers it.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
