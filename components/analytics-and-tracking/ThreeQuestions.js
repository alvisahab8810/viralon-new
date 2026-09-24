// components/analytics-and-tracking/ThreeQuestions.js — "Three questions" on
// /analytics-and-tracking.
//
// A light band on a dark page, so every rule carries the section class:
// .bg-dark turns headings white further up the cascade and they would vanish
// otherwise.
//
// Three cards, then a layer opened up underneath them. The cards are one row
// of equal height with the owner line pinned to the bottom, so a longer
// question never drags its own footer up out of line with the others.
//
// On a phone the row of cards is replaced by a row of tabs -- one per
// question -- and the layer below is the answer to whichever tab is on. The
// tabs are hidden above 560, where the open layer is the first one, which is
// exactly what that width showed before, so the desktop is untouched.
//
// Styles live at the end of custome.css, responsive steps at the end of
// responsive.css.
import React, { useState } from "react";

// Every question owns the layer it opens, so the phone's tabs have somewhere
// to switch to. Question 01's layer is the one the desktop has always shown.
const QUESTIONS = [
  {
    label: "Question 01",
    title: "What happened?",
    body:
      "The operational number. Which ad produced which enquiry. Fix this first.",
    owner: "Daily · Media buyer",
    layer: {
      label: "Layer one · Tracking",
      title: "Which ad produced which enquiry.",
      lead:
        "The operational number. It is also the one most businesses get wrong, because browsers, blockers and consent strip a third of it before it ever reaches the platform. Fix this first. Everything above it inherits the error.",
      build:
        "Server side container on your infrastructure. Conversions API with enhanced IDs. Consent Mode v2 enforced at the server. GA4 configured rather than defaulted.",
    },
  },
  {
    label: "Question 02",
    title: "What is driving it?",
    body:
      "The directional question. Which channel deserves more next month and what to stop.",
    owner: "Monthly · You",
    layer: {
      label: "Layer two · Attribution",
      title: "Which channel deserves more next month.",
      lead:
        "The directional question. Every platform counts the same enquiry as its own, so the answer has to come from one model you own rather than three dashboards arguing. Read it monthly, not daily.",
      build:
        "Blended reporting with every channel in one model. Platform claims reconciled against the enquiries in your CRM. One number per channel you can actually spend against.",
    },
  },
  {
    label: "Question 03",
    title: "Would it have happened anyway?",
    body:
      "Incrementality. Evidence a holdout test produced. Only a test can answer this honestly.",
    owner: "Quarterly · CFO",
    layer: {
      label: "Layer three · Incrementality",
      title: "Would it have happened anyway?",
      lead:
        "The honest question, and the only one no dashboard can answer. A holdout turns “this channel works” into evidence, which is the difference between a budget decision and a hunch.",
      build:
        "Geo or audience holdouts run on a real schedule. A control group that stays clean. A quarterly read your CFO can sign off on.",
    },
  },
];

export default function ThreeQuestions() {
  // Which layer is open. The tabs that change it are phone only, so above 560
  // this stays 0 and the section renders exactly what it always did.
  const [active, setActive] = useState(0);
  const layer = QUESTIONS[active].layer;

  return (
    <section className="ant-questions">
      <div className="container">
        <p className="anq-eyebrow">Start with the decision</p>

        <h2 className="anq-heading">
          Three Questions.
          <span className="anq-accent">Three Different Answers.</span>
        </h2>

        <ul className="anq-row">
          {QUESTIONS.map((q) => (
            <li className="anq-card" key={q.label}>
              <p className="anq-label">{q.label}</p>
              <h3 className="anq-title">{q.title}</h3>
              <p className="anq-body">{q.body}</p>
              <p className="anq-owner">{q.owner}</p>
            </li>
          ))}
        </ul>

        {/* Phone only -- `display: none` above 560. */}
        <ul className="anq-tabs">
          {QUESTIONS.map((q, i) => (
            <li key={q.label}>
              <button
                type="button"
                className={"anq-tab" + (i === active ? " is-on" : "")}
                onClick={() => setActive(i)}
                aria-pressed={i === active}
              >
                {q.title}
              </button>
            </li>
          ))}
        </ul>

        <div className="anq-layer">
          <div className="anq-layer-left">
            <p className="anq-label">{layer.label}</p>
            <h3 className="anq-layer-title">{layer.title}</h3>
          </div>

          <div className="anq-layer-right">
            <p className="anq-layer-lead">{layer.lead}</p>

            {/* The label is inside the paragraph rather than above it so the
                phone can run the two on one line, as the mock does. It is a
                block above 560, which is how it has always drawn. */}
            <p className="anq-layer-body">
              <span className="anq-label anq-build-label">What we build</span>
              {layer.build}
            </p>
          </div>

          {/* Phone only -- `display: none` above 560, where the layer is two
              columns of type and has never carried artwork. */}
          <img
            className="anq-shot"
            src="/assets/others/mob-abt.png"
            alt=""
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
