// components/career/Openings.js — every open role on /career.
//
// This replaces the two category cards the page used to carry: both groups are
// listed here, one grid each, so a visitor sees the actual roles rather than a
// door to them. A card is the whole advert in short -- what it is, how it runs,
// how much experience it wants -- and the button is the only thing that leads
// anywhere, to /jobs/<slug>.
//
// The posts come from the payroll admin (Website -> Job Positions) through the
// page's own getStaticProps, so they are in the server's markup and a crawler
// reads them without running any JavaScript.
//
// A group with nothing open renders nothing at all, heading included: an empty
// grid under a title reads as a broken page.
//
// Styles live at the end of custome.css, responsive steps at the end of
// responsive.css. Every rule is prefixed .career-openings because the page is
// wrapped in .bg-dark, whose `h1..h6 { color: var(--white) }` in style.css
// would otherwise take the accent off the headings.
import React from "react";
import Link from "next/link";

const FALLBACK_IMAGE = "/assets/img/careers/img1.webp";

// Experienced roles first, interns under them, the way the frame draws it.
const GROUPS = [
  { key: "experienced", headA: "Experienced", headB: "Professional" },
  { key: "internship", headA: "Internship", headB: "Program" },
];

const COPY = {
  experienceLabel: "Experienced :",
  ctaText: "Apply Now",
};

export default function Openings({ jobs = [], d = {} }) {
  const c = { ...COPY };
  for (const k of Object.keys(COPY)) if (d[k]) c[k] = d[k];

  return (
    <section className="career-openings">
      <div className="container">
        {GROUPS.map((group) => {
          const list = jobs.filter((j) => j.category === group.key);
          if (!list.length) return null;

          return (
            <div className="cop-group" key={group.key}>
              <h2 className="cop-heading">
                <span className="cop-accent">{group.headA}</span> {group.headB}
              </h2>

              <ul className="cop-grid">
                {list.map((job, i) => (
                  <li className="cop-card" key={job.slug || i}>
                    {/* Decorative: the role is named in the heading under it. */}
                    <div className="cop-media">
                      <img
                        src={job.image || FALLBACK_IMAGE}
                        alt=""
                        loading="lazy"
                      />
                    </div>

                    <div className="cop-body">
                      <h3 className="cop-title">{job.title}</h3>

                      {job.jobType ? (
                        <p className="cop-meta">{job.jobType}</p>
                      ) : null}

                      {job.experience ? (
                        <p className="cop-meta">
                          {c.experienceLabel} {job.experience}
                        </p>
                      ) : null}

                      <Link href={`/jobs/${job.slug}`} className="cop-cta">
                        <span className="cop-cta-text">{c.ctaText}</span>
                        <span className="cop-cta-icon" aria-hidden="true">
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 14 14"
                            fill="none"
                          >
                            <path
                              d="M3 11L11 3M11 3H4.5M11 3V9.5"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
