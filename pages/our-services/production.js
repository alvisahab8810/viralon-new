import React from 'react'
import Topbar from '../../components/header/Header'
import Offcanvas from '../../components/header/Offcanvas'
import Footer from '../../components/footer/Footer'
import CoreTask from '../../components/our-services/production/CoreTask'
import Process from '../../components/our-services/production/Process'
import CTA from '../../components/home/CTA'
import Significance from '../../components/our-services/production/Significance'
import SolidReasons from '../../components/our-services/production/SolidReasons'
import Testimonials from "../../components/home/Testimonials";
import Form from "../../components/home/Form";
import FAQ from '../../components/our-services/seo/FAQ'
import Blogs from '../../components/our-services/seo/Blogs'
import Hero from '../../components/our-services/production/Hero'

export default function Production() {
  return (
    <div className='bg-dark' id="prouduction">  
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
          <FAQ/>
          <Blogs/>
          <CTA/>
         <Offcanvas />
         <Footer/>
         
    </div>
  )
}
