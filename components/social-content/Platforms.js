// components/social-content/Platforms.js — "Platforms we run" on
// /social-content.
//
// Six columns of equal height, each one a platform. The card colours run in a
// repeating three: dark gradient, light grey, purple — so the row reads as a
// pattern rather than six unrelated tiles, and the set stays balanced if a
// seventh is ever added. That cycle is `TONES[i % 3]` below rather than a
// colour stored per platform, which is what makes it repeat by itself.
//
// Card geometry (489.12 tall, 17.6 radius) and the gradient stops come from
// the frame. The icon is pinned to the bottom of every card by `margin-top:
// auto` on it, so the copy sits from the top and the icons line up across the
// row no matter how long a paragraph runs.
//
// Styles live at the end of custome.css, responsive steps at the end of
// responsive.css. Every rule is prefixed .social-platforms because the page is
// wrapped in .bg-dark, whose `h1..h6 { color: var(--white) }` in style.css
// would otherwise turn the card names white on the light cards.
import React from "react";

const ICONS = "/assets/others/the-work/social-content/icons/";

// dark → light → purple, then round again.
const TONES = ["dark", "light", "purple"];

const PLATFORMS = [
  {
    name: "Instagram",
    kicker: "Discovery",
    body: "Where A Buyer Checks Whether You Are Real. Reels For Reach, Carousels For Depth, Stories",
    tags: "Clinics · Retail · Education · Hospitality · D2C",
    icon: "insta.png",
  },
  {
    name: "LinkedIn",
    kicker: "Pipeline",
    body: "The Strongest B2B Channel Anywhere, And The One Most Companies Post On Twice A Month Then Abandon.",
    tags: "B2B · Manufacturing · IT · Finance · Consulting",
    icon: "linkedin.png",
  },
  {
    name: "X",
    kicker: "The Industry Room",
    body: "Brand Accounts Have Lost Reach, So Treat It As A Room Rather Than A Stage. For Software, Fintech, AI,",
    tags: "SaaS · Fintech · AI · Dev Tools · Venture",
    icon: "x.png",
  },
  {
    name: "YouTube",
    kicker: "Compounding",
    body: "The Most Under-Used Channel In B2B Worldwide, And The Second Largest Search Engine. A LinkedIn Post Lives",
    tags: "Education · Healthcare · High Consideration Purchases",
    icon: "youtube.png",
  },
  {
    name: "Facebook",
    kicker: "Reach And Community",
    body: "Written Off Too Early By Most Agencies. Still The Cheapest Reach Per Impression Across South Asia,",
    tags: "Real Estate · Education · Local Services · Travel",
    icon: "facebook.png",
  },
  {
    name: "TikTok",
    kicker: "Attention",
    body: "The Fastest Audience Growth Available In The US, UK And Australia, And Increasingly A Search Engine For",
    tags: "D2C · Hospitality · Consumer Brands, Western Markets",
    icon: "tiktok.png",
  },
];

export default function Platforms() {
  return (
    <section className="social-platforms">
      <div className="container">
        <p className="spl-eyebrow">Platforms we run</p>
        <h2 className="spl-heading">
          Six Platforms. Each One{" "}
          <span className="spl-accent">Does A Different Job.</span>
        </h2>

        <ul className="spl-cards">
          {PLATFORMS.map((p, i) => (
            <li className={"spl-card spl-" + TONES[i % TONES.length]} key={p.name}>
              <h3 className="spl-name">{p.name}</h3>
              <p className="spl-kicker">{p.kicker}</p>
              <p className="spl-body">{p.body}</p>
              <p className="spl-tags">{p.tags}</p>
              {/* Decorative: the platform is already named in the heading
                  above it, so the icon carries no alt text of its own. */}
              <img className="spl-icon" src={ICONS + p.icon} alt="" loading="lazy" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
