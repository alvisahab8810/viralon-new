// components/analytics-and-tracking/Hero.js — the hero on /analytics-and-tracking.
//
// Two parts: the claim, and the arithmetic that proves it. The bars are the
// argument -- three platforms each reporting their own share of the same
// revenue, adding up to more than the business ever made -- so the number at
// the end is simply the three of them summed, read off SHARES rather than
// typed in twice.
//
// Every width comes off the share itself, so changing a number here changes
// the bar and the total together and they cannot disagree.
//
// Styles live at the end of custome.css, responsive steps at the end of
// responsive.css.
import React from "react";

// Each platform reads in its own colour, so the three numbers stay apart at a
// glance. The colour rides in as --anh-value-color; the rule that uses it is
// in custome.css with the rest of the section.
const SHARES = [
  { name: "Meta says", value: 60, color: "#FE4601" },
  { name: "Google says", value: 45, color: "#DDF45B" },
  { name: "Organic says", value: 20, color: "#FFB13B" },
];

// The copy the band ships with; a stored band overrides a line at a time.
const COPY = {
  headA: "Your platforms claim more revenue",
  headB: "than your bank",
  accent: "received.",
  note: "Every platform is paid to take credit. None of them are paid to tell you the truth. Add up what Meta and Google each claim and the total usually exceeds what the business actually made.",
  label: "Platform-reported revenue share",
  totalLabel: "Total credit claimed",
  totalNote: "You only made 100%. Somebody is taking credit for a sale they did not cause, and right now you are funding whoever shouts loudest.",
};

// A stored share writes its figure in a text box, so it arrives as a string;
// the bar width and the total are arithmetic, which is why it is coerced here
// rather than trusted.
const toShare = (s) => ({
  name: s.name,
  value: Number(s.value) || 0,
  color: s.color || "#FE4601",
});

// The fill and the figure are one number: the bar is drawn from whatever the
// count is holding, so they cannot come apart mid-animation. The three start
// one after another, and the last one to finish decides when the run is over.
const FILL_MS = 1400;
const FILL_STEP_MS = 180;

// Out of the gate quickly, then easing into the figure rather than stopping
// dead on it.
const easeOut = (t) => 1 - Math.pow(1 - t, 3);

// `d` is one section's stored content when this band is placed on a page the
// CRM built. A bare call renders exactly what the page shipped with.
export default function Hero({ d = {} }) {
  const c = { ...COPY };
  for (const k of Object.keys(COPY)) if (d[k]) c[k] = d[k];

  // The stored list wins whole or not at all: a half-filled list would make
  // the bars and the total disagree, which is the one thing this band must
  // never do.
  const shares = React.useMemo(
    () => (d.shares?.length ? d.shares.map(toShare) : SHARES),
    [d.shares]
  );
  const fillTotal = FILL_MS + FILL_STEP_MS * (shares.length - 1);

  // The figures start at their full value, so the band is right in the
  // server's markup and with JavaScript off. Mounting is what empties them;
  // the section coming into view is what fills them again.
  const [shown, setShown] = React.useState(() => shares.map((s) => s.value));
  const [run, setRun] = React.useState(0);
  const section = React.useRef(null);

  // The total is read off the three counts rather than counted separately,
  // which is how it stays exactly their sum at every frame of the run and
  // lands on the same figure the static markup carries.
  const total = Math.round(shown.reduce((sum, value) => sum + value, 0));

  // Never disconnected: every return to the section runs the bars again.
  React.useEffect(() => {
    const node = section.current;
    if (!node) return undefined;

    const quiet =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (quiet) return undefined;

    setShown(shares.map(() => 0));

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
      { threshold: 0.3 }
    );
    watcher.observe(node);

    return () => watcher.disconnect();
  }, [shares]);

  // One run of the fill.
  React.useEffect(() => {
    if (run === 0) return undefined;

    let frame = 0;
    let start = 0;

    const tick = (now) => {
      if (!start) start = now;
      const elapsed = now - start;

      setShown(
        shares.map((share, i) => {
          const t = Math.min(
            1,
            Math.max(0, (elapsed - i * FILL_STEP_MS) / FILL_MS)
          );
          return share.value * easeOut(t);
        })
      );

      if (elapsed < fillTotal) {
        frame = requestAnimationFrame(tick);
      } else {
        setShown(shares.map((share) => share.value));
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [run, shares, fillTotal]);

  return (
    <section className="ant-hero" ref={section}>
      <div className="container">
        <h1 className="anh-heading">
          {c.headA}
          <br />
          {c.headB} <span className="anh-accent">{c.accent}</span>
        </h1>

        <p className="anh-note">{c.note}</p>
      </div>

      <div className="anh-panel">
        <div className="container">
          <p className="anh-label">{c.label}</p>

          <ul className="anh-bars">
            {shares.map((share, i) => (
              <li
                className="anh-bar"
                key={i}
                style={{ "--anh-value-color": share.color }}
              >
                <span className="anh-name">{share.name}</span>
                {/* The track is the full 100% the business actually made; the
                    fill is what this one platform says it caused -- drawn
                    from the count, so the bar and the figure beside it are
                    the same number twice. */}
                <span className="anh-track">
                  <span className="anh-fill" style={{ width: shown[i] + "%" }} />
                </span>
                <span className="anh-value" aria-live="polite">
                  {Math.round(shown[i] || 0)}%
                </span>
              </li>
            ))}
          </ul>

          <div className="anh-total">
            <div className="anh-total-text">
              <p className="anh-label">{c.totalLabel}</p>
              <p className="anh-total-note">{c.totalNote}</p>
            </div>
            <p className="anh-total-value">{total}%</p>
          </div>
        </div>
      </div>
    </section>
  );
}
