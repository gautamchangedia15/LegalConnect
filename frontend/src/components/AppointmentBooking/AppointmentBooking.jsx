import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Chip } from "@material-tailwind/react";
import RazorpayButton from "../Payment/RazorpayButton";
import { useParams } from "react-router-dom";
import { loadProviders } from "../../reducer/providerReducer";
const AppointmentBooking = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [uniqueDates, setUniqueDates] = useState([]);
  const [selectedSolt, setSelectedSolt] = useState({});
  const { provider } = useSelector((state) => state.providerDetails);
  const { data } = useSelector((state) => state.user.client);
  const dispatch = useDispatch;
  const { id } = useParams();
  // Load availability data on component mount
  useEffect(() => {
    if (provider && provider.availability) {
      setUniqueDates(provider.availability);
    }
  }, []);

  const handleDateSelect = (item) => {
    setSelectedSolt(item);
    console.log(typeof item.price);
  };

  const getTimeSlotsForDate = (date) => {
    return provider.availability
      .filter(
        (slot) =>
          slot.date === date && !slot.isBooked && isFutureDate(slot.date)
      )
      .map((slot) => ({
        ...slot,
        startTime: formatTime(slot.startTime),
        endTime: formatTime(slot.endTime),
      }));
  };

  const isFutureDate = (dateString) => {
    const today = new Date();
    const selected = new Date(dateString);
    return selected >= today;
  };

  const formatTime = (timeString) => {
    const hours = parseInt(timeString);
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; // Convert 24-hour to 12-hour format
    return `${formattedHours}:00 ${ampm}`; // Assuming time slots are hourly intervals
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
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
        {uniqueDates ? (
          uniqueDates.map(
            (item, index) =>
              isFutureDate(item.date) &&
              !item.isBooked && (
                <button
                  disabled={item.isBooked}
                  key={index}
                  className={`px-4 py-2 rounded-lg ${
                    selectedSolt === item
                      ? "bg-green-800 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                  onClick={() => handleDateSelect(item)}>
                  {formatDate(item.date)}
                  {
                    <Chip
                      className="bg-gray-100 text-gray-900 "
                      value={`₹${item.price}`}
                    />
                  }
                  <p>{}</p>
                </button>
              )
          )
        ) : (
          <h1>NO slots Available</h1>
        )}
      </div>

      {selectedSolt && data && selectedSolt.price ? (
        <>
          <div className="bg-green-800 text-white px-4 py-2 rounded-md hover:bg-green-600">
            <button
              disabled={
                selectedSolt &&
                data.id &&
                id &&
                data.email &&
                data.name &&
                selectedSolt.price
                  ? false
                  : true
              }>
              {console.log(data)}
              <RazorpayButton
                title={`Book Appointment  ${
                  selectedSolt.price ? ` ₹${selectedSolt.price}` : ""
                }`}
                slotAmount={selectedSolt.price + "00"}
                clientId={data.id}
                providerId={id}
                clientName={data.name}
                clientEmail={data.email}
                slot={selectedSolt}
                providerAcc={provider.accId}
                providerName={provider.name}
              />
            </button>
          </div>
        </>
      ) : (
        <div className="bg-green-800 text-white px-4 py-2 rounded-md hover:bg-green-600">
          <button>Book Appointment</button>
        </div>
      )}
    </div>
  );
};

export default AppointmentBooking;
