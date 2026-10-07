// components/case-study/Listing.js — the index at /case-study: every study
// published from the payroll admin (Website → Case Studies), newest-first
// behind whatever order the home rail was given.
//
// Like the rest of components/case-study/*, this is the site's look copied
// rather than a shared section reused: the cards are drawn from database
// records, and a shared component would carry an edit here onto pages that
// have to stay fixed. Styles live at the end of custome.css, responsive steps
// at the end of responsive.css, every rule prefixed .csl- because style.css
// sets `.bg-dark h1..h6 { color: white }`.
import React from "react";
import Link from "next/link";

// The heading is stored in three pieces so the accent colour can land mid
// sentence; the card prints all three and colours the middle one.
function Heading({ heading = {} }) {
  return (
    <>
      {heading.lead}
      {heading.accent ? <span className="csl-accent">{heading.accent}</span> : null}
      {heading.tail}
    </>
  );
}

// A card shows whatever picture the record happens to carry: the home rail's
// image first, because it is cropped for a card, then the hero still, then the
// logo. A study with none of them simply prints without one.
const cardImage = (study) =>
  study?.home?.image ||
  study?.hero?.media?.image ||
  study?.hero?.media?.poster ||
  study?.brandLogo ||
  "";

export default function Listing({ studies = [] }) {
  return (
    <section className="csl-section">
      <div className="container">
        <div className="csl-head">
          <span className="csl-kicker">Case Studies</span>
          <h1 className="csl-title">
            The work, and what it <span className="csl-accent">actually moved</span>.
          </h1>
          <p className="csl-intro">
            Every engagement below is written up the same way: what was wrong,
            what we changed, and the numbers it ended on.
          </p>
        </div>

        {studies.length ? (
          <div className="csl-grid">
            {studies.map((study) => {
              const img = cardImage(study);
              const body = study.home?.body || study.hero?.intro || "";
              return (
                <Link
                  className="csl-card"
                  href={`/case-study/${study.slug}`}
                  key={study.slug}
                >
                  {img ? (
                    <span className="csl-media">
                      <img alt={study.brandName || "Case study"} src={img} />
                    </span>
                  ) : null}

                  <span className="csl-body">
                    {/* The identity strip is text only: the records carry a
                        photograph in `brandLogo` rather than a mark, and at
                        strip size it read as a smudge. The brand name stands in
                        where no category was written. */}
                    <span className="csl-brand">
                      {study.category ? null : (
                        <span className="csl-brand-name">{study.brandName}</span>
                      )}
                      {study.category ? (
                        <span className="csl-cat">{study.category}</span>
                      ) : null}
                      {study.dateLabel ? (
                        <span className="csl-date">{study.dateLabel}</span>
                      ) : null}
                    </span>

                    <span className="csl-card-title">
                      <Heading heading={study.hero?.heading} />
                    </span>

                    {body ? <span className="csl-text">{body}</span> : null}

                    {study.tags?.length ? (
                      <span className="csl-tags">
                        {study.tags.slice(0, 4).map((tag) => (
                          <span className="csl-tag" key={tag}>
                            {tag}
                          </span>
                        ))}
                      </span>
                    ) : null}

                    <span className="csl-cta">
                      {study.home?.ctaLabel || "Read Case Study"}
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        ) : (
          // Nothing published yet. The page still has to answer, and an empty
          // grid reads as a broken layout rather than as "none yet".
          <p className="csl-empty">
            The first write-ups are being finished. In the meantime,{" "}
            <Link href="/contact-us">tell us what you are working on</Link>.
          </p>
        )}
      </div>
    </section>
  );
}
