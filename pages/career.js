import React from "react";
import Topbar from "../components/header/Header";
import Footer from "../components/footer/Footer";
import CTA from "../components/home/CTA";
import SooSocial from "../components/home/SooSocial";
import Hero from "../components/career/Hero";
import Journey from "../components/career/Journey";
import Openings from "../components/career/Openings";
import Working from "../components/career/Working";
import Employes from "../components/career/Employes";
import Offcanvas from "../components/header/Offcanvas";
import PageFaq from "../components/PageFaq";
import PageSeo from "../components/PageSeo";
import { getPageSeo } from "../utils/pageSeo";
import { getPageFaq } from "../utils/pageFaq";
import { getOpenJobs } from "../utils/openJobs";

export default function career({ faq, seo, jobs }) {
  return (
    <div className="bg-dark">
      <PageSeo
        seo={seo}
        path="/career"
        fallback={{
          title: "Careers | Viralon",
          description:
            "Open roles at Viralon and what it is like to work here.",
        }}
      />
      <Topbar />
      <Offcanvas />
      <Hero />
      <Journey />
      <Openings jobs={jobs} />
      <Working />
      <Employes />
      {/* <CTA /> */}
      <SooSocial />
      <PageFaq faq={faq} topClass="pt-80" variant="light" />
      <Footer />
    </div>
  );
}

// The head and the FAQ block come from the payroll admin (Website → Page SEO
// and Website → FAQs); the open roles come from Website → Job Positions. All
// three are read here rather than in the browser, so the roles are in the
// server's markup and a crawler sees them.
export async function getStaticProps() {
  return {
    props: {
      seo: await getPageSeo("career"),
      faq: await getPageFaq("career"),
      jobs: await getOpenJobs(),
    },
    revalidate: 60,
  };
}
