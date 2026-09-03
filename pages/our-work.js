import React from "react";
import Hero from "../components/our-work/Hero";
import Topbar from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Work from "../components/our-work/Work";
import CTA from "../components/home/CTA";
import Offcanvas from "../components/header/Offcanvas";
import PageFaq from "../components/PageFaq";
import { getPageFaq } from "../utils/pageFaq";

export default function ourWork({ faq }) {
  return (
    <div className="bg-dark">
      <Topbar />
      <Offcanvas />
      <Hero />
      <Work />
      <CTA />
      <PageFaq faq={faq} topClass="pt-80" />
      <Footer />
    </div>
  );
}

// FAQ block content comes from the payroll admin (Website → FAQs).
export async function getStaticProps() {
  return { props: { faq: await getPageFaq("our-work") }, revalidate: 60 };
}
