// components/PageFaq.js — the site-wide FAQ block, now driven by the payroll
// admin (Website → FAQs, shared Mongo "pagefaqs" collection) instead of being
// hard-coded once per page.
//
// The markup is a byte-for-byte match of the old components/**/FAQ.js files —
// same .faq-section wrapper, same Bootstrap accordion, same "01/02/03" numbers
// and the same +/− toggle — so nothing about the design changes. The only
// additions are unique element ids per page (several accordions could
// otherwise collide) and HTML answers, which the admin editor can now fill
// with links.
//
// The page passes its own set in from getStaticProps:
//   import { getPageFaq } from "../utils/pageFaq";
//   <PageFaq faq={faq} />
// With no published set the component renders nothing.
import React from "react";

const pad2 = (n) => String(n).padStart(2, "0");

export default function PageFaq({ faq, topClass = "pt-80" }) {
  const items = (faq?.items || []).filter((it) => it?.question || it?.answer);
  if (!items.length) return null;

  // Ids have to be unique per page (and valid CSS selectors for Bootstrap's
  // data-bs-target), so derive them from the page key.
  const base = `faq-${String(faq.pageKey || "page").replace(/[^a-zA-Z0-9]+/g, "-")}`;

  return (
    <>
      <section className={`faq-section ${topClass}`}>
        <div className="container ">
          <div className="text-center">
            <p className="text-orange">{faq.kicker || "Still Having Queries ?"}</p>
            <h2 className="display-4 fw-bold mt-2">
              {faq.heading || "Frequently Asked Questions"}
            </h2>
          </div>
          <div className="mt-5">
            <div className="accordion" id={base}>
              {items.map((it, i) => {
                const first = i === 0;
                const headId = `${base}-h${i}`;
                const bodyId = `${base}-c${i}`;
                return (
                  <div className="accordion-item" key={i}>
                    <h2 className="accordion-header" id={headId}>
                      <button
                        className={`accordion-button ${first ? "show" : "collapsed"}`}
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#${bodyId}`}
                        aria-expanded="false"
                        aria-controls={bodyId}
                      >
                        <span className="fs-3 fw-bold me-3">{pad2(i + 1)}</span> {it.question}
                      </button>
                    </h2>
                    <div
                      id={bodyId}
                      className={`accordion-collapse collapse${first ? " show" : ""}`}
                      aria-labelledby={headId}
                      data-bs-parent={`#${base}`}
                    >
                      <div
                        className="accordion-body faq-rich"
                        dangerouslySetInnerHTML={{ __html: it.answer || "" }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {faq.footerText !== "" && (
            <div className="text-end mt-5">
              <p className="text-orange fs-24">{faq.footerText || "Ask Your Queries..."}</p>
            </div>
          )}
        </div>
      </section>

      {/* Answers used to be bare text; they are rich HTML now, so keep the
          paragraph spacing identical to the old plain-text body and give links
          the brand coral. */}
      <style jsx global>{`
        .faq-section .accordion-body.faq-rich > :first-child { margin-top: 0; }
        .faq-section .accordion-body.faq-rich > :last-child { margin-bottom: 0; }
        .faq-section .accordion-body.faq-rich ul,
        .faq-section .accordion-body.faq-rich ol { padding-left: 1.2rem; margin-bottom: 0.5rem; }
        .faq-section .accordion-body.faq-rich a { color: #ff6f61; text-decoration: underline; }
        .faq-section .accordion-body.faq-rich a:hover { color: #fba065; }
      `}</style>
    </>
  );
}
