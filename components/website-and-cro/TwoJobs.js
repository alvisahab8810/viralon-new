// components/website-and-cro/TwoJobs.js — "Sometimes You Need A New Site." on
// /website-and-cro.
//
// The two grey columns come from /brand's "Two Halves. Fourteen Decisions."
// (components/brand/HowWeSee.js): this section wears .bsee-section and reuses
// .bsee-grid / .bsee-col / .bsee-col-title, so the white ground, the panel
// colour, the radius and the padding stay in step with that page. What that
// section does inside a column -- the rotating accordion -- is not what this
// one does, so the rows here are their own thing.
//
// Three things are this page's own and carry a .wcj- prefix at the end of
// custome.css: the head, which runs left with the honesty note pinned top
// right instead of centred, the line of copy under each column title, and the
// four numbered rows.
//
// The lead of every row is bold because it is the claim; the rest of the
// sentence is the reason. Splitting it in the data rather than in the markup
// keeps the two columns written the same way.
import React from "react";

const BUILD = [
  {
    lead: "Fast on an ordinary phone",
    rest: " on patchy data, because that is what your buyer is actually holding.",
  },
  {
    lead: "Structured for search and CRM",
    rest: " from the start, so the next two parts of the machine are not a rebuild.",
  },
  {
    lead: "Tracking wired on launch day",
    rest: ", not bolted on when someone finally asks where leads came from.",
  },
  {
    lead: "WhatsApp and call handoff",
    rest: " where your buyers prefer it, which in most markets they do.",
  },
];

const IMPROVE = [
  {
    lead: "Session recordings and heatmaps",
    rest: " to see where people actually stop, not where we assume they do.",
  },
  {
    lead: "Speed and mobile first",
    rest: ", because they are the cheapest wins and almost always the largest.",
  },
  {
    lead: "Test, do not guess.",
    rest: " Only about 14% of tests win, which is exactly why you run them instead of arguing.",
  },
  {
    lead: "Ship monthly",
    rest: ", measure against enquiries, and keep the version that earned it.",
  },
];

function Column({ title, sub, subAccent, items }) {
  return (
    <div className="bsee-col">
      <h3 className="bsee-col-title">{title}</h3>

      <p className="wcj-sub">
        {sub} <strong>{subAccent}</strong>
      </p>

      <ol className="wcj-list">
        {items.map((item, i) => (
          <li className="wcj-item" key={item.lead}>
            {/* The leading zero is dropped on a phone, where the mock counts
                1..4 rather than 01..04, so it is its own element for CSS to
                hide rather than a second number in the data. */}
            <span className="wcj-num">
              <span className="wcj-zero">0</span>
              {i + 1}
            </span>
            <p className="wcj-text">
              <strong>{item.lead}</strong>
              {item.rest}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function TwoJobs() {
  return (
    <section className="bsee-section wcro-jobs">
      <div className="container">
        <div className="wcj-head">
          <div className="wcj-head-main">
            <p className="wcj-eyebrow">Two different jobs</p>

            <h2 className="wcj-heading">
              Sometimes You Need A New Site.
              <br />
              <span className="wcj-accent">Usually You Do Not.</span>
            </h2>
          </div>

          <p className="wcj-note">
            We will tell you honestly which one you are, and we lose money
            saying it more often than you would expect.
          </p>
        </div>

        <div className="bsee-grid">
          <Column
            title="We build"
            sub="Built to convert from day one,"
            subAccent="not redesigned into converting later."
            items={BUILD}
          />
          <Column
            title="We improve"
            sub="Find the leak, fix the leak, prove it moved."
            subAccent="No blind redesigns."
            items={IMPROVE}
          />
        </div>
      </div>
    </section>
  );
}
