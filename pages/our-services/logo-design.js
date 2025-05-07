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
import Testimonials from "../../components/home/Testimonials";
import Form from "../../components/home/Form";
import FAQ from "../../components/our-services/logo-design/FAQ";
import Blogs from "../../components/our-services/seo/Blogs";
import Slider from "../../components/our-services/logo-design/Slider";

export default function LogoDesgin() {
  return (
    <div className="bg-dark" id="logo-design">
      <Topbar />
      <Slider/>
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
      <FAQ/>
      <Blogs/>
      <CTA/>
      <Offcanvas />
      <Footer />
    </div>
  );
}




