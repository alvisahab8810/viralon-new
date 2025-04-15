import React from 'react'
import Topbar from '../../components/header/Header'
import Offcanvas from '../../components/header/Offcanvas'
import Footer from '../../components/footer/Footer'
import Hero from '../../components/seo/Hero'
import CoreTask from '../../components/seo/CoreTask'
import Process from '../../components/seo/Process'
import CTA from '../../components/home/CTA'
import Significance from '../../components/seo/Significance'
import SolidReasons from '../../components/seo/SolidReasons'
export default function Seo() {
  return (
    <div className='bg-dark'>  
         <Topbar/>
         <Hero/>
         <CoreTask/>
         <Process/>
         
         <CTA/>
         <Significance/>
         <SolidReasons/>
         <Offcanvas />
         <Footer/>
         
    </div>
  )
}
