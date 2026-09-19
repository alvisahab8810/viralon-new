import React from "react";
import Topbar from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Offcanvas from "../components/header/Offcanvas";
import Hero from "../components/paid-ads/Hero";
import Results from "../components/paid-ads/Results";
import ReturnOnSpend from "../components/paid-ads/ReturnOnSpend";
import WhatDecides from "../components/paid-ads/WhatDecides";
import Dashboards from "../components/paid-ads/Dashboards";
import SixSteps from "../components/paid-ads/SixSteps";
import Places from "../components/paid-ads/Places";
import Measure from "../components/paid-ads/Measure";
import SooSocial from "../components/home/SooSocial";
import PageFaq from "../components/PageFaq";
import Form from "../components/home/Form";
import LatestBlogs from "../components/common/LatestBlogs";
import { getPageFaq } from "../utils/pageFaq";

// Shown until someone publishes a "paid-ads" set in the payroll admin
// (Website -> FAQs). Same shape as a database document, so <PageFaq /> cannot
// tell the difference -- the moment a real set is published it wins and this
// block is never read again.
const FALLBACK_FAQ = {
  pageKey: "paid-ads",
  kicker: "Still Having Queries ?",
  heading: "Frequently Asked Questions",
  footerText: "Ask Your Queries...",
  items: [
    {
      question: "Is branding just a logo and a colour palette?",
      answer:
        "<p>No. The logo is the last thing we draw, not the first. Before it there are fourteen decisions — purpose, audience, difference, voice and the rest — and the mark is simply what those decisions look like once they are settled. A logo drawn before them is decoration, and decoration is what makes branding look good and sell nothing.</p>",
    },
    {
      question: "How long does a brand project take?",
      answer:
        "<p>Most identities run six to ten weeks end to end. Direction work — the strategy half — takes the first two to three; expression, the system and the rollout files fill the rest. A single-product or launch-critical brand can be compressed, but we will tell you what gets thinner when it is.</p>",
    },
    {
      question: "We already have a brand. Can you fix it instead of replacing it?",
      answer:
        "<p>Often that is the better call. We audit what you have against the same fourteen decisions, keep whatever is still earning its place — equity in a name or a mark is expensive to rebuild — and rework only what is actually holding the business back. A full rebuild is a recommendation we make, not a default we sell.</p>",
    },
    {
      question: "What do we actually receive at the end?",
      answer:
        "<p>A written brand direction, the full identity system — logo suite, colour, type, imagery rules — and the working files your team and any future agency will need. Plus the guidelines that keep asset twenty looking like asset three, which is the part that decides whether the investment holds.</p>",
    },
  ],
};

export default function PaidAds({ faq }) {
  return (
    <div className="bg-dark">
      <Topbar />
      <Offcanvas />
      <Hero />

      <Results />
      <ReturnOnSpend />
      <WhatDecides />
      <Dashboards />
      <SixSteps />
      <Places />
      <Measure />

      {/* Further sections land here, one screenshot at a time. */}
      
      
      
      
      
      
      


           <SooSocial />
    
            <PageFaq faq={faq || FALLBACK_FAQ} variant="light" />
      
             <Form variant="light" />
            <LatestBlogs />
   
      <Footer />
    </div>
  );
}

// FAQ block content comes from the payroll admin (Website -> FAQs), keyed on
// the page's own path. Returns null when nothing is published under "paid-ads",
// and <PageFaq /> then renders nothing at all.
export async function getStaticProps() {
  return { props: { faq: await getPageFaq("paid-ads") }, revalidate: 60 };
}
