import React from 'react'
import { BenifitCard } from './BenifitCard/BenifitCard'

function BenifitCards() {
  return (
    <div>

      <h1 className='text-3xl font-bold text-center my-10'>Benifits of using LegalConnect</h1>
    <div className='flex flex-wrap justify-center items-center gap-24'>
        <BenifitCard/>
        <BenifitCard/>
        <BenifitCard/>
     </div>   
    </div>
  )
}

export default BenifitCards