import React, { useCallback, useEffect, useRef, useState } from "react";

/*
 * "What We Build It For" -- 3D ring variant.
 *
 * A separate component from BuildItFor.js on purpose: this is a look to
 * compare, so the coverflow version and its `.builditfor-*` styles are left
 * exactly as they are. Everything here is namespaced `.bifc-*` and lives in
 * its own block at the end of custome.css.
 *
 * The cards are not laid out in a row. Every card is pushed out to the same
 * radius from one centre and turned to face outward -- `rotateY(i * step)
 * translateZ(radius)` -- so the nine of them stand around a circle, and the
 * whole circle turns. A card arrives at the front by coming round the ring,
 * not by sliding in from the side.
 *
 * The radius is set from the card width (about 1.55x) so that neighbours never
 * cover the card at the front: the active one is always whole, and bigger.
 *
 * The turn is driven from JS rather than a CSS keyframe, because three things
 * need the ring's exact angle every frame:
 *
 *   1. Drag. Pointer events cover mouse, pen and touch in one path, so the
 *      ring is spun with a thumb exactly as with a cursor, and it settles onto
 *      the nearest card when you let go.
 *   2. Scale and opacity. The card nearest the front is scaled up and fully
 *      lit; the ones going round the back shrink and dim, which is what gives
 *      the circle its depth.
 *   3. Which card is "current", for the caption fade.
 *
 * All of it is written straight to the DOM inside the animation frame, so this
 * renders once and then costs only transforms.
 */

const INDUSTRIES = [
  {
    name: "Real estate",
    blurb:
      "A hundred enquiries make one booking. We build toward the eight that matter.",
    img: "/assets/images/what-build/1.webp",
  },
  {
    name: "Travel",
    blurb:
      "Weeks of research, booked in a day. Miss the weeks and you compete on price.",
    img: "/assets/images/what-build/2.webp",
  },
  {
    name: "Automotive",
    blurb:
      "A wash and a full paint cost the same to buy. One is worth twenty times more.",
    img: "/assets/images/what-build/3.webp",
  },
  {
    name: "IT and software",
    blurb: "Ten firms wrote the same sentences. We make yours legible first.",
    img: "/assets/images/what-build/4.webp",
  },
  {
    name: "Healthcare",
    blurb:
      "Most patients never fill a form. They read, they watch, then they call.",
    img: "/assets/images/what-build/5.webp",
  },
  {
    name: "Education",
    blurb:
      "Parents search six months before the session. April is already too late.",
    img: "/assets/images/what-build/6.webp",
  },
  {
    name: "B2B and manufacturing",
    blurb:
      "Twelve enquiries can make the year. Every volume metric will call it a bad one.",
    img: "/assets/images/what-build/9.webp",
  },
  {
    name: "Finance",
    blurb:
      "The platforms restrict half of what you want to say. We build trust elsewhere.",
    img: "/assets/images/what-build/7.webp",
  },
  {
    name: "Interior design & architecture",
    blurb:
      "Nobody picks an architect from an ad. They pick what they saw months ago.",
    img: "/assets/images/what-build/8.webp",
  },
];

// Degrees between cards. Mirrored by --bifc-step in custome.css, which is what
// actually places them -- change one and you must change the other.
const STEP = 360 / INDUSTRIES.length;
// How long a card holds the front before the ring moves on.
const HOLD_MS = 3000;
// Degrees of turn per pixel of horizontal drag: about one card per 110px.
const DRAG_PER_PX = 0.33;

const clamp = (v, lo, hi) => (v < lo ? lo : v > hi ? hi : v);

