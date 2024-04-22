import React, { useEffect, useState } from "react";
import Slot from "./Slot/Slot";
import { useSelector } from "react-redux";
function Slots(props) {
  const [availability, setAvailability] = useState([]);
  const { Provider } = useSelector((state) => state.loadProviders);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  useEffect(() => {
    if (Provider.data) {
      const newData = Provider.data.availability.filter((item) => {
        const itemDate = new Date(item.date);
        if (props.value) {
          return itemDate >= today;
        }
        if (!props.value) {
          return itemDate <= today;
        }
      });
      setAvailability(newData);
    }
  }, [Provider]);

  return (
    <div className="flex gap-4 flex-wrap">
      {availability && availability ? (
        availability.map((item, index) => (
          <Slot
            key={index}
            date={item.date}
            startTime={item.startTime}
            endTime={item.endTime}
            price={item.price}
            isBooked={item.isBooked}
          />
        ))
      ) : (
        <></>
      )}
    </div>
  );
}

export default Slots;
