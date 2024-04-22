import React from 'react'

function ServiceCard(props) {
  return (
    <div>
        <div className="flex flex-col items-center justify-center  border-2 border-gray-300 rounded-lg shadow-lg w-96 h-96   gap-10 ">
                <img src={props.img} alt="" className='w-96 h-96 object-cover rounded-lg shadow-lg' />
                <div className=' w-72   pb-20'>
                    <h3 className='text-xl text-center font-bold'>{props.title}</h3>
                    <p>{props.desc}</p>
                </div>
            </div>
    </div>
  )
}

export default ServiceCard