export default function BuildItForCube() {
  // Only used for the dots under the ring; the turn itself never touches state.
  const [current, setCurrent] = useState(0);

  const ringRef = useRef(null);
  const sceneRef = useRef(null);
  const cardRefs = useRef([]);

  // Everything the animation frame mutates lives in one ref, so no part of the
  // loop can trigger a React render.
  const st = useRef({
    angle: 0,
    target: 0,
    index: 0,
    held: 0,
    dragging: false,
    paused: false,
    lastX: 0,
    lastT: 0,
    vel: 0,
  });

  const goTo = useCallback((index) => {
    const s = st.current;
    s.index = index;
    // The target is always expressed near the current angle rather than
    // normalised, so the ring takes the short way round and a drag past the
    // end does not unwind the whole circle.
    s.target = -index * STEP;
    while (s.target - s.angle > 180) s.target -= 360;
    while (s.target - s.angle < -180) s.target += 360;
    s.held = 0;
    setCurrent(((index % INDUSTRIES.length) + INDUSTRIES.length) % INDUSTRIES.length);
  }, []);

  useEffect(() => {
    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const paint = () => {
      const s = st.current;
      if (ringRef.current) {
        // --bifc-pull is minus the ring's radius: it moves the whole circle
        // back down the camera axis so the front card sits at z = 0 rather
        // than a radius closer to the lens. It has to be written here with the
        // rotation, because an inline transform replaces the one in the
        // stylesheet outright.
        ringRef.current.style.transform =
          "translateZ(var(--bifc-pull)) rotateY(" + s.angle + "deg)";
      }
      for (let i = 0; i < INDUSTRIES.length; i += 1) {
        const card = cardRefs.current[i];
        if (!card) continue;
        // 1 when this card is dead ahead, 0 at the sides, -1 round the back.
        const facing = Math.cos(((s.angle + i * STEP) * Math.PI) / 180);
        const front = clamp(facing, 0, 1);
        // The front card is the biggest and the only one at full strength.
        // Everything else falls back into the circle.
        card.style.setProperty("--bifc-scale", (0.84 + front * front * 0.22).toFixed(3));
        card.style.setProperty("--bifc-fade", (0.34 + front * 0.66).toFixed(3));
        // Cards turning away lose their light as well as their size.
        card.style.setProperty("--bifc-shade", (((1 - facing) / 2) * 0.62).toFixed(3));
        // Only the card at the front carries readable copy. The band is narrow
        // -- a card one step round the ring is already at cos(40deg) = 0.77 and
        // gets nothing -- because a neighbour's caption at an angle overlaps
        // the front card's and the two become one smear. It fades up as the
        // next card comes round, so it is never a hard cut.
        card.style.setProperty("--bifc-copy", clamp((front - 0.86) / 0.11, 0, 1).toFixed(3));
      }
    };

    if (reduced) {
      paint();
      return undefined;
    }

    let raf = 0;
    let prev = performance.now();

    const frame = (now) => {
      const s = st.current;
      // Capped, or a tab returning from the background lurches round the ring.
      const dt = Math.min(now - prev, 64);
      prev = now;

      if (!s.dragging) {
        // Exponential ease onto the target. It never quite arrives, which is
        // why the hold timer runs off elapsed time rather than off arrival.
        const k = 1 - Math.exp(-dt / 260);
        s.angle += (s.target - s.angle) * k;

        if (!s.paused) {
          s.held += dt;
          if (s.held >= HOLD_MS) goTo(s.index + 1);
        }
      }

      paint();
      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [goTo]);

  // --- grab ---------------------------------------------------------------
  // Pointer events only: one path for mouse, pen and finger. `touch-action:
  // pan-y` in the CSS is what lets a vertical swipe still scroll the page
  // while a horizontal one turns the ring.
  const onPointerDown = (e) => {
    const s = st.current;
    s.dragging = true;
    s.lastX = e.clientX;
    s.lastT = e.timeStamp;
    s.vel = 0;
    if (e.currentTarget.setPointerCapture) {
      e.currentTarget.setPointerCapture(e.pointerId);
    }
    if (sceneRef.current) sceneRef.current.classList.add("is-grabbing");
  };

  const onPointerMove = (e) => {
    const s = st.current;
    if (!s.dragging) return;
    const dx = e.clientX - s.lastX;
    const dt = Math.max(e.timeStamp - s.lastT, 1);
    s.lastX = e.clientX;
    s.lastT = e.timeStamp;
    s.angle += dx * DRAG_PER_PX;
    s.vel = (dx * DRAG_PER_PX) / dt;
  };

  const endDrag = (e) => {
    const s = st.current;
    if (!s.dragging) return;
    s.dragging = false;
    if (e.currentTarget.releasePointerCapture) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    if (sceneRef.current) sceneRef.current.classList.remove("is-grabbing");
    // A flick carries on past where the finger stopped, then the ring settles
    // onto whichever card is nearest. Capped at two cards so a hard throw
    // cannot send it spinning.
    const thrown = s.angle + clamp(s.vel * 170, -STEP * 2, STEP * 2);
    goTo(Math.round(-thrown / STEP));
  };

  return (
    <section className="bifc-section">
      <div className="container">
        <div className="bifc-grid">
          <div className="bifc-copy">
            <h2 className="bifc-heading">
              What We
              <br />
              <span className="bifc-accent">Build It For...</span>
            </h2>
            <p className="bifc-desc">
              Tailored deployment structures mapped to specific business models.
              We build the exact customer acquisition machine your industry
              requires.
            </p>
            {/* Nobody grabs something they have not been told is grabbable. */}
            <p className="bifc-hint">
              <span className="bifc-hint-dot" aria-hidden="true" />
              Drag to turn
            </p>
          </div>

          <div className="bifc-stage">
            {/* Scene holds the camera, ring holds the rotation. They have to be
                two elements -- one element cannot both create a perspective and
                be rotated inside it. */}
            <div
              className="bifc-scene"
              ref={sceneRef}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
              onMouseEnter={() => {
                st.current.paused = true;
              }}
              onMouseLeave={() => {
                st.current.paused = false;
              }}
            >
              <div className="bifc-ring" ref={ringRef}>
                {INDUSTRIES.map((item, i) => (
                  <div
                    className="bifc-card"
                    key={item.name}
                    // --i is what places this card on the circle; the radius
                    // and the step live in the stylesheet so they can change
                    // per breakpoint without touching this file.
                    style={{ "--i": i }}
                    ref={(el) => {
                      cardRefs.current[i] = el;
                    }}
                  >
                    {/* Two plates, back to back. The front one is what you
                        read when the card comes round; the back one is what
                        keeps the card visible while it is on the far side of
                        the circle, so the ring reads as a full circle of cards
                        rather than an arc with nothing behind it. Without it
                        the far half simply vanishes. */}
                    <div className="bifc-plate">
                      <img src={item.img} alt={item.name} draggable="false" />

                      <div className="bifc-layer">
                        <span className="bifc-layer-title">{item.name}</span>
                        <p className="bifc-layer-desc">{item.blurb}</p>
                      </div>

                      <span className="bifc-shade" aria-hidden="true" />
                    </div>

                    {/* Same picture, no copy: at that distance and that much
                        shadow the text would be noise, and it would read as
                        mirror writing. `aria-hidden` because it is the same
                        card, not a tenth one. */}
                    <div className="bifc-plate bifc-plate-back" aria-hidden="true">
                      <img src={item.img} alt="" draggable="false" />
                      <span className="bifc-shade" aria-hidden="true" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Position on the ring, and a way to jump straight to a card. */}
            <div className="bifc-dots">
              {INDUSTRIES.map((item, i) => (
                <button
                  type="button"
                  key={item.name}
                  className={"bifc-dot" + (i === current ? " is-on" : "")}
                  aria-label={item.name}
                  onClick={() => {
                    // Reached by the shortest way round from wherever the ring
                    // is now, not by unwinding to an absolute position.
                    const s = st.current;
                    const laps = Math.round(s.index / INDUSTRIES.length);
                    goTo(laps * INDUSTRIES.length + i);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
