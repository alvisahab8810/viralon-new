import React from 'react'
import Topbar from '../components/header/Header'
import Footer from '../components/footer/Footer'
import CTA from '../components/home/CTA'
import Hero from '../components/career/Hero'
import Journey from '../components/career/Journey'
import Working from '../components/career/Working'
import Employes from '../components/career/Employes'

export default function career() {
  return (
    <div className='bg-dark'>
      <Topbar/>
      <Hero/>
      <Journey/>
      <Working/>
      <Employes/>
      <CTA/>
      <Footer/>
    </div>
  )
}
