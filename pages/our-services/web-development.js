import React from "react";
import Topbar from "../../components/header/Header";
import Offcanvas from "../../components/header/Offcanvas";
import Footer from "../../components/footer/Footer";
import CTA from "../../components/home/CTA";
import Testimonials from "../../components/home/Testimonials";
import Form from "../../components/home/Form";
import FAQ from "../../components/our-services/web-development/FAQ";
import Blogs from "../../components/our-services/seo/Blogs";
import Hero from "../../components/our-services/web-development/Hero";
import Slider from "../../components/our-services/web-development/Slider";
import CoreTask from "../../components/our-services/web-development/CoreTask";
import Process from "../../components/our-services/web-development/Process";
import Significance from "../../components/our-services/web-development/Significance";
import SolidReasons from "../../components/our-services/web-development/SolidReasons";

export default function ProductPackaging() {
  return (
    <div className="bg-dark" id="web-development">
      <Topbar />
      <Slider />
      <Hero />
      <CoreTask />
      <Process />
      <CTA />
      <Significance />
      <SolidReasons />
      <div className="parallax-container">
        <Testimonials />
        <Form />
      </div>
      <FAQ />
      <Blogs />
      <CTA />
      <Offcanvas />
      <Footer />
    </div>
  );
}
