import React from "react";
import Topbar from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Offcanvas from "../components/header/Offcanvas";
import Hero from "../components/analytics-and-tracking/Hero";
import ThreeQuestions from "../components/analytics-and-tracking/ThreeQuestions";
import ConversionLoss from "../components/analytics-and-tracking/ConversionLoss";
import Mistake from "../components/analytics-and-tracking/Mistake";
import ThreeReports from "../components/analytics-and-tracking/ThreeReports";
import Audit from "../components/analytics-and-tracking/Audit";
import Results from "../components/website-and-cro/Results";
import ReturnOnSpend from "../components/website-and-cro/ReturnOnSpend";
import WhatDecides from "../components/website-and-cro/WhatDecides";
import Dashboards from "../components/website-and-cro/Dashboards";
import TwoJobs from "../components/website-and-cro/TwoJobs";
import FiveSteps from "../components/website-and-cro/FiveSteps";
import Tech from "../components/website-and-cro/Tech";
// The bands below still render the /website-and-cro components. This page is being
// rebuilt one section at a time: as each screenshot arrives, its component
// moves into components/analytics-and-tracking/ with this page's own copy and the
// import above it is swapped. Until then these stand in, so the page can be
// looked at whole rather than half-built.

import Measure from "../components/paid-ads/Measure";
import SooSocial from "../components/home/SooSocial";
import PageFaq from "../components/PageFaq";
import Form from "../components/home/Form";
import LatestBlogs from "../components/common/LatestBlogs";
import { getPageFaq } from "../utils/pageFaq";

// Shown until someone publishes a "website-and-cro" set in the payroll admin
// (Website -> FAQs). Same shape as a database document, so <PageFaq /> cannot
// tell the difference -- the moment a real set is published it wins and this
// block is never read again.
const FALLBACK_FAQ = {
  pageKey: "website-and-cro",
  kicker: "Still Having Queries ?",
  heading: "Frequently Asked Questions",
  footerText: "Ask Your Queries...",
  items: [
    {
      question: "Do we need a new website, or can the one we have be fixed?",
      answer:
        "<p>Usually it can be fixed, and usually that is the better call. We read what the traffic is already doing -- where people stop, on which device, at which field -- and the answer is normally four or five leaks rather than a rebuild. A new site is a recommendation we make when the structure itself is the problem, not a default we sell.</p>",
    },
    {
      question: "How long before we see the conversion rate move?",
      answer:
        "<p>The speed and mobile fixes show up in the numbers within days, because they cost you conversions on every visit. Anything that depends on a test needs enough traffic to be sure it is a result and not a good week -- for most sites that is three to six weeks per test. We will tell you which of the two you are looking at before we start.</p>",
    },
    {
      question: "How much traffic do we need for CRO to be worth it?",
      answer:
        "<p>Lower than most people assume. Split testing needs volume, but the leaks above do not -- a form asking for eight fields or a page taking six seconds is costing you whether you get a thousand visitors a month or a hundred thousand. Below roughly a thousand visits a month we fix the obvious and skip the testing, and we say so rather than billing for tests that cannot conclude.</p>",
    },
    {
      question: "What do we actually receive at the end?",
      answer:
        "<p>The audit with every leak priced against your own numbers, the rebuilt pages or components, and the test record -- what we changed, what it did, and what we left alone. Plus the tracking set up properly, so the next decision is read off data rather than argued in a meeting.</p>",
    },
  ],
};

export default function AnalyticsAndTracking({ faq }) {
  return (
    <div className="bg-dark">
      <Topbar />
      <Offcanvas />

      <Hero />
      <ThreeQuestions />
      <ConversionLoss />
      <Mistake />
      <ThreeReports />
      <Audit />

      {/* <Results /> */}
      {/* <ReturnOnSpend /> */}
      {/* <WhatDecides /> */}
      {/* <Dashboards /> */}
      {/* <TwoJobs /> */}
      {/* <FiveSteps /> */}
      {/* <Tech /> */}
      {/* <Measure /> */}

      <SooSocial />
      <PageFaq faq={faq || FALLBACK_FAQ} variant="light" />
      <Form variant="light" />
      <LatestBlogs />

      <Footer />
    </div>
  );
}

// FAQ block content comes from the payroll admin (Website -> FAQs), keyed on
// the page's own path. Returns null when nothing is published under
// "website-and-cro", and the block above stands in until it is.
export async function getStaticProps() {
  return { props: { faq: await getPageFaq("website-and-cro") }, revalidate: 60 };
}
