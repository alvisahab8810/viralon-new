// components/social-content/TheWork.js — "The work" on /social-content.
//
// The brand page's marquee (components/brand/BrandsBuilt.js), rebuilt on this
// page's own images: two rows instead of three (no brand-tile row here), each
// on its own export folder, the top one travelling right-to-left and the
// second the other way.
//
// It deliberately renders the brand section's own classes — .brand-marquee and
// the .bm-* set — so the track, the tile sizing and the seamless loop are one
// stylesheet, not two copies that drift. The extra .social-work class is the
// only thing carrying this page's own look (light band, dark heading); those
// overrides sit next to the brand rules at the end of custome.css. A change to
// the shared .bm-* rules lands on both pages, which is the point.
//
// Why each track renders its items twice and slides by exactly -50%, and why
// the spacing is a trailing margin rather than a flex `gap`, is written up in
// BrandsBuilt.js — the same reasoning applies here unchanged.
import React from "react";

const WORK = "/assets/others/the-work/social-content/";

// A slide is either a tall image that fills the row on its own, or a narrow
// column holding two shorter images stacked. Both are the same height, so the
// strip keeps one clean top and bottom edge. The folder is stamped on here, so
// from this point a slide carries finished paths and the renderer never has to
// know which set a tile came from.
function from(folder, slides) {
  const dir = WORK + folder + "/";
  return slides.map((slide) =>
    slide.tall
      ? { tall: dir + slide.tall }
      : { stack: slide.stack.map((name) => dir + name) }
  );
}

const ROW_ONE = from("first-slider", [
  { stack: ["little.png", "little1.png"] },
  { tall: "tall.png" },
  { tall: "tall1.png" },
  { stack: ["little2.png", "little2.1.png"] },
  { tall: "tall2.png" },
  { tall: "tall3.png" },
  { stack: ["little3.png", "little3.1.png"] },
  { tall: "tall4.png" },
  { stack: ["little4.png", "little4.1.png"] },
  { tall: "tall5.png" },
]);

// The second-slider set, named to the same rule as the first.
const ROW_TWO = from("second-slider", [
  { stack: ["little.png", "little1.png"] },
  { tall: "tall.png" },
  { tall: "tall1.png" },
  { stack: ["little2.png", "little2.1.png"] },
  { tall: "tall2.png" },
  { tall: "tall3.png" },
  { stack: ["little3.png", "little3.1.png"] },
  { tall: "tall4.png" },
]);

function renderSlide(slide) {
  if (slide.tall) {
    return <img className="bm-tall" src={slide.tall} alt="" loading="lazy" />;
  }
  return (
    <div className="bm-stack">
      {slide.stack.map((src) => (
        <img key={src} src={src} alt="" loading="lazy" />
      ))}
    </div>
  );
}

// One copy of a row has to be at least as wide as the widest screen it runs
// on, or the tail of the first copy clears the frame before the second
// arrives and a gap slides through.
function repeat(arr, times) {
  return Array.from({ length: times }, () => arr).flat();
}

function Row({ items, reverse, duration }) {
  return (
    <div className="bm-row bm-row-work">
      <div
        className={"bm-track" + (reverse ? " bm-track-rev" : "")}
        style={{ animationDuration: duration }}
      >
        {[false, true].map((isCopy) =>
          items.map((item, i) => (
            <div
              className="bm-item"
              key={(isCopy ? "b" : "a") + i}
              aria-hidden={isCopy ? "true" : undefined}
            >
              {renderSlide(item)}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default function TheWork() {
  return (
    <section className="brand-marquee social-work">
      <div className="container">
        <p className="bm-eyebrow">The work</p>
        <h2 className="bm-heading">
          Start Here. This Is What{" "}
          <span className="bm-accent">We Actually Make.</span>
        </h2>
      </div>

      <div className="bm-rows">
        <Row items={repeat(ROW_ONE, 2)} reverse={false} duration="52s" />
        <Row items={repeat(ROW_TWO, 2)} reverse duration="60s" />
      </div>
    </section>
  );
}
