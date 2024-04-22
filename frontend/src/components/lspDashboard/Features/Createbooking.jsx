import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
  List,
  ListItem,
  ListItemSuffix,
  IconButton,
} from "@material-tailwind/react";
import SideDashboard from "../SideDashboard";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAppointment } from "../../../action/appointmentAction";
function TrashIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5">
      <path
        fillRule="evenodd"
        d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
        clipRule="evenodd"
      />
    </svg>
  );
}
export default function Createbooking() {
  const dispatch = useDispatch();
  const { appointment } = useSelector((state) => state.createAppointments);
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [price, setPrice] = useState();
  const submitHandler = () => {
    dispatch(createAppointment({ date, startTime, endTime, price }));
    alert("appointment created successfully");
    window.location.reload();
  };
  // for current sloats
  const [availability, setAvailability] = useState([]);
  const { Provider } = useSelector((state) => state.loadProviders);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  useEffect(() => {
    if (Provider.data) {
      const newData = Provider.data.availability.filter((item) => {
        const itemDate = new Date(item.date);
        return itemDate >= today;
      });
      setAvailability(newData);
    }
  }, [Provider]);
  return (
    <div className="flex ">
      <SideDashboard />
      <div className="flex gap-20 justify-around mt-48">
        <Card className="w-96 h-auto ml-20 ">
          <CardHeader
            variant="gradient"
            color="indigo"
            className="mb-4 grid h-20  place-items-center">
            <Typography variant="h3" color="">
              Create Slot
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input
              label="Date"
              type="date"
              size="lg"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <Input
              label="From"
              type="time"
              size="lg"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
            <Input
              label="To"
              type="time"
              size="lg"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
            <Input
              label="price"
              type="integer"
              size="lg"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <div className="-ml-2.5"></div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              variant="gradient"
              fullWidth
              onClick={() => submitHandler()}>
              Create
            </Button>
          </CardFooter>
        </Card>
        <Card className="w-96 h-96">
          <CardHeader
            variant="gradient"
            color="indigo"
            className="mb-4 grid h-20 place-items-center">
            <Typography variant="h3" color="">
              Current Slots
            </Typography>
          </CardHeader>
          <CardBody>
            <List className="h-60 overflow-y-auto">
              {availability && availability ? (
                availability.map((item) => (
                  <>
                    <ListItem ripple={false} className="py-1 pr-1 pl-4">
                      <div className="flex gap-3">
                        <div>Date: {item.date}</div>
                        <div>{item.startTime}</div>
                      </div>
                      <ListItemSuffix>
                        {item.isBooked ? (
                          <></>
                        ) : (
                          <IconButton variant="text" color="blue-gray">
                            <TrashIcon />
                          </IconButton>
                        )}
                      </ListItemSuffix>
                    </ListItem>
                  </>
                ))
              ) : (
                <></>
              )}
            </List>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
