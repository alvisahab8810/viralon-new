// pages/website-and-cro.js
//
// The bands between the header and the footer are no longer listed here: they
// come from the record the CRM holds (Website -> Pages -> Website & CRO) and
// are rendered by components/website-and-cro/WebsiteCroBands.js, so an admin
// can reorder, park, duplicate or re-word any of them without a deploy.
// Nothing stored means every component renders the copy written in its own
// file, so the page is unchanged until somebody saves it once.
//
// The head is the record saved under Website -> Pages SEO (or the page's own
// SEO tab), and its JSON-LD is finished in utils/sitePageProps.js from the
// questions the page actually shows.
import React from "react";
import Topbar from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Offcanvas from "../components/header/Offcanvas";
import WebsiteCroBands from "../components/website-and-cro/WebsiteCroBands";
import PageSeo from "../components/PageSeo";
import { siteStaticProps } from "../utils/sitePageProps";

const FALLBACK_TITLE = "Website Design & CRO | Viralon";
const FALLBACK_DESCRIPTION =
  "Sites built to convert, and the leaks in the one you already have found and fixed.";

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

export default function WebsiteAndCro({ seo, schemas, sections, faqs }) {
  return (
    <div className="website-and-cro-page">
      <PageSeo
        seo={seo}
        path="/website-and-cro"
        schemas={schemas}
        fallback={{ title: FALLBACK_TITLE, description: FALLBACK_DESCRIPTION }}
      />
      <Topbar />
      <Offcanvas />

      <WebsiteCroBands sections={sections} faqs={faqs} />

      <Footer />
    </div>
  );
}

// Bands, FAQ sets and structured data, all keyed on the page's own key.
export const getStaticProps = siteStaticProps("website-and-cro", {
  fallbackTitle: FALLBACK_TITLE,
  fallbackFaq: FALLBACK_FAQ,
});
