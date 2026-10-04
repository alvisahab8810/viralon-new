// components/site/SiteBands.js — the renderer every menu page's bands go
// through, and the three bands all of them close with.
//
// A page hands this a map of band key → how to draw it; this walks the stored
// list, skips what is switched off and draws the rest in the stored order.
// No markup and no CSS of its own: the components are the ones the page has
// always rendered, each handed one stored band as `d`, so a page edited in the
// CRM cannot drift away from the page the design was approved on.
import React from "react";
import SooSocial from "../home/SooSocial";
import Form from "../home/Form";
import PageFaq from "../PageFaq";
import LatestBlogs from "../common/LatestBlogs";
import { faqDoc } from "../../utils/sampleSchema";

// The questions and the enquiry form travel together, the way every page on
// the site closes. The questions are the ones written into the band, the
// published set it borrows otherwise, and the page's own set as the last
// word — faqDoc picks, and the same call feeds the FAQPage schema in the page
// file, so the structured data cannot fall out of step with the page.
function FaqForm({ d, faqs, pageKey }) {
  const borrowed = faqs[d.faqKey] || faqs[pageKey] || null;
  return (
    <>
      <PageFaq faq={faqDoc(d, borrowed, pageKey)} variant="light" />
      <Form variant="light" />
    </>
  );
}

/* The closing three, identical on every page. A page spreads these into its
   own band map and adds the bands that are its own. */
export function sharedBands(pageKey) {
  return {
    soosocial: (d) => <SooSocial d={d} />,
    faqform: (d, x) => <FaqForm d={d} faqs={x.faqs || {}} pageKey={pageKey} />,
    // An empty box means "leave it as it is", so the component's own default
    // survives rather than being replaced by a blank heading.
    latestblogs: (d) => (
      <LatestBlogs title={d.title || undefined} subtitle={d.subtitle || undefined} />
    ),
  };
}

export default function SiteBands({ sections = [], bands = {}, ctx = {} }) {
  return (
    <>
      {sections
        .filter((s) => s && s.on !== false && bands[s.type])
        .map((s) => (
          <React.Fragment key={s.id || s.type}>
            {bands[s.type](s.data || {}, ctx)}
          </React.Fragment>
        ))}
    </>
  );
}
