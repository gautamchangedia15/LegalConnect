import React, { useState } from 'react';

const AppointmentBooking = () => {

    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);

    const handleDateSelect = (date) => {
        setSelectedDate(date);
    };
    const handleTimeSelect = (time) => {
        setSelectedTime(time);
    };

    const today = new Date();
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const timeSlots = [
        { start: '9:00 AM', end: '10:00 AM' },
        { start: '10:00 AM', end: '11:00 AM' },
        { start: '11:00 AM', end: '12:00 PM' },
        { start: '12:00 PM', end: '1:00 PM' },
        { start: '1:00 PM', end: '2:00 PM' },
        { start: '2:00 PM', end: '3:00 PM' },
        { start: '3:00 PM', end: '4:00 PM' },
        { start: '4:00 PM', end: '5:00 PM' },
    ];




    // Generate dates for the next 7 days
    const upcomingDates = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(today.getDate() + i);
        return date;
    });

    return (
        <div className="flex flex-col items-center space-y-4">
            <h2 className="text-lg font-semibold mb-4">Select Date</h2>
            <div className="flex flex-wrap justify-center gap-4">
                {upcomingDates.map((date) => (
                    <button
                        key={date.toDateString()}
                        className={`px-4 py-2 rounded-full ${selectedDate === date.toDateString() ? 'bg-green-800 text-white' : 'bg-gray-200 text-gray-600'
                            }`}
                        onClick={() => handleDateSelect(date.toDateString())}
                    >
                        {`${weekdays[date.getDay()]} ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`}
                    </button>
                ))}
            </div>
            <>
                <h2 className="text-lg font-semibold mb-4">Select Time</h2>
                <div className="flex flex-wrap justify-center w-2/3 gap-4">
                    {timeSlots.map((slot) => (
                        <button
                            key={slot.start}
                            className={`px-4 py-2 rounded-lg w-48 ${selectedTime === slot.start ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
                                }`}
                            onClick={() => handleTimeSelect(slot.start)}
                        >
                            {`${slot.start} - ${slot.end}`}
                        </button>
                    ))}
                </div>
            </>
            <button
                className="bg-green-800 text-white px-4 py-2 rounded-md hover:bg-green-600"
                onClick={() => console.log(`Selected date: ${selectedDate}`)}
                disabled={!selectedDate}
            >
                Book Appointment
            </button>
        </div>
    );
};


export default AppointmentBooking;
