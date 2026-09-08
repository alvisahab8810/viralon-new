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

const REELS = [
  "/assets/img/our-services/instagram/video1.mp4",
  "/assets/img/our-services/instagram/video2.mp4",
  "/assets/img/our-services/instagram/video3.mp4",
  "/assets/img/our-services/instagram/video4.mp4",
  "/assets/img/our-services/instagram/video5.mp4",
  "/assets/img/our-services/instagram/video6.mp4",
  "/assets/img/our-services/instagram/video7.mp4",
  "/assets/img/our-services/instagram/video8.mp4",
];

export default function SooSocial() {
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
            We Are Soo
            <br />
            <span className="soosocial-accent">Social...</span>
          </h2>

          <p className="soosocial-intro">
            Connect and see
            <br />
            if you like us
          </p>
        </div>
      </div>

      <div className="soosocial-track-wrap">
        <div className="soosocial-track" ref={trackRef} onScroll={updateEdges}>
          {REELS.map((src, index) => (
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
