import React from "react";
import Topbar from "../../components/header/Header";
import Offcanvas from "../../components/header/Offcanvas";
import Footer from "../../components/footer/Footer";

import CTA from "../../components/home/CTA";


import Testimonials from "../../components/home/Testimonials";
import Form from "../../components/home/Form";
import FAQ from "../../components/our-services/paid-media-marketing/FAQ";
import Blogs from "../../components/our-services/seo/Blogs";
import Hero from "../../components/our-services/brand-identity-design/Hero";
import Slider from "../../components/our-services/brand-identity-design/Slider";
import CoreTask from "../../components/our-services/brand-identity-design/CoreTask";
import Process from "../../components/our-services/brand-identity-design/Process";
import Significance from "../../components/our-services/brand-identity-design/Significance";
import SolidReasons from "../../components/our-services/brand-identity-design/SolidReasons";
import OurWork from "../../components/our-services/brand-identity-design/OurWork";

export default function BrandIdentityDesign() {
  return (
    <div className="bg-dark" id="brand-identity">
      <Topbar />
      <Slider/>
      <Hero/>
      <OurWork/>
       <CoreTask/>
      <Process/>
      <CTA />
      <Significance/>
      <SolidReasons/>

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
