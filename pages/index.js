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
import Faq from "../components/home/Faq";

export default function IndexPage({ data }) {
  

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
      <Faq/>
      <Blogs/>
      <CTA />
      <Footer />
    </section>
  );
}
