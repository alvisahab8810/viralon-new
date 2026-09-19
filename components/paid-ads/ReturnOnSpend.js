// components/paid-ads/ReturnOnSpend.js — "You want return on ad spend." on
// /paid-ads.
//
// The search page's dark statement band (components/search/TheShift.js) with
// nothing under it: same #0E0920 ground, the same 55/60 heading whose second
// half turns orange, and the same body size. There is no eyebrow here — the
// heading is the whole point of the section — and the argument runs to two
// paragraphs instead of one.
//
// Own prefix (.pa-spend / .pas-) rather than borrowing .search-shift, for the
// same reason as the rest of this page: /search is signed off separately and a
// tweak here must not move it.
//
// Styles live at the end of custome.css, responsive steps at the end of
// responsive.css. Every rule is prefixed with the section class because
// style.css's `.bg-dark h1..h6 { color: var(--white) }` would otherwise beat a
// bare class and take the orange half of the heading with it.
import React from "react";

export default function ReturnOnSpend() {
  return (
    <section className="pa-spend">
      <div className="container">
        <h2 className="pas-heading">
          You want return on ad spend.{" "}
          <span className="pas-accent">Nobody ever wanted anything else.</span>
        </h2>

        <p className="pas-body">
          The part nobody says out loud is that ads are not a slot machine. You
          do not put money in one end and get customers out the other.
        </p>

        <p className="pas-body">
          They are a process. Test, read the data, fix what is leaking, test
          again. The agencies promising results in week one are the ones quietly
          resetting your account in week three.
        </p>
      </div>
    </section>
  );
}
