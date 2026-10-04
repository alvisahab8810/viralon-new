import React, { useRef, useState } from "react";
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
            <article className="soosocial-card" key={src}>
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                src={src}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
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
