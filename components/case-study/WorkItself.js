// components/case-study/WorkItself.js — "02 / THE WORK ITSELF": the strip of
// pieces that shipped, running past on its own.
//
// It wears the brand page's marquee, but it is a copy of it and not a reuse:
// every tile here comes out of the case study record, so the admin can change
// this strip without touching /brand. Only the look is shared.
//
// The track renders its slides TWICE and slides by exactly -50%, so the second
// copy is sitting where the first began the instant it leaves the frame and
// the loop never shows a seam. The spacing is a trailing margin rather than a
// flex `gap` for the same reason as on /brand: with a gap the track is
// `2N items + (2N-1) gaps` wide and -50% lands half a gap short.
import React from "react";
import SectionHead from "./SectionHead";

// The design's rhythm: a column of two short pieces, then two tall ones, over
// and over. The admin only ever enters a flat list of media, so the shape is
// worked out here instead of being another field to fill in.
function toSlides(items) {
  const slides = [];
  let i = 0;

  while (i < items.length) {
    if (items.length - i >= 2) {
      slides.push({ stack: [items[i], items[i + 1]] });
      i += 2;
    } else {
      slides.push({ tall: items[i] });
      i += 1;
      break;
    }

    for (let t = 0; t < 2 && i < items.length; t += 1, i += 1) {
      slides.push({ tall: items[i] });
    }
  }

  return slides;
}

// One copy of the strip has to be at least as wide as the widest screen it
// runs on, or the tail clears the frame before the second copy arrives and a
// gap slides through. A short list is simply repeated -- the same files,
// already cached.
function padded(slides) {
  if (!slides.length) return slides;
  const out = [];
  while (out.length < 8) out.push(...slides);
  return out;
}

function Media({ item, className }) {
  if (!item) return null;

  if (item.kind === "video" && item.video) {
    return (
      <video
        className={className}
        src={item.video}
        poster={item.poster || undefined}
        muted
        loop
        autoPlay
        playsInline
        preload="none"
      />
    );
  }

  if (!item.image) return null;
  return (
    <img
      className={className}
      src={item.image}
      alt={item.alt || item.caption || ""}
      loading="lazy"
    />
  );
}

export default function WorkItself({ section }) {
  const items = section?.items || [];
  if (!items.length) return null;

  const slides = padded(toSlides(items));

  // The admin's seconds-per-piece, turned into the time one full copy takes.
  // 0 stops the strip altogether.
  const perTile = Number(section?.autoScrollSeconds ?? 4);
  const duration = perTile > 0 ? Math.max(1, perTile) * slides.length + "s" : "0s";

  return (
    <section className="cs-section cs-work" id="cs-work">
      <SectionHead section={section} />

      <div className="csw-row">
        <div
          className={"csw-track" + (perTile > 0 ? "" : " csw-track-still")}
          style={{ animationDuration: duration }}
        >
          {[false, true].map((isCopy) =>
            slides.map((slide, i) => (
              <div
                className="csw-item"
                key={(isCopy ? "b" : "a") + i}
                aria-hidden={isCopy ? "true" : undefined}
              >
                {slide.tall ? (
                  <Media item={slide.tall} className="csw-tall" />
                ) : (
                  <div className="csw-stack">
                    {slide.stack.map((item, n) => (
                      <Media item={item} className="csw-half" key={n} />
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
