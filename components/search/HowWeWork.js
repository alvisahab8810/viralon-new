// components/search/HowWeWork.js — "How we work" on /search.
//
// The homepage's "6 Parts Of Machine" card, set as a fixed row of four instead
// of a scrolling rail: same #EFEFF0 band, same white 22px cards, same 27.2/32
// title and 16.68/21.6 SF Pro copy, artwork bled to the card's bottom edge.
// No tag and no "Have a look" pill -- the steps are a sequence to read, not
// services to click through to.
//
// It carries its own .search-steps / .sst- prefix rather than reusing the
// .sixparts- classes: those are bound to the slider (flex-basis, scroll-snap,
// the 100vw track) and a tweak there would silently move this page too.
//
// The steps are an ordered list because the order is the point -- the first
// two decide the rest.
//
// Styles live at the end of custome.css under `.search-steps`, responsive
// steps at the end of responsive.css.
import React from "react";
import SliderNav, { useSliderTrack } from "../home/SliderNav";

const STEPS = [
  {
    title: "Fix the foundation",
    desc: "Crawlers unblocked, content rendered server side, speed and indexation clean. Unglamorous, and nothing after it works without it.",
    img: "/assets/others/first-step.png",
  },
  {
    title: "Map keywords and prompts",
    desc: "Every term they might search and every question they might ask a model, mapped to buying stage and matched to a page, so nothing competes with itself.",
    img: "/assets/others/second-step.png",
  },
  {
    title: "Write what deserves the citation",
    desc: "Original data, a named expert behind the claim, and one passage per piece stated clearly enough to be quoted. Rehashed content earns nothing from anyone.",
    img: "/assets/others/third-step.png",
  },
  {
    title: "Earn the mentions, track both worlds",
    desc: "Digital PR and genuine community presence, because an unlinked mention on a real forum can outweigh a paid link. Then rankings, enquiries and AI citations, checked weekly.",
    img: "/assets/others/fourth-step.png",
  },
];

export default function HowWeWork() {
  // On a phone the four steps become the same swipeable rail the homepage
  // uses, arrows and all. The hooks run at every width; only CSS decides
  // whether the list is a grid or a scroller, so nothing changes on desktop.
  const { trackRef, atStart, atEnd, updateEdges, scrollByCard } =
    useSliderTrack(".sst-card");

  return (
    <section className="search-steps">
      <div className="container">
        <p className="sst-eyebrow">How we work</p>

        <h2 className="sst-heading">
          Four Steps. The First Two
          <br />
          <span className="sst-accent"> Decide The Rest.</span>
        </h2>

        <ol className="sst-cards" ref={trackRef} onScroll={updateEdges}>
          {STEPS.map((step) => (
            <li className="sst-card" key={step.title}>
              <h3 className="sst-title">{step.title}</h3>
              <p className="sst-desc">{step.desc}</p>

              <div className="sst-media">
                <img src={step.img} alt="" loading="lazy" />
              </div>
            </li>
          ))}
        </ol>

        {/* Phone only -- `.sst-nav-below` is display:none above 560, where the
            cards are a grid and there is nothing to scroll. */}
        <div className="sst-nav-below">
          <SliderNav atStart={atStart} atEnd={atEnd} onScroll={scrollByCard} />
        </div>
      </div>
    </section>
  );
}
