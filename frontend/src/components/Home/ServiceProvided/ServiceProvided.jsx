import React from 'react'
import ServiceCard from './ServiceCard/ServiceCard'
import service1 from '../../../assets/service1.png'
import service2 from '../../../assets/service2.png'
import service3 from '../../../assets/service3.png'

function ServiceProvided() {
  return (
    <div className='bg-gray-100 flex flex-col gap-20'>
        <h1 className='text-3xl font-bold text-center  mt-10 p-5 '>Service Provided by LegalConnect</h1>
        <div className='flex flex-wrap justify-center items-center gap-24'>
            <ServiceCard img={service1} title = {"Find best legal service Provider Easily"} />
            <ServiceCard img={service2} title= 'Book appointment on our Platform' />
            <ServiceCard img={service3} title = 'Chat with your legal service' />
 
            
            
        </div>
           
    </div>
  )
}



export default ServiceProvided