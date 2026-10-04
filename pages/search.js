// pages/search.js
//
// The bands between the header and the footer are no longer listed here: they
// come from the record the CRM holds (Website -> Pages -> Search) and are
// rendered by components/search/SearchBands.js, so an admin can reorder, park,
// duplicate or re-word any of them without a deploy. Nothing stored means
// every component renders the copy written in its own file, so the page is
// unchanged until somebody saves it once.
//
// The head is the record saved under Website -> Pages SEO (or the page's own
// SEO tab), and its JSON-LD is finished in utils/sitePageProps.js from the
// questions the page actually shows.
import React from "react";
import Topbar from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Offcanvas from "../components/header/Offcanvas";
import SearchBands from "../components/search/SearchBands";
import PageSeo from "../components/PageSeo";
import { siteStaticProps } from "../utils/sitePageProps";

const FALLBACK_TITLE = "SEO & Search | Viralon";
const FALLBACK_DESCRIPTION =
  "Search work judged on enquiries and revenue, not rankings screenshots.";

// Shown until someone publishes a "search" set in the payroll admin
// (Website -> FAQs). Same shape as a database document, so <PageFaq /> cannot
// tell the difference -- the moment a real set is published it wins and this
// block is never read again.
const FALLBACK_FAQ = {
  pageKey: "search",
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

export default function Search({ seo, schemas, sections, faqs }) {
  return (
    <div className="bg-dark">
      <PageSeo
        seo={seo}
        path="/search"
        schemas={schemas}
        fallback={{ title: FALLBACK_TITLE, description: FALLBACK_DESCRIPTION }}
      />
      <Topbar />
      <Offcanvas />

      <SearchBands sections={sections} faqs={faqs} />

      <Footer />
    </div>
  );
}

// Bands, FAQ sets and structured data, all keyed on the page's own key.
export const getStaticProps = siteStaticProps("search", {
  fallbackTitle: FALLBACK_TITLE,
  fallbackFaq: FALLBACK_FAQ,
});
