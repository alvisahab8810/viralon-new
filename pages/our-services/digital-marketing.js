import React from 'react'
import Topbar from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import Offcanvas from "../../components/header/Offcanvas";
import Form from "../../components/home/Form";
import CTA from "../../components/home/CTA";
import Hero from '../../components/our-services/digital-marketing/Hero'
import Strap from '../../components/our-services/digital-marketing/Strap'
import Partnering from "../../components/home/Partnering";
import PageFaq from "../../components/PageFaq";
import { getPageFaq } from "../../utils/pageFaq";
export default function DigitalMarketing({ faq }) {
  return (
    <div className='bg-dark'>
        <Topbar/>
        <Offcanvas />
        <Hero/>
        <Strap/>
        <Partnering />
      <Form variant="light" />
        <PageFaq faq={faq} topClass="pt-80" variant="light" />
        <CTA />
        <Footer/>
    </div>
  )
}

// FAQ block content comes from the payroll admin (Website → FAQs).
export async function getStaticProps() {
  return { props: { faq: await getPageFaq("our-services/digital-marketing") }, revalidate: 60 };
}
