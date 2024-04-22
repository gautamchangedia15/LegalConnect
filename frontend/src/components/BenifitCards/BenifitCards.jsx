import React from 'react'
import { BenifitCard } from './BenifitCard/BenifitCard'
import benifit1 from '../../assets/benifit1.jpg'
import benifit2 from '../../assets/benifit2.png'
import benifit3 from '../../assets/benifit3.png'

function BenifitCards() {
  return (
    <div>

      <h1 className='text-3xl font-bold text-center my-10'>Benifits of using LegalConnect</h1>
    <div className='flex flex-wrap justify-center items-center gap-24'>
        <BenifitCard image={benifit1} title={"Transparency and Trust"} description= {"Clients can make informed decisions by reviewing ratings, reviews, and profiles of legal service providers, fostering transparency and trust in the selection process."} />
        <BenifitCard image={benifit2} title={"Advanced Communication Tool"} description= {"Clients can communicate with legal service providers through chat, video calls, and document sharing features, facilitating seamless collaboration and understanding"} />
        <BenifitCard image={benifit3} title={"Empowerment and Control"} description= {"Clients have control over their legal journey, from selecting the right legal service provider to managing appointments and interactions, empowering them to navigate the legal process with confidence"} />
     </div>   
    </div>
  )
}

export default BenifitCards