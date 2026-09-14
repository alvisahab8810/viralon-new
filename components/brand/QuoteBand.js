// components/brand/QuoteBand.js -- the dark quote band on /brand.
//
// One line of argument between two light sections, so it is a <blockquote>
// rather than a heading: it is a statement about the work, not a level in the
// page outline, and giving it a heading tag would put a phantom entry in the
// document structure.
//
// The breaks are authored, not left to wrapping. The line lengths are part of
// the setting -- the orange clause has to finish line one for the sentence to
// land -- so they are held to <br> down to the width where the type gets small
// enough that wrapping takes over anyway.
//
// Styles live at the end of custome.css under `.bquote-`, responsive steps at
// the end of responsive.css.
import React from "react";

export default function QuoteBand() {
  return (
    <section className="bquote-band">
      <div className="container">
        <blockquote className="bquote-text">
          &ldquo;Most agencies <span className="bquote-accent">start with the logo.</span>
          <br />
          That is why so much branding looks good
          <br />
          and sells nothing&rdquo;
        </blockquote>
      </div>
    </section>
  );
}
