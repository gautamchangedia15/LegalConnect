import React from 'react';
import Slots from './Features/Slots/Slots';

const AvailabilityCalendar = () => {
  return (
    <div>

<h1 className='text-3xl font-bold mb-1 text-center underline'>Calendar</h1>
    <Slots value={true}/>
    </div>
  );
};

export default AvailabilityCalendar;
