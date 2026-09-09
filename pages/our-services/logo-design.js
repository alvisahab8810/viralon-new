import React from "react";
import Topbar from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import CTA from "../../components/home/CTA";
import Offcanvas from "../../components/header/Offcanvas";
import Hero from "../../components/our-services/logo-design/Hero";
import CoreTask from "../../components/our-services/logo-design/CoreTask";
import Process from "../../components/our-services/logo-design/Process";
import Significance from "../../components/our-services/logo-design/Significance";
import SolidReasons from "../../components/our-services/logo-design/SolidReasons";
import Form from "../../components/home/Form";
import PageFaq from "../../components/PageFaq";
import { getPageFaq } from "../../utils/pageFaq";
import LatestBlogs from "../../components/common/LatestBlogs";
import Slider from "../../components/our-services/logo-design/Slider";

export default function LogoDesgin({ faq }) {
  return (
    <div className="bg-dark" id="logo-design">
      <Topbar />
      <Slider/>
      <Hero />
      <CoreTask />
      <Process />
      {/* <CTA /> */}
      <Significance />
      <SolidReasons />
      {/* <Form variant="light" /> */}
      <PageFaq faq={faq} topClass="pt-100" variant="light" />
      <LatestBlogs />
      {/* <CTA/> */}
      <Offcanvas />
      <Footer />
    </div>
  );
}

// FAQ block content comes from the payroll admin (Website → FAQs).
export async function getStaticProps() {
  return { props: { faq: await getPageFaq("our-services/logo-design") }, revalidate: 60 };
}
