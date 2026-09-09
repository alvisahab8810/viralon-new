// pages/index.js
import React, { useEffect, useState } from "react";
import CustomHead from "../components/CustomHead";
import Topbar from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Hero from "../components/home/Hero";
import Form from "../components/home/Form";
import Testimonials from "../components/home/Testimonials";
import Offcanvas from "../components/header/Offcanvas";
import OurWork from "../components/home/OurWork";
import Process from "../components/home/Process";
import Partnering from "../components/home/Partnering";
import WeKnow from "../components/home/WeKnow";
import WeKnowMobile from "../components/home/WeKnowMobile";
import SixParts from "../components/home/SixParts";
import WorkShowcase from "../components/home/WorkShowcase";
import BrokenParts from "../components/home/BrokenParts";
import HowItRuns from "../components/home/HowItRuns";
import BuildItFor from "../components/home/BuildItFor";
import SooSocial from "../components/home/SooSocial";
import CTA from "../components/home/CTA";
import Blogs from "../components/our-services/seo/Blogs"
import PageFaq from "../components/PageFaq";
import { getPageFaq } from "../utils/pageFaq";

export default function IndexPage({ data, faq }) {
  

  return (
    <section id="home" className="bg-dark">
      <CustomHead title="Viralon" keywords="" description="#" />
      <Topbar />
      <Offcanvas />
      <Hero />
      <Partnering />
      {/* Two layouts, one visible at a time -- swapped at 1023px in custome.css. */}
      <WeKnow />
      <WeKnowMobile />
      <SixParts />
      <WorkShowcase />
      <BrokenParts />
      <HowItRuns />
      <BuildItFor />
      <SooSocial />

      {/* <OurWork /> */}
      <div className="parallax-container">
      {/* <Testimonials /> */}
      {/* <Process /> */}
      {/* <Form /> */}
      </div>


      <PageFaq faq={faq}  variant="light" />

       <Form variant="light" />
      {/* <Blogs/> */}
      {/* <CTA /> */}
      <Footer />
    </section>
  );
}

// FAQ block content comes from the payroll admin (Website → FAQs).
export async function getStaticProps() {
  return { props: { faq: await getPageFaq("home") }, revalidate: 60 };
}
