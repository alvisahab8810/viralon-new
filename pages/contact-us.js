import React from "react";
import Topbar from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Offcanvas from "../components/header/Offcanvas";
import Hero from "../components/contact-us/Hero";
import Contact from "../components/contact-us/Contact";

export default function ContactUs() {
  return (
    <div className="bg-dark">
      <Topbar />
      <Offcanvas />
      <Hero />
      <Contact />
      <div className="container pb-80 iframe-box">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d113894.14584368252!2d80.92405032638395!3d26.865638513195115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x399be3591f162b99%3A0xec0c1d5692729281!2sUnit%20no-%201007%2C%20Dlf%20Mypad%2C%2010th%20Floor%2C%20Tower%20B1%2C%20Vibhuti%20Khand%2C%20Gomti%20Nagar%2C%20Lucknow%2C%20Uttar%20Pradesh%20226010!3m2!1d26.865662399999998!2d81.0064518!5e0!3m2!1sen!2sin!4v1747994718774!5m2!1sen!2sin"
          width="100%"
          height="450"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <Footer />
    </div>
  );
}
