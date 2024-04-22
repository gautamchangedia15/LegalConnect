import { Card, CardBody, Chip, Typography } from "@material-tailwind/react";
import React from "react";
function Slot(props) {
  function convertTo12HourFormat(time24hr) {
    var hours = parseInt(time24hr.substring(0, 2));
    var minutes = time24hr.substring(3);

    var ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes.length === 1 ? "0" + minutes : minutes;

    return hours + ":" + minutes + " " + ampm;
  }
  return (
    <div>
      <Card className="w-[300px] mt-1">
        {props && props ? (
          <CardBody className="p-8">
            <Typography variant="lead" color="blue-gray" className="mb-2">
              Price: {props.price}
            </Typography>
            <div className=" justify-between items-center ">
              <Chip
                color={props.isBooked ? "red" : "green"}
                value={props.isBooked ? "Booked" : "available"}
                className="w-fit"
              />
              <Typography variant="paragraph" color="blue-gray" className="">
                Date:{props.date}
              </Typography>

              <Typography
                variant="paragraph"
                color="blue-gray"
                className="mb-2">
                Time: {convertTo12HourFormat(props.startTime)} -{" "}
                {convertTo12HourFormat(props.endTime)}
              </Typography>
            </div>
          </CardBody>
        ) : (
          <></>
        )}
      </Card>
    </div>
  );
}

export default Slot;
