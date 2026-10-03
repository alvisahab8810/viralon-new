// components/case-study/InMotion.js — "01 / IN MOTION": the grid of stills and
// clips showing the work as it actually runs.
//
// A clip holds still behind its poster until it is asked for. With a dozen of
// them on one page, autoplay would pull every file down at once; this way the
// page costs one poster each until someone presses play.
import React, { useRef, useState } from "react";
import SectionHead from "./SectionHead";

function Tile({ item }) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);
  const isVideo = item.kind === "video" && item.video;
  const still = item.poster || item.image;

  const play = () => {
    setPlaying(true);
    requestAnimationFrame(() => videoRef.current?.play?.());
  };

  return (
    <li className="csm-tile">
      <div className="csm-frame">
        {isVideo && playing ? (
          <video
            ref={videoRef}
            className="csm-video"
            src={item.video}
            poster={still || undefined}
            controls
            playsInline
          />
        ) : (
          <>
            {still ? <img className="csm-still" src={still} alt={item.alt || item.caption || ""} /> : null}
            {isVideo ? (
              <button type="button" className="csm-play" onClick={play} aria-label="Play this clip">
                <i className="csm-play-ico" aria-hidden="true" />
              </button>
            ) : null}
          </>
        )}
      </div>
    </li>
  );
}

export default function InMotion({ section }) {
  const items = section?.items || [];
  if (!items.length) return null;

  return (
    <section className="cs-section cs-motion" id="cs-in-motion">
      <SectionHead section={section} />
      {/* Two halves rather than one run of tiles: the first clip takes the
          left 50% on its own, everything after it stacks down the right 50%.
          Each half is its own list so the tiles stay <li>s inside a <ul>. */}
      <div className="csm-grid">
        <ul className="csm-col csm-col-main">
          <Tile item={items[0]} />
        </ul>

        {items.length > 1 ? (
          <ul className="csm-col csm-col-side">
            {items.slice(1).map((item, i) => (
              <Tile item={item} key={i} />
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
