import React from "react";

/*
 * "We Know, What You Are Going Through" — the problem/solution pair that sits
 * directly under the Partnering strip. The photo is the backdrop for the whole
 * block: heading and both cards ride on top of it.
 */
export default function WeKnow() {
  return (
    <section className="weknow-section">
      <div className="weknow-stage">
        <img
          className="weknow-photo"
          src="/assets/images/abt.webp"
          alt=""
          aria-hidden="true"
        />

        <div className="container weknow-stage-inner">
          <h2 className="weknow-heading">
            <span className="weknow-heading-accent">We Know,</span> What You
            <br />
            Are Going Through
          </h2>

          <div className="weknow-cards">
            <article className="weknow-card weknow-card--muted">
              <p>
                You have probably got a social agency, someone running ads, and
                a website built two years ago by a person you no longer speak
                to. None of them talks to each other, so nobody can tell you
                which of them actually brought you customers
              </p>
            </article>

            <article className="weknow-card weknow-card--accent">
              <p>
                We run all six together. Content builds demand, search and ads
                capture it, the website turns it into an enquiry, and tracking
                proves it.
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
