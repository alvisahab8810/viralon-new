import React from 'react'
import Topbar from '../components/header/Header'
import Footer from '../components/footer/Footer'
import Jobs from '../components/jobs/Jobs'

export default function JobsList() {
  return (
    <div className='bg-dark'>
      <Topbar/>
      <Jobs/>
      <Footer/>
    </div>
  )
}
