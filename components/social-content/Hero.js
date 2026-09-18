// components/social-content/Hero.js — hero for /social-content.
//
// Built to the brand hero (components/brand/Hero.js): same #0E0920 band, same
// 128.8px/118% orange title, the same two gradient hairlines around the quote,
// the same 40/1.35 quote and 60/68 stat figures, and the same gradient column
// strokes. /search shares that scale too -- the three heroes are one family.
// What differs here is a fourth stat and the platform strip closing the band.
//
// The strip scrolls by CSS alone: the platform list is rendered twice and the
// track is translated by exactly -50%, so the seam lands on an identical copy
// and the loop has no jump. Hovering pauses it.
//
// Styles live at the end of public/assets/css/custome.css, responsive steps at
// the end of responsive.css. Every rule is prefixed .social-hero because
// style.css sets `.bg-dark h1..h6 { color: var(--white) }` — a bare .sch-title
// would lose that cascade and the heading would come out white, not orange.
import React from "react";

const SOURCE = "Seth Godin";
const NOTE =
  "Three quarters of your buyers read those stories long before they ever speak to you.";

const STATS = [
  {
    figure: "75%",
    label: "of buyers research on social before contacting a vendor",
  },
  {
    figure: "41%",
    label: "watch short form video, the highest return format",
  },
  {
    figure: "72 hrs",
    label: "how long a LinkedIn post keeps working",
  },
  {
    figure: "3 yrs",
    label: "how long one YouTube video keeps returning leads",
  },
];

// The same accounts the footer links to, in the footer's order. Kept in step
// with components/footer/Footer.js by hand -- if a channel is added there, add
// it here too.
const PLATFORMS = [
  { name: "Whatsapp", href: "https://wa.me/9193054 51301?text=Hi%2C%20I%20want%20to%20know%20more%20about%20Viralon" },
  { name: "Instagram", href: "https://www.instagram.com/viralon_digital_services/" },
  { name: "Facebook", href: "https://www.facebook.com/people/Viralon-Digital-Services/61551774960535/?mibextid=LQQJ4d" },
  { name: "Youtube", href: "https://www.youtube.com/@ViralonDigtialServices" },
  { name: "Linkedin", href: "https://www.linkedin.com/company/viralon-digital-services/" },
];

// How many times the list is repeated inside ONE copy of the track. Five names
// alone leave gaps at wide viewports; at four the strip is full at every width
// and the loop still has only two copies to keep in step.
const REPEATS = 4;
const ONE_COPY = Array.from({ length: REPEATS }, () => PLATFORMS).flat();

export default function Hero() {
  return (
    <section className="social-hero">
      <div className="container">
        <h1 className="sch-title">Social Content</h1>

        <div className="sch-rule" />

        <figure className="sch-quote">
          {/* The line break is set here, not left to wrapping: the quote is
              meant to turn after "stuff you" at every width it fits on two
              lines. */}
          <blockquote>
            Marketing is no longer about the stuff you<br /> make, but the
            stories you tell.
          </blockquote>
          <figcaption className="sch-attrib">{SOURCE}</figcaption>
        </figure>

        <p className="sch-note">{NOTE}</p>

        <div className="sch-rule" />

        <ul className="sch-stats">
          {STATS.map((s) => (
            <li className="sch-stat" key={s.figure}>
              <span className="sch-figure">{s.figure}</span>
              <span className="sch-label">{s.label}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Full-bleed, so it sits outside the container. The track holds two
          identical copies and slides by exactly -50%, so when the animation
          restarts the strip is pixel-for-pixel where it began -- that is what
          makes the loop endless rather than resetting visibly.

          The second copy exists only to fill the gap the first leaves behind,
          so it is hidden from screen readers and taken out of the tab order:
          every link is already reachable once in the first copy. */}
      <div className="sch-strip">
        <nav className="sch-track" aria-label="Our social channels">
          {[0, 1].map((copy) => (
            <React.Fragment key={copy}>
              {ONE_COPY.map((p, i) => (
                <a
                  className="sch-chip"
                  key={`${copy}-${i}`}
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-hidden={copy === 1 ? "true" : undefined}
                  tabIndex={copy === 1 ? -1 : undefined}
                >
                  {p.name}
                </a>
              ))}
            </React.Fragment>
          ))}
        </nav>
      </div>
    </section>
  );
}
