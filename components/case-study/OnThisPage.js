// components/case-study/OnThisPage.js — the rail pinned to the right of a
// case study.
//
// The list is not written anywhere: it is built from the sections that are
// switched on for this study, so turning a section off in the admin removes
// its line here too and the rail can never point at something that is not on
// the page.
//
// It tracks which section is in view rather than only reacting to clicks, so
// scrolling with the wheel keeps the rail honest.
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function OnThisPage({ sections = [], cta }) {
  const [active, setActive] = useState(sections[0]?.id || "");

  useEffect(() => {
    if (!sections.length) return;

    const nodes = sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean);
    if (!nodes.length) return;

    // The band across the upper third of the viewport decides what counts as
    // "the section you are reading" -- a whole-element test never fires for a
    // section taller than the window.
    const observer = new IntersectionObserver(
      (entries) => {
        const seen = entries.filter((e) => e.isIntersecting);
        if (seen.length) setActive(seen[0].target.id);
      },
      { rootMargin: "-10% 0px -70% 0px", threshold: 0 }
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [sections]);

  if (!sections.length) return null;

  return (
    <aside className="cs-toc" aria-label="On this page">
      <p className="cst-title">{cta?.title || "ON THIS PAGE"}</p>

      <ul className="cst-list">
        {sections.map((section) => (
          <li key={section.id}>
            <a
              className={"cst-link" + (active === section.id ? " is-on" : "")}
              href={`#${section.id}`}
            >
              <span className="cst-n">{section.number}</span>
              <span className="cst-label">{section.label}</span>
              <svg
                className="cst-chev"
                width="6"
                height="10"
                viewBox="0 0 6 10"
                fill="none"
                aria-hidden="true"
              >
                <path d="m1 1 4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </a>
          </li>
        ))}
      </ul>

      {cta?.ctaLabel ? (
        <Link className="cst-cta" href={cta.ctaHref || "/contact-us"}>
          {cta.ctaLabel}
        </Link>
      ) : null}
    </aside>
  );
}
