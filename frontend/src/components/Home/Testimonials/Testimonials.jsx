import React from 'react'
import { Testimonial } from './Testimonial'

function Testimonials() {
  return (
    <div className=''>
        <h1 className='text-3xl font-bold text-center mb-2 mt-10'>Client Testimonials</h1>
        <p className='text-center mb-10 text-gray-500'>Hear from our satisfied clients</p>

    <div className=' flex gap-10 justify-center items-center flex-wrap'>
        <Testimonial/>
        <Testimonial/>
        <Testimonial/>
    </div>
    </div>
  )
}

export default Testimonials