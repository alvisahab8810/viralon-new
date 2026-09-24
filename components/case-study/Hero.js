// components/case-study/Hero.js — the opening band of /case-study/[slug].
//
// Everything here is written in the payroll admin (Website → Case Studies):
// the identity strip, the heading's three pieces, the intro, the hero media
// and the row of figures. Nothing is hard coded, because two case studies
// never carry the same numbers.
//
// The media is either a still or a clip. A clip does not autoplay -- it waits
// behind its poster and its play button until someone asks for it, which is
// what the design shows and what keeps a page carrying several videos from
// pulling all of them down at once.
//
// This is a copy of the site's look, not a shared component: the case study
// page is edited from the database, and a shared section would carry those
// edits onto pages that must stay fixed. Styles live at the end of
// custome.css, responsive steps at the end of responsive.css, every rule
// prefixed .cs-hero because style.css sets `.bg-dark h1..h6 { color: white }`.
import React, { useRef, useState } from "react";

export default function Hero({ study }) {
  const { brandName, brandLogo, category, dateLabel, tags = [], hero } =
    study || {};
  const { heading = {}, intro, media = {}, stats = [] } = hero || {};

  // A clip starts as its poster. `playing` swaps in the real <video> and
  // starts it, so nothing is fetched until the visitor asks.
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);

  const isVideo = media.kind === "video" && media.video;
  const still = media.poster || media.image;

  const play = () => {
    setPlaying(true);
    // The element only exists after this render, so start it on the next tick.
    requestAnimationFrame(() => videoRef.current?.play?.());
  };

  return (
    <section className="cs-hero" id="cs-intro">
      <div className="container">
        {/* Who this is, and what kind of work it was. */}
        <div className="csh-ident">
          <div className="csh-brand">
            {brandLogo ? (
              <img className="csh-brand-logo" src={brandLogo} alt="" />
            ) : null}
            <div className="csh-brand-text">
              <p className="csh-brand-name">{brandName}</p>
              {category || dateLabel ? (
                <p className="csh-brand-meta">
                  {[category, dateLabel].filter(Boolean).join(" · ")}
                </p>
              ) : null}
            </div>
          </div>

          {tags.length ? (
            <ul className="csh-tags">
              {tags.map((tag) => (
                <li className="csh-tag" key={tag}>
                  {tag}
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <h1 className="csh-title">
          {heading.lead}
          {heading.accent ? (
            <span className="csh-accent">{heading.accent}</span>
          ) : null}
          {heading.tail}
        </h1>

        {intro ? <p className="csh-intro">{intro}</p> : null}

        {isVideo || still ? (
          <div className="csh-media">
            {isVideo && playing ? (
              <video
                ref={videoRef}
                className="csh-video"
                src={media.video}
                poster={still || undefined}
                controls
                playsInline
              />
            ) : (
              <>
                {still ? (
                  <img className="csh-still" src={still} alt={media.alt || ""} />
                ) : null}
                {isVideo ? (
                  <button
                    type="button"
                    className="csh-play"
                    onClick={play}
                    aria-label={`Play the ${brandName || "case study"} film`}
                  >
                    {/* The triangle is drawn in CSS rather than as an svg, so
                        nothing can squeeze or recolour it. */}
                    <i className="csh-play-ico" aria-hidden="true" />
                  </button>
                ) : null}
              </>
            )}
          </div>
        ) : null}

        {stats.length ? (
          <ul className="csh-stats">
            {stats.map((stat) => (
              <li className="csh-stat" key={stat.label || stat.value}>
                <p className="csh-stat-value">{stat.value}</p>
                <p className="csh-stat-label">{stat.label}</p>
                {stat.sub ? <p className="csh-stat-sub">{stat.sub}</p> : null}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
