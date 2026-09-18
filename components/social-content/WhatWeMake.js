// components/social-content/WhatWeMake.js — "What we make" on /social-content.
//
// Five phones in a staggered row, each one a format. The copy on the screens
// is not fixed: every few seconds all five turn to the next format in their own
// list, so the row keeps showing new work without the section growing.
//
// One timer drives all five (a single interval in this component, not five),
// so the phones turn together and cannot drift apart. `slot` counts up for
// ever and each phone reads `phone.slides[slot % phone.slides.length]`, which
// means a phone with four formats and a phone with five would both keep
// cycling correctly.
//
// Sizing, in one number: the phone body is 234 x 473.4 in the frame, and in
// the PNGs that body measures 350 x 708 inside an 870-tall canvas, the rest
// being the drop shadow. So the box is `--wmk-w` wide, the box height is
// 2.0231x that, and the image is 2.4859x that tall with its width left to the
// aspect ratio -- change --wmk-w alone and the whole row scales with the
// proportions intact. The copy sits inside that box, never on the shadow, so
// it cannot land outside the phone at any width.
//
// Styles live at the end of custome.css, responsive steps at the end of
// responsive.css. Every phone also carries its own .wmk-phone-N class so any
// one of the five can be nudged on its own without touching the others.
import React, { useEffect, useState } from "react";

const DIR = "/assets/others/the-work/social-content/";

// How long each format stays on screen.
const HOLD_MS = 3200;

const PHONES = [
  {
    image: "phone1.png",
    slides: [
      { title: "Trend Response", label: "Reach" },
      { title: "Short Reels", label: "Discovery" },
      { title: "Hook Tests", label: "Attention" },
      { title: "Culture Posts", label: "Shares" },
    ],
  },
  {
    image: "phone2.png",
    slides: [
      { title: "Static Posts", label: "Announcements and offers" },
      { title: "Carousels", label: "Depth" },
      { title: "Quote Cards", label: "Recall" },
      { title: "Offer Creatives", label: "Response" },
    ],
  },
  {
    image: "phone3.png",
    slides: [
      { title: "Founder Led", label: "Trust" },
      { title: "Talking Head", label: "Authority" },
      { title: "Behind The Scenes", label: "Access" },
      { title: "Opinion Posts", label: "Point of view" },
    ],
  },
  {
    image: "phone4.png",
    slides: [
      { title: "Customer Stories", label: "Proof" },
      { title: "Case Studies", label: "Evidence" },
      { title: "Testimonials", label: "Credibility" },
      { title: "Before And After", label: "Results" },
    ],
  },
  {
    image: "phone5.png",
    slides: [
      { title: "Product Demo", label: "Consideration" },
      { title: "Explainers", label: "Clarity" },
      { title: "Feature Walkthrough", label: "Understanding" },
      { title: "FAQ Answers", label: "Objections" },
    ],
  },
];

export default function WhatWeMake() {
  const [slot, setSlot] = useState(0);

  useEffect(() => {
    // One interval for the whole row. Anyone who has asked not to be shown
    // motion gets the first format and no turning at all.
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (still.matches) return;
    const id = setInterval(() => setSlot((s) => s + 1), HOLD_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="social-make">
      <div className="container">
        <p className="wmk-eyebrow">What we make</p>
        <h2 className="wmk-heading">
          Formats Chosen For The Job.
          <br />
          <span className="wmk-accent">Not For The Calendar.</span>
        </h2>

        <ul className="wmk-row">
          {PHONES.map((phone, i) => {
            const slide = phone.slides[slot % phone.slides.length];
            return (
              <li className={"wmk-phone wmk-phone-" + (i + 1)} key={phone.image}>
                {/* Decorative: the phone is the frame, the copy over it is the
                    content. */}
                <img
                  className="wmk-device"
                  src={DIR + phone.image}
                  alt=""
                  loading="lazy"
                />

                {/* `key` on the screen is the title, so React replaces the
                    element on every turn instead of editing it -- that restart
                    is what re-runs the fade-and-rise. The live region tells a
                    screen reader the copy changed on its own. */}
                <div className="wmk-screen" aria-live="polite">
                  <div className="wmk-slide" key={slide.title}>
                    <p className="wmk-title">{slide.title}</p>
                    <span className="wmk-rule" aria-hidden="true" />
                    <p className="wmk-label">{slide.label}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
