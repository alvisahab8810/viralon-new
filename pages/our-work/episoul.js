import React from "react";
import Hero from "../../components/our-work/Hero";
import Topbar from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Work from "../../components/our-work/Work";
import CTA from "../../components/home/CTA";
import Offcanvas from "../../components/header/Offcanvas";

export default function ourWork() {
  return (
    <div className="bg-dark">
      <Topbar />
      <Offcanvas />
      <Hero />
      {/* <Work /> */}
      <div className="container">
        <div className="our-work-images">
          <img src="/assets/img/our-work/episoul.webp" alt="episoul"></img>
        </div>
      </div>
      <CTA />
      <Footer />
    </div>
  );
}
