import React from 'react'
import { Link, NavLink } from 'react-router-dom'

function NavigationBar() {
    return (
        <div className='flex justify-between fixed top-0 left-0 right-0 h-16 bg-white shadow-sm z-10 px-4 py-2 items-center Px-10'>
            <div className='flex justify-between gap-12 '>
                <Link to={'/'}>
                <div>Logo</div>
                </Link>
                {/* <div>Appointment</div> */}
            </div>
            <div className='flex justify-between gap-4 items-center '>
                <div>
                    <input placeholder='Search...' type="text" className='w-[300px] bg-white h-10 border border-gray-300 rounded-md px-2 py-1' />
                </div>
                <div>
                    <button className='bg-green-900 text-white px-4 py-2 rounded-md'>Search</button>
                </div>
            </div>
            <div>
            </div>


            <div>
                <div>
                    <nav>
                        <ul className='flex justify-between gap-12'>
                            <li>
                                Find a Lawyer
                            </li>
                            
                            <Link to={'/service'}>
                            <li>Find a service</li>
                            </Link>
                            
                            <li>About</li>
                            <Link to={'/clientLogin'}>
                            <li>Login</li>
                            </Link>
                            
                        </ul>
                    </nav>
                </div>
            </div>
        </div >
    )
}

export default NavigationBar