// components/analytics-and-tracking/ConversionLoss.js — "100 real conversions"
// on /analytics-and-tracking.
//
// The section is the argument it makes: a hundred dots stand for a hundred
// real conversions, and the ones that never reach the platform turn red. The
// arithmetic is read off SCENARIOS -- the arrived count is a hundred minus the
// losses, never typed out -- so changing a row's figure moves the dots, the
// row and the footer number together and they cannot disagree.
//
// Positions are drawn once at module scope from a seeded generator rather than
// Math.random(), because this page is statically generated: the server and the
// browser have to lay the same hundred dots in the same hundred places or
// React reports a hydration mismatch. Toggling only recolours them -- the
// field never moves, which is the whole point of the comparison.
//
// Styles live at the end of custome.css, responsive steps at the end of
// responsive.css.
import React from "react";

// Each scenario names its four leaks. "Arrived" is whatever is left of a
// hundred once they have taken their cut.
const SCENARIOS = {
  client: {
    id: "client",
    label: "Your setup",
    rows: [
      { name: "Ad blockers", loss: 12 },
      { name: "Consent declined", loss: 14 },
      { name: "Cookie limits", loss: 14 },
      { name: "iOS window", loss: 10 },
    ],
  },
  server: {
    id: "server",
    label: "Server side",
    rows: [
      { name: "Ad blockers", loss: 3 },
      { name: "Consent declined", loss: 4 },
      { name: "Cookie limits", loss: 2 },
      { name: "iOS window", loss: 1 },
    ],
  },
};

const TOTAL = 100;

// The four leaks are compounded, not added: consent can only decline what the
// ad blockers left behind. Adding them would overstate the damage, and this is
// the only place the surviving number is worked out -- the heading, the dots
// and the footer all read it from here.
// Floored, not rounded: a conversion that only partly survives did not
// arrive, and the count has to be a whole conversion either way.
const arrivedFrom = (scenario) =>
  Math.floor(
    scenario.rows.reduce((left, row) => left * (1 - row.loss / 100), TOTAL)
  );

