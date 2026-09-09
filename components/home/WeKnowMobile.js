import React from "react";

/*
 * Phone-only version of "We Know". Figma's mobile layout is not the desktop
 * one reflowed -- the photo becomes a card at the top and the two cards become
 * plain stacked paragraphs -- so it ships as its own component and the desktop
 * one is hidden below 1024px (and this one above it) in custome.css.
 */
export default function WeKnowMobile() {
  return (
    <section className="weknowm-section">
      <div className="container">
        <div className="weknowm-photo-frame">
          <img className="weknowm-photo" src="/assets/images/abt-mobile.webp" alt="" />
        </div>

        <p className="weknowm-eyebrow">We Know</p>

        <h2 className="weknowm-heading">
          What you are
          <br />
          going through
        </h2>

        <p className="weknowm-body">
          You have probably got a social agency, someone running ads, and a
          website built two years ago by a person you no longer speak to. None
          of them talks to each other, so nobody can tell you which of them
          actually brought you customers
        </p>

        <p className="weknowm-body weknowm-body--accent">
          We run all six together. Content builds demand, search and ads capture
          it, the website turns it into an enquiry, and tracking proves it.
        </p>
      </div>
    </section>
  );
}
