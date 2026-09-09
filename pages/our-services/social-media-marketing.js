import React from 'react'
import Topbar from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import Offcanvas from '../../components/header/Offcanvas'
import Hero from '../../components/our-services/social-media-marketing/Hero'
import OurWork from '../../components/our-services/social-media-marketing/OurWork'
import Strap from '../../components/our-services/digital-marketing/Strap'
import Instagram from '../../components/home/Instagram'
import Videos from '../../components/our-services/social-media-marketing/Videos'
import Partnering from '../../components/home/Partnering'
import Form from '../../components/home/Form'

import CTA from '../../components/home/CTA'
import PageFaq from "../../components/PageFaq";
import { getPageFaq } from "../../utils/pageFaq";
import LatestBlogs from "../../components/common/LatestBlogs";


export default function SocialMediaMarketing({ faq }) {
  return (
    <div className='bg-dark'id='smm'>
       <Topbar/>
       <Hero/>
       <OurWork/>
       <Strap/>
        <Videos/>
      
      {/* <Form variant="light" /> */}
        {/* <Partnering/> */}
        <PageFaq faq={faq} topClass="pt-100" variant="light" />
        <LatestBlogs />
        {/* <CTA/>   */}
       <Offcanvas/>
       <Footer/>
    </div>
  )
}

// FAQ block content comes from the payroll admin (Website → FAQs).
export async function getStaticProps() {
  return { props: { faq: await getPageFaq("our-services/social-media-marketing") }, revalidate: 60 };
}
