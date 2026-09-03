import React from 'react'
import Topbar from '../../components/header/Header'
import Offcanvas from '../../components/header/Offcanvas'
import Footer from '../../components/footer/Footer'
import CoreTask from '../../components/our-services/seo/CoreTask'
import Process from '../../components/our-services/seo/Process'
import CTA from '../../components/home/CTA'
import Significance from '../../components/our-services/seo/Significance'
import SolidReasons from '../../components/our-services/seo/SolidReasons'
import Testimonials from "../../components/home/Testimonials";
import Form from "../../components/home/Form";
import PageFaq from "../../components/PageFaq";
import { getPageFaq } from "../../utils/pageFaq";
import Blogs from '../../components/our-services/seo/Blogs'
import Hero from '../../components/our-services/seo/Hero'

export default function Seo({ faq }) {
  return (
    <div className='bg-dark'>  
         <Topbar/>
         <Hero/>

         <CoreTask/>
         <Process/>
         
         <CTA/>
         <Significance/>
         <SolidReasons/>

         <div className="parallax-container">
          <Testimonials />
          <Form />
          </div>
          <PageFaq faq={faq} topClass="pt-80" />
          <Blogs/>
          <CTA/>
         <Offcanvas />
         <Footer/>
         
    </div>
  )
}

// FAQ block content comes from the payroll admin (Website → FAQs).
export async function getStaticProps() {
  return { props: { faq: await getPageFaq("our-services/seo") }, revalidate: 60 };
}
