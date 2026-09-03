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
      <OurWork />
      <div className="parallax-container">
      <Testimonials />
      <Process />
      <Form />
      </div>
      <Partnering />
      <PageFaq faq={faq} topClass="pt-80" />
      <Blogs/>
      <CTA />
      <Footer />
    </section>
  );
}

// FAQ block content comes from the payroll admin (Website → FAQs).
export async function getStaticProps() {
  return { props: { faq: await getPageFaq("home") }, revalidate: 60 };
}
