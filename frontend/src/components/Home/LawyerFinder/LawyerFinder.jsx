import React from 'react'

function LawyerFinder() {
  return (
    
    <div className='flex flex-col items-center justify-center h-full w-full bg-gray-100 p-10 gap-10 '>
    <h1 className='text-3xl font-bold text-center '>Find a Laywer</h1>
    <div className='flex  items-center justify-center h-10 my-2 gap-10 w-2/3 bg-white rounded-md border border-gray-300 p-28'>
        <div className='flex flex-col items-center justify-center h-10 my-2 '>
            <label>Select a service</label>
            <select name="" id="" className=' h-10 border border-gray-300 rounded-md px-2 py-1 '>
                <option value="">Probono</option>
                <option value="">Divorce</option>
                <option value="">Property</option>
                <option value="">Sex</option>
            </select>
        </div>
        <div className='flex flex-col items-center justify-center h-10 my-2 '>
            <label>Select a City</label>
            <select name="" id="" className=' h-10 border border-gray-300 rounded-md px-2 py-1 '>
                <option value="">Delhi</option>
                <option value="">Mumbai</option>
                <option value="">Chennai</option>
                <option value="">Kolkata</option>
            </select>
        </div>
        <div className='flex flex-col items-center justify-center h-10 my-2 '>
            <label>Price Range</label>
            <select name="" id="" className=' h-10 border border-gray-300 rounded-md px-2 py-1 '>
                <option value="">1000-2000</option>
                <option value="">2000-3000</option>
                <option value="">3000-4000</option>
                <option value="">5000+</option>
            </select>
        </div>
        <div>
            <button className='bg-blue-500 text-white rounded-md px-5 py-2' type='submit'>Go</button>
        </div>
    </div>

</div>
  )
}

export default LawyerFinder