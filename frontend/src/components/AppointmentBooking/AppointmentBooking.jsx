import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const AppointmentBooking = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [uniqueDates, setUniqueDates] = useState([]);

  const { provider } = useSelector((state) => state.providerDetails);

  // Load availability data on component mount
  useEffect(() => {
    if (provider && provider.availability) {
      const dates = [...new Set(provider.availability.map((slot) => slot.date))];
      setUniqueDates(dates);
    }
  }, [provider]);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTime(null); // Reset selected time when date changes
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const getTimeSlotsForDate = (date) => {
    return provider.availability.filter(
      (slot) => slot.date === date && !slot.isBooked && isFutureDate(slot.date)
    ).map((slot) => ({
      ...slot,
      startTime: formatTime(slot.startTime),
      endTime: formatTime(slot.endTime)
    }));
  };

  const isFutureDate = (dateString) => {
    const today = new Date();
    const selected = new Date(dateString);
    return selected >= today;
  };

  const formatTime = (timeString) => {
    const hours = parseInt(timeString);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Convert 24-hour to 12-hour format
    return `${formattedHours}:00 ${ampm}`; // Assuming time slots are hourly intervals
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    // Get components of date
    const dayOfWeek = weekdays[date.getDay()];
    const month = months[date.getMonth()];
    const dayOfMonth = date.getDate();
    const year = date.getFullYear();
    

    // Construct formatted date string
    return `${dayOfWeek} ${month} ${dayOfMonth}, ${year} `;
  };

  return (
    <div className="flex flex-col items-center space-y-4 mt-20">
      <h2 className="text-lg font-semibold mb-4">Select Date</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {uniqueDates.map((date, index) => (
          isFutureDate(date) && (
            <button
              key={index}
              className={`px-4 py-2 rounded-full ${
                selectedDate === date ? "bg-green-800 text-white" : "bg-gray-200 text-gray-600"
              }`}
              onClick={() => handleDateSelect(date)}
            >
              {formatDate(date)}
            </button>
          )
        ))}
      </div>

      {selectedDate && (
        <>
          <h2 className="text-lg font-semibold mb-4">Select Time</h2>
          <div className="flex flex-wrap justify-center w-2/3 gap-4">
            {getTimeSlotsForDate(selectedDate).map((slot, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-lg w-48 ${
                  selectedTime === slot.startTime ? "bg-green-600 text-white" : "bg-gray-200 text-gray-600"
                }`}
                onClick={() => handleTimeSelect(slot.startTime)}
              >
                {`${slot.startTime} - ${slot.endTime}`}
              </button>
            ))}
          </div>
        </>
      )}

      <button
        className="bg-green-800 text-white px-4 py-2 rounded-md hover:bg-green-600"
        onClick={() =>
          console.log(`Selected date: ${selectedDate}, Selected time: ${selectedTime}`)
        }
        disabled={!selectedDate || !selectedTime}
      >
        Book Appointment
      </button>
    </div>
  );
};

export default AppointmentBooking;
