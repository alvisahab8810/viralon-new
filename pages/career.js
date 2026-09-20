import React from "react";
import Topbar from "../components/header/Header";
import Footer from "../components/footer/Footer";
import CTA from "../components/home/CTA";
import Hero from "../components/career/Hero";
import Journey from "../components/career/Journey";
import Working from "../components/career/Working";
import Employes from "../components/career/Employes";
import Offcanvas from "../components/header/Offcanvas";
import PageFaq from "../components/PageFaq";
import PageSeo from "../components/PageSeo";
import { pageStaticProps } from "../utils/pageSeo";

export default function career({ faq, seo }) {
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
      <Working />
      <Employes />
      <CTA />
      <PageFaq faq={faq} topClass="pt-80" variant="light" />
      <Footer />
    </div>
  );
}

// FAQ block content comes from the payroll admin (Website → FAQs).
export const getStaticProps = pageStaticProps("career");
