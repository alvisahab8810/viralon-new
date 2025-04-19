import React from "react";
import Topbar from "../../components/header/Header";
import Offcanvas from "../../components/header/Offcanvas";
import Footer from "../../components/footer/Footer";
import Hero from "../../components/our-services/paid-media-marketing/Hero";
import CoreTask from "../../components/our-services/paid-media-marketing/CoreTask";
import Process from "../../components/our-services/paid-media-marketing/Process";
import CTA from "../../components/home/CTA";
import Significance from "../../components/our-services/paid-media-marketing/Significance";
import SolidReasons from "../../components/our-services/paid-media-marketing/SolidReasons";
import Testimonials from "../../components/home/Testimonials";
import Form from "../../components/home/Form";
import FAQ from "../../components/our-services/paid-media-marketing/FAQ";
import Blogs from "../../components/our-services/seo/Blogs";

export default function PMM() {
  return (
    <div className="bg-dark">
      <Topbar />
      <Hero />
      <CoreTask />
      <Process />
      <CTA />
      <Significance />
      <SolidReasons />

      <div className="main-class container">
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
