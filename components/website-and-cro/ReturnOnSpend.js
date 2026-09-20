// components/website-and-cro/ReturnOnSpend.js — the dark statement band on
// /website-and-cro.
//
// The /paid-ads band with this page's argument: same #0E0920 ground, same
// 55/60 heading whose second half turns orange, same body size. It keeps that
// band's classes (.pa-spend / .pas-) so the two never drift; .wcro-spend is an
// empty handle for a later nudge that must not reach /paid-ads.
import React from "react";

export default function ReturnOnSpend() {
  return (
    <section className="pa-spend wcro-spend">
      <div className="container">
        <h2 className="pas-heading">
          For every $92 you spend <br/>getting someone to your<br/> site, you spend $1{" "}
          <span className="pas-accent">
            making <br/>sure they do something<br/> when they arrive.
          </span>
        </h2>

        <p className="pas-body">
          That ratio is not an exaggeration. It is the industry average, and it
          is why the cheapest growth available to most businesses is sitting
          inside traffic they have already paid for.
        </p>

        <p className="pas-body">
          The median site converts 2.35% of visitors. The top ten percent
          convert 11.45%. That is not a traffic difference. That is a website
          difference.
        </p>
      </div>
    </section>
  );
}
