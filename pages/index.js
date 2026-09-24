// pages/index.js
import React, { useEffect, useState } from "react";
import PageSeo from "../components/PageSeo";
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
// Cube-effect variant of the section above, rendered alongside it so the two
// can be compared. Drop one of the two lines below once you have picked.
import BuildItForCube from "../components/home/BuildItForCube";
import SooSocial from "../components/home/SooSocial";
import CTA from "../components/home/CTA";
import LatestBlogs from "../components/common/LatestBlogs";
import PageFaq from "../components/PageFaq";
import { pageStaticProps } from "../utils/pageSeo";
import { getHomeCaseStudies } from "../utils/caseStudy";

export default function IndexPage({ data, faq, seo, caseStudies }) {
  

  return (
    <section id="home" className="bg-dark">
      {/* Whatever the admin saved in Website → Pages SEO, falling back to the
          title the page always carried -- "Viralon" alone was what the
          browser tab and Google both showed before. */}
      <PageSeo
        seo={seo}
        path="/"
        fallback={{
          title: "Viralon | Best Digital Marketing Agency For Revenue Growth",
          description: "",
        }}
      />
      <Topbar />
      <Offcanvas />
      <Hero />
      <Partnering />
      {/* Two layouts, one visible at a time -- swapped at 1023px in custome.css. */}
      <WeKnow />
      <WeKnowMobile />
      <SixParts />
      <BuildItFor />
      {/* <BuildItForCube /> */}

      <WorkShowcase cases={caseStudies} />
      <BrokenParts />
      <HowItRuns />
      <SooSocial />

      {/* <OurWork /> */}
      <div className="parallax-container">
      {/* <Testimonials /> */}
      {/* <Process /> */}
      {/* <Form /> */}
      </div>


      <PageFaq faq={faq}  variant="light" />

       <Form variant="light" />
      <LatestBlogs />
      {/* <CTA /> */}
      <Footer />
    </section>
  );
}

// FAQ block content comes from the payroll admin (Website → FAQs), and so do
// the case studies in the rail — each logo links to its own /case-study page.
const basePageProps = pageStaticProps("home");

export async function getStaticProps(ctx) {
  const base = await basePageProps(ctx);
  return {
    ...base,
    props: { ...base.props, caseStudies: await getHomeCaseStudies() },
  };
}
