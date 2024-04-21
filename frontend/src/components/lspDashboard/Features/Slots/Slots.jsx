import React from 'react'
import Slot from './Slot/Slot'

function Slots() {
  return (
    <div className='flex gap-4 flex-wrap'>
        <Slot/>
        <Slot/>
        <Slot/>
        <Slot/>
    </div>
  )
}

export default Slots