import React from 'react'
import NavigationBar from '../NavigationBar/NavigationBar'
import { HeadCarouser } from '../HeadCarouser/HeadCarouser'
import BenifitCards from '../BenifitCards/BenifitCards'
import LspFinder from './LspFinder/LspFinder'
import ServiceProvided from './ServiceProvided/ServiceProvided'
import LawyerFinder from './LawyerFinder/LawyerFinder'
import Testimonials from './Testimonials/Testimonials'

function Home() {
  return (
    <div>
        {/* <NavigationBar/> */}
        <HeadCarouser/>
        {/* <LspFinder/> */}
        <BenifitCards/>
        <ServiceProvided/>
        <hr className='my-10'/>
        {/* <LawyerFinder/> */}
        <Testimonials/>
    </div>
  )
}

export default Home