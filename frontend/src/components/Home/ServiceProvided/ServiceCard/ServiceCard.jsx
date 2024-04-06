import React from 'react'

function ServiceCard() {
  return (
    <div>
        <div className="flex flex-col items-center justify-center  border-2 border-gray-300 rounded-lg shadow-lg w-96 h-96   gap-10 ">
                <img src="https://images.squarespace-cdn.com/content/v1/5317e8cbe4b0ebfb9ed2542c/b3660f89-7182-427d-bc23-f7b550cc08e8/gibran+-+UN.jpg" alt="" className='w-96 h-96 object-cover rounded-lg shadow-lg' />
                <div className=' w-72   pb-20'>
                    <h3>Get your Laywer</h3>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt porro quia error vitae unde, tempora culpa tenetur ipsum ullam maxime architecto, quos repudiandae?</p>
                </div>
            </div>
    </div>
  )
}

export default ServiceCard