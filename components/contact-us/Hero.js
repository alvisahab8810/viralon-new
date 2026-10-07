// components/contact-us/Hero.js — the opening band on /contact-us.
//
// The frame draws this page without the glob artwork and without the outlined
// "CONTACT" wordmark the page used to open with: one centred line, a short
// note under it, and the pill that drops to the query panel below. The old
// markup's classes (.contact-main-class, .contact-us-heading, .contact-sub,
// .our-contact-overlay) are left in the stylesheets — other pages still use
// the `.seo-hero-img` treatment — they are simply no longer used here.
import React from "react";

export default function Hero() {
  return (
    <section className="contact-hero">
      <div className="container">
        <h1 className="cth-heading">
          We Can Help You{" "}
          <span className="cth-accent">
            Grow
            <svg
              className="cth-chevron"
              width="14"
              height="9"
              viewBox="0 0 14 9"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M1 1.5L7 7.5L13 1.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <br />
          Your Business
        </h1>

        <p className="cth-note">
          We have a whole system that works in favour of your business, lets
          connect and see how we can help you
        </p>

        {/* Drops to the query panel further down the page. */}
        <a className="cth-btn" href="#lets-talk">
          LET&apos;S TALK
        </a>
      </div>
    </section>
  );
}
