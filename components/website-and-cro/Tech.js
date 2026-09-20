// components/website-and-cro/Tech.js — "What we build on" on /website-and-cro.
//
// A light band on a dark page, so every rule here is prefixed with the
// section class: .bg-dark sets headings white further up the cascade and the
// heading would otherwise render white on white.
//
// The cards are finished artwork -- the name is drawn into each PNG -- so
// this is a row of images and nothing else. The whole row comes off one
// number, --wct-w, and the height follows the file's own ratio, so a
// breakpoint rescales it whole.
//
// Styles live at the end of custome.css, responsive steps at the end of
// responsive.css.
import React from "react";

const DIR = "/assets/others/tech/";

// Order is the order in the artwork; the alt text is what each card says.
const TECH = [
  { image: "1.png", name: "Next.js" },
  { image: "2.png", name: "React" },
  { image: "3.png", name: "Node" },
  { image: "4.png", name: "WordPress" },
  { image: "5.png", name: "Shopify" },
  { image: "6.png", name: "Server side tracking" },
];

export default function Tech() {
  return (
    <section className="wcro-tech">
      <div className="container">
        <h2 className="wct-heading">
          What <span className="wct-accent">We Build On.</span>
        </h2>

        <p className="wct-note">
          Chosen for what the business needs, not what we prefer to build. If
          WordPress is right for you, we will say so.
        </p>

        <ul className="wct-row">
          {TECH.map((item) => (
            <li className="wct-card" key={item.image}>
              <img
                className="wct-image"
                src={DIR + item.image}
                alt={item.name}
                loading="lazy"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
