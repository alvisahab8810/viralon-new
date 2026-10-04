// pages/index.js
//
// The bands between the header and the footer are no longer listed here: they
// come from the home record the CRM holds (Website → Pages → Home page) and
// are rendered by components/home/HomeBands.js, so an admin can reorder,
// park, duplicate or re-word any of them without a deploy. Nothing stored
// means every component renders the copy written in its own file, so the page
// is unchanged until somebody saves it once.
//
// The head is the record saved under Website → Pages → Home page → SEO, and
// its JSON-LD is finished here rather than in the editor: a FAQPage block is
// built from the questions the page actually shows, and a WebPage block when
// nobody wrote any schema at all, so the structured data cannot drift from
// the page.
import React from "react";
import PageSeo from "../components/PageSeo";
import Topbar from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Offcanvas from "../components/header/Offcanvas";
import HomeBands from "../components/home/HomeBands";
import { pageStaticProps } from "../utils/pageSeo";
import { getPageFaq } from "../utils/pageFaq";
import { getHomeCaseStudies } from "../utils/caseStudy";
import { getHomeSections } from "../utils/homePage";
import { allFaqs } from "../utils/sampleSchema";
import { fromPageSeo, pageSchemas } from "../utils/landingSeo";

const FALLBACK_TITLE =
  "Viralon | Best Digital Marketing Agency For Revenue Growth";

export default function IndexPage({ seo, faqs, caseStudies, sections, schemas }) {
  return (
    <section id="home" className="bg-dark">
      {/* Whatever the admin saved in Website → Pages → Home page → SEO,
          falling back to the title the page always carried. */}
      <PageSeo
        seo={seo}
        path="/"
        schemas={schemas}
        fallback={{ title: FALLBACK_TITLE, description: "" }}
      />
      <Topbar />
      <Offcanvas />

      <HomeBands sections={sections} faqs={faqs} caseStudies={caseStudies} />

      <div className="parallax-container"></div>

      <Footer />
    </section>
  );
}

// FAQ block content comes from the payroll admin (Website → FAQs), and so do
// the case studies in the rail — each logo links to its own /case-study page.
const basePageProps = pageStaticProps("home");

export async function getStaticProps(ctx) {
  const base = await basePageProps(ctx);
  const sections = await getHomeSections();

  // The FAQ band can borrow any published set, so whichever ones the bands
  // ask for are fetched here; "home" is always loaded, as the default.
  const faqs = {};
  if (base.props.faq) faqs.home = base.props.faq;
  for (const key of new Set(
    sections
      .filter((s) => s?.type === "faqform" && s?.data?.faqKey)
      .map((s) => s.data.faqKey)
  )) {
    if (!faqs[key]) faqs[key] = await getPageFaq(key);
  }

  const seo = base.props.seo;
  const schemas = pageSchemas(
    fromPageSeo({ ...(seo || {}), title: seo?.title || FALLBACK_TITLE }, "/"),
    allFaqs(sections, faqs)
  );

  return {
    ...base,
    props: {
      ...base.props,
      caseStudies: await getHomeCaseStudies(),
      sections,
      faqs: JSON.parse(JSON.stringify(faqs)),
      schemas,
    },
  };
}
