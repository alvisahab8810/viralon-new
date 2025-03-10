import React from 'react'
import Hero from '../components/our-work/Hero'
import Topbar from '../components/header/Header'
import Footer from '../components/footer/Footer'
import Work from '../components/our-work/Work'
import CTA from '../components/home/CTA'

export default function ourWork() {
  return (
    <div className='bg-dark'>
       <Topbar/>
       <Hero/>
       <Work/>
       <CTA/>
       <Footer/>
    </div>
  )
}
