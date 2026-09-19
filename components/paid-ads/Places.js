// components/paid-ads/Places.js — "Where we run them" on /paid-ads.
//
// The social page's platform row (components/social-content/Platforms.js) with
// this page's copy. Same UI, same card geometry, same three-tone cycle, same
// icons: the rules are the .social-platforms ones, reused rather than copied,
// so the two rows can never drift apart. The only extra class is
// .paid-platforms, which carries the handful of differences this page needs
// (the sixth card names four platforms at once, so its name sets smaller).
//
// Two icons are not in the repo yet: the Google mark and the Meta mark. Their
// filenames are set below, so both cards light up the moment someone drops
// google.png and meta.png into the icons folder; until then the <img> hides
// itself rather than showing a broken frame.
//
// Styles live at the end of custome.css, responsive steps at the end of
// responsive.css.
import React from "react";

const ICONS = "/assets/others/the-work/social-content/icons/";

// dark → light → purple, then round again.
const TONES = ["dark", "light", "purple"];

const PLACES = [
  {
    name: "Google",
    kicker: "Demand Capture",
    body: "Catches Demand That Already Exists. An Intent And Hygiene Game Where The Work Never Finishes.",
    tags: "Anything People Actively Search For",
    icon: "google.png",
  },
  {
    name: "Meta",
    kicker: "Demand Creation",
    body: "Reaches People Who Were Not Looking For You. A Creative Testing Machine, And Almost Nothing Else.",
    tags: "Consumer · Local Service · Volume",
    icon: "meta.png",
  },
  {
    name: "Marketplace",
    kicker: "Closest To The Money",
    body: "Amazon, Walmart, Flipkart, Noon, Zalando, Mercado Libre. A Shopper With A Card Already Out. Most Teams Still Treat This As A Side Project.",
    tags: "Any Brand Selling Physical Product",
    icon: "facebook.png",
  },
  {
    name: "LinkedIn",
    kicker: "Expensive, And Worth It",
    body: "Costs Far More Per Lead And Is Often Cheaper Per Customer. You Buy Job Title Instead Of Guessing At It.",
    tags: "B2B With Real Deal Size",
    icon: "linkedin.png",
  },
  {
    name: "YouTube",
    kicker: "Demand Before The Search",
    body: "Cheap Video Reach, And The Only Paid Channel That Builds The Branded Search Google Then Harvests Cheaply.",
    tags: "High Consideration Purchases",
    icon: "youtube.png",
  },
  {
    name: "TikTok, Pinterest, Reddit, X",
    kicker: "Situational",
    body: "Excellent When Your Buyer Genuinely Lives There. A Waste When They Do Not, And We Will Say So.",
    tags: "Tested Before Scaled, Always",
    icon: "tiktok.png",
  },
];

export default function Places() {
  return (
    <section className="social-platforms paid-platforms">
      <div className="container">
        <p className="spl-eyebrow">Where we run them</p>
        <h2 className="spl-heading">
          Six Places.{" "}
          <span className="spl-accent">Most Brands Need Two.</span>
        </h2>

        <ul className="spl-cards">
          {PLACES.map((p, i) => (
            <li className={"spl-card spl-" + TONES[i % TONES.length]} key={p.name}>
              <h3 className="spl-name">{p.name}</h3>
              <p className="spl-kicker">{p.kicker}</p>
              <p className="spl-body">{p.body}</p>
              <p className="spl-tags">{p.tags}</p>
              {/* Decorative: the platform is already named above the icon, so
                  it carries no alt text. An icon that is not in the repo yet
                  removes itself instead of drawing a broken frame. */}
              <img
                className="spl-icon"
                src={ICONS + p.icon}
                alt=""
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
