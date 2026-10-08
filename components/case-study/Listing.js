// components/case-study/Listing.js — the index at /case-study: every study
// published from the payroll admin (Website → Case Studies), newest-first
// behind whatever order the home rail was given.
//
// The banner, the filter chips and the search box are the design's; the chips
// are built from the tags the records actually carry rather than from a fixed
// list, so a new tag in the admin shows up here without a deploy.
//
// Like the rest of components/case-study/*, this is the site's look copied
// rather than a shared section reused: the cards are drawn from database
// records, and a shared component would carry an edit here onto pages that
// have to stay fixed. Styles live at the end of custome.css, responsive steps
// at the end of responsive.css, every rule prefixed .csl- because style.css
// sets `.bg-dark h1..h6 { color: white }`.
import React, { useMemo, useState } from "react";
import Link from "next/link";

import Form from "../home/Form";

const HERO_IMAGE = "/assets/others/case-study-hero.webp";

// How many cards go by before the query panel is dropped into the grid. Two
// rows of four, which is what the design shows.
const CTA_EVERY = 8;

const ALL = "All Projects";

// A card shows whatever picture the record happens to carry: the home rail's
// image first, because it is cropped for a card, then the hero still, then the
// logo. A study with none of them simply prints without one.
const cardImage = (study) =>
  study?.home?.image ||
  study?.hero?.media?.image ||
  study?.hero?.media?.poster ||
  study?.brandLogo ||
  "";

const summary = (study) => study?.home?.body || study?.hero?.intro || "";

// Everything a visitor might reasonably type, flattened once per study so the
// search box is a single string comparison rather than a walk of the record.
const haystack = (study) =>
  [study.brandName, study.category, summary(study), ...(study.tags || [])]
    .join(" ")
    .toLowerCase();

// The grid is cut into runs of CTA_EVERY so the panel can sit between them.
function chunk(list, size) {
  const out = [];
  for (let i = 0; i < list.length; i += size) out.push(list.slice(i, i + size));
  return out;
}

export default function Listing({ studies = [] }) {
  const [filter, setFilter] = useState(ALL);
  const [query, setQuery] = useState("");

  // One chip per tag in use, in the order the studies are listed, so the row
  // reads the same way the grid below it does.
  const filters = useMemo(() => {
    const seen = [];
    for (const study of studies) {
      for (const tag of study.tags || []) {
        if (!seen.includes(tag)) seen.push(tag);
      }
    }
    return [ALL, ...seen];
  }, [studies]);

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return studies.filter((study) => {
      if (filter !== ALL && !(study.tags || []).includes(filter)) return false;
      return !q || haystack(study).includes(q);
    });
  }, [studies, filter, query]);

  const runs = chunk(shown, CTA_EVERY);

  return (
    <>
      <section className="csl-hero">
        <img alt="" className="csl-hero-banner" src={HERO_IMAGE} />
        <div className="container">
          <h1 className="csl-hero-title">Case Studies</h1>
          <p className="csl-hero-intro">
            Explore our portfolio of transformative design projects that have
            helped brands stand out and achieve exceptional results.
          </p>
        </div>
      </section>

      <section className="csl-section">
        <div className="container">
          <div className="csl-controls">
            <div className="csl-chips">
              {filters.map((tag) => (
                <button
                  className={`csl-chip${tag === filter ? " is-on" : ""}`}
                  key={tag}
                  onClick={() => setFilter(tag)}
                  type="button"
                >
                  {tag}
                </button>
              ))}
            </div>

            <label className="csl-search">
              <span className="csl-search-icon" aria-hidden="true" />
              <input
                aria-label="Search projects"
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects..."
                type="search"
                value={query}
              />
            </label>
          </div>
        </div>

        {shown.length ? (
          runs.map((run, i) => (
            <React.Fragment key={i}>
              <div className="container">
                <div className="csl-grid">
                  {run.map((study) => {
                    const img = cardImage(study);
                    const body = summary(study);
                    const stats = (study.hero?.stats || []).slice(0, 3);
                    return (
                      <Link
                        className="csl-card"
                        href={`/case-study/${study.slug}`}
                        key={study.slug}
                      >
                        <span className="csl-media">
                          {img ? (
                            <img alt={study.brandName || "Case study"} src={img} />
                          ) : null}
                        </span>

                        <span className="csl-body">
                          <span className="csl-card-head">
                            <span className="csl-card-title">
                              {study.brandName}
                            </span>
                            <span className="csl-arrow" aria-hidden="true">
                              ↗
                            </span>
                          </span>

                          {body ? <span className="csl-text">{body}</span> : null}

                          {study.tags?.length ? (
                            <span className="csl-tags">
                              {study.tags.slice(0, 3).map((tag) => (
                                <span className="csl-tag" key={tag}>
                                  {tag}
                                </span>
                              ))}
                            </span>
                          ) : null}

                          {stats.length ? (
                            <span className="csl-stats">
                              {stats.map((stat) => (
                                <span className="csl-stat" key={stat.label}>
                                  <span className="csl-stat-value">
                                    {stat.value}
                                  </span>
                                  <span className="csl-stat-label">
                                    {stat.label}
                                  </span>
                                </span>
                              ))}
                            </span>
                          ) : null}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* The panel breaks the grid up every two rows. The last run is
                  left alone: the page already closes with one. */}
              {i < runs.length - 1 ? <Form /> : null}
            </React.Fragment>
          ))
        ) : (
          // Either nothing is published yet or the filters have excluded
          // everything; an empty grid reads as a broken layout either way.
          <div className="container">
            <p className="csl-empty">
              {studies.length ? (
                "Nothing matches that. Try another tag, or clear the search."
              ) : (
                <>
                  The first write-ups are being finished. In the meantime,{" "}
                  <Link href="/contact-us">tell us what you are working on</Link>.
                </>
              )}
            </p>
          </div>
        )}
      </section>
    </>
  );
}
