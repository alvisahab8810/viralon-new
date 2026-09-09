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
import { getPageFaq } from "../utils/pageFaq";

export default function career({ faq }) {
  return (
    <div className="bg-dark">
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
export async function getStaticProps() {
  return { props: { faq: await getPageFaq("career") }, revalidate: 60 };
}
