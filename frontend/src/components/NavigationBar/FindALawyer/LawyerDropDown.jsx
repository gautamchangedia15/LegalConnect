import React from 'react'
import { useState } from 'react'
function LawyerDropDown() {
    const [activeIndex, setActiveIndex] = useState(null);

    const handleMouseEnter = (index)=> {
        setActiveIndex(index)
    }
    const handleMouseLeave = () => {
        setActiveIndex(null)
    }

    const menuItems =[ {
        label: "Personal / Family",
        subItems: [
            {label: 'Divorce'},
            {label: 'Divorce'},
            {label: 'Divorce'},
            {label: 'Divorce'},
            {label: 'Divorce'},
        ]
    },
    {
        label: "Personal / Family",
        subItems: [
            {label: 'Divorce'},
            {label: 'Divorce'},
            {label: 'Divorce'},
            {label: 'Divorce'},
            {label: 'Divorce'},
        ]
    },
]

  return (
    <nav className='main-menu'>
        {menuItems.map((items,index)=> {
            <div key={index} className='relative'
            onMouseEnter={()=> handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            >

            </div>
        })}
    
    </nav>
  )
}

export default LawyerDropDown