// mulberry32: a few lines of arithmetic with no state outside the closure, so
// the same seed always yields the same sequence on both sides of the render.
function seededRandom(seed) {
  let a = seed >>> 0;
  return function next() {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Ten by ten, then jittered inside each cell: it reads as scattered rather
// than gridded, but it cannot clump into a bald patch the way pure random
// placement does.
const DOTS = Object.freeze(
  (() => {
    const rand = seededRandom(20260920);
    const out = [];
    for (let row = 0; row < 10; row += 1) {
      for (let col = 0; col < 10; col += 1) {
        out.push({
          x: (col + 0.16 + rand() * 0.68) * 10,
          y: (row + 0.16 + rand() * 0.68) * 10,
        });
      }
    }
    return out;
  })()
);

// One fixed order of the hundred dots. A scenario losing N takes the first N
// of it, so the milder scenario's losses are a subset of the harsher one's --
// switching to server side recovers dots rather than reshuffling which ones
// died.
const LOSS_ORDER = Object.freeze(
  (() => {
    const rand = seededRandom(884422);
    const order = DOTS.map((_, i) => i);
    for (let i = order.length - 1; i > 0; i -= 1) {
      const j = Math.floor(rand() * (i + 1));
      const swap = order[i];
      order[i] = order[j];
      order[j] = swap;
    }
    return order;
  })()
);

// The rain. Every dot falls the same distance -- from a little above the
// field to a little below it -- and keeps going: nothing stops in mid air.
// The footer counts a dot the moment it touches the floor of the field, so
// the number is not a caption on the animation, it is the animation read out.
//
// Because the travel is the same for all hundred, the floor is crossed at the
// same fraction of the fall whatever height the dot started from, which is
// what FLOOR_AT works out -- one number, from the field's own height.
//
// The order they fall in is shuffled once from a third seed, so the rain is
// scattered rather than sweeping row by row, and the per-dot delay rides out
// to CSS as --anl-delay.
const FALL_MS = 2600;
const FALL_STEP_MS = 40;

// How far above the top and below the bottom a dot is held, in px. It is
// written here and in the keyframe in custome.css; the two have to agree or
// the count drifts off the dot it is counting.
const FALL_EDGE_PX = 30;

const FLOOR_AT = (height) =>
  (height + FALL_EDGE_PX) / (height + FALL_EDGE_PX * 2);

const FALL_DELAYS = Object.freeze(
  (() => {
    const rand = seededRandom(551903);
    const order = DOTS.map((_, i) => i);
    for (let i = order.length - 1; i > 0; i -= 1) {
      const j = Math.floor(rand() * (i + 1));
      const swap = order[i];
      order[i] = order[j];
      order[j] = swap;
    }
    const delays = new Array(order.length);
    order.forEach((dot, place) => {
      delays[dot] = place * FALL_STEP_MS;
    });
    return delays;
  })()
);

const FALL_TOTAL_MS = FALL_MS + FALL_STEP_MS * (DOTS.length - 1);

export default function ConversionLoss() {
  const [active, setActive] = React.useState("client");
  const scenario = SCENARIOS[active];

  const arrived = arrivedFrom(scenario);
  const lost = TOTAL - arrived;

  // Membership rather than a sorted slice: the lookup per dot stays a set hit.
  const lostSet = React.useMemo(
    () => new Set(LOSS_ORDER.slice(0, lost)),
    [lost]
  );

  // idle: the server's markup, dots at rest so the section still reads with
  // JavaScript off. armed: mounted and waiting, dots held back. falling:
  // dropping in. done: the fall is spent and the number stands.
  const [phase, setPhase] = React.useState("idle");
  // Once the rain has left the bottom of the field the dots are gone for
  // good: they do not reappear at rest. Only a run of the animation sets
  // this, so the reduced-motion path still shows the scatter.
  const [spent, setSpent] = React.useState(false);
  const [shownArrived, setShownArrived] = React.useState(0);

  // Every fall is a run, and the run number keys the field, so React builds a
  // fresh set of dots each time and the CSS animation starts over. Scrolling
  // the section back into view is a run; so is switching tab, in either
  // direction -- the comparison lands as an event rather than a recolour.
  const [run, setRun] = React.useState(0);
  const section = React.useRef(null);
  const field = React.useRef(null);

  // Read inside the frame loop rather than closed over, so a toggle mid-fall
  // is counted from the frame it happens on.
  const lostNow = React.useRef(lostSet);
  lostNow.current = lostSet;
  const arrivedNow = React.useRef(arrived);
  arrivedNow.current = arrived;

  // Watching rather than watching once: the observer is never disconnected,
  // so every return to the section starts the dots falling again.
  React.useEffect(() => {
    const node = section.current;
    if (!node) return undefined;

    const quiet =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (quiet) {
      setShownArrived(arrivedNow.current);
      setPhase("done");
      return undefined;
    }

    setPhase("armed");

    if (typeof IntersectionObserver !== "function") {
      setRun((n) => n + 1);
      return undefined;
    }

    const watcher = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setRun((n) => n + 1);
        }
      },
      { threshold: 0.2 }
    );
    watcher.observe(node);

    return () => watcher.disconnect();
  }, []);

  // One run of the fall. The footer counts dots that have landed and are
  // still alive, which is why it ends on exactly the arrived figure without
  // being told it.
  React.useEffect(() => {
    if (run === 0) return undefined;

    const quiet =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (quiet) {
      setShownArrived(arrivedNow.current);
      setPhase("done");
      return undefined;
    }

    // The keyframe is written in the field's own height, which only the
    // browser knows, so it is measured here and handed over as --anl-h.
    const box = field.current;
    const height = box ? box.getBoundingClientRect().height : 0;
    if (box) box.style.setProperty("--anl-h", height + "px");

    const floorMs = FALL_MS * FLOOR_AT(height);

    let frame = 0;
    let start = 0;

    const tick = (now) => {
      if (!start) start = now;
      const elapsed = now - start;
      let landed = 0;
      for (let i = 0; i < DOTS.length; i += 1) {
        if (!lostNow.current.has(i) && FALL_DELAYS[i] + floorMs <= elapsed) {
          landed += 1;
        }
      }
      setShownArrived(landed);
      if (elapsed < FALL_TOTAL_MS) {
        frame = requestAnimationFrame(tick);
      } else {
        setShownArrived(arrivedNow.current);
        setSpent(true);
        setPhase("done");
      }
    };

    setShownArrived(0);
    setSpent(false);
    setPhase("falling");
    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [run]);

  // Once the dots have settled the number belongs to the toggle again: it
  // counts towards the new target instead of snapping, so the conversions the
  // server side setup recovers feel like they arrive.
  React.useEffect(() => {
    if (phase !== "done") return undefined;

    const quiet =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (quiet) {
      setShownArrived(arrived);
      return undefined;
    }

    const from = shownArrived;
    const start = performance.now();
    let frame = 0;
    const step = (now) => {
      const t = Math.min(1, (now - start) / 600);
      const eased = 1 - Math.pow(1 - t, 3);
      setShownArrived(Math.round(from + (arrived - from) * eased));
      if (t < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
    // `shownArrived` is the starting point read once per target change, not a
    // trigger.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arrived, phase]);

  return (
    <section className="ant-loss" ref={section}>
      <div className="container">
        <p className="anq-eyebrow">Question 01, watch it break</p>

        <h2 className="anq-heading">
          {TOTAL} Real Conversions.{" "}
          <span className="anq-accent">Only {arrived} Reach The Platform.</span>
        </h2>

        <div className="anl-panel">
          <div className="anl-panel-head">
            <p className="anl-panel-title">
              {TOTAL} real conversions &rarr; how many reach the platform
            </p>

            <div className="anl-toggles">
              {Object.values(SCENARIOS).map((option) => (
                <button
                  type="button"
                  key={option.id}
                  className={
                    "anl-toggle anl-toggle-" +
                    option.id +
                    (option.id === active ? " is-active" : "")
                  }
                  aria-pressed={option.id === active}
                  onClick={() => {
                    setActive(option.id);
                    setRun((n) => n + 1);
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="anl-body">
            {/* Decorative: every number the field encodes is written out in
                the rows beside it and in the footer below. */}
            <div
              key={run}
              ref={field}
              className={
                "anl-field" +
                (phase === "armed" ? " is-armed" : "") +
                (phase === "falling" ? " is-falling" : "") +
                (spent ? " is-spent" : "")
              }
              aria-hidden="true"
            >
              {DOTS.map((dot, i) => (
                <span
                  key={i}
                  className={
                    "anl-dot" + (lostSet.has(i) ? " is-lost" : "")
                  }
                  style={{
                    "--anl-x": dot.x + "%",
                    "--anl-y": dot.y + "%",
                    /* the same place again, as a fraction, because a
                       percentage in a transform would measure itself
                       against the dot rather than the field. */
                    "--anl-yf": dot.y / 100,
                    "--anl-delay": FALL_DELAYS[i] + "ms",
                  }}
                />
              ))}
            </div>

            <ul className="anl-rows">
              {scenario.rows.map((row) => (
                <li className="anl-row" key={row.name}>
                  <span className="anl-row-name">{row.name}</span>
                  <span className="anl-row-loss">-{row.loss}%</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="anl-foot">
            <p className="anl-foot-label">Arrived</p>
            <p className="anl-foot-value" aria-live="polite">
              <span className="anl-foot-count">{shownArrived}</span>
              <span className="anl-foot-outof"> out of {TOTAL}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
