// components/case-study/Stack.js — "09 / STACK": what the work was built with.
//
// The card is the folder card from /website-and-cro's "What we build on"
// (components/website-and-cro/Tech.js): a tabbed panel in the tool's own
// colour with its name set in the top-left. There the six cards are finished
// artwork with the names drawn into the PNGs; here the tools are typed per
// study in the admin, so the same shape is drawn in CSS and the name is real
// text over it.
//
// The row slides rather than wrapping, on the same loop as "The work itself":
// the cards are rendered TWICE and the track moves by exactly -50%, so the
// second copy is sitting where the first began the moment it leaves the frame
// and the loop never shows a seam. The spacing is a trailing margin rather
// than a flex `gap`, because with a gap the track is `2N + (2N-1)` wide and
// -50% lands half a gap short.
//
// The colour typed in the admin becomes the card's ground, through a custom
// property -- there is no fixed set of tools to write rules for.
import React from "react";
import SectionHead from "./SectionHead";

// One copy of the row has to outrun the widest screen, or its tail clears the
// frame before the second copy arrives and a gap slides through. A short list
// is simply repeated.
function padded(items) {
  if (!items.length) return items;
  const out = [];
  while (out.length < 10) out.push(...items);
  return out;
}

export default function Stack({ section }) {
  const items = section?.items || [];
  if (!items.length) return null;

  const cards = padded(items);

  // The admin's seconds-per-card, turned into the time one full copy takes.
  // 0 stops the row altogether.
  const perCard = Number(section?.autoScrollSeconds ?? 4);
  const duration = perCard > 0 ? Math.max(1, perCard) * cards.length + "s" : "0s";

  return (
    <section className="cs-section cs-stack" id="cs-stack">
      <SectionHead section={section} />

      <div className="csk-row">
        <div
          className={"csk-track" + (perCard > 0 ? "" : " csk-track-still")}
          style={{ animationDuration: duration }}
        >
          {[false, true].map((isCopy) =>
            cards.map((item, i) => (
              <div
                className="csk-card"
                key={(isCopy ? "b" : "a") + i}
                style={item.color ? { "--csk-ground": item.color } : undefined}
                aria-hidden={isCopy ? "true" : undefined}
              >
                <span className="csk-name">{item.name}</span>
                {item.image ? (
                  <img className="csk-logo" src={item.image} alt="" loading="lazy" />
                ) : null}
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
