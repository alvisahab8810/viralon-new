import React from "react";
import Topbar from "../../components/header/Header";
import Offcanvas from "../../components/header/Offcanvas";
import Footer from "../../components/footer/Footer";
import CTA from "../../components/home/CTA";
import Form from "../../components/home/Form";
import PageFaq from "../../components/PageFaq";
import { getPageFaq } from "../../utils/pageFaq";
import LatestBlogs from "../../components/common/LatestBlogs";
import Hero from "../../components/our-services/brand-identity-design/Hero";
import Slider from "../../components/our-services/brand-identity-design/Slider";
import CoreTask from "../../components/our-services/brand-identity-design/CoreTask";
import Process from "../../components/our-services/brand-identity-design/Process";
import Significance from "../../components/our-services/brand-identity-design/Significance";
import SolidReasons from "../../components/our-services/brand-identity-design/SolidReasons";
import OurWork from "../../components/our-services/brand-identity-design/OurWork";

export default function BrandIdentityDesign({ faq }) {
  return (
    <div className="bg-dark" id="brand-identity">
      <Topbar />
      <Slider/>
      <Hero/>
      <OurWork/>
       <CoreTask/>
      <Process/>
      {/* <CTA /> */}
      <Significance/>
      <SolidReasons/>

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
  return { props: { faq: await getPageFaq("our-services/brand-identity-design") }, revalidate: 60 };
}
