// components/sample/TheWork.js — "The work / Images" on /sample.
//
// The marquee the brand page and /social-content both run, built here as this
// page's own: three full-bleed rows under the heading, the top one travelling
// right-to-left, the second the other way and the brand tiles under them.
//
// Standalone like the rest of components/sample — its own .smw-* classes and
// its own CSS block at the end of custome.css — but every value in that block
// is the one the existing marquee uses, so the three bands are the same size
// wherever they appear.
//
// Each track renders its items TWICE and slides by exactly -50%, so the moment
// the first copy leaves the frame the second is sitting in the same place and
// the loop restarts invisibly. The spacing is a margin-right on every item
// rather than a flex `gap` on purpose: with `gap` the track is
// `2N items + (2N-1) gaps` wide, so -50% lands half a gap short and the row
// visibly jumps once per cycle. A trailing margin makes every unit identical.
//
// `aria-hidden` on the duplicate keeps the repeat out of the accessibility tree
// so screen readers do not read the whole row twice.
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

// Row three. Each file is a finished tile — logo, background and all — so there
// is no wrapper to colour here: the row just places the artwork. They export at
// 315x284, the same 1.11 ratio as the 210x189 box they sit in, so they scale
// down whole and nothing is cropped.
const BRANDS = Array.from(
  { length: 9 },
  (_, i) => "/assets/others/the-work/brands/" + (i + 1) + ".png"
);

function renderSlide(slide) {
  if (slide.tall) {
    return <img className="smw-tall" src={slide.tall} alt="" loading="lazy" />;
  }
  return (
    <div className="smw-stack">
      {slide.stack.map((src) => (
        <img key={src} src={src} alt="" loading="lazy" />
      ))}
    </div>
  );
}

// One copy of a row has to be at least as wide as the widest screen it runs on,
// or the tail of the first copy clears the frame before the second arrives and
// a gap slides through. Repeating the list costs nothing in bytes — it is the
// same handful of files, already cached.
function repeat(arr, times) {
  return Array.from({ length: times }, () => arr).flat();
}

function Row({ items, reverse, duration, className, renderItem }) {
  return (
    <div className={"smw-row " + className}>
      <div
        className={"smw-track" + (reverse ? " smw-track-rev" : "")}
        style={{ animationDuration: duration }}
      >
        {[false, true].map((isCopy) =>
          items.map((item, i) => (
            <div
              className="smw-item"
              key={(isCopy ? "b" : "a") + i}
              aria-hidden={isCopy ? "true" : undefined}
            >
              {renderItem(item)}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// The CRM cannot edit a slide that is either a `tall` string or a `stack`
// array, so a stored row is flat -- tall, stackA, stackB -- and is folded back
// into the shape the renderer above expects. A row with `tall` filled is a
// tall tile; otherwise whichever stack images are present are stacked.
function fold(rows) {
  return rows
    .map((r) =>
      r.tall
        ? { tall: r.tall }
        : { stack: [r.stackA, r.stackB].filter(Boolean) }
    )
    .filter((s) => s.tall || s.stack.length);
}

// `d` is one section's stored content on a CRM-built page; /sample passes
// nothing and gets the sets above.
export default function TheWork({ d = {} }) {
  const one = d.rowOne?.length ? fold(d.rowOne) : ROW_ONE;
  const two = d.rowTwo?.length ? fold(d.rowTwo) : ROW_TWO;
  const brands = d.brands?.length ? d.brands.map((b) => b.img).filter(Boolean) : BRANDS;

  return (
    <section className="smp-work">
      <div className="container">
        <p className="smw-eyebrow">{d.eyebrow || "The work"}</p>
        <h2 className="smw-heading">{d.heading || "Images"}</h2>
      </div>

      <div className="smw-rows">
        <Row
          items={repeat(one, 2)}
          reverse={false}
          duration="52s"
          className="smw-row-work"
          renderItem={renderSlide}
        />

        <Row
          items={repeat(two, 2)}
          reverse
          duration="60s"
          className="smw-row-work"
          renderItem={renderSlide}
        />

        <Row
          items={repeat(brands, 3)}
          reverse={false}
          duration="38s"
          className="smw-row-brands"
          renderItem={(src) => (
            <img className="smw-brand" src={src} alt="" loading="lazy" />
          )}
        />
      </div>
    </section>
  );
}
