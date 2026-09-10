import React from "react";
import Topbar from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Offcanvas from "../components/header/Offcanvas";
import Hero from "../components/contact-us/Hero";
import Contact from "../components/contact-us/Contact";
import PageFaq from "../components/PageFaq";
import { getPageFaq } from "../utils/pageFaq";

export default function ContactUs({ faq }) {
  return (
    <div className="bg-dark">
      <Topbar />
      <Offcanvas />
      <Hero />
      <Contact />
      <div className="container pb-80 iframe-box">
        {/* Embed code taken straight from Google Maps for the Parsvnath Planet
            office. Width is 100% instead of the pasted 600 so it fills the
            container the way the previous map did. */}
        <iframe
          title="Viralon Digital Services, Parsvnath Planet, Gomti Nagar, Lucknow"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.226274011782!2d81.00753817489334!3d26.864551162159575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399be3bc04249ba1%3A0x6b2d36aafc96188!2sParsvnath%20Planet!5e0!3m2!1sen!2sin!4v1789022202988!5m2!1sen!2sin"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        ></iframe>
      </div>
      <PageFaq faq={faq} topClass="pt-80" variant="light" />
      <Footer />
    </div>
  );
}

// FAQ block content comes from the payroll admin (Website → FAQs).
export async function getStaticProps() {
  return { props: { faq: await getPageFaq("contact-us") }, revalidate: 60 };
}
