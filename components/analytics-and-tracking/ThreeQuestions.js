// components/analytics-and-tracking/ThreeQuestions.js — "Three questions" on
// /analytics-and-tracking.
//
// A light band on a dark page, so every rule carries the section class:
// .bg-dark turns headings white further up the cascade and they would vanish
// otherwise.
//
// Three cards, then the first layer opened up underneath them. The cards are
// one row of equal height with the owner line pinned to the bottom, so a
// longer question never drags its own footer up out of line with the others.
//
// Styles live at the end of custome.css, responsive steps at the end of
// responsive.css.
import React from "react";

const QUESTIONS = [
  {
    label: "Question 01",
    title: "What happened?",
    body:
      "The operational number. Which ad produced which enquiry. Fix this first.",
    owner: "Daily · Media buyer",
  },
  {
    label: "Question 02",
    title: "What is driving it?",
    body:
      "The directional question. Which channel deserves more next month and what to stop.",
    owner: "Monthly · You",
  },
  {
    label: "Question 03",
    title: "Would it have happened anyway?",
    body:
      "Incrementality. Evidence a holdout test produced. Only a test can answer this honestly.",
    owner: "Quarterly · CFO",
  },
];

export default function ThreeQuestions() {
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

        <div className="anq-layer">
          <div className="anq-layer-left">
            <p className="anq-label">Layer one · Tracking</p>
            <h3 className="anq-layer-title">
              Which ad produced which enquiry.
            </h3>
          </div>

          <div className="anq-layer-right">
            <p className="anq-layer-lead">
              The operational number. It is also the one most businesses get
              wrong, because browsers, blockers and consent strip a third of it
              before it ever reaches the platform. Fix this first. Everything
              above it inherits the error.
            </p>

            <p className="anq-label">What we build</p>
            <p className="anq-layer-body">
              Server side container on your infrastructure. Conversions API
              with enhanced IDs. Consent Mode v2 enforced at the server. GA4
              configured rather than defaulted.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
