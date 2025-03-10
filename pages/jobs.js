import React from 'react'
import Topbar from '../components/header/Header'
import Footer from '../components/footer/Footer'
import Jobs from '../components/jobs/Jobs'
import Offcanvas from "../components/header/Offcanvas";

export default function JobsList() {
  return (
    <div className='bg-dark'>
      <Topbar/>
      <Offcanvas/>

      <Jobs/>
      <Footer/>
    </div>
  )
}
