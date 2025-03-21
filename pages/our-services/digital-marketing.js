import React from 'react'
import Topbar from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import Offcanvas from "../../components/header/Offcanvas";
import Testimonials from "../../components/home/Testimonials";
import Form from "../../components/home/Form";
import CTA from "../../components/home/CTA";
import Hero from '../../components/our-services/digital-marketing/Hero'
import Strap from '../../components/our-services/digital-marketing/Strap'
import Partnering from "../../components/home/Partnering";
import FAQ from '../../components/our-services/digital-marketing/FAQ';


export default function DigitalMarketing() {
  return (
    <div className='bg-dark'>
        <Topbar/>
        <Offcanvas />
        <Hero/>
        <Strap/>
        <Partnering />
        <div className='main-class container'>
        <Testimonials />
        <Form />
        </div>
        <FAQ/>
        <CTA />
        <Footer/>
    </div>
  )
}
