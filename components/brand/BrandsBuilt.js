import React from "react";

/*
 * "Brands We Have Built" -- three full-bleed marquee rows under the heading.
 * Row 1 and 3 travel right-to-left, row 2 travels left-to-right, all three
 * running continuously.
 *
 * Each track renders its items TWICE and slides by exactly -50%, so the
 * moment the first copy leaves the frame the second is sitting in the same
 * place and the loop restarts invisibly. The spacing is a margin-right on
 * every item rather than a flex `gap` on purpose: with `gap` the track is
 * `2N items + (2N-1) gaps` wide, so -50% lands half a gap short and the row
 * visibly jumps once per cycle. A trailing margin makes every unit identical.
 *
 * `aria-hidden` on the duplicate keeps the repeat out of the accessibility
 * tree so screen readers do not read the whole row twice.
 */

// Row one, from public/assets/others/the-work/first-slider. Two kinds of
// slide, exactly as the Figma frame has them: a tall image that fills the row
// on its own, and a narrow column holding two shorter images stacked one above
// the other. Both kinds are the same height, so the strip has one clean top
// and bottom edge -- the stacked pair splits that height between its two
// halves.
//
// The order is the file naming, which is already the design order: a stacked
// pair, then the talls that follow it, then the next pair. The exports are
// 413x720 for the talls and 324x353 for the halves.
// Each row can draw on more than one export folder, so the folder is stamped
// on at definition time and a slide carries finished paths from there on --
// the renderer never has to know which set a tile came from.
const WORK = "/assets/others/the-work/";

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
  { stack: ["little3.png", "little31.png"] },
  { tall: "tall4.png" },
  { stack: ["little4.png", "little4.1.png"] },
]);

// The second-slider set, named to the same rule as the first, so it reads the
// same way: a stacked pair, the talls that follow it, then the next pair.
const ROW_TWO_OWN = from("second-slider", [
  { stack: ["little.png", "little1.png"] },
  { tall: "tall.png" },
  { tall: "tall1.png" },
  { stack: ["little2.png", "little2.1.png"] },
  { tall: "tall2.png" },
]);

// Row two leads with its own set and then carries on through row one's work,
// read back to front. The reversal is what keeps the tail from looking like
// the top row duplicated: row one ends where row two's borrowed part begins,
// so no tile ever sits directly under another copy of itself.
//
// `slice()` first because `reverse()` mutates -- reversing ROW_ONE in place
// would turn the top row round as well.
// The copy above the rows. A stored band overrides a line at a time.
const COPY = {
  eyebrow: "The work",
  headA: "Brands We Have",
  accent: "Built.",
};

// A row stored in the CRM is a flat list: either one tall export, or the two
// halves of a stacked column. It is turned back into the shape the renderer
// reads here, so the stored form stays something an admin can fill in.
function toSlides(rows) {
  return rows
    .map((r) =>
      r.tall
        ? { tall: r.tall }
        : { stack: [r.stackA, r.stackB].filter(Boolean) }
    )
    .filter((s) => s.tall || s.stack.length);
}

// Both rows draw their slides the same way, so the markup lives in one place.
// The column is a fixed width worked out from the row height in the
// stylesheet, and both halves fill it, so a pair whose two exports are not the
// same width still reads as one straight column rather than a ragged one.
function renderWorkSlide(slide) {
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

// Row three. Each file is a finished tile -- logo, background and all -- so
// there is no wrapper to colour here any more: the row just places the
// artwork. They export at 315x284, which is the same 1.11 ratio as the 210x189
// box they sit in, so they scale down whole and nothing is cropped.
const BRANDS = Array.from(
  { length: 9 },
  (_, i) => "/assets/others/the-work/brands/" + (i + 1) + ".png"
);

// One copy of a row has to be at least as wide as the widest screen it will
// run on, or the tail of the first copy clears the frame before the second
// arrives and a gap slides through. Repeating the list costs nothing in bytes
// -- it is the same handful of files, already cached -- so each row carries
// enough repeats to cover an ultrawide.
function repeat(arr, times) {
  return Array.from({ length: times }, () => arr).flat();
}

function Row({ items, reverse, duration, className, renderItem }) {
  const copies = [false, true];
  return (
    <div className={"bm-row " + className}>
      <div
        className={"bm-track" + (reverse ? " bm-track-rev" : "")}
        style={{ animationDuration: duration }}
      >
        {copies.map((isCopy) =>
          items.map((item, i) => (
            <div
              className="bm-item"
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

export default function BrandsBuilt({ d = {} }) {
  const c = { ...COPY };
  for (const k of Object.keys(COPY)) if (d[k]) c[k] = d[k];

  const rowOne = d.rowOne?.length ? toSlides(d.rowOne) : ROW_ONE;
  const rowTwoOwn = d.rowTwo?.length ? toSlides(d.rowTwo) : ROW_TWO_OWN;
  // Row two leads with its own set and then carries on through row one's work,
  // read back to front, whichever set it is working from. slice() first
  // because reverse() mutates.
  const rowTwo = rowTwoOwn.concat(rowOne.slice().reverse());
  const brands = d.brands?.length
    ? d.brands.map((b) => b.img).filter(Boolean)
    : BRANDS;

  return (
    <section className="brand-marquee">
      <div className="container">
        <p className="bm-eyebrow">{c.eyebrow}</p>
        <h2 className="bm-heading">
          {c.headA} <span className="bm-accent">{c.accent}</span>
        </h2>
      </div>

      <div className="bm-rows">
        <Row
          items={repeat(rowOne, 2)}
          reverse={false}
          duration="52s"
          className="bm-row-work"
          renderItem={renderWorkSlide}
        />

        <Row
          items={repeat(rowTwo, 2)}
          reverse
          duration="60s"
          className="bm-row-work"
          renderItem={renderWorkSlide}
        />

        <Row
          items={repeat(brands, 3)}
          reverse={false}
          duration="38s"
          className="bm-row-brands"
          renderItem={(src) => (
            <img className="bm-brand" src={src} alt="" loading="lazy" />
          )}
        />
      </div>
    </section>
  );
}
