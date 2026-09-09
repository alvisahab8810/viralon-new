import React from "react";
import Topbar from "../../components/header/Header";
import Offcanvas from "../../components/header/Offcanvas";
import Footer from "../../components/footer/Footer";
import Hero from "../../components/our-services/email-markering/Hero";
import CoreTask from "../../components/our-services/email-markering/CoreTask";
import Process from "../../components/our-services/email-markering/Process";
import CTA from "../../components/home/CTA";
import Significance from "../../components/our-services/email-markering/Significance";
import SolidReasons from "../../components/our-services/email-markering/SolidReasons";
import Form from "../../components/home/Form";
import PageFaq from "../../components/PageFaq";
import { getPageFaq } from "../../utils/pageFaq";
import LatestBlogs from "../../components/common/LatestBlogs";

export default function EmailMarketing({ faq }) {
  return (
    <div className="bg-dark" id="email-marketing">
      <Topbar />
      <Hero />
      <CoreTask />
      <Process />
      {/* <CTA /> */}
      <Significance />
      <SolidReasons />
      {/* <Form variant="light" /> */}
      <PageFaq faq={faq} topClass="pt-80" variant="light" />
      <LatestBlogs />
      {/* <CTA /> */}
      <Offcanvas />
      <Footer />
    </div>
  );
}

// FAQ block content comes from the payroll admin (Website → FAQs).
export async function getStaticProps() {
  return { props: { faq: await getPageFaq("our-services/email-marketing") }, revalidate: 60 };
}
