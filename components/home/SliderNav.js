import { useCallback, useEffect, useRef, useState } from "react";

/*
 * Shared horizontal card-slider plumbing.
 *
 * `useSliderTrack` owns the scroll-snap track ref and the disabled state of
 * the arrows; `SliderNav` renders the buttons. Both live here so every card
 * rail on the homepage behaves and looks identical -- the 6 Parts rail, Our
 * Work and Which Part Is Broken all share this one implementation.
 */

export function useSliderTrack(cardSelector) {
  const trackRef = useRef(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateEdges = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    updateEdges();
    window.addEventListener("resize", updateEdges);
    return () => window.removeEventListener("resize", updateEdges);
  }, [updateEdges]);

  const scrollByCard = useCallback(
    (dir) => {
      const el = trackRef.current;
      if (!el) return;
      const card = el.querySelector(cardSelector);
      // Gap is read off the computed style so the step stays correct if the
      // gap changes at a breakpoint.
      const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
      const step = card
        ? card.getBoundingClientRect().width + gap
        : el.clientWidth * 0.8;
      el.scrollBy({ left: dir * step, behavior: "smooth" });
    },
    [cardSelector]
  );

  return { trackRef, atStart, atEnd, updateEdges, scrollByCard };
}

// A real arrow -- shaft plus head -- rather than a bare chevron.
function NavArrow({ dir }) {
  const d =
    dir === "prev" ? "M19 12H5m0 0l6-6m-6 6l6 6" : "M5 12h14m0 0l-6-6m6 6l-6 6";
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d={d}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function NavButton({ dir, onClick, disabled }) {
  return (
    <button
      type="button"
      className={`slider-nav-btn slider-nav-btn--${dir}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === "prev" ? "Previous" : "Next"}
    >
      {/* Two copies of the arrow: on hover the first slides out of the masked
          window and the second slides in behind it. */}
      <span className="slider-nav-icon" aria-hidden="true">
        <NavArrow dir={dir} />
        <NavArrow dir={dir} />
      </span>
    </button>
  );
}

export default function SliderNav({ atStart, atEnd, onScroll, theme = "light" }) {
  return (
    <div className={`slider-nav slider-nav--${theme}`}>
      <NavButton dir="prev" onClick={() => onScroll(-1)} disabled={atStart} />
      <NavButton dir="next" onClick={() => onScroll(1)} disabled={atEnd} />
    </div>
  );
}
