// components/sample/SamplePage.js — renders a page the CRM built out of the
// /sample bands.
//
// /sample itself is still written by hand in pages/sample.js: it is the
// reference the design is tuned against. This renders the same bands in
// whatever order and with whatever copy is stored against a page, so an admin
// can make as many /sample-shaped pages as they like without anyone touching
// a file.
//
// There is no CSS here and no markup of its own beyond the page wrapper: every
// band is the same component /sample renders, handed one section's stored
// content as `d`. That is the whole point — a page built in the CRM cannot
// drift away from the page the design was approved on.
import React from "react";
import Hero from "./Hero";
import Results from "./Results";
import Statement from "./Statement";
import TheWork from "./TheWork";
import Parts from "./Parts";
import Industries from "./Industries";
import WhatYouGet from "./WhatYouGet";
import Audit from "./Audit";
import Layers from "./Layers";
import WhatDecides from "../website-and-cro/WhatDecides";
import TwoJobs from "../website-and-cro/TwoJobs";
import FiveSteps from "../website-and-cro/FiveSteps";
import Tech from "../website-and-cro/Tech";
import Measure from "../paid-ads/Measure";
import BuildItFor from "../home/BuildItFor";
import SooSocial from "../home/SooSocial";
import PageFaq from "../PageFaq";
import Form from "../home/Form";
import LatestBlogs from "../common/LatestBlogs";
import { faqDoc } from "../../utils/sampleSchema";

// The FAQ list and the enquiry form travel together, because that is how every
// page on the site closes. The questions are this page's own when somebody
// wrote them in the band, and a borrowed published set otherwise — faqDoc
// picks, and the same call feeds the FAQPage schema in pages/[slug].js. The
// form itself is the site's one lead form and has nothing to configure.
function FaqForm({ d, faqs, pageKey }) {
  const faq = faqDoc(d, faqs[d.faqKey] || null, pageKey);
  return (
    <>
      <PageFaq faq={faq} variant="light" />
      <Form variant="light" />
    </>
  );
}

const BANDS = {
  hero: (d) => <Hero d={d} />,
  results: (d) => <Results d={d} />,
  statement: (d) => <Statement d={d} />,
  thework: (d) => <TheWork d={d} />,
  parts: (d) => <Parts d={d} />,
  industries: (d) => <Industries d={d} />,
  whatyouget: (d) => <WhatYouGet d={d} />,
  audit: (d) => <Audit d={d} />,
  whatdecides: (d) => <WhatDecides d={d} />,
  layers: (d) => <Layers d={d} />,
  twojobs: (d) => <TwoJobs d={d} />,
  fivesteps: (d) => <FiveSteps d={d} />,
  measure: (d) => <Measure d={d} />,
  builditfor: (d) => <BuildItFor d={d} />,
  tech: (d) => <Tech d={d} />,
  soosocial: (d) => <SooSocial d={d} />,
  latestblogs: (d) => <LatestBlogs title={d.title} subtitle={d.subtitle} />,
  faqform: (d, extra) => (
    <FaqForm d={d} faqs={extra.faqs || {}} pageKey={extra.pageKey} />
  ),
};

// `sections` is the page's stored list; `faqs` maps a borrowed FAQ set's key
// to the published document for it, loaded on the server because a section may
// point at any set. `pageKey` only makes the accordion ids unique per page.
export default function SamplePage({ sections = [], faqs = {}, pageKey = "page" }) {
  return (
    <div className="sample-page">
      {sections
        .filter((s) => s && s.on !== false && BANDS[s.type])
        .map((s) => (
          <React.Fragment key={s.id || s.type}>
            {BANDS[s.type](s.data || {}, { faqs, pageKey })}
          </React.Fragment>
        ))}
    </div>
  );
}
