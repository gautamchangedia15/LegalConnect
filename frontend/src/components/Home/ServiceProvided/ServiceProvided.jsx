import React from 'react'
import ServiceCard from './ServiceCard/ServiceCard'

function ServiceProvided() {
  return (
    <div className='bg-gray-100 flex flex-col gap-20'>
        <h1 className='text-3xl font-bold text-center  mt-10 p-5 '>Service Provided by LegalConnect</h1>
        <div className='flex flex-wrap justify-center items-center gap-24'>
            <ServiceCard/>
            <ServiceCard/>
            <ServiceCard/>
 
            
            
        </div>
           
    </div>
  )
}



export default ServiceProvided