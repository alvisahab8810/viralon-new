// components/home/HomeBands.js — the home page's bands, in whatever order and
// with whatever copy the CRM holds for them.
//
// Same idea as components/sample/SamplePage.js: no markup and no CSS of its
// own, just the home components handed one stored section each. Nothing has
// been moved out of a component — each one still carries the copy it shipped
// with, and renders that when the record says nothing — so the home page
// cannot go blank, and /dashboard/website/pages → Home page is the only place
// the live wording lives.
import React from "react";
import Hero from "./Hero";
import Partnering from "./Partnering";
import WeKnow from "./WeKnow";
import WeKnowMobile from "./WeKnowMobile";
import SixParts from "./SixParts";
import BuildItFor from "./BuildItFor";
import WorkShowcase from "./WorkShowcase";
import BrokenParts from "./BrokenParts";
import HowItRuns from "./HowItRuns";
import SooSocial from "./SooSocial";
import Form from "./Form";
import PageFaq from "../PageFaq";
import LatestBlogs from "../common/LatestBlogs";
import { faqDoc } from "../../utils/sampleSchema";

// The questions and the enquiry form travel together, the way every page on
// the site closes. The questions are the ones written into the band, the
// published set it borrows otherwise, and the home set as the last word —
// faqDoc picks. `faqs` maps a set key to its document because a band may
// point at any of them.
function FaqForm({ d, faqs }) {
  const borrowed = faqs[d.faqKey] || faqs.home || null;
  return (
    <>
      <PageFaq faq={faqDoc(d, borrowed, "home")} variant="light" />
      <Form variant="light" />
    </>
  );
}

const BANDS = {
  hero: (d) => <Hero d={d} />,
  partnering: (d) => <Partnering d={d} />,
  // One record, two compositions: the desktop one and the phone one are
  // different layouts rather than the same one reflowed, and custome.css
  // shows one at a time.
  weknow: (d) => (
    <>
      <WeKnow d={d} />
      <WeKnowMobile d={d} />
    </>
  ),
  sixparts: (d) => <SixParts d={d} />,
  builditfor: (d) => <BuildItFor d={d} />,
  workshowcase: (d, x) => <WorkShowcase cases={x.caseStudies} d={d} />,
  brokenparts: (d) => <BrokenParts d={d} />,
  howitruns: (d) => <HowItRuns d={d} />,
  soosocial: (d) => <SooSocial d={d} />,
  faqform: (d, x) => <FaqForm d={d} faqs={x.faqs} />,
  // An empty box means "leave it as it is", so the component's own default
  // survives rather than being replaced by a blank heading.
  latestblogs: (d) => (
    <LatestBlogs title={d.title || undefined} subtitle={d.subtitle || undefined} />
  ),
};

export default function HomeBands({ sections = [], faqs = {}, caseStudies = [] }) {
  return (
    <>
      {sections
        .filter((s) => s && s.on !== false && BANDS[s.type])
        .map((s) => (
          <React.Fragment key={s.id || s.type}>
            {BANDS[s.type](s.data || {}, { faqs, caseStudies })}
          </React.Fragment>
        ))}
    </>
  );
}
