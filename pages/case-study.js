// pages/case-study.js — the index of every published case study.
//
// This used to render the Search service page's sections, which are the same
// ones pages/search.js draws; the route now does what its name says and lists
// the studies, each card opening /case-study/[slug].
import React from "react";

import Topbar from "../components/header/Header";
import Offcanvas from "../components/header/Offcanvas";
import Footer from "../components/footer/Footer";
import PageSeo from "../components/PageSeo";
import PageFaq from "../components/PageFaq";
import SooSocial from "../components/home/SooSocial";
import Form from "../components/home/Form";
import LatestBlogs from "../components/common/LatestBlogs";
import Listing from "../components/case-study/Listing";

import { getCaseStudyList } from "../utils/caseStudy";
import { getPageSeo } from "../utils/pageSeo";
import { getPageFaq } from "../utils/pageFaq";

export default function CaseStudyIndex({ studies, faq, seo }) {
  return (
    <div className="bg-dark case-study-index">
      <PageSeo
        seo={seo}
        path="/case-study"
        fallback={{
          title: "Case Studies | Viralon",
          description:
            "What we changed, and what it moved — the numbers each engagement ended on.",
        }}
      />
      <Topbar />
      <Offcanvas />
      <Listing studies={studies} />
      <SooSocial />
      <PageFaq faq={faq} variant="light" />
      <Form />
      <LatestBlogs />
      <Footer />
    </div>
  );
}

// The head tags and the FAQ come from the payroll admin the same way every
// other page pulls them; the cards come from the "casestudies" collection, so
// publishing a study is all it takes to put it on this page.
export async function getStaticProps() {
  return {
    props: {
      studies: await getCaseStudyList(),
      seo: await getPageSeo("case-study"),
      faq: await getPageFaq("case-study"),
    },
    revalidate: 60,
  };
}
