import React, { useEffect, useRef, useState } from "react";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import SliderNav, { useSliderTrack } from "./SliderNav";

/*
 * "We Are Soo Social" — a full-bleed rail of vertical reels. Same scroll-snap
 * track and nav buttons as the other homepage rails; the mute control is
 * lifted from the social-media-marketing Videos section, including its rule
 * that unmuting one clip mutes every other one.
 *
 * Clips are the local Instagram set and are meant to be swapped later.
 */

// The clips live in public/assets/img/our-services/instagram as videoN.mp4.
// This list is the running order, left to right: reorder the numbers to
// reorder the rail, drop one out to hide that clip, add the next number when a
// new file lands in the folder. Nothing else needs touching.
const REEL_ORDER = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  11, 12, 13, 14, 15, 16, 17, 18, 19,
];

const REELS = REEL_ORDER.map(
  (n) => `/assets/img/our-services/instagram/video${n}.mp4`
);

// Nothing is fetched up front: the rail sits well down the page, and the
// observer below starts the clips the moment the section is actually looked
// at. The constant stays as the fallback for a browser without
// IntersectionObserver, which gets the first clip and no lazy loading.
const EAGER = 0;

const COPY = {
  headA: "We Are Soo",
  accent: "Social...",
  intro1: "Connect and see",
  intro2: "if you like us",
};

// `d` is one section's stored content when this rail is placed on a page the
// CRM built. The homepage and /sample pass nothing and get the clip list
// above, so the pages that already run this rail are untouched.
export default function SooSocial({ d = {} }) {
  const c = { ...COPY };
  for (const k of Object.keys(COPY)) if (d[k]) c[k] = d[k];
  const reels = d.reels?.length ? d.reels.map((r) => r.src).filter(Boolean) : REELS;

  const { trackRef, atStart, atEnd, updateEdges, scrollByCard } =
    useSliderTrack(".soosocial-card");

  const videoRefs = useRef([]);
  const [unmutedIndex, setUnmutedIndex] = useState(null);

  // How many clips have been given a `src`. Every reel carrying `autoPlay`
  // meant the browser pulled the whole file for each one it could see, and the
  // home page was downloading fourteen megabytes of video before a visitor had
  // scrolled anywhere near this rail. The rail is read left to right, so a
  // high-water mark is enough: the two that are on screen load with the page
  // and each one the visitor reaches pulls the next in behind it.
  const [loadedUpTo, setLoadedUpTo] = useState(EAGER);

  // A clip plays only while it is on screen, and is left paused — and its
  // buffer left alone — the rest of the time.
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      // No observer: fall back to the old behaviour rather than a rail of
      // blank cards.
      setLoadedUpTo(reels.length);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const index = Number(entry.target.dataset.reel);
          if (entry.isIntersecting) {
            setLoadedUpTo((n) => Math.max(n, index + 2));
            // Resumes a clip that was paused on the way past; the ones that
            // have only just been given a src start on their own.
            const video = entry.target.querySelector("video");
            if (video?.getAttribute("src")) video.play?.().catch(() => {});
          } else {
            entry.target.querySelector("video")?.pause?.();
          }
        }
      },
      // Measured against the viewport, not the track, so a card counts as
      // visible only when the section itself is on screen.
      // Kept tight on the horizontal axis: the clips are several megabytes
      // each, so the rail pulls in the next one or two rather than half the
      // set the moment the section appears.
      { rootMargin: "200px 120px", threshold: 0.1 }
    );
    const cards = trackRef.current?.querySelectorAll(".soosocial-card") || [];
    cards.forEach((card) => io.observe(card));
    return () => io.disconnect();
  }, [trackRef, reels.length]);

  const toggleMute = (index) => {
    let nowUnmuted = null;
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      if (i === index) {
        video.muted = !video.muted;
        if (!video.muted) nowUnmuted = i;
      } else {
        video.muted = true;
      }
    });
    setUnmutedIndex(nowUnmuted);
  };

  return (
    <section className="soosocial-section">
      <div className="container">
        <div className="soosocial-head">
          <h2 className="soosocial-heading">
            {c.headA}
            <br />
            <span className="soosocial-accent">{c.accent}</span>
          </h2>

          <p className="soosocial-intro">
            {c.intro1}
            <br />
            {c.intro2}
          </p>
        </div>
      </div>

      <div className="soosocial-track-wrap">
        <div className="soosocial-track" ref={trackRef} onScroll={updateEdges}>
          {reels.map((src, index) => (
            <article className="soosocial-card" data-reel={index} key={src}>
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                src={index < loadedUpTo ? src : undefined}
                // Harmless while there is no src, and it starts the clip the
                // moment the observer attaches one -- a play() call made in
                // the observer would fire a render too early.
                autoPlay
                muted
                loop
                playsInline
                preload="none"
                className="soosocial-video"
              />
              <button
                type="button"
                className="soosocial-mute"
                onClick={() => toggleMute(index)}
                aria-label={
                  unmutedIndex === index ? "Mute video" : "Unmute video"
                }
              >
                {unmutedIndex === index ? (
                  <FaVolumeUp size={18} />
                ) : (
                  <FaVolumeMute size={18} />
                )}
              </button>
            </article>
          ))}
        </div>
      </div>

      <div className="container">
        <div className="soosocial-foot">
          <SliderNav
            atStart={atStart}
            atEnd={atEnd}
            onScroll={scrollByCard}
            theme="dark"
          />
        </div>
      </div>
    </section>
  );
}
