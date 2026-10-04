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
      { title: "Positioning statement" },
      { title: "Short Reels"},
      { title: "Hook Tests"},
      { title: "Culture Posts"},
    ],
  },
  {
    image: "phone2.png",
    slides: [
      { title: "Competitor mapping" },
      { title: "Carousels"},
      { title: "Quote Cards"},
      { title: "Offer Creatives"},
    ],
  },
  {
    image: "phone3.png",
    slides: [
      { title: "Brand voice guide"},
      { title: "Talking Head"},
      { title: "Behind The Scenes" },
      { title: "Opinion Posts" },
    ],
  },
  {
    image: "phone4.png",
    slides: [
      { title: "Page copy" },
      { title: "Case Studies" },
      { title: "Testimonials"},
      { title: "Before And After" },
    ],
  },
  {
    image: "phone5.png",
    slides: [
      { title: "Colour & type system" },
      { title: "Explainers" },
      { title: "Feature Walkthrough" },
      { title: "FAQ Answers" },
    ],
  },
];

// The copy the page ships with; a stored band overrides a line at a time.
const COPY = {
  eyebrow: "What you get",
  headA: "Everything Your Team Needs",
  accent: " To Say The Same Thing.",
};

// What the renderer reads: a finished image path and the formats that phone
// turns through. A phone stored in the CRM carries its four formats as four
// flat boxes, and its image as a whole path, so nothing has to know about the
// folder the shipped exports happen to live in.
const SHIPPED = PHONES.map((p) => ({
  src: DIR + p.image,
  slides: p.slides.map((s) => s.title),
}));

const toPhone = (row) => ({
  src: row.image,
  slides: [row.titleOne, row.titleTwo, row.titleThree, row.titleFour].filter(Boolean),
});

export default function WhatWeMake({ d = {} }) {
  const c = { ...COPY };
  for (const k of Object.keys(COPY)) if (d[k]) c[k] = d[k];
  const phones = d.phones?.length
    ? d.phones.map(toPhone).filter((p) => p.src && p.slides.length)
    : SHIPPED;

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
        <p className="wmk-eyebrow">{c.eyebrow}</p>
        <h2 className="wmk-heading">
          {c.headA}
          <br />
          <span className="wmk-accent">{c.accent}</span>
        </h2>

        <ul className="wmk-row">
          {phones.map((phone, i) => {
            const slide = phone.slides[slot % phone.slides.length];
            return (
              <li className={"wmk-phone wmk-phone-" + (i + 1)} key={phone.src + i}>
                {/* Decorative: the phone is the frame, the copy over it is the
                    content. */}
                <img
                  className="wmk-device"
                  src={phone.src}
                  alt=""
                  loading="lazy"
                />

                {/* `key` on the screen is the title, so React replaces the
                    element on every turn instead of editing it -- that restart
                    is what re-runs the fade-and-rise. The live region tells a
                    screen reader the copy changed on its own. */}
                <div className="wmk-screen" aria-live="polite">
                  <div className="wmk-slide" key={slide}>
                    <p className="wmk-title">{slide}</p>
                    <span className="wmk-rule" aria-hidden="true" />
                    <p className="wmk-label"></p>
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
