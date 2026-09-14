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
  return (
    <section className="search-steps">
      <div className="container">
        <p className="sst-eyebrow">How we work</p>

        <h2 className="sst-heading">
          Four Steps. The First Two
          <br />
          <span className="sst-accent">Decide The Rest.</span>
        </h2>

        <ol className="sst-cards">
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
      </div>
    </section>
  );
}
