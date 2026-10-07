import React from "react";
import Link from "next/link";
import SliderNav, { useSliderTrack } from "../home/SliderNav";

/*
 * "Have A Look At / Our Work" — a dark full-bleed rail of case-study cards.
 * Each card is a 338x514 image with two result figures underneath.
 * Images are placeholders from /assets/img/our-work and are meant to be
 * swapped for the real Figma exports.
 */

const WORK = [
  {
    name: "Tourwatchout",
    img: "/assets/images/our-work/1.webp",
    href: "/our-work/tourwatchout",
    stats: [
      { value: "+245%", label: "Engagement" },
      { value: "20%", label: "Revenue growth" },
    ],
  },
  {
    name: "Ragee Makeup",
    img: "/assets/images/our-work/2.webp",
    href: "/our-work/ragee-makeup",
    stats: [
      { value: "+245%", label: "Engagement" },
      { value: "20%", label: "Revenue growth" },
    ],
  },
  {
    name: "Colomoto",
    img: "/assets/images/our-work/3.webp",
    href: "/our-work/colomoto",
    stats: [
      { value: "+245%", label: "Engagement" },
      { value: "20%", label: "Revenue growth" },
    ],
  },
  {
    name: "Sapphire Auditorium",
    img: "/assets/images/our-work/4.webp",
    href: "/our-work/sapphire-auditorium",
    stats: [
      { value: "+245%", label: "Engagement" },
      { value: "20%", label: "Revenue growth" },
    ],
  },


  

 
  
];

// The copy the page ships with; a stored band overrides a line at a time.
const COPY = {
  headA: "Brands",
  accent: " we have built.",
};

// A card stored in the CRM carries its two figures as four flat boxes, which
// is what an admin can fill in; they are folded back into the pair the markup
// reads here.
const toCard = (row) => ({
  name: row.name,
  img: row.img,
  href: row.href || "#",
  stats: [
    { value: row.statOneValue, label: row.statOneLabel },
    { value: row.statTwoValue, label: row.statTwoLabel },
  ].filter((st) => st.value || st.label),
});

export default function HaveLook({ d = {} }) {
  const c = { ...COPY };
  for (const k of Object.keys(COPY)) if (d[k]) c[k] = d[k];
  const work = d.cards?.length ? d.cards.map(toCard) : WORK;

  const { trackRef, atStart, atEnd, updateEdges, scrollByCard } =
    useSliderTrack(".workshow-card");

  return (
    <section className="workshow-section">
      <div className="container">
        <div className="workshow-head">
          <h2 className="workshow-heading">
            {c.headA}
                    <span className="workshow-accent">{c.accent}</span>
          </h2>

          <SliderNav
            atStart={atStart}
            atEnd={atEnd}
            onScroll={scrollByCard}
            theme="dark"
          />
        </div>
      </div>

      <div className="workshow-track-wrap">
        <div className="workshow-track" ref={trackRef} onScroll={updateEdges}>
          {work.map((item, i) => (
            <article className="workshow-card" key={item.name + i}>
              <Link href={item.href} className="workshow-media">
                <img src={item.img} alt={item.name} loading="lazy" />
              </Link>

              <div className="workshow-stats">
                {item.stats.map((stat, n) => (
                  <div className="workshow-stat" key={stat.label + n}>
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>

      

      {/* Phone layout puts the arrows under the rail, right-aligned; the copy
          in the head is hidden below 1024 and this one above it. Both drive the
          same shared scroll state. */}
      <div className="container workshow-nav-below">
        <SliderNav
          atStart={atStart}
          atEnd={atEnd}
          onScroll={scrollByCard}
          theme="dark"
        />
      </div>
    </section>
  );
}
