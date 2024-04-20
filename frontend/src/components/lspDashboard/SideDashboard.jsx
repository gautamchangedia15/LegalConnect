import React from "react";
import { Link } from "react-router-dom";
const SideDashboard = () => {
  return (
    <div className="h-screen w-[20vw] mt-14 flex flex-col justify-evenly">
      <Link to={"/provider/dashboard/upcomingslots"}>Upcoming Booking</Link>
      <Link to={"/provider/dashboard/pastbooking"}>Past Booking</Link>
      <Link to={"/provider/dashboard/createbooking"}>Create slot</Link>
      <Link to={"/provider/dashboard/clients"}>All Clients</Link>
      <Link to={"/provider/dashboard/payments"}>Payments</Link>
    </div>
  );
};

export default SideDashboard;
